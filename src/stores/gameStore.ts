import { create } from 'zustand';
import { NPCType, EmotionalState, NPCMood, NPCBehavior } from '../types/enums';
import { workerManager } from '../managers/WorkerManager';
import { EVENT_TIMELINE, TENSION_TIMELINE, PHASE_DESCRIPTIONS, NPC_COLORS, MAX_ACTIVE_NPCS, timeToMinutes } from '../systems/eventScheduler';
import { INITIAL_MISSION_PROGRESS, type InteractionZoneId, applyInteractionOutcome } from '../systems/interactionZones';
import { applyMissionPhaseHooks } from '../systems/missionPhaseHooks';
import { getOperationsInsight } from '../systems/operationsInsights';
import { io } from 'socket.io-client';

declare global {
    interface Window {
        __GAME_STORE__?: typeof useGameStore;
    }
}

const socket = io(window.location.origin, { autoConnect: false });

export interface NPCData {
    id: number;
    type: NPCType;
    position: [number, number, number];
    rotation: number;
    outfitColor: string;
    emotionalState: EmotionalState;
    mood: NPCMood;
    behavior: NPCBehavior;
}

interface DayStats {
    killed: number;
    arrested: number;
    injured: number;
    damage: number;
}

export interface RoleTrendPoint {
    time: string;
    security: number;
    aggressors: number;
    support: number;
    civilian: number;
    panicRatioPercent: number;
}

interface GameStore {
    npcs: NPCData[];
    firedEventKeys: string[];
    roleTrendHistory: RoleTrendPoint[];
    interactionState: {
        nearbyZoneId: InteractionZoneId | null;
        lastMessage: string | null;
        missionProgress: typeof INITIAL_MISSION_PROGRESS;
    };
    gameState: { 
        isPlaying: boolean; 
        isTimePaused: boolean; 
        inGameTime: string; 
        tensionLevel: number;
        timeSpeed: number;
        currentPhaseLabel: string;
        // === CHUNK 11: Dynamisches System ===
        playerReputation: number;  // -100 (brutal) bis +100 (fair)
        moralScore: number;        // 0 (böse) bis 100 (gut)
        showStatistics: boolean;   // Statistik-Screen bei 00:00
        masterVolume: number;
        muted: boolean;
    };
    dayStats: DayStats;
    startGame: () => void;
    updateTime: (time: string) => void;
    advanceHour: () => void;
    rewindHour: () => void;
    advanceMinute: () => void;
    rewindMinute: () => void;
    toggleTimePause: () => void;
    setTension: (level: number) => void;
    evaluateEvents: (currentTime: string) => void;
    resetDayCycle: () => void;
    setTimeSpeed: (speed: number) => void;
    adjustReputation: (delta: number) => void;
    showStatisticsPanel: () => void;
    dismissStatistics: () => void;
    setMasterVolume: (vol: number) => void;
    setMuted: (muted: boolean) => void;
    setNearbyInteraction: (zoneId: InteractionZoneId | null) => void;
    triggerInteraction: () => void;
    initSocket: () => void;
}

let nextNpcId = 1000;
const MAX_ROLE_TREND_POINTS = 24;

const SECURITY_TYPES = new Set<NPCType>([NPCType.POLICE, NPCType.RIOT_POLICE, NPCType.SEK]);
const AGGRESSOR_TYPES = new Set<NPCType>([NPCType.RIOTER, NPCType.EXTREMIST]);
const SUPPORT_TYPES = new Set<NPCType>([NPCType.MEDIC, NPCType.FIREFIGHTER]);

interface WorldReplayState {
    npcs: NPCData[];
    dayStats: DayStats;
    firedSet: Set<string>;
}

const minutesToClock = (minutes: number) => {
    const normalized = ((minutes % (24 * 60)) + (24 * 60)) % (24 * 60);
    const h = Math.floor(normalized / 60);
    const m = normalized % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
};

const buildRoleTrendPoint = (time: string, npcs: NPCData[]): RoleTrendPoint => {
    const security = npcs.filter((npc) => SECURITY_TYPES.has(npc.type)).length;
    const aggressors = npcs.filter((npc) => AGGRESSOR_TYPES.has(npc.type)).length;
    const support = npcs.filter((npc) => SUPPORT_TYPES.has(npc.type)).length;
    const civilian = npcs.length - security - aggressors - support;
    const panicCount = npcs.filter((npc) => npc.mood === NPCMood.PANICKED || npc.mood === NPCMood.RIOTING).length;

    return {
        time,
        security,
        aggressors,
        support,
        civilian,
        panicRatioPercent: npcs.length > 0 ? Math.round((panicCount / npcs.length) * 100) : 0,
    };
};

