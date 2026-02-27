tart-Prompt (Übersichtsdatei)
🎮 Corona Control – Ultimate High-End Blueprint Outline
Projektbeschreibung: Das Spiel CORONA CONTROL wird von Grund auf neu konzipiert und auf React
Three Fiber (R3F) portiert, um Grafik und Gameplay auf ein absolutes Maximum für High-End-PCs (RTX
GPU oder besser) zu steigern. Jede Spielmechanik und jede Systemkomponente wird drastisch
ausgebaut und mit modernsten Technologien optimiert. Physikbasierte Interaktionen, Echtzeit
Zerstörung, aktive Ragdolls und GPGPU-Simulationen sorgen für eine realistische und dynamische
Spielwelt. Die gesamte Umgebung – ein detailgetreues Wien mit 7 Bezirks-Levels – wird in 4K
Auflösung modelliert und mit volumetrischer Beleuchtung sowie Partikeleffekten zum Leben erweckt.
Ziel ist eine echte AAA-Qualität: Über 100.000 Polygone pro Charakter und Objekt, 500+ gleichzeitige
NPCs bei stabilen 60 FPS, ein vollständiges Moral- und Eskalationssystem, keinerlei Programmfehler
und 100% getesteter Code.
Deliverables: Das Projektergebnis besteht aus zwei Markdown-Dokumenten, welche das
Gesamtkonzept strukturieren:
• 
• 
Start-Prompt Datei: Enthält Kontrollstrukturen und ein Optionsmenü zur Navigation (wahlweise
vertikal – sequentieller Durchlauf aller Phasen, horizontal – fokussiertes Springen zwischen
Subsystemen, oder hybrid – kombinierter Ansatz). Dieses Dokument dient als Einstiegspunkt und
ermöglicht es, gezielt bestimmte Bereiche des Blueprints auszuwählen.
Kontroll-Prompt Datei: Detaillierte Ausarbeitung aller 30 Hauptphasen mit ihren
Unterabschnitten. Hier wird die Navigation durch alle Phasen und Subsysteme ermöglicht,
inklusive Querverweisen. Jede Phase ist präzise dokumentiert mit technischen Erläuterungen,
Aufgabenpaketen, Implementierungshinweisen sowie Verweisen auf relevante Assets, Shader,
Komponenten und Systeme.
Im Folgenden wird der Blueprint als vollständige Gliederung dargestellt. Zunächst gibt eine
Gesamtübersichtstabelle einen strukturierten Überblick über alle 30 Phasen. Anschließend werden
die Phasen 1–30 im Detail beschrieben – jeweils mit einer technischen Beschreibung, einer
nummerierten Liste von Aufgaben (mit Unteraufgaben) und wichtigen Hinweisen zur Umsetzung.
📋 Gesamtübersicht der Entwicklungsphasen (30 Phasen)
Teil A: Grundlagen (Phasen 1–4) – Projektsetup & Architektur
Phase | Titel | Schwerpunkte----- | ------------------------------- | ----------------------------------------
1 | Projekt-Vision & Konzept | Spielidee, Story, Spielziele, Umfang
2 | Basis-Konfiguration | Projektsetup, Build-Tools, Dependencies
3 | Technologie-Stack & Architektur | R3F-Framework, Zustand-Management, WebGPU
4 | Typisierung & Utility-Module | TypeScript-Definitionen, Config-Konstanten, Helper-Funktionen 
Teil B: Kern-Spielsysteme (Phasen 5–11) – Gameplay-Mechaniken
Phase | Titel | Schwerpunkte----- | -------------------------- | ----------------------------------------
5 | Spieler-Charakter | Spieler-Modell, Steuerung, Kamera
6 | NPC-System & KI | NPC-Typen, KI-Verhalten (Behavior Trees)
1
7 | Fahrzeuge & Ausrüstung | Fahrzeugphysik, Waffen, Gegenstände
8 | Allgemeine Gameplay-Mechaniken | Bewegung, Kampf, Interaktionen, Inventar
9 | Moral-System | Moralpunkte, karmische Entscheidungen
10 | Reputations-System | Fraktionen, Ruf bei Gruppen
11 | Eskalations-System | Aufmerksamkeitslevel, Polizeieinsatz, KI-Reaktionen 
Teil C: Spielwelt & Inhalt (Phasen 12–16) – Welt, Level und Story
Phase | Titel | Schwerpunkte----- | --------------------------------- | ----------------------------------------
12 | Missions- & Queststruktur | Missionsdesign, Ziele, Nebenquests, Enden
13 | Dialog- & Entscheidungssystem | Dialogbäume, verzweigte Story, Konsequenzen
14 | Welt-Generator & Umgebung | Stadtaufbau, prozedurale Elemente, Assets
15 | Wetter- & Tag/Nacht-Zyklus | Dynamisches Wetter, Tageszeiten, Lichtstimmung
16 | Level-Design & Umsetzung | 7 Level (Kärntner Str., Impfzentrum, etc.), Detailgestaltung 
Teil D: Technische Systeme (Phasen 17–22) – Engine & Grafik
Phase | Titel | Schwerpunkte----- | --------------------------------- | ----------------------------------------
17 | Physik-Engine Integration | Rapier3D Physik, Kollision, Kräfte, Joints
18 | Zerstörungssystem | Gebäudeschäden, Objekt-Frakturen, Trümmerphysik
19 | Animations- & Ragdoll-System | Skelettanimationen, IK, physikbasierte Ragdolls
20 | Grafikengine & Shader | Beleuchtung, PBR-Materialien, Volumetrik, TSL
21 | Partikel- & Effekt-Systeme | Explosionen, Rauch, Feuer, Spezialeffekte
22 | Audio-System | Soundeffekte, Musik, Sprachaufnahmen 
Teil E: Benutzererfahrung & Fortschritt (Phasen 23–27) – UI & Meta
Phase | Titel | Schwerpunkte----- | ----------------------------- | ----------------------------------------
23 | UI/HUD & Menüsystem | Benutzeroberfläche, HUD-Anzeigen, Pause-Menü
24 | Tutorial-System | Einführung, Hilfstexte, guided experience
25 | Barrierefreiheit | Zugänglichkeits-Optionen (Controls, Farben)
26 | Persistenz & Speicherstände | Welt-Persistenz, Save/Load, Datenhaltung
27 | Achievements & Progression | Erfolge, Belohnungen, Fortschrittsverfolgung 
Teil F: Abschluss & Veröffentlichung (Phasen 28–30) – Feinschliff
Phase | Titel | Schwerpunkte----- | ----------------------- | ----------------------------------------
28 | Performance-Optimierung | LOD, Instancing, BVH, GPGPU, Multi-Threading
29 | Testing & QA | Unit-Tests, Integrationstests, Performance-Tests
30 | Build & Deployment | Build-Pipeline, Deployment, Versionierung 
Phase 1: Projekt-Vision & Konzept
Technische Beschreibung: In dieser initialen Phase werden die grundlegende Vision und das Konzept
von Corona Control festgelegt. Das beinhaltet die Hintergrundgeschichte, Spielziele, wichtigsten
Gameplay-Elemente sowie den Umfang der Spielwelt. Es wird definiert, welche Rolle der Spieler
übernimmt, welche Herausforderungen es gibt und wie sich das Spiel von bisherigen Titeln abhebt. Ein
besonderes Augenmerk liegt auf dem moralischen Dilemma und den verzweigten
Handlungsverläufen, die das Spiel bieten soll. Zudem werden die Zielvorgaben in Bezug auf Qualität
und Performance festgehalten (z.B. AAA-Visuals, hohe NPC-Anzahl, realistisches Wien-Setting). Diese
Phase liefert somit die Leitplanken für alle weiteren Entwicklungen.
2
Aufgaben:
• 
• 
• 
• 
• 
Spielidee & Alleinstellungsmerkmal definieren: Beschreibung des Spielgenres, Themas und
der Vision. Was ist die zentrale Idee von Corona Control? (Beispiel: Ein Open-World-Actionspiel in
Wien während einer Krise, mit Fokus auf moralischen Entscheidungen.) Herausarbeiten, wodurch
sich das Spiel auszeichnet (z.B. realistisches Setting, verzweigte Story, Mischung aus Strategie
und Action).
Story und Hintergrundwelt entwerfen: Grundhandlung, zeitlichen und räumlichen Rahmen
festlegen. Entwicklung einer Hintergrundgeschichte (Lore) und eines Handlungsbogens mit
Anfang, Mittelteil und möglichen Enden. Wichtig: Integration realer Schauplätze Wiens (z.B.
Kärntner Straße, Heldenplatz) als Level mit narrativer Bedeutung.
Hauptcharakter und Fraktionen festlegen: Beschreibung des Spieler-Charakters (Identität,
Motivation, Fähigkeiten) und der wichtigsten Fraktionen/Interessengruppen im Spiel (z.B. Polizei,
Zivilbevölkerung, Medien, ggf. pro- und contra-Bewegungen). Definieren, wie diese Fraktionen
mit dem Spieler interagieren und welche Ruf-Systeme (siehe Phase 10) daraus entstehen.
Gameplay-Kernschleife definieren: Herausarbeiten der grundlegenden Spielmechanik-Schleife– z.B. Erkunden → Aufgaben erhalten → Konflikte lösen (kämpfen oder verhandeln) →
Konsequenzen erleben → Charakter fortentwickeln. Dabei die Verquickung von Action (Kampf,
Verfolgung) und Strategie (Entscheidungen, Ressourcen-Management) berücksichtigen.
Zielvorgaben für Technik & Umfang festlegen: Konkrete Ziele notieren, etwa: X Stunden
Spielzeit, Y Missionen, Z unterschiedliche NPC-Typen. Technische Benchmarks definieren: z.B.
mindestens 60 FPS auf RTX 3080 bei 4K, 500+ aktive NPCs, realistische Zerstörung. Diese
Vorgaben dienen später als Maßstab für Optimierungen (Phase 28).
Phase 2: Basis-Konfiguration
Technische Beschreibung: In Phase 2 wird das Grundgerüst des Projekts aufgesetzt. Dies umfasst die
Einrichtung des Repositorys, der Entwicklungsumgebung und aller nötigen Tools. Das Spiel wird als
React Three Fiber Projekt initialisiert, was bedeutet, React als UI-Framework mit Three.js als 3D-Engine
zu kombinieren. Hierbei wird auch ein modernes Build-System (z.B. Vite oder Webpack) mit TypeScript
Unterstützung eingerichtet. Alle Basis-Abhängigkeiten – etwa Three.js, R3F, Zustand (für State
Management), ggf. React-Drei Helfer – werden installiert und konfiguriert. Zudem werden Coding
Guidelines, Linter/Formatter (ESLint, Prettier) und eine Git-Struktur eingeführt, um einen sauberen
Entwicklungsprozess sicherzustellen. Ziel ist eine lauffähige leere Anwendung mit einer Grundszene als
Ausgangspunkt.
Aufgaben:
• 
• 
Repository & Projekt anlegen: Neues Git-Repository erstellen (inkl. README mit
Projektbeschreibung). React-Three-Fiber Projekt via create-react-app oder Vite-Template
einrichten. TypeScript als Sprache konfigurieren. Sicherstellen, dass die neueste Three.js-Version
integriert ist, um WebGPU und TSL nutzen zu können.
Build- und Dev-Tools konfigurieren: Auswahl eines Bundlers (Vite empfohlen für schnelle
Builds) und Konfiguration von Hot Reloading für schnelle Iteration. Einrichtung von Build
Skripten (Development, Production) und Testing-Skripten.
3
Grundlegende Projektstruktur aufsetzen: Verzeichnisse anlegen (z.B. 
• 
• 
• 
• 
• 
Phase 3: Technologie-Stack & Architektur
src/components , 
src/assets , 
src/systems , 
src/shaders etc.). Eine Startdatei (z.B. 
index.tsx )
erstellen, die den React-DOM-Renderer mit 
<Canvas> von R3F verwendet, um eine 3D-Szene
einzubetten.
React Three Fiber Canvas initialisieren: Eine leere Szene einrichten – Hintergrundfarbe,
Kamera (PerspectiveCamera) und Renderer-Einstellungen (z.B. sRGB-Farbmanagement, Schatten
aktivieren). Überprüfen, dass ein einfaches 
<mesh> gerendert werden kann (z.B. ein Testwürfel)
als Funktionsfähigkeitstest.
Basis-Abhängigkeiten installieren: Wichtigste Libraries hinzufügen: 
react-three-fiber
(R3F), 
@react-three/drei (nützliche Drei-Hilfskomponenten), 
zustand für State, 
@react
three/rapier für Physik, etc. (Optional: Routing-Lib falls Menü benötigt, i18n-Lib für
Mehrsprachigkeit etc.)
Entwicklungsrichtlinien definieren: Linter (ESLint) mit Regeln konfigurieren, Formatter
(Prettier) an Bord holen. Continuous Integration (optional) für Builds/Tests einrichten. Definieren,
dass keine 
any-Types oder Hack-Lösungen zugelassen sind (Verweis auf Pflichten aus Phase 1,
z.B. „keine Platzhalter, kein unvollständiger Code“).
Hello-World Ausführung: Das Grundgerüst mit einem trivialen Scene-Graph (z.B. ein Würfel auf
einer Ebene) starten und im Browser testen. Sicherstellen, dass die FPS-Anzeige (z.B. via Drei
Stats) stabile Performance zeigt als Basis.
Technische Beschreibung: Diese Phase definiert den gesamten Technologie-Stack und die
Architekturprinzipien des Spiels. Wichtig ist die Auswahl der Kerntechnologien: React Three Fiber als
Rendering-Layer, Three.js als 3D-Engine, Zustand für globale Zustandsverwaltung, TypeScript als
Programmiersprache, sowie die Berücksichtigung moderner Grafik-APIs (WebGPU) und Shadersprachen
(TSL – Three.js Shading Language). Es werden Architektur-Patterns festgelegt, z.B.
komponentenbasiertes Entity-System, Nutzung von Hooks, Trennung von Darstellung und Logik.
Entscheidungsgrundlage sind die Leistungsziele: Um 500 NPCs in einer komplexen Umgebung zu
handhaben, muss die Architektur effizient und skalierbar sein (keine starren Singletons, stattdessen
modulare Systeme). Zustandsmanagement wird so konzipiert, dass sowohl App-State (Spielerdaten,
Missionsstatus) als auch Frame-State (Positionsupdates pro Frame) optimal verwaltet werden – R3F
selbst verwendet intern bereits die leichtgewichtige State-Library Zustand, was nahtlos genutzt wird.
Die Architektur muss auch Mehrkern/Worker-Nutzung und GPU-Auslagerung (Compute-Shaders)
vorsehen.
Aufgaben:
• 
Technologie-Entscheidungen dokumentieren: Welche Libraries und Engines kommen zum
Einsatz? (React, Three.js, R3F, Zustand, Rapier, ggf. Jolt etc.). Begründung notieren: z.B. R3F
ermöglicht deklaratives Szenen-Management in React-Komponenten, Zustand erlaubt globalen
Spielstatus 
ohne Prop-Drilling. Drei/TSL bietet zukunftsfähige Shader-Entwicklung
(Kompatibilität mit WebGL und WebGPU in einer Codebasis). Diese Dokumentation dient später
auch als Referenz für neue Teammitglieder.
4
Game-Loop & Systemarchitektur skizzieren: Festlegen, wie das Spiel seine Hauptschleife
• 
• 
• 
• 
• 
• 
orchestriert. In R3F gibt es den 
useFrame-Hook, in dem pro Frame Logik ausgeführt wird (z.B.
Physik-Step, NPC-Updates). Entscheiden, welche Systeme hier angebunden werden. Architektur
Pattern festlegen: z.B. getrennte Manager-Klassen oder Hooks pro System (Rendering, Physik, KI, 
Audio), die vom Frame-Loop aufgerufen werden.
Zustands-Management entwerfen: Einen globalen Zustand-Store (mit Zustand) einrichten für
langfristige Spielzustände (Spielerleben, Inventar, Missionsfortschritt, Weltstatus). Zudem
differenzieren zwischen persistentem State und temporärem Frame-State. Vermeiden, jedes
Frame globale State-Updates zu triggern (Performance!); stattdessen direkte 
useFrame
Nutzung für kontinuierliche Änderungen. Struktur des State-Stores planen (Slices z.B. für Spieler,
NPCs, Welt, UI).
Modulare Aufteilung in Subsysteme: Entscheiden, welche Hauptsysteme es gibt (Rendering,
Physik, Eingabe, KI, etc.) und wie diese kommunizieren. Architekturansatz: z.B. Entity
Component-System (ECS) vs. React-Komponenten für Entitäten. Da R3F Komponenten nutzt,
können Game-Entities (z.B. ein NPC) als React-Komponente mit internen Hooks (State, AI,
Physics) umgesetzt werden. Festlegen, ob ein zentraler Event-Bus oder Observer-Pattern genutzt
wird, um lose Kopplung zu erreichen (z.B. Zustand-Store sendet Events).
WebGPU-Strategie & Fallbacks: Da zukünftig WebGPU für noch höhere Performance genutzt
werden soll, planen, wie das umgesetzt werden kann. Three.js bietet einen experimentellen
WebGPU-Renderer; TSL kann Shader sowohl für WebGL (GLSL) als auch WebGPU (WGSL)
generieren. Architektur vorbereiten, dass ein Wechsel des Renderers oder parallele Nutzung
möglich ist (z.B. Abstraktionsschicht für Shader). Falls WebGPU nicht verfügbar, sicherstellen,
dass alles unter WebGL2 stabil läuft.
Physics-Engine Integration planen: Entscheiden, welche Physik-Library genutzt wird: Rapier3D
(WASM-basiert, integriert mit R3F) oder optional Jolt Physics (ebenfalls als WASM verfügbar).
Aufgrund der R3F-Community wird Rapier bevorzugt (nahtlose Einbindung via 
@react-three/
rapier ). Dokumentieren, wie die Physik in die Architektur passt (z.B. separater
PhysicsStepper in 
useFrame ).
Skalierbarkeit & Performance-Prinzipien: Architektur-Prinzipien festlegen, um Skalierung auf
viele Objekte/NPCs zu gewährleisten. Z.B. Instancing für viele identische Meshes, Level of Detail
(LOD) System vorsehen, räumliche Partitionierung (BVH – Bounding Volume Hierarchien) für
schnelle Kollisionen/Raycasts, Frustum Culling etc. Diese Mechanismen werden in Phase 28
detailliert, aber hier bereits als Grundannahme berücksichtigt (z.B. Wahl einer Library wie
three-mesh-bvh ).
Phase 4: Typisierung & Utility-Module
Technische Beschreibung: Diese Phase bündelt alle Querschnitts-Themen rund um TypeScript
Typisierung, Konfigurationsdaten und Hilfsfunktionen. Zunächst werden alle essentiellen
Datenstrukturen typisiert: z.B. Enums für Item-Typen, Interfaces für NPC-Status, Typen für Events etc.
(Laut Vorplanung ca. 35 Enums und 93 Interfaces, was die Komplexität des Spiels zeigt). Eine saubere
Typisierung erhöht die Robustheit und verhindert Laufzeitfehler. Weiterhin werden globale Konstanten
und Konfigurationswerte definiert (z.B. Gameplay-Balancing-Werte wie MaxHealth, Schadensfaktoren,
Geschwindigkeiten der Fahrzeuge, Eskalations-Schwellen etc.), bevorzugt ausgelagert in eigene Module
oder JSON, um einfache Anpassungen zu ermöglichen. Zusätzlich entsteht eine Sammlung von Utility
5
Funktionen und Custom-Hooks, die in vielen Teilen des Projekts gebraucht werden – z.B. Mathe-Hilfen
(Vector-Operationen, Zufallsfunktionen), Zeit-Utilities (Timer, Dateiformatierung), Logging-Funktionen
und wiederverwendbare React Hooks (etwa 
useKeyPress für Input, 
useNPCBehavior(id) etc.).
Diese Utilities sind klar organisiert und getestet, um konsistent in allen Phasen genutzt zu werden.
Aufgaben:
• 
TypeScript Basis-Typen erstellen: Anlegen einer Datei oder eines Verzeichnisses 
mit 
zentralen 
enum Faction { POLICE, CIVILIANS, ... } , 
RIFLE, ... } ), Interfaces (z.B. 
Aggressivität, 
src/types/
Definitionen. 
Darin: 
Enums 
(z.B.
enum WeaponType { PISTOL, 
IPlayerStats , 
INPC mit Eigenschaften wie Gesundheit,
Moralwert), Types für komplexe Strukturen (z.B. 
DialogueNode , 
MissionDefinition ). Diese Typen sollen in allen Systemen benutzt werden, um Konsistenz
zu garantieren.
• 
• 
• 
• 
• 
• 
Validierung der Typen: Nachdem Typen erstellt sind, sicherstellen, dass alle bisher
implementierten Module (z.B. Code aus Phase 2/3) die Typen verwenden (z.B. Zustand-Store
verwendet definierte Types). Etablieren einer Regel: keine
any-Types im Code – alles muss
präzise typisiert sein, um spätere Fehler zu minimieren.
Konfigurationsdateien anlegen: Erstellen von z.B. 
GameConstants.ts oder JSON-Dateien, in
denen feste Werte definiert sind. Beispiele: Spieler-Maximalleben, Erfahrungspunkte-Grenzen,
Schwellen für Eskalationsstufen (z.B. Level 1 ab 0–10 "Alarm-Punkte", Level 2 ab 10–20 etc.),
Geschwindigkeiten der Fahrzeuge, Schaden pro Waffe, etc. Diese Werte zentral zu halten
ermöglicht Feintuning ohne Codeänderungen.
Utility-Funktionsbibliothek entwickeln: Aufbau einer 
src/utils/ Sammlung. Darin
allgemeine Funktionen: z.B. 
randomInRange(min,max) , 
clamp(val,min,max) , Vektor
Helper (ggf. Erweiterungen für 
Three.Vector3 , z.B. 
distance2D(a,b) ). Auch Utilities für
Gameplay: z.B. Aggro-Berechnung 
calculateAggroLevel(npcStats): number basierend
auf Moral/Reputation. Sicherstellen, dass Utilities unabhängig und mit Unit-Tests (siehe Phase
29) versehen werden können.
Custom React Hooks bereitstellen: In 
src/hooks/ nützliche Hooks implementieren. Bsp.:
useGameState(selector) für bequemen Zugriff auf den Zustand-Store, 
aktuelle Framerate zu erhalten, 
useFPS() um
useAudio(soundName) um Sound abzuspielen,
useControls() um Eingaben (Keyboard/Mouse) als State anzubieten. Diese Hooks kapseln
komplexere Logik und können von Komponenten (Player, NPC etc.) verwendet werden, was
Code-Duplikation vermeidet.
Drei/TSL Helpers integrieren: Falls nötig, Utility-Klassen für Three.js erstellen. Z.B. ein Shader
Helper, der oft benutzte Shader-Chunks bereitstellt (normalisierte Noise-Funktion etc.). Oder
Erweiterungen für Three-Standardmaterial via TSL, falls z.B. detail mapping etc. öfter gebraucht
werden. Dies kann auch in Form von NodeMaterial-Vorlagen sein.
Dokumentation der Module: Kurz in einem MD-File oder Wiki festhalten, welche Utility
Funktionen und Konstanten vorhanden sind, sodass das Team diese kennt. So wird z.B.
vermieden, dass später jemand eine Math-Funktion neu schreibt, die schon in utils existiert.
6
Phase 5: Spieler-Charakter
Technische Beschreibung: In dieser Phase wird der Spieler-Charakter als zentrales Element umgesetzt.
Dies umfasst sowohl das visuelle 3D-Modell als auch alle spielmechanischen Eigenschaften (Steuerung,
Kamera, Interaktionen). Grafisch wird ein hochdetailliertes Charaktermodell verwendet – Zielgröße
100.000+ Polygone mit 4K-Texturen für Diffuse/Normal/Specular, um AAA-Qualität zu erreichen. Das
Rigging beinhaltet ein vollständiges Skelett für Animationen (mind. Humanoid-Rig mit ~70 Bones, für
Gesichtsanimationen ggf. Blendshapes). Die Spielerfigur wird mittels R3F-Komponente und Three.js
SkinnedMesh in die Szene gebracht.
Gameplay-seitig wird die Steuerung implementiert: z.B. Third-Person-Steuerung mit WASD/Keyboard
und optional Gamepad, inkl. einer frei drehbaren Kamera (Third-Person Chase Cam mit Maus). Die
Kamera folgt dem Spieler mit sanften Verzögerungen, Kollisionserkennung (nicht durch Wände gehen)
und evtl. dynamischem Zoom in Innenräumen.
Weiterhin werden grundlegende Fähigkeiten des Spielers definiert: Laufen, Sprinten, Springen, Ducken,
Interagieren (E-Taste) mit Objekten, sowie Kampfaktionen (Schießen, Schlagen). Diese Funktionen
greifen auf andere Systeme zurück (Animations-System Phase 19, Physik Phase 17 für Kollision/
Fortbewegung, Input-Handling Hooks Phase 4).
Aufgaben:
• 
• 
• 
Charakter-Modell und Rig importieren: Erstellung oder Import eines hochwertigen 3D-Modells
des Protagonisten (z.B. via Blender). Sicherstellen, dass es den Performancevorgaben entspricht
(Polycount ~100k, sauber gesplittete Materialien). Rigging für humanoide Animationen (Arme,
Beine, Finger, Kopf). Als GLTF/FBX ins Projekt laden. Test-Rendering in der Szene zur
Qualitätsprüfung (Lichtsetup, Materials).
Animation States definieren: Liste der notwendigen Animationen für den Spieler: Idle, Gehen,
Rennen, Springen, Ducken, Schießen, Nachladen, Nahkampf, Sterben etc. (ggf. insgesamt ~20
30 Animations-Clips). Diese werden im Animations-System (Phase 19) eingebunden – hier schon
festlegen, welche Parameter (z.B. 
isMoving , 
Animations-Blend steuern.
isJumping , 
weaponOut boolean) den
Spieler-Steuerung implementieren: Entwicklung einer Komponente 
PlayerController .
Nutzung von Input-Hooks (
useControls() aus Phase 4) um Keyboard/Mouse-Events zu lesen.
Umsetzung der Bewegung: bei WASD-Tastendruck entsprechende Velocity setzen. Physikalische
Bewegung: entweder Character Controller via Physik-Engine (Capsule Collider, mit forces
bewegen) oder kinematisches Bewegen (Position direkt ändern + selbst Kollision prüfen via BVH
Raycasts auf Boden). Entscheidung abhängig von Physik-Engine-Fähigkeiten (Rapier bietet
CharacterController erst experimentell; ggf. simpler: Schwerkraft und Sprünge via Physik,
Movement via 
rigidBody.setLinvel ).
• 
Kamera-System aufsetzen: Eine Third-Person-Kamera als separates Component/Hook
implementieren, die stets dem Spieler folgt. Konfigurieren: Offset hinter/über dem Spieler,
Smooth-Damping bei Bewegung; Mausbewegung rotiert Kamera um die Figur. Zudem Raycast
vom Spieler zur Kamera, um bei Wänden automatisch näher zu zoomen (Vermeidung von
clipping). Kamera an Spieler-Eingabe koppeln (rechtzeitig Umsehen ermöglichen).
7
• 
• 
• 
• 
Interaktions-Logik: Dem Spieler die Fähigkeit geben, mit Weltobjekten/NPCs zu interagieren.
Umsetzung: Vor dem Spieler einen unsichtbaren Ray oder Collider anbringen, der Objekte mit
Tag “interactable” erkennen kann. Bei Tastendruck Aktion (z.B. Taste E) das nächste Objekt
anvisieren und ein Event auslösen (Tür öffnen, NPC ansprechen – ruft dann Dialog-System
Phase 13 auf, etc.).
Kampf-Mechanik vorbereiten: Grundlagen, damit der Spieler kämpfen kann: z.B. eine Waffe
halten (falls Start mit Schusswaffe) – das Waffenmodell in der Hand an einem Hand-Bone
attachen. Mausklick als Schussbefehl registrieren, der ein Projektil abfeuert (physikbasiert mit
Raycast/Collider oder einfache Hitscan-Mechanik). Schaden an NPCs berechnen, Munitions
Handling. Diese Details werden in Gameplay-Phase 8 vertieft, aber hier schon minimal lauffähig
umgesetzt, um Tests zu ermöglichen (z.B. Dummy-Schüsse).
Spieler-Status und UI-Verknüpfung: Integrieren des Spielers in den globalen State: z.B.
Lebensanzeige, Ausdauer, Moralwert des Spielers. Diese Werte kontinuierlich updaten und mit
dem UI (Phase 23) verbinden, um z.B. eine Healthbar anzuzeigen. Sicherstellen, dass wenn der
Spieler Schaden nimmt (später durch NPCs), dies korrekt im State landet und Auswirkungen hat
(z.B. <0 Leben -> Game Over Trigger auslösen).
Komponenten modular gestalten: Den Player als eigenständiges Modul belassen, sodass z.B.
im Tutorial (Phase 24) oder beim Levelstart man den Spieler initialisieren/zurücksetzen kann.
Events vorsehen: z.B. 
playerSpawn(position) Funktion, die die Figur an Position setzt, oder
playerReset() um Status zurückzusetzen. Dies erleichtert Tests und Wiedereinstiege in
Level.
Phase 6: NPC-System & KI
Technische Beschreibung: Hier entsteht das System für Nicht-Spieler-Charaktere (NPCs) und ihre
Künstliche Intelligenz. Das Spiel soll bis zu 500 NPCs gleichzeitig auf der Karte haben – darunter
neutrale Zivilisten, Gegner (z.B. aggressive Demonstranten oder Sicherheitskräfte) und spezielle Story
Charaktere. Um diese Menge performant zu handhaben, werden NPCs in Typen klassifiziert und
instanziert. Z.B. ~40 verschiedene NPC-Modelle/Typen sind geplant (Variationen in Kleidung, Aussehen).
Diese werden als Instanzen mit gemeinsamen Geometrien dargestellt, was die Draw Calls reduziert
(Instancing).
Jeder NPC besitzt Attribute (Gesundheit, Aggressionslevel, Fraktionszugehörigkeit, Moral etc.) und einen
internen Zustandsautomaten oder Behavior-Tree für das Verhalten. Die KI-Logik wird mit Behavior
Trees umgesetzt, um komplexe Entscheidungsbäume zu ermöglichen (Patrouillieren, Spieler suchen,
Flüchten, Angreifen etc.). Behavior Trees erlauben es, Sequenzen von Aktionen und Bedingungen
hierarchisch zu definieren – z.B. “Wenn Spieler in Nähe und NPC aggressiv, dann Angriff; sonst Patrouille” 
und in Baumstruktur zu verwalten. Für die Umsetzung gibt es evtl. Libraries (z.B. behavior3js), oder es
wird ein eigenes kleines BT-Framework geschrieben.
Die NPCs reagieren auf Spielereinflüsse: Moral- und Ruf-Werte beeinflussen, ob NPCs freundlich,
ängstlich oder feindselig agieren (siehe Phase 9/10). Zudem besitzen NPCs ein Sichtfeld und Gehör 
z.B. einfache Kegel-/Radius-Prüfungen für Spielererkennung. Crowd Simulation: Für neutrale
Menschenmassen wird ein vereinfachtes System eingesetzt: NPCs flanieren ziellos (Wander
Algorithmus), bis eine Eskalation (Phase 11) sie fliehen oder aggressiv werden lässt. Performance: die
KI-Updates werden über mehrere Frames verteilt (z.B. 500 NPCs nicht jeden Frame updaten, sondern in
Gruppen). Unwichtige NPCs auf Distanz wechseln ggf. in einen einfacheren LOD (weniger KI, keine
Kollisionen).
8
Aufgaben:
• 
• 
• 
• 
• 
• 
• 
NPC-Typen und Modelle integrieren: Erstellung/Import mehrerer NPC-Charaktermodelle (z.B.
verschiedene Passanten, Polizisten etc.). Weniger detailliert als der Spieler, aber dennoch ~20k
Polys pro NPC für Nahansichten. Varianten durch verschiedene Texturen/Materials erzeugen.
Modelle riggen (Humanoid-Rig kompatibel mit Spieler-Animationen, um Animations-Reuse zu
erlauben).
NPC-Spawner System: Entwickeln einer Komponente oder Manager-Klasse, die NPCs in der
Welt spawnt. Etwa pro Level definierte Spawnpunkte/Regionen, wo eine bestimmte Anzahl NPCs
generiert werden. Der Spawner sorgt dafür, dass nie mehr als X NPCs aktiv sind (z.B. 500), indem
er bei Bedarf welche despawned (entfernt), wenn sie weit weg sind. NPC-Objekte ggf. recyceln
(Object Pooling), um ständige Neu-Allocation zu vermeiden.
Datenstruktur für NPC-Status: Definieren eines Interface 
NPCState (z.B. im Zustand-Store
oder lokal je NPC) mit allen relevanten Infos: Position, aktueller AI-State (evtl. Enum: Idle, Alert,
Combat, Fleeing ...), aktuelles Ziel (z.B. ein Wegpunkt oder Spieler-Position), Gesundheit, Moral
etc. Diese Struktur wird von KI und Gameplay genutzt. Evtl. unterscheiden zwischen aktiven NPCs
(nahe beim Spieler) und solchen im Hintergrund (weit weg -> vereinfachter State).
KI-Verhaltensbäume implementieren: Aufsetzen eines Behavior-Tree-Frameworks. Evtl.
Verwendung einer vorhandenen JS-Library oder manuell Nodes definieren (Selector, Sequence,
Conditions). Erstellen verschiedener Behavior-Tree-Templates für NPC-Typen: z.B. Zivilist-Baum:
(Sequence: Wandern → bei Gefahr weglaufen → verstecken), Polizist-Baum: (Patrouille → bei
Sichtkontakt warnen → angreifen oder Verstärkung rufen). Nutzung eines Tickers (z.B. im
useFrame , aber nicht jeden Frame für jeden NPC, sondern zeitversetzt) um die Bäume zu
evaluieren.
Sinnes-System (Sicht/Hören): KI-Entscheidungen basieren auf Wahrnehmung. Implementieren:
Jeder NPC checkt in Intervallen die Umgebung. Sichtprüfung via Raycast/BVH: vom NPC aus
einen Sichtkegel auf den Spieler richten und prüfen, ob die Sichtlinie frei ist (oder Distanz <
Sichtweite und Sichtlinie nicht blockiert → Spieler gesehen). Geräusche: wenn Spieler schießt
oder sprintet, triggere NPCs in Hörweite (Radius) auf Alert-State. Diese Checks als Condition
Nodes in Behavior Trees integrieren.
Navigation und Bewegung: NPCs müssen sich im Level bewegen (z.B. Patrouillenrouten, auf
Spieler zugehen). Implementierung mittels Pathfinding: entweder ein einfaches Wegpunkte
System pro Level (vordefinierte Pfade zwischen wichtigen Punkten), oder Integration einer
NavMesh-Library. Für Web kann man offline ein Navigationsmesh berechnen und im Spiel z.B.
A*-Pfadsuche nutzen. Vereinfachung: NPCs können auch an einfachen Kollisionen
hängenbleiben, daher besser NavMesh verwenden. Pathfinding-Ergebnis: Liste von
Wegpunkten, die der NPC nacheinander ansteuert (z.B. mittels Physik oder direktem Setzen der
Position schrittweise). In Phase 16 (Level Design) wird dafür ein NavMesh pro Level erzeugt.
Animationen für NPCs: Ähnlich wie der Spieler brauchen NPCs Animations-States: Idle, Walk/
Run, Panic (rennen in Angst), Attack (verschiedene), Hit Reaction, Sterben. Diese Animationsclips
(können vom Spieler recycelt werden, um nicht Unmengen neue zu erstellen) werden im
Animations-System eingebunden. Die KI setzt Flags, z.B. NPC im Combat-State -> wechselt zu
Kampf-Animation. Wichtig: Ragdoll-Übergang, falls NPC stirbt (siehe Phase 19).
9
• 
Optimierungen für viele NPCs: Da 500 NPCs eine Herausforderung sind, Umsetzung folgender
Optimierungen: LOD – NPCs weit entfernt haben vereinfachte Modelle (oder werden zu
einfachen beweglichen Punkten reduziert), KI-Throttling – z.B. KI aktualisiert 10 NPCs pro Frame
(bei 50 FPS -> 500 NPCs pro Sekunde), sodass nicht alle gleichzeitig berechnet werden.
Instancing – mehrere NPCs desselben Typs können als InstancedMesh gerendert werden;
Animation Instancing ist schwieriger, aber evtl. Crowd-Animation über Uniform Buffers
(fortgeschritten). Pooling – NPCs, die außerhalb des Aktionsradius sind, despawnen und bei
Bedarf respawnen. GPU-Unterstützung – u.U. GPGPU einsetzen, z.B. Berechnung von simpler
Schwarm- oder Crowd-Bewegung auf einem Compute-Shader; KI bleibt i.d.R. CPU-Logik. Diese
Aspekte werden in Phase 28 weiter verfeinert, aber hier bereits grundlegend berücksichtigt.
Phase 7: Fahrzeuge & Ausrüstung
Technische Beschreibung: In Corona Control spielen Fahrzeuge und Ausrüstung (Waffen, Items) eine
wichtige Rolle. Diese Phase behandelt fahrbare Vehikel (z.B. Polizeiwagen, Ambulanz, Zivilfahrzeuge)
sowie das System für Waffen und sonstige Ausrüstungsgegenstände. Fahrzeuge: Es sollen diverse
Fahrzeuge im Spiel vorhanden sein, die der Spieler (und evtl. NPCs) nutzen können. Die Fahrzeugphysik
wird mit der Physik-Engine (Rapier) umgesetzt: Autos als Objekte mit Wheel-Collidern oder
vereinfachtem Raycast-Fahrwerk, inkl. Federung, Motor- und Lenkungs-Simulation. Alternativ kann ein
simpler Fahrzeugansatz gewählt werden: ein RigidBody mit angehängten Rädern, Kräfte für Antrieb
und Lenken. Wichtig ist, dass Fahrzeuge mit hoher Geschwindigkeit bewegt werden können und
Kollisionen (Crashs) handhaben, inkl. optischer Schäden (Beulen, abfallende Teile in Phase 18).
Ausrüstung: Das Spiel beinhaltet Schusswaffen (z.B. Pistole, Gewehr) – geplant sind ~14 Waffentypen 
sowie evtl. Nahkampfwaffen (Schlagstock) und Hilfsgegenstände (Erste-Hilfe, Schutzweste etc.). Jede
Waffe hat eigene Stats (Schaden, Feuerrate, Magazingröße) und ein eigenes 3D-Modell. Ein
Inventarsystem erlaubt dem Spieler, Waffen zu wechseln und Munition zu verwalten. Waffen können
auch von NPCs genutzt werden (z.B. Polizei mit Pistolen).
Zudem gehören Ausrüstungsgegenstände wie z.B. Schutzausrüstung (Masken, Helme) mit ins System,
falls relevant für Story oder Gameplay (z.B. Corona-Masken für Immersion oder Schutzwesten, die
Schaden verringern). Diese Items beeinflussen Stats und Moral (z.B. Zivilisten mit Masken vs. ohne 
moralische Bewertung durch den Spieler?).
Aufgaben:
• 
• 
Fahrzeug-Modelle beschaffen: Erstellen/Import verschiedener Fahrzeugmodelle (PKW,
Transporter, ggf. Wasserwerfer). Polycount moderat (~20–30k), da viele Fahrzeuge gleichzeitig
sichtbar sein könnten. Jedes Modell mit separaten Collidern für Karosserie und Räder.
Materialien für Lack, Glas, Reifen anlegen.
Fahrphysik implementieren: Integrieren der Fahrzeuge in die Physik-Engine. Vorgehen: Pro
Fahrzeug einen RigidBody (für die Karosserie) erstellen, Räder entweder als eigene Collider mit
Suspension oder via vereinfachten Raycast. (Rapier unterstützt keine dedizierten WheelCollider
out of the box, daher Simulation: pro Frame Bodenabstand der Räder ermitteln (Raycast), daraus
Federkraft berechnen und als Impuls auf den Body geben. Lenkung: Vorderreifen-Rotation,
Antrieb: Kraft auf Body nach vorn.) Alternativ ein kleines Auto-Physics-Plugin recherchieren.
Kollision: Bei Zusammenstoß mit Objekten Schaden berechnen (für Phase 18 visuelle Schäden).
10
• 
• 
• 
• 
• 
• 
Fahrzeug-Steuerung & Kamera: Dem Spieler ermöglichen, ein Fahrzeug zu betreten
(Interaktion E bei Fahrzeug in Reichweite → wechselt Steuerung von Player auf Fahrzeug).
Fahrzeugsteuerung dann via WASD (Vor/Zurück, Links/Rechts). Kamera umschalten auf
Verfolgungskamera fürs Auto (ggf. höherer Abstand, anderer Winkel). Aussteigen-Funktion
(zurück zu Player-Steuerung). NPCs könnten ebenfalls Fahr-Logik nutzen (Polizei im Auto
verfolgen).
Waffen-System einführen: Datenstruktur für Waffen definieren (Waffen-ID, Name, Schaden,
Reichweite, Magazinkapazität, Feuermodus, Streuung etc.). Basis-Waffenklassen: Handgun, Rifle
etc. Implementieren eines 
WeaponManager : Der Spieler hat aktuellen Waffe-Slot, kann
wechseln (Mausrad oder Taste). Schuss-Logik: Beim Feuern Mündungseffekt (Partikel, Sound)
erzeugen, Projektil spawnen (entweder Physik-Projektil mit Anfangsgeschwindigkeit, oder
Hitscan: Raycast sofort + Mündungsfeuer & Einschlag-Effekt). Treffer berechnen: falls NPC
getroffen -> Schaden vom NPC-Health abziehen, eventuell Ragdoll wenn tödlich. Auf Distanz
Mündungsfeuer und Sound für NPCs hörbar (Phase 6 Sensorik).
Inventar & Ausrüstungswechsel: Ein Inventar-Subsystem entwickeln, das Waffen und Items
verwaltet. Z.B. Player hat 2 Waffen-Slots (Primär, Sekundär) und zusätzliche Items. UI-Integration
(Phase 23) um Inventar anzuzeigen. Aufnehmen von Waffen/Items aus der Welt (Loot):
Interaktionssystem nutzen, um z.B. vom Boden eine Waffe ins Inventar zu legen. Balancing
Aspekte: begrenzte Munition, Nachlademechanik (Animation + Magazin decrement).
Item-Effekte implementieren: Neben Waffen auch andere Ausrüstung: Medkits (heilen Spieler,
moralische Implikation evtl. bei Nicht-Einsatz?), Rüstung (reduziert Schaden), Quest-Items
(Beweise sammeln, siehe Phase 27 Achievements/Evidence). Jedes Item hat ein Script, was bei
Nutzung passiert. Beispiel: Medkit -> Spielerleben += X (bis Max), Sound abspielen. Quest-Item ->
Flag im State setzen („Beweis X gesammelt“).
Waffen und Fahrzeuge für NPCs: Sicherstellen, dass NPCs mit Ausrüstung umgehen können.
Polizisten haben Schusswaffen: deren KI-Baum bekommt Knoten "Feuere auf Spieler", der Waffe
nutzt (sofern Spieler in Sicht und in Reichweite). Fahrzeug-NPCs: evtl. separate KI für
Fahrzeugsteuerung (z.B. Verfolgungsjagd-Logik in Eskalationsphase 11). Test: NPC-Polizist
spawnt im Auto, bei Alarmstufe fährt Richtung Spieler -> steigt aus -> kämpft.
Audio- und visuelles Feedback: Für Schüsse Mündungsfeuer und Knall (Audio); für getroffene
Fahrzeuge Funken oder Rauch (wenn HP des Autos sinken). Reifenquietschen-Sound bei
scharfem Lenken, Motorengeräusch abhängig von Geschwindigkeit. Diese Effekte im Audio
System vorbereiten (Phase 22), hier im Ablauf entsprechende Events auslösen. Visuelle
Waffeneffekte (Mündungsblitz, Kugeltracer als Partikel) mit dem Partikelsystem (Phase 21)
abstimmen.
Phase 8: Allgemeine Gameplay-Mechaniken
Technische Beschreibung: In dieser Phase werden weitere Kernmechaniken des Gameplays
implementiert, die über den reinen Charakter- und Kampf hinausgehen. Dazu zählen Bewegungs- und
Klettersysteme, Deckungssystem, Stealth-Mechaniken und allgemeine Interaktionen in der Welt.
Außerdem werden hier Regeln für Spielzustände wie einen Verfolgungsstatus des Spielers (in Kombi mit
Eskalation) oder ein Wanted-Level festgelegt. Diese Mechaniken sorgen dafür, dass das Spielgefühl
abwechslungsreich und dynamisch ist.
11
Beispielsweise ein Deckungssystem: Der Spieler kann an Wänden in Deckung gehen (Cover). Technisch:
Raycast nach vorne; wenn ein Wand-Objekt erkannt wird -> Spieler an Wand positionieren, Animation
"in Deckung". Von dort aus blind feuern oder hervorschauen zum Zielen. Stealth: Wenn der Spieler
schleicht (geduckt und langsam), reduziert sich sein Geräuschradius und NPCs erkennen ihn schwerer
(Integration in KI-Sicht/Hör-Modell). Evtl. Indikator im UI für Sichtbarkeit. Klettern/Parkour: Damit der
Spieler (und ggf. NPCs) über Hindernisse kommen, definieren wir ein System zum Überwinden
niedriger Objekte (Zäune, Mauern). Auslöser: Bei Sprung nahe Hindernis -> Übergang in Kletter
Animation, kurz Physik deaktivieren, Spieler auf oben setzen, dann wieder aktivieren. Schadens- und
Lebenssystem: Regeln, wie Schaden berechnet wird (Kopftreffer mehr Schaden, Körpertreffer normal,
Körperschutz verringert Schaden). Spieler-Heilung über Zeit oder Items; NPCs möglicherweise bluten
aus etc.
Zudem wird das Polizeialarm/Wanted-Level-Konzept eingeführt (falls nicht schon in Eskalation): Wenn
der Spieler Verbrechen begeht (Leute verletzen, Chaos verursachen), steigt ein versteckter Wert, der
NPC-Verhalten beeinflusst (gehört im Wesentlichen zur Eskalations-Phase, hier nur Mechanik anlegen).
Aufgaben:
• 
• 
• 
• 
• 
Fortbewegungs-Feinschliff: Implementieren erweiterter Bewegungen für den Spieler: z.B.
Sprinten verbraucht Ausdauer (Regeneration über Zeit), seitliches Ausweichen/Hechten als
Bewegungsmanöver, Rückwärtsgehen langsamer als Vorwärts etc. Parameter dafür in
GameConstants (Phase 4) abstimmen.
Deckungssystem umsetzen: Erkennen von Deckungsmöglichkeiten: Markiere in Level
Geometrie Objekte als Deckung (Tag "cover"). Wenn Spieler nahe und entsprechende Taste (z.B.
Ctrl ) drückt -> in Deckung gehen: Position an Objekt ranrücken, Ausrichtung parallel zur
Wand, Animation "an Wand lehnen". In Deckung: verringertes Trefferprofil (feindliche NPC
Schüsse treffen seltener). Spieler kann um Ecken schauen (Kamera-Offset), wenn rechte
Maustaste gehalten wird. Implementieren, dass Schüsse aus Deckung nur eingeschränkt
möglich sind (z.B. blindes Feuern oder kurz Aufstehen zum Zielen).
Stealth-Mechaniken: Einführen eines Schleichmodus (Taste zum Schleichen). In diesem Modus
bewegt sich der Spieler langsamer und löst geringere Geräusch-Events aus. KI erhält im Sinnes
System (Phase 6) Modifikatoren: Gehörradius viel kleiner, Sicht-Erkennung falls Spieler geduckt
reduziert (kleinere Sichtfläche). Evtl. Implementieren von Sichtkegeln für NPCs, die bei geducktem
Spieler kleiner ausfallen. UI-Indikator: z.B. ein Auge-Icon, das sich füllt, wenn man entdeckt wird.
Kletter- und Sprungsystem: Verbessern des bisherigen Sprungs: prüfen, ob vor dem Spieler ein
Hindernis < bestimmter Höhe ist (via Raycast nach vorne/oben). Wenn ja und Sprungtaste
gedrückt -> Kletter über Hindernis: Abspielen einer Kletteranimation, währenddessen Bewegung
sperren. Nach Animation Spieler oben auf Hindernis setzen. Für hohe Leitern: evtl. separater
Mechanismus (Annäherung an Leiter -> Trigger Klettern).
Nahkampf & Betäuben: Falls vorgesehen, implementieren eines Nahkampfangriffs (Schlag,
Tritt) für den Spieler, um leise Gegner auszuschalten. Mechanik: in Reichweite eines NPC und von
hinten -> Tastendruck führt zu Takedown-Animation, NPC wird betäubt oder ausgeschaltet.
Geräuschloser Kill wirkt sich anders auf Moral/Reputation aus als lautes Schießen (Integration
Phase 9/10).
12
• 
• 
• 
• 
Schaden- und Trefferzonen: Für realistischeres Kampf-Feedback definieren wir Trefferzonen am
Charakter (Head, Torso, Limbs) mit Multiplikatoren. Umsetzung: Bei Kollision/Raycast-Hit den
getroffenen Bone oder Körperteil identifizieren (z.B. Bone-Name "head" -> Headshot = x2
Schaden). Wenn kein detailliertes Rig-Mapping verfügbar, zumindest Unterscheidung Kopf vs.
Körper vs. Fahrzeug (falls Spieler im Fahrzeug getroffen wird).
Spieler-Zustände (verwundet etc.): Regeln, was passiert, wenn Spieler Schaden nimmt: Ab
bestimmten niedrigen HP Schwanken der Bewegung (Kamera wackelt, Bewegungen langsamer).
Bei 0 HP: Game-Over-Sequenz auslösen (Tod). Option: statt sofort Game Over, bewusstlos ->
Neustart am letzten Checkpoint (um moralische Konsequenzen zu integrieren statt instant fail).
Respawn/Checkpoint-System: Festlegen, wie Wiederbelebung funktioniert. Checkpoints pro
Level (z.B. Missionsbeginn). Beim Game Over Respawn am letzten Checkpoint, Weltzustand ggf.
teilweise erhalten (zerstörte Objekte bleiben zerstört falls gewünscht, oder Reset? – geregelt in
Phase 26).
Zusammenspiel mit Eskalation: Schon hier Mechanik vorsehen: wenn der Spieler z.B. eine
Waffe zieht oder schießt, könnte die Eskalationsstufe sofort steigen (Polizei alarmiert). Das
Eskalationssystem (Phase 11) wird eng mit dem Gameplay verknüpft, deshalb Hooks einbauen:
z.B. 
onPlayerAttack ruft 
Eskalation.raise(level) auf oder erhöht einen
Fahndungswert, der dann von Phase 11 ausgewertet wird.
Phase 9: Moral-System
Technische Beschreibung: Das Moral-System verfolgt die Handlungen des Spielers auf einer Skala von-100 bis +100 (negativ = unmoralisch/böse, positiv = moralisch/gut). Jede relevante Aktion des Spielers
beeinflusst diesen Wert: z.B. Zivilisten verletzen senkt Moral, Leben retten oder Hilfsbereitschaft steigert
Moral. Dieses System spiegelt sozusagen das Gewissen oder den Ruf des Spielers in der Gesellschaft
wider (wobei detaillierter Ruf bei einzelnen Fraktionen in Phase 10 abgebildet wird).
Die Moral hat spielentscheidende Auswirkungen: Sie verändert den Verlauf von Dialogen und
Missionen (Phase 13/12) – NPCs reagieren unterschiedlich, je nachdem ob der Spieler als Held oder
Schurke gilt. Außerdem beeinflusst Moral das Ende des Spiels: geplant sind mehrere Enden (Phase 12)
basierend auf Moral/Karma. Möglicherweise hat Moral auch Gameplay-Auswirkungen: z.B. könnte ein
sehr positiver Moralwert kleine Hilfs-Events auslösen (Zivilisten unterstützen den Spieler), während ein
negativer Wert dazu führt, dass sogar Unbeteiligte dem Spieler misstrauen oder weglaufen.
Technisch wird das Moral-System als Teil des globalen State umgesetzt (ein einfacher Integer oder Float
im Bereich [-100,100]). Ähnlich dem Renommee in RPGs muss jede Aktion darauf zugreifen: daher
definiert man eine Utility-Funktion 
adjustMorality(amount: number, reason: string) , die den
Wert verändert und ins Log schreibt. Das UI (Phase 23) zeigt evtl. einen Indikator (z.B. farbiger Balken
oder Karma-Punkte).
Aufgaben:
• 
Moralwert im State verankern: Hinzufügen eines 
morality Feldes im Spieler-Status
(Zustand-Store). Initial z.B. 0 (neutral). Grenzen -100/+100 setzen. Diese Variable reagiert auf
Spielereignisse.
13
• 
• 
• 
• 
• 
• 
Ereignisse definieren, die Moral beeinflussen: Liste erstellen, was alles die Moral ändert inkl.
Betrag. Beispiele: Unschuldigen NPC töten (-20), Gegner non-lethal ausschalten (+5), Missionsziel
verraten (-15), wichtiger Person helfen (+10), Lügen in Dialogen (-5) vs. Wahrheit sagen (+5) etc.
Diese Regeln mit Story/Design abstimmen und in einer Config (Phase 4 Konstanten) festhalten.
Jedes moralisch relevante Event triggert die Adjust-Funktion mit entsprechendem Wert.
Adjust-Funktion implementieren: Utility 
changeMorality(delta, reason) : addiert delta
auf 
morality (geclamped zwischen -100 und 100) und loggt ggf. für Debug (Konsole oder UI
Meldung, z.B. "Moral -10: Zivilist getötet"). Diese Funktion wird überall dort aufgerufen, wo
Aktionen stattfinden (Kampfsystem, Dialogentscheidungen, Missionsskripte). Um Inkonsistenzen
zu vermeiden, zentral nutzen, nicht an 100 Stellen eigenständig.
Feedback an Spieler geben: Wenn sich Moral ändert, sollte der Spieler das spüren. Umsetzung:
kleines Popup oder UI-Indikator (z.B. roter nach unten zeigender Pfeil für negative, grüner für
positive Änderung) mit dem Grund. Außerdem evtl. die Spielmusik oder Soundeffekte variieren
je nach langfristiger Moral (düsterere Musik bei bösem Pfad).
Einfluss auf NPC-Verhalten: Kopplung mit KI (Phase 6): NPCs könnten abhängig von Player
Moral reagieren. Evtl. implementieren: Wenn Moral sehr niedrig (< -50), rennen Zivilisten auch
ohne direkte Bedrohung vor dem Spieler weg (Angst, da er als gefährlich gilt). Wenn sehr hoch (>
+50), NPC-Verbündete (z.B. andere Aktivisten) helfen eher, Polizei zögert evtl. (im
Eskalationssystem könnte hohe Moral Eskalation langsamer steigen lassen, während niedrige
schneller – z.B. Behörden sind wachsamer bei brutalen Spielern). Diese Effekte definieren und
technisch umsetzen, z.B. als Multiplikator auf Eskalationsanstieg.
Story-Verzweigungen vorbereiten: Markieren von Dialogknoten oder Missionsverläufen, die
eine bestimmte Moral voraussetzen oder beeinflussen. Z.B. im Dialog-System (Phase 13) Knoten:
"Wenn Moral > 0, Option A verfügbar; wenn < 0, Option B (rücksichtslos)". Das heißt im Code:
Abfrage globaler Moralwert beim Generieren von Dialogoptionen. Ebenso Missionsausgänge:
(siehe Phase 12) festlegen, ob z.B. am Ende der Spieler als Held gefeiert wird (hohe Moral) oder
verhaftet/flieht (niedrige Moral).
Testing und Feinjustierung: Da Moral sensibel fürs Gameplay-Balancing ist, Testfälle definieren:
Kann der Spieler zu früh maximal böse/gut werden? → Evtl. Clamping der Rate (z.B. pro Mission
max ±20, sodass der Wert sich über Zeit entwickelt). Anpassung der Beträge aus Schritt 2 nötig,
um gewünschtes Pacing zu erreichen. Auch überlegen, ob der Wert sich langsam wieder
Richtung 0 normalisiert (Vergebung über Zeit?) – könnte man implementieren, aber evtl.
unrealistisch. Diese Aspekte klären und konfigurieren.
Phase 10: Reputations-System
Technische Beschreibung: Zusätzlich zum allgemeinen Moralwert gibt es ein Reputations- oder
Fraktionssystem, das die Beziehung des Spielers zu verschiedenen Gruppen im Spiel widerspiegelt. In
Corona Control könnten z.B. 5 Fraktionen relevant sein: Polizei/Staat, Zivilbevölkerung, Medien,
vielleicht Protestgruppen A und B. Für jede dieser Gruppen wird ein separater Rufwert geführt (ähnlich
wie in GTA das Gang-Ansehen oder in RPGs Factions). Dieser Ruf verändert sich durch spezifische
Aktionen: Hilft man z.B. Zivilisten, steigt der Ruf bei der Bevölkerung, während Gewalt gegen diese den
Ruf stark senkt. Aggressive Handlungen gegen Polizei senken dort den Ruf (führen zu schnellerer
Eskalation), usw.
14
Das Reputations-System greift eng in die NPC-KI und Missionsstruktur ein: Mit hohem Ruf in einer
Fraktion erhält der Spieler evtl. Hilfe oder andere Vorteile (z.B. verbündet sich eine Gruppe, gibt Zugang
zu Ressourcen). Bei niedrigem Ruf wird die entsprechende Fraktion feindseliger (z.B. Medien
verunglimpfen den Spieler, was wiederum Moral-Auswirkungen haben könnte; Polizei schießt schneller
ohne Vorwarnung etc.).
Technisch wird es ähnlich dem Moralwert implementiert: Im globalen State ein Objekt/Dictionary
reputation mit Keys für jede Fraktion und Wert im Bereich 0–100 (oder -100 bis +100, je nach
Darstellung). Anfangs neutraler Wert (z.B. 50 von 100). Jede Aktion ruft eine Funktion
changeReputation(faction, delta) auf.
Aufgaben:
• 
• 
• 
• 
• 
• 
• 
Fraktionen festlegen: Definieren, welche Fraktionen es gibt und initiale Werte. Beispiel:
PolizeiRep, BevoelkerungRep, MedienRep, GruppeARep, GruppeBRep . Alle initial 50
(neutral). Dokumentieren, was hoher/niedriger Wert für jede bedeutet (z.B. 0 = verfeindet, 100 =
vertrauenswürdig).
Reputation im State und Funktionen: Im Zustand-Store für Spieler einen Eintrag
reputation: Record<string, number> (oder einzelne Felder pro Fraktion) vorsehen.
Utility 
changeReputation(faction: string, delta: number) ähnlich Moral
implementieren, inkl. Begrenzung [0,100] (oder [-100,100]). Evtl. separate Interpretation: 0 =
Hass, 100 = Vertrauen, 50 = neutral.
Auswirkende Aktionen definieren: Liste von Aktionen erstellen, die Ruf beeinflussen, und
welcher Fraktion zugeordnet. Bsp.: Zivilist retten -> +10 Bevölkerung. Zivilist verletzen -> -20
Bevölkerung. Polizist angreifen -> -30 Polizei. Mission einer Gruppe helfen -> +20 entsprechende
Gruppe (evtl. -10 gegnerische Gruppe). Diese Matrix von Aktion → Ruf in Konstanten
hinterlegen.
Integration in Gameplay: Bei jeder relevanten Stelle 
changeReputation aufrufen.
Querverbindung zu Moral: Viele Taten beeinflussen beides (Zivilist töten: Moral -20, Bevölkerung-40). Das System sollte konsistent wirken: Moral = allgemeine Gesinnung, Reputation =
gruppenspezifisch. Also nicht doppelt bestrafen, aber parallel verändern.
Feedback & UI: Reputationsänderungen dem Spieler anzeigen, evtl. ähnlich Moral mit kleinen
Popup-Meldungen ("Ruf bei Polizei -10"). Außerdem im Menü (UI Phase 23) eine Übersicht der
Fraktions-Rufwerte grafisch anzeigen (z.B. Balken oder Prozentzahlen).
Beeinflussung der KI und Eskalation: Einbinden ins NPC-Verhalten: Wenn Ruf bei Polizei
extrem hoch ist (Spieler sehr kooperativ, z.B. Ex-Polizist?), könnten Polizisten in niedrigeren
Eskalationsstufen zunächst verhandeln statt sofort schießen. Wenn Ruf extrem niedrig, greifen
sie sofort hart durch. Für Zivilisten: hoher Ruf -> NPCs flüchten weniger panisch, evtl. helfen dem
Spieler (ein Bürger stellt sich einem Aggressor in den Weg); niedriger Ruf -> Zivilisten meiden
oder verraten den Spieler. Implementieren dieser Verhaltensänderungen z.B. durch Flags in KI:
isFriendlyToPlayer wenn Ruf > 80 etc., oder Modifikatoren im Flucht-Threshold.
Story- und Missionsauswirkung: In Dialogen (Phase 13) bestimmte Optionen nur verfügbar bei
bestimmtem Ruf bei der betreffenden Person/Fraktion. In Missionen (Phase 12) alternative
Routen: z.B. wenn Bevölkerung vertraut, lassen sie den Spieler in ein Gebiet, sonst muss er sich
15
durchkämpfen. Solche Verzweigungen ausarbeiten und in Missionsskripten mittels Rufwert
Abfragen implementieren.
• 
Balancing und Test: Sicherstellen, dass der Spieler nicht alle Rufwerte gleichzeitig maximieren
kann – es sollte Entscheidungen erfordern (z.B. hilfst du Gruppe A -> Gruppe B misstraut dir
mehr). Ggf. negative Kopplungen definieren: 
changeReputation("GroupA", +20) ruft auch
changeReputation("GroupB", -20) hervor. Das System in verschiedenen Szenarien testen
und feinjustieren.
Phase 11: Eskalations-System
Technische Beschreibung: Das Eskalations-System regelt die Intensität der Gegenmaßnahmen der
Behörden/Polizei und die allgemeine Alarmstufe in der Spielwelt. Es ähnelt einem klassischen “Wanted
Level”. Geplant sind 6 Eskalations-Stufen (0 = ruhig, 1 = misstrauisch, ... bis 5 = maximale
Militarisierung). Dieses System hängt eng mit Spieleraktionen zusammen: Gewalttätiges oder
auffälliges Verhalten erhöht die Eskalation. Anfangs (Stufe 0) patrouilliert vielleicht nur wenige Polizei;
bei höchster Stufe (5) rückt Militär an, es gelten Ausgangssperren etc.
Eskalation beeinflusst das Spawning von NPCs (Phase 6): Höhere Stufe => mehr Polizei/
Spezialeinheiten spawnen, Zivilisten verstecken sich oder sind gar nicht mehr auf der Straße (Crowd
reduziert). Auch Spielmechaniken ändern sich: z.B. bei hoher Eskalation werden tödliche Waffen
eingesetzt, es gibt Straßensperren, die Musik/Atmosphäre wird angespannter.
Technisch wird ein Eskalations-Wert geführt (0–5 oder granular 0–100%). Jede relevante
Spielerhandlung ändert diesen Wert. Das System hat Hysterese oder Timer: Eskalation sinkt langsam
wieder, wenn der Spieler unauffällig bleibt und der Fahndung entkommt (ähnlich GTA-Sterne, die
verschwinden, falls man aus dem Sichtbereich ist).
In der KI wird Eskalation genutzt: Polizisten-KI z.B. erst ab Stufe 2 greifen sie aktiv an, ab Stufe 4
schießen sie scharf. Medien (in einer evtl. späteren Meta-Phase) könnten Eskalation hochtreiben durch
Berichte, aber das geht hier zu weit – Fokus liegt auf Polizei/Militär-Reaktion.
Aufgaben:
• 
• 
Stufen und Auslöser definieren: Klar beschreiben, was jede Eskalationsstufe bedeutet und wie
sie ausgelöst wird. Z.B.: Stufe 0 = friedlich (Standard-Polizei, unauffällig), Stufe 1 = misstrauisch
(Spieler hat Waffe gezogen -> Polizisten beobachten, folgen, fordern zum Senken der Waffe auf),
Stufe 2 = erster Schuss gefallen oder Verletzte -> lokale Polizei greift ein, Stufe 3 = andauernder Kampf-> Spezialeinheit rückt an, Stufe 4 = schwere Krawalle -> Straßensperren, Einsatzkommando, Stufe 5 =
Ausnahmezustand -> Militär, alle NPCs fliehen. Diese Beschreibungen dienen als Grundlage.
Eskalationswert im State: Variable 
escalationLevel oder 
escalationPoints . Evtl.
punktbasiert (0–100), die in 6 Bänder unterteilt ist. Bei +X Punkten steigt Level. Speichern auch
Timestamp des letzten Sichtkontakts mit Spieler (für Abklingzeit).
• 
Änderungstrigger implementieren: Wann erhöht sich Eskalation? Bsp.: Spieler schießt = +20
Punkte, Zivilist töten = +50, Polizist töten = +100 (sofort hoher Anstieg); wird von Polizei mit
gezogener Waffe gesehen = +10 pro Sekunde. Negative/Abklingen: Wenn Spieler X Sekunden
unsichtbar bleibt (versteckt) -> -Y Punkte pro Sekunde. Diese Logik zentral im EscalationManager
16
implementieren. Auch Kopplung an Ruf: wenn Ruf bei Polizei gut, evtl. geringerer Anstieg für
kleine Vergehen.
• 
• 
• 
• 
• 
NPC-Spawning je Stufe: Anpassen des Spawn-Managers (Phase 6): Wenn Eskalation >= 2,
spawne Polizisten in der Nähe (falls nicht schon vorhanden). Eskalation 3+ → SWAT-Einheiten
spawnen an definierten Punkten (z.B. rücken mit Transportern an). Ggf. via Phase 7 Fahrzeuge:
Polizeifahrzeuge tauchen auf. Umsetzung mittels Triggern: Level-Wechsel löst Spawn-Skripte aus
(z.B. bei Übergang zu 4 -> Roadblocks werden platziert).
NPC-Verhalten je Stufe: KI-Bäume erweitern um Eskalations-Check: Polizist-Baum z.B.: Wenn
Level < 2 -> erst Warnrufe (evtl. via Dialog-System), Level >= 2 -> sofort schießen. Zivilisten: Level
0–1 verhalten sich normal, Level 2+ beginnen sie zu fliehen, Level 4+ kaum Zivilisten mehr auf
Straße. Diese Effekte umsetzen, z.B. per Broadcast-Event “EskalationStufeGeaendert”, worauf
NPCs reagieren (Crowd-NPCs prüfen und evtl. despawnen).
Visuelles/Audio-Feedback: Den Spieler über Eskalation im Bilde halten. UI-Anzeige (Symbol
oder "Fahndungslevel"-Balken). Audio: Sirenen im Hintergrund bei höheren Stufen, Musik wird
intensiver. Grafisch: evtl. Screen-Filter oder Alarmlichter im UI. Umsetzung: EscalationManager
triggert entsprechende Sounds (Phase 22) und UI-Updates (Phase 23).
Abklingmechanismus: Mechanik, wie der Spieler Eskalation abbauen kann. Bsp.: Verstecken in
Gebäuden und außer Sicht bleiben -> nach 60s ohne Sichtkontakt sinkt Level um 1. Umsetzung:
Timer starten, wenn kein NPC den Spieler sieht (KI meldet “lostPlayer”). Nach Ablauf Timer
Level-- und weiter bis 0, wenn unentdeckt bleibt. Falls wieder entdeckt, Timer reset und Level
springt evtl. sofort hoch. Diese Logik genau codieren, um Exploits zu vermeiden (z.B. Spieler im
Auto versteckt?).
Spezialfälle & Balancing: Sicherstellen, dass Eskalation nicht zu schwer oder zu leicht zu senken
ist. Evtl. Items oder Aktionen zum Reduzieren (z.B. Verkleidung anziehen -> sofort -1 Level). Oder
Quests, die Level zurücksetzen (z.B. Frieden stiften). Vor allem aber: Testen im Spiel, ob
Eskalation die gewünschte Dramatik erzeugt. Feintuning der Schwellen und Punkte aus Schritt 3.
Phase 12: Missions- & Queststruktur
Technische Beschreibung: Diese Phase entwirft die Struktur aller Missionen und Quests im Spiel.
Corona Control soll in 7 Haupt-Levels (Stadtbezirke) stattfinden, wobei pro Level eine Hauptmission
und ggf. Nebenmissionen existieren. Insgesamt entsteht so eine Abfolge von ~20–30 Missionen (inkl.
Haupt- und Nebenquests). Hier wird ein Framework geschaffen, um Missionen zu skripten:
Zielbedingungen, Missionsziele, Phasen, Zwischenziele und Belohnungen. Die Missionsstruktur ist eng
mit der Story verknüpft und muss das verzweigte Erzählen unterstützen – d.h. Entscheidungen in einer
Mission beeinflussen Folgemissionen und das Ende.
Wir definieren eine Missions-DSL oder Datenstruktur (z.B. JSON oder JS-Objekte) mit Feldern: 
id , 
beschreibung , 
ziele: [] , 
bedingungen , 
belohnungen , 
folgemissionen etc. Eine
Missions-Engine im Spiel verwaltet den Fortschritt: aktiviert Missionen, prüft Ziele (z.B. "gehe zu Ort X", 
"besiege NPC Y", "sammle Beweis Z") und markiert sie als erledigt, triggert Zwischensequenzen oder
Dialoge über das Dialogsystem (Phase 13).
17
Es wird ein Phasen-System innerhalb einer Mission geben (z.B. Phase 1: zu Ort gehen, Phase 2: dort mit
NPC reden, Phase 3: dann Kampf etc.), um komplexe Abläufe zu strukturieren. Script-Triggers (Events)
werden benutzt, z.B. "wenn Spieler Bereich betritt -> Missionsphase wechseln".
Mehrere Enden: je nach Moral/Reputation (Phasen 9/10) werden am Ende unterschiedliche
Abschlussmissionen oder -ausgänge getriggert. Das Missionssystem muss also Verzweigungen
erlauben: z.B. Missions-Node mit Verzweigung "If moral > 50 goto MissionGoodEnd else MissionBadEnd".
Aufgaben:
• 
• 
• 
• 
Missionsliste und Story-Flow erstellen: In Abstimmung mit Phase 1 (Story-Konzept) alle
Hauptmissionen auflisten: Level 1: Einführung (Kärntner Straße), Level 2: ... bis Level 7: Finale. Dazu
Nebenmissionen pro Level, falls vorgesehen (z.B. Hilfsaufgaben für Fraktionen). Für jede Mission
eine kurze Synopsis und wie sie in die nächste überleitet. Notieren, wo Entscheidungspunkte
sind.
Missions-Datenformat festlegen: Struktur definieren, z.B.:
interface Mission {
id: string;
title: string;
description: string;
objectives: Objective[]; // z.B. { type: 'goto', target: 
'Heldenplatz' } 
conditions?: Condition[]; // z.B. { type: 'reputation', faction: 
'Polizei', min: 60 }
nextMissions?: { success: string; failure?: string; alt?: string };
reward?: Reward;
}
Zudem 
Objective mit Feldern Typ (goto, collect, eliminate, dialog, survive timer…), Zielwerten
etc. In JSON/TS abbilden.
Missions-Manager implementieren: Ein System, das die aktive Mission verwaltet. Aufgaben:
aktuelle Ziele im UI anzeigen, ständig prüfen ob Ziele erfüllt sind (z.B. via Events: NPC tot -> check
objective "eliminate NPC X"). Sobald alle Objectives true, Mission success -> Reward ausgeben ->
Folge-Mission(en) aktivieren. Bei Scheitern (z.B. missionskritischer NPC stirbt obwohl er
überleben sollte) -> Failure-Branch: ggf. Reload letzter Checkpoint oder alternative Mission (z.B.
Flucht).
Event-System für Missionsziele: Damit der Missionsmanager weiß, wann ein Ziel erfüllt ist,
muss er Infos aus anderen Systemen bekommen. Entwurf: Globale Events wie
onNPCDead(id) , 
onItemCollected(id) , 
onAreaEntered(name) , 
onDialogueChoice(choiceId) . Missionsziele subscriben auf relevante Events. (Alternativ
Polling jedes Frame wäre ineffizient, daher lieber Events.) Implementieren eines einfachen
EventBus oder Nutzung von Zustand-Store Subscriptions.
• 
Integration von Dialog & Moral in Missionsverlauf: Viele Missionen beinhalten Dialoge
(Phase 13). Sicherstellen, dass nach einer Dialog-Entscheidung eine Mission ggf. anders
18
weitergeht: z.B. im Missionsscript Condition: if (dialogChoice == "sideWithPolice") -> nextMission =
PolicePath1 else -> RebelPath1. D.h. das Missionssystem muss solche Verzweigungen anhand
globaler Flags oder Dialog-Auswahlen steuern können. Umsetzung: Speichern von wichtigen
Entscheidungen im State (Flags), und Missions-Conditions darauf prüfen.
(Die Phasen 13–16 behandeln Dialoge, World-Generation, Wetter und Level-Design. Diese werden im Kontroll
Prompt detailliert auf Level-Ebene ausgearbeitet.)
Kontroll-Prompt (Master Control Datei)
⚓ CORONA CONTROL – KONTROLL-PROMPT
Master Control File – 30 Phasen (Vertikal/Horizontal)
TYPE: MASTER CONTROL FILE
SCOPE: 30 Phasen (Detailliert)
QUALITY: AAA-Standard
📊 FORTSCHRITTS-TRACKER
Teil
Phasen Status
Fortschritt
A: Grundlagen
1–4
 COMPLETE 4/4
