import { useMemo } from 'react';
import { Billboard, Text } from '@react-three/drei';
import { useGameStore } from '../../../stores/gameStore';
import { EVENT_TIMELINE, NPC_COLORS, timeToMinutes } from '../../../systems/eventScheduler';

interface SpawnPoint {
    position: [number, number, number];
    color: string;
    radius: number;
    id: string;
    time: string;
    title: string;
    details: string[];
    totalCount: number;
    minutesUntilSpawn: number;
    cardOffsetX: number;
    cardOffsetZ: number;
    cardLiftY: number;
    emphasis: number;
}

type PhaseBand = 'NIGHT' | 'MORNING' | 'MIDDAY' | 'EVENING' | 'LATE';

const getPhaseBandForMinutes = (minutes: number): PhaseBand => {
    if (minutes < 6 * 60) return 'NIGHT';
    if (minutes < 12 * 60) return 'MORNING';
    if (minutes < 17 * 60) return 'MIDDAY';
    if (minutes < 21 * 60) return 'EVENING';
    return 'LATE';
};

const PHASE_THEME: Record<PhaseBand, { timeColor: string; glassOpacity: number; cardBackdrop: string }> = {
    NIGHT: { timeColor: '#7bd6ff', glassOpacity: 0.18, cardBackdrop: '#030916' },
    MORNING: { timeColor: '#ffe46b', glassOpacity: 0.19, cardBackdrop: '#060a14' },
    MIDDAY: { timeColor: '#ffd38b', glassOpacity: 0.16, cardBackdrop: '#070b12' },
    EVENING: { timeColor: '#ffb36b', glassOpacity: 0.21, cardBackdrop: '#0a0612' },
    LATE: { timeColor: '#bba8ff', glassOpacity: 0.23, cardBackdrop: '#080513' },
};

const SHORT_NAMES: Record<string, string> = {
    'CIVILIAN': 'ZIV',
    'POLICE': 'POL',
    'DEMONSTRATOR': 'DEMO',
    'RIOT_POLICE': 'RIOT',
    'MEDIC': 'SANI',
    'EXTREMIST': 'EXTR',
    'SEK': 'SEK',
    'FIREFIGHTER': 'FEU',
    'RIOTER': 'RAND',
    'JOURNALIST': 'JOUR',
    'KRAUSE': 'KRAU',
    'TOURIST': 'TOUR',
};

