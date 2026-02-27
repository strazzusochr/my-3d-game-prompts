# ⏰ CORONA CONTROL ULTIMATE - HYPER-DETAILLIERTES 24-STUNDEN EVENT-SYSTEM
## FRAME-GENAUE HANDLUNGSBESCHREIBUNGEN - MILLISEKUNDEN-PRÄZISION
### JEDE BEWEGUNG - JEDER MUSKEL - JEDES PARTIKEL - JEDER SOUND

---

```
╔═══════════════════════════════════════════════════════════════════════════════════╗
║                                                                                   ║
║     ⏰ HYPER-DETAIL 24-STUNDEN EVENT-SYSTEM - PRODUKTIONSREIF ⏰                  ║
║                                                                                   ║
║   PRÄZISIONS-NIVEAU:                                                             ║
║   ├─ Zeitangaben: Auf 0.1 Sekunden genau                                        ║
║   ├─ Animationen: Frame-by-Frame (30/60 FPS)                                    ║
║   ├─ Physik: Exakte Werte (Masse, Kraft, Geschwindigkeit)                       ║
║   ├─ Audio: Dezibel, Frequenzen, Layering                                       ║
║   ├─ Partikel: Exakte Anzahl, Größe, Lebensdauer                               ║
║   ├─ NPCs: Individuelle IDs, Positionen, Emotionen                              ║
║   └─ Shader: Parameter, Übergänge, Werte                                        ║
║                                                                                   ║
╚═══════════════════════════════════════════════════════════════════════════════════╝
```

---

# 🕐 ZEIT-SYSTEM - TECHNISCHE SPEZIFIKATION

## KERN-PARAMETER
```
KONVERTIERUNG:
━━━━━━━━━━━━━━
1 Spieltag        = 1440 Spielminuten = 24 Realminuten = 1440 Realsekunden
1 Spielstunde     = 60 Spielminuten   = 1 Realminute   = 60 Realsekunden
1 Spielminute     = 1 Realsekunde
1 Spielsekunde    = 0.0167 Realsekunden (16.7 Millisekunden)

SYSTEM-TICKS:
━━━━━━━━━━━━━
- Haupt-Loop: 60 Hz (16.67ms pro Frame)
- Physik-Update: 120 Hz (8.33ms pro Step)
- AI-Update: 10 Hz (100ms pro Cycle)
- Event-Check: 0.2 Hz (5000ms = 5 Spielminuten)
- Audio-Update: 44100 Hz (Sample-Rate)

ZEIT-VARIABLEN:
━━━━━━━━━━━━━━
float gameTimeSeconds;      // 0.0 - 86400.0 (24h in Sekunden)
int gameHour;               // 0-23
int gameMinute;             // 0-59
float realTimeMultiplier;   // Default: 60.0 (1 Realmin = 1 Spielstunde)
bool isPaused;              // Pausiert Zeit-Fortschritt
```

## UHR-DISPLAY - PIXEL-GENAUE SPEZIFIKATION
```
CONTAINER:
━━━━━━━━━━
Position: Vector2(screenWidth - 140, 20)
Size: Vector2(120, 55)
Background: RGBA(0, 0, 0, 180) // Halbtransparent schwarz
Border: 2px solid, Farbe nach Tageszeit
BorderRadius: 8px
Padding: 10px

ZEIT-TEXT:
━━━━━━━━━━
Font: "Digital-7 Mono" (oder "DSEG7 Classic")
FontSize: 36px
Position: Zentriert im Container
Format: "HH:MM" (mit führenden Nullen)
Kerning: 2px zwischen Ziffern
Colon-Animation: Blinkt alle 500ms (opacity 1.0 ↔ 0.3)

DATUMS-TEXT:
━━━━━━━━━━━━
Font: "Roboto Condensed"
FontSize: 11px
Position: 8px unter Zeit-Text, zentriert
Format: "Wochentag, DD. Monat YYYY"
Farbe: RGBA(200, 200, 200, 255)

FARB-SCHEMA (Zeit-Text + Border):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
06:00:00 - 07:59:59  →  #FF8C00 (Orange) + Glow-Effect
08:00:00 - 17:59:59  →  #FFFFFF (Weiß)
18:00:00 - 19:59:59  →  #FFD700 (Gold) + Subtle Glow
20:00:00 - 05:59:59  →  #4169E1 (Royal Blue) + Glow-Effect

GLOW-EFFECT (wenn aktiv):
━━━━━━━━━━━━━━━━━━━━━━━━
Type: Outer Glow
Color: Gleich wie Text-Farbe
Blur: 8px
Spread: 2px
Opacity: 0.6
Animation: Pulsiert (opacity 0.4 ↔ 0.8, Period: 2s, Sine-Wave)
```

---

# 🌅 PHASE 1: MORGEN (06:00:00 - 11:59:59)

---

## 06:00:00.000 - TAGESBEGINN: STADT ERWACHT

### LICHT-SYSTEM TRANSITION (Dauer: 300 Sekunden Spielzeit = 5 Sekunden Realzeit)

**Frame-by-Frame Shader-Übergang:**
```
ZEITPUNKT 06:00:00.000 (Frame 0):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SKYBOX:
├─ Zenith-Color: RGB(15, 15, 45) // Tiefes Nachtblau
├─ Horizon-Color: RGB(25, 20, 50) // Dunkelviolett
├─ Sun-Position: Azimuth 90°, Elevation -18° (unter Horizont)
├─ Sun-Disk: Nicht sichtbar
├─ Stars-Opacity: 0.8
└─ Moon-Phase: Halbmond, Position (45°, 60°)

DIRECTIONAL LIGHT (Sonne):
├─ Rotation: Quaternion(-0.309, 0.0, 0.0, 0.951) // -36° Pitch
├─ Intensity: 0.0 lux
├─ Color: RGB(0, 0, 0) // Aus
└─ Shadow-Strength: 0.0

AMBIENT LIGHT:
├─ Sky-Color: RGB(10, 10, 25)
├─ Equator-Color: RGB(15, 15, 35)
├─ Ground-Color: RGB(5, 5, 15)
└─ Intensity: 0.15

POINT LIGHTS (Straßenlaternen):
├─ Anzahl aktiv: 247 (alle im Spielbereich)
├─ Intensity: 800 lumen
├─ Color: RGB(255, 214, 170) // Warmweiß
├─ Range: 15m
├─ Shadow-Type: Soft Shadows
└─ Status: AN

FOG:
├─ Mode: Exponential Squared
├─ Density: 0.008
├─ Color: RGB(20, 20, 40)
└─ Start-Distance: 50m

---

ZEITPUNKT 06:01:00.000 (Frame 3600 bei 60fps, 1 Sek real):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SKYBOX (interpoliert):
├─ Zenith-Color: RGB(25, 30, 70) // Aufhellend
├─ Horizon-Color: RGB(120, 60, 40) // Erstes Orange
├─ Sun-Position: Elevation -12° (näher am Horizont)
├─ Sun-Disk: Noch nicht sichtbar, aber Glühen am Horizont
│   └─ Horizon-Glow: Gradient, RGB(255, 100, 50), Radius 30°
├─ Stars-Opacity: 0.5 (verblassend)
└─ Moon-Opacity: 0.6 (verblassend)

DIRECTIONAL LIGHT:
├─ Rotation: Pitch -30°
├─ Intensity: 50 lux (erstes Licht)
├─ Color: RGB(255, 120, 80) // Tiefes Orange
└─ Shadow-Strength: 0.2

AMBIENT LIGHT:
├─ Intensity: 0.25
└─ Sky-Color: RGB(40, 35, 60)

---

ZEITPUNKT 06:02:00.000 (Frame 7200, 2 Sek real):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SKYBOX:
├─ Zenith-Color: RGB(60, 80, 140)
├─ Horizon-Color: RGB(255, 140, 80)
├─ Sun-Position: Elevation -6°
├─ Sun-Disk: Oberkante sichtbar (Radius 0.5°)
│   └─ Color: RGB(255, 180, 100)
│   └─ Bloom-Intensity: 2.0
├─ Stars-Opacity: 0.2
└─ God-Rays: Aktiviert
    ├─ Intensity: 0.3
    ├─ Decay: 0.95
    └─ Samples: 64

DIRECTIONAL LIGHT:
├─ Intensity: 500 lux
├─ Color: RGB(255, 180, 120)
└─ Shadow-Strength: 0.5

---

ZEITPUNKT 06:03:00.000 (Frame 10800, 3 Sek real):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LATERNEN-FLICKER-SEQUENZ BEGINNT:

Laterne_001 bis Laterne_247 (gestaffelt über 500ms):
├─ Frame 0-5: Intensity 800 → 400 (Flicker 1)
├─ Frame 6-10: Intensity 400 → 800 (Recovery)
├─ Frame 11-14: Intensity 800 → 200 (Flicker 2)
├─ Frame 15-20: Intensity 200 → 800 (Recovery)
├─ Frame 21-25: Intensity 800 → 0 (Flicker 3 + Aus)
├─ Frame 26+: Intensity bleibt 0
└─ Audio pro Laterne: "electric_buzz_off.wav" (0.1s, -20dB)

Staffelung: Laterne_001 startet bei Frame 10800
           Laterne_002 startet bei Frame 10802 (+33ms)
           Laterne_003 startet bei Frame 10804 (+66ms)
           ... (Wellen-Effekt von Ost nach West)

---

ZEITPUNKT 06:04:00.000 (Frame 14400, 4 Sek real):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SKYBOX:
├─ Zenith-Color: RGB(100, 140, 200)
├─ Horizon-Color: RGB(255, 200, 150)
├─ Sun-Position: Elevation 0° (genau am Horizont)
├─ Sun-Disk: Voll sichtbar (Radius 0.53°)
│   └─ Color: RGB(255, 220, 180)
│   └─ Bloom-Intensity: 3.0
└─ God-Rays: Intensity 0.6

DIRECTIONAL LIGHT:
├─ Intensity: 5000 lux
├─ Color: RGB(255, 220, 180)
└─ Shadow-Strength: 0.7

ALLE LATERNEN: AUS (0 lux)

---

ZEITPUNKT 06:05:00.000 (Frame 18000, 5 Sek real):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FINALE MORGEN-WERTE:
├─ Zenith-Color: RGB(135, 180, 230) // Hellblau
├─ Horizon-Color: RGB(255, 230, 200) // Helles Orange-Gelb
├─ Sun-Position: Elevation +3°
├─ Sun-Disk: Color RGB(255, 240, 220)
├─ God-Rays: Intensity 0.4 (abklingend)
├─ Stars: Komplett unsichtbar (Opacity 0)
├─ Directional-Intensity: 15000 lux
├─ Directional-Color: RGB(255, 245, 230)
├─ Ambient-Intensity: 0.6
└─ Fog-Color: RGB(180, 190, 210)

TRANSITION KOMPLETT - Tages-Modus aktiv
```

### AUDIO-TRANSITION (06:00:00 - 06:05:00)

**Layer-basiertes Audio-System:**
```
AUDIO-LAYER KONFIGURATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━

LAYER 0: AMBIENT-BASE (Nacht → Morgen)
├─ Track: "night_ambient_city.wav" (Loop)
│   ├─ Startzeit: Bereits spielend
│   ├─ Volume bei 06:00:00: -12dB
│   ├─ Fade-Out: 06:00:00 → 06:03:00 (linear, -12dB → -∞)
│   └─ Stoppt bei: 06:03:00
├─ Track: "morning_ambient_city.wav" (Loop)
│   ├─ Fade-In Start: 06:02:00
│   ├─ Fade-In Ende: 06:05:00
│   ├─ Volume-Kurve: -∞ → -15dB (exponential)
│   └─ Bleibt spielend bis 18:00:00

LAYER 1: VÖGEL
├─ Track: "birds_dawn_chorus.wav" (Loop)
│   ├─ Trigger: 06:00:00.000
│   ├─ Fade-In: 0ms → 3000ms, Volume -∞ → -8dB
│   ├─ Spatial: 3D, Position randomisiert (Bäume)
│   ├─ Doppler: Enabled (für vorbeifliegende)
│   └─ Variations: 12 verschiedene Vogel-Typen
├─ Einzelne Bird-Calls (One-Shots, randomisiert):
│   ├─ "blackbird_call_01.wav" bei 06:00:15 (-6dB)
│   ├─ "sparrow_chirp_03.wav" bei 06:00:22 (-10dB)
│   ├─ "robin_song_02.wav" bei 06:00:38 (-8dB)
│   └─ ... (alle 5-15 Sek ein zufälliger Call)

LAYER 2: KIRCHENGLOCKEN
├─ Track: "church_bell_vienna_6am.wav"
│   ├─ Trigger: 06:00:00.000 (exakt)
│   ├─ Anzahl Schläge: 6
│   ├─ Intervall zwischen Schlägen: 2.5 Sekunden
│   ├─ Volume: -3dB (prominent)
│   ├─ Reverb: Cathedral-Preset, Mix 30%
│   ├─ 3D-Position: Stephansdom (bekannte Koordinaten)
│   ├─ Attenuation: Logarithmic, Max-Distance 500m
│   └─ Timing pro Schlag:
│       ├─ Schlag 1: 06:00:00.000
│       ├─ Schlag 2: 06:00:02.500
│       ├─ Schlag 3: 06:00:05.000
│       ├─ Schlag 4: 06:00:07.500
│       ├─ Schlag 5: 06:00:10.000
│       └─ Schlag 6: 06:00:12.500
│   └─ Nachhall endet: ~06:00:18.000

LAYER 3: ENTFERNTER VERKEHR
├─ Track: "distant_traffic_loop.wav"
│   ├─ Trigger: 06:00:30
│   ├─ Fade-In: 5000ms, -∞ → -18dB
│   ├─ Lowpass-Filter: Cutoff 800Hz (entfernt klingend)
│   └─ Spatial: 2D (nicht positioniert)

LAYER 4: HUND BELLT (One-Shot)
├─ Track: "dog_bark_distant_02.wav"
│   ├─ Trigger: 06:01:00.000
│   ├─ Volume: -15dB
│   ├─ 3D-Position: 200m entfernt, zufällige Richtung
│   ├─ Reverb: Outdoor-Preset, Mix 20%
│   └─ Wiederholung: Keine (einmalig)

LAYER 5: LATERNEN-ELEKTRIK
├─ Trigger: Synchron mit visueller Flicker-Sequenz
├─ Pro Laterne: "electric_hum_off.wav"
│   ├─ Volume: -25dB (subtil)
│   ├─ Duration: 200ms
│   ├─ 3D: Position der jeweiligen Laterne
│   └─ Attenuation: Max 10m
```

### NPC-SPAWNING: ERSTE WELLE (06:00:00 - 06:05:00)

**15 NPCs mit individuellen Eigenschaften:**

