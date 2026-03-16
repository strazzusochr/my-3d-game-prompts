import type { RoleTrendPoint } from '../stores/gameStore';

interface DayStatsLike {
    killed: number;
    arrested: number;
    injured: number;
    damage: number;
}

export interface OperationsInsightInput {
    trendHistory: RoleTrendPoint[];
    dayStats: DayStatsLike;
    missionCompletionPercent: number;
    panicRatioPercent: number;
    activeHooks: number;
    maxHooks: number;
    activeDynamicResponses: number;
}

export interface OperationsInsight {
    priority: 'critical' | 'high' | 'medium' | 'low';
    recommendation: string;
    correlationLine: string;
    confidencePercent: number;
    missionPathWeightPercent: number;
    trendSignal: 'stabilizing' | 'deteriorating' | 'volatile' | 'flat';
}

const trendWord = (delta: number) => {
    if (delta >= 3) return 'steigend';
    if (delta <= -3) return 'fallend';
    return 'stabil';
};

export const getOperationsInsight = (input: OperationsInsightInput): OperationsInsight => {
    const view = input.trendHistory.slice(-6);
    const first = view[0];
    const last = view[view.length - 1];

    const deltaAggressors = first && last ? last.aggressors - first.aggressors : 0;
    const deltaSecurity = first && last ? last.security - first.security : 0;
    const deltaSupport = first && last ? last.support - first.support : 0;
    const deltaPanic = first && last ? last.panicRatioPercent - first.panicRatioPercent : 0;
    const latestAggressors = last?.aggressors ?? 0;
    const latestSecurity = last?.security ?? 0;

    const hookUtilization = input.maxHooks > 0 ? Math.round((input.activeHooks / input.maxHooks) * 100) : 0;

    const missionPathWeightRaw =
        100 +
        Math.round((input.missionCompletionPercent - 50) * 0.35) +
        Math.round((hookUtilization - 50) * 0.2) +
        Math.round((input.activeDynamicResponses - 2) * 4) -
        Math.round((input.panicRatioPercent - 30) * 0.3) -
        Math.max(0, (latestAggressors - latestSecurity) * 3);

    const missionPathWeightPercent = Math.max(60, Math.min(140, missionPathWeightRaw));

    let trendSignal: OperationsInsight['trendSignal'] = 'flat';
    if (deltaAggressors <= -2 && deltaPanic <= -3 && deltaSupport >= 0) {
        trendSignal = 'stabilizing';
    } else if (deltaAggressors >= 2 || deltaPanic >= 4 || deltaSecurity <= -2) {
        trendSignal = 'deteriorating';
    } else if (Math.abs(deltaAggressors) + Math.abs(deltaPanic) + Math.abs(deltaSupport) >= 8) {
        trendSignal = 'volatile';
    }

    const correlationLine =
        `Aggression ${trendWord(deltaAggressors)} (${deltaAggressors >= 0 ? '+' : ''}${deltaAggressors}), ` +
        `Sicherheit ${trendWord(deltaSecurity)} (${deltaSecurity >= 0 ? '+' : ''}${deltaSecurity}), ` +
        `Panik ${deltaPanic >= 0 ? '+' : ''}${deltaPanic}pp, ` +
        `Hook-Auslastung ${hookUtilization}%, ` +
        `Pfadgewicht ${missionPathWeightPercent}%, ` +
        `Trend ${trendSignal}.`;

    let priority: OperationsInsight['priority'] = 'low';
    let recommendation = 'Lage stabil: Sektorbeobachtung halten und Missionskette kontrolliert fortsetzen.';

    if (input.panicRatioPercent >= 60 || input.dayStats.injured >= 28 || input.dayStats.damage >= 50000) {
        priority = 'critical';
        recommendation = 'Kritisch: Medizinachsen sichern, Hotspots trennen und Rueckzugsrouten sofort freihalten.';
    } else if (deltaAggressors >= 4 || input.dayStats.damage >= 25000 || input.panicRatioPercent >= 45) {
        priority = 'high';
        recommendation = 'Hoch: Brennpunktsektoren priorisieren, Sicherheitskorridore verdichten und Lagefunk eng takten.';
    } else if (input.missionCompletionPercent < 60 || input.activeDynamicResponses === 0 || deltaSupport <= -2) {
        priority = 'medium';
        recommendation = 'Mittel: Missionsfortschritt erhoehen, Support-Einheiten stabilisieren und Triggerfenster aktiv bedienen.';
    }

    const confidenceRaw =
        45 +
        Math.min(25, view.length * 5) +
        Math.min(15, Math.abs(deltaAggressors) + Math.abs(deltaPanic)) +
        (input.activeDynamicResponses > 0 ? 8 : 0) +
        (input.missionCompletionPercent >= 60 ? 7 : 0) +
        Math.round(Math.abs(missionPathWeightPercent - 100) * 0.08);

    const confidencePercent = Math.max(0, Math.min(99, Math.round(confidenceRaw)));

    return {
        priority,
        recommendation,
        correlationLine,
        confidencePercent,
        missionPathWeightPercent,
        trendSignal,
    };
};