export const SpawnMarkers = () => {
    const inGameTime = useGameStore((state) => state.gameState.inGameTime);
    const formatCountdown = (minutesUntilSpawn: number) => {
        const mm = Math.max(0, minutesUntilSpawn).toString().padStart(2, '0');
        return `SPAWN IN 00:${mm}`;
    };

    const markers = useMemo(() => {
        const currentMinutes = timeToMinutes(inGameTime);
        const grouped = new Map<string, SpawnPoint>();

        EVENT_TIMELINE.forEach((event, i) => {
            if (event.action !== 'SPAWN' || !event.position || event.count <= 0) {
                return;
            }

            const eventMinutes = timeToMinutes(event.time);
            const minutesUntilSpawn = (eventMinutes - currentMinutes + 24 * 60) % (24 * 60);

            // Sichtbarkeitsfenster: ab T-10 bis T-5, danach ausblenden.
            if (minutesUntilSpawn > 10 || minutesUntilSpawn < 5) {
                return;
            }

            const roundedX = Math.round(event.position[0]);
            const roundedZ = Math.round(event.position[2]);
            const key = `${event.time}:${roundedX}:${roundedZ}`;
            const shortName = SHORT_NAMES[event.npcType] || event.npcType;
            const detailLine = `${event.count}x ${shortName}`;
            const hash = Math.abs((roundedX * 31 + roundedZ * 17 + eventMinutes * 13) % 9);
            const lane = hash % 3;
            const row = Math.floor(hash / 3);
            const cardOffsetX = (lane - 1) * 2.1;
            const cardOffsetZ = (row - 1) * 1.4;
            const cardLiftY = row * 0.28;
            const emphasis = (10 - minutesUntilSpawn) / 5;

            if (grouped.has(key)) {
                const existing = grouped.get(key)!;
                existing.details.push(detailLine);
                existing.totalCount += event.count;
                existing.emphasis = Math.max(existing.emphasis, emphasis);
            } else {
                grouped.set(key, {
                    position: event.position,
                    color: NPC_COLORS[event.npcType] || '#888',
                    radius: Math.min(event.radius || 5, 15),
                    id: `marker-${i}`,
                    time: event.time,
                    title: detailLine,
                    details: [detailLine],
                    totalCount: event.count,
                    minutesUntilSpawn,
                    cardOffsetX,
                    cardOffsetZ,
                    cardLiftY,
                    emphasis,
                });
            }
        });

        return Array.from(grouped.values()).sort((a, b) => {
            if (a.minutesUntilSpawn !== b.minutesUntilSpawn) {
                return a.minutesUntilSpawn - b.minutesUntilSpawn;
            }
            return b.totalCount - a.totalCount;
        });
    }, [inGameTime]);

    const currentMinutes = timeToMinutes(inGameTime);
    const phaseBand = getPhaseBandForMinutes(currentMinutes);
    const phaseTheme = PHASE_THEME[phaseBand];
    const maxVisibleMarkers = 8;
    const visibleMarkers = markers.slice(0, maxVisibleMarkers);
    const hiddenMarkerCount = Math.max(0, markers.length - visibleMarkers.length);
    const denseMode = visibleMarkers.length >= 6;
    const mediumDenseMode = visibleMarkers.length >= 4;
    const cardScale = denseMode ? 0.82 : mediumDenseMode ? 0.9 : 1;
    const cardWidth = 6.5 * cardScale;
    const cardHeight = 8.5 * cardScale;
    const innerWidth = 6.2 * cardScale;
    const innerHeight = 8.2 * cardScale;
    const detailMaxLines = denseMode ? 2 : 3;
    const phaseBadgeY = 3.52 * cardScale;
    const timeY = 2.72 * cardScale;
    const titleY = 1.56 * cardScale;
    const detailsY = 0.2 * cardScale;
    const countdownY = -2.25 * cardScale;
    const baseFont = denseMode ? 0.9 : 1;

    return (
        <group>
            {visibleMarkers.map((m, idx) => (
                <group key={m.id} position={[m.position[0], 0, m.position[2]]}>
                    <mesh
                        rotation={[-Math.PI / 2, 0, 0]}
                        position={[0, 0.23 + idx * 0.01, 0]}
                    >
                        <circleGeometry args={[m.radius + 0.6, 56]} />
                        <meshBasicMaterial
                            color={m.color}
                            transparent
                            opacity={0.08 + m.emphasis * 0.08}
                            depthWrite={false}
                            polygonOffset={true}
                            polygonOffsetFactor={-1}
                            polygonOffsetUnits={-1}
                        />
                    </mesh>

                    <mesh
                        rotation={[-Math.PI / 2, 0, 0]}
                        position={[0, 0.25 + idx * 0.01, 0]}
                    >
                        <ringGeometry args={[m.radius - 0.3, m.radius, 48]} />
                        <meshBasicMaterial
                            color={m.color}
                            transparent
                            opacity={0.36 + m.emphasis * 0.2}
                            depthWrite={false}
                            polygonOffset={true}
                            polygonOffsetFactor={-1}
                            polygonOffsetUnits={-1}
                        />
                    </mesh>

                    <mesh position={[m.cardOffsetX, 2.2 + m.cardLiftY, m.cardOffsetZ]}>
                        <cylinderGeometry args={[0.07, 0.07, 3.4, 12]} />
                        <meshBasicMaterial color={m.color} transparent opacity={0.5} />
                    </mesh>

                    <mesh position={[m.cardOffsetX, 0.52, m.cardOffsetZ]}>
                        <cylinderGeometry args={[0.34, 0.22, 0.16, 16]} />
                        <meshBasicMaterial color={m.color} transparent opacity={0.72} />
                    </mesh>

                    <Billboard position={[m.cardOffsetX, 4.4 + m.cardLiftY, m.cardOffsetZ]} follow={true} lockX={false} lockY={false} lockZ={false}>
                        <group>
                            <mesh position={[0, 0, -0.03]}>
                                <planeGeometry args={[innerWidth, innerHeight]} />
                                <meshBasicMaterial color={phaseTheme.cardBackdrop} transparent opacity={0.88} />
                            </mesh>
                            <mesh>
                                <planeGeometry args={[cardWidth, cardHeight]} />
                                <meshBasicMaterial color={m.color} transparent opacity={phaseTheme.glassOpacity + m.emphasis * 0.18} />
                            </mesh>

                            <Text
                                position={[0, phaseBadgeY, 0.03]}
                                fontSize={0.33 * baseFont}
                                color="#c8e8ff"
                                anchorX="center"
                                anchorY="middle"
                                outlineWidth={0.02}
                                outlineColor="#000"
                            >
                                {`PHASE ${phaseBand}`}
                            </Text>

                            <Text
                                position={[0, timeY, 0.03]}
                                fontSize={0.92 * baseFont}
                                color={phaseTheme.timeColor}
                                anchorX="center"
                                anchorY="middle"
                                outlineWidth={0.06}
                                outlineColor="#000"
                            >
                                {m.time}
                            </Text>

                            <Text
                                position={[0, titleY, 0.03]}
                                fontSize={0.74 * baseFont}
                                color={m.color}
                                anchorX="center"
                                anchorY="middle"
                                outlineWidth={0.05}
                                outlineColor="#000"
                                maxWidth={5.9}
                                textAlign="center"
                            >
                                {m.title}
                            </Text>

                            <Text
                                position={[0, detailsY, 0.03]}
                                fontSize={0.42 * baseFont}
                                color="#d9f6ff"
                                anchorX="center"
                                anchorY="middle"
                                outlineWidth={0.03}
                                outlineColor="#000"
                                maxWidth={5.7}
                                textAlign="center"
                            >
                                {m.details.slice(0, detailMaxLines).join('\n')}
                            </Text>

                            {hiddenMarkerCount > 0 && idx === visibleMarkers.length - 1 && (
                                <Text
                                    position={[0, -1.25 * cardScale, 0.03]}
                                    fontSize={0.34 * baseFont}
                                    color="#ff9f6e"
                                    anchorX="center"
                                    anchorY="middle"
                                    outlineWidth={0.02}
                                    outlineColor="#000"
                                >
                                    {`+ ${hiddenMarkerCount} weitere Spawn-Karten priorisiert ausgeblendet`}
                                </Text>
                            )}

                            <Text
                                position={[0, countdownY, 0.03]}
                                fontSize={0.6 * baseFont}
                                color="#ffffff"
                                anchorX="center"
                                anchorY="middle"
                                outlineWidth={0.04}
                                outlineColor="#000"
                            >
                                {formatCountdown(m.minutesUntilSpawn)}
                            </Text>
                        </group>
                    </Billboard>
                </group>
            ))}
        </group>
    );
};
