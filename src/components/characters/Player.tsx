import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useKeyboardControls } from '@react-three/drei';
import * as THREE from 'three';

const GAMEPAD_DEADZONE = 0.15;

const applyDeadzone = (value: number) => {
    if (Math.abs(value) < GAMEPAD_DEADZONE) return 0;
    const sign = Math.sign(value);
    return sign * ((Math.abs(value) - GAMEPAD_DEADZONE) / (1 - GAMEPAD_DEADZONE));
};

export const Player = () => {
    const meshRef = useRef<THREE.Group>(null);
    const [, getKeys] = useKeyboardControls();
    const [position] = useState(new THREE.Vector3(0, 1.2, 10));
    const [rotation, setRotation] = useState({ yaw: 0, pitch: -0.5 });
    const [zoom, setZoom] = useState(8);
    
    // STRG + Pfeiltasten: Kamera-Panning
    const ctrlHeld = useRef(false);
    const arrowKeys = useRef({ up: false, down: false, left: false, right: false });
    const panOffset = useRef(new THREE.Vector3(0, 0, 0));
    
    const direction = new THREE.Vector3();
    const frontVector = new THREE.Vector3();
    const sideVector = new THREE.Vector3();
    const speed = 10;
    const gamepadIndexRef = useRef<number | null>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Nur Kamera drehen (kein Panning mehr)
            if (document.pointerLockElement || e.buttons === 1) {
                setRotation(r => ({
                    yaw: r.yaw - e.movementX * 0.003,
                    pitch: Math.max(-1.4, Math.min(1.4, r.pitch - e.movementY * 0.003))
                }));
            }
        };
        const handleWheel = (e: WheelEvent) => {
            // Sehr geschmeidiger Zoom: Faktor von 0.08 auf 0.015 reduziert
            setZoom(z => Math.max(1, Math.min(200, z + e.deltaY * 0.015)));
        };
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Control') ctrlHeld.current = true;
            if (e.key === 'ArrowUp') arrowKeys.current.up = true;
            if (e.key === 'ArrowDown') arrowKeys.current.down = true;
            if (e.key === 'ArrowLeft') arrowKeys.current.left = true;
            if (e.key === 'ArrowRight') arrowKeys.current.right = true;
        };
        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.key === 'Control') ctrlHeld.current = false;
            if (e.key === 'ArrowUp') arrowKeys.current.up = false;
            if (e.key === 'ArrowDown') arrowKeys.current.down = false;
            if (e.key === 'ArrowLeft') arrowKeys.current.left = false;
            if (e.key === 'ArrowRight') arrowKeys.current.right = false;
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        const handleGamepadConnected = (event: GamepadEvent) => {
            gamepadIndexRef.current = event.gamepad.index;
        };

        const handleGamepadDisconnected = (event: GamepadEvent) => {
            if (gamepadIndexRef.current === event.gamepad.index) {
                gamepadIndexRef.current = null;
            }
        };

        const firstGamepad = navigator.getGamepads?.().find(Boolean);
        if (firstGamepad) {
            gamepadIndexRef.current = firstGamepad.index;
        }

        window.addEventListener('gamepadconnected', handleGamepadConnected);
        window.addEventListener('gamepaddisconnected', handleGamepadDisconnected);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            window.removeEventListener('gamepadconnected', handleGamepadConnected);
            window.removeEventListener('gamepaddisconnected', handleGamepadDisconnected);
        };
    }, []);

    useFrame((state, delta) => {
        const { forward, backward, left, right } = getKeys();
        const gamepad = gamepadIndexRef.current !== null ? navigator.getGamepads?.()[gamepadIndexRef.current] : null;

        let gpMoveX = 0;
        let gpMoveZ = 0;

        if (gamepad) {
            gpMoveX = applyDeadzone(gamepad.axes[0] ?? 0);
            gpMoveZ = applyDeadzone(gamepad.axes[1] ?? 0);

            const lookX = applyDeadzone(gamepad.axes[2] ?? 0);
            const lookY = applyDeadzone(gamepad.axes[3] ?? 0);

            if (lookX !== 0 || lookY !== 0) {
                setRotation(r => ({
                    yaw: r.yaw - lookX * 0.08,
                    pitch: Math.max(-1.4, Math.min(1.4, r.pitch - lookY * 0.06))
                }));
            }
        }
        
        // STRG + Pfeiltasten → Kamera-Panning
        if (ctrlHeld.current) {
            const panSpeed = 15 * delta;
            const yawRot = new THREE.Euler(0, rotation.yaw, 0);
            
            if (arrowKeys.current.up) {
                const fwd = new THREE.Vector3(0, 0, -panSpeed).applyEuler(yawRot);
                panOffset.current.add(fwd);
            }
            if (arrowKeys.current.down) {
                const bwd = new THREE.Vector3(0, 0, panSpeed).applyEuler(yawRot);
                panOffset.current.add(bwd);
            }
            if (arrowKeys.current.left) {
                const lft = new THREE.Vector3(-panSpeed, 0, 0).applyEuler(yawRot);
                panOffset.current.add(lft);
            }
            if (arrowKeys.current.right) {
                const rgt = new THREE.Vector3(panSpeed, 0, 0).applyEuler(yawRot);
                panOffset.current.add(rgt);
            }
        } else {
            // Kein STRG: Pan-Offset sanft zum Spieler zurückfedern
            panOffset.current.lerp(new THREE.Vector3(0, 0, 0), 0.04);
        }
        
        // WASD bewegt IMMER den Spieler (Pfeiltasten ohne STRG auch)
        const keyFwdInput = (backward ? 1 : 0) - (forward ? 1 : 0);
        const keySideInput = (left ? 1 : 0) - (right ? 1 : 0);
        const fwdInput = THREE.MathUtils.clamp(keyFwdInput + gpMoveZ, -1, 1);
        const sideInput = THREE.MathUtils.clamp(keySideInput + gpMoveX, -1, 1);
        const gamepadSprint = gamepad ? (gamepad.buttons[5]?.pressed ?? false) : false;
        const activeSpeed = gamepadSprint ? speed * 1.7 : speed;
        
        if (!ctrlHeld.current) {
            frontVector.set(0, 0, fwdInput);
            sideVector.set(sideInput, 0, 0);
            const moveRot = new THREE.Euler(0, rotation.yaw, 0);
            direction.subVectors(frontVector, sideVector).normalize().applyEuler(moveRot).multiplyScalar(activeSpeed * delta);
            position.add(direction);
        }
        
        if (meshRef.current) {
            meshRef.current.position.copy(position);
            meshRef.current.rotation.y = rotation.yaw;

            // Kamera folgt Spieler + Pan-Offset
            const camPos = new THREE.Vector3(0, 0, zoom);
            const pitchEuler = new THREE.Euler(rotation.pitch, rotation.yaw, 0, 'YXZ');
            camPos.applyEuler(pitchEuler);
            
            const lookTarget = position.clone().add(panOffset.current).add(new THREE.Vector3(0, 1.5, 0));
            const targetCamPos = lookTarget.clone().add(camPos);
            
            state.camera.position.lerp(targetCamPos, 0.06);
            state.camera.lookAt(lookTarget.x, lookTarget.y, lookTarget.z);
        }
    });

    return (
        <group ref={meshRef} onClick={(e) => (e.target as HTMLElement).requestPointerLock()}>
            <mesh position={[0, 0.5, 0]} castShadow>
                <capsuleGeometry args={[0.3, 1, 4, 8]} />
                <meshStandardMaterial color="#1a237e" metalness={0.5} roughness={0.2} />
            </mesh>
            <mesh position={[0, 0.8, 0.1]} castShadow>
                <boxGeometry args={[0.5, 0.4, 0.2]} />
                <meshStandardMaterial color="#111" />
            </mesh>
        </group>
    );
};
