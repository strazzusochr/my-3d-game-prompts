import type { InteractionZoneId } from '../systems/interactionZones';

export const RUNTIME_SNAPSHOT_KEY = 'ccu.runtime.snapshot.v1';
const MAX_TREND_POINTS = 24;

interface RuntimeMissionProgress {
    epochBriefingVerified: boolean;
    hazardMapPrepared: boolean;
    prioritizedZoneIds: InteractionZoneId[];
}

interface RuntimeDayStats {
    killed: number;
    arrested: number;
    injured: number;
    damage: number;
}

interface RuntimeTrendPoint {
    time: string;
    security: number;
    aggressors: number;
    support: number;
    civilian: number;
    panicRatioPercent: number;
}

interface RuntimeReplayState {
    mode: 'live' | 'rewind';
    rebuildStatus: 'idle' | 'reconstructed';
    rebuildEventCount: number;
    anchorTime: string;
}

export interface RuntimeSnapshot {
    version: 1;
    savedAtEpochMs: number;
    inGameTime: string;
    timeSpeed: number;
    playerReputation: number;
    moralScore: number;
    masterVolume: number;
    muted: boolean;
    missionProgress: RuntimeMissionProgress;
    dayStats: RuntimeDayStats;
    roleTrendHistory: RuntimeTrendPoint[];
    replayState: RuntimeReplayState;
}

const ALLOWED_ZONE_IDS = new Set<InteractionZoneId>([
    'epoch-terminal',
    'hazard-console',
    'evacuation-board-north',
    'evacuation-board-west',
    'evacuation-board-south',
]);

const hasStorage = () => typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

const normalizeClock = (value: unknown) => {
    if (typeof value !== 'string') return '06:00';
    const match = value.match(/^(\d{2}):(\d{2})$/);
    if (!match) return '06:00';
    const h = Number(match[1]);
    const m = Number(match[2]);
    if (!Number.isFinite(h) || !Number.isFinite(m)) return '06:00';
    if (h < 0 || h > 23 || m < 0 || m > 59) return '06:00';
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
};

const normalizeMissionProgress = (value: unknown): RuntimeMissionProgress => {
    const asObj = typeof value === 'object' && value !== null ? (value as Record<string, unknown>) : {};
    const zoneIdsRaw = Array.isArray(asObj.prioritizedZoneIds) ? asObj.prioritizedZoneIds : [];
    const prioritizedZoneIds = zoneIdsRaw
        .filter((id): id is InteractionZoneId => typeof id === 'string' && ALLOWED_ZONE_IDS.has(id as InteractionZoneId))
        .slice(0, 3);

    return {
        epochBriefingVerified: Boolean(asObj.epochBriefingVerified),
        hazardMapPrepared: Boolean(asObj.hazardMapPrepared),
        prioritizedZoneIds,
    };
};

const normalizeDayStats = (value: unknown): RuntimeDayStats => {
    const asObj = typeof value === 'object' && value !== null ? (value as Record<string, unknown>) : {};
    const toNumber = (raw: unknown) => (typeof raw === 'number' && Number.isFinite(raw) ? raw : 0);

    return {
        killed: Math.max(0, Math.round(toNumber(asObj.killed))),
        arrested: Math.max(0, Math.round(toNumber(asObj.arrested))),
        injured: Math.max(0, Math.round(toNumber(asObj.injured))),
        damage: Math.max(0, Math.round(toNumber(asObj.damage))),
    };
};

const normalizeRoleTrendHistory = (value: unknown): RuntimeTrendPoint[] => {
    if (!Array.isArray(value)) return [];

    const toNumber = (raw: unknown, min: number, max: number) => {
        const n = typeof raw === 'number' && Number.isFinite(raw) ? raw : 0;
        return clamp(Math.round(n), min, max);
    };

    return value
        .map((item) => {
            const asObj = typeof item === 'object' && item !== null ? (item as Record<string, unknown>) : null;
            if (!asObj) return null;
            return {
                time: normalizeClock(asObj.time),
                security: toNumber(asObj.security, 0, 999),
                aggressors: toNumber(asObj.aggressors, 0, 999),
                support: toNumber(asObj.support, 0, 999),
                civilian: toNumber(asObj.civilian, 0, 9999),
                panicRatioPercent: toNumber(asObj.panicRatioPercent, 0, 100),
            };
        })
        .filter((item): item is RuntimeTrendPoint => item !== null)
        .slice(-MAX_TREND_POINTS);
};