const upsertRoleTrendPoint = (
    history: RoleTrendPoint[],
    point: RoleTrendPoint,
    maxPoints: number = MAX_ROLE_TREND_POINTS,
) => {
    if (history.length === 0) {
        return [point];
    }

    const last = history[history.length - 1];
    if (last.time === point.time) {
        return [...history.slice(0, -1), point];
    }

    const next = [...history, point];
    if (next.length > maxPoints) {
        return next.slice(next.length - maxPoints);
    }

    return next;
};

/** Helper: create NPCs of a given type at a position with radius */
function createNpcs(
    type: NPCType, count: number, position: [number, number, number], radius: number,
    mood: NPCMood = NPCMood.PEACEFUL, behavior: NPCBehavior = NPCBehavior.IDLE
): NPCData[] {
    const color = NPC_COLORS[type] || '#888888';
    return Array.from({ length: count }, () => {
        const angle = Math.random() * Math.PI * 2;
        const r = Math.random() * radius;
        const x = position[0] + Math.cos(angle) * r;
        const z = position[2] + Math.sin(angle) * r;
        nextNpcId++;
        return {
            id: nextNpcId,
            type,
            position: [x, 1.2, z] as [number, number, number],
            rotation: Math.random() * Math.PI * 2,
            outfitColor: color,
            emotionalState: mood === NPCMood.PEACEFUL ? EmotionalState.PEACEFUL : EmotionalState.NEUTRAL,
            mood,
            behavior
        };
    });
}

/** Helper: remove N npcs of a type from an array (returns new array) */
function removeNpcs(npcs: NPCData[], type: NPCType, count: number): NPCData[] {
    if (count === -1) {
        return npcs.filter(n => n.type !== type);
    }
    const targets = npcs.filter(n => n.type === type);
    const toRemoveIds = new Set(
        targets.sort(() => Math.random() - 0.5).slice(0, count).map(n => n.id)
    );
    return npcs.filter(n => !toRemoveIds.has(n.id));
}

const moodToEmotionalState = (mood: NPCMood): EmotionalState => {
    switch (mood) {
        case NPCMood.PEACEFUL:
            return EmotionalState.PEACEFUL;
        case NPCMood.ANGRY:
        case NPCMood.RIOTING:
            return EmotionalState.ANGRY;
        case NPCMood.PANICKED:
            return EmotionalState.SCARED;
        case NPCMood.ENTHUSIASTIC:
            return EmotionalState.HAPPY;
        case NPCMood.TENSE:
        default:
            return EmotionalState.NEUTRAL;
    }
};

const normalizeDayStats = (dayStats: DayStats): DayStats => ({
    killed: Math.max(0, Math.round(dayStats.killed)),
    arrested: Math.max(0, Math.round(dayStats.arrested)),
    injured: Math.max(0, Math.round(dayStats.injured)),
    damage: Math.max(0, Math.round(dayStats.damage)),
});

const applyDayStatsDelta = (dayStats: DayStats, delta: Partial<DayStats>): DayStats => normalizeDayStats({
    killed: dayStats.killed + (delta.killed ?? 0),
    arrested: dayStats.arrested + (delta.arrested ?? 0),
    injured: dayStats.injured + (delta.injured ?? 0),
    damage: dayStats.damage + (delta.damage ?? 0),
});

const getTensionLevelForMinutes = (currentMinutes: number) => {
    let tensionLevel = 10;
    for (const t of TENSION_TIMELINE) {
        if (timeToMinutes(t.time) <= currentMinutes) {
            tensionLevel = t.level;
        }
    }
    return tensionLevel;
};

const getPhaseLabelForMinutes = (currentMinutes: number, fallbackLabel: string) => {
    let currentPhaseLabel = fallbackLabel;
    for (const p of PHASE_DESCRIPTIONS) {
        if (timeToMinutes(p.time) <= currentMinutes) {
            currentPhaseLabel = p.label;
        }
    }
    return currentPhaseLabel;
};

const applyNpcState = (
    npc: NPCData,
    targetMood?: NPCMood,
    targetBehavior?: NPCBehavior,
): NPCData => ({
    ...npc,
    mood: targetMood ?? npc.mood,
    behavior: targetBehavior ?? npc.behavior,
    emotionalState: targetMood ? moodToEmotionalState(targetMood) : npc.emotionalState,
});

const getMissionCompletionPercent = (progress: typeof INITIAL_MISSION_PROGRESS) => {
    const completed =
        (progress.epochBriefingVerified ? 1 : 0) +
        (progress.hazardMapPrepared ? 1 : 0) +
        Math.min(progress.prioritizedZoneIds.length, 3);
    return Math.round((completed / 5) * 100);
};

