# 🎯 KAMERA DRAG-SYSTEM FIX — IMPLEMENTIERUNGS-ANWEISUNG

## PROBLEM
Die Kamera bewegt sich nicht, wenn die linke Maustaste gedrückt wird. Das Drag-System funktioniert nicht korrekt.

## GEWÜNSCHTES VERHALTEN
1. ✅ **Linke Maustaste gedrückt + Maus bewegen** → Kamera dreht sich
2. ✅ **Linke Maustaste loslassen** → Kamera stoppt, Maus bleibt normal nutzbar
3. ✅ **Maus bleibt IMMER sichtbar** (kein Pointer-Lock!)
4. ✅ **UI-Klicks funktionieren** → blockieren NICHT die Kamera

---

## LÖSUNG: Korrektes Drag-System in PlayerCamera.tsx

### SCHRITT 1: Pointer-Lock vollständig entfernen

**Entferne ALLE diese Imports/Aufrufe aus PlayerCamera.tsx:**
```typescript
// ❌ LÖSCHEN - Diese Zeilen NICHT verwenden:
const { consumeDelta, requestPointerLock, exitPointerLock } = useMouseLook(config.sensitivity);
document.pointerLockElement
requestPointerLock()
exitPointerLock()
```

### SCHRITT 2: Drag-System richtig implementieren

**Ersetze den kompletten Kamera-Rotations-Code mit diesem funktionierenden System:**

