import React, { useState, useEffect, useRef } from 'react';
import { useGameStore } from '../../stores/gameStore';
import { EVENT_TIMELINE } from '../../systems/eventScheduler';
import { getInteractionAvailability, getInteractionZoneById, getMissionChecklist } from '../../systems/interactionZones';
import { getHudTelemetry } from '../../systems/hudTelemetry';
import { getOperationsInsight } from '../../systems/operationsInsights';
import { getAdaptiveTriggerCurve } from '../../systems/npcAdaptiveCurves';

const StatusBar = ({ label, value, color }: { label: string, value: number, color: string }) => (
    <div style={{ marginBottom: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '800', color: '#ffcc00', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px', textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}>
            <span>{label}</span>
        </div>
        <div style={{ height: '7px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ height: '100%', width: `${value}%`, background: color, boxShadow: `0 0 10px ${color}` }} />
        </div>
    </div>
);

const PDC25_EPOCH2 = {
    assessmentDate: '28.04.2028',
    impactDate: '24.04.2041',
    impactProbability: 100,
    diameterRange: '141 - 159 m',
    diameterLikely: '147 - 152 m',
    diameterMedian: '150 m',
    energyRange: '45 - 158 Mt',
    energyLikely: '63 - 105 Mt',
    energyMedian: '88 Mt',
};

type HudPanelKey =
    | 'left'
    | 'top'
    | 'right'
    | 'bottom'
    | 'interaction'
    | 'nasa'
    | 'telemetry'
    | 'mission'
    | 'timeline';

type PanelUiState = Record<HudPanelKey, { minimized: boolean; zoom2: boolean }>;

const makeDefaultPanelState = (): PanelUiState => ({
    left: { minimized: false, zoom2: false },
    top: { minimized: false, zoom2: false },
    right: { minimized: false, zoom2: false },
    bottom: { minimized: false, zoom2: false },
    interaction: { minimized: false, zoom2: false },
    nasa: { minimized: false, zoom2: false },
    telemetry: { minimized: false, zoom2: false },
    mission: { minimized: false, zoom2: false },
    timeline: { minimized: false, zoom2: false },
});

export const HUD = () => {
    const [statsTab, setStatsTab] = useState<'overview' | 'operations' | 'mission'>('overview');
    const inGameTime = useGameStore(state => state.gameState.inGameTime);
    const isTimePaused = useGameStore(state => state.gameState.isTimePaused);
    const tensionLevel = useGameStore(state => state.gameState.tensionLevel);
    const timeSpeed = useGameStore(state => state.gameState.timeSpeed);
    const currentPhaseLabel = useGameStore(state => state.gameState.currentPhaseLabel);
    const replayMode = useGameStore(state => state.gameState.replayMode);
    const replayRebuildStatus = useGameStore(state => state.gameState.replayRebuildStatus);
    const replayRebuildEventCount = useGameStore(state => state.gameState.replayRebuildEventCount);
    const replayAnchorTime = useGameStore(state => state.gameState.replayAnchorTime);
    const replayRebuildHistory = useGameStore(state => state.gameState.replayRebuildHistory);
    const playerReputation = useGameStore(state => state.gameState.playerReputation);
    const moralScore = useGameStore(state => state.gameState.moralScore);
    const npcCount = useGameStore(state => state.npcs.length);
    const npcs = useGameStore(state => state.npcs);
    const missionProgress = useGameStore(state => state.interactionState.missionProgress);
    const dayStats = useGameStore(state => state.dayStats);
    const showStatistics = useGameStore(state => state.gameState.showStatistics);
    const firedEventKeys = useGameStore(state => state.firedEventKeys);
    const roleTrendHistory = useGameStore(state => state.roleTrendHistory);
    const masterVolume = useGameStore(state => state.gameState.masterVolume);
    const muted = useGameStore(state => state.gameState.muted);
    const interactionState = useGameStore(state => state.interactionState);
    const { advanceHour, rewindHour, advanceMinute, rewindMinute, toggleTimePause, setTimeSpeed, setMasterVolume, setMuted, showStatisticsPanel, dismissStatistics } = useGameStore();

    // Timeline Scroll Ref
    const timelineRef = useRef<HTMLDivElement>(null);
    const activeEventRef = useRef<HTMLDivElement>(null);
    const [hudScale, setHudScale] = useState(() => {
        if (typeof window === 'undefined') return 1;
        const stored = Number(window.localStorage.getItem('hud-scale'));
        return Number.isFinite(stored) && stored >= 0.5 && stored <= 1.2 ? stored : 0.68;
    });
    const [viewportHudFit, setViewportHudFit] = useState(1);
    const [panelUi, setPanelUi] = useState<PanelUiState>(() => makeDefaultPanelState());
    const [viewportHeight, setViewportHeight] = useState(1080);
    const [streamProfileState, setStreamProfileState] = useState<{ active: 'low' | 'medium' | 'high' | 'aaa' | 'unknown'; status: string }>({
        active: 'unknown',
        status: 'Profilsteuerung bereit',
    });
    const [streamProfileLoading, setStreamProfileLoading] = useState<'low' | 'medium' | 'high' | 'aaa' | null>(null);

    // FPS Counter
    const [fps, setFps] = useState(60);
    const frameCount = useRef(0);
    const lastTime = useRef(performance.now());

    useEffect(() => {
        let raf: number;
        const loop = () => {
            frameCount.current++;
            const now = performance.now();
            if (now - lastTime.current >= 1000) {
                setFps(frameCount.current);
                frameCount.current = 0;
                lastTime.current = now;
            }
            raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(raf);
    }, []);

    const fwdSpeeds = [1, 2, 3, 4, 5, 10, 20];
    const revSpeeds = [-1, -2, -3, -4, -5, -10, -20];
    const isReverse = timeSpeed < 0;
    const absSpeed = Math.abs(timeSpeed);

    // Zeit-Farbe laut Master Plan: Modifiziert von User "Uhr soll immer gelb/nicht weiß sein"
    const [h, m] = inGameTime.split(':').map(Number);
    const timeColor = (h >= 8 && h < 17) ? '#ffcc00' : (h >= 6 && h < 8 || h >= 17 && h < 20) ? '#ffcc00' : '#6688ff';
    const timeShadow = (h >= 8 && h < 17) ? 'rgba(255,204,0,0.4)' : (h >= 6 && h < 8 || h >= 17 && h < 20) ? 'rgba(255,204,0,0.4)' : 'rgba(102,136,255,0.4)';
    const activeInteraction = getInteractionZoneById(interactionState.nearbyZoneId);
    const activeInteractionAvailability = activeInteraction ? getInteractionAvailability(interactionState.missionProgress, activeInteraction.id) : null;
    const missionChecklist = getMissionChecklist(interactionState.missionProgress);
    const telemetry = getHudTelemetry(inGameTime, missionProgress, npcs);
    const phaseWindowLabel = {
        NIGHT: 'Nacht',
        MORNING: 'Morgen',
        MIDDAY: 'Mittag',
        EVENING: 'Abend',
        LATE: 'Spaetphase',
    }[telemetry.phaseWindow];
    const phaseWindowColor = {
        NIGHT: '#6688ff',
        MORNING: '#00ccff',
        MIDDAY: '#ffcc00',
        EVENING: '#ffaa44',
        LATE: '#ff6666',
    }[telemetry.phaseWindow];
    const activeRoleResponses = [
        { key: 'dyn-evening-reinforcement', label: 'Hundertschaft dynamisch aktiviert', color: '#88ddff' },
        { key: 'dyn-late-triage', label: 'Triage-Korridor dynamisch aktiv', color: '#99ffcc' },
        { key: 'dyn-high-medical-relief', label: 'Medical Relief (HIGH) aktiv', color: '#66ffcc' },
        { key: 'dyn-critical-lockdown', label: 'SEK Lockdown (CRITICAL) aktiv', color: '#ff8888' },
        { key: 'dyn-mission-epoch-media', label: 'Mission Branch: Medienabschirmung', color: '#88ccff' },
        { key: 'dyn-mission-epoch-press-corridor', label: 'Mission Branch: Pressekorridor', color: '#77bbff' },
        { key: 'dyn-mission-epoch-misinformation', label: 'Mission Branch: Fehlinfo-Welle', color: '#ff9966' },
        { key: 'dyn-mission-hazard-shield', label: 'Mission Branch: Gefahrenzonen-Schild', color: '#aaddff' },
        { key: 'dyn-mission-hazard-firebreak', label: 'Mission Branch: Firebreak-Kette', color: '#88ffd0' },
        { key: 'dyn-mission-hazard-surge', label: 'Mission Branch: Hazard-Surge', color: '#ff8877' },
        { key: 'dyn-mission-fullchain-deescalation', label: 'Mission Branch: Vollkette Deeskalation', color: '#99ffbb' },
        { key: 'dyn-mission-fullchain-recovery', label: 'Mission Branch: Recovery-Welle', color: '#66ffcc' },
        { key: 'dyn-mission-fragmented-command', label: 'Mission Branch: Fragmented Command', color: '#ff6666' },
        { key: 'dyn-trend-synchronization', label: 'Trend Branch: Synchronisierung', color: '#66ddff' },
        { key: 'dyn-trend-fracture-wave', label: 'Trend Branch: Fracture-Wave', color: '#ff7755' },
    ].filter((response) => firedEventKeys.includes(response.key));
    const operationsInsight = getOperationsInsight({
        trendHistory: roleTrendHistory,
        dayStats,
        missionCompletionPercent: telemetry.missionCompletionPercent,
        panicRatioPercent: telemetry.panicRatioPercent,
        activeHooks: telemetry.activeHooks,
        maxHooks: telemetry.maxHooks,
        activeDynamicResponses: activeRoleResponses.length,
    });
    const trendView = roleTrendHistory.slice(-10);
    const latestTrendPoint = trendView.length > 0 ? trendView[trendView.length - 1] : null;
    const aggressorPressure = latestTrendPoint ? latestTrendPoint.aggressors - latestTrendPoint.security : 0;
    const supportReserve = latestTrendPoint ? latestTrendPoint.support : 0;
    const phaseScaleProfile = operationsInsight.phaseBand === 'MORNING'
        ? { syncThreshold: 102, fractureThreshold: 93 }
        : operationsInsight.phaseBand === 'MIDDAY'
            ? { syncThreshold: 103, fractureThreshold: 92 }
            : operationsInsight.phaseBand === 'EVENING'
                ? { syncThreshold: 106, fractureThreshold: 96 }
                : operationsInsight.phaseBand === 'LATE'
                    ? { syncThreshold: 108, fractureThreshold: 98 }
                    : { syncThreshold: 103, fractureThreshold: 94 };
    const adaptiveCurvePreview = getAdaptiveTriggerCurve({
        aggressorPressure,
        supportReserve,
        trendSignal: operationsInsight.trendSignal,
        trendMomentumScore: operationsInsight.trendMomentumScore,
        trendTurbulenceScore: operationsInsight.trendTurbulenceScore,
    });
    const adaptiveSyncThreshold = Math.max(96, Math.min(116, phaseScaleProfile.syncThreshold + adaptiveCurvePreview.syncThresholdDelta));
    const adaptiveFractureThreshold = Math.max(88, Math.min(104, phaseScaleProfile.fractureThreshold + adaptiveCurvePreview.fractureThresholdDelta));
    const trendMax = Math.max(1, ...trendView.map((point) => Math.max(point.security, point.aggressors, point.support)));
    const mapTrendLine = (selector: (point: (typeof trendView)[number]) => number) => {
        if (trendView.length <= 1) return '';
        return trendView
            .map((point, index) => {
                const x = (index / (trendView.length - 1)) * 100;
                const y = 100 - (selector(point) / trendMax) * 100;
                return `${x},${Number.isFinite(y) ? y : 100}`;
            })
            .join(' ');
    };

    // Auto-Scroll to current event
    useEffect(() => {
        if (activeEventRef.current && timelineRef.current) {
            activeEventRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [h, m]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.localStorage.setItem('hud-scale', String(hudScale));
        }
    }, [hudScale]);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const applyFit = () => {
            const widthFit = window.innerWidth / 1920;
            const heightFit = window.innerHeight / 1080;
            const fit = Math.min(widthFit, heightFit);
            setViewportHudFit(Math.min(1, Math.max(0.8, fit)));
            setViewportHeight(window.innerHeight);
        };
        applyFit();
        window.addEventListener('resize', applyFit);
        return () => window.removeEventListener('resize', applyFit);
    }, []);

    const decreaseHudScale = () => setHudScale((value) => Math.max(0.5, Number((value - 0.05).toFixed(2))));
    const increaseHudScale = () => setHudScale((value) => Math.min(1.2, Number((value + 0.05).toFixed(2))));
    const resetHudScale = () => setHudScale(0.68);

    const togglePanelMinimize = (panel: HudPanelKey) => {
        setPanelUi((prev) => ({
            ...prev,
            [panel]: { ...prev[panel], minimized: !prev[panel].minimized },
        }));
    };

    const togglePanelZoom2 = (panel: HudPanelKey) => {
        setPanelUi((prev) => ({
            ...prev,
            [panel]: { ...prev[panel], zoom2: !prev[panel].zoom2 },
        }));
    };

    const panelScaleStyle = (panel: HudPanelKey, origin: string): React.CSSProperties => ({
        transform: panelUi[panel].zoom2 ? 'scale(2)' : 'scale(1)',
        transformOrigin: origin,
    });

    const streamProfile = streamProfileState.active;
    const effectiveHudScale = Number((hudScale * viewportHudFit).toFixed(3));
    const timelineMaxHeight = Math.max(160, Math.min(360, Math.round((viewportHeight * 0.34) / effectiveHudScale)));
    const compactBottomLayout = viewportHeight < 920;
    const bottomOrderStyle = (order: number): React.CSSProperties => (compactBottomLayout ? { order } : {});

    const switchStreamProfile = async (profile: 'low' | 'medium' | 'high' | 'aaa') => {
        try {
            setStreamProfileLoading(profile);
            setStreamProfileState((prev) => ({ ...prev, status: `Schalte Profil: ${profile.toUpperCase()}...` }));
            const res = await fetch(`/api/profile/${profile}`, { method: 'POST' });
            if (!res.ok) {
                setStreamProfileState((prev) => ({ ...prev, status: `Profilwechsel fehlgeschlagen (${res.status})` }));
                return;
            }
            setStreamProfileState({ active: profile, status: `Profil aktiv: ${profile.toUpperCase()}` });
        } catch {
            setStreamProfileState((prev) => ({ ...prev, status: 'Profilwechsel nicht erreichbar' }));
        } finally {
            setStreamProfileLoading(null);
        }
    };

    return (
        <div style={{ pointerEvents: 'none', position: 'absolute', inset: 0, fontFamily: '"Outfit", "Segoe UI", sans-serif' }}>
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    width: `${100 / effectiveHudScale}%`,
                    height: `${100 / effectiveHudScale}%`,
                    transform: `scale(${effectiveHudScale})`,
                    transformOrigin: 'top left'
                }}
            >
            {/* Left Panel */}
            <div style={{ pointerEvents: 'auto', position: 'absolute', top: '24px', left: '24px', width: '292px', padding: '16px', background: 'rgba(10,10,10,0.82)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', boxShadow: '0 8px 24px rgba(0,0,0,0.45)', ...panelScaleStyle('left', 'top left') }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <div style={{ color: '#9edfff', fontSize: '11px', letterSpacing: '0.8px', textTransform: 'uppercase' }}>Status-HUD</div>
                    <div style={{ display: 'flex', gap: '4px' }}>
                        <button onClick={() => togglePanelMinimize('left')} style={{ ...btnStyle, minWidth: '46px', padding: '4px 6px', fontSize: '11px' }}>Min</button>
                        <button onClick={() => togglePanelZoom2('left')} style={{ ...btnStyle, minWidth: '46px', padding: '4px 6px', fontSize: '11px' }}>x2</button>
                    </div>
                </div>
                {!panelUi.left.minimized && (
                    <>
                        <StatusBar label="Physische Verfassung" value={85} color="#ff4444" />
                        <StatusBar label="Schutzweste" value={100} color="#ffcc00" />
                        <StatusBar label="Ausdauer" value={60} color="#00ccff" />
                        <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '24px 0', boxShadow: '0 1px 2px rgba(0,0,0,0.5)' }} />
                        <StatusBar label="Karma / Ansehen" value={Math.max(0, Math.min(100, 50 + playerReputation / 2))} color="#ffaa00" />
                        <StatusBar label="Lage-Spannung" value={tensionLevel} color="#888" />
                        <StatusBar label="Volks-Moral" value={moralScore} color="#ffff00" />
                        <StatusBar label="Eskalationsstufe" value={Math.floor(tensionLevel / 5)} color="#ffcc00" />
                    </>
                )}
            </div>

            {/* Top Center Badge + Phase Label */}
            <div style={{ position: 'absolute', top: '24px', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', ...panelScaleStyle('top', 'top center') }}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '6px', pointerEvents: 'auto' }}>
                    <button onClick={() => togglePanelMinimize('top')} style={{ ...btnStyle, minWidth: '46px', padding: '4px 6px', fontSize: '11px' }}>Min</button>
                    <button onClick={() => togglePanelZoom2('top')} style={{ ...btnStyle, minWidth: '46px', padding: '4px 6px', fontSize: '11px' }}>x2</button>
                </div>
                {!panelUi.top.minimized && (
                <>
                <div style={{ padding: '8px 24px', background: 'rgba(10,10,10,0.9)', border: '2px solid #00ccff', borderRadius: '20px', boxShadow: '0 0 20px rgba(0,204,255,0.3)', marginBottom: '8px' }}>
                    <span style={{ color: '#ffcc00', fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px' }}>
                        Phase <span style={{ color: '#00ccff' }}>14</span> OPERATIV
                    </span>
                </div>
                {/* Current Event Phase Label from 24H System */}
                <div style={{ 
                    padding: '6px 16px', 
                    background: 'rgba(10,10,10,0.85)', 
                    borderRadius: '12px', 
                    border: `1px solid ${tensionLevel > 70 ? 'rgba(255,68,68,0.4)' : tensionLevel > 40 ? 'rgba(255,170,0,0.3)' : 'rgba(0,204,255,0.2)'}`,
                    display: 'inline-block'
                }}>
                    <span style={{ 
                        color: tensionLevel > 70 ? '#ff6666' : tensionLevel > 40 ? '#ffaa00' : '#88ddff', 
                        fontSize: '12px', 
                        fontWeight: '600',
                        letterSpacing: '0.5px'
                    }}>
                        {currentPhaseLabel}
                    </span>
                </div>
                </>
                )}
            </div>

            {/* Combined Right Panel (Missions + FPS + Current Event) */}
            <div style={{ 
                position: 'absolute', top: '20px', right: '20px', width: '296px', padding: '12px', 
                background: 'transparent', // Auf User-Wunsch: "mach den schwarzen rand wieder durchsichtig"
                border: 'none', 
                color: '#fff', 
                pointerEvents: 'auto',
                textShadow: '0 1px 3px rgba(0,0,0,0.85), 0 0 8px rgba(0,0,0,0.55)',
                ...panelScaleStyle('right', 'top right')
            }}>
                {/* Header with FPS */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <h3 style={{ margin: 0, color: '#00ccff', fontSize: '16px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '800' }}>Streifen-Protokoll</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <div style={{ 
                            padding: '3px 7px',
                            background: 'rgba(0,0,0,0.4)',
                            borderRadius: '4px',
                            fontFamily: 'monospace',
                            fontSize: '11px',
                            fontWeight: 'bold',
                            color: fps > 50 ? '#00ff88' : fps > 30 ? '#ffaa00' : '#ff4444',
                            border: `1px solid ${fps > 50 ? 'rgba(0,255,136,0.2)' : fps > 30 ? 'rgba(255,170,0,0.2)' : 'rgba(255,68,68,0.2)'}`,
                            textShadow: 'none'
                        }}>
                            RENDER {fps} FPS
                        </div>
                        <div style={{ display: 'flex', gap: '4px', pointerEvents: 'auto' }}>
                            <button onClick={() => togglePanelMinimize('right')} style={{ ...btnStyle, minWidth: '46px', padding: '4px 6px', fontSize: '11px' }} title="Panel minimieren">Min</button>
                            <button onClick={() => togglePanelZoom2('right')} style={{ ...btnStyle, minWidth: '46px', padding: '4px 6px', fontSize: '11px' }} title="Panel x2">x2</button>
                            <button onClick={decreaseHudScale} style={{ ...btnStyle, minWidth: '34px', padding: '4px 8px', fontSize: '14px' }} title="HUD kleiner">-</button>
                            <button onClick={resetHudScale} style={{ ...btnStyle, minWidth: '56px', padding: '4px 8px', fontSize: '12px' }} title="HUD zurücksetzen">{Math.round(effectiveHudScale * 100)}%</button>
                            <button onClick={increaseHudScale} style={{ ...btnStyle, minWidth: '34px', padding: '4px 8px', fontSize: '14px' }} title="HUD größer">+</button>
                        </div>
                    </div>
                </div>

                {!panelUi.right.minimized && (
                <>

                <div style={{
                    marginBottom: '16px',
                    padding: '12px',
                    borderRadius: '10px',
                    background: 'rgba(0,0,0,0.42)',
                    border: '1px solid rgba(0,204,255,0.25)',
                    ...panelScaleStyle('nasa', 'top right')
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <div style={{ color: '#00ccff', fontSize: '12px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase' }}>
                            NASA PDC25 Epoch 2 Lagebild
                        </div>
                        <div style={{ display: 'flex', gap: '4px' }}>
                            <button onClick={() => togglePanelMinimize('nasa')} style={{ ...btnStyle, minWidth: '42px', padding: '3px 6px', fontSize: '10px' }}>Min</button>
                            <button onClick={() => togglePanelZoom2('nasa')} style={{ ...btnStyle, minWidth: '42px', padding: '3px 6px', fontSize: '10px' }}>x2</button>
                        </div>
                    </div>
                    {!panelUi.nasa.minimized && (
                    <>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 12px', fontSize: '12px' }}>
                        <span style={{ color: '#9edfff' }}>Assessment</span>
                        <span style={{ color: '#ffffff', textAlign: 'right' }}>{PDC25_EPOCH2.assessmentDate}</span>
                        <span style={{ color: '#9edfff' }}>Potenzieller Impact</span>
                        <span style={{ color: '#ffcc00', textAlign: 'right', fontWeight: '700' }}>{PDC25_EPOCH2.impactDate}</span>
                        <span style={{ color: '#9edfff' }}>Impact-Wahrscheinlichkeit</span>
                        <span style={{ color: '#ff6666', textAlign: 'right', fontWeight: '800' }}>{PDC25_EPOCH2.impactProbability}%</span>
                        <span style={{ color: '#9edfff' }}>Durchmesser (gesamt)</span>
                        <span style={{ color: '#ffffff', textAlign: 'right' }}>{PDC25_EPOCH2.diameterRange}</span>
                        <span style={{ color: '#9edfff' }}>Durchmesser (likely)</span>
                        <span style={{ color: '#ffffff', textAlign: 'right' }}>{PDC25_EPOCH2.diameterLikely}</span>
                        <span style={{ color: '#9edfff' }}>Durchmesser (Median)</span>
                        <span style={{ color: '#ffffff', textAlign: 'right' }}>{PDC25_EPOCH2.diameterMedian}</span>
                        <span style={{ color: '#9edfff' }}>Energie (gesamt)</span>
                        <span style={{ color: '#ffffff', textAlign: 'right' }}>{PDC25_EPOCH2.energyRange}</span>
                        <span style={{ color: '#9edfff' }}>Energie (likely)</span>
                        <span style={{ color: '#ffffff', textAlign: 'right' }}>{PDC25_EPOCH2.energyLikely}</span>
                        <span style={{ color: '#9edfff' }}>Energie (Median)</span>
                        <span style={{ color: '#ffffff', textAlign: 'right' }}>{PDC25_EPOCH2.energyMedian}</span>
                    </div>
                    <div style={{ marginTop: '8px', fontSize: '11px', color: '#9edfff' }}>
                        Quelle: NASA ATAP, PDC25 Hypothetical Exercise.
                    </div>
                    </>
                    )}
                </div>

                <div style={{
                    marginBottom: '16px',
                    padding: '12px',
                    borderRadius: '10px',
                    background: 'rgba(0,0,0,0.42)',
                    border: `1px solid ${phaseWindowColor}55`,
                    ...panelScaleStyle('telemetry', 'top right')
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <div style={{ color: '#00ccff', fontSize: '12px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase' }}>
                            Phase-Telemetrie
                        </div>
                        <div style={{ display: 'flex', gap: '4px' }}>
                            <button onClick={() => togglePanelMinimize('telemetry')} style={{ ...btnStyle, minWidth: '42px', padding: '3px 6px', fontSize: '10px' }}>Min</button>
                            <button onClick={() => togglePanelZoom2('telemetry')} style={{ ...btnStyle, minWidth: '42px', padding: '3px 6px', fontSize: '10px' }}>x2</button>
                        </div>
                    </div>
                    {!panelUi.telemetry.minimized && (
                    <>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 12px', fontSize: '12px' }}>
                        <span style={{ color: '#9edfff' }}>Fenster</span>
                        <span style={{ color: phaseWindowColor, textAlign: 'right', fontWeight: '700' }}>{phaseWindowLabel}</span>
                        <span style={{ color: '#9edfff' }}>Mission-Fortschritt</span>
                        <span style={{ color: '#ffffff', textAlign: 'right', fontWeight: '700' }}>{telemetry.missionCompletionPercent}%</span>
                        <span style={{ color: '#9edfff' }}>Hook-Readiness</span>
                        <span style={{ color: '#ffffff', textAlign: 'right', fontWeight: '700' }}>{telemetry.hookReadinessPercent}%</span>
                        <span style={{ color: '#9edfff' }}>Aktive Hooks</span>
                        <span style={{ color: '#ffffff', textAlign: 'right', fontWeight: '700' }}>{telemetry.activeHooks}/{telemetry.maxHooks}</span>
                        <span style={{ color: '#9edfff' }}>Panik-/Riot-Anteil</span>
                        <span style={{ color: telemetry.panicRatioPercent > 45 ? '#ff6666' : '#ffcc00', textAlign: 'right', fontWeight: '700' }}>{telemetry.panicRatioPercent}%</span>
                    </div>
                    <div style={{ marginTop: '10px', display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: '6px' }}>
                        {[
                            { label: 'Gather', value: telemetry.behaviorCounts.gather, color: '#66ccff' },
                            { label: 'Cleanup', value: telemetry.behaviorCounts.cleanup, color: '#88ffcc' },
                            { label: 'Shield', value: telemetry.behaviorCounts.shieldWall, color: '#aaddff' },
                            { label: 'Flee', value: telemetry.behaviorCounts.flee, color: '#ffcc66' },
                            { label: 'Retreat', value: telemetry.behaviorCounts.retreat, color: '#ff8888' },
                        ].map((entry) => (
                            <div key={entry.label} style={{ border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '6px', textAlign: 'center', background: 'rgba(255,255,255,0.03)' }}>
                                <div style={{ color: '#9edfff', fontSize: '10px', letterSpacing: '0.6px', textTransform: 'uppercase' }}>{entry.label}</div>
                                <div style={{ color: entry.color, fontSize: '14px', fontWeight: '800', marginTop: '2px' }}>{entry.value}</div>
                            </div>
                        ))}
                    </div>
                    </>
                    )}
                </div>

                {/* Missions */}
                <div style={{ marginBottom: '20px', ...panelScaleStyle('mission', 'top right') }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <h4 style={{ margin: 0, color: '#00ccff', fontSize: '16px', textTransform: 'uppercase', letterSpacing: '1.2px', fontWeight: '800' }}>
                            Missionslage
                        </h4>
                        <div style={{ display: 'flex', gap: '4px' }}>
                            <button onClick={() => togglePanelMinimize('mission')} style={{ ...btnStyle, minWidth: '42px', padding: '3px 6px', fontSize: '10px' }}>Min</button>
                            <button onClick={() => togglePanelZoom2('mission')} style={{ ...btnStyle, minWidth: '42px', padding: '3px 6px', fontSize: '10px' }}>x2</button>
                        </div>
                    </div>
                    {!panelUi.mission.minimized && (
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '13px', lineHeight: '1.6' }}>
                        {missionChecklist.map((mission) => (
                            <li key={mission.id} style={{ marginBottom: '10px', display: 'flex', gap: '10px', alignItems: 'flex-start', opacity: mission.completed ? 1 : 0.86 }}>
                                <span style={{ color: mission.completed ? '#00ff88' : '#ffcc00', marginTop: '1px' }}>●</span>
                                <span style={{ color: mission.completed ? '#00ff88' : '#ffcc00' }}>{mission.label}</span>
                            </li>
                        ))}
                    </ul>
                    )}
                </div>

                <div style={{ height: '1px', background: 'rgba(255,255,255,0.2)', marginBottom: '16px', boxShadow: '0 1px 2px rgba(0,0,0,0.5)' }} />

                {/* Timeline (Was passiert gerade) */}
                <div style={{ ...panelScaleStyle('timeline', 'top right') }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <h4 style={{ margin: 0, color: '#00ccff', fontSize: '18px', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: '800' }}>
                            Einsatz-Timeline
                        </h4>
                        <div style={{ display: 'flex', gap: '4px' }}>
                            <button onClick={() => togglePanelMinimize('timeline')} style={{ ...btnStyle, minWidth: '42px', padding: '3px 6px', fontSize: '10px' }}>Min</button>
                            <button onClick={() => togglePanelZoom2('timeline')} style={{ ...btnStyle, minWidth: '42px', padding: '3px 6px', fontSize: '10px' }}>x2</button>
                        </div>
                    </div>
                    {!panelUi.timeline.minimized && (
                    <div 
                        ref={timelineRef}
                        style={{
                            maxHeight: `${timelineMaxHeight}px`,
                            overflowY: 'auto',
                            paddingRight: '10px',
                            scrollbarWidth: 'thin',
                            scrollbarColor: 'rgba(120,190,220,0.45) rgba(0,0,0,0)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px'
                        }}
                    >
                        {EVENT_TIMELINE
                            // Filtere pure interne Events ohne Beschreibungen oder Duplikate aus
                            .filter((ev, index, self) => ev.description && index === self.findIndex((t) => t.time === ev.time && t.action === ev.action && t.npcType === ev.npcType))
                            .filter((ev) => {
                                // Vorab filtern, um Array-Manipulation übersichtlicher zu machen
                                const [evH, evM] = ev.time.split(':').map(Number);
                                const evTotal = evH * 60 + evM;
                                const curTotal = h * 60 + m;
                                const isPast = evTotal < curTotal - 15; // 15 Min Kulanz
                                return !isPast; // Vergangene komplett ignorieren
                            })
                            // User Wunsch: Das aktive Ereignis soll IMMER ganz oben (als oberstes) stehen.
                            .sort((a, b) => {
                                const [aH, aM] = a.time.split(':').map(Number);
                                const [bH, bM] = b.time.split(':').map(Number);
                                const aTotal = aH * 60 + aM;
                                const bTotal = bH * 60 + bM;
                                const curTotal = h * 60 + m;
                                
                                const aCurrent = aTotal <= curTotal && aTotal >= curTotal - 15;
                                const bCurrent = bTotal <= curTotal && bTotal >= curTotal - 15;

                                if (aCurrent && !bCurrent) return -1; // a (aktuell) nach oben
                                if (!aCurrent && bCurrent) return 1;  // b (aktuell) nach oben
                                if (aCurrent && bCurrent) return bTotal - aTotal; // BEIDE aktuell -> neuesten Start-Zeitpunkt ganz nach oben packen! (damit fortlaufend das Neueste oberstes ist)
                                return aTotal - bTotal; // Sonst chronologisch
                            })
                            .map((ev, index) => {
                            const [evH, evM] = ev.time.split(':').map(Number);
                            const evTotal = evH * 60 + evM;
                            const curTotal = h * 60 + m;
                            
                            const isCurrent = evTotal <= curTotal && evTotal >= curTotal - 15; 
                            
                            // User Wunsch: Nicht aktiv = Gelb (#ffcc00), Aktiv = Grün (#00ff88)
                            const textColor = isCurrent ? '#00ff88' : '#ffcc00';
                            const titleColor = isCurrent ? '#00ff88' : '#ffcc00';
                            const descColor = isCurrent ? '#fff' : '#ffcc00';
                            const bgHighlight = isCurrent ? 'rgba(0,255,136,0.15)' : 'rgba(0,0,0,0.3)';
                            const borderCol = isCurrent ? '#00ff88' : '#cc9900';
                            
                            return (
                                <div 
                                    key={`timeline-${ev.time}-${index}`}
                                    style={{
                                        display: 'flex',
                                        gap: '10px',
                                        fontSize: '12px',
                                        fontFamily: 'monospace',
                                        padding: '8px 10px',
                                        background: bgHighlight,
                                        borderRadius: '6px',
                                        borderLeft: `3px solid ${borderCol}`,
                                        opacity: 1
                                    }}
                                >
                                    <div style={{ fontWeight: 'bold', color: titleColor, minWidth: '42px' }}>{ev.time}</div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ color: textColor }}>{ev.action} {ev.npcType} {ev.count > 0 ? `(${ev.count}x)` : ''}</div>
                                        <div style={{ color: descColor, marginTop: '3px', fontSize: '11px', fontStyle: 'italic', fontFamily: '"Outfit", sans-serif' }}>
                                            {ev.description.replace(/^.{5} — /, '')}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    )}
                </div>
                </>
                )}
            </div>

            {(activeInteraction || interactionState.lastMessage) && (
                <div style={{
                    position: 'absolute',
                    left: '50%',
                    bottom: '38px',
                    transform: 'translateX(-50%)',
                    width: 'min(720px, calc(100% - 48px))',
                    padding: '14px 18px',
                    borderRadius: '16px',
                    background: activeInteraction ? 'rgba(6,16,24,0.88)' : 'rgba(10,10,10,0.82)',
                    border: `1px solid ${activeInteraction ? 'rgba(0,204,255,0.35)' : 'rgba(255,255,255,0.12)'}`,
                    boxShadow: activeInteraction ? '0 0 24px rgba(0,204,255,0.18)' : '0 10px 30px rgba(0,0,0,0.35)',
                    pointerEvents: 'none',
                    ...panelScaleStyle('interaction', 'bottom center')
                }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '4px', marginBottom: '6px', pointerEvents: 'auto' }}>
                        <button onClick={() => togglePanelMinimize('interaction')} style={{ ...btnStyle, minWidth: '46px', padding: '3px 6px', fontSize: '10px' }}>Min</button>
                        <button onClick={() => togglePanelZoom2('interaction')} style={{ ...btnStyle, minWidth: '46px', padding: '3px 6px', fontSize: '10px' }}>x2</button>
                    </div>
                    {!panelUi.interaction.minimized && (
                    <>
                    {activeInteraction && (
                        <>
                            <div style={{ color: '#00ccff', fontSize: '11px', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>
                                Interaktionsfenster aktiv
                            </div>
                            <div style={{ color: '#ffffff', fontSize: '17px', fontWeight: 700, marginBottom: '4px' }}>
                                {activeInteraction.title}
                            </div>
                            <div style={{ color: '#9edfff', fontSize: '13px', marginBottom: '8px' }}>
                                {activeInteraction.description}
                            </div>
                            <div style={{ color: '#ffcc00', fontSize: '13px', fontWeight: 700 }}>
                                {activeInteractionAvailability?.available
                                    ? `E oder Gamepad X: ${activeInteraction.prompt}`
                                    : `GESPERRT: ${activeInteractionAvailability?.reason}`}
                            </div>
                        </>
                    )}
                    {interactionState.lastMessage && (
                        <div style={{ color: activeInteraction ? '#d7f6ff' : '#ffffff', fontSize: '12px', marginTop: activeInteraction ? '8px' : 0 }}>
                            {interactionState.lastMessage}
                        </div>
                    )}
                    </>
                    )}
                </div>
            )}

            <div style={{ 
                pointerEvents: 'none', // click through leiste
                position: 'absolute', 
                bottom: compactBottomLayout ? '22px' : '40px', 
                left: '50%', 
                transform: 'translateX(-50%)', 
                padding: '0', 
                background: 'transparent', 
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center',
                gap: compactBottomLayout ? '8px' : '10px', 
                rowGap: compactBottomLayout ? '6px' : '8px',
                width: compactBottomLayout ? 'min(1160px, calc(100vw - 36px))' : 'min(1700px, calc(100vw - 48px))',
                transformOrigin: 'center bottom',
                scale: panelUi.bottom.zoom2 ? 2 : 1,
            }}>
                <div style={{ display: 'flex', gap: '6px', pointerEvents: 'auto', background: 'rgba(10,10,10,0.62)', border: '2px solid rgba(255,255,255,0.09)', borderRadius: '10px', padding: '5px 7px', ...bottomOrderStyle(1) }}>
                    <button
                        onClick={() => togglePanelMinimize('bottom')}
                        style={{ ...btnStyle, minWidth: '52px', padding: '4px 8px', fontSize: '11px', color: panelUi.bottom.minimized ? '#ffcc00' : '#9edfff' }}
                        title={panelUi.bottom.minimized ? 'Bottom-HUD einblenden' : 'Bottom-HUD minimieren'}
                    >
                        {panelUi.bottom.minimized ? 'OPEN' : 'MIN'}
                    </button>
                    <button
                        onClick={() => togglePanelZoom2('bottom')}
                        style={{ ...btnStyle, minWidth: '52px', padding: '4px 8px', fontSize: '11px', color: panelUi.bottom.zoom2 ? '#ffcc00' : '#9edfff' }}
                        title={panelUi.bottom.zoom2 ? 'Bottom-HUD auf 1x setzen' : 'Bottom-HUD auf 2x zoomen'}
                    >
                        {panelUi.bottom.zoom2 ? '1x' : '2x'}
                    </button>
                </div>

                {!panelUi.bottom.minimized && (
                <>
                {/* Reverse Speed */}
                <div style={{ display: 'flex', gap: '2px', ...bottomOrderStyle(2) }}>
                    {revSpeeds.reverse().map(s => (
                        <button 
                            key={s} 
                            onClick={() => setTimeSpeed(s)} 
                            style={{ 
                                ...btnStyle,
                                background: timeSpeed === s ? 'rgba(255,68,68,0.3)' : 'rgba(255,255,255,0.03)',
                                borderColor: timeSpeed === s ? '#ff4444' : 'rgba(255,255,255,0.08)',
                                color: timeSpeed === s ? '#ff6666' : timeColor,
                                fontWeight: timeSpeed === s ? 'bold' : 'normal',
                                boxShadow: timeSpeed === s ? '0 0 6px rgba(255,68,68,0.4)' : 'none'
                            }}
                        >
                            ◀{Math.abs(s)}x
                        </button>
                    ))}
                </div>

                <div style={{ height: '36px', width: '2px', background: 'rgba(255,255,255,0.15)', ...bottomOrderStyle(2) }} />

                {/* Hour and Minute buttons + Pause */}
                <div style={{ display: 'flex', gap: '2px', ...bottomOrderStyle(1) }}>
                    <button onClick={rewindHour} style={{...btnStyle, color: timeColor}} title="1 Stunde zurück">-1H</button>
                    <button onClick={rewindMinute} style={{...btnStyle, color: timeColor}} title="1 Minute zurück">-1M</button>
                    <button 
                        onClick={toggleTimePause} 
                        style={{ 
                            ...btnStyle, 
                            minWidth: '60px',
                            borderColor: isTimePaused ? '#2e7d32' : '#c62828',
                            color: isTimePaused ? '#4caf50' : '#ff5252'
                        }}
                    >
                        {isTimePaused ? '▶' : '⏸'}
                    </button>
                    <button onClick={advanceMinute} style={{...btnStyle, color: timeColor}} title="1 Minute vor">+1M</button>
                    <button onClick={advanceHour} style={{...btnStyle, color: timeColor}} title="1 Stunde vor">+1H</button>
                </div>

                <div style={{ height: '36px', width: '2px', background: 'rgba(255,255,255,0.15)', ...bottomOrderStyle(1) }} />

                {/* Forward Speed */}
                <div style={{ display: 'flex', gap: '2px', ...bottomOrderStyle(2) }}>
                    {fwdSpeeds.map(s => (
                        <button 
                            key={s} 
                            onClick={() => setTimeSpeed(s)} 
                            style={{ 
                                ...btnStyle,
                                background: timeSpeed === s ? 'rgba(0,204,255,0.3)' : 'rgba(255,255,255,0.03)',
                                borderColor: timeSpeed === s ? '#00ccff' : 'rgba(255,255,255,0.08)',
                                color: timeSpeed === s ? '#00ccff' : timeColor,
                                fontWeight: timeSpeed === s ? 'bold' : 'normal',
                                boxShadow: timeSpeed === s ? '0 0 6px rgba(0,204,255,0.4)' : 'none'
                            }}
                        >
                            {s}x▶
                        </button>
                    ))}
                </div>

                <div style={{ height: '36px', width: '2px', background: 'rgba(255,255,255,0.15)', ...bottomOrderStyle(2) }} />

                {/* Time + Datum + Direction */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', ...bottomOrderStyle(1) }}>
                    <span style={{ 
                        color: isReverse ? '#ff6666' : timeColor,
                        fontSize: '22px',
                        fontWeight: 'bold', 
                        fontFamily: '"Outfit", "Segoe UI", sans-serif',
                        textShadow: `0 0 12px ${isReverse ? 'rgba(255,68,68,0.4)' : timeShadow}`
                    }}>
                        {isReverse ? '◀ ' : ''}{inGameTime}{!isReverse ? ' ▶' : ''}
                    </span>
                    <span style={{ color: '#666', fontSize: '12px', fontFamily: '"Outfit", "Segoe UI", sans-serif', letterSpacing: '0.8px' }}>
                        Mi, 17. März 2021
                    </span>
                </div>
                <span style={{ color: isReverse ? '#ff4444' : '#00ccff', fontWeight: 'bold', fontSize: '20px', ...bottomOrderStyle(1) }}>
                    {absSpeed}x
                </span>

                <div style={{ height: '36px', width: '2px', background: 'rgba(255,255,255,0.15)', ...bottomOrderStyle(1) }} />

                {/* Eskalation + NPC Count */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', pointerEvents: 'auto', background: 'rgba(10,10,10,0.6)', padding: '10px 20px', borderRadius: '12px', backdropFilter: 'blur(5px)', ...bottomOrderStyle(1) }}>
                    <span style={{ 
                        color: tensionLevel > 70 ? '#ff4444' : tensionLevel > 40 ? '#ffaa00' : '#00ccff',
                        fontWeight: 'bold', fontSize: '18px', fontFamily: '"Outfit", "Segoe UI", sans-serif'
                    }}>
                        ⚡{tensionLevel}%
                    </span>
                    <span style={{ color: '#00ccff', fontWeight: 'bold', fontSize: '22px' }}>👥{npcCount}</span>
                </div>

                <div style={{ height: '36px', width: '2px', background: 'rgba(255,255,255,0.15)', ...bottomOrderStyle(2) }} />

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', pointerEvents: 'auto', background: 'rgba(10,10,10,0.6)', padding: '8px 14px', borderRadius: '12px', backdropFilter: 'blur(5px)', border: '2px solid rgba(255,255,255,0.08)', ...bottomOrderStyle(2) }}>
                    <button
                        onClick={showStatisticsPanel}
                        style={{ ...btnStyle, minWidth: '70px', padding: '6px 10px', fontSize: '13px', color: '#9edfff' }}
                        title="Statistikfenster anzeigen"
                    >
                        STAT
                    </button>
                    <span style={{ color: '#9edfff', fontSize: '12px', letterSpacing: '0.6px' }}>
                        {telemetry.phaseWindow}
                    </span>
                </div>

                <div style={{ height: '36px', width: '2px', background: 'rgba(255,255,255,0.15)', ...bottomOrderStyle(2) }} />

                {/* Volume / Audio Controls */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', pointerEvents: 'auto', background: 'rgba(10,10,10,0.6)', padding: '10px 16px', borderRadius: '12px', backdropFilter: 'blur(5px)', border: '2px solid rgba(255,255,255,0.08)', ...bottomOrderStyle(2) }}>
                    <button 
                        onClick={() => setMuted(!muted)}
                        style={{
                            background: 'none', border: 'none', color: muted ? '#ff4444' : '#00ff88',
                            fontSize: '24px', cursor: 'pointer', padding: '0', lineHeight: 1
                        }}
                    >
                        {muted ? '🔇' : '🔊'}
                    </button>
                    <input
                        type="range" min="0" max="100" value={muted ? 0 : Math.round(masterVolume * 100)}
                        onChange={(e) => {
                            const val = parseInt(e.target.value) / 100;
                            setMasterVolume(val);
                            if (val > 0 && muted) setMuted(false);
                        }}
                        style={{
                            width: '100px', height: '6px', appearance: 'none',
                            background: `linear-gradient(to right, #00ccff ${masterVolume * 100}%, rgba(255,255,255,0.15) ${masterVolume * 100}%)`,
                            borderRadius: '3px', outline: 'none', cursor: 'pointer', accentColor: '#00ccff'
                        }}
                    />
                    <span style={{ color: '#888', fontSize: '18px', fontFamily: 'monospace', minWidth: '40px', fontWeight: 'bold' }}>
                        {muted ? ' 0%' : `${Math.round(masterVolume * 100)}%`}
                    </span>
                </div>

                <div style={{ height: '36px', width: '2px', background: 'rgba(255,255,255,0.15)', ...bottomOrderStyle(2) }} />

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', pointerEvents: 'auto', background: 'rgba(10,10,10,0.6)', padding: '8px 14px', borderRadius: '12px', backdropFilter: 'blur(5px)', border: '2px solid rgba(255,255,255,0.08)', ...bottomOrderStyle(2) }}>
                    {([
                        ['low', 'LOW'],
                        ['medium', 'MEDIUM'],
                        ['high', 'HIGH'],
                        ['aaa', 'AAA 1080p 60 fps']
                    ] as const).map(([key, label]) => (
                        <button
                            key={key}
                            onClick={() => switchStreamProfile(key)}
                            disabled={streamProfileLoading === key}
                            style={{
                                ...btnStyle,
                                minWidth: key === 'aaa' ? '146px' : '76px',
                                padding: '6px 8px',
                                fontSize: key === 'aaa' ? '11px' : '12px',
                                color: streamProfile === key ? '#ffcc00' : '#9edfff',
                                borderColor: streamProfile === key ? 'rgba(255,204,0,0.45)' : 'rgba(255,255,255,0.08)',
                                boxShadow: streamProfile === key ? '0 0 10px rgba(255,204,0,0.28)' : 'none',
                                opacity: streamProfileLoading === key ? 0.7 : 1,
                            }}
                            title={`Streaming-Profil ${label} aktivieren`}
                        >
                            {streamProfileLoading === key ? '...' : label}
                        </button>
                    ))}
                    <span style={{ color: '#9edfff', fontSize: '11px', letterSpacing: '0.4px', marginLeft: '4px' }}>
                        {streamProfileState.status}
                    </span>
                </div>
                </>
                )}
            </div>

            {showStatistics && (
                <div style={{
                    pointerEvents: 'auto',
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(4,8,12,0.72)'
                }}>
                    <div style={{
                        width: 'min(920px, calc(100% - 36px))',
                        maxHeight: 'min(86vh, 860px)',
                        overflowY: 'auto',
                        borderRadius: '18px',
                        border: '1px solid rgba(0,204,255,0.32)',
                        background: 'rgba(8,14,20,0.94)',
                        boxShadow: '0 30px 70px rgba(0,0,0,0.55)',
                        padding: '22px'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                            <div>
                                <div style={{ color: '#00ccff', fontSize: '13px', fontWeight: 800, letterSpacing: '1.2px', textTransform: 'uppercase' }}>
                                    Einsatz-Statistikfenster
                                </div>
                                <div style={{ color: '#ffffff', fontSize: '20px', fontWeight: 800, marginTop: '2px' }}>
                                    24h-Lageauswertung
                                </div>
                            </div>
                            <button
                                onClick={() => {
                                    setStatsTab('overview');
                                    dismissStatistics();
                                }}
                                style={{ ...btnStyle, minWidth: '90px', color: '#ffcc00' }}
                            >
                                Schliessen
                            </button>
                        </div>

                        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                            {[
                                { id: 'overview', label: 'Overview' },
                                { id: 'operations', label: 'Operations' },
                                { id: 'mission', label: 'Mission' },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setStatsTab(tab.id as 'overview' | 'operations' | 'mission')}
                                    style={{
                                        ...btnStyle,
                                        minWidth: '120px',
                                        padding: '6px 12px',
                                        fontSize: '13px',
                                        color: statsTab === tab.id ? '#00ccff' : '#9edfff',
                                        borderColor: statsTab === tab.id ? 'rgba(0,204,255,0.55)' : 'rgba(255,255,255,0.15)',
                                        background: statsTab === tab.id ? 'rgba(0,204,255,0.16)' : 'rgba(255,255,255,0.03)',
                                    }}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px', marginBottom: '14px' }}>
                            {[
                                { label: 'Mission', value: `${telemetry.missionCompletionPercent}%`, color: '#88ddff' },
                                { label: 'Readiness', value: `${telemetry.hookReadinessPercent}%`, color: '#99ffcc' },
                                { label: 'Aktive Hooks', value: `${telemetry.activeHooks}/${telemetry.maxHooks}`, color: '#ffcc66' },
                                { label: 'Panikquote', value: `${telemetry.panicRatioPercent}%`, color: telemetry.panicRatioPercent > 45 ? '#ff7777' : '#ffcc66' },
                            ].map((metric) => (
                                <div key={metric.label} style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '10px 12px', background: 'rgba(255,255,255,0.03)' }}>
                                    <div style={{ color: '#9edfff', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.8px' }}>{metric.label}</div>
                                    <div style={{ color: metric.color, fontSize: '24px', marginTop: '4px', fontWeight: 800 }}>{metric.value}</div>
                                </div>
                            ))}
                        </div>

                        {statsTab === 'overview' && (
                        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '12px' }}>
                            <div style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '12px', background: 'rgba(255,255,255,0.02)' }}>
                                <div style={{ color: '#00ccff', fontSize: '12px', fontWeight: 700, letterSpacing: '0.9px', textTransform: 'uppercase', marginBottom: '10px' }}>
                                    Verhaltensverteilung (live)
                                </div>
                                {[
                                    { label: 'Gather', value: telemetry.behaviorCounts.gather, color: '#66ccff' },
                                    { label: 'Cleanup', value: telemetry.behaviorCounts.cleanup, color: '#88ffcc' },
                                    { label: 'Shield-Wall', value: telemetry.behaviorCounts.shieldWall, color: '#aaddff' },
                                    { label: 'Flee', value: telemetry.behaviorCounts.flee, color: '#ffcc66' },
                                    { label: 'Retreat', value: telemetry.behaviorCounts.retreat, color: '#ff8888' },
                                ].map((entry) => (
                                    <div key={entry.label} style={{ display: 'grid', gridTemplateColumns: '120px 1fr auto', alignItems: 'center', gap: '8px', marginBottom: '7px' }}>
                                        <span style={{ color: '#9edfff', fontSize: '12px' }}>{entry.label}</span>
                                        <div style={{ height: '7px', borderRadius: '999px', background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
                                            <div style={{ height: '100%', width: `${npcCount > 0 ? Math.min(100, Math.round((entry.value / npcCount) * 100)) : 0}%`, background: entry.color }} />
                                        </div>
                                        <span style={{ color: entry.color, fontWeight: 700, fontSize: '12px' }}>{entry.value}</span>
                                    </div>
                                ))}
                            </div>

                            <div style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '12px', background: 'rgba(255,255,255,0.02)' }}>
                                <div style={{ color: '#00ccff', fontSize: '12px', fontWeight: 700, letterSpacing: '0.9px', textTransform: 'uppercase', marginBottom: '10px' }}>
                                    Tageswerte (Store)
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '8px', fontSize: '13px' }}>
                                    <span style={{ color: '#9edfff' }}>Getoetet</span><span style={{ color: '#ffffff', fontWeight: 700 }}>{dayStats.killed}</span>
                                    <span style={{ color: '#9edfff' }}>Festnahmen</span><span style={{ color: '#ffffff', fontWeight: 700 }}>{dayStats.arrested}</span>
                                    <span style={{ color: '#9edfff' }}>Verletzt</span><span style={{ color: '#ffffff', fontWeight: 700 }}>{dayStats.injured}</span>
                                    <span style={{ color: '#9edfff' }}>Sachschaden</span><span style={{ color: '#ffffff', fontWeight: 700 }}>{dayStats.damage.toLocaleString('de-DE')} EUR</span>
                                    <span style={{ color: '#9edfff' }}>Phase</span><span style={{ color: phaseWindowColor, fontWeight: 700 }}>{phaseWindowLabel}</span>
                                    <span style={{ color: '#9edfff' }}>Ingame-Zeit</span><span style={{ color: '#ffcc00', fontWeight: 700 }}>{inGameTime}</span>
                                </div>
                            </div>
                        </div>
                        )}

                        {statsTab === 'operations' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                <div style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '12px', background: 'rgba(255,255,255,0.02)' }}>
                                    <div style={{ color: '#00ccff', fontSize: '12px', fontWeight: 700, letterSpacing: '0.9px', textTransform: 'uppercase', marginBottom: '10px' }}>
                                        Operative Belastung
                                    </div>
                                    <div style={{ marginBottom: '8px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                                        <span style={{ padding: '3px 8px', borderRadius: '999px', fontSize: '10px', fontWeight: 700, letterSpacing: '0.5px', color: replayMode === 'rewind' ? '#ffb366' : '#99ffcc', border: `1px solid ${replayMode === 'rewind' ? '#ffb36666' : '#99ffcc55'}`, background: 'rgba(0,0,0,0.24)' }}>
                                            Zeitreise: {replayMode === 'rewind' ? 'AKTIV' : 'LIVE'}
                                        </span>
                                        <span style={{ padding: '3px 8px', borderRadius: '999px', fontSize: '10px', fontWeight: 700, letterSpacing: '0.5px', color: replayRebuildStatus === 'reconstructed' ? '#66ddff' : '#7a8d99', border: `1px solid ${replayRebuildStatus === 'reconstructed' ? '#66ddff66' : '#7a8d9955'}`, background: 'rgba(0,0,0,0.24)' }}>
                                            Trigger-Rebuild: {replayRebuildStatus === 'reconstructed' ? 'OK' : 'IDLE'}
                                        </span>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '8px', fontSize: '13px' }}>
                                        <span style={{ color: '#9edfff' }}>Eskalationsstufe</span><span style={{ color: '#ffffff', fontWeight: 700 }}>{Math.floor(tensionLevel / 5)} / 20</span>
                                        <span style={{ color: '#9edfff' }}>Aktive Einheiten</span><span style={{ color: '#ffffff', fontWeight: 700 }}>{npcCount}</span>
                                        <span style={{ color: '#9edfff' }}>Panikquote</span><span style={{ color: telemetry.panicRatioPercent > 45 ? '#ff7777' : '#ffcc66', fontWeight: 700 }}>{telemetry.panicRatioPercent}%</span>
                                        <span style={{ color: '#9edfff' }}>Sachschaden</span><span style={{ color: '#ffffff', fontWeight: 700 }}>{dayStats.damage.toLocaleString('de-DE')} EUR</span>
                                        <span style={{ color: '#9edfff' }}>Verletzte</span><span style={{ color: '#ffffff', fontWeight: 700 }}>{dayStats.injured}</span>
                                        <span style={{ color: '#9edfff' }}>Festnahmen</span><span style={{ color: '#ffffff', fontWeight: 700 }}>{dayStats.arrested}</span>
                                        <span style={{ color: '#9edfff' }}>Rebuild-Events</span><span style={{ color: replayRebuildStatus === 'reconstructed' ? '#66ddff' : '#9edfff', fontWeight: 700 }}>{replayRebuildEventCount}</span>
                                        <span style={{ color: '#9edfff' }}>Rebuild-Anker</span><span style={{ color: '#c6d9ff', fontWeight: 700 }}>{replayAnchorTime}</span>
                                    </div>
                                    <div style={{ marginTop: '10px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px' }}>
                                        <div style={{ color: '#9edfff', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.7px', marginBottom: '6px' }}>
                                            Letzte Rebuilds
                                        </div>
                                        {replayRebuildHistory.length > 0 ? (
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '6px', fontSize: '11px' }}>
                                                {replayRebuildHistory.slice(0, 3).map((entry, index) => (
                                                    <React.Fragment key={`${entry.savedAtEpochMs}-${entry.anchorTime}-${index}`}>
                                                        <span style={{ color: '#c6d9ff' }}>{entry.anchorTime}</span>
                                                        <span style={{ color: '#66ddff', fontWeight: 700 }}>{entry.rebuildEventCount} Events</span>
                                                        <span style={{ color: entry.mode === 'rewind' ? '#ffb366' : '#99ffcc' }}>{entry.mode === 'rewind' ? 'REWIND' : 'LIVE'}</span>
                                                    </React.Fragment>
                                                ))}
                                            </div>
                                        ) : (
                                            <div style={{ color: '#67808d', fontSize: '11px' }}>
                                                Keine Rebuild-Historie vorhanden.
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '12px', background: 'rgba(255,255,255,0.02)' }}>
                                    <div style={{ color: '#00ccff', fontSize: '12px', fontWeight: 700, letterSpacing: '0.9px', textTransform: 'uppercase', marginBottom: '10px' }}>
                                        Einsatzempfehlung
                                    </div>
                                    <div style={{ color: '#9edfff', fontSize: '13px', lineHeight: 1.5 }}>
                                        {operationsInsight.recommendation}
                                    </div>
                                    <div style={{ marginTop: '10px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px' }}>
                                        <div style={{ color: '#9edfff', fontSize: '11px', lineHeight: 1.45 }}>
                                            {operationsInsight.correlationLine}
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '11px' }}>
                                            <span style={{ color: operationsInsight.priority === 'critical' ? '#ff5555' : operationsInsight.priority === 'high' ? '#ffaa44' : operationsInsight.priority === 'medium' ? '#ffdd66' : '#99ffcc', fontWeight: 700 }}>
                                                Prioritaet: {operationsInsight.priority.toUpperCase()}
                                            </span>
                                            <span style={{ color: '#9edfff' }}>
                                                Confidence {operationsInsight.confidencePercent}%
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '12px', background: 'rgba(255,255,255,0.02)' }}>
                                <div style={{ color: '#00ccff', fontSize: '12px', fontWeight: 700, letterSpacing: '0.9px', textTransform: 'uppercase', marginBottom: '10px' }}>
                                    Rollenverteilung
                                </div>
                                <div style={{ marginBottom: '10px', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '9px', background: 'rgba(0,0,0,0.24)' }}>
                                    <div style={{ color: '#9edfff', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.7px', marginBottom: '7px' }}>
                                        Adaptive Triggerkurven (live)
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '5px', fontSize: '11px' }}>
                                        <span style={{ color: '#7db3c7' }}>Sync-Schwelle</span><span style={{ color: '#66ddff', fontWeight: 700 }}>{adaptiveSyncThreshold}%</span>
                                        <span style={{ color: '#7db3c7' }}>Fracture-Schwelle</span><span style={{ color: '#ff8a66', fontWeight: 700 }}>{adaptiveFractureThreshold}%</span>
                                        <span style={{ color: '#7db3c7' }}>Positiv-Faktor</span><span style={{ color: '#88ffcc', fontWeight: 700 }}>{adaptiveCurvePreview.positiveScaleFactor.toFixed(2)}x</span>
                                        <span style={{ color: '#7db3c7' }}>Fallback-Faktor</span><span style={{ color: '#ffbb77', fontWeight: 700 }}>{adaptiveCurvePreview.fallbackScaleFactor.toFixed(2)}x</span>
                                        <span style={{ color: '#7db3c7' }}>Aggressordruck</span><span style={{ color: aggressorPressure > 0 ? '#ff7777' : '#99ffcc', fontWeight: 700 }}>{aggressorPressure >= 0 ? '+' : ''}{aggressorPressure}</span>
                                        <span style={{ color: '#7db3c7' }}>Turbulenz</span><span style={{ color: '#c6d9ff', fontWeight: 700 }}>{operationsInsight.trendTurbulenceScore}</span>
                                    </div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '10px' }}>
                                    {[
                                        { label: 'Sicherheit', value: telemetry.roleBalance.security, color: '#4466ff' },
                                        { label: 'Aggression', value: telemetry.roleBalance.aggressors, color: '#ff4444' },
                                        { label: 'Untersttzg.', value: telemetry.roleBalance.support, color: '#00ff88' },
                                        { label: 'Zivilisten', value: telemetry.roleBalance.civilian, color: '#aaaaaa' },
                                    ].map((entry) => (
                                        <div key={entry.label} style={{ border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '8px', textAlign: 'center', background: 'rgba(0,0,0,0.3)' }}>
                                            <div style={{ color: '#9edfff', fontSize: '10px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>{entry.label}</div>
                                            <div style={{ color: entry.color, fontSize: '22px', fontWeight: 800, marginTop: '3px' }}>{entry.value}</div>
                                            <div style={{ marginTop: '3px', height: '4px', borderRadius: '2px', background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                                                <div style={{ height: '100%', width: `${npcCount > 0 ? Math.min(100, Math.round((entry.value / npcCount) * 100)) : 0}%`, background: entry.color }} />
                                            </div>
                                            <div style={{ color: entry.color, fontSize: '10px', marginTop: '2px', opacity: 0.8 }}>
                                                {npcCount > 0 ? Math.round((entry.value / npcCount) * 100) : 0}%
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {telemetry.dominantRole && (
                                    <div style={{ color: '#9edfff', fontSize: '12px' }}>
                                        Dominante Gruppe: <span style={{ color: '#ffcc00', fontWeight: 700 }}>{telemetry.dominantRole}</span>
                                        <span style={{ color: '#666' }}> ({telemetry.npcTypeCounts[telemetry.dominantRole] ?? 0} Einh.)</span>
                                    </div>
                                )}
                                <div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                    {activeRoleResponses.length > 0 ? activeRoleResponses.map((response) => (
                                        <div key={response.key} style={{ padding: '5px 8px', borderRadius: '999px', border: `1px solid ${response.color}55`, background: 'rgba(0,0,0,0.25)', color: response.color, fontSize: '11px', fontWeight: 700, letterSpacing: '0.4px' }}>
                                            {response.label}
                                        </div>
                                    )) : (
                                        <div style={{ color: '#67808d', fontSize: '11px' }}>
                                            Keine dynamische Rollenreaktion aktiv.
                                        </div>
                                    )}
                                </div>
                                <div style={{ marginTop: '12px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '10px' }}>
                                    <div style={{ color: '#9edfff', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.7px', marginBottom: '8px' }}>
                                        Rollen-Trend (letzte 10 Checkpoints)
                                    </div>
                                    {trendView.length > 1 ? (
                                        <>
                                            <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: '100%', height: '92px', background: 'rgba(0,0,0,0.22)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
                                                <polyline points={mapTrendLine((point) => point.security)} fill="none" stroke="#4466ff" strokeWidth="2.4" />
                                                <polyline points={mapTrendLine((point) => point.aggressors)} fill="none" stroke="#ff4444" strokeWidth="2.4" />
                                                <polyline points={mapTrendLine((point) => point.support)} fill="none" stroke="#00ff88" strokeWidth="2.4" />
                                            </svg>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', color: '#67808d', fontSize: '10px' }}>
                                                <span>{trendView[0].time}</span>
                                                <span>{trendView[trendView.length - 1].time}</span>
                                            </div>
                                            <div style={{ display: 'flex', gap: '10px', marginTop: '6px', fontSize: '10px' }}>
                                                <span style={{ color: '#4466ff' }}>Sicherheit</span>
                                                <span style={{ color: '#ff4444' }}>Aggression</span>
                                                <span style={{ color: '#00ff88' }}>Support</span>
                                            </div>
                                        </>
                                    ) : (
                                        <div style={{ color: '#67808d', fontSize: '11px' }}>
                                            Noch zu wenig Daten fuer Trendlinie.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        )}

                        {statsTab === 'mission' && (
                        <div style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '12px', background: 'rgba(255,255,255,0.02)' }}>
                            <div style={{ color: '#00ccff', fontSize: '12px', fontWeight: 700, letterSpacing: '0.9px', textTransform: 'uppercase', marginBottom: '10px' }}>
                                Missions-Drilldown
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '8px', fontSize: '13px', marginBottom: '10px' }}>
                                <span style={{ color: '#9edfff' }}>Epoch-2 verifiziert</span><span style={{ color: missionProgress.epochBriefingVerified ? '#00ff88' : '#ffcc66', fontWeight: 700 }}>{missionProgress.epochBriefingVerified ? 'Ja' : 'Nein'}</span>
                                <span style={{ color: '#9edfff' }}>Hazard vorbereitet</span><span style={{ color: missionProgress.hazardMapPrepared ? '#00ff88' : '#ffcc66', fontWeight: 700 }}>{missionProgress.hazardMapPrepared ? 'Ja' : 'Nein'}</span>
                                <span style={{ color: '#9edfff' }}>Priorisierte Zonen</span><span style={{ color: '#ffffff', fontWeight: 700 }}>{missionProgress.prioritizedZoneIds.length}/3</span>
                                <span style={{ color: '#9edfff' }}>Hook-Auslastung</span><span style={{ color: '#ffffff', fontWeight: 700 }}>{telemetry.activeHooks}/{telemetry.maxHooks}</span>
                                <span style={{ color: '#9edfff' }}>Aktuelles Zeitfenster</span><span style={{ color: phaseWindowColor, fontWeight: 700 }}>{phaseWindowLabel}</span>
                            </div>
                            <div style={{ color: '#9edfff', fontSize: '12px', lineHeight: 1.45 }}>
                                Naechster Fokus: {missionProgress.hazardMapPrepared
                                    ? (missionProgress.prioritizedZoneIds.length < 3 ? 'weitere Risikozonen priorisieren' : 'Spaetphasen-Stabilisierung sichern')
                                    : (missionProgress.epochBriefingVerified ? 'Hazard-Konsole aktivieren' : 'Epoch-Terminal abschliessen')}
                            </div>
                        </div>
                        )}
                    </div>
                </div>
            )}
            </div>
        </div>
    );
};

const btnStyle: React.CSSProperties = {
    background: 'rgba(10,10,10,0.6)',
    border: '1px solid rgba(255,255,255,0.12)',
    color: '#888',
    padding: '4px 8px',
    borderRadius: '7px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: 700,
    transition: 'all 0.15s ease',
    outline: 'none',
    minWidth: '34px',
    pointerEvents: 'auto',
    backdropFilter: 'blur(4px)',
    fontFamily: '"Outfit", "Segoe UI", sans-serif',
};