```
╔═══════════════════════════════════════════════════════════════════════════════════╗
║ NPC_CIVILIAN_001 - "JOGGER STEFAN"                                               ║
╠═══════════════════════════════════════════════════════════════════════════════════╣
║                                                                                   ║
║ SPAWN-DATEN:                                                                      ║
║ ├─ Spawn-Zeit: 06:00:00.000                                                      ║
║ ├─ Spawn-Position: Vector3(127.5, 0.0, -89.2) // Stadtpark Eingang Ost          ║
║ ├─ Spawn-Rotation: Quaternion(0, 0.707, 0, 0.707) // Blickt nach Westen         ║
║ └─ Spawn-Animation: "idle_standing" → "start_jogging" (Blend 0.3s)              ║
║                                                                                   ║
║ CHARAKTER-MODELL:                                                                 ║
║ ├─ Base-Mesh: "male_athletic_30s"                                                ║
║ ├─ Höhe: 1.82m                                                                   ║
║ ├─ Gewicht: 78kg (für Physik-Berechnungen)                                       ║
║ ├─ Hautfarbe: RGB(225, 185, 160)                                                 ║
║ ├─ Haarfarbe: RGB(60, 45, 30) // Dunkelbraun                                    ║
║ ├─ Haarstyle: "short_sporty"                                                     ║
║ └─ Gesichtsausdruck-Preset: "focused_athletic"                                   ║
║                                                                                   ║
║ OUTFIT-KONFIGURATION:                                                             ║
║ ├─ Oberkörper: "running_shirt_tight"                                             ║
║ │   ├─ Farbe: RGB(220, 50, 50) // Rot                                           ║
║ │   ├─ Material: "synthetic_sport" (Glanz: 0.3)                                 ║
║ │   └─ Schweiß-Decal: Aktiviert nach 5min Joggen                                ║
║ ├─ Unterkörper: "running_shorts"                                                 ║
║ │   ├─ Farbe: RGB(30, 30, 30) // Schwarz                                        ║
║ │   └─ Material: "synthetic_sport"                                               ║
║ ├─ Schuhe: "running_shoes_nike"                                                  ║
║ │   ├─ Farbe: RGB(255, 255, 255) mit RGB(220, 50, 50) Akzenten                  ║
║ │   └─ Sohlen-Zustand: "new" (kein Abrieb)                                      ║
║ └─ Accessoires:                                                                   ║
║     ├─ "sports_watch" am linken Handgelenk                                       ║
║     ├─ "wireless_earbuds" (weiß, in Ohren)                                       ║
║     └─ "arm_phone_holder" am rechten Oberarm                                     ║
║                                                                                   ║
║ BEWEGUNGS-PARAMETER:                                                              ║
║ ├─ Animations-State: "jogging_male_athletic"                                     ║
║ ├─ Bewegungs-Geschwindigkeit: 3.2 m/s (11.5 km/h)                               ║
║ ├─ Schritt-Frequenz: 170 Schritte/Minute                                        ║
║ ├─ Schritt-Länge: 1.13m                                                          ║
║ ├─ Arm-Swing-Amplitude: 35°                                                      ║
║ ├─ Kopf-Bewegung: Minimal (±3° Pitch, stabilisiert)                             ║
║ └─ Atem-Animation: Sichtbar (Brustkorb-Expansion 2cm, Rate 24/min)              ║
║                                                                                   ║
║ PFAD-DEFINITION:                                                                  ║
║ ├─ Typ: Waypoint-basiert, Loop                                                   ║
║ ├─ Waypoints:                                                                     ║
║ │   ├─ WP_001: Vector3(127.5, 0.0, -89.2) // Start                              ║
║ │   ├─ WP_002: Vector3(95.0, 0.0, -120.5)                                       ║
║ │   ├─ WP_003: Vector3(45.2, 0.0, -135.8)                                       ║
║ │   ├─ WP_004: Vector3(-12.0, 0.0, -128.3)                                      ║
║ │   ├─ WP_005: Vector3(-45.5, 0.0, -95.0)                                       ║
║ │   ├─ WP_006: Vector3(-38.2, 0.0, -45.6)                                       ║
║ │   ├─ WP_007: Vector3(15.0, 0.0, -22.3)                                        ║
║ │   ├─ WP_008: Vector3(68.5, 0.0, -35.0)                                        ║
║ │   └─ WP_009: Vector3(127.5, 0.0, -89.2) // Zurück zum Start                   ║
║ ├─ Kurven-Typ: Catmull-Rom Spline (smooth)                                       ║
║ ├─ Gesamt-Distanz: 847m                                                          ║
║ └─ Runden-Zeit: ~4.4 Minuten (264 Sekunden)                                      ║
║                                                                                   ║
║ AUDIO:                                                                            ║
║ ├─ Footsteps: "footstep_running_gravel.wav"                                      ║
║ │   ├─ Trigger: Bei jedem Fußaufsatz                                            ║
║ │   ├─ Volume: -12dB                                                             ║
║ │   ├─ Pitch-Variation: ±5%                                                      ║
║ │   └─ 3D-Position: Fuß-Position                                                 ║
║ ├─ Breathing: "breathing_athletic_loop.wav"                                      ║
║ │   ├─ Volume: -18dB                                                             ║
║ │   ├─ Rate: Synchronisiert mit Animation                                        ║
║ │   └─ 3D-Position: Kopf-Position                                                ║
║ └─ Earbuds-Musik: "muffled_electronic_music.wav" (kaum hörbar für andere)       ║
║                                                                                   ║
║ INTERAKTIONS-VERHALTEN:                                                           ║
║ ├─ Reagiert auf Spieler: Minimal (nickt kurz wenn angesprochen)                 ║
║ ├─ Weicht aus: Ja, bei Kollisionskurs (Pathfinding-Ausweichen)                  ║
║ ├─ Stoppt für: Nichts außer Lebensbedrohung                                     ║
║ └─ Dialog-Optionen: "Entschuldigung, ich jogge gerade."                         ║
║                                                                                   ║
╚═══════════════════════════════════════════════════════════════════════════════════╝

╔═══════════════════════════════════════════════════════════════════════════════════╗
║ NPC_CIVILIAN_002 - "BÜROANGESTELLTE MARIA"                                       ║
╠═══════════════════════════════════════════════════════════════════════════════════╣
║                                                                                   ║
║ SPAWN-DATEN:                                                                      ║
║ ├─ Spawn-Zeit: 06:00:15.000                                                      ║
║ ├─ Spawn-Position: Vector3(-45.8, -8.5, 23.1) // U-Bahn Ausgang A               ║
║ ├─ Spawn-Animation: "stairs_climb_exit" → "walk_purposeful"                      ║
║ └─ Spawn-Methode: Tritt aus U-Bahn-Schacht hervor                               ║
║                                                                                   ║
║ CHARAKTER-MODELL:                                                                 ║
║ ├─ Base-Mesh: "female_average_40s"                                               ║
║ ├─ Höhe: 1.68m                                                                   ║
║ ├─ Gewicht: 65kg                                                                 ║
║ ├─ Hautfarbe: RGB(235, 200, 175)                                                 ║
║ ├─ Haarfarbe: RGB(45, 30, 20) // Dunkelbraun                                    ║
║ ├─ Haarstyle: "shoulder_length_professional"                                     ║
║ └─ Gesicht: Leichte Müdigkeit (Augenringe-Textur aktiviert)                     ║
║                                                                                   ║
║ OUTFIT-KONFIGURATION:                                                             ║
║ ├─ Oberkörper: "blouse_silk" + "blazer_fitted"                                  ║
║ │   ├─ Bluse-Farbe: RGB(240, 240, 245) // Cremeweiß                             ║
║ │   ├─ Blazer-Farbe: RGB(50, 50, 55) // Anthrazit                               ║
║ │   └─ Material: "fabric_business" (leichter Glanz)                              ║
║ ├─ Unterkörper: "pencil_skirt"                                                   ║
║ │   ├─ Farbe: RGB(50, 50, 55) // Passend zum Blazer                             ║
║ │   └─ Länge: Knielang                                                           ║
║ ├─ Schuhe: "heels_low_professional"                                              ║
║ │   ├─ Farbe: RGB(30, 30, 30) // Schwarz                                        ║
║ │   └─ Absatzhöhe: 4cm                                                           ║
║ └─ Accessoires:                                                                   ║
║     ├─ "leather_briefcase" in linker Hand                                        ║
║     │   ├─ Farbe: RGB(80, 50, 30) // Cognac                                     ║
║     │   └─ Physik: Schwankt leicht beim Gehen                                   ║
║     ├─ "smartphone" in rechter Hand (30% der Zeit)                              ║
║     │   └─ Screen: Leuchtet, zeigt generische App                               ║
║     ├─ "pearl_earrings" (dezent)                                                 ║
║     └─ "wedding_ring" am Ringfinger                                              ║
║                                                                                   ║
║ BEWEGUNGS-PARAMETER:                                                              ║
║ ├─ Animations-State: "walk_female_heels_purposeful"                              ║
║ ├─ Geschwindigkeit: 1.5 m/s (5.4 km/h)                                          ║
║ ├─ Schritt-Frequenz: 110 Schritte/Minute                                        ║
║ ├─ Hüft-Schwung: Natürlich (Heels-bedingt)                                      ║
║ ├─ Kopf-Orientierung: 70% nach vorne, 30% auf Handy                             ║
║ └─ Handtaschen-Physik: Sekundäre Animation, Phase-versetzt                      ║
║                                                                                   ║
║ VERHALTENS-SEQUENZ:                                                               ║
║ ├─ 06:00:15.000 - Tritt aus U-Bahn hervor                                       ║
║ │   └─ Animation: "stairs_exit_female" (Dauer: 2.5s)                            ║
║ ├─ 06:00:17.500 - Orientiert sich kurz                                          ║
║ │   └─ Animation: "look_around_quick" (Dauer: 1.2s)                             ║
║ │   └─ Head-Turn: Links 45°, Mitte, Rechts 30°                                  ║
║ ├─ 06:00:18.700 - Zieht Handy aus Tasche                                        ║
║ │   └─ Animation: "retrieve_phone_pocket" (Dauer: 1.5s)                         ║
║ │   └─ Audio: "fabric_rustle.wav" (-20dB)                                       ║
║ ├─ 06:00:20.200 - Beginnt zu gehen + Handy checken                              ║
║ │   └─ Animation-Blend: "walk_purposeful" + "phone_check_walking"               ║
║ │   └─ Blend-Weight: 0.4 (überwiegend Gehen)                                    ║
║ ├─ 06:00:20.200 → 06:02:30.000 - Geht Richtung Bürogebäude                      ║
║ │   └─ Distanz: 195m                                                             ║
║ │   └─ Ziel: Vector3(148.2, 0.0, 87.5) // Büro-Eingang                         ║
║ ├─ 06:02:25.000 - Steckt Handy weg                                              ║
║ │   └─ Animation: "store_phone_pocket" (Dauer: 1.3s)                            ║
║ └─ 06:02:30.000 - Betritt Gebäude                                               ║
║     └─ Animation: "door_push_enter"                                              ║
║     └─ Despawnt nach Tür schließt                                               ║
║                                                                                   ║
║ AUDIO:                                                                            ║
║ ├─ Footsteps: "footstep_heels_concrete.wav"                                      ║
║ │   ├─ Charakteristischer Klack-Klack                                            ║
║ │   ├─ Volume: -8dB (Heels sind laut)                                           ║
║ │   └─ Timing: Synchron mit Animation                                            ║
║ ├─ Briefcase: "leather_creak.wav" (gelegentlich)                                ║
║ └─ Phone-Tap: "touchscreen_tap.wav" (während Handy-Nutzung)                     ║
║                                                                                   ║
╚═══════════════════════════════════════════════════════════════════════════════════╝

╔═══════════════════════════════════════════════════════════════════════════════════╗
║ NPC_CIVILIAN_003 - "RENTNER HEINRICH MIT HUND"                                   ║
╠═══════════════════════════════════════════════════════════════════════════════════╣
║                                                                                   ║
║ SPAWN-DATEN:                                                                      ║
║ ├─ Spawn-Zeit: 06:00:30.000                                                      ║
║ ├─ Spawn-Position: Vector3(78.3, 0.0, -156.2) // Wohnhaus-Eingang               ║
║ └─ Spawn-Animation: "door_exit_slow" (Dauer: 3.0s)                              ║
║                                                                                   ║
║ CHARAKTER-MODELL (MENSCH):                                                        ║
║ ├─ Base-Mesh: "male_elderly_70s"                                                 ║
║ ├─ Höhe: 1.72m (leicht gebeugt: effektiv 1.68m)                                 ║
║ ├─ Gewicht: 72kg                                                                 ║
║ ├─ Hautfarbe: RGB(225, 195, 175) // Altersflecken-Overlay                       ║
║ ├─ Haarfarbe: RGB(200, 200, 205) // Grau-Weiß                                   ║
║ ├─ Haarstyle: "balding_sides" (Glatze oben, Seiten)                             ║
║ ├─ Gesicht: Falten-Normal-Map intensiv, freundlicher Ausdruck                   ║
║ └─ Brille: "reading_glasses_gold" (auf Nase)                                     ║
║                                                                                   ║
║ OUTFIT:                                                                           ║
║ ├─ Oberkörper: "cardigan_wool" + "shirt_checkered"                              ║
║ │   ├─ Cardigan-Farbe: RGB(100, 80, 60) // Braun                                ║
║ │   └─ Hemd: Blau-Weiß kariert                                                  ║
║ ├─ Unterkörper: "trousers_corduroy"                                             ║
║ │   └─ Farbe: RGB(80, 70, 55) // Beige-Braun                                    ║
║ ├─ Schuhe: "shoes_leather_comfortable"                                           ║
║ │   └─ Farbe: RGB(50, 35, 20) // Dunkelbraun                                    ║
║ └─ Accessoires:                                                                   ║
║     ├─ "flat_cap" (Schiebermütze)                                                ║
║     │   └─ Farbe: RGB(70, 60, 50) // Tweed-Muster                               ║
║     ├─ "walking_cane" in rechter Hand                                            ║
║     │   └─ Material: Holz, Messing-Griff                                         ║
║     └─ "dog_leash" in linker Hand                                                ║
║                                                                                   ║
║ HUND-ENTITY:                                                                      ║
║ ├─ Modell: "dog_dachshund"                                                       ║
║ ├─ Name-Tag: "WALDI" (unsichtbar, für Dialog)                                   ║
║ ├─ Fellfarbe: RGB(120, 70, 40) // Rotbraun                                      ║
║ ├─ Größe: 0.25m Schulterhöhe, 0.6m Länge                                        ║
║ ├─ Gewicht: 9kg                                                                  ║
║ └─ Leine:                                                                         ║
║     ├─ Typ: Rope-Physics (Seil-Simulation)                                       ║
║     ├─ Länge: 2.0m (flexibel)                                                    ║
║     ├─ Attachment: Heinrich linke Hand → Hund Halsband                          ║
║     └─ Constraint: Max-Distance 2.5m (Hund kann nicht weiter)                   ║
║                                                                                   ║
║ HUND-VERHALTEN:                                                                   ║
║ ├─ Basis-Animation: "dog_walk_happy"                                             ║
║ ├─ Geschwindigkeit: Passt sich Heinrich an (0.8 m/s)                            ║
║ ├─ Zufalls-Aktionen (alle 15-30 Sek):                                           ║
║ │   ├─ "dog_sniff_ground" - Bleibt stehen, schnüffelt (3s)                      ║
║ │   │   └─ Heinrich: Wartet, Leine spannt sich                                  ║
║ │   ├─ "dog_pee_hydrant" - An Laterne (wenn Route passend, 5s)                  ║
║ │   │   └─ Heinrich: "Na Waldi, mach schon." (Dialog)                           ║
║ │   ├─ "dog_bark_at_bird" - Bellt Vogel an (2s)                                 ║
║ │   │   └─ Audio: "dog_bark_small.wav" × 3                                      ║
║ │   └─ "dog_wag_tail" - Freut sich (kontinuierlich, Blend)                      ║
║ └─ Reagiert auf andere NPCs: Schnüffelt wenn nah (<2m)                          ║
║                                                                                   ║
║ BEWEGUNGS-PARAMETER (Heinrich):                                                   ║
║ ├─ Animations-State: "walk_elderly_cane"                                         ║
║ ├─ Geschwindigkeit: 0.8 m/s (2.9 km/h)                                          ║
║ ├─ Schritt-Frequenz: 65 Schritte/Minute                                         ║
║ ├─ Stock-Nutzung: Jeder zweite Schritt, rechte Seite                            ║
║ │   └─ Audio: "cane_tap_concrete.wav" (-15dB)                                   ║
║ └─ Körperhaltung: 10° nach vorne geneigt                                        ║
║                                                                                   ║
║ VERHALTENS-SEQUENZ:                                                               ║
║ ├─ 06:00:30 - Tritt aus Haustür                                                 ║
║ │   └─ Hund drängt nach vorne (Leine gespannt)                                  ║
║ │   └─ Heinrich: "Langsam, Waldi, langsam."                                     ║
║ ├─ 06:00:33 - Beginnt Gassigehen                                                ║
║ │   └─ Route: Um den Block (15 Minuten)                                         ║
║ ├─ 06:03:00 - Hund schnüffelt an Laterne                                        ║
║ │   └─ Heinrich bleibt stehen, wartet                                           ║
║ ├─ 06:03:05 - Hund pinkelt                                                      ║
║ │   └─ Animation: "dog_pee_lift_leg" (5s)                                       ║
║ │   └─ Decal auf Boden: "wet_spot" (verblasst nach 30s)                        ║
║ ├─ 06:08:00 - Hund bellt Taube an                                               ║
║ │   └─ Taube fliegt weg (Partikel + Animation)                                  ║
║ │   └─ Heinrich: "Ist ja gut, ist ja gut."                                      ║
║ └─ 06:15:00 - Kehrt nach Hause zurück                                           ║
║     └─ Betritt Haustür, despawnt                                                ║
║                                                                                   ║
╚═══════════════════════════════════════════════════════════════════════════════════╝
```

[NPCs 004-015 folgen gleichem Detail-Level...]

---

## 06:00:00 - BÄCKEREI ÖFFNET

### HYPER-DETAILLIERTE ANIMATIONS-SEQUENZ

```
╔═══════════════════════════════════════════════════════════════════════════════════╗
║ BÄCKEREI "GOLDENE SEMMEL" - ÖFFNUNGS-SEQUENZ                                     ║
╠═══════════════════════════════════════════════════════════════════════════════════╣
║                                                                                   ║
║ GEBÄUDE-DATEN:                                                                    ║
║ ├─ Position: Vector3(52.8, 0.0, 34.5)                                           ║
║ ├─ Rotation: Y-Achse 270° (Eingang nach Westen)                                 ║
║ ├─ Schaufenster-Größe: 3.5m × 2.2m                                              ║
║ ├─ Tür-Typ: Einzelflügel-Glastür, 0.9m × 2.1m                                   ║
║ └─ Innenraum: Sichtbar durch Fenster (LOD_0 im Sichtfeld)                       ║
║                                                                                   ║
║ BELEUCHTUNGS-SEQUENZ:                                                             ║
║ ━━━━━━━━━━━━━━━━━━━━━                                                            ║
║                                                                                   ║
║ ZEITPUNKT 05:59:55.000 (5 Sek vor Öffnung):                                      ║
║ ├─ Innenraum: Dunkel                                                             ║
║ ├─ Schaufenster-Beleuchtung: Aus                                                 ║
║ └─ Nur Notausgang-Schild leuchtet (grün, gedimmt)                               ║
║                                                                                   ║
║ ZEITPUNKT 06:00:00.000:                                                          ║
║ ├─ EVENT TRIGGER: "bakery_opening_sequence"                                      ║
║ └─ NPC "BÄCKER FRANZ" aktiviert (war im Off-Screen)                             ║
║                                                                                   ║
║ ZEITPUNKT 06:00:00.100 - Hinterzimmer-Licht AN:                                  ║
║ ├─ Point-Light "bakery_backroom_light"                                           ║
║ │   ├─ Position: Vector3(52.8, 2.5, 31.0) // Hinterzimmer                       ║
║ │   ├─ Intensity: 0 → 400 lumen (Fade 200ms)                                    ║
║ │   ├─ Color: RGB(255, 244, 230) // Warmweiß                                    ║
║ │   └─ Range: 6m                                                                 ║
║ ├─ Sichtbar: Lichtschein durch Tür-Spalt zum Hinterzimmer                       ║
║ └─ Audio: "light_switch_click.wav" (-25dB, 3D-Position)                         ║
║                                                                                   ║
║ ZEITPUNKT 06:00:00.500 - Hauptraum-Licht AN:                                     ║
║ ├─ 4 × Deckenlampen "bakery_ceiling_light_0X"                                   ║
║ │   ├─ Aktivierung: Sequentiell (0.1s Verzögerung)                              ║
║ │   │   ├─ Light_01: 06:00:00.500                                               ║
║ │   │   ├─ Light_02: 06:00:00.600                                               ║
║ │   │   ├─ Light_03: 06:00:00.700                                               ║
║ │   │   └─ Light_04: 06:00:00.800                                               ║
║ │   ├─ Intensity pro Lampe: 0 → 600 lumen (Fade 150ms)                          ║
║ │   ├─ Kurzes Flackern: Frame 1-3 (50ms) bei 70% Intensity                      ║
║ │   │   └─ (Neonröhren-Effekt)                                                  ║
║ │   └─ Color: RGB(255, 250, 240)                                                 ║
║ ├─ Schaufenster-Auslage: Jetzt beleuchtet sichtbar                              ║
║ │   └─ Spot-Lights auf Gebäck (3 Stück, warm)                                   ║
║ └─ Audio: "fluorescent_buzz_start.wav" (-22dB, 0.3s)                            ║
║                                                                                   ║
║ ZEITPUNKT 06:00:01.000 - Bäcker Franz betritt Hauptraum:                         ║
║ ├─ Start-Position: Hinterzimmer-Tür                                              ║
║ ├─ Animation: "door_push_through_gentle"                                         ║
║ │   ├─ Frame 1-10: Hand greift Türklinke                                        ║
║ │   ├─ Frame 11-20: Drückt Klinke runter                                        ║
║ │   │   └─ Audio: "door_handle_press.wav" bei Frame 15                          ║
║ │   ├─ Frame 21-40: Tür öffnet 0° → 75°                                         ║
║ │   │   └─ Tür-Physik: Hinge-Joint, Damping 0.8                                 ║
║ │   │   └─ Audio: "door_creak_light.wav" bei Frame 25                           ║
║ │   ├─ Frame 41-60: Schritt durch Türrahmen                                     ║
║ │   └─ Frame 61-80: Lässt Tür los (schwingt zu)                                 ║
║ │       └─ Tür: Schwingt auf 15° zurück, pendelt aus                            ║
║ │       └─ Audio: "door_swing_close_soft.wav"                                   ║
║ └─ Gesamt-Dauer: 80 Frames = 1.33s bei 60fps                                    ║
║                                                                                   ║
║ BÄCKER FRANZ - CHARAKTER-DETAILS:                                                 ║
║ ├─ Modell: "male_stocky_50s"                                                     ║
║ ├─ Höhe: 1.75m                                                                   ║
║ ├─ Gewicht: 95kg (kräftig)                                                       ║
║ ├─ Gesicht: Freundlich, Schnurrbart (grau), rote Wangen                         ║
║ ├─ Outfit:                                                                        ║
║ │   ├─ "baker_apron_white" (Mehl-Flecken-Decal: 15%)                            ║
║ │   ├─ "chef_hat_traditional" (leicht schief)                                   ║
║ │   ├─ "shirt_white_rolled_sleeves"                                              ║
║ │   ├─ "trousers_black_work"                                                     ║
║ │   └─ "shoes_safety_kitchen"                                                    ║
║ └─ Hände: Mehl-Textur auf Fingern (Decal)                                       ║
║                                                                                   ║
║ ZEITPUNKT 06:00:02.500 - Franz geht zur Theke:                                   ║
║ ├─ Animation: "walk_casual_content"                                              ║
║ ├─ Geschwindigkeit: 1.1 m/s                                                      ║
║ ├─ Distanz: 4.2m                                                                 ║
║ ├─ Dauer: 3.8s                                                                   ║
║ ├─ Nebenaktion: Wischt Hände an Schürze ab                                      ║
║ │   └─ Animation-Blend: "wipe_hands_apron" (Weight 0.3)                         ║
║ └─ Audio: Footsteps "shoe_rubber_tile.wav" × 6 Schritte                         ║
║                                                                                   ║
║ ZEITPUNKT 06:00:06.300 - Franz hinter Theke:                                     ║
║ ├─ Position: Vector3(53.5, 0.0, 36.2)                                           ║
║ ├─ Animation: "idle_behind_counter"                                              ║
║ │   ├─ Hände auf Theke gestützt                                                 ║
║ │   ├─ Gewicht auf linkes Bein verlagert                                        ║
║ │   └─ Blick: Schaut zur Tür (erwartet Kunden)                                  ║
║ └─ Idle-Variationen (zufällig alle 8-15s):                                      ║
║     ├─ "idle_scratch_chin"                                                       ║
║     ├─ "idle_adjust_hat"                                                         ║
║     ├─ "idle_check_display"                                                      ║
║     └─ "idle_yawn_subtle"                                                        ║
║                                                                                   ║
║ ZEITPUNKT 06:00:07.000 - Franz geht zur Eingangstür:                            ║
║ ├─ Entscheidung: "Zeit zum Öffnen"                                              ║
║ ├─ Animation: "walk_purposeful_short"                                            ║
║ ├─ Distanz: 3.5m zur Tür                                                        ║
║ └─ Dauer: 3.2s                                                                   ║
║                                                                                   ║
║ ZEITPUNKT 06:00:10.200 - Tür wird entriegelt:                                    ║
║ ├─ Animation: "unlock_door_key"                                                  ║
║ │   ├─ Frame 1-15: Greift in Hosentasche                                        ║
║ │   │   └─ Audio: "keys_jingle.wav" bei Frame 10                                ║
║ │   ├─ Frame 16-30: Zieht Schlüsselbund heraus                                  ║
║ │   │   └─ Physik: Schlüssel baumeln (Rope-Sim)                                 ║
║ │   ├─ Frame 31-50: Sucht richtigen Schlüssel                                   ║
║ │   │   └─ Animation: Fingert durch 4 Schlüssel                                 ║
║ │   │   └─ Audio: "keys_sorting.wav"                                            ║
║ │   ├─ Frame 51-70: Führt Schlüssel ins Schloss                                 ║
║ │   │   └─ IK: Hand → Schloss-Position                                          ║
║ │   ├─ Frame 71-85: Dreht Schlüssel (2× Umdrehung)                              ║
║ │   │   └─ Audio: "lock_turn_heavy.wav" × 2                                     ║
║ │   └─ Frame 86-100: Zieht Schlüssel ab, steckt weg                             ║
║ │       └─ Audio: "keys_pocket.wav"                                             ║
║ └─ Gesamt-Dauer: 100 Frames = 1.67s                                             ║
║                                                                                   ║
║ ZEITPUNKT 06:00:12.000 - Tür wird geöffnet:                                      ║
║ ├─ Animation: "door_open_welcoming"                                              ║
║ │   ├─ Frame 1-10: Greift Türgriff                                              ║
║ │   ├─ Frame 11-15: Drückt Griff                                                ║
║ │   │   └─ Audio: "door_handle_commercial.wav"                                  ║
║ │   ├─ Frame 16-45: Zieht Tür auf (0° → 90°)                                    ║
║ │   │   └─ Tür-Physik: Smooth, kein Widerstand                                  ║
║ │   │   └─ Audio: "door_glass_open.wav" (Luftzug-Effekt)                        ║
║ │   ├─ Frame 46-60: Hält Tür offen                                              ║
║ │   │   └─ Franz schaut nach draußen                                            ║
║ │   │   └─ Animation: "look_outside_morning"                                    ║
║ │   ├─ Frame 61-75: Lässt Tür los                                               ║
║ │   │   └─ Tür: Federmechanismus (Closer), schließt langsam                     ║
║ │   └─ Frame 76-100: Tritt in Türrahmen                                         ║
║ │       └─ Animation: "lean_doorframe_casual"                                   ║
║ │       └─ Pose: Rechte Schulter an Rahmen, Arme verschränkt                    ║
║ └─ Tür-State: Schließt automatisch (Closer) auf 0° in 3s                        ║
║                                                                                   ║
║ ZEITPUNKT 06:00:13.670 - Franz steht im Türrahmen:                              ║
║ ├─ Animation: "lean_doorframe_casual"                                            ║
║ ├─ Head-Animation: Schaut links (3s), Mitte (2s), rechts (3s), Mitte           ║
║ │   └─ Sucht nach frühen Kunden                                                 ║
║ ├─ Micro-Expressions:                                                            ║
║ │   ├─ Leichtes Lächeln (Morph: "smile_subtle" 0.3)                             ║
║ │   ├─ Augenbrauen entspannt                                                     ║
║ │   └─ Tiefes Einatmen (Brust-Animation, frische Luft)                          ║
║ └─ Dauer: 10 Sekunden                                                            ║
║                                                                                   ║
║ ZEITPUNKT 06:00:23.670 - Franz geht zurück rein:                                ║
║ ├─ Animation: "turn_and_walk_casual"                                             ║
║ │   └─ Dreht sich 180° (0.8s)                                                   ║
║ │   └─ Geht zur Theke (3.2s)                                                    ║
║ └─ Position: Hinter Theke, wartet auf Kunden                                    ║
║                                                                                   ║
║ ZEITPUNKT 06:00:28.000 - "OFFEN" Schild wird umgedreht:                         ║
║ ├─ Objekt: "sign_open_closed" (hängt an Tür-Innenseite)                         ║
║ ├─ Franz-Animation: "flip_sign"                                                  ║
║ │   ├─ Frame 1-20: Geht zur Tür                                                 ║
║ │   ├─ Frame 21-35: Greift Schild                                               ║
║ │   ├─ Frame 36-50: Dreht Schild um (Y-Rotation 180°)                           ║
║ │   │   └─ Vorher: "GESCHLOSSEN" (rot)                                          ║
║ │   │   └─ Nachher: "GEÖFFNET" (grün)                                           ║
║ │   │   └─ Audio: "sign_flip.wav" (-18dB)                                       ║
║ │   └─ Frame 51-70: Lässt los, geht zurück                                      ║
║ │       └─ Schild: Pendelt leicht (Physik, 2 Schwingungen)                      ║
║ └─ Schild-State: Zeigt "GEÖFFNET" für Rest des Tages                            ║
║                                                                                   ║
║ INNENRAUM-AMBIENTE (ab 06:00:01):                                                ║
║ ├─ Audio-Loop: "bakery_ambience.wav"                                             ║
║ │   ├─ Inhalt: Leises Brummen der Kühltheke, entferntes Radio                   ║
║ │   ├─ Volume: -20dB                                                             ║
║ │   └─ Spatial: 3D, Position Raum-Mitte                                         ║
║ ├─ Radio (aus Hinterzimmer):                                                     ║
║ │   ├─ Track: "austrian_radio_morning_show.wav" (generisch)                     ║
║ │   ├─ Volume: -28dB (kaum hörbar)                                              ║
║ │   ├─ Lowpass: 2000Hz (klingt gedämpft)                                        ║
║ │   └─ Gelegentlich: Musik-Fetzen, Nachrichten-Stimme                           ║
║ └─ Kühltheken-Brummen: "refrigerator_hum.wav" (-25dB, Loop)                     ║
║                                                                                   ║
║ SCHAUFENSTER-AUSLAGE:                                                             ║
║ ├─ Objekte (statisch, aber beleuchtet):                                          ║
║ │   ├─ 12 × Semmeln (Mesh: "bread_roll_austrian")                               ║
║ │   ├─ 8 × Croissants (Mesh: "croissant_golden")                                ║
║ │   ├─ 6 × Brezeln (Mesh: "pretzel_salted")                                     ║
║ │   ├─ 4 × Rosinenschnecken (Mesh: "pastry_raisin_swirl")                       ║
║ │   ├─ 2 × Brotlaibe (Mesh: "bread_loaf_rustic")                                ║
║ │   └─ Preisschilder (Texture: "price_tag_bakery")                              ║
║ ├─ Material: "bread_crust_pbr" (Subsurface Scattering für Realismus)            ║
║ └─ Beleuchtung: 3 Spot-Lights, Color-Temp 3000K (warm)                          ║
║                                                                                   ║
╚═══════════════════════════════════════════════════════════════════════════════════╝
```