```typescript
import { RefObject, useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { RapierRigidBody } from '@react-three/rapier';
import * as THREE from 'three';
import { useGameStore } from '../../stores/gameStore';
import { GamePhase } from '../../types';

interface PlayerCameraProps {
  rigidBodyRef?: RefObject<RapierRigidBody | null>;
  targetPosition?: THREE.Vector3;
  rotationRef: RefObject<number>;
  config: {
    distance: number;
    minDistance: number;
    maxDistance: number;
    height: number;
    sensitivity: number;
    fov?: number;
    enableHeadBob?: boolean;
  };
}

export function PlayerCamera({ 
  rigidBodyRef,
  targetPosition, 
  rotationRef, 
  config 
}: PlayerCameraProps) {
  const { camera } = useThree();
  const player = useGameStore((s) => s.player);
  const gamePhase = useGameStore((s) => s.ui.gamePhase);
  
  const currentDistRef = useRef(config.distance);
  const lastHealthRef = useRef(player.health);
  const shakeRef = useRef(0);
  const lastValidTargetRef = useRef(new THREE.Vector3(0, config.height, 0));
  
  // Optimization: Reusable vectors
  const tempTarget = useRef(new THREE.Vector3());
  const tempOffset = useRef(new THREE.Vector3());
  const tempAxis = useRef(new THREE.Vector3(0, 1, 0));
  const tempUp = useRef(new THREE.Vector3(0, 1, 0));
  const tempEyeHeight = useRef(new THREE.Vector3());
  const tempLookAt = useRef(new THREE.Vector3());
  const tempLookAtOffset = useRef(new THREE.Vector3(0, 1.5, 0));

  // ========================================
  // DRAG SYSTEM FÜR KAMERA-ROTATION
  // ========================================
  const isDraggingRef = useRef(false);
  const lastMouseXRef = useRef(0);
  const lastMouseYRef = useRef(0);

  useEffect(() => {
    // ============ MOUSEDOWN ============
    const handleMouseDown = (e: MouseEvent) => {
      // Nur linke Maustaste (button === 0)
      if (e.button !== 0) return;
      
      // Nur wenn im Spiel (nicht im Menü)
      if (gamePhase !== GamePhase.PLAYING) return;

      // Drag starten
      isDraggingRef.current = true;
      lastMouseXRef.current = e.clientX;
      lastMouseYRef.current = e.clientY;
      
      console.log('🎮 Camera Drag STARTED');
    };

    // ============ MOUSEMOVE ============
    const handleMouseMove = (e: MouseEvent) => {
      // Nur wenn Drag aktiv ist
      if (!isDraggingRef.current) return;

      // Berechne Maus-Delta (wie viel sich Maus bewegt hat)
      const deltaX = e.clientX - lastMouseXRef.current;
      const deltaY = e.clientY - lastMouseYRef.current;

      // Update letzte Position
      lastMouseXRef.current = e.clientX;
      lastMouseYRef.current = e.clientY;

      // ========================================
      // KAMERA ROTATION UPDATEN
      // ========================================
      if (rotationRef.current !== null && Number.isFinite(rotationRef.current)) {
        // Horizontal Rotation (Y-Achse)
        rotationRef.current -= deltaX * config.sensitivity * 0.002;
        
        // Optional: Vertical Rotation (Pitch) - falls gewünscht
        // pitchRef.current = Math.max(-Math.PI/2, Math.min(Math.PI/2, 
        //   pitchRef.current - deltaY * config.sensitivity * 0.002
        // ));
      } else {
        // Safety: Falls rotationRef ungültig ist
        rotationRef.current = 0;
      }

      console.log('🎮 Camera Rotation:', rotationRef.current);
    };

    // ============ MOUSEUP ============
    const handleMouseUp = (e: MouseEvent) => {
      // Nur linke Maustaste
      if (e.button !== 0) return;

      // Drag beenden
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        console.log('🎮 Camera Drag STOPPED');
      }
    };

    // Event Listeners registrieren
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Cleanup
    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [gamePhase, rotationRef, config.sensitivity]);

  // Apply FOV
  useEffect(() => {
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = config.fov || 90;
      camera.updateProjectionMatrix();
    }
  }, [config.fov, camera]);

  // Handle Zoom (Mausrad)
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const zoomSpeed = 2;
      const dir = Math.sign(e.deltaY);
      currentDistRef.current = Math.max(
        config.minDistance, 
        Math.min(config.maxDistance, currentDistRef.current + dir * zoomSpeed)
      );
    };
    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, [config]);

  // Health damage shake effect
  useEffect(() => {
    const deltaHealth = player.health - lastHealthRef.current;
    if (deltaHealth < 0 && player.maxHealth > 0) {
      const damage = -deltaHealth;
      const normalized = Math.max(0.1, Math.min(1, (damage / player.maxHealth) * 4));
      if (normalized > shakeRef.current) {
        shakeRef.current = normalized;
      }
    }
    lastHealthRef.current = player.health;
  }, [player.health, player.maxHealth]);

  // ========================================
  // FRAME LOOP - KAMERA POSITION & ROTATION
  // ========================================
  useFrame((_, dt) => {
    // 1. Get Target Position
    const target = tempTarget.current;
    target.copy(lastValidTargetRef.current);

    if (rigidBodyRef && rigidBodyRef.current) {
      const t = rigidBodyRef.current.translation();
      if (Number.isFinite(t.x) && Number.isFinite(t.y) && Number.isFinite(t.z)) {
        target.set(t.x, t.y, t.z);
      }
    } else if (targetPosition) {
      if (
        Number.isFinite(targetPosition.x) &&
        Number.isFinite(targetPosition.y) &&
        Number.isFinite(targetPosition.z)
      ) {
        target.copy(targetPosition);
      }
    }
    lastValidTargetRef.current.copy(target);

    // 2. Camera Orbit Calculation
    const dist = currentDistRef.current;
    
    // Offset basierend auf Rotation
    const offset = tempOffset.current;
    offset.set(0, 0, dist);
    offset.applyAxisAngle(tempAxis.current, rotationRef.current || 0);
    
    // Kamera Position = Target + Height + Offset
    const eyeHeight = config.height;
    const finalCameraPos = tempEyeHeight.current;
    finalCameraPos.copy(target).add(tempUp.current.set(0, eyeHeight, 0)).add(offset);

    // LookAt Target
    const lookAtTarget = tempLookAt.current;
    lookAtTarget.copy(target).add(tempLookAtOffset.current);

    // Safety check
    if (
      !Number.isFinite(finalCameraPos.x) ||
      !Number.isFinite(finalCameraPos.y) ||
      !Number.isFinite(finalCameraPos.z)
    ) {
      return;
    }

    // Update Camera (smooth lerp)
    const lerpFactor = Math.min(1.0, 10 * dt);
    camera.position.lerp(finalCameraPos, lerpFactor);
    camera.lookAt(lookAtTarget);
  });

  return null;
}
```

---

## SCHRITT 3: Initialisierung von rotationRef prüfen

**In der Parent-Component (wo PlayerCamera verwendet wird):**

