import { describe, expect, it } from 'vitest';
import { getOperationsInsight } from '../systems/operationsInsights';
import type { RoleTrendPoint } from '../stores/gameStore';

const baseTrend = (items: Array<Partial<RoleTrendPoint>>): RoleTrendPoint[] =>
  items.map((item, index) => ({
    time: item.time ?? `1${index}:00`,
    security: item.security ?? 10,
    aggressors: item.aggressors ?? 10,
    support: item.support ?? 4,
    civilian: item.civilian ?? 20,
    panicRatioPercent: item.panicRatioPercent ?? 20,
  }));

describe('operations insights', () => {
  it('returns critical priority for very high panic and damage pressure', () => {
    const insight = getOperationsInsight({
      trendHistory: baseTrend([
        { aggressors: 12, panicRatioPercent: 48 },
        { aggressors: 15, panicRatioPercent: 68 },
      ]),
      dayStats: { killed: 0, arrested: 4, injured: 31, damage: 62000 },
      missionCompletionPercent: 70,
      panicRatioPercent: 68,
      activeHooks: 3,
      maxHooks: 4,
      activeDynamicResponses: 2,
    });

    expect(insight.priority).toBe('critical');
    expect(insight.recommendation).toContain('Kritisch');
    expect(insight.confidencePercent).toBeGreaterThanOrEqual(60);
    expect(insight.missionPathWeightPercent).toBeLessThan(100);
  });

  it('returns medium priority when mission progress and support are weak', () => {
    const insight = getOperationsInsight({
      trendHistory: baseTrend([
        { support: 5, aggressors: 9, panicRatioPercent: 22 },
        { support: 2, aggressors: 10, panicRatioPercent: 24 },
      ]),
      dayStats: { killed: 0, arrested: 1, injured: 4, damage: 6000 },
      missionCompletionPercent: 42,
      panicRatioPercent: 24,
      activeHooks: 1,
      maxHooks: 4,
      activeDynamicResponses: 0,
    });

    expect(insight.priority).toBe('medium');
    expect(insight.recommendation).toContain('Mittel');
    expect(insight.correlationLine).toContain('Hook-Auslastung');
    expect(insight.correlationLine).toContain('Pfadgewicht');
    expect(insight.missionPathWeightPercent).toBeLessThanOrEqual(100);
  });

  it('returns low priority for stable trends', () => {
    const insight = getOperationsInsight({
      trendHistory: baseTrend([
        { security: 12, aggressors: 8, support: 4, panicRatioPercent: 14 },
        { security: 12, aggressors: 8, support: 4, panicRatioPercent: 14 },
      ]),
      dayStats: { killed: 0, arrested: 0, injured: 1, damage: 1200 },
      missionCompletionPercent: 88,
      panicRatioPercent: 14,
      activeHooks: 4,
      maxHooks: 4,
      activeDynamicResponses: 2,
    });

    expect(insight.priority).toBe('low');
    expect(insight.recommendation).toContain('stabil');
    expect(insight.missionPathWeightPercent).toBeGreaterThanOrEqual(95);
  });

  it('raises mission path weight for high completion and hook utilization', () => {
    const insight = getOperationsInsight({
      trendHistory: baseTrend([
        { security: 13, aggressors: 7, support: 6, panicRatioPercent: 12 },
        { security: 14, aggressors: 6, support: 7, panicRatioPercent: 10 },
      ]),
      dayStats: { killed: 0, arrested: 3, injured: 2, damage: 1800 },
      missionCompletionPercent: 92,
      panicRatioPercent: 10,
      activeHooks: 4,
      maxHooks: 4,
      activeDynamicResponses: 4,
    });

    expect(insight.priority).toBe('low');
    expect(insight.missionPathWeightPercent).toBeGreaterThan(110);
  });
});