---

## 08:00:00.000 - DEMO-VORBEREITUNG BEGINNT

### HYPER-DETAILLIERTE DEMONSTRANTEN-SPAWN-SEQUENZ

```
╔═══════════════════════════════════════════════════════════════════════════════════╗
║ EVENT: "ERSTE DEMONSTRANTEN TREFFEN EIN"                                         ║
║ Trigger-Zeit: 08:00:00.000                                                       ║
║ Dauer: 01:00:00 Spielzeit (60 Sekunden Realzeit)                                ║
║ NPCs: 10 Demonstranten (Demo_001 - Demo_010)                                     ║
╠═══════════════════════════════════════════════════════════════════════════════════╣
║                                                                                   ║
║ ═══════════════════════════════════════════════════════════════════════════════  ║
║ NPC DEMO_001 - "MARTIN SCHNEIDER" (Fahnenträger)                                ║
║ ═══════════════════════════════════════════════════════════════════════════════  ║
║                                                                                   ║
║ SPAWN-ZEITPUNKT: 08:00:00.000 (Frame 0 des Events)                              ║
║                                                                                   ║
║ SPAWN-MECHANIK:                                                                   ║
║ ├─ Spawn-Punkt: U-Bahn Ausgang A (Stephansplatz)                                ║
║ │   └─ Koordinaten: Vector3(-23.5, -4.2, 15.8) // Unter Straßenniveau           ║
║ ├─ Spawn-Animation: "stairs_ascend_subway"                                       ║
║ │   ├─ Start: Unsichtbar (unter Boden)                                          ║
║ │   ├─ Frame 1: Kopf erscheint über Boden-Niveau                                ║
║ │   ├─ Frame 30: Oberkörper sichtbar                                            ║
║ │   ├─ Frame 60: Vollständig sichtbar, letzter Schritt                          ║
║ │   └─ Frame 90: Steht auf Straßen-Niveau                                       ║
║ │       └─ Position: Vector3(-23.5, 0.0, 12.3)                                  ║
║ └─ Dauer: 90 Frames = 1.5s                                                       ║
║                                                                                   ║
║ CHARAKTER-DEFINITION:                                                             ║
║ ├─ Base-Mesh: "male_average_35"                                                  ║
║ ├─ Höhe: 1.79m                                                                   ║
║ ├─ Körperbau: Normal (BMI ~24)                                                   ║
║ ├─ Alter: 35 (Textur-Aging: Minimal)                                            ║
║ ├─ Hautton: RGB(225, 195, 170) // Mitteleuropäisch                              ║
║ ├─ Haare:                                                                         ║
║ │   ├─ Style: "short_neat_parted"                                                ║
║ │   ├─ Farbe: RGB(75, 55, 35) // Dunkelbraun                                    ║
║ │   └─ Physik: Keine (zu kurz)                                                   ║
║ ├─ Gesichtsbehaarung: 3-Tage-Bart (Stubble-Textur: 0.4)                         ║
║ ├─ Augenfarbe: RGB(85, 130, 90) // Grün-Grau                                    ║
║ └─ Gesichtsausdruck-Basis: "determined_hopeful"                                  ║
║     ├─ Brauen: Leicht zusammengezogen (0.2)                                     ║
║     ├─ Augen: Weit offen, fokussiert                                            ║
║     └─ Mund: Neutrale Linie, leicht angespannt                                  ║
║                                                                                   ║
║ OUTFIT-KONFIGURATION:                                                             ║
║ ├─ Kopf: "cap_baseball_germany"                                                  ║
║ │   ├─ Farbe: RGB(20, 20, 20) mit Deutschland-Flagge vorne                      ║
║ │   └─ Worn-State: Leicht abgenutzt (0.3)                                       ║
║ ├─ Oberkörper:                                                                    ║
║ │   ├─ Layer 1: "tshirt_printed"                                                 ║
║ │   │   ├─ Grundfarbe: RGB(240, 240, 240) // Weiß                               ║
║ │   │   └─ Print: "FREIHEIT" in Schwarz (Brust)                                 ║
║ │   └─ Layer 2: "jacket_casual_zip" (offen)                                     ║
║ │       ├─ Farbe: RGB(50, 55, 60) // Dunkelgrau                                 ║
║ │       └─ Reißverschluss: Offen (T-Shirt sichtbar)                             ║
║ ├─ Unterkörper: "jeans_straight"                                                 ║
║ │   ├─ Farbe: RGB(60, 70, 90) // Classic Blue                                   ║
║ │   └─ Wear-State: Normal (0.5)                                                  ║
║ ├─ Schuhe: "sneakers_casual"                                                     ║
║ │   └─ Farbe: RGB(255, 255, 255) // Weiß                                        ║
║ └─ Accessoires:                                                                   ║
║     ├─ "backpack_hiking_small" (auf Rücken)                                      ║
║     │   ├─ Farbe: RGB(60, 80, 40) // Olivgrün                                   ║
║     │   └─ Inhalt-Simulation: Leicht gefüllt (Physik-Weight: 3kg)               ║
║     ├─ "flag_germany_large" (über Schulter/in Hand)                             ║
║     │   ├─ Stange: 1.8m Aluminium                                                ║
║     │   ├─ Flagge: 1.5m × 0.9m                                                   ║
║     │   ├─ Farben: Schwarz-Rot-Gold (korrekte Proportionen)                     ║
║     │   └─ Physik: Cloth-Simulation, Wind-beeinflusst                           ║
║     └─ "sunglasses_aviator" (im Kragen eingehakt, nicht getragen)               ║
║                                                                                   ║
║ FAHNEN-PHYSIK-PARAMETER:                                                          ║
║ ├─ Cloth-Simulation:                                                              ║
║ │   ├─ Vertices: 256 (16×16 Grid)                                               ║
║ │   ├─ Mass: 0.3kg                                                               ║
║ │   ├─ Stiffness: 0.8                                                            ║
║ │   ├─ Damping: 0.1                                                              ║
║ │   └─ Collision: Self + Environment                                             ║
║ ├─ Wind-Einfluss:                                                                 ║
║ │   ├─ Basis-Wind: Vector3(2.0, 0.0, 0.5) m/s (von Westen)                      ║
║ │   ├─ Turbulenz: Perlin-Noise, Frequency 0.5, Amplitude 0.3                    ║
║ │   └─ Update: Jeder Frame                                                       ║
║ └─ Attachment:                                                                    ║
║     ├─ Punkt 1: Stangen-Top (Fixed)                                              ║
║     ├─ Punkt 2: 0.3m unter Top (Fixed)                                          ║
║     └─ Rest: Frei simuliert                                                      ║
║                                                                                   ║
║ VERHALTENS-SEQUENZ (Frame-genau):                                                ║
║ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━                                                 ║
║                                                                                   ║
║ 08:00:00.000 - 08:00:01.500 (Frame 0-90):                                        ║
║ ├─ Aktion: Aus U-Bahn-Schacht steigen                                           ║
║ ├─ Animation: "stairs_ascend_subway"                                             ║
║ ├─ Fahne: Über Schulter gelegt, Stange diagonal nach oben                       ║
║ ├─ Blick: Nach oben (Sonnenlicht)                                               ║
║ │   └─ Squint-Expression: 0.4 (blinzelt ins Licht)                              ║
║ └─ Audio: "footstep_metal_stairs.wav" × 6 Schritte                              ║
║                                                                                   ║
║ 08:00:01.500 - 08:00:02.000 (Frame 90-120):                                      ║
║ ├─ Aktion: Orientierung nach Austritt                                            ║
║ ├─ Animation: "stop_look_around"                                                 ║
║ │   ├─ Frame 90-100: Verlangsamung des Gehens                                   ║
║ │   ├─ Frame 101-105: Stillstand                                                ║
║ │   ├─ Frame 106-112: Kopf dreht links (45°)                                    ║
║ │   │   └─ Sucht: Stephansplatz-Richtung                                        ║
║ │   └─ Frame 113-120: Kopf zurück zur Mitte, Nicken                             ║
║ │       └─ Erkennt: Richtige Richtung                                           ║
║ ├─ Gesichtsausdruck: "recognition_slight_smile"                                  ║
║ │   └─ Mundwinkel heben: 0.3                                                    ║
║ └─ Intern: Ziel-Waypoint gesetzt (Stephansplatz Mitte)                          ║
║                                                                                   ║
║ 08:00:02.000 - 08:00:02.500 (Frame 120-150):                                     ║
║ ├─ Aktion: Fahne von Schulter nehmen                                            ║
║ ├─ Animation: "retrieve_flag_shoulder"                                           ║
║ │   ├─ Frame 120-130: Rechte Hand greift Stange                                 ║
║ │   │   └─ IK-Target: Stangen-Mitte                                             ║
║ │   ├─ Frame 131-140: Hebt Stange von Schulter                                  ║
║ │   │   └─ Schulter-Cloth: Rutscht ab                                           ║
║ │   └─ Frame 141-150: Stange aufrecht neben Körper                              ║
║ │       └─ Flagge: Beginnt zu flattern (Cloth-Sim aktiv)                        ║
║ └─ Audio: "fabric_rustle_heavy.wav" bei Frame 135                               ║
║                                                                                   ║
║ 08:00:02.500 - 08:00:05.000 (Frame 150-300):                                     ║
║ ├─ Aktion: Gehen Richtung Stephansplatz                                          ║
║ ├─ Animation: "walk_purposeful_flag"                                             ║
║ │   ├─ Blend: walk_purposeful (0.7) + hold_flag_upright (0.3)                   ║
║ │   ├─ Geschwindigkeit: 1.4 m/s                                                 ║
║ │   ├─ Stange: Rechte Hand, Ellbogen 90°                                        ║
║ │   └─ Linke Hand: Natürlicher Armschwung                                       ║
║ ├─ Fahnen-Verhalten:                                                              ║
║ │   ├─ Schwankt leicht durch Geh-Bewegung                                       ║
║ │   ├─ Flattert im Wind (Cloth-Sim)                                             ║
║ │   └─ Audio: "flag_flap_wind.wav" (Loop, Volume variiert)                      ║
║ ├─ Pfad:                                                                          ║
║ │   ├─ Von: Vector3(-23.5, 0.0, 12.3)                                           ║
║ │   ├─ Via: Vector3(-15.0, 0.0, 25.0) // Ausweichen Passanten                   ║
║ │   └─ Zu: Vector3(0.0, 0.0, 45.0) // Stephansplatz Eingang                     ║
║ └─ Distanz: ~42m, Dauer: 30s                                                    ║
║                                                                                   ║
║ 08:00:35.000 (Ankunft am Platz):                                                 ║
║ ├─ Position: Vector3(0.0, 0.0, 45.0)                                            ║
║ ├─ Sieht: Bühne im Aufbau, 3 Organisatoren                                      ║
║ ├─ Reaktion: "Ah, hier ist es!"                                                 ║
║ │   └─ Animation: "recognition_nod"                                              ║
║ │   └─ Thought-Bubble (optional): "Gut, bin früh dran."                         ║
║ └─ Neues Ziel: Gehe zur Bühnen-Nähe                                             ║
║                                                                                   ║
║ 08:00:35.000 - 08:00:50.000 (Zum Sammelplatz):                                   ║
║ ├─ Ziel-Position: Vector3(5.0, 0.0, 65.0) // 10m vor Bühne                      ║
║ ├─ Geschwindigkeit: 1.2 m/s (gemächlicher, angekommen)                          ║
║ └─ Ankunft: 08:00:48.000                                                         ║
║                                                                                   ║
║ 08:00:48.000+ (Warten auf andere):                                               ║
║ ├─ Position: Vector3(5.0, 0.0, 65.0)                                            ║
║ ├─ Animation-State: "idle_flag_holder_proud"                                     ║
║ │   ├─ Basis: Stehen, Fahne aufrecht                                            ║
║ │   ├─ Gewicht: Verlagert alle 10s (links/rechts)                               ║
║ │   ├─ Fahne: Gelegentlich höher heben (alle 30s)                               ║
║ │   │   └─ Animation: "flag_raise_proud" (2s)                                   ║
║ │   └─ Blick: Schaut umher, auf Bühne, auf andere Ankömmlinge                   ║
║ ├─ Idle-Variationen (zufällig):                                                  ║
║ │   ├─ "idle_adjust_cap" (alle 60-90s)                                          ║
║ │   ├─ "idle_check_phone_quick" (alle 120s)                                     ║
║ │   │   └─ Steckt Fahne kurz unter Arm                                          ║
║ │   ├─ "idle_wave_at_newcomer" (wenn neuer Demo-NPC nah)                        ║
║ │   └─ "idle_deep_breath" (alle 45s)                                            ║
║ └─ Audio:                                                                         ║
║     ├─ Fahnen-Flattern: Kontinuierlich                                           ║
║     └─ Gelegentliches Summen: Melodie (10% Chance pro Minute)                   ║
║                                                                                   ║
║ INTERAKTIONEN MIT ANDEREN NPCs:                                                   ║
║ ├─ Wenn Demo_002 oder Demo_003 ankommen (08:00:03.000):                         ║
║ │   ├─ Trigger-Distanz: 3m                                                       ║
║ │   ├─ Martin: Dreht Kopf, winkt                                                ║
║ │   │   └─ Animation: "wave_greeting_short"                                     ║
║ │   ├─ Dialog: "Hey! Auch schon da?"                                            ║
║ │   │   └─ Audio: Voice-Line "martin_greeting_01.wav"                           ║
║ │   └─ Wartet auf Reaktion (1.5s)                                               ║
║ ├─ Wenn Polizist sichtbar:                                                       ║
║ │   ├─ Blick: Folgt Polizist kurz (Head-Look)                                   ║
║ │   ├─ Expression: Leichte Anspannung (Brauen: 0.3)                             ║
║ │   └─ Keine Aktion (noch friedlich)                                            ║
║ └─ Wenn Organisator spricht:                                                     ║
║     └─ Dreht Kopf zur Bühne, hört zu                                            ║
║                                                                                   ║
╚═══════════════════════════════════════════════════════════════════════════════════╝
```

[Dokument wird fortgesetzt mit Demo_002 bis Demo_010 im gleichen Detailgrad, dann 10:00 Massen-Zustrom, 11:00 Reden, 12:00 Eskalation etc...]

---

Ich speichere das Dokument und erstelle den Rest...
# 24H HYPER-DETAIL PART 2: ESKALATION & GEWALT

---

## 12:00:00.000 - POLIZEI-ULTIMATUM

### FRAME-GENAUE ESKALATIONS-SEQUENZ

