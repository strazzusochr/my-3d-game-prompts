import { NPCBehavior, NPCMood } from '../types/enums';
import type { NPCData } from '../stores/gameStore';
import type { MissionProgress } from './interactionZones';

export interface HudTelemetry {
    currentMinutes: number;
    phaseWindow: 'NIGHT' | 'MORNING' | 'MIDDAY' | 'EVENING' | 'LATE';
    missionCompletionPercent: number;
    activeHooks: number;
    maxHooks: number;
    hookReadinessPercent: number;
    panicRatioPercent: number;
    behaviorCounts: {
        gather: number;
        cleanup: number;
        shieldWall: number;
        flee: number;
        retreat: number;
    };
}

const MAX_MISSION_STEPS = 5;

export const timeToMinutesSafe = (time: string): number => {
    const [hRaw, mRaw] = time.split(':');
    const h = Number(hRaw);
    const m = Number(mRaw);

    if (!Number.isFinite(h) || !Number.isFinite(m)) {
        return 0;
    }

    return Math.max(0, Math.min(23 * 60 + 59, h * 60 + m));
};

export const getPhaseWindow = (minutes: number): HudTelemetry['phaseWindow'] => {
    if (minutes >= 21 * 60) return 'LATE';
    if (minutes >= 18 * 60) return 'EVENING';
    if (minutes >= 12 * 60) return 'MIDDAY';
    if (minutes >= 6 * 60) return 'MORNING';
    return 'NIGHT';
};

const countBehavior = (npcs: NPCData[], behavior: NPCBehavior) => npcs.filter((npc) => npc.behavior === behavior).length;

const missionCompletionPercent = (progress: MissionProgress) => {
    const completed =
        (progress.epochBriefingVerified ? 1 : 0) +
        (progress.hazardMapPrepared ? 1 : 0) +
        Math.min(progress.prioritizedZoneIds.length, 3);

    return Math.round((completed / MAX_MISSION_STEPS) * 100);
};

const hookReadinessPercent = (progress: MissionProgress) => {
    const readiness =
        (progress.epochBriefingVerified ? 1 : 0) +
        (progress.hazardMapPrepared ? 1 : 0) +
        Math.min(progress.prioritizedZoneIds.length, 3) / 3;

    return Math.round((readiness / 3) * 100);
};

const activeHookCount = (minutes: number, progress: MissionProgress) => {
    let active = 0;

    if (minutes >= 12 * 60 && minutes < 18 * 60 && progress.epochBriefingVerified) {
        active += 1;
    }

    if (minutes >= 18 * 60 && progress.hazardMapPrepared) {
        active += 1;
    }

    if (minutes >= 18 * 60 && progress.prioritizedZoneIds.length > 0) {
        active += 1;
    }

    if (minutes >= 21 * 60 && progress.prioritizedZoneIds.length >= 3) {
        active += 1;
    }

    return active;
};

export const getHudTelemetry = (
    time: string,
    progress: MissionProgress,
    npcs: NPCData[],
): HudTelemetry => {
    const currentMinutes = timeToMinutesSafe(time);
    const panicCount = npcs.filter((npc) => npc.mood === NPCMood.PANICKED || npc.mood === NPCMood.RIOTING).length;

    return {
        currentMinutes,
        phaseWindow: getPhaseWindow(currentMinutes),
        missionCompletionPercent: missionCompletionPercent(progress),
        activeHooks: activeHookCount(currentMinutes, progress),
        maxHooks: 4,
        hookReadinessPercent: hookReadinessPercent(progress),
        panicRatioPercent: npcs.length > 0 ? Math.round((panicCount / npcs.length) * 100) : 0,
        behaviorCounts: {
            gather: countBehavior(npcs, NPCBehavior.GATHER),
            cleanup: countBehavior(npcs, NPCBehavior.CLEANUP),
            shieldWall: countBehavior(npcs, NPCBehavior.SHIELD_WALL),
            flee: countBehavior(npcs, NPCBehavior.FLEE),
            retreat: countBehavior(npcs, NPCBehavior.RETREAT),
        },
    };
};