const getActiveHooks = (minutes: number, progress: typeof INITIAL_MISSION_PROGRESS) => {
    let active = 0;
    if (minutes >= 12 * 60 && minutes < 18 * 60 && progress.epochBriefingVerified) active += 1;
    if (minutes >= 18 * 60 && progress.hazardMapPrepared) active += 1;
    if (minutes >= 18 * 60 && progress.prioritizedZoneIds.length > 0) active += 1;
    if (minutes >= 21 * 60 && progress.prioritizedZoneIds.length >= 3) active += 1;
    return active;
};

const getPanicRatioPercent = (npcs: NPCData[]) => {
    const panicCount = npcs.filter((npc) => npc.mood === NPCMood.PANICKED || npc.mood === NPCMood.RIOTING).length;
    return npcs.length > 0 ? Math.round((panicCount / npcs.length) * 100) : 0;
};

const spawnDynamicWave = (
    npcs: NPCData[],
    type: NPCType,
    count: number,
    position: [number, number, number],
    radius: number,
    mood: NPCMood,
    behavior: NPCBehavior,
) => {
    const maxCanSpawn = Math.max(0, MAX_ACTIVE_NPCS - npcs.length);
    const effectiveCount = Math.min(count, maxCanSpawn);

    if (effectiveCount <= 0) {
        return npcs;
    }

    return [...npcs, ...createNpcs(type, effectiveCount, position, radius, mood, behavior)];
};

const applyDynamicRoleResponses = (
    npcs: NPCData[],
    dayStats: DayStats,
    firedSet: Set<string>,
    currentMinutes: number,
    missionProgress: typeof INITIAL_MISSION_PROGRESS,
    roleTrendHistory: RoleTrendPoint[],
): WorldReplayState => {
    let nextNpcs = npcs;
    let nextDayStats = dayStats;

    if (
        currentMinutes >= 18 * 60 &&
        !firedSet.has('dyn-evening-reinforcement')
    ) {
        const spawned = spawnDynamicWave(nextNpcs, NPCType.RIOT_POLICE, 6, [0, 0, 58], 9, NPCMood.TENSE, NPCBehavior.SHIELD_WALL);
        if (spawned !== nextNpcs) {
            nextNpcs = spawned;
            nextDayStats = applyDayStatsDelta(nextDayStats, { injured: -1, damage: -1600 });
            firedSet.add('dyn-evening-reinforcement');
        }
    }

    if (
        currentMinutes >= 21 * 60 &&
        !firedSet.has('dyn-late-triage')
    ) {
        const spawned = spawnDynamicWave(nextNpcs, NPCType.MEDIC, 2, [42, 0, 24], 7, NPCMood.TENSE, NPCBehavior.CLEANUP);
        if (spawned !== nextNpcs) {
            nextNpcs = spawned;
            nextDayStats = applyDayStatsDelta(nextDayStats, { injured: -2, damage: -900 });
            firedSet.add('dyn-late-triage');
        }
    }

    const insightHistory = upsertRoleTrendPoint(
        roleTrendHistory,
        buildRoleTrendPoint(minutesToClock(currentMinutes), nextNpcs),
        MAX_ROLE_TREND_POINTS,
    );

    const insight = getOperationsInsight({
        trendHistory: insightHistory,
        dayStats: nextDayStats,
        missionCompletionPercent: getMissionCompletionPercent(missionProgress),
        panicRatioPercent: getPanicRatioPercent(nextNpcs),
        activeHooks: getActiveHooks(currentMinutes, missionProgress),
        maxHooks: 4,
        activeDynamicResponses: ['dyn-evening-reinforcement', 'dyn-late-triage', 'dyn-high-medical-relief', 'dyn-critical-lockdown']
            .filter((key) => firedSet.has(key)).length,
    });

    if (
        insight.priority !== 'low' &&
        currentMinutes >= 17 * 60 &&
        !firedSet.has('dyn-high-medical-relief')
    ) {
        const spawned = spawnDynamicWave(nextNpcs, NPCType.MEDIC, 2, [34, 0, 22], 8, NPCMood.TENSE, NPCBehavior.CLEANUP);
        if (spawned !== nextNpcs) {
            nextNpcs = spawned;
            nextDayStats = applyDayStatsDelta(nextDayStats, { injured: -1, damage: -700 });
            firedSet.add('dyn-high-medical-relief');
        }
    }

    if (
        insight.priority === 'critical' &&
        currentMinutes >= 20 * 60 &&
        !firedSet.has('dyn-critical-lockdown')
    ) {
        const spawned = spawnDynamicWave(nextNpcs, NPCType.SEK, 4, [6, 0, 44], 7, NPCMood.TENSE, NPCBehavior.SURROUND);
        if (spawned !== nextNpcs) {
            nextNpcs = spawned;
            nextDayStats = applyDayStatsDelta(nextDayStats, { injured: -2, damage: -1200 });
            firedSet.add('dyn-critical-lockdown');
        }
    }

    if (
        missionProgress.epochBriefingVerified &&
        currentMinutes >= 12 * 60 &&
        !firedSet.has('dyn-mission-epoch-media')
    ) {
        const spawned = spawnDynamicWave(nextNpcs, NPCType.JOURNALIST, 3, [-4, 0, 14], 6, NPCMood.TENSE, NPCBehavior.GATHER);
        if (spawned !== nextNpcs) {
            nextNpcs = spawned;
            nextDayStats = applyDayStatsDelta(nextDayStats, { damage: -350 });
            firedSet.add('dyn-mission-epoch-media');
        }
    }

    if (
        missionProgress.hazardMapPrepared &&
        currentMinutes >= 18 * 60 &&
        !firedSet.has('dyn-mission-hazard-shield')
    ) {
        const spawned = spawnDynamicWave(nextNpcs, NPCType.POLICE, 4, [0, 0, 36], 10, NPCMood.TENSE, NPCBehavior.SHIELD_WALL);
        if (spawned !== nextNpcs) {
            nextNpcs = spawned;
            nextDayStats = applyDayStatsDelta(nextDayStats, { injured: -1, damage: -550 });
            firedSet.add('dyn-mission-hazard-shield');
        }
    }

    if (
        missionProgress.prioritizedZoneIds.length >= 3 &&
        currentMinutes >= 21 * 60 &&
        !firedSet.has('dyn-mission-fullchain-deescalation')
    ) {
        nextNpcs = nextNpcs.map((npc) => {
            if (
                (npc.type === NPCType.DEMONSTRATOR || npc.type === NPCType.RIOTER) &&
                (npc.behavior === NPCBehavior.COMBAT || npc.behavior === NPCBehavior.THROW || npc.behavior === NPCBehavior.CHANT)
            ) {
                return applyNpcState(npc, NPCMood.PANICKED, NPCBehavior.RETREAT);
            }
            return npc;
        });
        nextDayStats = applyDayStatsDelta(nextDayStats, { injured: -2, damage: -1700 });
        firedSet.add('dyn-mission-fullchain-deescalation');
    }

    return { npcs: nextNpcs, dayStats: nextDayStats, firedSet };
};