```
╔═══════════════════════════════════════════════════════════════════════════════════╗
║ EVENT: "POLIZEI-ULTIMATUM" - VOLLSTÄNDIGE SEQUENZ                                ║
║ Trigger: 12:00:00.000                                                            ║
║ Eskalations-Level: 0% → 45%                                                      ║
╠═══════════════════════════════════════════════════════════════════════════════════╣

12:00:00.000 - POLIZEI-KOLONNE FORMIERT SICH:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FORMATION-DETAILS:
├─ Anzahl: 15 Polizisten + 1 Oberst
├─ Formation: 3 Reihen à 5 + Oberst vorne-mitte
├─ Startposition: Vector3(-45.0, 0.0, 120.0) // Polizei-Sammelplatz
├─ Zielposition: Vector3(0.0, 0.0, 75.0) // Bühne
├─ Distanz: 65m
├─ Marsch-Geschwindigkeit: 1.3 m/s
└─ Marsch-Dauer: 50 Sekunden

POLIZIST-OUTFIT (ALLE 15):
├─ Helm: "police_riot_helmet_at"
│   ├─ Farbe: RGB(30, 30, 35) // Dunkelgrau
│   ├─ Visier: Hochgeklappt (noch friedlich)
│   ├─ Material: "plastic_matte" + "metal_trim"
│   └─ Reflexion: Minimal (0.1)
├─ Oberkörper: "police_tactical_vest"
│   ├─ Farbe: RGB(25, 35, 55) // Dunkelblau
│   ├─ Patches: "POLIZEI" (Brust + Rücken)
│   │   └─ Farbe: RGB(220, 220, 220) Reflektierend
│   ├─ Ausrüstung angehängt:
│   │   ├─ Funkgerät (linke Schulter)
│   │   ├─ Bodycam (Brust-Mitte)
│   │   └─ Handschellen-Tasche (Gürtel)
│   └─ Schutzklasse: IIIA
├─ Hose: "police_tactical_pants"
│   ├─ Farbe: RGB(25, 35, 55) // Matching
│   └─ Knieschoner: Integriert
├─ Stiefel: "boots_tactical_black"
│   └─ Stahlkappe: Ja
├─ Handschuhe: "gloves_tactical_knuckle"
│   └─ Verstärkte Knöchel
└─ Bewaffnung:
    ├─ Schlagstock: "baton_expandable" (eingeklappt, Gürtel)
    ├─ Pfefferspray: "oc_spray_mk4" (Gürtel)
    └─ Pistole: "glock_17_holstered" (Oberschenkel-Holster)

OBERST MARTIN GRUBER - CHARAKTER:
├─ Rang-Insignien: 3 Sterne (Schulter)
├─ Alter: 52
├─ Größe: 1.85m
├─ Körperbau: Kräftig, militärische Haltung
├─ Gesicht:
│   ├─ Ausdruck: Steinern, keine Emotion
│   ├─ Kiefer: Angespannt
│   ├─ Augen: Kalt, fokussiert
│   └─ Falten: Stirn-Furchen (Anspannung)
├─ Besonderheiten:
│   ├─ Narbe: Linke Augenbraue (2cm)
│   ├─ Grau meliert: Schläfen
│   └─ Schnurrbart: Kurz, gepflegt
└─ Zusatz-Equipment:
    ├─ Megafon in linker Hand
    ├─ Handschuhe: Weiß (Offiziers-Handschuhe)
    └─ Mütze: Schirmmütze statt Helm

MARSCH-ANIMATION DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━

Animation: "march_police_formation"
├─ Schritt-Frequenz: 112 BPM (militärisch)
├─ Schritt-Länge: 0.7m
├─ Arm-Swing: Minimal (diszipliniert)
├─ Kopf: Geradeaus, kein Schwenken
└─ Synchronisation: ±50ms Toleranz

Audio pro Schritt (×16 NPCs):
├─ Sound: "boot_march_concrete.wav"
├─ Volume: -6dB (kombiniert laut)
├─ Timing: Frame-synchron
├─ Variation: ±5% Pitch pro NPC
└─ Effekt: Donnerndes Trampeln

CROWD-REAKTION AUF MARSCH:
├─ Frame 0-60 (erste Sekunde):
│   ├─ 20% NPCs: Drehen Kopf (Animation: "head_turn_alert")
│   └─ Murmeln beginnt: "Was ist das?", "Polizei kommt!"
├─ Frame 60-180 (Sekunde 1-3):
│   ├─ 60% NPCs: Haben Polizei bemerkt
│   ├─ Crowd-Noise: Volume +6dB
│   └─ Einige: Machen Platz (Pathfinding aktiviert)
├─ Frame 180-600 (Sekunde 3-10):
│   ├─ Spalier bildet sich: NPCs weichen 2m zurück
│   ├─ Buh-Rufe beginnen: 5 NPCs initial
│   └─ Schilder werden höher gehalten
└─ Frame 600-3000 (Sekunde 10-50):
    ├─ Polizei durchquert Menge
    ├─ Spannung steigt kontinuierlich
    └─ Eskalations-Level: 0% → 15%

╔═══════════════════════════════════════════════════════════════════════════════════╗
║ 12:00:50.000 - OBERST BETRITT BÜHNE                                              ║
╠═══════════════════════════════════════════════════════════════════════════════════╣

POSITION: Bühnen-Treppe erreicht

TREPPEN-AUFSTIEG (Frame 0-120, 2 Sekunden):
├─ Frame 0-15: Fuß auf erste Stufe
│   └─ Audio: "boot_step_wood.wav"
├─ Frame 16-30: Hochziehen, zweite Stufe
├─ Frame 31-45: Dritte Stufe
├─ Frame 46-60: Vierte Stufe (Podest erreicht)
├─ Frame 61-90: Geht zu Mikrofon (3m)
│   └─ Animation: "walk_authoritative"
└─ Frame 91-120: Stoppt am Mikrofon
    └─ Animation: "stop_plant_feet"

DEMONSTRANT WIRD WEGGESCHOBEN:
├─ NPC: Demo_015 "Klaus" (war am Mikrofon)
├─ Frame 91: Oberst erreicht Klaus
├─ Frame 92-95: Oberst hebt rechte Hand
├─ Frame 96-105: SCHUBSEN
│   ├─ Animation (Oberst): "shove_aside_forceful"
│   │   ├─ Hand trifft Klaus Schulter
│   │   ├─ Kraft-Vektor: Vector3(1.5, 0.0, 0.5) m/s
│   │   └─ Dauer: 0.15s Kontakt
│   ├─ Animation (Klaus): "stumble_shoved"
│   │   ├─ Frame 96-100: Impact, Oberkörper kippt
│   │   ├─ Frame 101-108: Stolpern seitwärts (3 Schritte)
│   │   ├─ Frame 109-115: Fängt sich
│   │   └─ Frame 116-120: Steht, schockiert
│   ├─ Audio:
│   │   ├─ "body_shove_impact.wav" bei Frame 96
│   │   ├─ "grunt_surprised_male.wav" bei Frame 97
│   │   └─ "footstep_stumble.wav" × 3
│   └─ Klaus-Reaktion:
│       ├─ Expression: "shock_angry" (Augen weit, Mund offen)
│       ├─ Ruft: "Hey! Was soll das?!"
│       └─ Bleibt aber zurück (Angst vor Eskalation)
└─ Crowd-Reaktion:
    ├─ Nahe NPCs (10m): "Ohhh!", "Das darf er nicht!"
    ├─ Buh-Rufe: Intensivieren (+30%)
    └─ Eskalations-Level: 15% → 25%

╔═══════════════════════════════════════════════════════════════════════════════════╗
║ 12:00:55.000 - ULTIMATUM WIRD VERKÜNDET                                          ║
╠═══════════════════════════════════════════════════════════════════════════════════╣

MIKROFON-ÜBERNAHME:
├─ Frame 0-30: Oberst greift Mikrofon
│   ├─ Animation: "grab_microphone_authority"
│   └─ Reißt es fast aus Ständer
├─ Frame 31-60: Hebt Megafon zusätzlich
│   └─ Für maximale Lautstärke
└─ Frame 61-90: Wartet auf relative Ruhe
    └─ Animation: "stand_imposing_wait"

AUDIO-SETUP FÜR ANSAGE:
├─ Mikrofon-Kanal:
│   ├─ Input: Voice-Line Dateien
│   ├─ Processing: Compression, Slight Distortion
│   ├─ Output: PA-System (Bühnen-Lautsprecher)
│   └─ Volume: +12dB (sehr laut)
├─ Megafon-Kanal (gleichzeitig):
│   ├─ Processing: Heavy Distortion, Tinny
│   ├─ 3D-Position: Oberst's Hand
│   └─ Volume: +6dB
└─ Combined-Effekt: Überlagerung, hallt über Platz

ANSAGE WORT-FÜR-WORT MIT TIMING:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

12:00:57.000 - "ACHTUNG!"
├─ Duration: 0.6s
├─ Volume: Maximum
├─ Tonlage: Tief, befehlend
├─ Animation: Megafon vor Mund
├─ Crowd: Einige verstummen
└─ Echo: 0.4s Nachhall

12:00:57.800 - "ACHTUNG!"
├─ Duration: 0.6s
├─ Wiederholung für Aufmerksamkeit
├─ Animation: Leicht vorgebeugt
└─ Crowd: 70% jetzt still

12:00:58.600 - [1.4 Sekunden Pause]
├─ Spannung aufbauen
├─ Oberst: Scannt die Menge
│   └─ Head-Animation: Langsam links nach rechts (2s)
├─ Crowd: Fast komplett still
│   └─ Nur vereinzeltes Murmeln
└─ Atmosphäre: Zum Schneiden

12:01:00.000 - "Hiermit wird diese Versammlung..."
├─ Duration: 1.8s
├─ Betonung: "diese Versammlung"
├─ Animation: Zeigefinger erhoben
└─ Crowd: Absolute Stille (Schock beginnt)

12:01:02.000 - [0.8s Pause]
├─ Dramatischer Effekt
└─ Crowd: Halten kollektiv Atem an

12:01:02.800 - "...für BEENDET erklärt!"
├─ Duration: 1.2s
├─ Betonung: "BEENDET" (geschrien)
├─ Animation: Faust auf "BEENDET"
├─ Stimme: Überschlägt sich fast
└─ Crowd: 0.5s Schockstarre...

12:01:04.000 - CROWD-EXPLOSION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Frame 0-30 (0.5s) - SCHOCKSTARRE:
├─ Alle NPCs: Frozen (keine Bewegung)
├─ Gesichter: "shock_disbelief"
│   ├─ Augen: Weit aufgerissen
│   ├─ Münder: Offen
│   └─ Augenbrauen: Hochgezogen
├─ Audio: Totale Stille (0.3s)
└─ Dann: Ein einzelner Ruf "WAS?!"

Frame 31-60 (0.5s) - ERUPTION BEGINNT:
├─ Audio-Tsunami:
│   ├─ Start: -20dB
│   ├─ Ende: +6dB (oorbtäubend)
│   ├─ Inhalt: 200 Stimmen gleichzeitig
│   │   ├─ "NEIN!", "NIEMALS!", "SCHANDE!"
│   │   ├─ "WIR BLEIBEN!", "FREIHEIT!"
│   │   ├─ "Scheiß Bullen!", "Diktatur!"
│   │   └─ Unverständliches Geschrei
│   └─ Layering: 15 verschiedene Voice-Samples
├─ NPC-Animationen (gleichzeitig):
│   ├─ 40%: "shout_angry_fist" (Faust gehoben)
│   ├─ 30%: "shout_angry_both_arms" (Beide Arme)
│   ├─ 20%: "boo_gesture" (Daumen runter)
│   └─ 10%: "shock_hands_head" (Hände am Kopf)
├─ Schilder: Werden aggressiv geschüttelt
│   └─ Animation: "sign_shake_angry"
└─ Eskalations-Level: 25% → 40%

Frame 61-180 (2s) - ERSTE WURFGESCHOSSE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WURF #1: Bierflasche von NPC Demo_047
├─ Trigger-Frame: 75
├─ Werfer-Position: Vector3(15.2, 0.0, 85.0)
├─ Ziel-Richtung: Bühne/Oberst
├─ Animation: "throw_overhand_bottle"
│   ├─ Frame 75-80: Wind-up (Ausholen)
│   │   └─ Flasche hinter Kopf
│   ├─ Frame 81-85: Release
│   │   └─ Flasche verlässt Hand
│   │   └─ Audio: "whoosh_throw.wav"
│   └─ Frame 86-90: Follow-through
│       └─ Arm schwingt durch
├─ Flaschen-Physik:
│   ├─ Masse: 0.35kg (leer) + 0.15kg (Rest-Bier)
│   ├─ Initial-Velocity: Vector3(-8.0, 6.0, -12.0) m/s
│   ├─ Trajectory: Parabolic
│   ├─ Drag: 0.1
│   └─ Flugzeit: 1.8s
├─ Impact-Frame: 183 (bei 60fps)
│   ├─ Impact-Position: Vector3(2.5, 1.0, 68.0) // Neben Bühne
│   ├─ Trifft: Boden (verfehlt Oberst)
│   ├─ Glas-Zerbrechen:
│   │   ├─ Partikel-System: "glass_shatter"
│   │   ├─ Partikel-Anzahl: 45
│   │   ├─ Partikel-Größe: 0.5-3cm
│   │   ├─ Spread-Radius: 1.5m
│   │   ├─ Velocity: Radial, 2-5 m/s
│   │   └─ Lifetime: 0.5s (dann static decal)
│   ├─ Bier-Spritzer:
│   │   ├─ Partikel-System: "liquid_splash_beer"
│   │   ├─ Partikel-Anzahl: 120
│   │   ├─ Farbe: RGB(200, 160, 50) // Bier-Gelb
│   │   └─ Wet-Decal: 0.8m Radius
│   └─ Audio:
│       ├─ "glass_bottle_shatter.wav" (-3dB)
│       ├─ "liquid_splash.wav" (-8dB)
│       └─ Position: Impact-Point (3D)
└─ Reaktionen:
    ├─ Oberst: Zuckt zusammen (Animation: "flinch_near_miss")
    ├─ Nahe Polizisten: Heben Arme schützend
    └─ Crowd: Jubel von Radikalen, Erschrecken von Moderaten

WURF #2: Bierdose von NPC Demo_089
├─ Trigger-Frame: 95 (+0.33s nach Wurf #1)
├─ Werfer-Position: Vector3(-8.5, 0.0, 92.0)
├─ Animation: "throw_overhand_can"
├─ Dosen-Physik:
│   ├─ Masse: 0.45kg (voll)
│   ├─ Initial-Velocity: Vector3(5.0, 7.0, -15.0) m/s
│   └─ Flugzeit: 2.1s
├─ Impact-Frame: 221
│   ├─ TREFFER: Polizist_007 (Helm)
│   ├─ Impact-Position: Helm-Seite
│   ├─ Audio: "metal_impact_helmet.wav" (KLONK!)
│   ├─ Dosen-Verhalten: Platzt auf
│   │   ├─ Bier-Spray: 80 Partikel
│   │   └─ Dose: Fällt zu Boden, verbeult
│   └─ Polizist_007-Reaktion:
│       ├─ Animation: "head_snap_impact"
│       ├─ Kopf: Ruckt seitlich (15°)
│       ├─ Taumeln: 1 Schritt seitwärts
│       ├─ Schaden: 5 HP (Helm schützt)
│       └─ Status: Nass (Bier-Shader auf Uniform)
└─ Eskalations-Level: 40% → 45%

WURF #3-8: Weitere Objekte (schnelle Folge)
├─ Frame 100-180: 6 weitere Würfe
│   ├─ 3× Plastikflaschen (weniger Schaden)
│   ├─ 2× Pappbecher (symbolisch)
│   └─ 1× Schild (wie Frisbee)
├─ Treffer-Rate: 30%
├─ Schaden: Minimal (0-3 HP)
└─ Effekt: Eskalation, aber noch kontrollierbar

╔═══════════════════════════════════════════════════════════════════════════════════╗
║ 12:01:10.000 - OBERST SETZT ANSAGE FORT                                          ║
╠═══════════════════════════════════════════════════════════════════════════════════╣

12:01:10.000 - "RUHE! RUHE!"
├─ Oberst: Schreit ins Megafon
├─ Animation: "shout_commanding"
├─ Wirkung: Minimal (Crowd ignoriert)
└─ Er versucht es trotzdem weiter:

12:01:12.000 - "Sie haben FÜNFZEHN MINUTEN..."
├─ Duration: 1.5s
├─ Stimme: Angestrengt (muss schreien)
├─ Animation: Zeigt "15" mit Fingern
└─ Crowd: Leiser werdendes Gebrüll (hören hin)

12:01:14.000 - "...um diesen Platz FRIEDLICH zu verlassen!"
├─ Duration: 2.0s
├─ Betonung: "FRIEDLICH" (sarkastisch fast)
├─ Animation: Zeigt auf Ausgänge
└─ Crowd: Buh-Rufe verstärken sich wieder

12:01:16.500 - "Bei NICHTEINHALTUNG..."
├─ Duration: 1.0s
├─ Pause: Dramatisch
└─ Crowd: "Was dann?!", "Trau dich!"

12:01:18.000 - "...wird diese Versammlung mit GEWALT aufgelöst!"
├─ Duration: 2.0s
├─ Betonung: "GEWALT" (gedehnt, drohend)
├─ Animation: Faust ballt sich
├─ Gesicht: Zeigt kurz Wut
└─ Crowd: EXPLOSION #2
    ├─ Noch lauter als zuvor
    ├─ "VERSUCHT ES DOCH!", "FASCHISTEN!"
    └─ Mehr Objekte fliegen

12:01:20.500 - "Dies ist Ihre EINZIGE Warnung!"
├─ Duration: 1.5s
├─ Animation: Drohend Zeigefinger
└─ Crowd: Pfiffe, Buh-Rufe

12:01:22.500 - "Die Uhr läuft... JETZT!"
├─ Duration: 1.2s
├─ Animation: Schaut demonstrativ auf Armbanduhr
├─ Tippt auf Uhr
└─ Timer startet: 15:00 Minuten (Countdown für Spieler sichtbar)

12:01:24.000 - Oberst dreht sich um, verlässt Bühne
├─ Animation: "turn_leave_contempt"
├─ Keine weitere Kommunikation
├─ Polizei-Kolonne: Formiert sich neu am Bühnen-Rand
└─ Warten auf Ablauf des Ultimatums

COUNTDOWN-TIMER UI:
├─ Position: Bildschirm oben-mitte
├─ Format: "ULTIMATUM: 14:59" (rot blinkend)
├─ Font: Bold, 24px
├─ Farbe: RGB(255, 50, 50)
├─ Animation: Pulsiert (alle 1s)
└─ Audio: Tick-Tock (optional, dezent)

╚═══════════════════════════════════════════════════════════════════════════════════╝
```

---

## 12:15:00.000 - ERSTE MASSIVE GEWALT

### KAMPF-SEQUENZEN IM DETAIL

