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
    minutesUntilSpawn: number;
    cardOffsetX: number;
    cardOffsetZ: number;
    cardLiftY: number;
    emphasis: number;
}

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
                    minutesUntilSpawn,
                    cardOffsetX,
                    cardOffsetZ,
                    cardLiftY,
                    emphasis,
                });
            }
        });

        return Array.from(grouped.values()).sort((a, b) => a.minutesUntilSpawn - b.minutesUntilSpawn);
    }, [inGameTime]);

    return (
        <group>
            {markers.map((m, idx) => (
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
                                <planeGeometry args={[6.2, 8.2]} />
                                <meshBasicMaterial color="#05070e" transparent opacity={0.88} />
                            </mesh>
                            <mesh>
                                <planeGeometry args={[6.5, 8.5]} />
                                <meshBasicMaterial color={m.color} transparent opacity={0.15 + m.emphasis * 0.22} />
                            </mesh>

                            <Text
                                position={[0, 2.95, 0.03]}
                                fontSize={0.95}
                                color="#ffe46b"
                                anchorX="center"
                                anchorY="middle"
                                outlineWidth={0.06}
                                outlineColor="#000"
                            >
                                {m.time}
                            </Text>

                            <Text
                                position={[0, 1.7, 0.03]}
                                fontSize={0.78}
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
                                position={[0, 0.3, 0.03]}
                                fontSize={0.44}
                                color="#d9f6ff"
                                anchorX="center"
                                anchorY="middle"
                                outlineWidth={0.03}
                                outlineColor="#000"
                                maxWidth={5.7}
                                textAlign="center"
                            >
                                {m.details.slice(0, 3).join('\n')}
                            </Text>

                            <Text
                                position={[0, -2.35, 0.03]}
                                fontSize={0.62}
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