const normalizeReplayState = (value: unknown, fallbackAnchorTime: string): RuntimeReplayState => {
    const asObj = typeof value === 'object' && value !== null ? (value as Record<string, unknown>) : {};
    const mode = asObj.mode === 'rewind' ? 'rewind' : 'live';
    const rebuildStatus = asObj.rebuildStatus === 'reconstructed' ? 'reconstructed' : 'idle';
    const anchorTime = normalizeClock(asObj.anchorTime ?? fallbackAnchorTime);
    const rebuildEventCountRaw =
        typeof asObj.rebuildEventCount === 'number' && Number.isFinite(asObj.rebuildEventCount)
            ? asObj.rebuildEventCount
            : 0;

    return {
        mode,
        rebuildStatus,
        rebuildEventCount: Math.max(0, Math.round(rebuildEventCountRaw)),
        anchorTime,
    };
};

const normalizeSnapshot = (value: unknown): RuntimeSnapshot => {
    const asObj = typeof value === 'object' && value !== null ? (value as Record<string, unknown>) : {};
    const inGameTime = normalizeClock(asObj.inGameTime);

    return {
        version: 1,
        savedAtEpochMs: typeof asObj.savedAtEpochMs === 'number' && Number.isFinite(asObj.savedAtEpochMs)
            ? Math.max(0, Math.round(asObj.savedAtEpochMs))
            : Date.now(),
        inGameTime,
        timeSpeed: clamp(
            typeof asObj.timeSpeed === 'number' && Number.isFinite(asObj.timeSpeed) ? asObj.timeSpeed : 1,
            0.25,
            10,
        ),
        playerReputation: clamp(
            typeof asObj.playerReputation === 'number' && Number.isFinite(asObj.playerReputation)
                ? Math.round(asObj.playerReputation)
                : 0,
            -100,
            100,
        ),
        moralScore: clamp(
            typeof asObj.moralScore === 'number' && Number.isFinite(asObj.moralScore)
                ? Math.round(asObj.moralScore)
                : 50,
            0,
            100,
        ),
        masterVolume: clamp(
            typeof asObj.masterVolume === 'number' && Number.isFinite(asObj.masterVolume) ? asObj.masterVolume : 0.5,
            0,
            1,
        ),
        muted: Boolean(asObj.muted),
        missionProgress: normalizeMissionProgress(asObj.missionProgress),
        dayStats: normalizeDayStats(asObj.dayStats),
        roleTrendHistory: normalizeRoleTrendHistory(asObj.roleTrendHistory),
        replayState: normalizeReplayState(asObj.replayState, inGameTime),
    };
};

export const loadRuntimeSnapshot = (): RuntimeSnapshot | null => {
    if (!hasStorage()) return null;

    try {
        const raw = window.localStorage.getItem(RUNTIME_SNAPSHOT_KEY);
        if (!raw) return null;
        const parsed: unknown = JSON.parse(raw);
        return normalizeSnapshot(parsed);
    } catch {
        return null;
    }
};

export const saveRuntimeSnapshot = (snapshot: RuntimeSnapshot) => {
    if (!hasStorage()) return;

    try {
        window.localStorage.setItem(RUNTIME_SNAPSHOT_KEY, JSON.stringify(normalizeSnapshot(snapshot)));
    } catch {
        // no-op
    }
};

export const clearRuntimeSnapshot = () => {
    if (!hasStorage()) return;
    try {
        window.localStorage.removeItem(RUNTIME_SNAPSHOT_KEY);
    } catch {
        // no-op
    }
};
