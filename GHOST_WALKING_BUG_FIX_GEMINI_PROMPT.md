# ════════════════════════════════════════════════════════════════════════════════
# GHOST WALKING BUG FIX - GEMINI AI CODER PROMPT
# ════════════════════════════════════════════════════════════════════════════════
# Projekt: Corona Control Ultimate (React + Three.js + Rapier + Vite)
# Bug-Status: KRITISCH
# Dokument-Version: 1.0 FINAL
# Datum: 21.01.2026
# ════════════════════════════════════════════════════════════════════════════════

---

## 📋 INHALTSVERZEICHNIS

1. [BUG-BESCHREIBUNG](#1-bug-beschreibung)
2. [URSACHEN-ANALYSE](#2-ursachen-analyse)
3. [LÖSUNGS-STRATEGIE](#3-lösungs-strategie)
4. [IMPLEMENTATION - PLAYER.TSX](#4-implementation-playertsx)
5. [IMPLEMENTATION - APP.TSX ÄNDERUNGEN](#5-implementation-apptsx-änderungen)
6. [ZUSÄTZLICHE DATEIEN](#6-zusätzliche-dateien)
7. [VALIDIERUNGS-CHECKLISTE](#7-validierungs-checkliste)
8. [EDGE-CASES UND SICHERHEIT](#8-edge-cases-und-sicherheit)

---

## 1. BUG-BESCHREIBUNG

### 1.1 Symptome
```
BEOBACHTUNG:
- Der rote Debug-RigidBody (Physik-Kapsel) bewegt sich korrekt bei WASD-Eingabe
- Die Kamera bleibt STATISCH am Spawn-Punkt [0, 5, 0]
- Das visuelle Player-Model folgt dem Physik-Körper NICHT
- Debug-Logs zeigen korrekte Position-Updates: "[SYNC DEBUG] RB: 12.50, 2.01, 8.00"
- Trotz korrekter Logs: Visuals/Kamera bewegen sich NICHT
```

### 1.2 Technischer Kontext
```
PROJEKT-STACK:
- React 19
- @react-three/fiber 9.x (R3F)
- @react-three/drei 10.7.7
- @react-three/rapier 2.2.0
- three 0.182.0
- zustand 5.0.2
- Vite (Build-Tool)
```

### 1.3 Betroffene Dateien
```
PRIMÄR:
- src/components/player/Player.tsx
- src/App.tsx

SEKUNDÄR (falls vorhanden):
- src/components/player/PlayerController.tsx
- src/hooks/useKeyboardControls.ts
```

---

## 2. URSACHEN-ANALYSE

### 2.1 Hauptursache: Canvas Default-Kamera

```typescript
// ❌ PROBLEM IN App.tsx:
<Canvas
  camera={{ position: [0, 5, 10], fov: 50, near: 0.1, far: 1000 }}
  // ↑ Diese Prop erstellt eine "verwaltete" Kamera die ALLE manuellen Updates überschreibt!
>
```

**Erklärung:**
- Die `camera` Prop im Canvas erstellt eine R3F-verwaltete Kamera
- Diese Kamera wird als `state.camera` in `useThree()` bereitgestellt
- PROBLEM: R3F kann die Position zurücksetzen oder ignoriert manuelle `camera.position.set()` Aufrufe
- LÖSUNG: Eigene `<PerspectiveCamera makeDefault>` Komponente verwenden

### 2.2 Sekundäre Probleme

| Problem | Beschreibung | Auswirkung |
|---------|--------------|------------|
| useKeyboardControls falsch | `getKeys()` wird nur einmal beim Mount aufgerufen statt jeden Frame | Tastatureingabe funktioniert nicht |
| GC in useFrame | `new Vector3()` jeden Frame erstellt | Memory Leaks, Performance-Drops |
| Kein NaN-Schutz | Bei vertikalem Blick wird Richtungsvektor zu (0,0,0) | Spieler bleibt stecken |
| Kein Respawn | Spieler kann unter die Welt fallen | Soft-Lock |
| Keine Air Control | Unrealistische volle Kontrolle in der Luft | Schlechtes Spielgefühl |

---

## 3. LÖSUNGS-STRATEGIE

### 3.1 Kern-Änderungen

```
SCHRITT 1: App.tsx
→ ENTFERNE die "camera" Prop aus dem <Canvas> Element
→ Kommentar NICHT zwischen JSX-Attributen platzieren!

SCHRITT 2: Player.tsx
→ ERSETZE komplett mit neuer Implementation
→ Verwende <PerspectiveCamera makeDefault> aus @react-three/drei
→ Keyboard-Input JEDEN Frame mit getKeys() lesen
→ Alle temporären Vektoren AUSSERHALB der Komponente deklarieren
→ NaN-Schutz bei vertikalem Blick implementieren
→ Respawn-System bei Y < -50 implementieren
→ Air Control auf 30% reduzieren
```

### 3.2 Architektur-Diagramm

```
┌─────────────────────────────────────────────────────────────────┐
│                         App.tsx                                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  <Canvas>  ← KEINE camera Prop!                           │  │
│  │    ┌─────────────────────────────────────────────────┐    │  │
│  │    │  <Physics>                                      │    │  │
│  │    │    ┌─────────────────────────────────────────┐  │    │  │
│  │    │    │  <Player>                               │  │    │  │
│  │    │    │    ├── <PerspectiveCamera makeDefault>  │  │    │  │
│  │    │    │    │     ↑ DIESE Kamera wird gerendert  │  │    │  │
│  │    │    │    └── <RigidBody>                      │  │    │  │
│  │    │    │          └── <CapsuleCollider>          │  │    │  │
│  │    │    └─────────────────────────────────────────┘  │    │  │
│  │    │    <GameScene />                                │    │  │
│  │    └─────────────────────────────────────────────────┘    │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 4. IMPLEMENTATION - PLAYER.TSX

### 4.1 Vollständiger Code

**ANWEISUNG AN GEMINI:** Ersetze die komplette `src/components/player/Player.tsx` mit folgendem Code:

```typescript
// ════════════════════════════════════════════════════════════════════════════════
// Player.tsx - GHOST WALKING BUG FIX
// ════════════════════════════════════════════════════════════════════════════════
// KRITISCHE ÄNDERUNGEN:
// 1. PerspectiveCamera mit makeDefault (überschreibt Canvas-Kamera)
// 2. useKeyboardControls getKeys() wird JEDEN FRAME aufgerufen
// 3. Temporäre Vektoren AUSSERHALB der Komponente (keine GC)
// 4. NaN-Schutz bei vertikalem Blick
// 5. Respawn bei Y < -50
// 6. Air Control auf 30% reduziert
// ════════════════════════════════════════════════════════════════════════════════

import { useRef, useEffect, useCallback } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { RigidBody, CapsuleCollider, RapierRigidBody } from '@react-three/rapier';
import { PerspectiveCamera, useKeyboardControls } from '@react-three/drei';
import { Vector3, PerspectiveCamera as ThreePerspectiveCamera, Raycaster } from 'three';
import { useGameStore } from '../../stores/gameStore';

// ════════════════════════════════════════════════════════════════════════════════
// KONSTANTEN - Alle Spieler-Parameter an einem Ort
// ════════════════════════════════════════════════════════════════════════════════
const PLAYER_CONFIG = {
  // Bewegung
  MOVE_SPEED: 8,
  SPRINT_MULTIPLIER: 1.6,
  JUMP_FORCE: 6,
  
  // Air Control (0 = keine Kontrolle in Luft, 1 = volle Kontrolle)
  AIR_CONTROL: 0.3,
  GROUND_FRICTION: 0.85,
  AIR_FRICTION: 0.99,
  
  // Physik
  MASS: 80,
  LINEAR_DAMPING: 0.5,
  ANGULAR_DAMPING: 0.99,
  
  // Kamera
  CAMERA_HEIGHT: 1.7,
  MOUSE_SENSITIVITY: 0.002,
  
  // Collider
  CAPSULE_RADIUS: 0.4,
  CAPSULE_HEIGHT: 1.0,
  
  // Ground Check
  GROUND_CHECK_DISTANCE: 0.15,
  
  // Respawn
  RESPAWN_Y_THRESHOLD: -50,
  SPAWN_POSITION: [0, 3, 0] as [number, number, number],
  
  // Performance
  STORE_UPDATE_INTERVAL: 3,
} as const;

// ════════════════════════════════════════════════════════════════════════════════
// TEMPORÄRE VEKTOREN - Außerhalb der Komponente um GC zu vermeiden
// ════════════════════════════════════════════════════════════════════════════════
const _moveDirection = new Vector3();
const _cameraDirection = new Vector3();
const _rightVector = new Vector3();
const _velocity = new Vector3();
const _rayOrigin = new Vector3();
const _rayDirection = new Vector3(0, -1, 0);
const _upVector = new Vector3(0, 1, 0);

// Raycaster für Ground Check
const _groundRaycaster = new Raycaster();
_groundRaycaster.far = PLAYER_CONFIG.CAPSULE_HEIGHT / 2 + PLAYER_CONFIG.GROUND_CHECK_DISTANCE;

// ════════════════════════════════════════════════════════════════════════════════
// PLAYER COMPONENT
// ════════════════════════════════════════════════════════════════════════════════
export function Player() {
  // ────────────────────────────────────────────────────────────────────────────
  // REFS
  // ────────────────────────────────────────────────────────────────────────────
  const rigidBodyRef = useRef<RapierRigidBody>(null);
  const cameraRef = useRef<ThreePerspectiveCamera>(null);
  
  // Zustand (nicht-reaktiv für Performance)
  const isGrounded = useRef(true);
  const canJump = useRef(true);
  const yaw = useRef(0);
  const pitch = useRef(0);
  const frameCount = useRef(0);
  const isPointerLockSupported = useRef(true);
  
  // ────────────────────────────────────────────────────────────────────────────
  // THREE.JS KONTEXT
  // ────────────────────────────────────────────────────────────────────────────
  const { gl, scene } = useThree();
  
  // ────────────────────────────────────────────────────────────────────────────
  // KEYBOARD CONTROLS - KRITISCH: Wir holen die FUNKTION, nicht das Ergebnis!
  // ────────────────────────────────────────────────────────────────────────────
  const [, getKeys] = useKeyboardControls();
  
  // ────────────────────────────────────────────────────────────────────────────
  // STORE
  // ────────────────────────────────────────────────────────────────────────────
  const setPlayerPosition = useGameStore((s) => s.setPlayerPosition);
  
  // ────────────────────────────────────────────────────────────────────────────
  // POINTER LOCK CHECK
  // ────────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    isPointerLockSupported.current = 'pointerLockElement' in document;
    if (!isPointerLockSupported.current) {
      console.warn('[Player] Pointer Lock nicht unterstützt!');
    }
  }, []);
  
  // ────────────────────────────────────────────────────────────────────────────
  // MAUS-BEWEGUNG HANDLER
  // ────────────────────────────────────────────────────────────────────────────
  const handleMouseMove = useCallback((event: MouseEvent) => {
    const isLocked = document.pointerLockElement === gl.domElement;
    if (!isLocked && isPointerLockSupported.current) return;
    
    yaw.current -= event.movementX * PLAYER_CONFIG.MOUSE_SENSITIVITY;
    pitch.current -= event.movementY * PLAYER_CONFIG.MOUSE_SENSITIVITY;
    
    // Pitch begrenzen (verhindert auch NaN bei exakt 90°)
    const PITCH_LIMIT = Math.PI / 2 - 0.1;
    pitch.current = Math.max(-PITCH_LIMIT, Math.min(PITCH_LIMIT, pitch.current));
  }, [gl.domElement]);
  
  // ────────────────────────────────────────────────────────────────────────────
  // POINTER LOCK SETUP
  // ────────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = gl.domElement;
    
    const handleClick = () => {
      if (isPointerLockSupported.current) {
        canvas.requestPointerLock?.();
      }
    };
    
    canvas.addEventListener('click', handleClick);
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      canvas.removeEventListener('click', handleClick);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [gl.domElement, handleMouseMove]);
  
  // ────────────────────────────────────────────────────────────────────────────
  // JUMP RESET (verhindert Bunny-Hopping)
  // ────────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        canJump.current = true;
      }
    };
    
    window.addEventListener('keyup', handleKeyUp);
    return () => window.removeEventListener('keyup', handleKeyUp);
  }, []);
  
  // ────────────────────────────────────────────────────────────────────────────
  // RESPAWN FUNKTION
  // ────────────────────────────────────────────────────────────────────────────
  const respawn = useCallback(() => {
    if (!rigidBodyRef.current) return;
    
    rigidBodyRef.current.setTranslation(
      { x: PLAYER_CONFIG.SPAWN_POSITION[0], y: PLAYER_CONFIG.SPAWN_POSITION[1], z: PLAYER_CONFIG.SPAWN_POSITION[2] },
      true
    );
    rigidBodyRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
    yaw.current = 0;
    pitch.current = 0;
    
    console.log('[Player] Respawned!');
  }, []);
  
  // ────────────────────────────────────────────────────────────────────────────
  // GAME LOOP - Wird jeden Frame ausgeführt
  // ────────────────────────────────────────────────────────────────────────────
  useFrame(() => {
    if (!rigidBodyRef.current || !cameraRef.current) return;
    
    frameCount.current++;
    
    // ══════════════════════════════════════════════════════════════════════════
    // 1. KEYBOARD INPUT - KRITISCH: Jeden Frame aufrufen!
    // ══════════════════════════════════════════════════════════════════════════
    const { forward, backward, left, right, jump, sprint } = getKeys() as {
      forward: boolean;
      backward: boolean;
      left: boolean;
      right: boolean;
      jump: boolean;
      sprint: boolean;
    };
    
    // ══════════════════════════════════════════════════════════════════════════
    // 2. POSITION & VELOCITY AUSLESEN
    // ══════════════════════════════════════════════════════════════════════════
    const rbPosition = rigidBodyRef.current.translation();
    const rbVelocity = rigidBodyRef.current.linvel();
    
    // ══════════════════════════════════════════════════════════════════════════
    // 3. RESPAWN CHECK
    // ══════════════════════════════════════════════════════════════════════════
    if (rbPosition.y < PLAYER_CONFIG.RESPAWN_Y_THRESHOLD) {
      respawn();
      return;
    }
    
    // ══════════════════════════════════════════════════════════════════════════
    // 4. GROUND CHECK (Raycast)
    // ══════════════════════════════════════════════════════════════════════════
    _rayOrigin.set(rbPosition.x, rbPosition.y, rbPosition.z);
    _groundRaycaster.set(_rayOrigin, _rayDirection);
    
    const intersects = _groundRaycaster.intersectObjects(scene.children, true)
      .filter(hit => hit.object.receiveShadow);
    
    isGrounded.current = intersects.length > 0 && intersects[0].distance < _groundRaycaster.far;
    
    // ══════════════════════════════════════════════════════════════════════════
    // 5. KAMERA-ROTATION
    // ══════════════════════════════════════════════════════════════════════════
    cameraRef.current.rotation.set(pitch.current, yaw.current, 0, 'YXZ');
    
    // Kamera-Vorwärtsrichtung berechnen
    cameraRef.current.getWorldDirection(_cameraDirection);
    _cameraDirection.y = 0;
    
    // ⚠️ NaN-SCHUTZ: Fallback wenn Vektor zu kurz (bei fast vertikalem Blick)
    if (_cameraDirection.lengthSq() < 0.001) {
      _cameraDirection.set(Math.sin(yaw.current), 0, -Math.cos(yaw.current));
    }
    _cameraDirection.normalize();
    
    // Rechts-Vektor berechnen
    _rightVector.crossVectors(_cameraDirection, _upVector).normalize();
    
    // ══════════════════════════════════════════════════════════════════════════
    // 6. BEWEGUNGS-INPUT
    // ══════════════════════════════════════════════════════════════════════════
    _moveDirection.set(0, 0, 0);
    
    if (forward) _moveDirection.add(_cameraDirection);
    if (backward) _moveDirection.sub(_cameraDirection);
    if (right) _moveDirection.add(_rightVector);
    if (left) _moveDirection.sub(_rightVector);
    
    const hasInput = _moveDirection.lengthSq() > 0;
    
    if (hasInput) {
      _moveDirection.normalize();
      
      const speed = PLAYER_CONFIG.MOVE_SPEED * (sprint ? PLAYER_CONFIG.SPRINT_MULTIPLIER : 1);
      const controlFactor = isGrounded.current ? 1.0 : PLAYER_CONFIG.AIR_CONTROL;
      
      _velocity.copy(_moveDirection).multiplyScalar(speed * controlFactor);
      
      // Bestehende Velocity in Luft beibehalten
      if (!isGrounded.current) {
        _velocity.x += rbVelocity.x * (1 - PLAYER_CONFIG.AIR_CONTROL);
        _velocity.z += rbVelocity.z * (1 - PLAYER_CONFIG.AIR_CONTROL);
      }
      
      rigidBodyRef.current.setLinvel(
        { x: _velocity.x, y: rbVelocity.y, z: _velocity.z },
        true
      );
    } else {
      // Bremsen
      const friction = isGrounded.current ? PLAYER_CONFIG.GROUND_FRICTION : PLAYER_CONFIG.AIR_FRICTION;
      
      rigidBodyRef.current.setLinvel(
        { x: rbVelocity.x * friction, y: rbVelocity.y, z: rbVelocity.z * friction },
        true
      );
    }
    
    // ══════════════════════════════════════════════════════════════════════════
    // 7. SPRINGEN
    // ══════════════════════════════════════════════════════════════════════════
    if (jump && isGrounded.current && canJump.current) {
      rigidBodyRef.current.applyImpulse(
        { x: 0, y: PLAYER_CONFIG.JUMP_FORCE * PLAYER_CONFIG.MASS, z: 0 },
        true
      );
      isGrounded.current = false;
      canJump.current = false;
    }
    
    // ══════════════════════════════════════════════════════════════════════════
    // 8. KAMERA POSITION SYNCHRONISIEREN - KRITISCH!
    // ══════════════════════════════════════════════════════════════════════════
    cameraRef.current.position.set(
      rbPosition.x,
      rbPosition.y + PLAYER_CONFIG.CAMERA_HEIGHT,
      rbPosition.z
    );
    cameraRef.current.updateMatrixWorld(true);
    
    // ══════════════════════════════════════════════════════════════════════════
    // 9. STORE UPDATE (gedrosselt für Performance)
    // ══════════════════════════════════════════════════════════════════════════
    if (frameCount.current % PLAYER_CONFIG.STORE_UPDATE_INTERVAL === 0) {
      setPlayerPosition([rbPosition.x, rbPosition.y, rbPosition.z]);
    }
  });
  
  // ────────────────────────────────────────────────────────────────────────────
  // COLLISION HANDLER
  // ────────────────────────────────────────────────────────────────────────────
  const handleCollisionEnter = useCallback(() => {
    if (rigidBodyRef.current) {
      const vel = rigidBodyRef.current.linvel();
      if (vel.y <= 0.1) {
        isGrounded.current = true;
      }
    }
  }, []);
  
  // ════════════════════════════════════════════════════════════════════════════
  // RENDER
  // ════════════════════════════════════════════════════════════════════════════
  return (
    <>
      {/* KAMERA - makeDefault überschreibt die Canvas-Kamera! */}
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        fov={75}
        near={0.1}
        far={1000}
        position={[
          PLAYER_CONFIG.SPAWN_POSITION[0],
          PLAYER_CONFIG.SPAWN_POSITION[1] + PLAYER_CONFIG.CAMERA_HEIGHT,
          PLAYER_CONFIG.SPAWN_POSITION[2]
        ]}
      />
      
      {/* PHYSIK-KÖRPER */}
      <RigidBody
        ref={rigidBodyRef}
        type="dynamic"
        position={PLAYER_CONFIG.SPAWN_POSITION}
        mass={PLAYER_CONFIG.MASS}
        linearDamping={PLAYER_CONFIG.LINEAR_DAMPING}
        angularDamping={PLAYER_CONFIG.ANGULAR_DAMPING}
        lockRotations
        colliders={false}
        onCollisionEnter={handleCollisionEnter}
      >
        <CapsuleCollider 
          args={[PLAYER_CONFIG.CAPSULE_HEIGHT / 2, PLAYER_CONFIG.CAPSULE_RADIUS]} 
        />
      </RigidBody>
    </>
  );
}

export default Player;
```

---

## 5. IMPLEMENTATION - APP.TSX ÄNDERUNGEN

### 5.1 Kritische Änderung

**ANWEISUNG AN GEMINI:** In der Datei `src/App.tsx`, finde das `<Canvas>` Element und:

1. **ENTFERNE** die `camera` Prop komplett
2. **PLATZIERE KEINE** Kommentare zwischen JSX-Attributen

### 5.2 Vorher (FALSCH)

```tsx
// ❌ FALSCH - Diese camera Prop verursacht den Bug!
<Canvas
  shadows
  dpr={1}
  camera={{ position: [0, 5, 10], fov: 50, near: 0.1, far: 1000 }}
  gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
>
```

### 5.3 Nachher (RICHTIG)

```tsx
// ✅ RICHTIG - Keine camera Prop!
<Canvas
  shadows
  dpr={1}
  gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
>
```

### 5.4 Vollständiges Canvas-Element

```tsx
<Canvas
  shadows
  dpr={[1, 2]}
  gl={{ 
    antialias: false, 
    alpha: false, 
    powerPreference: 'high-performance',
  }}
>
  <Stats />
  
  <Suspense fallback={null}>
    <Physics 
      gravity={[0, -20, 0]}
      debug={false}
      timeStep="vary"
      interpolate={true}
    >
      <Player />
      <GameScene />
    </Physics>
  </Suspense>
  
  <ambientLight intensity={0.5} />
  <directionalLight 
    position={[50, 100, 50]} 
    intensity={1.5} 
    castShadow
    shadow-mapSize={[2048, 2048]}
  />
  
  <color attach="background" args={['#87CEEB']} />
  <fog attach="fog" args={['#87CEEB', 50, 200]} />
</Canvas>
```

---

## 6. ZUSÄTZLICHE DATEIEN

### 6.1 KeyboardControls Map in App.tsx

**ANWEISUNG:** Stelle sicher dass diese Map in App.tsx vorhanden ist:

```tsx
const keyboardMap = [
  { name: 'forward', keys: ['KeyW', 'ArrowUp'] },
  { name: 'backward', keys: ['KeyS', 'ArrowDown'] },
  { name: 'left', keys: ['KeyA', 'ArrowLeft'] },
  { name: 'right', keys: ['KeyD', 'ArrowRight'] },
  { name: 'jump', keys: ['Space'] },
  { name: 'sprint', keys: ['ShiftLeft', 'ShiftRight'] },
];
```

Und dass `<KeyboardControls>` das Canvas umschließt:

```tsx
<KeyboardControls map={keyboardMap}>
  <Canvas ...>
    ...
  </Canvas>
</KeyboardControls>
```

### 6.2 GameScene Boden-Objekte

**WICHTIG:** Alle begehbaren Boden-Objekte MÜSSEN `receiveShadow` haben, sonst funktioniert der Ground-Raycast nicht!

```tsx
// ✅ RICHTIG - Boden hat receiveShadow
<mesh receiveShadow>
  <planeGeometry args={[100, 100]} />
  <meshStandardMaterial color="#3d5c3d" />
</mesh>

// ❌ FALSCH - Kein receiveShadow = Ground Detection funktioniert nicht
<mesh>
  <planeGeometry args={[100, 100]} />
  <meshStandardMaterial color="#3d5c3d" />
</mesh>
```

### 6.3 gameStore.ts

**ANWEISUNG:** Stelle sicher dass `setPlayerPosition` im Store existiert:

```tsx
import { create } from 'zustand';

interface GameState {
  playerPosition: [number, number, number];
  setPlayerPosition: (pos: [number, number, number]) => void;
  // ... andere Properties
}

export const useGameStore = create<GameState>((set) => ({
  playerPosition: [0, 3, 0],
  setPlayerPosition: (pos) => set({ playerPosition: pos }),
  // ... andere Actions
}));
```

---

## 7. VALIDIERUNGS-CHECKLISTE

### 7.1 Code-Prüfung

```
☐ App.tsx: Keine "camera" Prop im Canvas
☐ App.tsx: KeyboardControls umschließt Canvas
☐ App.tsx: keyboardMap hat alle 6 Tasten definiert
☐ Player.tsx: PerspectiveCamera hat makeDefault Prop
☐ Player.tsx: useKeyboardControls gibt [, getKeys] zurück
☐ Player.tsx: getKeys() wird IN useFrame aufgerufen
☐ Player.tsx: Alle temporären Vektoren sind AUSSERHALB der Komponente
☐ Player.tsx: NaN-Schutz bei lengthSq() < 0.001
☐ Player.tsx: Respawn bei Y < -50
☐ Player.tsx: updateMatrixWorld(true) wird aufgerufen
☐ GameScene: Alle Böden haben receiveShadow
☐ gameStore: setPlayerPosition existiert
```

### 7.2 Runtime-Test

```
☐ npm run dev startet ohne Fehler
☐ Browser-Konsole zeigt keine Errors
☐ Klick auf Canvas aktiviert Pointer Lock
☐ WASD bewegt den Spieler
☐ Maus dreht die Kamera
☐ Kamera folgt dem Spieler (NICHT statisch!)
☐ Space lässt Spieler springen
☐ Shift aktiviert Sprint
☐ Bei Y < -50 erfolgt Respawn
☐ Vertikaler Blick (90° hoch/runter) verursacht kein Steckenbleiben
```

---

## 8. EDGE-CASES UND SICHERHEIT

### 8.1 NaN-Schutz erklärt

```typescript
// Bei vertikalem Blick (90° hoch oder runter):
// getWorldDirection() gibt (0, 1, 0) oder (0, -1, 0) zurück
// Nach y = 0 setzen wird es zu (0, 0, 0)
// normalize() auf (0,0,0) gibt NaN!

// LÖSUNG: Fallback berechnen
if (_cameraDirection.lengthSq() < 0.001) {
  // Berechne Richtung aus Yaw-Winkel direkt
  _cameraDirection.set(
    Math.sin(yaw.current),   // X aus Yaw
    0,                        // Y ist 0 (horizontal)
    -Math.cos(yaw.current)   // Z aus Yaw
  );
}
```

### 8.2 Air Control erklärt

```typescript
// Am Boden: 100% Kontrolle
// In der Luft: 30% Kontrolle + 70% bestehende Velocity

const controlFactor = isGrounded.current ? 1.0 : 0.3;

// In der Luft: Bestehende Geschwindigkeit beibehalten
if (!isGrounded.current) {
  _velocity.x += rbVelocity.x * 0.7;
  _velocity.z += rbVelocity.z * 0.7;
}
```

### 8.3 Häufige Fehler vermeiden

```
❌ NIEMALS: Kommentare zwischen JSX-Attributen
   <Canvas {/* comment */} shadows>  // SYNTAX ERROR!

❌ NIEMALS: camera Prop im Canvas wenn makeDefault verwendet wird
   <Canvas camera={{...}}>  // Überschreibt makeDefault!

❌ NIEMALS: new Vector3() in useFrame
   useFrame(() => { const v = new Vector3(); })  // Memory Leak!

❌ NIEMALS: getKeys() außerhalb von useFrame cachen
   const keys = getKeys();  // Wird nur einmal aufgerufen!
   useFrame(() => { if(keys.forward) ... })  // Funktioniert nicht!

✅ IMMER: getKeys() IN useFrame aufrufen
   useFrame(() => { const keys = getKeys(); if(keys.forward) ... })
```

---

## ════════════════════════════════════════════════════════════════════════════════
## ZUSAMMENFASSUNG FÜR GEMINI
## ════════════════════════════════════════════════════════════════════════════════

```
AUFGABE:
1. ERSETZE src/components/player/Player.tsx mit dem Code aus Sektion 4
2. ENTFERNE die "camera" Prop aus dem <Canvas> in src/App.tsx
3. STELLE SICHER dass KeyboardControls das Canvas umschließt
4. STELLE SICHER dass alle Böden receiveShadow haben
5. VALIDIERE mit der Checkliste aus Sektion 7

KRITISCHE PUNKTE:
- PerspectiveCamera MUSS makeDefault haben
- getKeys() MUSS in useFrame aufgerufen werden
- Camera Prop MUSS aus Canvas entfernt werden
- Temporäre Vektoren MÜSSEN außerhalb der Komponente sein
```

---

**DOKUMENT ENDE**