```
╔═══════════════════════════════════════════════════════════════════════════════════╗
║ EVENT: "SPUCK-VORFALL & KETTENREAKTION"                                          ║
║ Trigger: 12:15:00.000 (Ultimatum abgelaufen, niemand ging)                       ║
║ Eskalations-Level: 45% → 70%                                                     ║
╠═══════════════════════════════════════════════════════════════════════════════════╣

SITUATION:
├─ 20 aggressive Demonstranten: Haben Polizei-Linie erreicht
├─ Abstand: 0.5-1.0m (Nahkampf-Distanz)
├─ Atmosphäre: Extrem angespannt
├─ Beide Seiten: Bereit zum Explodieren
└─ Es braucht nur einen Funken...

12:15:27.000 - DER SPUCK-VORFALL (Frame-genau):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TÄTER: NPC Demo_047 "KEVIN MAIER"
├─ Position: Vector3(5.2, 0.0, 78.5)
├─ Zustand: Extrem wütend (Aggression: 95/100)
├─ Vorgeschichte: Wurde früher von Polizei verprügelt
├─ Trigger: Sieht Polizist_007 direkt vor sich
└─ Impulsive Entscheidung: Spucken

OPFER: Polizist_007 "MARKUS HOFER"
├─ Position: Vector3(5.0, 0.0, 77.0) // 1.5m vor Kevin
├─ Zustand: Angespannt, aber professionell
├─ Visier: OBEN (fataler Fehler)
└─ Ungeschütztes Gesicht

SPUCK-SEQUENZ (Frame 0-90, 1.5 Sekunden):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Frame 0-10 (0-166ms) - VORBEREITUNG:
├─ Kevin: Animation "prepare_spit"
│   ├─ Kopf zieht leicht zurück
│   ├─ Mund öffnet sich
│   ├─ Zunge: Position zum Sammeln
│   └─ Gesicht: Wut-Expression maximal
├─ Polizist: Bemerkt nichts (schaut woanders)
└─ Audio: Keiner (zu schnell)

Frame 11-20 (166-333ms) - SPUCKEN:
├─ Kevin: Animation "spit_forceful"
│   ├─ Kopf schnappt vor
│   ├─ Mund: Explosives Ausstoßen
│   ├─ Lippen: Gespitzt für Richtung
│   └─ Audio: "spit_sound.wav" (-15dB)
├─ Speichel-Partikel:
│   ├─ System: "projectile_spit"
│   ├─ Partikel-Anzahl: 1 Hauptklumpen + 5 Tröpfchen
│   ├─ Masse Hauptpartikel: 3g
│   ├─ Initial-Velocity: Vector3(0.0, 0.5, -5.0) m/s
│   ├─ Trajectory: Leicht ballistic
│   └─ Flugzeit: 0.3s (1.5m Distanz)
└─ Polizist: Noch unwissend

Frame 21-38 (333-633ms) - FLUGPHASE:
├─ Speichel fliegt durch Luft
├─ Partikel-Animation: Leichte Deformation (Luftwiderstand)
├─ Zeitlupe-Option: Für dramatischen Effekt (Spieler-Camera)
└─ Polizist: Dreht gerade Kopf in Kevin's Richtung

Frame 39-45 (633-750ms) - IMPACT:
├─ Treffer-Position: Polizist_007 linke Wange + Visier-Unterseite
├─ Impact-Animation (Speichel):
│   ├─ Partikel "explodiert" bei Kontakt
│   ├─ Spritzer-Decal auf Gesicht: "spit_splatter.png"
│   │   ├─ Position: UV-Koordinaten (0.3, 0.6) auf Face-Texture
│   │   ├─ Größe: 3cm × 2cm
│   │   └─ Farbe: RGB(200, 200, 180) semi-transparent
│   ├─ Tropfen auf Visier: "liquid_drip" Partikel
│   └─ Ein Teil läuft Wange runter (Animation)
├─ Audio: "wet_splat_face.wav" (-10dB)
└─ Polizist_007 - SOFORTIGE REAKTION:

Frame 46-60 (750ms-1s) - SCHOCK & WUT:
├─ Animation: "face_hit_reaction_spit"
│   ├─ Kopf: Zuckt zurück (5cm)
│   ├─ Augen: Schließen reflexartig
│   ├─ Mund: Öffnet sich (Ekel + Wut)
│   └─ Schultern: Ziehen hoch
├─ Gesicht-Expression: "disgust_rage"
│   ├─ Nasaolabialfalten: Maximum
│   ├─ Zähne: Gefletscht
│   └─ Augenbrauen: Zusammengezogen
├─ Audio:
│   ├─ Polizist: "grunts/grunt_disgusted.wav"
│   └─ Polizist (verbal): "Du DRECKIGER...!"
└─ Intern: Aggression: 40 → 100 (SNAP!)

Frame 61-75 (1s-1.25s) - RAGE TAKEOVER:
├─ Animation: "rage_snap_prepare_strike"
│   ├─ Frame 61-65: Greift Schlagstock
│   │   └─ Animation: "draw_baton_fast"
│   │   └─ Audio: "baton_extend_snap.wav" (Teleskop-Geräusch)
│   ├─ Frame 66-70: Baton voll ausgefahren (50cm → 65cm)
│   ├─ Frame 71-75: Holt aus
│   │   └─ Schlagstock über Kopf
│   │   └─ Audio: "whoosh_windup.wav"
│   └─ Körper: Dreht in Schlag-Position
├─ Gesicht: Pure Wut
│   └─ Screaming-Expression
├─ Schrei: "AAAAARGH!"
│   └─ Audio: "shout_rage_male.wav" (+3dB)
└─ Kevin: Realisiert Fehler (zu spät)
    └─ Animation: "fear_realization"
    └─ Augen weiten sich

Frame 76-90 (1.25s-1.5s) - DER SCHLAG:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SCHLAG-MECHANIK:
├─ Typ: Overhead-Strike (von oben)
├─ Animation: "baton_strike_overhead_full"
├─ Waffe: Teleskop-Schlagstock
│   ├─ Länge: 65cm
│   ├─ Material: Stahl, gummierter Griff
│   └─ Gewicht: 450g
├─ Geschwindigkeit: 15 m/s bei Impact
├─ Kraft-Berechnung:
│   ├─ F = m × a
│   ├─ Effektive Masse: ~2kg (Arm + Waffe)
│   ├─ Beschleunigung: ~75 m/s²
│   └─ Impact-Kraft: ~150 N
└─ Damage-Calc: Base 25 + Overhead-Bonus 10 = 35 HP

TREFFER-ZONE: Kevin's linke Schulter/Oberarm
├─ Hitbox: "shoulder_left" Collider
├─ Armor: Keine (T-Shirt)
├─ Damage-Multiplier: 1.0
└─ Final Damage: 35 HP (von 100 HP → 65 HP)

IMPACT-EFFEKTE:
├─ Animation (Kevin): "hit_reaction_shoulder_heavy"
│   ├─ Frame 76-78: Impact-Moment
│   │   └─ Schulter: Knickt ein
│   │   └─ Oberkörper: Kippt nach rechts (25°)
│   ├─ Frame 79-82: Schmerzwelle
│   │   └─ Gesicht: "pain_extreme"
│   │   └─ Mund: Weit offen
│   │   └─ Augen: Zusammengekniffen
│   ├─ Frame 83-88: Taumeln
│   │   └─ Animation: "stumble_back_hit"
│   │   └─ 2-3 Schritte rückwärts
│   └─ Frame 89-90: Greift sich Schulter
│       └─ Animation: "clutch_injury_shoulder"
├─ Audio:
│   ├─ "baton_hit_flesh.wav" bei Frame 76 (-3dB)
│   │   └─ Sound: Dumpf, fleischig, Knochen-Vibration
│   ├─ "scream_pain_male_01.wav" bei Frame 77 (+6dB)
│   │   └─ Sound: "AAAAAAH!"
│   └─ "stumble_footsteps.wav" × 3
├─ Partikel: Keine Blut-Partikel (Kleidung, kein Cut)
└─ Cloth-Deformation: T-Shirt verformt sich bei Impact

KEVIN'S STATUS NACH SCHLAG:
├─ HP: 65/100
├─ Status: "Stunned" (3s)
├─ Arm: "Weakened" (-50% Kraft, 60s)
├─ Aggression: 95 → 60 (Angst dämpft Wut)
├─ Behavior: Rückzug, schützt sich
└─ Dialog: "SCHEISSE! Der hat mich erwischt!"

╔═══════════════════════════════════════════════════════════════════════════════════╗
║ 12:15:28.500 - KETTENREAKTION BEGINNT                                            ║
╠═══════════════════════════════════════════════════════════════════════════════════╣

5 NPCs GREIFEN POLIZIST_007 AN:
├─ Attacker: Demo_048, Demo_052, Demo_055, Demo_061, Demo_063
├─ Trigger: Sahen den Schlag, reagieren solidarisch
├─ Distanz: Alle innerhalb 3m
└─ Angriffs-Timing: Gestaffelt über 0.8s

ANGRIFF #1: Demo_048 "STEFAN" (Frame 0-30)
├─ Waffe: Faustschlag
├─ Ziel: Polizist_007 Hinterkopf/Nacken
├─ Animation: "punch_sucker_from_behind"
├─ Damage: 12 HP (Helm dämpft)
├─ Reaktion Polizist: Taumelt vorwärts
└─ Audio: "punch_helmet_back.wav"

ANGRIFF #2: Demo_052 "ANDREAS" (Frame 15-45)
├─ Waffe: Schlag mit Schild-Stange
├─ Ziel: Polizist_007 Rücken
├─ Animation: "swing_pole_horizontal"
├─ Damage: 18 HP
├─ Reaktion: Stöhnen, kämpft weiter
└─ Audio: "pole_hit_vest.wav"

ANGRIFF #3: Demo_055 "TOBIAS" (Frame 25-55)
├─ Waffe: Tritt
├─ Ziel: Polizist_007 Knie (seitlich)
├─ Animation: "kick_side_knee"
├─ Damage: 15 HP
├─ Reaktion: Knie knickt ein
└─ Audio: "kick_leg_armor.wav"

ANGRIFF #4 & #5: Demo_061 + Demo_063 (Frame 35-65)
├─ Koordiniert: Greifen Arme
├─ Ziel: Schlagstock entreißen
├─ Animation: "grab_weapon_two_person"
├─ Erfolg: Nein (Polizist hält fest)
├─ Effekt: Polizist immobilisiert
└─ Audio: Grunzen, Zerren

POLIZIST_007 STATUS:
├─ HP: 100 → 55 (in 1 Sekunde!)
├─ Status: Surrounded, Fighting
├─ Schlägt wild um sich
├─ Animation: "fight_surrounded_desperate"
└─ Ruft: "HILFE! MANN DOWN!"

POLIZEI-REAKTION (Frame 70+):
├─ Polizist_006 und _008 springen ein
├─ Schlagstock-Einsatz auf Angreifer
├─ Innerhalb 2 Sekunden: 5 Demonstranten getroffen
├─ Damage verteilt: 20-30 HP pro Treffer
└─ 2 Demonstranten fallen (Ragdoll aktiviert)

MASSEN-SCHLÄGEREI BEGINNT:
├─ Frame 120+: Beide Seiten eskalieren
├─ 30 Demonstranten vs 20 Polizisten aktiv im Kampf
├─ Rest: Fliehen oder beobachten
└─ Eskalations-Level: 70%

╚═══════════════════════════════════════════════════════════════════════════════════╝
```

---

## 12:30:00.000 - HUNDERTSCHAFT EINTREFFEN

```
RIOT VAN ANKUNFT - PRÄZISE CHOREOGRAFIE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

12:30:00.000 - Sirenen in der Ferne
├─ Audio: "siren_european_police.wav"
│   ├─ Start: -30dB (entfernt)
│   ├─ Doppler: Aktiviert (Pitch steigt)
│   └─ 3D-Position: Vector3(-300, 0, 50)
├─ Crowd: Einige drehen Köpfe
└─ Kampf: Pausiert nicht

12:30:05.000 - 5 Riot-Vans erscheinen
├─ Fahrzeug-Modell: "mercedes_sprinter_riot"
│   ├─ Farbe: Blau-Weiß, Reflektoren
│   ├─ Ausstattung: Gitter vor Fenstern
│   └─ Aufschrift: "POLIZEI WIEN"
├─ Formation: Konvoi, 10m Abstand
├─ Geschwindigkeit: 40 km/h → 0 (bremsen)
├─ Bremsweg: 15m
├─ Reifen-Audio: "tire_screech_stop.wav"
└─ Stopp-Position: Vector3(-50, 0, 100)

12:30:12.000 - TÜREN ÖFFNEN SICH (Synchron)
├─ Animation: Alle Türen gleichzeitig
├─ Audio: "van_door_slide_open.wav" × 10
├─ Dramatische Pause: 0.5s
└─ Dann: AUSSTIEG

12:30:13.000 - 100 RIOT-POLIZISTEN STEIGEN AUS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

AUSSTIEGS-CHOREOGRAFIE:
├─ Animation: "tactical_exit_riot_van"
│   ├─ Nicht gehen - SPRINGEN
│   ├─ Landen auf beiden Füßen
│   ├─ Sofort Formation
│   └─ Dauer: 0.5s pro NPC
├─ 20 NPCs pro Van
├─ Ausstieg-Rate: 4 NPCs/Sekunde pro Van
├─ Gesamt-Ausstieg: 5 Sekunden
└─ Audio: "boots_land_concrete.wav" × 100 (gestaffelt)

FORMATION NACH AUSSTIEG:
├─ 10 Reihen × 10 Mann
├─ Reihen-Abstand: 1.5m
├─ Seitlicher Abstand: 1.2m
├─ Gesamt-Front: 12m breit
├─ Gesamt-Tiefe: 15m
└─ Aussehen: SCHWARZE WAND

12:30:20.000 - SCHILD-SCHLAGEN RITUAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Kommando (Funk): "RHYTHMUS!"

Frame 0 - ERSTER SCHLAG:
├─ Animation: "baton_hit_shield_sync"
│   ├─ 100 NPCs gleichzeitig
│   ├─ Schlagstock: Trifft Schild-Innenseite
│   └─ Timing: ±16ms Toleranz (1 Frame)
├─ Audio: "shield_drum_massive.wav"
│   ├─ Volume: +12dB (EXTREM LAUT)
│   ├─ Bass: 60Hz dominant
│   ├─ Echo: 0.5s Nachhall
│   └─ Effekt: Erschütternd
└─ Crowd-Reaktion: Zucken zusammen

Rhythmus-Loop (30 Sekunden):
├─ BPM: 60 (1 Schlag/Sekunde)
├─ Schläge: 30 total
├─ Mit Fuß-Stampfen ab Schlag 5
│   └─ Audio: "boot_stomp_sync.wav" dazwischen
├─ Pattern: BOOM - stomp - BOOM - stomp
└─ Effekt: Hypnotisch, einschüchternd

CROWD-REAKTION:
├─ Moderate Demonstranten: 50% beginnen zu fliehen
│   └─ Animation: "flee_panic"
│   └─ Pfad: Zu Ausgängen
├─ Familien: 100% fliehen
│   └─ "Kinder, kommt! SCHNELL!"
├─ Radikale: Bleiben stehen, rufen Parolen
│   └─ "WIR HABEN KEINE ANGST!"
└─ Eskalations-Level: 75%

12:30:55.000 - LETZTE WARNUNG
├─ Megafon (Einsatzleiter): "LETZTE WARNUNG!"
├─ "30 SEKUNDEN! DANN RÄUMUNG!"
├─ Crowd: Teils Flucht, teils Defiance
└─ Countdown beginnt (für Spieler sichtbar)
```

---

## 13:00:00.000 - WASSERWERFER-EINSATZ

```
WASSERWERFER-AKTIVIERUNG:
━━━━━━━━━━━━━━━━━━━━━━━━━

FAHRZEUG: "WAWE_10000" (Wasserwerfer 10.000L)
├─ Modell: Speziell gepanzertes Fahrzeug
├─ Farbe: Weiß mit Blau, "POLIZEI"
├─ Wassertank: 10.000 Liter
├─ Turm: Rotierbar, 180°
├─ Reichweite: 60m maximal
├─ Druck: 8-20 Bar (einstellbar)
└─ Position: Vector3(0, 0, 50)

13:00:00.000 - Turm rotiert
├─ Animation: Turm dreht Richtung Crowd
├─ Geschwindigkeit: 15°/Sekunde
├─ Audio: "turret_rotate_hydraulic.wav"
├─ Laser-Pointer: Roter Punkt schweift über Crowd
└─ Crowd: Nervosität steigt

13:00:05.000 - WASSER SCHIESST LOS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STRAHL-PARAMETER:
├─ Druck: 15 Bar (Standard-Einsatz)
├─ Durchfluss: 1.200 L/Minute
├─ Strahl-Durchmesser: 5cm am Austritt, 15cm bei 30m
├─ Geschwindigkeit: 35 m/s bei Austritt
├─ Partikel-System: "water_cannon_stream"
│   ├─ Haupt-Strahl: 500 Partikel
│   ├─ Spray-Nebel: 2000 Partikel (um Strahl)
│   ├─ Tropfen: 500 Partikel (Abpraller)
│   └─ Rendering: Screenspace-Refraction
├─ Audio:
│   ├─ "water_cannon_fire.wav" (kontinuierlich)
│   ├─ Volume: +15dB (donnerndes Rauschen)
│   └─ Doppler: Bei Schwenk

ERSTER TREFFER: Demo_023 "ANNA"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Frame 0: Strahl erreicht Anna
├─ Position: Vector3(8.5, 0, 75.0)
├─ Treffer-Zone: Brust/Schulter
└─ Distanz vom Werfer: 25m

Frame 1-10: IMPACT
├─ Kraft-Berechnung:
│   ├─ Wassermasse/Sekunde: 20 kg
│   ├─ Geschwindigkeit: 30 m/s (bei 25m)
│   ├─ Impuls: 600 N (kontinuierlich)
│   └─ Vergleich: Wie von Person geschubst
├─ Physik-Reaktion:
│   ├─ Knockback-Vektor: Strahl-Richtung
│   ├─ Knockback-Kraft: 800 N
│   ├─ Anna (60kg): Beschleunigung 13 m/s²
│   └─ Effekt: Hebt von Füßen ab

Frame 11-30: FLUG
├─ Animation: "water_knockback_airborne"
│   ├─ Arme: Nach vorne geworfen
│   ├─ Beine: Verlieren Boden
│   ├─ Körper: Rückwärts geneigt 45°
│   └─ Haare/Kleidung: Durchnässt, flattern
├─ Flugbahn:
│   ├─ Horizontale Distanz: 5m
│   ├─ Vertikale Höhe: 0.5m (kurz in Luft)
│   └─ Flugzeit: 0.5s
├─ Wasser: Spritzt in alle Richtungen
│   └─ Partikel: 1000 um Impact-Punkt

Frame 31-50: LANDUNG
├─ Animation: "fall_back_wet"
│   ├─ Frame 31-40: Aufprall Rücken
│   │   └─ Ragdoll: Partial-Activation
│   │   └─ Impact-Sound: "body_fall_wet_ground.wav"
│   ├─ Frame 41-50: Rutscht 1m weiter
│   │   └─ Nasser Boden = weniger Friction
│   └─ End-Position: Liegt auf Rücken
├─ Schaden: 10 HP (Aufprall) + 5 HP (Wasser-Druck)
├─ Status: "Prone", "Soaked", "Stunned"
└─ Audio: "gasp_winded_female.wav"

WASSERSTRAHL SCHWENKT (Frame 60+):
├─ Turm rotiert: 2°/Frame (120°/Sekunde)
├─ Strahl "mäht" durch Menschenmenge
├─ Treffer-Rate: 3 NPCs/Sekunde
├─ Effekte pro Treffer:
│   ├─ Knockback 2-5m (je nach Winkel)
│   ├─ Durchnässt-Shader aktiviert
│   └─ Schaden: 5-15 HP
└─ Boden: Wird komplett nass
    ├─ Wet-Decals: Überall
    ├─ Reflexionen: Aktiviert
    └─ NPCs: Können ausrutschen

1 MINUTE WASSERWERFER-EINSATZ:
├─ Getroffene NPCs: 50+
├─ Auf Boden liegend: 30
├─ Geflohen: 40
├─ Eskalations-Level: 80%
└─ Platz-Zustand: Überflutet, chaotisch
```

---

## 13:30:00.000 - TRÄNENGAS