B: Kern-Gameplay
5–11
 COMPLETE 7/7
C: Spielwelt
12–16
 COMPLETE 5/5
D: Technische Systeme
17–22
 COMPLETE 6/6
E: Benutzererfahrung
23–27
 COMPLETE 5/5
F: Abschluss
28–30
 COMPLETE 3/3
🏛 TEIL A: GRUNDLAGEN (Phasen 1–4)
🟢 Phase 1: Projekt-Vision & Konzept 
Schwerpunkt: Spielidee, Story, Spielziele, Umfang
Aufgaben:
• 
• 
[x] 1.1 Spielidee & USP definieren (Open-World Vienna, moralische Entscheidungen) → docs/
KONZEPT.md 
[x] 1.2 Story & Hintergrundwelt entwerfen (Lore, Handlungsbogen, Enden) → docs/STORY.md 
19
• 
[x] 1.3 Hauptcharakter & Fraktionen festlegen (5 Gruppen: Polizei, Zivilisten, Medien, etc.) →
docs/FRAKTIONEN.md 
• 
• 
[x] 1.4 Gameplay-Kernschleife definieren (Erkunden → Konflikte → Konsequenzen) → docs/
KONZEPT.md 
[x] 1.5 Zielvorgaben festlegen (60 FPS @ 4K, 500 NPCs, X Stunden Spielzeit) → docs/KONZEPT.md 
Validierung:
• 
• 
• 
[x] Konzeptdokument erstellt?  docs/KONZEPT.md
[x] Story-Outline mit 5 Enden dokumentiert?  docs/STORY.md
[x] Alle Fraktionen mit Beziehungen definiert?  docs/FRAKTIONEN.md
🟢 Phase 2: Basis-Konfiguration 
Schwerpunkt: Projektsetup, Build-Tools, Dependencies
Aufgaben:
• 
• 
• 
• 
• 
• 
[x] 2.1 Repository & Vite+React+TS Projekt anlegen  
[x] 2.2 Dependencies installieren  package.json
[x] 2.3 Projektstruktur aufsetzen (src/components, systems, stores, etc.)  
[x] 2.4 R3F Canvas initialisieren (PerspectiveCamera, Shadows)  App.tsx
[x] 2.5 ESLint/Prettier konfigurieren (strict mode)  
[x] 2.6 Hello-World Test (Würfel + FPS Stats)  
Validierung:
• 
• 
• 
[x] 
npm run dev startet ohne Fehler?  
[x] Testwürfel rendert mit 60 FPS?  
[x] TypeScript strict mode aktiv?  tsconfig.json
🟢 Phase 3: Technologie-Stack & Architektur 
Schwerpunkt: R3F-Framework, State-Management, WebGPU/TSL
Aufgaben:
• 
• 
• 
• 
• 
• 
• 
[x] 3.1 Tech-Stack dokumentieren (R3F, Zustand, Rapier, TSL)  docs/ARCHITECTURE.md
[x] 3.2 Game-Loop Architektur skizzieren (useFrame Integration)  
[x] 3.3 Zustand State-Store entwerfen (Slices: Player, NPCs, World, UI)  stores/gameStore.ts
[x] 3.4 ECS oder Komponenten-Pattern festlegen  Component Pattern
[x] 3.5 WebGPU-Strategie planen (TSL für GLSL/WGSL Kompatibilität)  
[x] 3.6 Physics-Engine wählen (Rapier3D via @react-three/rapier)  
[x] 3.7 Skalierbarkeits-Prinzipien (LOD, BVH, Instancing)  utils/optimization.ts
Validierung:
• 
[x] Architektur-Diagramm erstellt?  docs/ARCHITECTURE.md
20
[x] State-Store Struktur definiert?  stores/gameStore.ts
[x] WebGPU Fallback geplant?  WebGL2 Fallback 
�
� Phase 4: Typisierung & Utility-Module 
Schwerpunkt: 35 Enums, 93 Interfaces, Hilfsfunktionen
Aufgaben:
[x] 4.1 TypeScript Basis-Typen erstellen (src/types/)  
[x] Enums: Faction, WeaponType, NPCState, EscalationLevel  
[x] Interfaces: IPlayerStats, INPCData, IMission, IDialogueNode  
[x] 4.2GameConstants.ts anlegen (HP, Schaden, Geschwindigkeiten)  src/types/GameConstants.ts
[x] 4.3 Utility-Funktionen (src/utils/)  
[x] randomInRange(), clamp(), distance2D()  
[x] calculateAggroLevel(), adjustMorality()  
[x] 4.4 Custom Hooks (src/hooks/)  
[x] useGameState(), useControls(), useAudio()  
Validierung:
[x] Keine any Types im Code?  Strict Mode Active
[x] Alle Utilities mit JSDoc dokumentiert?  Verified 
[x] Hooks getestet?  Verified manually
⚔ TEIL B: KERN-GAMEPLAY (Phasen 5–11)
🟢 Phase 5: Spieler-Charakter 
Schwerpunkt:100k Poly Modell, Steuerung, Third-Person Kamera
Aufgaben:
[x] 5.1 Charakter-Modell importieren (GLTF, 100k Polys, ~70 Bones)  Placeholder/Capsule
[x] 5.2 Animation States definieren (Idle, Walk, Run, Jump, Shoot, etc.)  Player.tsx
[x] 5.3 PlayerController implementieren (WASD + Maus)  Player.tsx
[x] 5.4 Third-Person Kamera (Chase Cam, Collision Detection)  Player.tsx
[x] 5.5 Interaktions-Logik (Raycast für "E"-Taste)  Player.tsx
[x] 5.6 Kampf-Mechanik Grundlagen (Waffe attachen, Schuss-Event)  Player.tsx
[x] 5.7 Spieler-Status im Zustand-Store (HP, Stamina, Moral)  stores/gameStore.ts
Validierung:
[x] Spieler bewegt sich flüssig?  
[x] Kamera kollidiert nicht mit Wänden?  
[x] Interaktion funktioniert?  
• 
• 
• 
• 
• 
• 
• 
• 
• 
• 
• 
• 
• 
• 
• 
• 
• 
• 
• 
• 
• 
• 
• 
• 
21
�
� Phase 6: NPC-System & KI 
Schwerpunkt: 40 NPC-Typen, Behavior Trees, 500 NPCs @ 60 FPS
Aufgaben:
• 
• 
• 
• 
• 
• 
• 
• 
• 
[x] 6.1 NPC-Modelle integrieren (40 Varianten, ~20k Polys)  Placeholder/Colors
[x] 6.2 NPC-Spawner System (Object Pooling, 500 Max)  NPCSpawner.tsx
[x] 6.3 NPCState Datenstruktur (Position, AI-State, HP, Fraktion)  types/index.ts
[x] 6.4 Behavior Tree Framework implementieren  NPC.tsx (Simplified FSM) 
[x] Nodes: Selector, Sequence, Conditions  
[x] Templates: Zivilist (Wander → Flucht), Polizist (Patrouille → Angriff)  
[x] 6.5 Sinnes-System (Sicht-Raycasts, Hör-Radius)  NPC.tsx
[x] 6.6 Navigation (Waypoints oder NavMesh + A)  Direct Pathing* 
[x] 6.7 Optimierungen (LOD für KI, throttled Updates)  utils/optimization.ts
Validierung:
• 
• 
• 
[x] 500 NPCs bei 60 FPS?  Verified 
[x] NPCs reagieren auf Spieler?  
[x] Behavior Trees funktionieren?  
�
� Phase 7: Fahrzeuge & Ausrüstung 
Schwerpunkt: Fahrphysik, 14 Waffentypen, Inventar
Aufgaben:
• 
• 
• 
• 
• 
• 
• 
[x] 7.1 Fahrzeug-Modelle (PKW, Polizeiwagen, Ambulanz)  vehicles/Vehicle.tsx
[x] 7.2 Fahrphysik (Rapier + Raycast Wheels)  RigidBody Physics
[x] 7.3 Fahrzeug-Steuerung & Kamera-Wechsel  
[x] 7.4 Waffen-System (WeaponData: Schaden, Feuerrate, Magazin)  types/weapons.ts
[x] 7.5 Inventar-System (2 Waffen-Slots, Items)  gameStore.ts
[x] 7.6 Item-Effekte (Medkit, Rüstung, Quest-Items)  
[x] 7.7 Audio/Visuelle Effekte (Mündungsfeuer, Motor)  
Validierung:
• 
• 
• 
[x] Fahrzeuge steuerbar?  
[x] Waffen funktionieren?  
[x] Inventar-Wechsel klappt?  
�
� Phase 8: Allgemeine Gameplay-Mechaniken 
Schwerpunkt: Deckung, Stealth, Klettern, Wanted-Level
22
Aufgaben:
• 
• 
• 
• 
• 
• 
• 
[x] 8.1 Sprint- & Ausdauer-System  useStaminaSystem hook
[x] 8.2 Deckungssystem (Cover Detection, Blind Fire)  
[x] 8.3 Stealth-Mechaniken (Schleichmodus, Sichtbarkeits-Indikator)  NPC.tsx Logic
[x] 8.4 Kletter-System (Mantling über Hindernisse)  
[x] 8.5 Nahkampf & Betäuben (Takedown von hinten)  
[x] 8.6 Trefferzonen (Kopf x2, Körper x1, Gliedmaßen x0.5)  
[x] 8.7 Spieler-Zustände (Verwundet, Bewusstlos, Tod)  useHealthSystem hook
Validierung:
• 
• 
• 
[x] Alle Mechaniken spielbar?  
[x] Stealth beeinflusst KI?  
[x] Trefferzonen funktionieren?  
�
� Phase 9: Moral-System 
Schwerpunkt: -100 bis +100 Karma, Story-Verzweigungen
Aufgaben:
• 
• 
• 
• 
• 
• 
[x] 9.1 Moralwert im State (initial 0, Grenzen -100/+100)  gameStore.ts
[x] 9.2 Ereignisse definieren (Zivilist töten: -20, Helfen: +10)  GameplaySystems.ts
[x] 9.3
adjustMorality(delta, reason) Funktion  useMoralSystem hook
[x] 9.4 UI-Feedback (Popup bei Änderung)  
[x] 9.5 NPC-Verhaltens-Einfluss (niedrige Moral → Zivilisten fliehen)  NPC.tsx
[x] 9.6 Story-Verzweigungen vorbereiten (Dialog-Conditions)  
Validierung:
• 
• 
• 
[x] Moral ändert sich korrekt?  
[x] NPCs reagieren auf Moral?  
[x] UI zeigt Änderungen?  
�
� Phase 10: Reputations-System 
Schwerpunkt: 5 Fraktionen, Ruf-Werte
Aufgaben:
• 
• 
• 
• 
• 
• 
[x] 10.1 Fraktionen definieren (Polizei, Bevölkerung, Medien, Gruppe A, Gruppe B)  types/index.ts
[x] 10.2
reputation: Record<Faction, number> im State  gameStore.ts
[x] 10.3
changeReputation(faction, delta) Funktion  useReputationSystem hook
[x] 10.4 Aktionen → Ruf Mapping (Matrix erstellen)  GameplaySystems.ts
[x] 10.5 UI-Anzeige (Balken pro Fraktion)  
[x] 10.6 KI-Beeinflussung (Ruf > 80 = Verbündet)  NPC.tsx
23
Validierung:
• 
• 
• 
[x] Ruf ändert sich korrekt?  
[x] Negative Kopplungen funktionieren?  
[x] UI zeigt alle Fraktionen?  
�
� Phase 11: Eskalations-System 
Schwerpunkt: 6 Stufen (0–5), Wanted-Level
Aufgaben:
• 
• 
• 
• 
• 
• 
• 
[x] 11.1 Stufen definieren (0=Friedlich, 5=Ausnahmezustand)  types/index.ts
[x] 11.2 Eskalationswert im State (Punkte-basiert)  gameStore.ts
[x] 11.3 Trigger implementieren (Schuss=+20, Mord=+50)  GameplaySystems.ts
[x] 11.4 NPC-Spawning je Stufe (Stufe 3+ → SWAT)  NPCSpawner logic 
[x] 11.5 NPC-Verhalten je Stufe (Stufe 2+ → scharf schießen)  NPC.tsx logic 
[x] 11.6 Abkling-Mechanismus (60s versteckt → -1 Level)  GameplaySystems.ts
[x] 11.7 Visuelles/Audio Feedback (Sirenen, UI-Sterne)  
Validierung:
• 
• 
• 
[x] Eskalation steigt/fällt korrekt?  
[x] NPCs spawnen je nach Stufe?  
[x] Abklingen funktioniert?  
�
� TEIL C: SPIELWELT (Phasen 12–16)
🟢 Phase 12: Vienna Level 1 
Schwerpunkt: Stephansplatz mit Stephansdom, 12 Gebäude, Straßen
Aufgaben:
• 
• 
• 
• 
• 
[x] 12.1 Missions- & Levelplan für Stephansplatz erstellen (Hauptmission, Orte)  
[x] 12.2 Stephansplatz-Umgebung modellieren (Gebäude, Straßen, Platz)  
[x] 12.3 Spawn- und Trigger-Punkte setzen (NPCs, Missionsziele)  
[x] 12.4 Zerstörbare Objekte markieren (Fenster, Türen)  
[x] 12.5 Level-Streaming vorbereiten (optional, Gebietsgrenzen)  
Validierung:
• 
• 
• 
[x] Level 1 komplett spielbar?  
[x] Mission 1 abgeschlossen?  
[x] Performance in Level 1 ok?  
24
�
� Phase 13: Vienna Level 2 
Schwerpunkt: Heldenplatz & Regierungsviertel, historische Gebäude
Aufgaben:
• 
• 
• 
• 
• 
[x] 13.1 Level 2 Areal gestalten (Heldenplatz, Parlamentsgebäude)  
[x] 13.2 Missions- und Dialog-Skripte für Level 2 erstellen  
[x] 13.3 NPC-Spawnpunkte und KI-Routen festlegen  
[x] 13.4 Wichtige Gebäude betretbar machen (Interior-Design)  
[x] 13.5 Performance-Tuning auf offenem Platz (LODs, Culling)  
Validierung:
• 
• 
• 
[x] Level 2 abgeschlossen?  
[x] Alle Dialogpfade getestet?  
[x] Performance stabil?  
�
� Phase 14: Vienna Level 3 
Schwerpunkt: Praterstern & Parkanlagen, prozedurale Umgebung
Aufgaben:
• 
• 
• 
• 
• 
[x] 14.1 Prozeduralen Welt-Generator einsetzen (Park & Straßen)  
[x] 14.2 OSM-Daten für Straßennetz im Prater-Gebiet nutzen  
[x] 14.3 Attraktionen/Objekte platzieren (Riesenrad, Buden)  
[x] 14.4 Wetter-Effekte integrieren (Nebel, Regen, Beleuchtung)  
[x] 14.5 Optionales Streaming für großes Areal testen  
Validierung:
• 
• 
• 
[x] Level 3 generiert & geladen?  
[x] Wetter/Tag-Nacht funktioniert?  
[x] FPS im Park stabil?  
�
� Phase 15: Vienna Level 4 
Schwerpunkt: Impfzentrum & Krankenhaus-Areal, Tag/Nacht-Zyklus
Aufgaben:
• 
• 
• 
• 
• 
[x] 15.1 Innenlevel (Impfzentrum) modellieren  
[x] 15.2 Tag/Nacht-Zyklus implementieren (Lichtwechsel)  
[x] 15.3 Dynamisches Wetter (Regen, Sonne) umsetzen  
[x] 15.4 KI-Verhalten an Tageszeit anpassen (NPC-Zeitpläne)  
[x] 15.5 Audio-Kulisse je Tageszeit anpassen (Ambiente)  
25
Validierung:
• 
• 
• 
[x] Level 4 Mission erfüllt?  
[x] Tag/Nacht Übergänge reibungslos?  
[x] Beleuchtung stimmungsvoll?  
�
� Phase 16: Level-Design & Feinschliff 
Schwerpunkt: Abschluss aller Levels, Balancing
Aufgaben:
• 
• 
• 
• 
• 
[x] 16.1 Level 5–7 Umsetzung abschließen (weitere Bezirke)  
[x] 16.2 Alle Assets & Details in Levels einfügen (Props, Deko)  
[x] 16.3 Missions-Flow finalisieren (alle Enden erreichbar)  
[x] 16.4 Globale Optimierungen in allen Levels (Occlusion, Culling)  
[x] 16.5 Abschluss-Test aller 7 Level im Story-Durchlauf  
Validierung:
• 
• 
• 
[x] Alle Levels vollständig?  
[x] Keine blocking Bugs?  
[x] Story mit 5 Enden erreichbar?  
⚙ TEIL D: TECHNISCHE SYSTEME (Phasen 17–22)
🟢 Phase 17: Physik-Engine Integration 
Schwerpunkt: Rapier3D Physik, Kollision, Kräfte, Joints
Aufgaben:
• 
• 
• 
• 
• 
• 
• 
[x] 17.1 Physics World initialisieren (@react-three/rapier)  
[x] 17.2 Kollisionsschichten definieren (Umwelt, Chars, Fahrzeuge, Projektile)  
[x] 17.3 RigidBody für Spieler/NPCs (Capsule Collider)  Player.tsx/NPC.tsx
[x] 17.4 Physik-Sync mit Renderer (useFrame Hook)  
[x] 17.5 Trigger-Zonen (Missions-Bereiche)  
[x] 17.6 Physikalische Materialien (Reibung, Elastizität)  
[x] 17.7 Performance Tuning (Sleep-Modus, Broadphase)  
Validierung:
• 
• 
• 
[x] Kollisionen funktionieren?  
[x] Kein Durchfallen durch Boden?  
[x] Trigger lösen korrekt aus?  
26
�
� Phase 18: Zerstörungssystem 
Schwerpunkt: Gebäudeschäden, Objekt-Frakturen, Trümmerphysik
Aufgaben:
• 
• 
• 
• 
• 
• 
• 
[x] 18.1 Zerstörbare Objekttypen definieren (Glas, Türen, Props)  
[x] 18.2 Fragment-Modelle vorbereiten (Pre-Fracture großer Objekte)  
[x] 18.3 Schadens-Trigger (HP-basiert für Objekte)  
[x] 18.4
destroyObject() Logik (Mesh-Swap + Physics für Trümmer)  
[x] 18.5 Partikel & Sound bei Zerstörung auslösen  ParticleSystem.tsx
[x] 18.6 Decals (Einschusslöcher auf Oberflächen)  
[x] 18.7 Fahrzeugschäden (MorphTargets, ablösbare Teile)  
Validierung:
• 
• 
• 
[x] Objekte zerstörbar?  
[x] Trümmer verhalten sich physikalisch?  
[x] Decals bleiben haften?  
�
� Phase 19: Animations- & Ragdoll-System 
Schwerpunkt: Skelettanimationen, IK, Ragdolls
Aufgaben:
• 
• 
• 
• 
• 
• 
• 
• 
• 
[x] 19.1 Animation Clips importieren (Spieler & NPC – MoCap/Assets)  
[x] 19.2 Animations-State-Machine (Spieler; Idle→Walk→Run, Jump, Combat States)  
[x] 19.3 NPC-Animations-Controller (States: Patrol, Alert, Combat, Flee)  
[x] 19.4 Animations-Layering einrichten (Oberkörper/Unterkörper getrennt, falls nötig)  
[x] 19.5 Ragdoll-Setup (Tod/Impact – Collider & Joints für Gliedmaßen)  
[x] 19.6 Aufsteh-Mechanik (NPC bewusstlos -> nach X Sek. Stand up Animation)  
[x] 19.7 Active Ragdoll Experiment (physikalischer Einfluss im Animationsbetrieb)  
[x] 19.8 Integration mit Physiksystem (Kollisionen: CharController vs. Ragdoll-Collider)  
[x] 19.9 Performance & Transition Tests (verzögertes Laden, saubere Crossfades)  
Validierung:
• 
• 
• 
• 
[x] Alle wichtigen Animationen implementiert?  
[x] Ragdoll bei Tod aktiviert?  
[x] Übergänge flüssig (kein Fußrutschen)?  
[x] Keine Performance-Einbrüche durch Animationen?  
�
� Phase 20: Grafikengine & Post-Processing 
Schwerpunkt: Beleuchtung, PostFX, WebGPU-Renderer, LOD
27
Aufgaben:
• 
• 
• 
• 
• 
• 
• 
[x] 20.1 Rendering Pipeline aufsetzen (PostProcessing Composer)  
[x] 20.2 Licht & Schatten optimieren (Cascaded Shadows)  
[x] 20.3 PostFX: Bloom, God Rays, Motion Blur, DOF  
[x] 20.4 TSL Shader-Effekte (Glass Refraction, Wet Surface, Hologram)  
[x] 20.5 WebGPU Renderer als Option integrieren  
[x] 20.6 HDR & Color Grading (ACES Tonemap, LUT)  
[x] 20.7 LOD & Frustum Culling einführen  
Validierung:
• 
• 
• 
[x] Volumetrische Effekte sichtbar?  
[x] TSL Shader funktionieren?  
[x] 4K @ 60 FPS erreicht?  
�
� Phase 21: Partikel- & Effekt-Systeme 
Schwerpunkt: 12 Effekttypen – Explosion, Blut, Regen, etc.
Effekt-Typen:
1. 
2. 
3. 
4. 
5. 
6. 
7. 
8. 
9. 
10. 
11. 
12. 
MuzzleFlash 
Explosion (Feuer + Funken + Rauch) 
Smoke Puff 
Blood Spray 
Sparks (Metal Hit) 
Dust (Debris Collapse) 
Rain 
Snow 
Fire (Continuous Flame) 
Steam 
Glass Shatter 
Debris (Trümmerteile) 
Aufgaben:
• 
• 
• 
• 
• 
[x] 21.1 Partikel-Engine entwickeln (Points + Shader Instanzen)  
[x] 21.2 Emitter-Konfiguration pro Effekt-Typ (Position, Rate)  
[x] 21.3 Event-Hooks verknüpfen (Schuss → MuzzleFlash, Treffer → Blood)  
[x] 21.4 GPGPU nutzen für Masseneffekte (Rain, Snow)  
[x] 21.5 Performance-Limits setzen (Emitter Throttling)  
Validierung:
• 
• 
• 
[x] Alle 12 Effekt-Typen funktionieren?  
[x] Performance bei vielen Partikeln ok?  
[x] Events triggern die richtigen Effekte?  
28
�
� Phase 22: Audio-System 
Schwerpunkt: Soundeffekte, Musik, Sprachaufnahmen
Aufgaben:
• 
• 
• 
• 
• 
• 
• 
[x] 22.1 Audio-Assets strukturieren (SFX, BGM, Voice)  
[x] 22.2 AudioManager (playSound, 3D-Positionierung) entwickeln  
[x] 22.3 3D Sound einbinden (PositionalAudio, Listener in Kamera)  
[x] 22.4 Musik-System (Crossfade zwischen Tracks, dynamisch)  
[x] 22.5 Voice-Over Unterstützung (Dialog-Lines abspielen)  
[x] 22.6 Ambient Loops (Stadtgeräusche, Wind) hinzufügen  
[x] 22.7 Audio-Effekte (Reverb-Zonen, Low-Pass bei Explosion)  
Validierung:
• 
• 
• 
[x] 3D Sound funktioniert (Richtung, Entfernung)?  
[x] Musik wechselt dynamisch?  
[x] Keine Audio-Glitches oder Aussetzer?  
 TEIL E: BENUTZERERFAHRUNG (Phasen 23–27)
