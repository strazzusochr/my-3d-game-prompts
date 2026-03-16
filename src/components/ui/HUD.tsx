import React, { useState, useEffect, useRef } from 'react';
import { useGameStore } from '../../stores/gameStore';
import { EVENT_TIMELINE } from '../../systems/eventScheduler';
import { getInteractionAvailability, getInteractionZoneById, getMissionChecklist } from '../../systems/interactionZones';

const StatusBar = ({ label, value, color }: { label: string, value: number, color: string }) => (
    <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: '800', color: '#ffcc00', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '6px', textShadow: '0 1px 4px rgba(0,0,0,0.9)' }}>
            <span>{label}</span>
        </div>
        <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
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

export const HUD = () => {
    const inGameTime = useGameStore(state => state.gameState.inGameTime);
    const isTimePaused = useGameStore(state => state.gameState.isTimePaused);
    const tensionLevel = useGameStore(state => state.gameState.tensionLevel);
    const timeSpeed = useGameStore(state => state.gameState.timeSpeed);
    const currentPhaseLabel = useGameStore(state => state.gameState.currentPhaseLabel);
    const playerReputation = useGameStore(state => state.gameState.playerReputation);
    const moralScore = useGameStore(state => state.gameState.moralScore);
    const npcCount = useGameStore(state => state.npcs.length);
    const masterVolume = useGameStore(state => state.gameState.masterVolume);
    const muted = useGameStore(state => state.gameState.muted);
    const interactionState = useGameStore(state => state.interactionState);
    const { advanceHour, rewindHour, advanceMinute, rewindMinute, toggleTimePause, setTimeSpeed, setMasterVolume, setMuted } = useGameStore();

    // Timeline Scroll Ref
    const timelineRef = useRef<HTMLDivElement>(null);
    const activeEventRef = useRef<HTMLDivElement>(null);
    const [hudScale, setHudScale] = useState(() => {
        if (typeof window === 'undefined') return 1;
        const stored = Number(window.localStorage.getItem('hud-scale'));
        return Number.isFinite(stored) && stored >= 0.6 && stored <= 1.4 ? stored : 1;
    });

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

    const decreaseHudScale = () => setHudScale((value) => Math.max(0.6, Number((value - 0.1).toFixed(2))));
    const increaseHudScale = () => setHudScale((value) => Math.min(1.4, Number((value + 0.1).toFixed(2))));
    const resetHudScale = () => setHudScale(1);

    return (
        <div style={{ pointerEvents: 'none', position: 'absolute', inset: 0, fontFamily: '"Outfit", sans-serif' }}>
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    width: `${100 / hudScale}%`,
                    height: `${100 / hudScale}%`,
                    transform: `scale(${hudScale})`,
                    transformOrigin: 'top left'
                }}
            >
            {/* Left Panel */}
            <div style={{ pointerEvents: 'auto', position: 'absolute', top: '40px', left: '40px', width: '380px', padding: '24px', background: 'rgba(10,10,10,0.85)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                <StatusBar label="Physische Verfassung" value={85} color="#ff4444" />
                <StatusBar label="Schutzweste" value={100} color="#ffcc00" />
                <StatusBar label="Ausdauer" value={60} color="#00ccff" />
                <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '24px 0', boxShadow: '0 1px 2px rgba(0,0,0,0.5)' }} />
                <StatusBar label="Karma / Ansehen" value={Math.max(0, Math.min(100, 50 + playerReputation / 2))} color="#ffaa00" />
                <StatusBar label="Lage-Spannung" value={tensionLevel} color="#888" />
                <StatusBar label="Volks-Moral" value={moralScore} color="#ffff00" />
                <StatusBar label="Eskalationsstufe" value={Math.floor(tensionLevel / 5)} color="#ffcc00" />
            </div>

            {/* Top Center Badge + Phase Label */}
            <div style={{ position: 'absolute', top: '40px', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
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
            </div>

            {/* Combined Right Panel (Missions + FPS + Current Event) */}
            <div style={{ 
                position: 'absolute', top: '20px', right: '20px', width: '380px', padding: '24px', 
                background: 'transparent', // Auf User-Wunsch: "mach den schwarzen rand wieder durchsichtig"
                border: 'none', 
                color: '#fff', 
                pointerEvents: 'auto',
                textShadow: '0 1px 4px rgba(0,0,0,0.9), 0 0 10px rgba(0,0,0,0.6)'
            }}>
                {/* Header with FPS */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h3 style={{ margin: 0, color: '#00ccff', fontSize: '18px', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: '800' }}>Streifen-Protokoll</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ 
                            padding: '4px 8px',
                            background: 'rgba(0,0,0,0.4)',
                            borderRadius: '4px',
                            fontFamily: 'monospace',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            color: fps > 50 ? '#00ff88' : fps > 30 ? '#ffaa00' : '#ff4444',
                            border: `1px solid ${fps > 50 ? 'rgba(0,255,136,0.2)' : fps > 30 ? 'rgba(255,170,0,0.2)' : 'rgba(255,68,68,0.2)'}`,
                            textShadow: 'none'
                        }}>
                            RENDER {fps} FPS
                        </div>
                        <div style={{ display: 'flex', gap: '4px', pointerEvents: 'auto' }}>
                            <button onClick={decreaseHudScale} style={{ ...btnStyle, minWidth: '34px', padding: '4px 8px', fontSize: '14px' }} title="HUD kleiner">-</button>
                            <button onClick={resetHudScale} style={{ ...btnStyle, minWidth: '56px', padding: '4px 8px', fontSize: '12px' }} title="HUD zurücksetzen">{Math.round(hudScale * 100)}%</button>
                            <button onClick={increaseHudScale} style={{ ...btnStyle, minWidth: '34px', padding: '4px 8px', fontSize: '14px' }} title="HUD größer">+</button>
                        </div>
                    </div>
                </div>

                <div style={{
                    marginBottom: '16px',
                    padding: '12px',
                    borderRadius: '10px',
                    background: 'rgba(0,0,0,0.42)',
                    border: '1px solid rgba(0,204,255,0.25)'
                }}>
                    <div style={{ color: '#00ccff', fontSize: '12px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>
                        NASA PDC25 Epoch 2 Lagebild
                    </div>
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
                </div>

                {/* Missions */}
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px 0', fontSize: '13px', lineHeight: '1.6' }}>
                    {missionChecklist.map((mission) => (
                        <li key={mission.id} style={{ marginBottom: '10px', display: 'flex', gap: '10px', alignItems: 'flex-start', opacity: mission.completed ? 1 : 0.86 }}>
                            <span style={{ color: mission.completed ? '#00ff88' : '#ffcc00', marginTop: '1px' }}>●</span>
                            <span style={{ color: mission.completed ? '#00ff88' : '#ffcc00' }}>{mission.label}</span>
                        </li>
                    ))}
                </ul>

                <div style={{ height: '1px', background: 'rgba(255,255,255,0.2)', marginBottom: '16px', boxShadow: '0 1px 2px rgba(0,0,0,0.5)' }} />

                {/* Timeline (Was passiert gerade) */}
                <div>
                    <h4 style={{ margin: '0 0 16px 0', color: '#00ccff', fontSize: '18px', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: '800' }}>
                        Einsatz-Timeline
                    </h4>
                    
                    <div 
                        ref={timelineRef}
                        style={{
                            maxHeight: '260px',
                            overflowY: 'auto',
                            paddingRight: '10px',
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
                                        gap: '12px',
                                        fontSize: '14px', // Vergrößert wie Streifen-Protokoll
                                        fontFamily: 'monospace',
                                        padding: '10px 12px',
                                        background: bgHighlight,
                                        borderRadius: '6px',
                                        borderLeft: `3px solid ${borderCol}`,
                                        opacity: 1
                                    }}
                                >
                                    <div style={{ fontWeight: 'bold', color: titleColor, minWidth: '45px' }}>{ev.time}</div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ color: textColor }}>{ev.action} {ev.npcType} {ev.count > 0 ? `(${ev.count}x)` : ''}</div>
                                        <div style={{ color: descColor, marginTop: '4px', fontSize: '13px', fontStyle: 'italic', fontFamily: '"Outfit", sans-serif' }}>
                                            {ev.description.replace(/^.{5} — /, '')}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
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
                    pointerEvents: 'none'
                }}>
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
                </div>
            )}

            <div style={{ 
                pointerEvents: 'none', // click through leiste
                position: 'absolute', 
                bottom: '40px', 
                left: '50%', 
                transform: 'translateX(-50%)', 
                padding: '0', 
                background: 'transparent', 
                display: 'flex',
                alignItems: 'center',
                gap: '16px', 
            }}>
                {/* Reverse Speed */}
                <div style={{ display: 'flex', gap: '2px' }}>
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

                <div style={{ height: '36px', width: '2px', background: 'rgba(255,255,255,0.15)' }} />

                {/* Hour and Minute buttons + Pause */}
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

                <div style={{ height: '36px', width: '2px', background: 'rgba(255,255,255,0.15)' }} />

                {/* Forward Speed */}
                <div style={{ display: 'flex', gap: '2px' }}>
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

                <div style={{ height: '36px', width: '2px', background: 'rgba(255,255,255,0.15)' }} />

                {/* Time + Datum + Direction */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                    <span style={{ 
                        color: isReverse ? '#ff6666' : timeColor,
                        fontSize: '28px', // verdoppelt
                        fontWeight: 'bold', 
                        fontFamily: 'monospace',
                        textShadow: `0 0 12px ${isReverse ? 'rgba(255,68,68,0.4)' : timeShadow}`
                    }}>
                        {isReverse ? '◀ ' : ''}{inGameTime}{!isReverse ? ' ▶' : ''}
                    </span>
                    <span style={{ color: '#666', fontSize: '14px', fontFamily: 'monospace', letterSpacing: '1px' }}>
                        Mi, 17. März 2021
                    </span>
                </div>
                <span style={{ color: isReverse ? '#ff4444' : '#00ccff', fontWeight: 'bold', fontSize: '20px' }}>
                    {absSpeed}x
                </span>

                <div style={{ height: '36px', width: '2px', background: 'rgba(255,255,255,0.15)' }} />

                {/* Eskalation + NPC Count */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', pointerEvents: 'auto', background: 'rgba(10,10,10,0.6)', padding: '10px 20px', borderRadius: '12px', backdropFilter: 'blur(5px)' }}>
                    <span style={{ 
                        color: tensionLevel > 70 ? '#ff4444' : tensionLevel > 40 ? '#ffaa00' : '#00ccff',
                        fontWeight: 'bold', fontSize: '20px', fontFamily: 'monospace'
                    }}>
                        ⚡{tensionLevel}%
                    </span>
                    <span style={{ color: '#00ccff', fontWeight: 'bold', fontSize: '22px' }}>👥{npcCount}</span>
                </div>

                <div style={{ height: '36px', width: '2px', background: 'rgba(255,255,255,0.15)' }} />

                {/* Volume / Audio Controls */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', pointerEvents: 'auto', background: 'rgba(10,10,10,0.6)', padding: '10px 16px', borderRadius: '12px', backdropFilter: 'blur(5px)', border: '2px solid rgba(255,255,255,0.08)' }}>
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
            </div>
            </div>
        </div>
    );
};

const btnStyle: React.CSSProperties = {
    background: 'rgba(10,10,10,0.6)',
    border: '2px solid rgba(255,255,255,0.08)',
    color: '#888',
    padding: '6px 12px', // verdoppelt
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px', // verdoppelt
    fontWeight: 'bold',
    transition: 'all 0.15s ease',
    outline: 'none',
    minWidth: '45px', // verdoppelt
    pointerEvents: 'auto',
    backdropFilter: 'blur(5px)',
};