```
TRÄNENGAS-EINSATZ:
━━━━━━━━━━━━━━━━━━

GRANATEN-TYP: CS-Gas (2-Chlorbenzylidenmalodinitril)
├─ Modell: "cs_grenade_police"
├─ Größe: 15cm × 5cm Zylinder
├─ Farbe: Olivgrün mit "CS" Beschriftung
├─ Zündung: 2 Sekunden Verzögerung
├─ Wirkradius: 10m (dichte Wolke)
└─ Wirkdauer: 60 Sekunden pro Granate

WURF-SEQUENZ (10 Polizisten, gleichzeitig):
├─ Animation: "throw_grenade_underhand"
├─ Timing: 13:30:00.000 ± 200ms
├─ Ziele: Verteilt über Demonstranten-Masse
└─ Flugzeit: 1.5s pro Granate

GRANATEN-POSITIONEN NACH LANDUNG:
├─ Granate_01: Vector3(-5, 0, 80)
├─ Granate_02: Vector3(5, 0, 82)
├─ Granate_03: Vector3(-10, 0, 78)
├─ Granate_04: Vector3(10, 0, 78)
├─ Granate_05: Vector3(0, 0, 85)
├─ Granate_06: Vector3(-8, 0, 88)
├─ Granate_07: Vector3(8, 0, 90)
├─ Granate_08: Vector3(-3, 0, 75)
├─ Granate_09: Vector3(3, 0, 92)
└─ Granate_10: Vector3(0, 0, 95)

13:30:03.000 - GRANATEN DETONIEREN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DETONATION PRO GRANATE:
├─ Sound: "gas_grenade_pop.wav" (nicht laut, aber deutlich)
├─ Initiale Rauch-Emission:
│   ├─ Partikel: 500 initial, 200/Sekunde danach
│   ├─ Farbe: RGB(220, 220, 200) → RGB(180, 180, 160)
│   ├─ Größe: 0.1m → 0.5m (expansion)
│   ├─ Velocity: Radial aufsteigend, 2 m/s
│   └─ Opacity: 0.8 → 0.3 über Lifetime
├─ Wolken-Wachstum:
│   ├─ 0s: 1m Radius
│   ├─ 5s: 5m Radius
│   ├─ 10s: 8m Radius
│   └─ 20s: 10m Radius (Maximum)
└─ Wind-Einfluss:
    ├─ Drift: Wind-Richtung × 0.5
    └─ Wolken verschieben sich langsam

GAS-EFFEKT AUF NPCs:
━━━━━━━━━━━━━━━━━━━

DETEKTION:
├─ Collision-Sphere pro Wolke (wächst)
├─ NPC betritt Sphäre → Effekt startet
└─ Intensität: Abstand-basiert (Mitte = 100%)

REAKTION NACH EXPOSITIONS-ZEIT:

0-3 SEKUNDEN (Leicht):
├─ Animation: "gas_cough_initial"
│   ├─ Leichtes Husten
│   ├─ Hand vor Mund
│   └─ Augen tränen (Partikel)
├─ Audio: "cough_light.wav"
├─ Bewegung: Verlangsamt (70% Speed)
└─ Schaden: 2 HP/Sek

3-10 SEKUNDEN (Mittel):
├─ Animation: "gas_reaction_medium"
│   ├─ Starkes Husten
│   ├─ Augen zukneifen
│   ├─ Desorientiert
│   └─ Taumelnder Gang
├─ Audio: "cough_heavy_continuous.wav"
├─ Bewegung: Stark verlangsamt (40% Speed)
├─ Pathfinding: Zufalls-Richtung (blind)
├─ Vision-Effekt (Spieler-Sicht): Blur, Tränen-Overlay
└─ Schaden: 5 HP/Sek

10-30 SEKUNDEN (Schwer):
├─ Animation: "gas_collapse_crawl"
│   ├─ Fällt auf Knie
│   ├─ Würgen
│   ├─ Krabbelt am Boden
│   └─ Sucht Ausgang (oder Aufgabe)
├─ Audio: "choking_severe.wav", "gasp_breath.wav"
├─ Bewegung: Kriechend (0.5 m/s)
├─ Status: "Incapacitated"
├─ Schaden: 8 HP/Sek
└─ Bei 0 HP: Bewusstlos (nicht tot)

MASSEN-PANIK (13:30:15.000+):
├─ 80 NPCs versuchen gleichzeitig zu fliehen
├─ Ausgänge: Nur 3 breit genug
├─ Engstelle-Szenario:
│   ├─ 30 NPCs durch 3m breiten Ausgang
│   ├─ Collision-Detection: NPCs stoßen zusammen
│   ├─ Trampling-System aktiviert:
│   │   ├─ Wer fällt: 10 HP Schaden
│   │   ├─ Wer drüberläuft: 5 HP pro Person
│   │   └─ Animation: "trampled_ground"
│   └─ 5 NPCs werden getrampelt
└─ Eskalations-Level: 85%
```

---

## 19:00:00.000 - MOB-ANGRIFF

```
SCHWARZER BLOC GREIFT AN:
━━━━━━━━━━━━━━━━━━━━━━━━━

FORMATION: 50 Extremisten in Keil
├─ Spitze: 2 NPCs (Schild-Träger)
├─ Zweite Reihe: 5 NPCs
├─ Dritte Reihe: 8 NPCs
├─ ... (erweitert sich nach hinten)
└─ Gesamt-Breite hinten: 12m

MARSCH AUF POLIZEI-LINIE:
├─ Start: Vector3(-100, 0, 80)
├─ Ziel: Polizei-Linie bei Vector3(0, 0, 70)
├─ Distanz: 100m
├─ Geschwindigkeit: 2.0 m/s (schneller Marsch)
├─ Zeit bis Kontakt: 50 Sekunden
└─ Soundtrack: "ACAB! ACAB!" (120 BPM)

19:00:45.000 - LETZTE 10 METER
├─ Mob beschleunigt
├─ Geschwindigkeit: 2.0 → 4.0 m/s (Sprint)
├─ Animation: "charge_riot_formation"
├─ Waffen werden gehoben
├─ Schreie werden lauter
└─ Polizei: Verstärkt Griff an Schilden

19:00:50.000 - KOLLISION!
━━━━━━━━━━━━━━━━━━━━━━━━━

PHYSICS-COLLISION:
├─ 50 NPCs × 80kg × 4 m/s = MASSIVER IMPULS
├─ Polizei-Linie: 30 NPCs mit Schilden
├─ Kraft-Ungleichgewicht: Mob >> Polizei
└─ Ergebnis: Linie bricht SOFORT

ERSTE 10 SEKUNDEN - KAMPF-CHAOS:
├─ 100+ Angriffe ausgeführt
├─ Waffen-Mix:
│   ├─ Eisenstangen: 35-50 HP/Treffer
│   ├─ Baseballschläger: 30-40 HP
│   ├─ Polizei-Schlagstöcke: 20-30 HP
│   └─ Fäuste: 10-15 HP
├─ Schilde: Blockieren 80% Schaden
├─ Verluste erste 10s:
│   ├─ Polizei: 8 niedergeschlagen
│   └─ Mob: 3 niedergeschlagen
└─ Audio: Totales Chaos
    ├─ Metall auf Metall
    ├─ Schreie
    ├─ Knochen-Sounds
    └─ Wut-Rufe
```

---

## 21:00:00.000 - SCHUSSWECHSEL (HÖHEPUNKT)

```
AUSLÖSER: Extremist_08 zieht Pistole
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

21:00:05.000 - PISTOLEN-ZIEHEN:
├─ NPC: Extremist_08 "KLAUS RICHTER"
├─ Waffe: Glock 19 (9mm, 15 Schuss)
├─ Versteck: Hosenbund, unter Hoodie
├─ Animation: "draw_pistol_concealed"
│   ├─ Frame 0-15: Hand unter Hoodie
│   ├─ Frame 16-25: Greift Pistole
│   ├─ Frame 26-40: Zieht heraus
│   ├─ Frame 41-55: Hebt Arm
│   └─ Frame 56-70: Zielt auf WEGA
├─ Gesamtzeit: 1.17s
└─ Audio: "clothing_rustle.wav", dann Stille

21:00:06.170 - ERSTER SCHUSS (Extremist):
├─ Animation: "fire_pistol_untrained"
│   └─ Rückstoß: Übertrieben (untrainiert)
├─ Muzzle-Flash:
│   ├─ Partikel: "muzzle_flash_pistol"
│   ├─ Light: Point-Light, 1 Frame, 5000 lumen
│   └─ Position: Mündung
├─ Audio: "gunshot_9mm_outdoor.wav" (+20dB)
│   ├─ Charakteristik: Scharf, hallend
│   └─ Echo: 3s Nachhall
├─ Projektil-Physik:
│   ├─ Kaliber: 9×19mm Parabellum
│   ├─ Masse: 8g
│   ├─ V0: 360 m/s
│   └─ Trajectory: Hitscan (zu schnell für sichtbar)
└─ Treffer: WEGA_12 Brustplatte

TREFFER-EFFEKTE:
├─ Impact-Position: Brust-Mitte
├─ Weste: Stufe IV - HÄLT!
├─ Energie-Absorption:
│   ├─ Projektil: Gestoppt
│   ├─ Deformation: Pilzform im Kevlar
│   └─ Übertragene Kraft: ~1500 N
├─ WEGA_12-Reaktion:
│   ├─ Animation: "bullet_impact_vest"
│   ├─ Ruckt zurück (2 Schritte)
│   ├─ Greift sich Brust
│   └─ Stöhnt: "Getroffen! Weste hält!"
├─ Schaden: 5 HP (Prellung)
└─ Status: Weiter kampffähig

21:00:06.500 - WEGA ERÖFFNET FEUER:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

KOMMANDO (Funk): "FEUER FREI! NEUTRALISIEREN!"

20 WEGA-BEAMTE FEUERN GLEICHZEITIG:
├─ Waffe: Steyr AUG A3 (5.56×45mm NATO)
├─ Feuer-Modus: Semi-Auto (kontrolliert)
├─ Schüsse in 0.5s: 60+ total
├─ Ziel: Extremist_08
└─ Treffer-Rate: 25% (Stress, Distanz 15m)

SALVEN-EFFEKTE:
├─ Muzzle-Flashes: 20 gleichzeitig
│   └─ Strobo-Effekt (Nacht-Szene)
├─ Audio: "rifle_burst_multiple.wav"
│   ├─ 60+ Schüsse überlagern sich
│   ├─ Volume: +25dB (oorbtäubend)
│   └─ Charakteristik: Donnerndes Rattern
├─ Tracer (jeder 5. Schuss):
│   ├─ Partikel: "tracer_556_green"
│   ├─ Visible: Lichtstreifen in Dunkelheit
│   └─ Konvergieren auf Ziel
└─ Hülsen: 60 Ejections
    ├─ Partikel: "brass_casing_eject"
    ├─ Klirren: "brass_hit_ground.wav" × viele
    └─ Decals: Hülsen auf Boden

EXTREMIST_08 - TOD:
━━━━━━━━━━━━━━━━━━━

TREFFER: 15+ Projektile
├─ Locations: Brust (8), Bauch (4), Arme (2), Kopf (1)
├─ Damage pro Treffer: 40-60 HP
├─ Total Damage: 600+ HP (Overkill bei 150 HP)
└─ Zeit bis Tod: <0.3s (instant)

TODES-ANIMATION: "death_multiple_gunshots"
├─ Frame 0-5: Erster Treffer (Brust)
│   ├─ Körper ruckt
│   └─ Blut-Spray: 30 Partikel
├─ Frame 6-10: Weitere Treffer
│   ├─ Körper zuckt bei jedem Impact
│   ├─ "Tanz"-Effekt (viele Richtungen)
│   └─ Blut: Kontinuierliche Fontänen
├─ Frame 11-15: Kopftreffer
│   ├─ Kopf ruckt zurück
│   ├─ Massive Blut-Explosion: 100 Partikel
│   └─ (Gore-Level: High)
├─ Frame 16-25: Zusammenbruch
│   ├─ Ragdoll aktiviert (Full-Body)
│   ├─ Fällt nach hinten
│   ├─ Waffe fällt aus Hand
│   │   └─ Physics-Object, klirrt
│   └─ Körper: Verdreht, unnatürlich
└─ Frame 26-40: Aufprall
    ├─ Landet 3m hinter Start-Position
    ├─ Audio: "body_fall_dead.wav"
    ├─ Blut-Pool: Beginnt sich zu bilden
    │   ├─ Decal: "blood_pool_large"
    │   ├─ Expansion: 0.5m → 2m über 30s
    │   └─ Farbe: RGB(100, 20, 20) dunkelrot
    └─ Status: TOT

21:00:08.000 - REAKTIONEN:
├─ Mob: Schock (1s Starre), dann Panik/Wut
├─ WEGA: Scannen nach weiteren Bedrohungen
├─ Audio: Schreie, "MANN DOWN!", "SCHIESST NICHT!"
└─ Eskalations-Level: 100% (MAXIMUM)
```

---

[Dokument wird in Teil 3 fortgesetzt mit Aftermath, Nacht-Phase, und technischen Spezifikationen...]
# 24H HYPER-DETAIL PART 3: AFTERMATH & NACHT

---

## 21:30:00.000 - MOB-RÜCKZUG & FLUCHT

### FLUCHT-ROUTEN HYPER-DETAILLIERT