🟢 Phase 23: UI/HUD & Menüsystem 
Schwerpunkt: React-Overlay, Zustand-Anbindung, Menüs (MainMenu, PauseMenu, Settings,
GameOver)
Aufgaben:
• 
• 
• 
• 
• 
• 
• 
[x] 23.1 UI-Layer Architektur (Canvas vs. DOM Overlay trennen)  App.tsx
[x] 23.2 GameStore Anbindung (HP-, Ammo- Werte live anzeigen)  useGameState hook
[x] 23.3 HUD-Elemente designen (Icons, Leisten)  ui/HUD.tsx
[x] 23.4 Missions-UI (aktuelles Ziel, Marker)  ui/MissionUI.tsx
[x] 23.5 Hauptmenü & Pause-Menü umsetzen  ui/MainMenu.tsx & ui/PauseMenu.tsx
[x] 23.6 Settings-UI (Grafik, Audio, Controls Einstellungen)  ui/SettingsMenu.tsx
[x] 23.7 Game Over / Ending Screen gestalten  ui/GameOverScreen.tsx
Validierung:
• 
• 
• 
[x] HUD zeigt Live-Daten (HP, Ammo) an?  
[x] Menüs navigierbar (Maus/Tastatur)?  
[x] Settings persistent gespeichert?  
�
� Phase 24: Tutorial-System 
Schwerpunkt: 13 Lernschritte, Level 1 Einführungsmission
29
Tutorial-Schritte:
1. 
2. 
3. 
4. 
5. 
6. 
7. 
8. 
9. 
10. 
11. 
12. 
13. 
Bewegung (WASD) 
Kamera (Maus bewegen) 
Interaktion (E drücken) 
Sprinten (Shift) 
Ducken (Ctrl) 
Schleichen (geduckt + langsam) 
Deckung nutzen 
Nahkampf einsetzen 
Schießen (LMB) 
Nachladen (R) 
Waffe wechseln (Mousewheel) 
Inventar öffnen 
Moral-Hinweis (Folgen guter/schlechter Taten)
Aufgaben:
• 
• 
• 
• 
• 
[x] 24.1 Tutorial-Schritte definieren & skripten  ui/TutorialSystem.tsx
[x] 24.2 Trigger-Zonen in Level 1 für Tutorials platzieren  
[x] 24.3 Tutorial-UI (Popups, Tastensymbole) implementieren  
[x] 24.4 Tutorial-Manager (Fortschritt, Überspringen-Option)  
[x] 24.5 Angepasster Schwierigkeitsgrad für Start (Nachsicht bei Fehlern)  
Validierung:
• 
• 
• 
[x] Alle Schritte erscheinen in richtiger Reihenfolge?  
[x] Überspringen des Tutorials möglich?  
[x] Anweisungen verständlich?  
�
� Phase 25: Barrierefreiheit 
Schwerpunkt: Colorblind-Modi, Untertitel, UI-Skalierung
Aufgaben:
• 
• 
• 
• 
• 
• 
• 
[x] 25.1 Schrift/UI-Skalierung einstellbar (100–200%)  ui/SettingsMenu.tsx
[x] 25.2 Colorblind-Modi (3 Presets für gängige Farbenblindheit)  
[x] 25.3 Untertitel-System (optionale Dialogtexte)  
[x] 25.4 Input Remapping (Tasten frei belegbar)  
[x] 25.5 Gamepad Support (Controller-Eingaben)  optional
[x] 25.6 Schwierigkeitsgrade/Assistenz (Aim-Assist, weniger Schaden)  
[x] 25.7 Epilepsie-Filter (Motion Blur/Flash-Effekte deaktivierbar)  
Validierung:
• 
• 
• 
[x] Alle Optionen wirken wie erwartet?  
[x] Kontrast und Lesbarkeit ausreichend?  
[x] Untertitel synchron und lesbar?  
30
�
� Phase 26: Persistenz & Speicherstände 
Schwerpunkt: 3 Slots, Auto-Save
interface SaveGame {
player: { position: [number, number, number], health: number, morality:
number, inventory: string[] };
mission: { current: string, phase: number, completed: string[] };
world: { destroyedObjects: string[], npcStates: Record<string, string> };
timestamp: string;
version: number;
}
Aufgaben:
• 
• 
• 
• 
• 
• 
[x] 26.1 SaveGame Interface definieren  types/index.ts
[x] 26.2
saveGame(slot) Funktion implementieren  systems/SaveSystem.ts
[x] 26.3
loadGame(slot) Funktion implementieren  
[x] 26.4 Auto-Save bei Checkpoints/Übergängen  
[x] 26.5 Welt-Zustand wiederherstellen (zerstörte Objekte, NPC-Status)  
[x] 26.6 3 Save-Slots + Auto-Save-Slot im Menü anbieten  
Validierung:
• 
• 
• 
[x] Save/Load funktioniert fehlerfrei?  
[x] Weltzustand bleibt persistent?  
[x] Keine Datenkorruption oder Version-Konflikte?  
�
� Phase 27: Achievements & Progression 
Schwerpunkt: 18+ Erfolge, 5 Kategorien
Achievement-Kategorien:
• 
• 
• 
• 
• 
Story (15): Missionen, verschiedene Enden erreicht 
Kampf (15): Kills, Waffennutzung 
Erkundung (10): Orte entdeckt, Collectibles gefunden 
Moral (5): Pazifist, Tyrann (bes. moralische Entscheidungen) 
Fun (5): Easter Eggs, besondere Aktionen 
Aufgaben:
• 
• 
• 
• 
• 
• 
[x] 27.1 Achievement-Liste erstellen (50 Achievements)  ui/AchievementSystem.tsx
[x] 27.2 Tracking-Mechanismen einbauen (Events, Counter)  
[x] 27.3 Achievement-Manager programmieren  
[x] 27.4 Unlock-Benachrichtigungen (Popup bei Achievement)  
[x] 27.5 Persistente Speicherung der Achievements (im Save)  
[x] 27.6 Achievement-Anzeige im Menü (Übersicht)  
31
Validierung:
• 
• 
• 
[x] Achievements lassen sich freischalten?  
[x] Persistenz der Erfolge funktioniert?  
[x] UI zeigt Status korrekt an?  
 TEIL F: ABSCHLUSS (Phasen 28–30)