const replayWorldStateToMinutes = (currentMinutes: number): WorldReplayState => {
    nextNpcId = 1000;
    const firedSet = new Set<string>();
    let npcs: NPCData[] = [];
    let dayStats: DayStats = { killed: 0, arrested: 0, injured: 0, damage: 0 };

    EVENT_TIMELINE.forEach((event, index) => {
        const eventKey = `evt-${index}`;
        const eventMinutes = timeToMinutes(event.time);

        if (eventMinutes <= currentMinutes) {
            firedSet.add(eventKey);

            const countForStats = event.count === -1
                ? npcs.filter((npc) => npc.type === event.npcType).length
                : Math.max(0, event.count);
            dayStats = applyDayStatsDelta(dayStats, getEventDayStatsDelta(event, countForStats));

            if (event.action === 'SPAWN' && event.position) {
                const maxCanSpawn = Math.max(0, MAX_ACTIVE_NPCS - npcs.length);
                const count = Math.min(event.count, maxCanSpawn);
                if (count > 0) {
                    npcs = [...npcs, ...createNpcs(event.npcType, count, event.position, event.radius || 5, event.mood, event.behavior)];
                }
            } else if (event.action === 'DESPAWN') {
                npcs = removeNpcs(npcs, event.npcType, event.count);
            } else if (event.action === 'MOVE' && event.position) {
                npcs = npcs.map((npc) => (npc.type === event.npcType ? { ...npc, position: event.position } : npc));
            } else if (event.action === 'MOOD_CHANGE') {
                npcs = npcs.map((npc) => (npc.type === event.npcType ? applyNpcState(npc, event.targetMood, event.targetBehavior) : npc));
            } else if (event.action === 'BEHAVIOR_CHANGE') {
                npcs = npcs.map((npc) => (npc.type === event.npcType ? applyNpcState(npc, undefined, event.targetBehavior) : npc));
            }
        }
    });

    return { npcs, dayStats, firedSet };
};