```
╔═══════════════════════════════════════════════════════════════════════════════════╗
║ EVENT: "MOB ZERFÄLLT" - FLUCHT-SEQUENZEN                                         ║
║ Trigger: 21:30:00.000                                                            ║
║ Verbleibende Mob-NPCs: 35 (von 50)                                               ║
║ Tote: 8 | Schwer verletzt: 7 | Geflohen vorher: 0                               ║
╠═══════════════════════════════════════════════════════════════════════════════════╣

FUNK-NACHRICHT (Anführer Extremist_01):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

21:30:00.000 - Extremist_01 "DANIEL KRAUSE":
├─ Position: Hinter brennendem Auto (Deckung)
├─ Zustand: Unverletzt, aber Panik steigt
├─ Erkenntnis: "Das ist verloren..."
└─ Aktion: Greift zu Funkgerät

Animation: "radio_urgent_call"
├─ Frame 0-10: Hand zu Gürtel-Tasche
├─ Frame 11-20: Zieht Funkgerät heraus
├─ Frame 21-30: Hebt zum Mund
├─ Frame 31-40: Drückt Sprechtaste
│   └─ Audio: "radio_click_transmit.wav"
└─ Frame 41+: Spricht

Dialog (Audio: "extremist_retreat_call.wav"):
├─ "Alle Einheiten... *keuch*"
├─ "RÜCKZUG! SOFORT RÜCKZUG!"
├─ "Treffpunkt B! Treffpunkt B!"
├─ "Jeder für sich! LOS!"
└─ Duration: 3.5 Sekunden

Funk-Audio-Effekt:
├─ Processing: Radio-Distortion
├─ Squelch: Am Anfang und Ende
├─ Static: Leichtes Rauschen
└─ Empfang: Bei allen Extremisten mit Funk (5 NPCs)

╔═══════════════════════════════════════════════════════════════════════════════════╗
║ ROUTE A: KANALISATION (Anführer + 5 andere)                                      ║
╠═══════════════════════════════════════════════════════════════════════════════════╣

BETEILIGTE NPCs:
├─ Extremist_01 "Daniel" (Anführer)
├─ Extremist_03 "Markus"
├─ Extremist_11 "Stefan"
├─ Extremist_19 "Thomas"
├─ Extremist_27 "Andreas"
└─ Extremist_35 "Michael"

21:30:05.000 - Flucht beginnt:
├─ Start-Positionen: Verteilt hinter Barrikade #2
├─ Ziel: Gulli-Deckel bei Vector3(-45.0, 0.0, 92.0)
├─ Distanz: 50m
├─ Route: Hinter brennenden Autos (Deckung)
└─ Geschwindigkeit: 3.5 m/s (schnelles Joggen, geduckt)

BEWEGUNGS-ANIMATION: "run_crouched_tactical"
├─ Oberkörper: 30° nach vorne geneigt
├─ Kopf: Eingezogen
├─ Arme: Nah am Körper
├─ Beine: Kurze, schnelle Schritte
└─ Audio: "footstep_run_gravel.wav" (gedämpft)

21:30:20.000 - Erreichen Gulli-Deckel:
├─ Position: Vector3(-45.0, 0.0, 92.0)
├─ Deckel-Typ: Gusseisen, 60cm Durchmesser, 25kg
└─ Sicherung: Keine (Standard-Straßengulli)

GULLI-ÖFFNUNGS-SEQUENZ:
━━━━━━━━━━━━━━━━━━━━━━━

Extremist_01 + Extremist_03 (gemeinsam):

Frame 0-30: Positionierung
├─ Beide knien sich hin
├─ Animation: "kneel_down_quick"
├─ Position: Gegenüber am Deckel-Rand
└─ Hände: Greifen in Grifflöcher

Frame 31-60: Anheben
├─ Animation: "lift_heavy_coordinated"
├─ Deckel hebt sich (Physik-Object)
├─ Gewicht: 25kg (12.5kg pro Person)
├─ Audio: "metal_scrape_concrete.wav"
│   └─ Charakteristisch: Kratzendes Quietschen
├─ Rost-Partikel: 20 (von Deckel-Rand)
└─ Geschwindigkeit: 0.3m/s aufwärts

Frame 61-90: Zur Seite legen
├─ Drehen Deckel seitlich
├─ Legen auf Straße
├─ Audio: "metal_clang_ground.wav"
└─ Deckel-Position: Vector3(-45.5, 0.05, 92.0)

Frame 91-100: Schacht offen
├─ Öffnung: 55cm Durchmesser
├─ Tiefe: 3m bis Kanalboden
├─ Leiter: Metallsprossen, verrostet
├─ Geruch: (NPC-Reaction) "Bah, stinkt!"
├─ Dunkelheit: Absolut (kein Licht)
└─ Audio: Echo von unten, Wasser-Tropfen

21:30:25.000 - ABSTIEG BEGINNT:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

REIHENFOLGE: Einer nach dem anderen

NPC #1 (Extremist_35 "Michael") - zuerst runter:
├─ Animation: "climb_down_ladder_manhole"
│   ├─ Frame 0-10: Setzt sich an Rand
│   ├─ Frame 11-20: Beine in Loch
│   ├─ Frame 21-30: Greift erste Sprosse
│   ├─ Frame 31-40: Gewicht auf Arme
│   ├─ Frame 41-60: Klettert runter (6 Sprossen)
│   │   └─ Audio: "boot_metal_rung.wav" × 6
│   └─ Frame 61-70: Landet unten
│       └─ Audio: "splash_shallow.wav" (Wasser am Boden)
├─ Zeit: 70 Frames = 1.17s
└─ Ruft nach oben: "Klar! Nächster!"

NPCs #2-6: Gleicher Prozess
├─ Abstands-Timing: 2 Sekunden zwischen NPCs
├─ Gesamt-Abstieg: 12 Sekunden
└─ Letzter (Extremist_01): Zieht Deckel zu

21:30:37.000 - DECKEL SCHLIESST SICH:
├─ Extremist_01: Halb im Schacht, eine Hand oben
├─ Greift Deckel-Rand
├─ Animation: "pull_manhole_cover_from_inside"
├─ Zieht Deckel über sich
├─ Audio: "metal_scrape_close.wav" + "clang_seal.wav"
└─ Von außen: Niemand sieht wo sie hin sind

WEGA-REAKTION:
├─ WEGA_28 sieht letzte Bewegung
├─ "Da! Am Gulli!"
├─ Rennt hin (5 Sekunden)
├─ Erreicht Gulli: Deckel zu
├─ Versucht zu öffnen: Klemmt (von unten blockiert)
├─ Funk: "Verdammt! Sind in die Kanalisation!"
└─ Ergebnis: Diese 6 ENTKOMMEN

KANALISATION-UMGEBUNG (für spätere Szenen):
├─ Röhren-Durchmesser: 2m
├─ Wasser-Tiefe: 15cm (Abwasser)
├─ Beleuchtung: Keine (Taschenlampen nötig)
├─ Geruch: Intensiv (NPC-Husten-Animation)
├─ Navigation: Extremist_01 kennt den Weg
└─ Ausgang: 800m entfernt (außerhalb Polizei-Ring)

╔═══════════════════════════════════════════════════════════════════════════════════╗
║ ROUTE B: DURCH GEBÄUDE (4 Extremisten)                                           ║
╠═══════════════════════════════════════════════════════════════════════════════════╣

BETEILIGTE NPCs:
├─ Extremist_05 "Christian"
├─ Extremist_14 "Patrick"
├─ Extremist_22 "Florian"
└─ Extremist_31 "Lukas"

21:30:08.000 - Rennen zu Hauseingang:
├─ Ziel: Wohnhaus Vector3(25.0, 0.0, 88.0)
├─ Tür: Glas, unverschlossen (Panik-Öffnung von Bewohnern)
├─ Distanz: 30m
└─ Zeit: 10 Sekunden Sprint

21:30:18.000 - Betreten Gebäude:
├─ Animation: "door_burst_through"
├─ Tür fliegt auf
├─ Audio: "door_slam_open.wav"
├─ Innenraum: Treppenhaus, dunkel
└─ Bewohner: Schreie von oben "WAS GEHT DA VOR?!"

21:30:20.000 - Durchquerung:
├─ Route: Treppenhaus → Hinterhof-Tür
├─ Distanz innen: 25m
├─ Hindernisse: Kinderwagen (ausweichen)
├─ Beleuchtung: Notbeleuchtung (gedimmt)
└─ Audio: Schritte hallen, Keuchen

21:30:28.000 - Hinterausgang erreicht:
├─ Tür: Metall, Panik-Riegel
├─ Animation: "push_panic_bar"
├─ Audio: "panic_bar_release.wav" + "metal_door_open.wav"
└─ Gasse: Dunkel, eng, unbeobachtet

21:30:30.000 - In der Gasse:
├─ Richtung: Nach Süden (weg vom Platz)
├─ Geschwindigkeit: 4.0 m/s (voller Sprint)
└─ ABER: WEGA hat Gasse beobachtet!

VERFOLGUNGSJAGD:
━━━━━━━━━━━━━━━━

21:30:32.000 - WEGA_41 + WEGA_42 sehen sie:
├─ "STEHEN BLEIBEN! POLIZEI!"
├─ Extremisten: Ignorieren, rennen weiter
├─ WEGA: Setzen nach
└─ Distanz: 30m hinter Extremisten

21:30:35.000 - Gasse teilt sich:
├─ Links: Sackgasse (Extremisten wissen nicht)
├─ Rechts: Durchgang zur Hauptstraße
├─ Entscheidung:
│   ├─ Extremist_05 + _14: Gehen LINKS (Fehler!)
│   └─ Extremist_22 + _31: Gehen RECHTS (richtig)
└─ Gruppe teilt sich

21:30:40.000 - Extremist_05 + _14 in Sackgasse:
├─ Realisieren Fehler: "SCHEISSE! Sackgasse!"
├─ Drehen um: WEGA blockiert Ausgang
├─ WEGA: "AUF DEN BODEN! SOFORT!"
├─ Waffen gezielt auf sie
├─ Kapitulation:
│   ├─ Animation: "surrender_drop_knees"
│   ├─ Hände hinter Kopf
│   └─ "Nicht schießen! Wir geben auf!"
├─ FESTNAHME:
│   ├─ Animation: "arrest_prone_cuff"
│   ├─ Kabelbinder an Handgelenke
│   └─ Audio: "zip_tie_tighten.wav"
└─ Status: GEFASST

21:30:45.000 - Extremist_22 + _31 erreichen Hauptstraße:
├─ Mischen sich unter Passanten
├─ Ziehen Hoodies aus (Tarnung)
├─ Gehen normal (nicht rennen = verdächtig)
├─ WEGA: Verliert Spur
└─ Status: ENTKOMMEN

BILANZ ROUTE B:
├─ Gefasst: 2 (Extremist_05, _14)
├─ Entkommen: 2 (Extremist_22, _31)
└─ Verhältnis: 50/50

╔═══════════════════════════════════════════════════════════════════════════════════╗
║ ROUTE C: ÜBER BRENNENDE BARRIKADE (3 Extremisten) - VERZWEIFELT                  ║
╠═══════════════════════════════════════════════════════════════════════════════════╣

BETEILIGTE NPCs:
├─ Extremist_09 "Dominik" (HP: 85/150)
├─ Extremist_17 "Sascha" (HP: 110/150)
└─ Extremist_26 "René" (HP: 95/150)

21:30:10.000 - Einzige Option: Über Feuer:
├─ Situation: Umzingelt, keine andere Route
├─ Barrikade #1: Brennendes Auto + Müllcontainer
├─ Feuer-Höhe: 2m
├─ Flammen-Temperatur: 600-800°C
├─ Entscheidung: "Durch! Oder wir werden erschossen!"
└─ Verzweiflung: Maximum

KLETTERN ÜBER BARRIKADE:
━━━━━━━━━━━━━━━━━━━━━━━━

21:30:12.000 - Extremist_09 "Dominik" (zuerst):

Animation: "climb_barricade_fire"
├─ Frame 0-20: Anlauf
│   ├─ Schützt Gesicht mit Arm
│   └─ Animation: "run_arm_shield_face"
├─ Frame 21-35: Sprung auf Müllcontainer
│   ├─ Container: 1.2m hoch
│   ├─ Metall: HEISS (300°C)
│   └─ Audio: "sizzle_skin_metal.wav" (Handverbrennung)
├─ Frame 36-50: Auf Container
│   ├─ Hände: Verbrennung 2. Grades
│   ├─ Schaden: 15 HP (Kontakt-Verbrennung)
│   └─ Animation: "pain_hands_burn"
├─ Frame 51-70: Über Auto-Wrack
│   ├─ Flammen: Lecken an Kleidung
│   ├─ Hosenbein: Fängt Feuer!
│   │   └─ Partikel: "clothing_fire_small"
│   ├─ Schaden: 5 HP/Sek (Feuer-DoT)
│   └─ Audio: "fire_crackle_close.wav" + "scream_burn.wav"
├─ Frame 71-90: Sprung auf andere Seite
│   ├─ Fällt 1.5m
│   ├─ Landet unsanft (5 HP Fallschaden)
│   └─ Total HP verloren: 20 HP
└─ Frame 91-110: Löschen
    ├─ Schlägt auf brennendes Bein
    ├─ Animation: "pat_out_fire_panic"
    ├─ Erfolg nach 3 Sekunden
    └─ Kleidung: Versengt, Löcher

Dominik nach Überquerung:
├─ HP: 85 → 65/150
├─ Status: "Burned" (Hände, Bein)
├─ Bewegung: Humpelnd (70% Speed)
├─ Aussehen: Verbrannt, verschwitzt, verzweifelt
└─ Aktion: Weiterfliehen Richtung Süden

21:30:18.000 - Extremist_17 + _26 folgen:
├─ Ähnlicher Prozess
├─ Schaden: 15-25 HP jeweils
└─ Alle drei auf anderer Seite

21:30:25.000 - WEGA SIEHT SIE:
├─ WEGA_55 + _56 haben freie Schusslinie
├─ Ziele: 3 flüchtende, silhouettiert gegen Flammen
├─ Distanz: 40m
├─ Befehl: "Anhalten! POLIZEI!"
└─ Extremisten: Ignorieren (Panik)

21:30:26.000 - WEGA ERÖFFNET FEUER:
├─ Rechtfertigung: Fliehende Tatverdächtige, bewaffnet
├─ Schüsse: 6 (3 pro WEGA)
├─ Ziele: Oberkörper (Stoppen, nicht töten)
└─ Treffer:

Extremist_09 "Dominik": 2 TREFFER
├─ Treffer 1: Rücken (Durchschuss)
│   ├─ Entry: Schulterblatt
│   ├─ Exit: Brust (vorne)
│   ├─ Schaden: 55 HP
│   └─ Organe: Lunge getroffen
├─ Treffer 2: Hüfte
│   ├─ Knochen: Getroffen
│   ├─ Schaden: 40 HP
│   └─ Sofort: Fällt
├─ Total: 65 → -30 HP (TOT)
├─ Animation: "shot_back_fall_forward"
│   └─ Fällt auf Gesicht, gleitet
└─ Status: TOT

Extremist_17 "Sascha": 1 TREFFER
├─ Treffer: Oberschenkel
├─ Schaden: 35 HP
├─ Fällt, kann nicht weiterlaufen
├─ Kriecht weiter (Animation: "crawl_wounded")
└─ Status: SCHWER VERLETZT, später GEFASST

Extremist_26 "René": 0 TREFFER
├─ Alle Schüsse verfehlt
├─ Sprint: Maximale Geschwindigkeit
├─ Erreicht Seitenstraße
├─ Verschwindet im Dunkel
└─ Status: ENTKOMMEN (verletzt aber frei)

BILANZ ROUTE C:
├─ Tot: 1 (Dominik)
├─ Gefasst: 1 (Sascha)
├─ Entkommen: 1 (René)
└─ Verhältnis: 33% Erfolg, 33% Tod, 33% Gefangennahme

╔═══════════════════════════════════════════════════════════════════════════════════╗
║ ROUTE D: KAPITULATION (7 Extremisten) - Die Klugen                               ║
╠═══════════════════════════════════════════════════════════════════════════════════╣

21:30:15.000 - Gruppe entscheidet sich zu ergeben:
├─ NPCs: Extremist_02, _07, _12, _18, _24, _29, _34
├─ Grund: "Lieber Knast als Tod"
├─ Lage: Umzingelt, keine realistische Flucht
└─ Prozess:

KAPITULATIONS-SEQUENZ:
━━━━━━━━━━━━━━━━━━━━━━

Frame 0-30: Waffen fallen lassen
├─ Animation: "drop_weapon_surrender"
│   ├─ Eisenstangen: Fallen klirrend
│   │   └─ Audio: "metal_drop_ground.wav" × 7
│   ├─ Baseballschläger: Rollen weg
│   └─ Messer (falls vorhanden): Geworfen
├─ Hände: Sofort hoch
└─ Stimmen: "WIR GEBEN AUF! NICHT SCHIESSEN!"

Frame 31-60: Auf Knie gehen
├─ Animation: "kneel_surrender_slow"
├─ Alle 7 gleichzeitig (±0.5s)
├─ Hände: Hinter Kopf verschränkt
├─ Köpfe: Gesenkt
└─ Körperhaltung: Unterwürfig

Frame 61-120: WEGA nähert sich
├─ 14 WEGA-Beamte (2 pro Verhaftetem)
├─ Waffen: Weiterhin gezielt
├─ Kommandos: "NICHT BEWEGEN! HÄNDE SICHTBAR!"
├─ Annäherung: Taktisch, langsam
└─ Distanz-Abbau: 20m → 2m über 60s

Frame 121-240: Festnahme-Prozedur
├─ Pro Verhaftetem:
│   ├─ WEGA_A: Deckt mit Waffe
│   ├─ WEGA_B: Nähert sich von hinten
│   ├─ Befehl: "Hände auf den Rücken! Langsam!"
│   ├─ Animation: "hands_behind_back_compliant"
│   ├─ Kabelbinder anlegen:
│   │   ├─ Animation: "apply_zip_cuffs"
│   │   └─ Audio: "zip_tie_ratchet.wav"
│   ├─ Durchsuchung:
│   │   ├─ Animation: "pat_down_thorough"
│   │   └─ Gefundenes: Handys, Bargeld, Ausweise
│   └─ Hochziehen:
│       ├─ Animation: "lift_prisoner_standing"
│       └─ Abführen zur Sammelstelle
├─ Zeit pro Person: ~20 Sekunden
└─ Alle 7: Gefesselt nach 2.5 Minuten

BILANZ ROUTE D:
├─ Alle 7: GEFASST
├─ Verletzungen: Minimal (Kabelbinder-Druckstellen)
├─ Status: Werden angeklagt
└─ Verhältnis: 0% Flucht, 100% Überleben

╔═══════════════════════════════════════════════════════════════════════════════════╗
║ GESAMT-BILANZ MOB-RÜCKZUG                                                        ║
╠═══════════════════════════════════════════════════════════════════════════════════╣

Von 50 Extremisten:
├─ Während Kampf getötet: 8
├─ Während Kampf schwer verletzt: 7
├─ Route A entkommen: 6
├─ Route B gefasst: 2
├─ Route B entkommen: 2
├─ Route C getötet: 1
├─ Route C gefasst: 1
├─ Route C entkommen: 1
├─ Route D gefasst: 7
└─ Nicht zugeordnet/Chaos: 15 (gemischt)

FINALE STATISTIK:
├─ ENTKOMMEN: 12 (24%)
├─ GEFASST: 22 (44%)
├─ TOT: 9 (18%)
├─ SCHWER VERLETZT (später gefasst): 7 (14%)
└─ MOB EXISTIERT NICHT MEHR

╚═══════════════════════════════════════════════════════════════════════════════════╝
```

---

## 22:00:00.000 - AFTERMATH: TATORT-SICHERUNG

### FORENSIK & AUFRÄUM-SEQUENZ

```
╔═══════════════════════════════════════════════════════════════════════════════════╗
║ EVENT: "CRIME SCENE PROCESSING"                                                   ║
║ Trigger: 22:00:00.000                                                            ║
║ Dauer: 4 Stunden Spielzeit (4 Minuten Real)                                      ║
╠═══════════════════════════════════════════════════════════════════════════════════╣

22:00:00.000 - PLATZ WIRD ABGESPERRT:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ABSPERRBAND-PLATZIERUNG:
├─ Material: "police_tape_austria"
│   ├─ Text: "POLIZEI - NICHT BETRETEN"
│   ├─ Farben: Rot-Weiß gestreift
│   └─ Breite: 8cm
├─ Länge benötigt: ~350m (Platz-Umfang)
├─ Befestigungspunkte: Laternen, Absperrgitter, Bäume
└─ NPCs: 6 Polizisten für Absperrung

ABSPERR-ANIMATION PRO POLIZIST:
├─ Animation: "unroll_police_tape"
│   ├─ Rolle in einer Hand
│   ├─ Geht entlang der Linie
│   ├─ Befestigt alle 3m
│   └─ Audio: "tape_unroll.wav"
├─ Geschwindigkeit: 1.0 m/s
├─ Zeit für 60m pro Polizist: 60s
└─ Gesamt: 6 Min für komplette Absperrung

CHECKPOINTS (4 Stück an Eingängen):
├─ Personal: 4 Polizisten pro Checkpoint
├─ Ausrüstung:
│   ├─ Absperrgitter: 2 Stück
│   ├─ Taschenlampen
│   ├─ Notizblöcke
│   └─ Funkgeräte
├─ Aufgabe: Niemand rein außer autorisiert
└─ Animation: "checkpoint_guard_duty"

22:02:00.000 - FEUERWEHR TRIFFT EIN:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FAHRZEUGE: 5 Feuerwehr-Einheiten
├─ 2× Tanklöschfahrzeug (TLF 4000)
├─ 1× Drehleiter (DLK 23/12)
├─ 1× Rüstwagen (RW)
└─ 1× Einsatzleitwagen (ELW)

ANKUNFTS-SEQUENZ:
├─ Audio: Sirenen (Martinshorn)
├─ Lichter: Blaulicht reflektiert überall
├─ Formation: Konvoi
├─ Stopp-Positionen: Verteilt um Platz
└─ Feuerwehrleute: 25 total

LÖSCH-ARBEITEN:
━━━━━━━━━━━━━━━━

Brennendes Auto #1:
├─ Brandzustand: Vollbrand, 3m Flammen
├─ Temperatur: 800°C Kern
├─ Herangehensweise:
│   ├─ Schlauch ausrollen (Animation: "unroll_hose")
│   ├─ Hydrant anschließen
│   ├─ Wasserdruck aufbauen
│   └─ Sprühen beginnen
├─ Lösch-Animation: "firefighter_spray_continuous"
│   ├─ Körperhaltung: Breit, stabil
│   ├─ Schlauch: Physik-simuliert (Rückstoß)
│   ├─ Wasser-Partikel: 2000/Sekunde
│   └─ Dampf bei Kontakt: 500 Partikel/Sek
├─ Audio:
│   ├─ "water_spray_high_pressure.wav" (kontinuierlich)
│   ├─ "fire_sizzle_steam.wav" (bei Kontakt)
│   └─ Funkverkehr: "Wasser marsch!", "Brand unter Kontrolle!"
├─ Lösch-Zeit: 5 Minuten
└─ Ergebnis: Rauchend, verkohltes Wrack

Brennende Autos #2-5: Parallel
├─ Separate Teams
├─ Gleicher Prozess
├─ Gesamt-Löschzeit: 8 Minuten (überlappend)
└─ Danach: Glutnester kontrollieren

22:15:00.000 - ALLE FEUER GELÖSCHT:
├─ Platz-Zustand: Nass, rauchig, dunkel
├─ Autowracks: 5 ausgebrannte Skelette
├─ Geruch: Verbranntes Plastik, Gummi
└─ Beleuchtung: Nur Polizei-Scheinwerfer

22:05:00.000 - SANITÄTER-EINSATZ:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

KRANKENWAGEN: 10 Stück
├─ Typ: Mercedes Sprinter Ambulanz
├─ Personal: 2 Sanitäter pro Fahrzeug = 20 total
├─ Ausrüstung: Notfall-Sets, Tragen, Defis
└─ Position: Sammelstelle am Platz-Rand

TRIAGE-SYSTEM:
━━━━━━━━━━━━━━

Sanitäter gehen durch Platz, kategorisieren:

ROT (Sofort, lebensbedrohlich):
├─ Anzahl: 5 NPCs
├─ Beispiele:
│   ├─ Polizist mit Kopfverletzung
│   ├─ Extremist mit Schusswunden
│   └─ Demonstrant mit Trampel-Verletzungen
├─ Animation: "medic_triage_red_tag"
│   └─ Rote Karte an Opfer befestigen
├─ Aktion: Sofort in Krankenwagen
└─ Ziel: Krankenhaus mit Trauma-Zentrum

GELB (Dringend, schwer verletzt):
├─ Anzahl: 15 NPCs
├─ Beispiele:
│   ├─ Knochenbrüche
│   ├─ Tiefe Schnittwunden
│   └─ Verbrennungen 2. Grades
├─ Animation: "medic_triage_yellow_tag"
├─ Aktion: Erstversorgung, dann Transport
└─ Wartezeit: 10-20 Minuten

GRÜN (Nicht dringend, leicht verletzt):
├─ Anzahl: 40+ NPCs
├─ Beispiele:
│   ├─ Prellungen
│   ├─ Tränengas-Exposition
│   └─ Kleinere Schnittwunden
├─ Animation: "medic_triage_green_tag"
├─ Aktion: Selbstständig zur Sammelstelle
└─ Behandlung: Vor Ort möglich

SCHWARZ (Tot):
├─ Anzahl: 9 NPCs
├─ Werden markiert, nicht bewegt
├─ Animation: "medic_confirm_death"
│   ├─ Puls prüfen (keine Reaktion)
│   ├─ Pupillen prüfen (keine Reaktion)
│   └─ Schwarze Karte/Decke
└─ Forensik muss erst dokumentieren

BEISPIEL-BEHANDLUNG (Rot-Patient):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Patient: Extremist_22 "Florian" (Schusswunde Brust)
├─ Position: Liegt am Boden, Vector3(18.0, 0.0, 72.0)
├─ Zustand: Bewusstlos, Blutung aktiv
├─ HP: 15/150 (kritisch)

22:06:30.000 - Sanitäter erreichen ihn:
├─ Sanitäter_A (Anna): Lebenszeichen prüfen
│   ├─ Animation: "medic_check_pulse"
│   ├─ "Puls schwach! Circa 40!"
│   └─ "Schusswunde! Brauche Druckverband!"
├─ Sanitäter_B (Thomas): Holt Ausrüstung
│   ├─ Animation: "retrieve_medical_kit"
│   └─ Notfall-Tasche öffnen

22:06:45.000 - Erstversorgung:
├─ Kleidung aufschneiden
│   ├─ Animation: "cut_clothing_shears"
│   └─ Audio: "fabric_cutting.wav"
├─ Wunde freilegen
│   ├─ Visuelle: Einschussloch, Blut
│   └─ Sanitäter: "Sauberer Durchschuss, keine Exit-Wunde"
├─ Druckverband anlegen
│   ├─ Animation: "apply_pressure_bandage"
│   ├─ Gaze: Weiß → Rot (Blut-Shader)
│   └─ Audio: "bandage_wrap.wav"
├─ Infusion legen
│   ├─ Animation: "insert_iv_line"
│   ├─ Nadel in Arm
│   └─ Kochsalzlösung läuft

22:07:30.000 - Transport:
├─ Trage herbeibringen
│   ├─ Animation: "unfold_stretcher"
│   └─ Audio: "metal_unfold_click.wav"
├─ Patient auf Trage
│   ├─ Animation: "patient_lift_coordinated"
│   ├─ Zählen: "Eins, zwei, drei, hoch!"
│   └─ 2 Sanitäter heben synchron
├─ Zum Krankenwagen tragen
│   ├─ Animation: "carry_stretcher_walk"
│   ├─ Distanz: 40m
│   └─ Zeit: 45 Sekunden
├─ In Krankenwagen laden
│   ├─ Animation: "load_stretcher_ambulance"
│   └─ Audio: "stretcher_rails_lock.wav"
└─ Abfahrt mit Sirene

22:08:30.000 - Krankenwagen fährt ab:
├─ Sirene: AN
├─ Blaulicht: AN
├─ Geschwindigkeit: Schnell (60 km/h in Stadt)
├─ Ziel: AKH Wien (Trauma-Zentrum)
└─ Fahrzeit: ~8 Minuten (off-screen)

22:30:00.000 - FORENSIK-TEAMS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FORENSIK-VAN ANKUNFT:
├─ Fahrzeug: Weißer Sprinter, "SPURENSICHERUNG"
├─ Personal: 6 Forensiker
├─ Outfit: Weiße Tyvek-Anzüge, Handschuhe, Überschuhe
└─ Ausrüstung: Kameras, Marker, Beweisbeutel, Maßbänder

DOKUMENTATIONS-PHASE:
━━━━━━━━━━━━━━━━━━━━━

SCHRITT 1: Übersichts-Fotos (22:32:00 - 22:40:00)
├─ Fotograf mit Profi-Kamera
├─ Animation: "photographer_crime_scene"
│   ├─ Kamera heben
│   ├─ Fokussieren
│   ├─ Auslösen (Blitz)
│   └─ Nächste Position
├─ Audio: "camera_shutter_click.wav" + "flash_charge.wav"
├─ Fotos: ~200 (Übersicht, Details, alle Winkel)
├─ Optional: Drohne für Luftbilder
│   ├─ Drohne: DJI Mavic
│   ├─ Flughöhe: 30m
│   └─ Audio: "drone_buzz.wav"
└─ Dauer: 8 Minuten

SCHRITT 2: Beweismittel markieren (22:40:00 - 22:55:00)
├─ Gelbe Nummernschilder aufstellen
├─ Bei jedem Fund:
│   ├─ Marker hinstellen (1, 2, 3...)
│   ├─ Foto machen
│   ├─ In Notizbuch eintragen
│   └─ GPS-Koordinate notieren
├─ Gefundene Beweismittel:
│   ├─ Waffen: 3 Pistolen, 15 Eisenstangen, 10 Schläger
│   ├─ Patronenhülsen: 200+ (5.56mm + 9mm)
│   ├─ Glasscherben: Molotow-Reste
│   ├─ Kleidungsstücke: Sturmhauben, Handschuhe
│   ├─ Blutflecken: 50+ Stellen
│   └─ Mobiltelefone: 8 Stück (gefallen/zurückgelassen)
├─ Marker-Anzahl: 150+
└─ Dauer: 15 Minuten

SCHRITT 3: Beweismittel einsammeln (22:55:00 - 23:15:00)
├─ Pro Beweismittel:
│   ├─ Foto mit Maßstab
│   ├─ Mit Pinzette aufheben
│   │   └─ Animation: "forensic_pickup_tweezers"
│   ├─ In beschrifteten Beutel
│   │   └─ Audio: "evidence_bag_seal.wav"
│   └─ Beutel-Beschriftung:
│       ├─ Datum/Uhrzeit
│       ├─ Fundort
│       ├─ Finder-Name
│       └─ Beweismittel-Nummer
├─ Spezial-Behandlung für Waffen:
│   ├─ Entladen prüfen
│   ├─ Fingerabdruck-Sicherung
│   └─ Separater Waffen-Koffer
└─ Dauer: 20 Minuten

SCHRITT 4: Leichen dokumentieren & abtransportieren (23:15:00 - 23:45:00)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

9 Leichen auf dem Platz:
├─ 8 Extremisten (Schusswunden)
└─ 1 Polizist (während früherem Kampf verstorben)

PRO LEICHE:
├─ Umfangreiche Foto-Dokumentation
│   ├─ Übersicht mit Markern
│   ├─ Nahaufnahme Gesicht
│   ├─ Nahaufnahme Wunden
│   └─ Hände (für Schmauchspuren-Test)
├─ Körpertemperatur messen (Todeszeitpunkt)
│   └─ Animation: "measure_body_temp"
├─ Vorläufige Todesursache notieren
├─ Leichensack vorbereiten
│   ├─ Animation: "unfold_body_bag"
│   ├─ Schwarzer Kunststoff-Sack, Reißverschluss
│   └─ Audio: "plastic_unfold.wav"
├─ Körper in Sack legen
│   ├─ Animation: "place_body_in_bag"
│   ├─ 2 Personen heben
│   ├─ Vorsichtig ablegen
│   └─ Reißverschluss schließen
│       └─ Audio: "zipper_close_slow.wav"
├─ Auf Trage, in Leichenwagen
│   └─ Audio: "stretcher_load.wav"
└─ Abtransport zum Gerichtsmedizinischen Institut

Zeit pro Leiche: ~3-4 Minuten
Gesamt: 30 Minuten für alle 9

23:45:00 - FORENSIK ABGESCHLOSSEN:
├─ Beweismittel: Alle gesichert
├─ Fotos: 500+ gemacht
├─ Leichen: Abtransportiert
├─ Marker: Bleiben (für weitere Untersuchung)
└─ Platz-Status: Tatort, weiter gesperrt

╚═══════════════════════════════════════════════════════════════════════════════════╝
```

