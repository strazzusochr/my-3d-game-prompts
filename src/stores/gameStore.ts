import { create } from 'zustand';
import { NPCType, EmotionalState, NPCMood, NPCBehavior } from '../types/enums';
import { workerManager } from '../managers/WorkerManager';
import { EVENT_TIMELINE, TENSION_TIMELINE, PHASE_DESCRIPTIONS, NPC_COLORS, MAX_ACTIVE_NPCS, timeToMinutes } from '../systems/eventScheduler';
import { io } from 'socket.io-client';

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

interface GameStore {
    npcs: NPCData[];
    firedEventKeys: string[];
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
    dayStats: {
        killed: number;
        arrested: number;
        injured: number;
        damage: number;  // Sachschaden in €
    };
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
    dismissStatistics: () => void;
    setMasterVolume: (vol: number) => void;
    setMuted: (muted: boolean) => void;
    initSocket: () => void;
}

let nextNpcId = 1000;

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

export const useGameStore = create<GameStore>((set, get) => ({
    npcs: [],
    firedEventKeys: [],
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
            const firedSet = new Set(state.firedEventKeys);
            let npcs = [...state.npcs];
            const moveCommands: { ids: number[], target: [number, number, number] }[] = [];

            // Process all events up to current time
            EVENT_TIMELINE.forEach((event, index) => {
                const eventKey = `evt-${index}`;
                const eventMinutes = timeToMinutes(event.time);

                if (eventMinutes <= currentMinutes && !firedSet.has(eventKey)) {
                    firedSet.add(eventKey);

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
                        // Update mood and behavior of all NPCs of this type
                        npcs = npcs.map(n => {
                            if (n.type === event.npcType) {
                                return {
                                    ...n,
                                    mood: event.targetMood || n.mood,
                                    behavior: event.targetBehavior || n.behavior
                                };
                            }
                            return n;
                        });
                    } else if (event.action === 'BEHAVIOR_CHANGE') {
                        npcs = npcs.map(n => {
                            if (n.type === event.npcType) {
                                return { ...n, behavior: event.targetBehavior || n.behavior };
                            }
                            return n;
                        });
                    }
                }
            });

            // Update tension
            let tensionLevel = state.gameState.tensionLevel;
            for (const t of TENSION_TIMELINE) {
                if (timeToMinutes(t.time) <= currentMinutes) {
                    tensionLevel = t.level;
                }
            }

            // Update phase label
            let currentPhaseLabel = state.gameState.currentPhaseLabel;
            for (const p of PHASE_DESCRIPTIONS) {
                if (timeToMinutes(p.time) <= currentMinutes) {
                    currentPhaseLabel = p.label;
                }
            }

            // Sync worker AFTER computing final NPC list
            workerManager.syncNpcs(npcs);
            moveCommands.forEach(cmd => workerManager.moveNpcsToTarget(cmd.ids, cmd.target));

            if (state.firedEventKeys.length !== Array.from(firedSet).length) {
                socket.emit('update-time', currentTime);
            }

            return {
                npcs,
                firedEventKeys: Array.from(firedSet),
                gameState: { ...state.gameState, inGameTime: currentTime, tensionLevel, currentPhaseLabel }
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
        
        // When rewinding: rebuild NPC state from scratch up to new time
        nextNpcId = 1000;
        const currentMinutes = timeToMinutes(newTime);
        const firedSet = new Set<string>();
        let npcs: NPCData[] = [];

        EVENT_TIMELINE.forEach((event, index) => {
            const eventKey = `evt-${index}`;
            const eventMinutes = timeToMinutes(event.time);

            if (eventMinutes <= currentMinutes) {
                firedSet.add(eventKey);

                if (event.action === 'SPAWN' && event.position) {
                    const maxCanSpawn = Math.max(0, MAX_ACTIVE_NPCS - npcs.length);
                    const count = Math.min(event.count, maxCanSpawn);
                    if (count > 0) {
                        const newNpcs = createNpcs(event.npcType, count, event.position, event.radius || 5, event.mood, event.behavior);
                        npcs = [...npcs, ...newNpcs];
                    }
                } else if (event.action === 'DESPAWN') {
                    npcs = removeNpcs(npcs, event.npcType, event.count);
                }
            }
        });

        let tensionLevel = 10;
        for (const t of TENSION_TIMELINE) {
            if (timeToMinutes(t.time) <= currentMinutes) {
                tensionLevel = t.level;
            }
        }

        workerManager.syncNpcs(npcs);
        set({
            npcs,
            firedEventKeys: Array.from(firedSet),
            gameState: { ...state.gameState, inGameTime: newTime, tensionLevel }
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
        
        // When rewinding: rebuild NPC state from scratch up to new time
        nextNpcId = 1000;
        const currentMinutes = timeToMinutes(newTime);
        const firedSet = new Set<string>();
        let npcs: NPCData[] = [];

        EVENT_TIMELINE.forEach((event, index) => {
            const eventKey = `evt-${index}`;
            const eventMinutes = timeToMinutes(event.time);

            if (eventMinutes <= currentMinutes) {
                firedSet.add(eventKey);

                if (event.action === 'SPAWN' && event.position) {
                    const maxCanSpawn = Math.max(0, MAX_ACTIVE_NPCS - npcs.length);
                    const count = Math.min(event.count, maxCanSpawn);
                    if (count > 0) {
                        const newNpcs = createNpcs(event.npcType, count, event.position, event.radius || 5, event.mood, event.behavior);
                        npcs = [...npcs, ...newNpcs];
                    }
                } else if (event.action === 'DESPAWN') {
                    npcs = removeNpcs(npcs, event.npcType, event.count);
                }
            }
        });

        let tensionLevel = 10;
        for (const t of TENSION_TIMELINE) {
            if (timeToMinutes(t.time) <= currentMinutes) {
                tensionLevel = t.level;
            }
        }

        workerManager.syncNpcs(npcs);
        set({
            npcs,
            firedEventKeys: Array.from(firedSet),
            gameState: { ...state.gameState, inGameTime: newTime, tensionLevel }
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

    dismissStatistics: () => set((state) => ({
        gameState: { ...state.gameState, showStatistics: false }
    })),

    setMasterVolume: (val) => set((state) => ({
        gameState: { ...state.gameState, masterVolume: val }
    })),

    setMuted: (muted) => set((state) => ({
        gameState: { ...state.gameState, muted }
    }))
}));