const buildRoleTrendHistoryToMinutes = (
    currentMinutes: number,
    missionProgress: typeof INITIAL_MISSION_PROGRESS,
): RoleTrendPoint[] => {
    const checkpoints = new Set<number>([currentMinutes]);
    EVENT_TIMELINE.forEach((event) => {
        const eventMinutes = timeToMinutes(event.time);
        if (eventMinutes <= currentMinutes) {
            checkpoints.add(eventMinutes);
        }
    });

    const sorted = Array.from(checkpoints).sort((a, b) => a - b);
    let history: RoleTrendPoint[] = [];

    sorted.forEach((minutes) => {
        const replay = replayWorldStateToMinutes(minutes);
        const hooked = applyMissionPhaseHooks(replay.npcs, minutes, missionProgress);
        const dynamic = applyDynamicRoleResponses(hooked, replay.dayStats, replay.firedSet, minutes, missionProgress, history);
        history = upsertRoleTrendPoint(history, buildRoleTrendPoint(minutesToClock(minutes), dynamic.npcs));
    });

    return history;
};

const getInteractionDayStatsDelta = (zoneId: InteractionZoneId): Partial<DayStats> => {
    if (zoneId === 'epoch-terminal') {
        return { injured: -1, damage: -2500 };
    }

    if (zoneId === 'hazard-console') {
        return { injured: -2, damage: -9000 };
    }

    return { injured: -1, damage: -3000 };
};

const getEventDayStatsDelta = (
    event: { action: string; npcType: NPCType; targetMood?: NPCMood; targetBehavior?: NPCBehavior },
    effectiveCount: number,
): Partial<DayStats> => {
    const units = Math.max(0, effectiveCount);

    if (event.action === 'SPAWN') {
        if (event.npcType === NPCType.RIOTER || event.npcType === NPCType.EXTREMIST) {
            return { injured: Math.ceil(units / 4), damage: units * 2200 };
        }
        if (event.npcType === NPCType.DEMONSTRATOR) {
            return { damage: units * 120 };
        }
        if (event.npcType === NPCType.MEDIC || event.npcType === NPCType.FIREFIGHTER) {
            return { injured: -Math.ceil(units / 3), damage: -units * 250 };
        }
    }

    if (event.action === 'DESPAWN') {
        if (event.npcType === NPCType.RIOTER || event.npcType === NPCType.EXTREMIST || event.npcType === NPCType.DEMONSTRATOR) {
            return { arrested: Math.ceil(units * 0.75) };
        }
        if (event.npcType === NPCType.POLICE || event.npcType === NPCType.RIOT_POLICE || event.npcType === NPCType.SEK) {
            return { injured: Math.ceil(units * 0.6) };
        }
    }

    if (event.action === 'MOOD_CHANGE') {
        if (event.targetMood === NPCMood.RIOTING) {
            return { injured: Math.max(1, Math.ceil(units * 0.18)), damage: Math.max(1000, units * 800) };
        }
        if (event.targetMood === NPCMood.ANGRY) {
            return { damage: Math.max(500, units * 220) };
        }
        if (event.targetMood === NPCMood.PEACEFUL) {
            return { damage: -Math.max(300, units * 80) };
        }
    }

    if (event.action === 'BEHAVIOR_CHANGE') {
        if (event.targetBehavior === NPCBehavior.COMBAT || event.targetBehavior === NPCBehavior.THROW) {
            return { injured: Math.max(1, Math.ceil(units * 0.14)), damage: Math.max(800, units * 550) };
        }
        if (event.targetBehavior === NPCBehavior.CLEANUP || event.targetBehavior === NPCBehavior.RETREAT) {
            return { damage: -Math.max(400, units * 150) };
        }
    }

    return {};
};

const applyMissionNpcEffects = (npcs: NPCData[], zoneId: InteractionZoneId): NPCData[] => {
    const updateNpc = (npc: NPCData, behavior: NPCBehavior, mood: NPCMood): NPCData => ({
        ...npc,
        behavior,
        mood,
        emotionalState: moodToEmotionalState(mood),
    });

    const isResponder = (npc: NPCData) =>
        npc.type === NPCType.MEDIC || npc.type === NPCType.FIREFIGHTER;

    const isSecurity = (npc: NPCData) =>
        npc.type === NPCType.POLICE || npc.type === NPCType.RIOT_POLICE || npc.type === NPCType.SEK;

    const isPopulation = (npc: NPCData) =>
        npc.type === NPCType.CIVILIAN || npc.type === NPCType.TOURIST || npc.type === NPCType.JOURNALIST;

    if (zoneId === 'epoch-terminal') {
        return npcs.map((npc) => {
            if (npc.type === NPCType.JOURNALIST || npc.type === NPCType.ORGANIZER) {
                return updateNpc(npc, NPCBehavior.GATHER, NPCMood.TENSE);
            }
            if (npc.type === NPCType.DEMONSTRATOR && npc.behavior === NPCBehavior.IDLE) {
                return updateNpc(npc, NPCBehavior.GATHER, NPCMood.TENSE);
            }
            return npc;
        });
    }

    if (zoneId === 'hazard-console') {
        return npcs.map((npc) => {
            if (isResponder(npc)) {
                return updateNpc(npc, NPCBehavior.CLEANUP, NPCMood.TENSE);
            }
            if (isSecurity(npc) && npc.behavior === NPCBehavior.PATROL) {
                return updateNpc(npc, NPCBehavior.SHIELD_WALL, NPCMood.TENSE);
            }
            return npc;
        });
    }

    const zoneFilter = (npc: NPCData) => {
        const x = npc.position[0];
        const z = npc.position[2];
        if (zoneId === 'evacuation-board-north') return z >= 0;
        if (zoneId === 'evacuation-board-west') return x < 0 && z < 0;
        return x >= 0 && z < 0;
    };

    return npcs.map((npc) => {
        if (!zoneFilter(npc)) {
            return npc;
        }

        if (isPopulation(npc)) {
            return updateNpc(npc, NPCBehavior.FLEE, NPCMood.PANICKED);
        }

        if (isResponder(npc)) {
            return updateNpc(npc, NPCBehavior.CLEANUP, NPCMood.TENSE);
        }

        return npc;
    });
};