🟢 Phase 28: Performance-Optimierung 
Schwerpunkt: ObjectPool, LOD, SpatialHashGrid, Throttle
Optimierungs-Bereiche:
1. 
2. 
3. 
4. 
5. 
Spatial: BVH, Octree, Frustum Culling 
Rendering: LOD, Instancing, Batching 
Memory: Object Pooling, Garbage Collection/Dispose 
CPU: WebWorker für KI-Last 
GPU: Shader-Optimierung, Resolution Scaling 
Aufgaben:
• 
• 
• 
• 
• 
• 
• 
[x] 28.1 Profiling Setup einbinden (Stats-Overlay, DevTools-Analyse)  
[x] 28.2 Batching/Instancing Audit durchführen (Draw Calls minimieren)  utils/optimization.ts
[x] 28.3 LOD Implementierung für Modelle/NPCs  
[x] 28.4 Sichtbarkeits-Prüfungen/Culling Feintuning  
[x] 28.5 KI-Auslagerung in Worker Threads (Throttling fallback)  
[x] 28.6 GPU Fill-Rate Optimierungen (PostFX downsampling)  
[x] 28.7 Memory Leak Check & Fixes  
Validierung:
• 
• 
• 
[x] 60 FPS @ Peak (500 NPCs + Effekte) erreichbar?  
[x] Keine Memory Leaks erkennbar?  
[x] Draw Calls < 500 in stressigen Szenen?  
�
� Phase 29: Testing & QA 
Schwerpunkt: 8+ Tests, Assertion Helpers
Aufgaben:
• 
• 
• 
• 
• 
[x] 29.1 Testplan erstellen (alle Systeme auflisten)  
[x] 29.2 Test-Framework (Jest/Vitest) einrichten  (Vitest verwendet)
[x] 29.3 Unit Tests implementieren  utils/testing.ts
[x] Utilities (Utility-Funktionen) 
[x] State Management (Zustand-Store-Funktionen) 
32
• 
• 
• 
• 
• 
• 
[x] Missions-Logik (Missionsmanager) 
[x] Dialog-Verzweigungen (Dialogmanager) 
[x] 29.4 Integration Tests (Save/Load Zyklus)  
[x] 29.5 Manuelle QA Checklist erstellen & abarbeiten  
[x] 29.6 Performance-Tests durchführen (Profiling unter Last)  
[x] 29.7 Edge-Case Testing (Stress NPCs, extreme Werte)  
Validierung:
• 
• 
• 
[x] Alle Tests grün (bestehen)?  
[x] Keine P1-Bugs offen?  
[x] TypeScript 0 Errors (komplett typisiert)?  
�
� Phase 30: Build & Deployment 
Schwerpunkt: Production Build, Assets
Aufgaben:
• 
• 
• 
• 
• 
• 
• 
[x] 30.1 Vite Build Config optimieren (Minify, Tree Shaking)  utils/build.ts
[x] 30.2 Asset Pipeline optimieren (Compress, Bündeln)  
[x] 30.3 Environment Variables behandeln (API-Keys, Modes)  
[x] 30.4 PWA Manifest & Service Worker erstellen  
[x] 30.5 Docker Container erstellen (Deployment-Container)  
[x] 30.6 CI/CD Pipeline einrichten (Automatisierter Build/Test)  
[x] 30.7 Finalen Release-Build generieren  
Validierung:
• 
• 
• 
• 
[x] Build erfolgreich (läuft lokal)?  
[x] Bundle-Größe optimiert?  
[x] Deployment ready (letzter Stand auf Prod)?  
[x] Kein Debug-Code im Build?  
 FINALE CHECKLISTE
Qualitätsziele:
• 
• 
• 
• 
• 
• 
• 
• 
[x] 60 FPS bei 4K auf RTX-GPU erreicht 
[x] 500+ NPCs gleichzeitig ohne Einbruch 
[x] 0 TypeScript Errors (komplett typisiert) 
[x] Keine Platzhalter im Code (finaler Stand) 
[x] 25+ Unit Tests bestanden 
[x] Alle 7 Level vollständig spielbar 
[x] 5 Enden der Story erreichbar 
[x] 50 Achievements implementiert 
33
⚡ BEREIT FÜR NAVIGATIONS-BEFEHL
Nutze START-PROMPT.md Befehle:- 
STARTE VERTIKAL BEI PHASE 1- 
STARTE HORIZONTAL: TEIL B- 
STARTE HYBRID: TEIL D