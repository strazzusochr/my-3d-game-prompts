import { beforeEach, describe, expect, it } from 'vitest';

import {
    RUNTIME_SNAPSHOT_KEY,
    clearRuntimeSnapshot,
    loadRuntimeSnapshot,
    saveRuntimeSnapshot,
    type RuntimeSnapshot,
} from '../stores/runtimePersistence';

const baseSnapshot: RuntimeSnapshot = {
    version: 1,
    savedAtEpochMs: 123456,
    inGameTime: '18:30',
    timeSpeed: 1.5,
    playerReputation: 12,
    moralScore: 66,
    masterVolume: 0.7,
    muted: false,
    missionProgress: {
        epochBriefingVerified: true,
        hazardMapPrepared: true,
        prioritizedZoneIds: ['evacuation-board-north', 'evacuation-board-west'],
    },
    dayStats: {
        killed: 1,
        arrested: 8,
        injured: 5,
        damage: 12000,
    },
    roleTrendHistory: [
        {
            time: '18:25',
            security: 12,
            aggressors: 6,
            support: 5,
            civilian: 20,
            panicRatioPercent: 22,
        },
    ],
};

describe('runtimePersistence', () => {
    beforeEach(() => {
        window.localStorage.clear();
    });

    it('speichert und laedt ein valides Snapshot unveraendert', () => {
        saveRuntimeSnapshot(baseSnapshot);
        const loaded = loadRuntimeSnapshot();

        expect(loaded).not.toBeNull();
        expect(loaded?.inGameTime).toBe('18:30');
        expect(loaded?.missionProgress.epochBriefingVerified).toBe(true);
        expect(loaded?.roleTrendHistory).toHaveLength(1);
    });

    it('liefert null bei ungueltigem JSON', () => {
        window.localStorage.setItem(RUNTIME_SNAPSHOT_KEY, '{invalid-json}');
        expect(loadRuntimeSnapshot()).toBeNull();
    });

    it('sanitisiert Zeiten, Grenzen und ungueltige Zonen-Ids', () => {
        window.localStorage.setItem(
            RUNTIME_SNAPSHOT_KEY,
            JSON.stringify({
                ...baseSnapshot,
                inGameTime: '99:99',
                timeSpeed: 99,
                playerReputation: 999,
                moralScore: -10,
                masterVolume: 2,
                missionProgress: {
                    epochBriefingVerified: 1,
                    hazardMapPrepared: 0,
                    prioritizedZoneIds: ['evacuation-board-north', 'evil-zone', 'hazard-console'],
                },
                roleTrendHistory: [{ ...baseSnapshot.roleTrendHistory[0], panicRatioPercent: 999 }],
            }),
        );

        const loaded = loadRuntimeSnapshot();
        expect(loaded).not.toBeNull();
        expect(loaded?.inGameTime).toBe('06:00');
        expect(loaded?.timeSpeed).toBe(10);
        expect(loaded?.playerReputation).toBe(100);
        expect(loaded?.moralScore).toBe(0);
        expect(loaded?.masterVolume).toBe(1);
        expect(loaded?.missionProgress.prioritizedZoneIds).toEqual(['evacuation-board-north', 'hazard-console']);
        expect(loaded?.roleTrendHistory[0].panicRatioPercent).toBe(100);
    });

    it('entfernt Snapshot mit clearRuntimeSnapshot', () => {
        saveRuntimeSnapshot(baseSnapshot);
        clearRuntimeSnapshot();

        expect(window.localStorage.getItem(RUNTIME_SNAPSHOT_KEY)).toBeNull();
    });
});
