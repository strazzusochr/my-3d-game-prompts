# 🎛️ CORONA CONTROL 3.1 – KONTROLL-PROMPT (MASTER TRACKER)

**Ziel:** Totale Überwachung des Projektfortschritts.
**Matrix:** Vertikal (Phasen) x Horizontal (Detaillierte Schritte in %).

---

## 📊 GLOBALE STATUS-MATRIX

| SYSTEM | FORTSCHRITT | STATUS | VERSION |
| :--- | :---: | :---: | :---: |
| **Engine Core** | 100% | ✅ STABIL | 3.1 |
| **Gameplay** | 90% | ✅ LIVE | 3.0 |
| **Graphics** | 60% | 🟡 WIP | 3.1 (God-Tier) |
| **Physics/Sim** | 70% | 🟡 WIP | 3.1 (Soft-Body) |
| **AI / Logic** | 85% | ✅ LIVE | 3.0 |
| **Content** | 40% | 🔴 TODO | 2.0 |

---

## 🔬 DETAILLIERTER PHASEN-TRACKER (Horizontal/Vertikal)

### 🔴 Phase 20: God-Tier Graphics & Volumetrics (Aktuell)
> **Ziel:** Implementierung von volumetrischem Licht (God Rays) und Tränengas-Shader.

| Schritt | Beschreibung | % Complete | Status |
| :--- | :--- | :---: | :---: |
| **20.1** | Rendering Pipeline (Effects Composer) | 100% | ✅ |
| **20.2** | Licht & Schatten (PBR Setup) | 100% | ✅ |
| **20.3** | PostFX (Bloom, Vignette, Tone Mapping) | 100% | ✅ |
| **20.4** | **[FOKUS]** God Rays / Volumetric Light | 0% | 🟡 |
| **20.5** | Custom Shader: Tear Gas (R3F) | 0% | 🔴 |
| **20.6** | Photogrammetrie Asset Pipeline | 0% | 🔴 |

### 🔜 Phase 7 (Update): Soft-Body & Advanced Physics
> **Ziel:** R3F/Rapier Erweiterung für deformierbare Objekte (Gummienten).

| Schritt | Beschreibung | % Complete | Status |
| :--- | :--- | :---: | :---: |
| **7.1** | RigidBody Basics | 100% | ✅ |
| **7.2** | Soft-Body Mesh Simulation (Spring-Mass) | 0% | 🔴 |
| **7.3** | Cloth Simulation (Vertex Displacement) | 0% | 🔴 |
| **7.4** | Inflation Physics (Druck-Variable) | 0% | 🔴 |

### 🔜 Phase 12 (Update): Photogrammetrie & Level-Details
> **Ziel:** Integration von 8K-Scans und Mikro-Details.

| Schritt | Beschreibung | % Complete | Status |
| :--- | :--- | :---: | :---: |
| **12.1** | Scan Import Pipeline (GLB/USDZ) | 0% | 🔴 |
| **12.2** | Nanite-Style LOD Streaming | 0% | 🔴 |
| **12.3** | Virtual Texturing | 0% | 🔴 |

---

## 🧠 LOGIK-KONTROLLE (Code-Ebene)

### Neue Komponenten (3.1 Blueprint)

1.  **HumorSystem.ts**
    *   [ ] `HumorLevel` (Global State)
    *   [ ] `registerHumorEvent()` (Funktion)
    *   [ ] `DuckPhysics` (Komponente)

2.  **TearGas.tsx** (Shader)
    *   [ ] `TearGasMaterial` (ShaderMaterial)
    *   [ ] `TearGasVolume` (Mesh)
    *   [ ] `useWind` (Uniform Binding)

3.  **PhotogrammetryLoader.ts**
    *   [ ] `loadHighResScan()`
    *   [ ] `LODManager`

---

## 📝 BEFEHLS-PROTOKOLL

Verwende diese Tabelle, um den nächsten Schritt zu wählen:

*   **NEXT STEP:** `Implement 20.4 (God Rays)` -> Gehe zu `WeatherSystem.tsx`
*   **NEXT STEP:** `Implement TearGas Shader` -> Erstelle `src/components/effects/TearGas.tsx`
*   **NEXT STEP:** `Update Physics` -> Erweitere `PhysicsSystem.ts`

---
*Corona Control 3.1 - Master Control File*
