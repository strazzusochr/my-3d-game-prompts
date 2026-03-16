import type { InteractionZoneId } from '../systems/interactionZones';

export const RUNTIME_SNAPSHOT_KEY = 'ccu.runtime.snapshot.v1';
const MAX_TREND_POINTS = 24;
const MAX_REPLAY_HISTORY_POINTS = 6;

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
    rebuildHistory: RuntimeReplayHistoryPoint[];
    quality: RuntimeReplayQuality;
}

interface RuntimeReplayHistoryPoint {
    mode: 'live' | 'rewind';
    anchorTime: string;
    rebuildEventCount: number;
    savedAtEpochMs: number;
}

interface RuntimeReplayQuality {
    windowMinutes: number;
    rebuildCount: number;
    avgRebuildEvents: number;
    stability: 'stable' | 'watch' | 'critical';
    recentStabilityTrend: Array<'stable' | 'watch' | 'critical'>;
    riskLevel: 'low' | 'medium' | 'high';
    riskHint: 'Stabiler Replay-Betrieb.' | 'Rewind-Takt reduzieren und grobere Spruenge nutzen.' | 'Replay-Risiko hoch: Rewind-Frequenz sofort senken.';
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
    const rebuildHistory = Array.isArray(asObj.rebuildHistory)
        ? asObj.rebuildHistory
            .map((entry) => {
                const item = typeof entry === 'object' && entry !== null ? (entry as Record<string, unknown>) : null;
                if (!item) return null;
                const itemMode = item.mode === 'rewind' ? 'rewind' : 'live';
                const itemEventCountRaw =
                    typeof item.rebuildEventCount === 'number' && Number.isFinite(item.rebuildEventCount)
                        ? item.rebuildEventCount
                        : 0;
                const itemSavedAtRaw =
                    typeof item.savedAtEpochMs === 'number' && Number.isFinite(item.savedAtEpochMs)
                        ? item.savedAtEpochMs
                        : Date.now();
                return {
                    mode: itemMode,
                    anchorTime: normalizeClock(item.anchorTime),
                    rebuildEventCount: Math.max(0, Math.round(itemEventCountRaw)),
                    savedAtEpochMs: Math.max(0, Math.round(itemSavedAtRaw)),
                };
            })
            .filter((entry): entry is RuntimeReplayHistoryPoint => entry !== null)
            .slice(0, MAX_REPLAY_HISTORY_POINTS)
        : [];
    const qualityObj =
        typeof asObj.quality === 'object' && asObj.quality !== null
            ? (asObj.quality as Record<string, unknown>)
            : {};
    const qualityWindowRaw =
        typeof qualityObj.windowMinutes === 'number' && Number.isFinite(qualityObj.windowMinutes)
            ? qualityObj.windowMinutes
            : 90;
    const qualityRebuildCountRaw =
        typeof qualityObj.rebuildCount === 'number' && Number.isFinite(qualityObj.rebuildCount)
            ? qualityObj.rebuildCount
            : rebuildHistory.length;
    const qualityAvgEventsRaw =
        typeof qualityObj.avgRebuildEvents === 'number' && Number.isFinite(qualityObj.avgRebuildEvents)
            ? qualityObj.avgRebuildEvents
            : 0;
    const qualityStability =
        qualityObj.stability === 'critical' || qualityObj.stability === 'watch'
            ? qualityObj.stability
            : 'stable';
    const qualityRiskLevel =
        qualityObj.riskLevel === 'high' || qualityObj.riskLevel === 'medium'
            ? qualityObj.riskLevel
            : 'low';
    const qualityRiskHint =
        qualityObj.riskHint === 'Replay-Risiko hoch: Rewind-Frequenz sofort senken.' ||
        qualityObj.riskHint === 'Rewind-Takt reduzieren und grobere Spruenge nutzen.'
            ? qualityObj.riskHint
            : 'Stabiler Replay-Betrieb.';
    const qualityTrend = Array.isArray(qualityObj.recentStabilityTrend)
        ? qualityObj.recentStabilityTrend
            .filter(
                (item): item is 'stable' | 'watch' | 'critical' =>
                    item === 'stable' || item === 'watch' || item === 'critical',
            )
            .slice(0, 3)
        : [];

    return {
        mode,
        rebuildStatus,
        rebuildEventCount: Math.max(0, Math.round(rebuildEventCountRaw)),
        anchorTime,
        rebuildHistory,
        quality: {
            windowMinutes: clamp(Math.round(qualityWindowRaw), 15, 240),
            rebuildCount: Math.max(0, Math.round(qualityRebuildCountRaw)),
            avgRebuildEvents: Math.max(0, Math.round(qualityAvgEventsRaw)),
            stability: qualityStability,
            recentStabilityTrend: qualityTrend,
            riskLevel: qualityRiskLevel,
            riskHint: qualityRiskHint,
        },
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