---

## 00:00:00.000 - TAGES-ENDE & STATISTIK

```
╔═══════════════════════════════════════════════════════════════════════════════════╗
║ TAGES-ZUSAMMENFASSUNG - STATISTIK-SCREEN                                         ║
╠═══════════════════════════════════════════════════════════════════════════════════╣

UI-ELEMENT: Vollbild-Overlay (Fade-In 1s)

╔════════════════════════════════════════════════════════════════════╗
║                                                                    ║
║              📊 TAGES-BERICHT: 17. März 2021 📊                   ║
║                                                                    ║
╠════════════════════════════════════════════════════════════════════╣
║                                                                    ║
║  ⏰ ZEITRAUM: 06:00 - 00:00 (18 Stunden)                          ║
║                                                                    ║
║  ════════════════════════════════════════════════════════════════  ║
║                                                                    ║
║  👥 DEMONSTRANTEN:                                                 ║
║  ├─ Teilnehmer (Maximum): 200                                     ║
║  ├─ Friedlich gegangen: 120 (60%)                                 ║
║  ├─ Verletzte: 35                                                 ║
║  └─ Festnahmen (Demonstranten): 12                                ║
║                                                                    ║
║  🎭 EXTREMISTEN (SCHWARZER BLOC):                                  ║
║  ├─ Teilnehmer: 50                                                ║
║  ├─ Getötet: 9                                                    ║
║  ├─ Schwer verletzt: 8                                            ║
║  ├─ Festnahmen: 22                                                ║
║  └─ Entkommen: 11                                                 ║
║                                                                    ║
║  👮 POLIZEI:                                                       ║
║  ├─ Eingesetzte Beamte: 180                                       ║
║  ├─ Getötet: 0                                                    ║
║  ├─ Schwer verletzt: 8                                            ║
║  ├─ Leicht verletzt: 25                                           ║
║  └─ Dienstunfähig: 12                                             ║
║                                                                    ║
║  🔫 WAFFENEINSATZ:                                                 ║
║  ├─ Schüsse abgefeuert (Polizei): 247                             ║
║  ├─ Schüsse abgefeuert (Extremisten): 31                          ║
║  ├─ Wasserwerfer-Einsätze: 3                                      ║
║  ├─ Tränengas-Granaten: 10                                        ║
║  └─ Blendgranaten: 8                                              ║
║                                                                    ║
║  💀 GESAMT-OPFER:                                                  ║
║  ├─ Tote: 9                                                       ║
║  ├─ Schwer Verletzte: 45                                          ║
║  └─ Leicht Verletzte: 120+                                        ║
║                                                                    ║
║  🚗 SACHSCHÄDEN:                                                   ║
║  ├─ Zerstörte Fahrzeuge: 8                                        ║
║  ├─ Beschädigte Gebäude: 4                                        ║
║  ├─ Zerstörtes Stadtmobiliar: 15                                  ║
║  └─ Geschätzter Schaden: €2.850.000                               ║
║                                                                    ║
║  ════════════════════════════════════════════════════════════════  ║
║                                                                    ║
║  📈 ESKALATIONS-VERLAUF:                                          ║
║  ├─ 06:00: 0%   ████░░░░░░░░░░░░░░░░                              ║
║  ├─ 10:00: 15%  ███████░░░░░░░░░░░░░                              ║
║  ├─ 12:00: 45%  █████████████░░░░░░░                              ║
║  ├─ 14:00: 70%  ██████████████████░░                              ║
║  ├─ 19:00: 85%  ███████████████████░                              ║
║  ├─ 21:00: 100% ████████████████████ (Maximum)                    ║
║  └─ 00:00: 30%  ██████████░░░░░░░░░░ (Abklingend)                 ║
║                                                                    ║
╚════════════════════════════════════════════════════════════════════╝

AUSWIRKUNGEN AUF TAG 2:
├─ Autowracks bleiben sichtbar (Decals)
├─ Blutflecken verblassen (50% Opacity)
├─ Polizei-Präsenz: +200% (Ausnahmezustand)
├─ Zivilisten auf Straße: -60%
├─ Shops geschlossen: 40%
├─ Medien-Präsenz: Massiv
└─ Politische Konsequenzen: Story-Events

╚═══════════════════════════════════════════════════════════════════════════════════╝
```

---

## 06:00:00.000 - NEUER TAG (TAG 2)

```
TAG 2 - VERÄNDERTE WELT:
━━━━━━━━━━━━━━━━━━━━━━━━

VISUELLE ÄNDERUNGEN:
├─ Autowracks: Ausgebrannt, umringt von Absperrband
├─ Blutflecken: Verblasst, aber sichtbar
├─ Graffiti: "ACAB", "FREIHEIT", "COPS = MÖRDER"
├─ Barrikaden-Reste: Teilweise weggeräumt
├─ Pflasterlöcher: Nicht repariert
└─ Generelle Verwüstung: Überall erkennbar

ATMOSPHÄRE:
├─ Stimmung: Angespannt, traurig, wütend
├─ Farben: Entsättigter (Post-Process: -20% Saturation)
├─ Himmel: Bewölkt (Pathetic Fallacy)
├─ Audio: Gedämpfter, weniger Vögel
└─ NPCs: Nervöser, misstrauischer

POLIZEI-PRÄSENZ:
├─ Normale Streifen: ×3
├─ Checkpoints: Bleiben aktiv
├─ WEGA: Auf Standby (sichtbar)
├─ Hubschrauber: Gelegentliche Überflüge
└─ Hunde-Staffeln: Patrouillieren

ZIVILISTEN:
├─ Anzahl auf Straße: -60%
├─ Verhalten: Schnell gehen, nicht verweilen
├─ Gespräche: Gedämpft, über Ereignisse
├─ Kinder: Kaum draußen
└─ Geschäfte: Viele geschlossen ("Wegen Unruhen")

MEDIEN:
├─ TV-Teams: Überall mit Kameras
├─ Reporter: Vor Absperrungen
├─ Drohnen: Versuchen Aufnahmen (Polizei stört)
└─ Berichte: "Schlimmste Ausschreitungen seit Jahren"

TAG 2 EVENT-KALENDER (VORSCHAU):
├─ 08:00 - Schweigeminute/Gedenkveranstaltung
├─ 10:00 - Politische Pressekonferenz
├─ 12:00 - Mögliche Gegen-Demo angekündigt
├─ 14:00 - Untersuchungskommission trifft ein
├─ 18:00 - Mahnwache für Opfer
└─ 21:00 - ???

(Tag 2 Events abhängig von Spieler-Aktionen Tag 1)
```

---

# 🔧 TECHNISCHE SPEZIFIKATIONEN

## ANIMATIONS-KATALOG (VOLLSTÄNDIG)

```
BEWEGUNGS-ANIMATIONEN (42 Stück):
├─ walk_casual (1.2 m/s)
├─ walk_purposeful (1.6 m/s)
├─ walk_elderly_cane (0.8 m/s)
├─ walk_female_heels_purposeful (1.5 m/s)
├─ walk_injured_limp (0.8 m/s)
├─ walk_crouched_tactical (1.5 m/s)
├─ walk_authoritative (1.3 m/s)
├─ run_panic (4.0 m/s)
├─ run_crouched_tactical (3.5 m/s)
├─ run_blind_arms_forward (3.0 m/s)
├─ jog_loop (3.2 m/s)
├─ jogging_male_athletic (3.2 m/s)
├─ sprint_maximum (5.0 m/s)
├─ sprint_with_weapon (4.5 m/s)
├─ crawl_away (0.5 m/s)
├─ crawl_wounded (0.3 m/s)
├─ climb_down_ladder_manhole
├─ climb_barricade_fire
├─ stairs_ascend_subway
├─ stairs_exit_female
├─ march_police_formation
├─ march_aggressive_formation
├─ charge_riot_formation
├─ tactical_exit_riot_van
├─ flee_panic
├─ stumble_back_hit
├─ stumble_shoved
├─ stagger_from_impact
├─ water_knockback_airborne
├─ fall_back_wet
├─ collapse_gas
├─ kneel_surrender_slow
├─ kneel_down_quick
├─ surrender_drop_knees
├─ surrender_standing
├─ surrender_prone
├─ turn_and_walk_casual
├─ turn_leave_contempt
├─ stop_look_around
├─ stop_plant_feet
├─ door_push_enter
└─ door_burst_through

KAMPF-ANIMATIONEN (35 Stück):
├─ baton_strike_overhead
├─ baton_strike_overhead_full
├─ baton_strike_side
├─ baton_strike_low
├─ baton_hit_shield_sync
├─ shield_bash_forward
├─ punch_face
├─ punch_sucker_from_behind
├─ kick_grounded_target
├─ kick_side_knee
├─ kick_shin
├─ grab_weapon_two_person
├─ disarm_attempt
├─ shove_aside_forceful
├─ throw_overhand_bottle
├─ throw_overhand_can
├─ throw_grenade_underhand
├─ throw_stone
├─ throw_molotov_overhand
├─ throw_flashbang
├─ swing_pole_horizontal
├─ swing_heavy_weapon
├─ swing_bat_overhead
├─ draw_pistol_fast
├─ draw_pistol_concealed
├─ draw_baton_fast
├─ fire_pistol
├─ fire_pistol_untrained
├─ fire_rifle_burst
├─ aim_rifle
├─ prepare_spit
├─ spit_forceful
├─ fight_surrounded_desperate
├─ rage_snap_prepare_strike
└─ block_shield

REAKTIONS-ANIMATIONEN (28 Stück):
├─ hit_reaction_shoulder_heavy
├─ head_snap_impact
├─ face_hit_reaction_spit
├─ bullet_impact_vest
├─ shot_back_fall_forward
├─ shot_while_running
├─ death_multiple_gunshots
├─ headshot_death
├─ flinch_near_miss
├─ flashbang_stunned
├─ gas_cough_initial
├─ gas_reaction_medium
├─ gas_collapse_crawl
├─ pain_extreme
├─ pain_hands_burn
├─ clutch_injury_shoulder
├─ pat_out_fire_panic
├─ fear_realization
├─ shock_angry
├─ disgust_rage
├─ recognition_nod
├─ recognition_slight_smile
├─ look_around_quick
├─ head_turn_alert
├─ eyes_sting_grab_face
├─ on_fire_panic
├─ trampled_ground
└─ winded_gasp

INTERAKTIONS-ANIMATIONEN (25 Stück):
├─ flag_wave_idle
├─ flag_raise_proud
├─ hold_banner_idle
├─ sign_shake_angry
├─ shout_angry_fist
├─ shout_angry_both_arms
├─ shout_response
├─ clap_enthusiastic
├─ boo_gesture
├─ wave_greeting_short
├─ wave_politician
├─ grab_microphone_authority
├─ radio_urgent_call
├─ apply_zip_cuffs
├─ apply_pressure_bandage
├─ medic_triage_red_tag
├─ medic_check_pulse
├─ place_body_in_bag
├─ unfold_stretcher
├─ carry_stretcher_walk
├─ firefighter_spray_continuous
├─ unroll_police_tape
├─ forensic_pickup_tweezers
├─ photographer_crime_scene
└─ checkpoint_guard_duty

IDLE-ANIMATIONEN (18 Stück):
├─ idle_standing
├─ idle_standing_tired
├─ idle_behind_counter
├─ idle_flag_holder_proud
├─ idle_talking
├─ idle_listening
├─ idle_adjust_cap
├─ idle_check_phone_quick
├─ idle_deep_breath
├─ idle_scratch_chin
├─ idle_yawn_subtle
├─ lean_doorframe_casual
├─ stand_imposing_wait
├─ guard_at_ease
├─ smoke_cigarette_idle
├─ weight_shift_left_right
├─ look_around_nervous
└─ hands_in_pockets

GESAMT: 148 einzigartige Animationen
```

## AUDIO-KATALOG

```
WAFFEN-SOUNDS:
├─ gunshot_9mm_outdoor.wav
├─ rifle_burst_multiple.wav
├─ baton_hit_flesh.wav
├─ baton_extend_snap.wav
├─ metal_impact_helmet.wav
├─ punch_helmet_back.wav
├─ pole_hit_vest.wav
├─ kick_leg_armor.wav
├─ glass_bottle_shatter.wav
├─ metal_drop_ground.wav
└─ brass_hit_ground.wav

EXPLOSIONEN/FEUER:
├─ gas_grenade_pop.wav
├─ flashbang_bang.wav
├─ molotov_ignite.wav
├─ car_explosion.wav
├─ fire_crackle_close.wav
├─ fire_roar_large.wav
├─ fire_sizzle_steam.wav
└─ water_spray_high_pressure.wav

MENSCHLICHE SOUNDS:
├─ scream_pain_male_01-10.wav
├─ scream_pain_female_01-08.wav
├─ scream_burn.wav
├─ grunt_disgusted.wav
├─ grunt_effort.wav
├─ cough_light.wav
├─ cough_heavy_continuous.wav
├─ choking_severe.wav
├─ gasp_breath.wav
├─ shout_rage_male.wav
└─ crowd_roar_angry.wav

UMGEBUNGS-SOUNDS:
├─ siren_european_police.wav
├─ helicopter_rotor_close.wav
├─ van_door_slide_open.wav
├─ boot_march_concrete.wav
├─ shield_drum_massive.wav
├─ water_cannon_fire.wav
├─ radio_click_transmit.wav
├─ zipper_close_slow.wav
├─ camera_shutter_click.wav
└─ drone_buzz.wav

GESAMT: 80+ Audio-Dateien
```

## PARTIKEL-SYSTEME

```
BLUT-PARTIKEL:
├─ blood_splatter_small (10-30 Partikel)
├─ blood_splatter_large (50-100 Partikel)
├─ blood_spray_gunshot (100-200 Partikel)
├─ blood_pool_expand (Decal-Animation)
└─ blood_drip (5-10 Partikel/Sek)

FEUER-PARTIKEL:
├─ fire_small (100-200 Partikel)
├─ fire_large (500-1000 Partikel)
├─ fire_vehicle (1000-2000 Partikel)
├─ smoke_black_thick (200-500 Partikel)
├─ sparks_fire (50-100 Partikel)
└─ ember_glow (20-50 Partikel)

WASSER-PARTIKEL:
├─ water_cannon_stream (500 Haupt + 2000 Spray)
├─ water_splash_impact (100-200 Partikel)
├─ wet_mist (100-300 Partikel)
└─ rain_drops (wenn Wetter aktiv)

GAS-PARTIKEL:
├─ teargas_cloud (500-2000 Partikel/Granate)
├─ teargas_drift (Wind-beeinflusst)
└─ smoke_grenade (200-500 Partikel)

DEBRIS-PARTIKEL:
├─ glass_shatter (30-100 Partikel)
├─ concrete_dust (50-100 Partikel)
├─ brass_casing_eject (1 pro Schuss)
├─ wood_splinter (20-40 Partikel)
└─ paper_scatter (10-30 Partikel)

GESAMT: 25+ Partikel-Systeme
```

---

# ✅ DOKUMENT KOMPLETT

```
╔═══════════════════════════════════════════════════════════════════════════════════╗
║                                                                                   ║
║   ✅ HYPER-DETAILLIERTES 24-STUNDEN EVENT-SYSTEM - ABGESCHLOSSEN ✅              ║
║                                                                                   ║
║   DOKUMENTATIONS-UMFANG:                                                          ║
║   ├─ Teil 1: Morgen (06:00-12:00) - ~1500 Zeilen                                ║
║   ├─ Teil 2: Eskalation (12:00-21:00) - ~1500 Zeilen                            ║
║   ├─ Teil 3: Aftermath & Nacht (21:00-06:00) - ~1500 Zeilen                     ║
║   └─ Gesamt: ~4500 Zeilen                                                        ║
║                                                                                   ║
║   DETAIL-NIVEAU:                                                                  ║
║   ├─ Frame-genaue Animationen (60 FPS)                                          ║
║   ├─ Millisekunden-Timing                                                        ║
║   ├─ Exakte Physik-Werte (Masse, Kraft, Geschwindigkeit)                        ║
║   ├─ Präzise 3D-Koordinaten (Vector3)                                           ║
║   ├─ Vollständige Audio-Layer (dB, Hz, 3D-Position)                             ║
║   ├─ Partikel-Systeme (Anzahl, Größe, Lebensdauer)                             ║
║   ├─ Shader-Parameter (RGB, Opacity, Transitions)                               ║
║   ├─ NPC-Individualisierung (Name, Outfit, Verhalten)                           ║
║   ├─ HP-Schadensberechnung                                                       ║
║   └─ Gore-Details (unzensiert)                                                   ║
║                                                                                   ║
║   KATALOGE:                                                                       ║
║   ├─ 148 einzigartige Animationen                                               ║
║   ├─ 80+ Audio-Dateien                                                           ║
║   ├─ 25+ Partikel-Systeme                                                        ║
║   └─ 100+ beschriebene NPC-Aktionen                                             ║
║                                                                                   ║
║   🎮 PRODUKTIONSREIF FÜR IMPLEMENTATION! 🎮                                       ║
║                                                                                   ║
╚═══════════════════════════════════════════════════════════════════════════════════╝
```