export const useGameStore = create<GameStore>((set, get) => ({
    npcs: [],
    firedEventKeys: [],
    roleTrendHistory: [],
    interactionState: {
        nearbyZoneId: null,
        lastMessage: null,
        missionProgress: INITIAL_MISSION_PROGRESS,
    },
    dayStats: { killed: 0, arrested: 0, injured: 0, damage: 0 },
    gameState: { 
        isPlaying: false, isTimePaused: false, inGameTime: '06:00', 
        tensionLevel: 10, timeSpeed: 1, 
        currentPhaseLabel: '🌅 Tagesbeginn — Stadt erwacht',
        playerReputation: 0, moralScore: 50, showStatistics: false,
        masterVolume: 0.5, muted: false
    },

    initSocket: () => {
        if (socket.connected) return;
        socket.connect();
        socket.on('init-state', (state: any) => {
            get().evaluateEvents(state.inGameTime);
        });
        socket.on('time-sync', (time: string) => {
            get().evaluateEvents(time);
        });
    },

    startGame: () => {
        nextNpcId = 1000;
        set({ 
            npcs: [],
            firedEventKeys: [],
            roleTrendHistory: [],
            interactionState: {
                nearbyZoneId: null,
                lastMessage: null,
                missionProgress: INITIAL_MISSION_PROGRESS,
            },
            dayStats: { killed: 0, arrested: 0, injured: 0, damage: 0 },
            gameState: { 
                isPlaying: true, isTimePaused: false, inGameTime: '06:00', 
                tensionLevel: 10, timeSpeed: 1, 
                currentPhaseLabel: '🌅 Tagesbeginn — Stadt erwacht',
                playerReputation: 0, moralScore: 50, showStatistics: false,
                masterVolume: 0.5, muted: false
            }
        });
        setTimeout(() => get().evaluateEvents('06:00'), 200);
    },

    /**
     * ATOMIC evaluateEvents: ALL changes in ONE set() call.
     * No race conditions, no stale state.
     */
    evaluateEvents: (currentTime: string) => {
        set((state) => {
            const currentMinutes = timeToMinutes(currentTime);
            const previousMinutes = timeToMinutes(state.gameState.inGameTime);
            const firedSet = new Set(state.firedEventKeys);
            let npcs = [...state.npcs];
            let dayStats = { ...state.dayStats };
            const moveCommands: { ids: number[], target: [number, number, number] }[] = [];

            // Process all events up to current time
            EVENT_TIMELINE.forEach((event, index) => {
                const eventKey = `evt-${index}`;
                const eventMinutes = timeToMinutes(event.time);

                if (eventMinutes <= currentMinutes && !firedSet.has(eventKey)) {
                    firedSet.add(eventKey);

                    const countForStats = event.count === -1
                        ? npcs.filter((npc) => npc.type === event.npcType).length
                        : Math.max(0, event.count);
                    dayStats = applyDayStatsDelta(dayStats, getEventDayStatsDelta(event, countForStats));

                    if (event.action === 'SPAWN' && event.position) {
                        const maxCanSpawn = Math.max(0, MAX_ACTIVE_NPCS - npcs.length);
                        const count = Math.min(event.count, maxCanSpawn);
                        if (count > 0) {
                            const newNpcs = createNpcs(event.npcType, count, event.position, event.radius || 5, event.mood, event.behavior);
                            npcs = [...npcs, ...newNpcs];
                        }
                    } else if (event.action === 'DESPAWN') {
                        npcs = removeNpcs(npcs, event.npcType, event.count);
                    } else if (event.action === 'MOVE' && event.position) {
                        const ids = npcs.filter(n => n.type === event.npcType).map(n => n.id);
                        moveCommands.push({ ids, target: event.position });
                    } else if (event.action === 'MOOD_CHANGE') {
                        npcs = npcs.map(n => {
                            if (n.type === event.npcType) {
                                return applyNpcState(n, event.targetMood, event.targetBehavior);
                            }
                            return n;
                        });
                    } else if (event.action === 'BEHAVIOR_CHANGE') {
                        npcs = npcs.map(n => {
                            if (n.type === event.npcType) {
                                return applyNpcState(n, undefined, event.targetBehavior);
                            }
                            return n;
                        });
                    }
                }
            });

            const tensionLevel = getTensionLevelForMinutes(currentMinutes);
            const currentPhaseLabel = getPhaseLabelForMinutes(currentMinutes, state.gameState.currentPhaseLabel);

            npcs = applyMissionPhaseHooks(npcs, currentMinutes, state.interactionState.missionProgress);
            const dynamicState = applyDynamicRoleResponses(
                npcs,
                dayStats,
                firedSet,
                currentMinutes,
                state.interactionState.missionProgress,
                state.roleTrendHistory,
            );
            npcs = dynamicState.npcs;
            dayStats = dynamicState.dayStats;

            // Sync worker AFTER computing final NPC list
            workerManager.syncNpcs(npcs);
            moveCommands.forEach(cmd => workerManager.moveNpcsToTarget(cmd.ids, cmd.target));

            if (state.firedEventKeys.length !== Array.from(firedSet).length) {
                socket.emit('update-time', currentTime);
            }

            const crossedMidnight = previousMinutes > currentMinutes;
            const trendPoint = buildRoleTrendPoint(currentTime, npcs);
            const roleTrendHistory = crossedMidnight
                ? [trendPoint]
                : upsertRoleTrendPoint(state.roleTrendHistory, trendPoint);

            return {
                npcs,
                dayStats,
                firedEventKeys: Array.from(firedSet),
                roleTrendHistory,
                gameState: {
                    ...state.gameState,
                    inGameTime: currentTime,
                    tensionLevel,
                    currentPhaseLabel,
                    showStatistics: crossedMidnight ? true : state.gameState.showStatistics,
                }
            };
        });
    },

    updateTime: (time) => {
        get().evaluateEvents(time);
    },

    advanceHour: () => {
        const state = get();
        let [h, m] = state.gameState.inGameTime.split(':').map(Number);
        h = (h + 1) % 24;
        const newTime = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
        get().evaluateEvents(newTime);
    },

    rewindHour: () => {
        const state = get();
        let [h, m] = state.gameState.inGameTime.split(':').map(Number);
        h = (h - 1 + 24) % 24;
        const newTime = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
        const currentMinutes = timeToMinutes(newTime);
        const rebuilt = replayWorldStateToMinutes(currentMinutes);
        const npcs = applyMissionPhaseHooks(rebuilt.npcs, currentMinutes, state.interactionState.missionProgress);
        const dynamicState = applyDynamicRoleResponses(
            npcs,
            rebuilt.dayStats,
            rebuilt.firedSet,
            currentMinutes,
            state.interactionState.missionProgress,
            [],
        );
        const tensionLevel = getTensionLevelForMinutes(currentMinutes);
        const currentPhaseLabel = getPhaseLabelForMinutes(currentMinutes, state.gameState.currentPhaseLabel);
        const roleTrendHistory = buildRoleTrendHistoryToMinutes(currentMinutes, state.interactionState.missionProgress);

        workerManager.syncNpcs(dynamicState.npcs);
        set({
            npcs: dynamicState.npcs,
            dayStats: dynamicState.dayStats,
            firedEventKeys: Array.from(dynamicState.firedSet),
            roleTrendHistory,
            gameState: { ...state.gameState, inGameTime: newTime, tensionLevel, currentPhaseLabel }
        });
    },

    advanceMinute: () => {
        const state = get();
        let [h, m] = state.gameState.inGameTime.split(':').map(Number);
        m += 1;
        if (m >= 60) {
            m -= 60;
            h = (h + 1) % 24;
        }
        const newTime = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
        get().evaluateEvents(newTime);
    },

    rewindMinute: () => {
        const state = get();
        let [h, m] = state.gameState.inGameTime.split(':').map(Number);
        m -= 1;
        if (m < 0) {
            m += 60;
            h = (h - 1 + 24) % 24;
        }
        const newTime = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
        const currentMinutes = timeToMinutes(newTime);
        const rebuilt = replayWorldStateToMinutes(currentMinutes);
        const npcs = applyMissionPhaseHooks(rebuilt.npcs, currentMinutes, state.interactionState.missionProgress);
        const dynamicState = applyDynamicRoleResponses(
            npcs,
            rebuilt.dayStats,
            rebuilt.firedSet,
            currentMinutes,
            state.interactionState.missionProgress,
            [],
        );
        const tensionLevel = getTensionLevelForMinutes(currentMinutes);
        const currentPhaseLabel = getPhaseLabelForMinutes(currentMinutes, state.gameState.currentPhaseLabel);
        const roleTrendHistory = buildRoleTrendHistoryToMinutes(currentMinutes, state.interactionState.missionProgress);

        workerManager.syncNpcs(dynamicState.npcs);
        set({
            npcs: dynamicState.npcs,
            dayStats: dynamicState.dayStats,
            firedEventKeys: Array.from(dynamicState.firedSet),
            roleTrendHistory,
            gameState: { ...state.gameState, inGameTime: newTime, tensionLevel, currentPhaseLabel }
        });
    },

    toggleTimePause: () => set((state) => ({
        gameState: { ...state.gameState, isTimePaused: !state.gameState.isTimePaused }
    })),

    setTension: (level) => set((state) => {
        workerManager.sendTension(level);
        return { gameState: { ...state.gameState, tensionLevel: level } };
    }),

    resetDayCycle: () => {
        nextNpcId = 1000;
        set({
            npcs: [],
            firedEventKeys: [],
            roleTrendHistory: [],
            interactionState: {
                nearbyZoneId: null,
                lastMessage: null,
                missionProgress: INITIAL_MISSION_PROGRESS,
            },
            dayStats: { killed: 0, arrested: 0, injured: 0, damage: 0 },
            gameState: { 
                isPlaying: true, isTimePaused: false, inGameTime: '00:00', 
                tensionLevel: 10, timeSpeed: get().gameState.timeSpeed, 
                currentPhaseLabel: '🌅 Tagesbeginn — Stadt erwacht',
                playerReputation: get().gameState.playerReputation,
                moralScore: get().gameState.moralScore,
                showStatistics: false,
                masterVolume: get().gameState.masterVolume,
                muted: get().gameState.muted
            }
        });
    },

    setTimeSpeed: (speed) => set((state) => ({
        gameState: { ...state.gameState, timeSpeed: speed }
    })),

    adjustReputation: (delta) => set((state) => ({
        gameState: { 
            ...state.gameState, 
            playerReputation: Math.max(-100, Math.min(100, state.gameState.playerReputation + delta))
        }
    })),

    showStatisticsPanel: () => set((state) => ({
        gameState: { ...state.gameState, showStatistics: true }
    })),

    dismissStatistics: () => set((state) => ({
        gameState: { ...state.gameState, showStatistics: false }
    })),

    setMasterVolume: (val) => set((state) => ({
        gameState: { ...state.gameState, masterVolume: val }
    })),

    setMuted: (muted) => set((state) => ({
        gameState: { ...state.gameState, muted }
    })),

    setNearbyInteraction: (zoneId) => set((state) => ({
        interactionState: {
            ...state.interactionState,
            nearbyZoneId: zoneId,
        }
    })),

    triggerInteraction: () => set((state) => {
        const zoneId = state.interactionState.nearbyZoneId;
        if (!zoneId) {
            return state;
        }

        const outcome = applyInteractionOutcome(state.interactionState.missionProgress, zoneId);
        const nextReputation = Math.max(-100, Math.min(100, state.gameState.playerReputation + outcome.reputationDelta));
        const nextMoral = Math.max(0, Math.min(100, state.gameState.moralScore + outcome.moralDelta));
        const nextTension = Math.max(0, Math.min(100, state.gameState.tensionLevel + outcome.tensionDelta));
        const nextNpcs = outcome.wasApplied ? applyMissionNpcEffects(state.npcs, zoneId) : state.npcs;
        const nextDayStats = outcome.wasApplied
            ? applyDayStatsDelta(state.dayStats, getInteractionDayStatsDelta(zoneId))
            : state.dayStats;

        if (outcome.wasApplied && nextNpcs !== state.npcs) {
            workerManager.syncNpcs(nextNpcs);
        }

        return {
            npcs: nextNpcs,
            dayStats: nextDayStats,
            interactionState: {
                ...state.interactionState,
                lastMessage: outcome.message,
                missionProgress: outcome.missionProgress,
            },
            gameState: {
                ...state.gameState,
                playerReputation: nextReputation,
                moralScore: nextMoral,
                tensionLevel: nextTension,
                currentPhaseLabel: outcome.phaseLabel ?? state.gameState.currentPhaseLabel,
            },
        };
    })
}));

if (typeof window !== 'undefined') {
    window.__GAME_STORE__ = useGameStore;
}