```typescript
// WICHTIG: rotationRef muss mit 0 initialisiert werden, nicht null!
const rotationRef = useRef<number>(0); // ✅ Richtig

// NICHT so:
const rotationRef = useRef<number | null>(null); // ❌ Falsch
```

---

## SCHRITT 4: HUD pointerEvents konfigurieren

**Falls UI-Elemente Klicks blockieren, in HUD.tsx anpassen:**

```typescript
const styles = {
  container: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none' as const, // ← WICHTIG: none, nicht auto!
    fontFamily: '"Segoe UI", "Roboto Mono", monospace',
    zIndex: 1000,
    userSelect: 'none' as const,
    color: theme.colors.textMain,
  },
  // Einzelne UI-Elemente, die klickbar sein sollen:
  button: {
    pointerEvents: 'auto' as const, // ← Nur Buttons etc. auf 'auto'
  }
};
```

**Regel:**
- HUD Container: `pointerEvents: 'none'` → Maus geht durch zu Canvas
- Einzelne Buttons/UI-Elemente: `pointerEvents: 'auto'` → nur diese klickbar

---

## SCHRITT 5: Debugging aktivieren

**Zum Testen, füge Console-Logs ein (bereits im Code oben):**

```typescript
console.log('🎮 Camera Drag STARTED');  // Bei Mousedown
console.log('🎮 Camera Rotation:', rotationRef.current); // Bei Mousemove
console.log('🎮 Camera Drag STOPPED'); // Bei Mouseup
```

**Browser-Console öffnen (F12) und prüfen:**
- Siehst du "Camera Drag STARTED" wenn du linke Maustaste drückst? ✅
- Siehst du "Camera Rotation" Updates wenn du Maus bewegst? ✅
- Siehst du "Camera Drag STOPPED" wenn du Maustaste loslässt? ✅

---

## FEHLERSUCHE

### Problem: Kamera bewegt sich immer noch nicht

**Check 1: rotationRef initialisiert?**
```typescript
// In Parent Component:
const rotationRef = useRef<number>(0); // Muss 0 sein, nicht null!
```

**Check 2: GamePhase ist PLAYING?**
```typescript
// Drag funktioniert nur wenn gamePhase === GamePhase.PLAYING
console.log('GamePhase:', gamePhase);
```

**Check 3: Event Listeners aktiv?**
```typescript
// Füge in handleMouseDown hinzu:
console.log('MOUSEDOWN EVENT FIRED', e.button, gamePhase);
```

**Check 4: HUD blockiert Events?**
```typescript
// HUD Container muss haben:
pointerEvents: 'none' // ← Canvas ist erreichbar
```

### Problem: Kamera dreht sich zu schnell/langsam

**Sensitivity anpassen:**
```typescript
const config = {
  sensitivity: 1.0, // ← Wert ändern (0.5 = langsamer, 2.0 = schneller)
};
```

### Problem: Maus verschwindet doch

**Prüfen: Kein Pointer-Lock mehr vorhanden?**
```bash
# Im gesamten Projekt suchen:
grep -r "requestPointerLock" src/
grep -r "pointerLockElement" src/

# Falls gefunden → entfernen!
```

---

## ZUSAMMENFASSUNG - CHECKLISTE

- [ ] `useMouseLook` NICHT mehr in `PlayerCamera` importiert
- [ ] Alle `requestPointerLock()` / `exitPointerLock()` Aufrufe entfernt
- [ ] Neues Drag-System mit `mousedown/mousemove/mouseup` implementiert
- [ ] `rotationRef` mit `0` initialisiert (nicht `null`)
- [ ] `HUD container` hat `pointerEvents: 'none'`
- [ ] Console-Logs zeigen "Drag STARTED/STOPPED" an
- [ ] Kamera dreht sich bei gedrückter linker Maustaste + Bewegung
- [ ] Maus bleibt sichtbar und normal nutzbar

---

## ERWARTETES ERGEBNIS

✅ **Linke Maustaste drücken + Maus bewegen** → Kamera folgt horizontal  
✅ **Maustaste loslassen** → Kamera stoppt sofort  
✅ **Maus bleibt immer sichtbar** (Cursor normal)  
✅ **UI-Buttons klickbar** ohne Kamera zu bewegen  
✅ **Mausrad** → Zoom funktioniert weiterhin

---

**Ende der Implementierungs-Anweisung**
