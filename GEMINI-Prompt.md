🎮 Corona Control – High-End Blueprint Outline

Projektbeschreibung: Das Spiel CORONA CONTROL wird von Grund auf neu konzipiert und auf React Three Fiber (R3F) portiert, um Grafik und Gameplay auf ein absolutes Maximum für High-End-PCs (RTX-GPU oder besser) zu steigern. Jede Spielmechanik und jede Systemkomponente wird drastisch ausgebaut und mit modernsten Technologien optimiert. Physikbasierte Interaktionen, Echtzeit-Zerstörung, aktive Ragdolls und GPGPU-Simulationen sorgen für eine realistische und dynamische Spielwelt. Die gesamte Umgebung – ein detailgetreues Wien mit 7 Bezirks-Levels – wird in 4K-Auflösung modelliert und mit volumetrischer Beleuchtung sowie Partikeleffekten zum Leben erweckt. Ziel ist eine echte AAA-Qualität: Über 50.000 Polygone pro Charakter und Objekt, 500+ gleichzeitige NPCs bei stabilen 60 FPS, ein vollständiges Moral- und Eskalationssystem, keinerlei Programmfehler und 100% getesteter Code.

Deliverables: Das Projektergebnis besteht aus zwei Markdown-Dokumenten, welche das Gesamtkonzept strukturieren:

Start-Prompt Datei: Enthält Kontrollstrukturen und ein Optionsmenü zur Navigation (wahlweise vertikal – sequentieller Durchlauf aller Phasen, horizontal – fokusiertes Springen zwischen Subsystemen, oder hybrid – kombinierter Ansatz). Dieses Dokument dient als Einstiegspunkt und ermöglicht es, gezielt bestimmte Bereiche des Blueprints auszuwählen.

Kontroll-Prompt Datei: Detaillierte Ausarbeitung aller 30 Hauptphasen mit ihren Unterabschnitten. Hier wird die Navigation durch alle Phasen und Subsysteme ermöglicht, inklusive Querverweisen. Jede Phase ist präzise dokumentiert mit technischen Erläuterungen, Aufgabenpaketen, Implementierungshinweisen sowie Verweisen auf relevante Assets, Shader, Komponenten und Systeme.

Im Folgenden wird der Blueprint als vollständige Gliederung dargestellt. Zunächst gibt eine Gesamtübersichtstabelle einen strukturierten Überblick über alle 30 Phasen. Anschließend werden die Phasen 1–30 im Detail beschrieben – jeweils mit einer technischen Beschreibung, einer nummerierten Liste von Aufgaben (mit Unteraufgaben) und wichtigen Hinweisen zur Umsetzung.

📋 Gesamtübersicht der Entwicklungsphasen (30 Phasen)
Teil A: Grundlagen (Phasen 1–4) – Projektsetup & Architektur
Phase	Titel	Schwerpunkte
1	Projekt-Vision & Konzept	Spielidee, Story, Spielziele, Umfang
2	Basis-Konfiguration	Projektsetup, Build-Tools, Dependencies
3	Technologie-Stack & Architektur	R3F-Framework, Zustand-Management, WebGPU
4	Typisierung & Utility-Module	TypeScript-Definitionen, Config-Konstanten, Helper-Funktionen
Teil B: Kern-Spielsysteme (Phasen 5–11) – Gameplay-Mechaniken
Phase	Titel	Schwerpunkte
5	Spieler-Charakter	Spieler-Modell, Steuerung, Kamera
6	NPC-System & KI	NPC-Typen, KI-Verhalten (Behavior Trees)
7	Fahrzeuge & Ausrüstung	Fahrzeugphysik, Waffen, Gegenstände
8	Allgemeine Gameplay-Mechaniken	Bewegung, Kampf, Interaktionen, Inventar
9	Moral-System	Moralpunkte, karmische Entscheidungen
10	Reputations-System	Fraktionen, Ruf bei Gruppen
11	Eskalations-System	Aufmerksamkeitslevel, Polizeieinsatz, KI-Reaktionen
Teil C: Spielwelt & Inhalt (Phasen 12–16) – Welt, Level und Story
Phase	Titel	Schwerpunkte
12	Missions- & Queststruktur	Missionsdesign, Ziele, Nebenquests, Enden
13	Dialog- & Entscheidungssystem	Dialogbäume, verzweigte Story, Konsequenzen
14	Welt-Generator & Umgebung	Stadtaufbau, prozedurale Elemente, Assets
15	Wetter- & Tag/Nacht-Zyklus	Dynamisches Wetter, Tageszeiten, Lichtstimmung
16	Level-Design & Umsetzung	7 Level (Kärntner Str., Impfzentrum, etc.), Detailgestaltung
Teil D: Technische Systeme (Phasen 17–22) – Engine & Grafik
Phase	Titel	Schwerpunkte
17	Physik-Engine Integration	Rapier3D Physik, Kollision, Kräfte, Joints
18	Zerstörungssystem	Gebäudeschäden, Objekt-Frakturen, Trümmerphysik
19	Animations- & Ragdoll-System	Skelettanimationen, IK, physikbasierte Ragdolls
20	Grafikengine & Shader	Beleuchtung, PBR-Materialien, Volumetrik, TSL
21	Partikel- & Effekt-Systeme	Explosionen, Rauch, Feuer, Spezialeffekte
22	Audio-System	Soundeffekte, Musik, Sprachaufnahmen
Teil E: Benutzererfahrung & Fortschritt (Phasen 23–27) – UI & Meta
Phase	Titel	Schwerpunkte
23	UI/HUD & Menüsystem	Benutzeroberfläche, HUD-Anzeigen, Pause-Menü
24	Tutorial-System	Einführung, Hilfstexte, guided experience
25	Barrierefreiheit	Zugänglichkeits-Optionen (Controls, Farben)
26	Persistenz & Speicherstände	Welt-Persistenz, Save/Load, Datenhaltung
27	Achievements & Progression	Erfolge, Belohnungen, Fortschrittsverfolgung
Teil F: Abschluss & Veröffentlichung (Phasen 28–30) – Feinschliff
Phase	Titel	Schwerpunkte
28	Performance-Optimierung	LOD, Instancing, BVH, GPGPU, Multi-Threading
29	Testing & QA	Unit-Tests, Integrationstests, Performance-Tests
30	Build & Deployment	Build-Pipeline, Deployment, Versionierung
Phase 1: Projekt-Vision & Konzept

Technische Beschreibung: In dieser initialen Phase werden die grundlegende Vision und das Konzept von Corona Control festgelegt. Das beinhaltet die Hintergrundgeschichte, Spielziele, wichtigsten Gameplay-Elemente sowie den Umfang der Spielwelt. Es wird definiert, welche Rolle der Spieler übernimmt, welche Herausforderungen es gibt und wie sich das Spiel von bisherigen Titeln abhebt. Ein besonderes Augenmerk liegt auf dem moralischen Dilemma und den verzweigten Handlungsverläufen, die das Spiel bieten soll. Zudem werden die Zielvorgaben in Bezug auf Qualität und Performance festgehalten (z.B. AAA-Visuals, hohe NPC-Anzahl, realistisches Wien-Setting). Diese Phase liefert somit die Leitplanken für alle weiteren Entwicklungen.

Aufgaben:

Spielidee & Alleinstellungsmerkmal definieren: Beschreibung des Spielgenres, Themas und der Vision. Was ist die zentrale Idee von Corona Control? (Bsp.: Ein Open-World-Actionspiel in Wien während einer Krise, mit Fokus auf moralischen Entscheidungen). Herausarbeiten, wodurch sich das Spiel auszeichnet (z.B. realistisches Setting, verzweigte Story, Mischung aus Strategie und Action).

Story und Hintergrundwelt entwerfen: Grundhandlung, zeitlicher und räumlicher Rahmen festlegen. Entwicklung einer Hintergrundgeschichte (Lore) und eines Handlungsbogens mit Anfang, Mittelteil und möglichen Enden. Wichtig: Integration realer Schauplätze Wiens (z.B. Kärntner Straße, Heldenplatz) als Level mit narrativer Bedeutung.

Hauptcharakter und Fraktionen festlegen: Beschreibung des Spieler-Charakters (Identität, Motivation, Fähigkeiten) und der wichtigsten Fraktionen/Interessengruppen im Spiel (z.B. Polizei, Zivilbevölkerung, Medien, ggf. pro- und contra-Bewegungen). Definieren, wie diese Fraktionen mit dem Spieler interagieren und welche Ruf-Systeme (siehe Phase 10) daraus entstehen.

Gameplay-Kernschleife definieren: Herausarbeiten der grundlegenden Spielmechanik-Schleife – z.B. Erkunden -> Aufgaben erhalten -> Konflikte lösen (kämpfen oder verhandeln) -> Konsequenzen erleben -> Charakter fortentwickeln. Dabei die Verquickung von Action (Kampf, Verfolgung) und Strategie (Entscheidungen, Ressourcen-Management) berücksichtigen.

Zielvorgaben für Technik & Umfang festlegen: Konkrete Ziele notieren, etwa: X Stunden Spielzeit, Y Missionen, Z unterschiedliche NPC-Typen. Technische Benchmarks definieren: z.B. mindestens 60 FPS auf RTX 3080 bei 4K, 500+ aktive NPCs, realistische Zerstörung. Diese Vorgaben dienen später als Maßstab für Optimierungen (Phase 28).

Phase 2: Basis-Konfiguration

Technische Beschreibung: In Phase 2 wird das Grundgerüst des Projekts aufgesetzt. Dies umfasst die Einrichtung des Repositorys, der Entwicklungsumgebung und aller nötigen Tools. Das Spiel wird als React Three Fiber Projekt initialisiert, was bedeutet, React als UI-Framework mit Three.js als 3D-Engine zu kombinieren. Hierbei wird auch ein modernes Build-System (z.B. Vite oder Webpack) mit TypeScript-Unterstützung eingerichtet. Alle Basis-Abhängigkeiten – etwa Three.js, R3F, Zustand (für State-Management), ggf. React-Drei Helfer – werden installiert und konfiguriert. Zudem werden Coding Guidelines, Linter/Formatter (ESLint, Prettier) und eine Git-Struktur eingeführt, um einen sauberen Entwicklungsprozess sicherzustellen. Ziel ist eine lauffähige leere Anwendung mit einer Grundszene als Ausgangspunkt.

Aufgaben:

Repository & Projekt anlegen: Neues Git-Repository erstellen (inkl. README mit Projektbeschreibung). React-Three-Fiber Projekt via create-react-app oder Vite-Template einrichten. TypeScript als Sprache konfigurieren. Sicherstellen, dass die neueste Three.js-Version integriert ist, um WebGPU und TSL nutzen zu können.

Build- und Dev-Tools konfigurieren: Auswahl eines Bundlers (Vite empfohlen für schnelle Builds) und Konfiguration von Hot Reloading für schnelle Iteration. Einrichtung von Build-Skripten (Development, Production) und Testing-Skripten.

Grundlegende Projektstruktur aufsetzen: Verzeichnisse anlegen (z.B. src/components, src/assets, src/systems, src/shaders etc.). Eine Startdatei (z.B. index.tsx) erstellen, die den React-DOM-Renderer mit <Canvas> von R3F verwendet, um eine 3D-Szene einzubetten.

React Three Fiber Canvas initialisieren: Eine leere Szene einrichten – Hintergrundfarbe, Kamera (PerspectiveCamera) und Renderer-Einstellungen (z.B. sRGB Farbmanagement, Schatten aktivieren). Überprüfen, dass ein einfaches <mesh> gerendert werden kann (z.B. ein Testwürfel) als Funktionsfähigkeitstest.

Basis-Abhängigkeiten installieren: Wichtigste Libraries hinzufügen: react-three-fiber (R3F), @react-three/drei (nützliche Drei-Hilfscomponents), zustand für State, @react-three/rapier für Physik, etc. (Noch optional: Routing lib falls Menü navigiert, i18n lib für Mehrsprachigkeit, etc.).

Entwicklungsrichtlinien definieren: Linter (ESLint) mit Regeln konfigurieren, Formatter (Prettier) an Bord holen. Continuous Integration (optional) für Builds/Test einrichten. Definieren, dass keine any-Types oder Hack-Lösungen zugelassen sind (Verweis auf Pflichten aus Phase 1, z.B. „keine Platzhalter, kein unvollständiger Code“).

Hello-World Ausführung: Das Grundgerüst mit einem trivialen Scene-Graph (z.B. ein Würfel auf einer Ebene) starten und im Browser testen. Sicherstellen, dass die FPS-Anzeige (z.B. via drei Stats) stabile Performance zeigt als Basis.

Phase 3: Technologie-Stack & Architektur

Technische Beschreibung: Diese Phase definiert den gesamten Technologie-Stack und die Architekturprinzipien des Spiels. Wichtig ist die Auswahl der Kerntechnologien: React Three Fiber als Rendering-Layer, Three.js als 3D-Engine, Zustand für globale Zustandsverwaltung, TypeScript als Programmiersprache, sowie die Berücksichtigung moderner Grafik-APIs (WebGPU) und Shadersprachen (TSL – Three.js Shading Language). Es werden Architektur-Patterns festgelegt, z.B. komponentenbasiertes Entity-System, Nutzung von Hooks, Trennung von Darstellung und Logik. Entscheidungsgrundlage sind die Leistungsziele: Um 500 NPCs in einer komplexen Umgebung zu handhaben, muss die Architektur effizient und skalierbar sein (keine starren Singletons, stattdessen modulare Systeme). Zustandsmanagement wird so konzipiert, dass sowohl App-State (Spielerdaten, Missionsstatus) als auch Frame-State (Positionsupdates pro Frame) optimal verwaltet werden – R3F selbst verwendet intern bereits die leichtgewichtige State-Library Zustand, was nahtlos genutzt wird. Die Architektur muss auch Mehrkern/Worker-Nutzung und GPU-Auslagerung (Compute-Shaders) vorsehen.

Aufgaben:

Technologie-Entscheidungen dokumentieren: Welche Libraries und Engines kommen zum Einsatz? (React, Three.js, R3F, Zustand, Rapier, ggf. Jolt, etc.). Begründung notieren: z.B. R3F ermöglicht deklaratives Szenen-Management in React-Komponenten, Zustand erlaubt globalen Spielstatus ohne Prop-Drilling. Drei/TSL bietet zukunftsfähige Shaderentwicklung (Kompatibilität mit WebGL und WebGPU in einer Codebasis). Diese Dokumentation dient später auch als Referenz für neue Teammitglieder.

Game-Loop & Systemarchitektur skizzieren: Festlegen, wie das Spiel seine Hauptschleife orchestriert. In R3F gibt es den useFrame-Hook, in dem pro Frame Logik ausgeführt wird (z.B. Physik-Step, NPC-Updates). Entscheiden, welche Systeme hier angebunden werden. Architektur-Pattern: z.B. getrennte Manager-Klassen oder Hooks pro System (Rendering, Physik, KI, Audio), die vom Frame-Loop aufgerufen werden.

Zustands-Management entwerfen: Einen globalen Zustand-Store (mit Zustand) einrichten für langfristige Spielzustände (Spielerleben, Inventar, Missionsfortschritt, Weltstatus). Zudem differenzieren zwischen persistentem State und temporärem Frame-State. Vermeiden, jedes Frame globale State-Updates zu triggern (Performance!) – stattdessen direkte useFrame Nutzung für kontinuierliche Änderungen. Struktur des State-Stores planen (Slices z.B. für Spieler, NPCs, Welt, UI).

Modulare Aufteilung in Subsysteme: Entscheiden, welche Hauptsysteme es gibt (Rendering, Physik, Eingabe, KI, etc.) und wie diese kommunizieren. Architekturansatz: z.B. Entity-Component-System (ECS) vs. React-Komponenten für Entitäten. Da R3F Komponenten nutzt, können Game-Entities (z.B. ein NPC) als React-Komponente mit internen Hooks (State, AI, Physics) umgesetzt werden. Festlegen, ob ein zentraler Event-Bus oder Observer-Pattern genutzt wird, um lose Kopplung zu erreichen (z.B. Zustand-Store emit events).

WebGPU-Strategie & Fallbacks: Da zukünftig WebGPU für noch höhere Performance genutzt werden soll, planen, wie das umgesetzt werden kann. Three.js bietet einen experimentellen WebGPU-Renderer; TSL kann Shader sowohl für WebGL (GLSL) als auch WebGPU (WGSL) generieren. Architektur vorbereiten, dass ein Wechsel des Renderers oder parallele Nutzung möglich ist (z.B. Abstraktionsschicht für Shader). Falls WebGPU nicht verfügbar, sicherstellen, dass alles unter WebGL2 stabil läuft.

Physics-Engine Integration planen: Entscheiden, welche Physik-Library genutzt wird: Rapier3D (WASM-basiert, integriert mit R3F) oder optional Jolt Physics (ebenfalls als WASM verfügbar). Aufgrund der R3F-Community wird Rapier bevorzugt (nahtlose Einbindung via @react-three/rapier). Dokumentieren, wie die Physik in die Architektur passt (z.B. separate PhysicsStepper in useFrame).

Skalierbarkeit & Performance Prinzipien: Architektur-Prinzipien festlegen, um Skalierung auf viele Objekte/NPCs zu gewährleisten. Z.B. Instancing für viele identische Meshes, Level of Detail (LOD) System vorsehen, räumliche Partitionierung (BVH – Bounding Volume Hierarchien) für schnelle Kollisionen/Raycasts, Frustum Culling etc. Diese Mechanismen werden in Phase 28 detailliert, aber hier bereits als Grundannahme berücksichtigt (z.B. Wahl einer Library wie three-mesh-bvh).

Phase 4: Typisierung & Utility-Module

Technische Beschreibung: Diese Phase bündelt alle Querschnitts-Themen rund um TypeScript-Typisierung, Konfigurationsdaten und Hilfsfunktionen. Zunächst werden alle essentiellen Datenstrukturen typisiert: z.B. Enums für Item-Typen, Interfaces für NPC-Status, Typen für Events etc. (Laut Vorplanung ca. 35 Enums und 93 Interfaces, was die Komplexität des Spiels zeigt). Eine saubere Typisierung erhöht die Robustheit und verhindert Laufzeitfehler. Weiterhin werden globale Konstanten und Konfigurationswerte definiert (z.B. Gameplay-Balancing-Werte wie MaxHealth, Schadensfaktoren, Geschwindigkeiten der Fahrzeuge, Eskalations-Schwellen etc.), bevorzugt ausgelagert in eigene Modul(e) oder JSON, um einfache Anpassungen zu ermöglichen. Zusätzlich entsteht eine Sammlung von Utility-Funktionen und Custom-Hooks, die in vielen Teilen des Projekts gebraucht werden – z.B. Mathe-Hilfen (Vector-Operationen, Zufallsfunktionen), Zeit-Utilities (Timer, Dateiformatierung), Logging-Funktionen und Reusable React Hooks (etwa useKeyPress für Input, useNPCBehavior(id) etc.). Diese Utilities sind klar organisiert und getestet, um konsistent in allen Phasen genutzt zu werden.

Aufgaben:

TypeScript Basis-Typen erstellen: Anlegen einer Datei oder eines Verzeichnisses src/types/ mit zentralen Definitionen. Darin: Enums (z.B. enum Faction { POLICE, CIVILIANS, ... }, enum WeaponType { PISTOL, RIFLE, ... }), Interfaces (z.B. IPlayerStats, INPC mit Eigenschaften wie Gesundheit, Aggressivität, Moralwert), Types für komplexe Strukturen (z.B. DialogueNode, MissionDefinition). Diese Typen sollen in allen Systemen benutzt werden, um Konsistenz zu garantieren.

Validierung der Typen: Nachdem Typen erstellt sind, sicherstellen, dass alle bisher implementierten Module (z.B. Phase 2/3 Code) die Typen verwenden (z.B. Zustand-Store verwendet definierte Types). Etablieren einer Regel: keine any-Typen im Code (siehe Pflichten) – alles muss präzise typisiert sein, um spätere Fehler zu minimieren.

Konfigurationsdateien anlegen: Erstellen von z.B. GameConstants.ts oder JSON-Dateien, in denen feste Werte definiert sind. Beispiele: Spieler-Maximalleben, Erfahrungspunkte-Grenzen, Schwellen für Eskalationsstufen (z.B. Level 1 ab 0-10 "Alarm-Punkte", Level 2 ab 10-20 etc.), Geschwindigkeiten der Fahrzeuge, Schaden pro Waffe, etc. Diese Werte zentral halten ermöglicht Feintuning ohne Codeänderungen.

Utility-Funktionsbibliothek entwickeln: Aufbau einer src/utils/ Sammlung. Darin allgemeine Funktionen: z.B. randomInRange(min,max), clamp(val,min,max), Vektor-Helper (ggf. Erweiterungen für Three.Vector3, z.B. distance2D(a,b)). Auch Utilities für Gameplay: z.B. Aggro-Berechnung calculateAggroLevel(npc: NPCStats): number basierend auf Moral/Reputation. Sicherstellen, dass Utilities unabhängig und mit Unit-Tests (siehe Phase 29) versehen werden können.

Custom React Hooks bereitstellen: In src/hooks/ nützliche Hooks implementieren. Bsp.: useGameState(selector) für bequemen Zugriff auf Zustand-Store, useFPS() um aktuelle Framerate zu erhalten, useAudio(soundName) um Sound abzuspielen, useControls() um Eingaben (Keyboard/Mouse) als State anzubieten. Diese Hooks kapseln komplexere Logik und können von Komponenten (Player, NPC etc.) verwendet werden, was Code-Duplikation vermeidet.

Drei/TSL Helpers integrieren: Falls nötig, Utility-Klassen für Three.js erstellen. Z.B. ein Shader-Helper, der oft benutzte Shader-Chunks bereitstellt (normalisierte Geräusch-Funktion, etc.). Oder Erweiterungen für drei-Mesh-Standardmaterial via TSL, falls wir z.B. detail mapping etc. öfter brauchen. Dies kann auch in Form von NodeMaterial-Vorlagen sein.

Dokumentation der Module: Kurz in einem MD-File oder Wiki festhalten, welche Utility-Funktionen und Konstanten vorhanden sind, sodass das Team diese kennt. So wird z.B. vermieden, dass später jemand eine Math-Funktion neu schreibt, die schon in utils existiert.

Phase 5: Spieler-Charakter

Technische Beschreibung: In dieser Phase wird der Spieler-Charakter als zentrales Element umgesetzt. Dies umfasst sowohl das visuelle 3D-Modell als auch alle spielmechanischen Eigenschaften (Steuerung, Kamera, Interaktionen). Grafisch wird ein hochdetailliertes Charaktermodell verwendet – Zielgröße 50.000+ Polygone mit 4K-Texturen für Diffuse/Normal/Specular, um AAA-Qualität zu erreichen. Das Rigging beinhaltet ein vollständiges Skelett für Animationen (mind. Humanoid-Rig mit ~70 Bones, für Gesichtsanimationen ggf. Blendshapes). Die Spielerfigur wird mittels R3F-Komponente und Three.js SkinnedMesh in die Szene gebracht.

Gameplay-seitig wird die Steuerung implementiert: z.B. Third-Person-Steuerung mit WASD/Keyboard und optional Gamepad, inkl. einer frei drehbaren Kamera (Third-person Chase Cam mit Maus). Die Kamera folgt dem Spieler mit sanften Verzögerungen, Kollisionserkennung (nicht durch Wände gehen) und evtl. dynamischem Zoom in Innenräumen.

Weiterhin werden grundlegende Fähigkeiten des Spielers definiert: Laufen, Sprinten, Springen, Ducken, Interagieren (E-Taste) mit Objekten, sowie Kampfaktionen (Schießen, Schlagen). Diese Funktionen greifen auf andere Systeme zurück (Animations-System Phase 19, Physik Phase 17 für Kollision/Fortbewegung, Input-Handling Hooks Phase 4).

Aufgaben:

Charakter-Modell und Rig importieren: Erstellung oder Import eines hochwertigen 3D-Modells des Protagonisten (z.B. via Blender). Sicherstellen, dass es den Performancevorgaben entspricht (Polycount ~50k, sauber gesplittete Materialien). Rigging für humanoide Animationen (Arme, Beine, Finger, Kopf). Als GLTF/FBX ins Projekt laden. Test-Rendering in der Szene zur Qualitätsprüfung (Lichtsetup, Materials).

Animation States definieren: Liste der notwendigen Animationen für den Spieler: Idle, Gehen, Rennen, Springen, Ducken, Schießen, Nachladen, Nahkampf, Sterben etc. (ggf. insgesamt ~20-30 Animations-Clips). Diese werden im Animations-System (Phase 19) eingebunden, hier schon festlegen welche Parameter (z.B. isMoving, isJumping, weaponOut boolean) den Animations-Blend steuern.

Spieler-Steuerung implementieren: Entwicklung einer Komponente PlayerController. Nutzung von Input-Hooks (useControls() aus Phase 4) um Keyboard/Mouse-Events zu lesen. Umsetzung der Bewegung: bei WASD Tastendruck entsprechende Velocity setzen. Physikalische Bewegung: entweder Character Controller via Physik-Engine (Capsule Collider, mit forces bewegen) oder kinematisches Bewegen (Position direkt ändern + selbst Kollision prüfen via BVH-Raycasts auf Boden). Entscheidung abhängig von Physik-Engine-Fähigkeiten (Rapier bietet CharacterController erst experimentell; ggf. simpler: Schwerkraft und Sprünge via Physik, Movement via rigidBody.setLinvel).

Kamera-System aufsetzen: Eine Third-Person-Kamera als separates Component/Hook implementieren, die stets dem Spieler folgt. Konfigurieren: Offset hinter/über dem Spieler, Smooth-Damping bei Bewegung, Mausbewegung rotiert Kamera um die Figur. Zudem Raycast von Spieler zur Kamera, um bei Wänden automatisch näher zu zoomen (Vermeidung von clipping). Kamera an Spieler-Eingabe koppeln (rechtzeitig umsehen).

Interaktions-Logik: Dem Spieler die Fähigkeit geben, mit Weltobjekten/NPCs zu interagieren. Das bedeutet: Vorne einen unsichtbaren Ray oder Collider anbringen, der z.B. Objekte mit „interactable“-Tag erkennen kann. Bei Tastendruck „Aktion“ (z.B. Taste E) das nächste Objekt anvisieren und ein Event auslösen (Tür öffnen, NPC ansprechen – ruft dann Dialog-System Phase 13, etc.).

Kampf-Mechanik vorbereiten: Grundlagen, damit der Spieler kämpfen kann: z.B. eine Waffe halten (falls Start mit Schusswaffe) – das Modell in Hand an einem Hand-Bone attachen. Mausklick als Schussbefehl registrieren, der Projektil abfeuert (Physik-basiert mit Raycast/Collider oder einfache Hitscan-Mechanik). Schaden an NPCs berechnen, Munitions-Handling. Diese Details werden in Gameplay-Phase 8 vertieft, hier minimal lauffähig um Test zu ermöglichen (z.B. Dummy-Schüsse).

Spieler-Status und UI-Verknüpfung: Integrieren des Spielers in den globalen State: z.B. Lebensanzeige, Ausdauer, Moralwert des Spielers. Diese Werte kontinuierlich updaten und mit dem UI (Phase 23) verbinden, um z.B. Healthbar anzuzeigen. Sicherstellen, dass wenn der Spieler Schaden nimmt (später durch NPCs), dies korrekt im State landet und Auswirkung hat (z.B. <0 Leben -> Game Over Trigger).

Komponenten modular gestalten: Den Player als eigenständiges Modul belassen, sodass z.B. im Tutorial (Phase 24) oder beim Levelstart man den Spieler initialisieren/zurücksetzen kann. Events vorsehen: z.B. playerSpawn(position) Funktion, die Figur an Position setzt, oder playerReset() um Status zurückzusetzen. Dies erleichtert Tests und Wiedereinsetzen in Level.

Phase 6: NPC-System & KI

Technische Beschreibung: Hier entsteht das System für Nicht-Spieler-Charaktere (NPCs) und ihre Künstliche Intelligenz. Das Spiel soll bis zu 500 NPCs gleichzeitig auf der Karte haben – darunter neutrale Zivilisten, Gegner (z.B. aggressive Demonstranten oder Sicherheitskräfte) und spezielle Story-Charaktere. Um diese Menge performant zu handhaben, werden NPCs in Typen klassifiziert und instanziert. Z.B. 40 verschiedene NPC-Modelle/Typen sind geplant (Variationen in Kleidung, Aussehen). Diese werden als Instanzen mit gemeinsamen Geometrien dargestellt, was die Draw Calls reduziert (Instancing).

Jeder NPC besitzt Attribute (Gesundheit, Aggressionslevel, Fraktionszugehörigkeit, Moral etc.) und einen internen Zustandsautomaten oder Behavior-Tree für das Verhalten. Die KI-Logik wird mit Behavior Trees umgesetzt, um komplexe Entscheidungsbäume zu ermöglichen (Patrouillieren, Spieler suchen, Flüchten, Angreifen etc.). Behavior Trees erlauben es, Sequenzen von Aktionen und Bedingungen hierarchisch zu definieren – z.B. "Wenn Spieler in Nähe und NPC aggressiv, dann Angriff; sonst Patrouille" – und in Baumstruktur zu verwalten. Für Umsetzung gibt es evtl. Libraries (z.B. behavior3js), oder es wird ein eigenes kleines BT-Framework geschrieben.

Die NPCs reagieren auf Spielereinflüsse: Moral- und Ruf-Werte beeinflussen, ob NPCs freundlich, ängstlich oder feindselig agieren (siehe Phase 9/10). Zudem besitzen NPCs ein Sichtfeld und Gehör – beispielsweise einfache Kegel-/Radius-Prüfungen für Spielererkennung. Crowd Simulation: Für neutrale Menschenmassen wird ein vereinfachtes System eingesetzt: NPCs flanieren ziellos (Wander-Algorithmus) bis eine Eskalation (Phase 11) sie flüchten oder aggressiv werden lässt. Performance: die KI-Updates werden über mehrere Frames verteilt (z.B. 500 NPCs nicht jeden Frame updaten, sondern in Gruppen). Unwichtige NPCs auf Distanz wechseln ggf. in einen einfacheren LOD (weniger KI, keine Kollisionen).

Aufgaben:

NPC-Typen und Modelle integrieren: Erstellung/Import mehrerer NPC-Charaktermodelle (z.B. verschiedene Passanten, Polizisten, etc.). Weniger detailliert als der Spieler, aber dennoch ~20k Polys pro NPC für Nahansichten. Varianten durch verschiedene Texturen/Materials erzeugen. Modelle riggen (Humanoid-Rig kompatibel mit Spieler-Animationen, um Animations-Reuse zu erlauben).

NPC-Spawner System: Entwickeln einer Komponente oder Manager-Klasse, die NPCs in der Welt spawnt. Etwa pro Level definierte Spawnpunkte/Regionen, wo eine Anzahl NPCs generiert werden. Der Spawner sorgt dafür, dass nie mehr als X NPCs aktiv sind (z.B. 500), indem er bei Bedarf welche despawned (entfernt) wenn weit weg. NPC-Objekte ggf. recyceln (Object Pooling), um ständige Neu-Allocation zu vermeiden.

Datenstruktur für NPC-Status: Definieren eines Interface NPCState (z.B. im Zustand-Store oder lokal je NPC) mit allen relevanten Infos: Position, aktueller AI-State (evtl. Enum: Idle, Alert, Combat, Fleeing...), Ziel (z.B. ein Wegpunkt oder Spieler-Position), Gesundheit, Moral etc. Diese Struktur wird von KI und Gameplay genutzt. Evtl. Unterscheiden zwischen aktiven NPCs (nahe beim Spieler) und solchen im Hintergrund (weit weg -> vereinfachter State).

KI-Verhaltensbäume implementieren: Aufsetzen eines Behavior-Tree-Frameworks. Evtl. Verwendung vorhandener JS-Library oder manuell Nodes definieren (Selector, Sequence, Conditions). Erstellen verschiedener Behavior-Tree-Templates für NPC-Typen: z.B. Zivilist-Baum: (Sequence: Wander -> bei Gefahr weglaufen -> verstecken), Polizist-Baum: (Patrouille -> bei Sichtkontakt warnen -> angreifen oder Verstärkung rufen). Nutzung eines Tickers (z.B. im useFrame aber nicht jeden Frame für jeden NPC, sondern zeitversetzt) um die Bäume zu evaluieren.

Sinnes-System (Sicht/Hören): KI-Entscheidungen basieren auf Wahrnehmung. Implementieren: Jeder NPC checkt in Intervallen die Umgebung. Sichtprüfung via Raycast/BVH: vom NPC aus einen Ray im Sichtkegel zum Spieler werfen, prüfen ob frei. Oder Distanz < Sichtweite und Sichtlinie nicht blockiert => Spieler gesehen. Geräusche: wenn Spieler schießt oder sprintet, triggere NPC in Hörweite (Radius) zu “Alert”-State. Diese Checks als Condition-Nodes in Behavior Tree integrieren.

Navigation und Bewegung: NPCs müssen sich im Level bewegen (z.B. Patrouillenrouten, auf Spieler zugehen). Implementierung mittels Pathfinding: Entweder ein einfaches Wegpunkte-System pro Level (vordefinierte Pfade zwischen wichtigen Punkten), oder Integration einer NavMesh-Library. Für Web kann man offline ein Navigationsmesh berechnen und im Spiel z.B. A* Pfadsuche nutzen. Vereinfachung: NPCs können auch an einfachen Kollisionen hängenbleiben, daher lieber NavMesh. Pathfinding-Ergebnis: Liste von Wegpunkten, die der NPC nacheinander ansteuert (z.B. mittels Physik oder direktes Setzen der Position schrittweise). In Phase 16 (Level Design) wird dafür ein NavMesh pro Level erzeugt.

Animationen für NPCs: Ähnlich wie Spieler brauchen NPCs Animations-States: Idle, Walk/Run, Panic (rennen in Angst), Attack (verschiedene), Hit Reaction, Sterben. Diese Animationsclips (können vom Spieler recycelt werden, um nicht Unmengen neue zu erstellen) werden im Animations-System eingebunden. KI setzt Flags, z.B. NPC im Combat-State -> switch zu Kampf-Animation. Wichtig: Ragdoll-Übergang, falls NPC stirbt (siehe Phase 19).

Optimierungen für viele NPCs: Da 500 NPCs eine Herausforderung sind, Umsetzung folgender Optimierungen: LOD – NPCs weit entfernt haben vereinfachte Modelle (oder werden zu einfachen beweglichen Punkten reduziert), KI-Throttling – z.B. KI aktualisiert 10 NPCs pro Frame (50 FPS -> 500 NPCs pro Sekunde), sodass nicht alle gleichzeitig berechnet werden. Instancing – mehrere NPCs desselben Typs können als InstancedMesh gerendert werden; Animation instancing ist schwieriger, aber evtl. Crowd-Anime über Uniform Buffers (fortgeschritten). Pooling – despawn NPCs die außerhalb des Aktionsradius sind, respawn bei Bedarf. GPU-Unterstützung – u.U. GPGPU einsetzen, z.B. Berechnung von simpler Schwarmbewegung auf GPU-Shader, aber KI i.d.R. CPU-logik. Diese Aspekte werden in Phase 28 weiter verfeinert, aber hier grundlegend berücksichtigt.

Phase 7: Fahrzeuge & Ausrüstung

Technische Beschreibung: In Corona Control spielen Fahrzeuge und Ausrüstung (Waffen, Items) eine wichtige Rolle. Diese Phase behandelt fahrbare Vehikel (z.B. Polizeiwagen, Ambulanz, Zivilfahrzeuge) sowie das System für Waffen und sonstige Ausrüstungsgegenstände. Fahrzeuge: Es sollen diverse Fahrzeuge im Spiel vorhanden sein, die der Spieler (und evtl. NPCs) nutzen können. Die Fahrzeugphysik wird mithilfe der Physik-Engine (Rapier) umgesetzt: Autos als Objekte mit Wheel-Collidern oder vereinfachtem Raycast-Fahrwerk, inkl. Federung, Motor- und Lenkungs-Simulation. Alternativ kann ein simpler Fahrzeugansatz gewählt werden: ein rigidBody mit angehängten Rädern, Kräfte für Antrieb und Lenken. Wichtig ist, dass Fahrzeuge mit hoher Geschwindigkeit bewegt werden können und Kollisionen (Crashs) handhaben, inkl. optischer Schäden (Beulen, abfallende Teile in Phase 18).

Ausrüstung: Das Spiel beinhaltet Schusswaffen (z.B. Pistole, Gewehr) – geplant sind ~14 Waffentypen – sowie evtl. Nahkampfwaffen (Schlagstock) und Hilfsgegenstände (Erste-Hilfe, Schutzweste etc.). Jede Waffe hat eigene Stats (Schaden, Feuerrate, Magazingröße) und ein eigenes 3D-Modell. Ein Inventarsystem erlaubt dem Spieler, Waffen zu wechseln und Munition zu verwalten. Waffen können auch von NPCs genutzt werden (z.B. Polizei mit Pistolen).

Zudem gehören Ausrüstung wie z.B. Schutzausrüstung (Masken, Helme) mit ins System, falls relevant für Story (Corona-Masken?) oder Gameplay (Schutzwesten vermindern Schaden). Diese Items beeinflussen Stats und Moral (z.B. Zivilisten mit Masken vs. ohne – moralische Bewertungen?).

Aufgaben:

Fahrzeug-Modelle beschaffen: Erstellen/Import verschiedener Fahrzeugmodelle (PKW, Transporter, evtl. Wasserwerfer). Polycount moderat (~20-30k) da viele Fahrzeuge sichtbar sein könnten. Jedes Modell mit separaten Collidern für Karosserie und Räder. Materialien für Lack, Glas, Reifen anlegen.

Fahrphysik implementieren: Integrieren der Fahrzeuge in die Physik-Engine. Vorgehen: Pro Fahrzeug einen RigidBody (für Karosserie) erstellen, Räder entweder als eigene Collider mit Suspension oder vereinfachter Raycast. Evtl. Rapier unterstützt keine dedizierten WheelCollider out of the box, daher: Simulation: Auf jedes Frame die Bodenabstände der Räder ermitteln (Raycast), daraus Federkraft berechnen und als Impuls auf den Body geben. Lenkung: Vorderreifen-Richtungsvektor ändern, Vortrieb: Kraft auf Body nach vorn. Alternativ kleineres Auto-Physics-Plugin recherchieren. Kollision: Bei Zusammenstoß mit Objekten Schaden berechnen (für Phase 18 visuelle Schaden).

Fahrzeug-Steuerung & Kamera: Dem Spieler ermöglichen, ein Fahrzeug zu betreten (Interaktion E bei Fahrzeug in Reichweite -> wechselt Steuerung von Player auf Fahrzeug). Fahrzeugsteuerung dann via WASD (Vor/Zurück, Links/Rechts). Kamera umschalten auf Verfolgungskamera fürs Auto (ggf. höherer Abstand, andere Winkel). Austeigen-Funktion (zurück zu Player). NPCs könnten ebenfalls Fahr-Logik nutzen (Polizei im Auto verfolgen).

Waffen-System einführen: Datenstruktur für Waffen definieren (Waffen-ID, Name, Schaden, Range, Munitionskapazität, Feuermodus, Streuung etc.). Basis-Waffenklassen: Handgun, Rifle, etc. Implementieren eines WeaponManager: Der Spieler hat aktuellen Waffe-Slot, kann wechseln (Mausrad oder Taste). Schuss-Logik: Beim Feuern Mündungseffekt (Partikel, Sound), Projektil erzeugen (entweder Physikprojektil mit Anfangsgeschwindigkeit, oder Hitscan: Raycast sofort und Spawn Mündung + Impact-Effekt). Treffer berechnen: falls NPC getroffen -> Schaden vom NPC-Health abziehen, eventuell Ragdoll wenn tödlich. Auf Distanz Mündungsfeuer und Sound für NPCs hörbar (Phase 6 Sensorik).

Inventar & Ausrüstungswechsel: Ein Inventar-Subsystem entwickeln, das Waffen und Items verwaltet. Z.B. Player hat 2 Waffen-Slots (Primär, Sekundär) und zusätzliche Items. UI-Integration (Phase 23) um Inventar anzuzeigen. Aufnehmen von Waffen/Items aus der Welt (Loot): Interaktionssystem nutzt, um z.B. vom Boden eine Waffe ins Inventar zu legen. Balancing-Aspekte: begrenzte Munition, Nachlademechanik (Animation + Magazin decrement).

Item-Effekte implementieren: Neben Waffen auch andere Ausrüstung: Medkits (heilen Spieler, moralische Implikation evtl. bei Einsatz?), Rüstung (reduziert Schaden), Quest-Items (Beweise sammeln, Phase 27 Achievements/Evidence). Jedes Item hat ein Script, was bei Nutzung passiert. Beispiel: Medkit -> Spielerleben += X (bis Max), Sound abspielen. Quest-Item -> Flag im State setzen („Beweis X gesammelt“).

Waffen und Fahrzeuge für NPCs: Sorge tragen, dass NPCs mit Ausrüstung umgehen können. Polizisten haben Schusswaffen: deren KI-Baum bekommt Knoten "Feuere auf Spieler", der Waffe nutzt (sofern Spieler in Sicht und in Reichweite). Fahrzeug-NPCs: evtl. separate KI für Fahrzeugsteuerung (z.B. Verfolgungsjagd-Logik in Eskalationsphase 11). Test: NPC-Polizist spawnt im Auto, bei Alarmstufe fährt Richtung Spieler -> aussteigen -> kämpfen.

Audio- und visuelles Feedback: Für Schüsse Mündungsfeuer und Knall (Audio), für getroffene Fahrzeuge Funken oder Rauch (wenn HP des Autos sinken). Reifenquietschen-Sound bei scharfem Lenken, Motorengeräusch abhängig von Geschwindigkeit. Diese Effekte im Audio-System vorbereiten (Phase 22), hier im Ablauf berücksichtigen (Events auslösen). Visuelle Waffeneffekte (Mündungsblitz, Kugeltracer als Partikel) werden mit dem Partikelsystem (Phase 21) abgestimmt.

Phase 8: Allgemeine Gameplay-Mechaniken

Technische Beschreibung: In dieser Phase werden weitere Kernmechaniken des Gameplays implementiert, die über den reinen Charakter- und Kampf hinausgehen. Dazu zählen Bewegungs- und Klettersysteme, Deckungssystem, Stealth-Mechaniken und allgemeine Interaktionen in der Welt. Außerdem werden hier Regeln für Spielzustände wie Spieler-Verfolgungsstatus (in Kombi mit Eskalation) oder Wanted-Level festgelegt. Diese Mechaniken sorgen dafür, dass das Spielgefühl abwechslungsreich und dynamisch ist.

Beispielsweise ein Deckungssystem: Der Spieler kann an Wänden in Deckung gehen (Cover). Technisch: Raycast vorwärts, wenn Wand-Objekt erkannt -> Spieler an Wand positionieren, Animation "in Deckung". Von dort aus blind feuern oder hervorlehnen zum Zielen. Stealth: Wenn der Spieler schleicht (geduckt und langsam), reduziert sich sein Geräuschradius und NPCs erkennen ihn schwerer (Integration in KI-Sicht/Hör-Modell). Evtl. Indikator im UI für Sichtbarkeit. Klettern/Parken: Damit der Spieler und NPCs über Hindernisse kommen, definieren wir ein System zum Überwinden niedriger Objekte (Zäune, Mauern). Auslöser: Bei Sprung nahe Hindernis -> Übergang in Kletter-Animation, kurz Physik deaktivieren und Position auf oben, dann wieder aktivieren. Schadens- und Lebenssystem: Regeln, wie Schaden berechnet wird (Kopftreffer mehr Schaden, Körpertreffer normal, Körperschutz verringert Schaden). Spieler Heilung über Zeit oder Items. NPCs möglicherweise bluten aus etc.

Zudem wird das Polizeialarm/Wanted-Konzept eingeführt (falls nicht in Eskalation): Wenn der Spieler Verbrechen begeht (Leute verletzen, Chaos verursachen), steigt ein versteckter Wert, der NPC-Verhalten beeinflusst (gehört aber im Wesentlichen zur Eskalations-Phase, hier nur Mechanik anlegen).

Aufgaben:

Fortbewegungs-Feinschliff: Implementieren erweiterter Bewegungen für den Spieler: z.B. Sprinten verbraucht Ausdauer (Regeneration über Zeit), seitliches Ausweichen/Hechten als Bewegungsmanöver, Rückwärtsgehen langsamer als Vorwärts, etc. Parameter dafür in GameConstants (Phase 4) abstimmen.

Deckungssystem umsetzen: Erkennen von Deckungsmöglichkeiten: Markiere in Level-Geometrie Objekte als Deckung (Tag "cover"). Wenn Spieler nahe und Taste (z.B. Ctrl) -> in Deckung gehen: Position an Objekt ranrücken, Ausrichtung parallel zur Wand. Animation "an Wand lehnen". In Deckung: verringertes Trefferprofil (feindliche NPC-Schüsse treffen seltener), Spieler kann um Ecken schauen (Kamera-Offset) bei gedrückter rechter Maustaste. Implementieren, dass Schüsse aus Deckung begrenzt sind (z.B. nur blind feuern oder kurz hochkommen).

Stealth-Mechaniken: Einführen eines "Schleichmodus" (Taste zum Schleichen). In diesem Modus: Spieler bewegt sich langsamer, löst geringere Geräusch-Events aus. KI erhält im Sinnes-System (Phase 6) Modifikatoren: Gehört-Radius viel kleiner, Sicht-Erkennung falls Spieler geduckt reduziert (kleinere Sichtfläche). Evtl. Implementieren von "Sichtkegeln" für NPCs, die bei geducktem Spieler geringer ausfallen. UI-Indikator: z.B. ein Auge-Icon, das sich füllt, wenn man entdeckt wird.

Kletter- und Sprungsystem: Verbessern des bisherigen Sprungs: prüfen, ob vor dem Spieler ein Hindernis < bestimmter Höhe ist (via Raycast nach vorne und oben). Wenn ja und Sprungtaste -> Kletter über Hindernis: Abspielen einer Kletteranimation, währenddessen Bewegung sperren. Nach Animation den Spieler oben auf Hindernis setzen. Für hohe Leitern: evtl. separater Mechanismus (Annäherung an Leiter -> Trigger klettern).

Nahkampf & Betäuben: Falls vorgesehen, implementieren eines Nahkampfangriffs (Schlag, Tritt) für den Spieler, um leise Gegner auszuschalten. Mechanik: in Reichweite eines NPC und von hinten -> Tastendruck führt zu Takedown-Animation, NPC wird betäubt oder ausgeschaltet. Geräuschloser Kill wirkt sich anders auf Moral/Reputation aus als lautes Schießen (Integration Phase 9/10).

Schaden- und Trefferzonen: Für realistischeres Kampf-Feedback definieren wir Trefferzonen am Charakter (Head, Torso, Limbs) und multiplikatoren. Umsetzen: Bei Kollision/Raycast-Hit den Bone oder Teil identifizieren (z.B. Bone-Name "head" -> Headshot = x2 Schaden). Wenn kein solches System, zumindest Unterscheidung Head vs Body vs Vehicle (wenn im Fahrzeug getroffen).

Spieler-Zustände (verwundet etc.): Regeln, was passiert, wenn Spieler Schaden nimmt: Ab bestimmten niedrigen HP Schwanken der Bewegung (Kamera wackelt, Bewegungen langsamer). Bei 0 HP: Game-Over-Sequenz auslösen (Tod). Option: anstatt sofort Game Over, bewusstlos -> Restart am letzten Checkpoint (um moralische Konsequenzen zu integrieren statt instant fail).

Respawn/Checkpoint-System: Festlegen, wie Wiederbelebung funktioniert. Checkpoints pro Level (z.B. Missionsbeginn). Beim Game Over respawn an letztem Checkpoint, Weltzustand ggf. teilweise erhalten (zerstörte Objekte bleiben zerstört falls Persistenz will, oder reset? – gemanagt in Phase 26).

Zusammenspiel mit Eskalation: Schon hier Mechanik vorsehen: wenn der Spieler z.B. eine Waffe zieht oder schießt, könnte Eskalationsstufe sofort steigen (Polizei alarmiert). Das Eskalationssystem (Phase 11) wird eng mit Gameplay verknüpft, deshalb Hooks einbauen: z.B. onPlayerAttack ruft Eskalation.raise(level) auf, oder erzeugt Fahndungswert der dann von Phase 11 ausgewertet wird.

Phase 9: Moral-System

Technische Beschreibung: Das Moral-System verfolgt die Handlungen des Spielers auf einer Skala von -100 bis +100 (negativ = unmoralisch/böse, positiv = moralisch/gut). Jede relevante Aktion des Spielers beeinflusst diesen Wert: z.B. Zivilisten verletzen senkt Moral, Leben retten oder Hilfsbereitschaft steigert Moral. Dieses System spiegelt sozusagen das Gewissen oder den Ruf des Spielers in der Gesellschaft wider (wobei detaillierter Ruf bei einzelnen Fraktionen in Phase 10 abgebildet wird).

Die Moral hat spielentscheidende Auswirkungen: Sie verändert den Verlauf von Dialogen und Missionen (Phase 13/12) – NPCs reagieren unterschiedlich, je nachdem ob der Spieler als Held oder Schurke gilt. Außerdem beeinflusst Moral das Ende des Spiels: geplant sind mehrere Enden (Phase 12) basierend auf Moral/Karma. Möglicherweise hat Moral auch Gameplay-Auswirkungen: Zum Beispiel könnte ein sehr positiver Moralwert kleine Hilfevents auslösen (Zivilisten unterstützen den Spieler), während ein negativer Wert dazu führt, dass sogar Unbeteiligte dem Spieler misstrauen oder weglaufen.

Technisch wird das Moral-System als Teil des globalen State umgesetzt (ein einfacher Integer oder Float im Bereich [-100,100]). Ähnlich dem Renommee in RPGs muss jede Aktion darauf zugreifen: daher definiert man eine Utility-Funktion adjustMorality(amount: number, reason: string) die Wert verändert und ins Log schreibt. Das UI (Phase 23) zeigt evtl. einen Indikator (z.B. farbiger Balken oder Karma-Punkte).

Aufgaben:

Moralwert im State verankern: Hinzufügen eines morality Feldes im Spieler-Status (Zustand-Store). Initial z.B. 0 (neutral). Grenzen -100/+100 setzen. Diese Variable reagiert auf Spielereignisse.

Ereignisse definieren, die Moral beeinflussen: Liste erstellen, was alles die Moral ändert inkl. Betrag. Beispiele: Unschuldigen NPC töten (-20), Gegner non-lethal ausschalten (+5), Missionsziel verraten (-15), wichtiger Person helfen (+10), Lügen in Dialogen (-5) vs. Wahrheit sagen (+5), etc. Diese Regeln mit Story/Design abstimmen, in einer Config (Phase 4 Konstanten) festhalten. Jedes moralisch relevante Event triggert die adjust-Funktion mit entsprechendem Wert.

Adjust-Funktion implementieren: Utility changeMorality(delta, reason): addiert delta auf morality (clamped zwischen -100 und 100) und loggt ggf. für Debug (Konsole oder UI-Meldung "Moral -10: Zivilist getötet"). Diese Funktion wird überall dort aufgerufen, wo Aktionen stattfinden (Kampfsystem, Dialogentscheidungen, Missionsskripte). Um Streuverluste zu vermeiden, zentral nutzen, nicht an 100 Stellen eigenständig.

Feedback an Spieler geben: Wenn sich Moral ändert, sollte der Spieler das spüren. Umsetzung: kleines Popup oder UI-Indikator (z.B. rotes runterzeigendes Pfeilsymbol für negative, grünes für positive Änderung) mit dem Grund. Außerdem evtl. die Spielmusik oder Soundeffekte variieren je nach langfristiger Moral (düsterere Musik bei bösem Pfad).

Einfluss auf NPC-Verhalten: Kopplung mit KI (Phase 6): NPCs könnten abhängig von Player-Moral reagieren. Evtl. implementieren: Wenn Moral sehr niedrig (< -50), Zivilisten rennen auch ohne direkte Bedrohung vor dem Spieler weg (Angst, da er als gefährlich gilt). Wenn sehr hoch (> 50), NPC-Verbündete (z.B. andere Aktivisten) helfen eher, Polizei zögert evtl. (im Eskalationssystem könnte hohe Moral Eskalation langsamer steigen lassen, während niedrige schneller – z.B. Behörden sind wachsamer bei Gewalt). Diese Effekte definieren und technisch umsetzen, z.B. als Multiplikator auf Eskalationsanstieg.

Story-Verzweigungen vorbereiten: Markieren von Dialogknoten oder Missionsverläufen, die eine bestimmte Moral voraussetzen oder beeinflussen. Z.B. im Dialog-System (Phase 13) Knoten: "Wenn Moral > 0, Option A verfügbar; wenn < 0, Option B (rücksichtslos)". Das heißt im Code: Abfrage globaler Moralwert beim Generieren von Dialogoptionen. Ebenso Missionsausgänge: in Phase 12 festgelegt, ob z.B. am Ende der Spieler als Held gefeiert wird (hohe Moral) oder verhaftet/geflohen (niedrige Moral).

Testing und Feinjustierung: Da Moral sensibel ist fürs Gameplay-Balancing, Testfälle definieren: Kann der Spieler zu früh maximal böse/gut werden? -> Evtl. Clamping der Rate (z.B. pro Mission max +/-20, sodass der Wert sich über Zeit entwickelt). Anpassung der Beträge aus Schritt 2 nötig, um gewünschtes Pacing zu erreichen. Auch überlegen, ob der Wert sich langsam wieder Richtung 0 normalisiert (z.B. vergisst Öffentlichkeit Taten über Zeit?) – könnte man implementieren, aber evtl. unrealistisch. Diese Aspekte klären und konfigurieren.

Phase 10: Reputations-System

Technische Beschreibung: Zusätzlich zum allgemeinen Moralwert gibt es ein Reputations- oder Fraktionssystem, das die Beziehung des Spielers zu verschiedenen Gruppen im Spiel widerspiegelt. In Corona Control könnten beispielsweise 5 Fraktionen relevant sein: z.B. Polizei/Staat, Zivilbevölkerung, Medien, vielleicht Protestgruppen A und B. Für jede dieser Gruppen wird ein separater Rufwert geführt (ähnlich wie bei GTA die Gang-Ansehen oder in RPGs Factions). Dieser Ruf verändert sich durch spezifische Aktionen: Hilft man z.B. Zivilisten, steigt der Ruf bei der Bevölkerung, während Gewalt gegen diese den Ruf stark senkt. Aggressive Handlungen gegen Polizei senken dort den Ruf (führen zu schnellerer Eskalation), usw.

Das Reputations-System greift eng in die NPC-KI und Missionsstruktur ein: Mit hohem Ruf in einer Fraktion erhält der Spieler evtl. Hilfe oder andere Vorteile (z.B. verbündet sich eine Gruppe, gibt Zugang zu Ressourcen). Bei niedrigem Ruf wird die entsprechende Fraktion feindseliger (z.B. Medien verunglimpfen den Spieler, was wiederum Moral-Auswirkungen haben könnte; Polizei schießt schneller ohne Vorwarnung etc.).

Technisch wird es ähnlich dem Moralwert implementiert: Im globalen State ein Objekt/Dictionary reputation mit Keys für jede Fraktion und Wert im Bereich 0–100 (oder -100 bis +100, je nach Darstellung). Anfangs neutraler Wert (z.B. 50 von 100). Jede Aktion ruft eine Funktion changeReputation(faction, delta) auf.

Aufgaben:

Fraktionen festlegen: Definieren, welche Fraktionen es gibt und initiale Werte. Beispiel: PolizeiRep, BevoelkerungRep, MedienRep, ggf. WiderstandsgruppeRep1, WiderstandsgruppeRep2. Alle initial 50 (neutral). Dokumentieren, was hoher/niedriger Wert bedeutet für jede (z.B. 0 = verfeindet, 100 = vertrauenswürdig).

Reputation im State und Funktionen: Im Zustand-Store für Spieler einen Eintrag reputation: Record<string, number> oder einzeln pro Fraktion. Utility changeReputation(faction: string, delta: number) ähnlich Moral implementieren, inkl. Begrenzung [0,100] oder [-100,100]. Evtl. separate positive/negative handling (0= Hass, 100=Liebe, 50 neutral).

Auswirkende Aktionen definieren: Liste von Aktionen erstellen, die Ruf beeinflussen, und welcher Fraktion zugeordnet. Bsp.: Zivilist retten -> +10 Bevölkerung. Zivilist verletzen -> -20 Bevölkerung. Polizist angreifen -> -30 Polizei. Mission einer Gruppe helfen -> +20 entsprechende Gruppe, evtl. -10 gegnerische Gruppe. Diese Matrix von Aktionen->Ruf in Konstanten hinterlegen.

Integration in Gameplay: Bei jeder relevanten Stelle changeReputation aufrufen. Querverbindung zu Moral: Viele Taten beeinflussen beides (Zivilist töten: Moral -20, BevölkerungRep -40). Das System sollte konsistent wirken: Moral = allgemeine Gesinnung, Reputation = gruppenspezifisch. Also nicht doppelt verrechnen, aber durchaus parallel.

Feedback & UI: Reputationsänderungen dem Spieler anzeigen, evtl. ähnlich Moral mit kleinen Popup-Meldungen ("Ruf bei Polizei -10"). Außerdem im Menü (UI Phase 23) eine Übersicht der Fraktions-Rufwerte grafisch anzeigen (z.B. Balken oder Prozent).

Beeinflussung der KI und Eskalation: Einbinden ins NPC-Verhalten: Wenn Ruf bei Polizei extrem hoch (Spieler kooperativ, evtl. Ex-Polizist?), könnten Polizisten in niedrigeren Eskalationsstufen zunächst verhandeln statt sofort schießen. Wenn Ruf extrem niedrig, sofort harte Maßnahmen. Für Zivilisten: hoher Ruf -> NPCs flüchten weniger panisch, evtl. helfen dem Spieler (ein Bürger stellt sich einem Aggressor in den Weg). Implementieren dieser Verhaltensänderungen z.B. durch Flags in KI: isFriendlyToPlayer wenn Ruf > 80 usw. oder modifiziere Flucht-Threshold.

Story- und Missionsauswirkung: In Dialogen (Phase 13) bestimmte Optionen nur verfügbar bei bestimmtem Ruf bei der betreffenden Person/Fraktion. In Missionen (Phase 12) alternative Routen: z.B. wenn Bevölkerung vertraut, lassen sie den Spieler in ein Gebiet, sonst muss er sich durchkämpfen. Solche Verzweigungen ausarbeiten und in Missionsskripten mittels Rufwert-Abfragen implementieren.

Balancing und Test: Sicherstellen, dass der Spieler nicht alle Rufwerte gleichzeitig maximieren kann – es sollte Entscheidungen erfordern (z.B. hilfst du Gruppe A -> Gruppe B hasst dich). Ggf. negative Kopplungen definieren: changeReputation("GroupA", +20) ruft auch changeReputation("GroupB", -20) hervor. Das System in verschiedenen Szenarien testen und feinjustieren.

Phase 11: Eskalations-System

Technische Beschreibung: Das Eskalations-System regelt die Intensität der Gegenmaßnahmen der Behörden/Polizei und die allgemeine Alarmstufe in der Spielwelt. Es ähnelt einem "Wanted-Level". Geplant sind 6 Eskalations-Stufen (0 = ruhig, 1 = misstrauisch, ... bis 5 = maximale Militarisierung). Dieses System hängt eng mit Spieleraktionen zusammen: Gewalttätiges oder auffälliges Verhalten erhöht die Eskalation. Anfangs (Stufe 0) patrouilliert vielleicht nur wenige Polizei, bei höchster Stufe (5) rückt Militär an, es gelten Ausgangssperren etc.

Eskalation beeinflusst das Spawnen von NPCs (Phase 6): Höhere Stufe => mehr Polizei/Spezialeinheiten spawnen, Zivilisten verstecken sich oder sind nicht mehr auf Straßen (Crowd reduziert). Auch Spielmechaniken ändern sich: z.B. bei hoher Eskalation werden tödliche Waffen eingesetzt, es gibt Straßensperren, die Musik/Atmosphäre wird angespannter.

Technisch wird ein Eskalations-Wert geführt (0-5 oder 0-100% fein). Jede relevante Spielerhandlung ändert diesen Wert. Das System hat Hysterese oder Timer: Eskalation sinkt langsam wieder, wenn der Spieler unauffällig bleibt und Fahndung entkommt (ähnlich GTA-Sterne die verschwinden, falls man aus Sicht ist).

In KI wird Eskalation genutzt: Polizisten KI z.B. erst ab Stufe 2 greifen sie aktiv an, ab Stufe 4 schießen sie scharf. Medien (Phase 42 im alten Plan) könnten Eskalation hochtreiben durch Berichte, aber das geht zu weit. Hier Fokus auf Polizei/Militär.

Aufgaben:

Stufen und Auslöser definieren: Klar beschreiben, was jede Eskalationsstufe bedeutet und wie sie ausgelöst wird. Z.B.: Stufe 0 = friedlich (Standardpolizei), Stufe 1 = Spieler hat Waffe gezogen -> Polizisten beobachten, folgen dem Spieler, fordern auf, Waffe zu senken. Stufe 2 = erster Schuss gefallen oder Verletzte -> lokale Polizei greift ein. Stufe 3 = andauernder Kampf -> Spezialeinheit rückt an. Stufe 4 = schwere Krawalle -> Straßensperren, Einsatzkommando. Stufe 5 = Ausnahmezustand -> Militär, alle NPCs fliehen. Diese Beschreibungen dienen als Grundlage.

Eskalationswert im State: Variable escalationLevel oder escalationPoints. Evtl. punktbasiert (0-100) die in 6 Bänder unterteilt ist. Bei +X Punkten steigt Level. Speichern auch Timestamp des letzten Sichtkontakts mit Spieler (für Abklingzeit).

Änderungstrigger implementieren: Wann erhöht sich Eskalation? Bsp.: Spieler schießt = +20 Punkte, tötet Zivilist = +50, tötet Polizist = +100 (sofort hoher Anstieg), wird von Polizei gesehen mit gezogener Waffe = +10 pro Sekunde. Negative/Abklingen: Wenn Spieler x Sekunden unsichtbar bleibt (versteckt) -> -y Punkte pro Sekunde. Diese Logik zentral implementieren, evtl. in EscalationManager. Auch Kopplung an Ruf: wenn Ruf bei Polizei gut, evtl. geringerer Anstieg für kleine Vergehen.

NPC-Spawning je Stufe: Anpassen des Spawn-Managers (Phase 6): Wenn Eskalation >= 2, spawne Polizisten in der Nähe falls nicht schon da. Eskalation 3+: SWAT Einheiten spawnen an definierten Punkten (z.B. rücken mit Transportern an). Evtl. via Phase 7 Fahrzeuge: Polizeifahrzeuge tauchen auf. Realisieren mittels Triggers: Level-Wechsel löst Spawn-Skripte aus (z.B. bei Übergang zu 4 -> Roadblocks entern Szene).

NPC-Verhalten je Stufe: KI-Bäume erweitern um Eskalations-Check: Polizist-Baum z.B.: Wenn Level <2 -> erst Warnrufe (evtl. via Dialog-System), Level >=2 -> sofort schießen. Zivilisten: Level 0-1 verhalten normal, Level 2+ beginnen sie zu fliehen nach Hause, Level 4+ kaum Zivilisten mehr auf Straße. Diese Effekte umsetzen, z.B. per Broadcast-Event "EskalationStufeGeändert" worauf NPCs reagieren (Crowd NPCs checken und evtl. despawn).

Visuelles/Audio Feedback: Den Spieler über Eskalation im Bilde halten. UI-Anzeige (Symbol oder "Fahndungslevel" Balken). Audio: Sirenen im Hintergrund bei höheren Stufen, Musik intensiver. Grafisch: evtl. Filter oder Alarmlichter im UI. Implementation: EskalationManager triggert Sounds (Phase 22) und UI updates (Phase 23).

Abklingmechanismus: Mechanik, wie der Spieler Eskalation abbauen kann. Bsp.: Verstecken in Gebäude und außer Sicht bleiben -> nach 60s ohne Sichtkontakt sinkt Level um 1. Implementation: Timer starten, wenn kein NPC den Spieler sieht (KI meldet "lostPlayer"). Nach Timer Level-- und weiter bis 0 wenn unentdeckt bleibt. Falls wieder entdeckt, Timer reset und Level springt evtl. sofort hoch. Diese Logik genau codieren, um Cheating zu vermeiden (z.B. Spieler im Auto versteckt?).

Spezialfälle & Balancing: Sicherstellen, dass Eskalation nicht zu schwer oder zu leicht zu senken ist. Evtl. Items oder Aktionen zum Reduzieren (z.B. Verkleidung anziehen -> sofort -1 Level). Oder Quests die Level zurücksetzen. Vor allem aber: Testing im Spiel durchführen, ob Eskalation die gewünschte Dramatik erzeugt. Feintuning der Schwellen und Punkte aus Schritt 3.

Phase 12: Missions- & Queststruktur

Technische Beschreibung: Diese Phase entwirft die Struktur aller Missionen und Quests im Spiel. Corona Control soll in 7 Haupt-Levels (Stadtbezirke) stattfinden, wobei pro Level eine Hauptmission und ggf. Nebenmissionen existieren. Insgesamt entsteht so eine Abfolge von ~20-30 Missionen (inkl. Haupt- und Nebenquests). Hier wird ein Framework geschaffen, um Missionen zu skripten: Zielbedingungen, Missionsziele, Phasen, Zwischenziele und Belohnungen. Die Missionsstruktur ist eng mit der Story verknüpft und muss das verzweigte Erzählen unterstützen – d.h. Entscheidungen in einer Mission beeinflussen Folgemissionen und das Ende.

Wir definieren eine Missions-DSL oder Datenstruktur (z.B. JSON oder JS-Objekte) mit Feldern: id, beschreibung, ziele: [], bedingungen, belohnungen, folgeMissionen etc. Eine Missions-Engine im Spiel verwaltet den Fortschritt: aktiviert Missionen, prüft Ziele (z.B. "gehe zu Ort X", "besiege NPC Y", "sammle Beweis Z") und markiert sie als erledigt, triggert Zwischensequenzen oder Dialoge über das Dialogsystem (Phase 13).

Es wird ein Phasen-System innerhalb einer Mission geben (z.B. Phase 1: zu Ort gehen, Phase 2: dort mit NPC reden, Phase 3: dann Kampf etc.), um komplexe Abläufe zu strukturieren. Script-Triggers (Events) werden benutzt, z.B. "wenn Spieler Bereich betritt -> Missionsphase wechseln".

Mehrere Enden: je nach Moral/Reputation (Phasen 9/10) werden am Ende unterschiedliche Abschlussmissionen oder -ausgänge getriggert. Das Missionssystem muss also Verzweigungen erlauben: z.B. Missionsnode mit Verzweigung "If moral>50 go to MissionGoodEnd else MissionBadEnd".

Aufgaben:

Missionsliste und Story-Flow erstellen: In Abstimmung mit Phase 1 (Story-Konzept) alle Hauptmissionen auflisten: Level 1: Einführung (Kärntner Straße), Level 2: ... bis Level 7: Finale. Dazu Nebenmissionen pro Level, falls vorgesehen (z.B. Hilfsaufgaben für Fraktionen). Für jede Mission eine kurze Synopsis und wie sie in die nächste überleitet. Notieren, wo Entscheidungspunkte sind.

Missions-Datenformat festlegen: Struktur definieren, z.B.:

interface Mission {
  id: string;
  title: string;
  description: string;
  objectives: Objective[]; // could be location, kill, collect, dialog, etc.
  conditions?: Condition[]; // pre-req, e.g. only if rep X > 50
  nextMissions?: { success: string; failure?: string; alt?: string };
  reward?: Reward;
}


Zudem Objective mit Feldern Typ (goto, collect, eliminate, dialog, survive timer...), Zielwerte, etc. In JSON/TS abbilden.
3. Missions-Manager implementieren: Ein System, das aktive Mission verwaltet. Aufgaben: aktuelle Ziele im UI anzeigen, ständig prüfen ob Ziele erfüllt (z.B. via Events: NPC tot -> check obj "eliminate NPC X"). Sobald alle Objectives true, Mission success -> Reward ausgeben -> Folge-Mission(en) aktivieren. Bei Scheitern (z.B. Missions-critical NPC stirbt obwohl nicht sollte) -> Failure-Branch: evtl. Reload last checkpoint oder eine alternative Mission (z.B. Flucht).
4. Event-System für Missionsziele: Damit Missionsmanager weiß, wann ein Ziel erfüllt ist, muss er Infos aus anderen Systemen bekommen. Entwurf: Globale Events wie onNPCDead(id), onItemCollected(id), onAreaEntered(name), onDialogueChoice(choiceId). Missionsziele registrieren sich für relevante Events. Alternativ Polling (jedes Frame prüfen) ist ineffizient, daher lieber Events. Implementieren eines einfachen EventBus oder Nutzung von Zustand-store subscribe.
5. Integration von Dialog & Moral in Missionsverlauf: Viele Missionen beinhalten Dialoge (Phase 13). Sicherstellen, dass nach einem Dialog-Entscheid eine Mission ggf. anders weitergeht: z.B. in Missionsscript Condition: if (dialogChoice == "sideWithPolice") -> nextMission = PolicePath1 else -> RebelPath1. Das heißt Missionssystem muss solche Verzweigungen anhand globaler Flags oder Dialogue-Auswahlen steuern können. Umsetzung: Speichern von wichtigen Entscheidungen im State (Flags), und Missions-Conditions darauf prüfen.
6. Checkpoints & Savegame Hooks: Bei Missionsfortschritt an kritischen Punkten Checkpoints setzen (Phase 26 Persistenz – Missions-ID und Phase speichern). Damit bei Tod/Neustart nicht alles neu gemacht werden muss. Implementation: Missionsmanager ruft SaveSystem an, wenn ein Missionsabschnitt abgeschlossen ist.
7. Nebenmissionen und offene Welt: Wenn es Nebenquests gibt, Missionssystem so erweitern, dass mehrere Missions gleichzeitig aktiv sein können (eine Haupt, mehrere Neben). UI sortiert, vielleicht Markierungen auf Map. Nebenmissionen können Ruf/Moral beeinflussen oder Belohnungen (Waffen, Achievements Phase 27). Implementation: Missionsliste filtern nach conditions (z.B. nur aktivierbar ab Level 3) und bei Erfüllung anbieten (UI Hinweis "Nebenmission verfügbar").
8. Testing & Debugging Tools: Missions können komplex buganfällig sein. Ein Debug-Overlay oder Logs einbauen, der Missionsstatus ausgibt (aktuelle Objectives, Flags). Testläufe machen: Mission erfüllen normal, alternative Pfade auslösen, schauen ob Folgemission korrekt springt. Fehler abfangen (z.B. was wenn Spieler Missionsgebiet verlässt? – ggf. Warngrenzen einbauen oder Mission scheitert). Diese Tests dokumentieren.

Phase 13: Dialog- & Entscheidungssystem

Technische Beschreibung: Das Dialogsystem ermöglicht interaktive Gespräche mit NPCs, inklusive verzweigter Optionen und Konsequenzen. Geplant sind ~20 Dialogbäume, darunter Schlüsseldialoge, in denen der Spieler Entscheidungen trifft, die den Story-Verlauf ändern. Das System ähnelt klassischen RPG-Dialogen: Eine Dialogsequenz besteht aus Knoten (NPC sagt etwas, dann Antwortoptionen des Spielers). Je nach gewählter Option verzweigt der Baum zu unterschiedlichen Pfaden.

Dieses System muss Werkzeuge bieten, um Dialoge komfortabel zu definieren (z.B. in JSON oder einem Dialogeditor) und im Spiel darzustellen (Textanzeige, eventuell Sprachausgabe - Phase 22). Es müssen auch Bedingungen pro Option unterstützt werden, z.B. Optionen, die nur erscheinen bei bestimmtem Moral- oder Ruf-Wert (Integration Phase 9/10) oder wenn der Spieler ein bestimmtes Item hat.

Weiterhin werden die Konsequenzen von Entscheidungen festgelegt: Das kann sein Änderung von Moral/Ruf, Auslösen einer Missions-Änderung (Phase 12), oder das Setzen eines Story-Flags (z.B. "Spieler hat mit Fraktion A paktiert").

Das Dialogsystem ist auch verantwortlich für die Darstellung: Also UI-Elemente für Gespräch (Porträts oder Name des Sprechers, Text, Auswahlmöglichkeiten per Maus/Keyboard). Möglicherweise Cinematic-Einbindung: während Dialog wird Gameplay pausiert, Kameras auf Gesprächspartner gerichtet, ggf. einfache Gestik/Animation abgespielt (Charakter nickt, etc.).

Aufgaben:

Dialog-Datenstruktur definieren: Festlegen eines Formats, z.B.:

{
  "id": "dialog_police1",
  "nodes": [
    { "id": "start", "speaker": "NPC_PoliceChief", "text": "Warum sind Sie hier?", 
      "options": [
        { "text": "Ich will helfen.", "next": "help", "condition": { "moral": ">0" } },
        { "text": "Das geht Sie nichts an.", "next": "rude" }
      ]
    },
    { "id": "help", "speaker": "NPC_PoliceChief", "text": "Gut, wir brauchen Sie...",
      "next": "end_good", "effect": { "rep_police": +5 }
    },
    ...
  ]
}


Also Knoten mit Sprecher, Text, Optionen (jede Option mit ggf. Bedingung und next-Ziel). Unterstützung von Effekten pro Knoten (Änderung Moral/Reputation, Aufruf Missionssystem etc.).
2. Dialog-Skripte erstellen: Auf Basis der Missions aus Phase 12, alle relevanten Dialoge schreiben und in die Datenstruktur bringen. Dabei Story-Autoren einbeziehen. Besonders Schlüsseldialoge mit Entscheidungsfragen ausarbeiten (z.B. finale Entscheidung gut/böse Pfad). Diese werden in src/dialogs/ abgelegt, evtl. pro Level eine Datei.
3. Dialog-Engine implementieren: Ein DialogManager, der einen Dialog laden und durchsteppen kann. Er muss: aktuellen Node anzeigen (UI), Eingabe für Auswahl abfangen (z.B. 1-4 Tasten oder klick), prüfen ob Option erlaubt (Condition erfüllt?), dann Zustand zum nächsten Node wechseln. Wenn next = "END" oder null, Dialog beenden und Steuerung ans Spiel zurückgeben. Während Dialog läuft, Gameplay anhalten (Player Input für Bewegung deaktivieren).
4. Integration mit Moral/Ruf/Systemen: Wie obiges Beispiel zeigt, müssen Bedingungen gecheckt werden: z.B. condition: { moral: ">0" } oder { rep_police: ">=50" }. Implementieren dieser Evaluierung in DialogManager (Zugriff auf globalen State Phase 9/10). Ebenso effect Felder ausführen: z.B. effect: { rep_police: +5, mission: "startMission5" } -> dann entsprechend changeReputation("police",5) und Missionsmanager anstoßen.
5. Dialog UI bauen: In Phase 23 wird UI detailliert, aber hier zumindest Funktionalität: Anzeige eines Textfensters am unteren Bildschirmrand mit Sprechername und Text. Darunter eine Liste von Auswahlmöglichkeiten (nummeriert). Verwendung von React-Komponenten für DialogBox. Für Sprecher evtl. kleine Porträtbilder (Assets bereitstellen) oder nur Namen. Unterstützung für länger laufenden Text (Scrolling or clicking to continue for multi-sentence monolog).
6. Cinematic Kamera/Animation: Optional aber wünschenswert: Bei Dialogstart triggere eine Kamerafahrt, die den NPC und Spieler im Gespräch zeigt (z.B. fixiere Kamera schräg über Schulter des Spielers auf NPC, Cinematic-Letterbox-Balken anzeigen). Kann mit R3F leicht gemacht werden: temporär neue Kamera oder Camera-controls off. Charaktere in Dialog könnten Idle-Animationen auslösen (händeringend, Kopfschütteln etc., wenn entsprechende Anim vorhanden). Das erhöht die Präsentation, muss aber einfach ansteuerbar sein: z.B. im Dialogscript Knoten attribut "camera: closeup_npc" oder so definierbar.
7. Voice-Over Unterstützung: Falls Sprachaufnahmen vorgesehen (Phase 22), Dialogsystem darauf vorbereiten: in Knoten optional voice: "police_why_are_you_here.mp3". Beim Start des Textes wird Audio abgespielt. Synchronisation evtl. über simples Delay pro Textlänge, oder bessere Steuerung (Audio end -> dann Auswahl anzeigen).
8. Test & Localization: Testen der Dialoge auf Konsistenz: Keine toten Enden im Baum, Optionen funktionieren. Überlegen, wie einfach Lokalisierung ginge – z.B. Dialogtexte nicht hardcodiert sondern keys, sodass man Deutsch/Englisch Versionen der Dateien haben kann. Da Spiel wohl deutsch ist, erstmal so belassen, aber offen halten.

Phase 14: Welt-Generator & Umgebung

Technische Beschreibung: Diese Phase widmet sich der Spielwelt-Umgebung, konkret der Nachbildung von Wien und den Methoden, diese performant darzustellen. Ein Wien-Stadtgenerator ist vorgesehen, was bedeutet, dass große Teile der Stadt prozedural oder semi-automatisch generiert werden. Möglich ist, echte GIS-Daten oder OpenStreetMap-Daten als Grundlage zu nehmen, um Straßennetze und Gebäudepositionen realistisch zu platzieren. Die sieben Levels (Stadtgebiete) könnten jeweils Ausschnitte der Stadt sein (z.B. Innenstadt, Heldenplatz, Praterstern etc.), zwischen denen ggf. per Szenenwechsel oder Streaming gewechselt wird.

Der Welt-Generator muss hochdetaillierte Umgebung erstellen: Jedes Gebäude ~50k Polygone wurde gefordert (was sehr viel ist, evtl. instanzierte Module statt unique Geometrie). Zur Performance wird BVH (Bounding Volume Hierarchy) genutzt, um die vielen statischen Dreiecke effizient handhaben zu können. Three.js bietet z.B. three-mesh-bvh für schnelleres Raycasting und auch um Frustum Culling zu verbessern bei großen Meshes.

Volumetrische Beleuchtung (God Rays durch Straßenlaternen in Nebel etc.) und atmosphärische Effekte werden integriert, um die Stadt lebendig wirken zu lassen. Der Generator platziert auch Props: Straßenmöbel, Bänke, Laternen, Fahrzeuge auf Straßen, Bäume – teils zufällig, teils fest.

Zerstörbare Umwelt: Die Gebäude sind möglicherweise teilweise zerstörbar (Phase 18). Hier muss vorbereitet werden, ob Gebäude als zerstörbare Entities ausgelegt werden oder nur bestimmte Teile (z.B. Fensterscheiben, Türen zerstörbar, ganze Gebäude evtl. nicht voll einreißbar außer kleinen Hütten). Markierung im Leveldata, welche Objekte destructible sind.

Aufgaben:

Stadtgebiet-Daten sammeln: Entscheiden, welche Datenbasis verwendet wird. Möglichkeit: OSM-Export für Wien, begrenzen auf relevante Areale. Oder manuell in 3D modellierte Stadtteile (aufwändig). Prozedural: Tools wie Blender GIS könnten Basis liefern. Diese Daten aufbereiten, ggf. in ein eigenes Format für das Spiel (z.B. Stadt-JSON mit Listen von Gebäuden (Koordinaten, Höhe, Typ)).

Stadtgenerator-Modul schreiben: Ein System, das beim Laden eines Levels alle statischen Objekte generiert. Eingabe: Liste von Gebäuden/Straßen/Objekten. Für Gebäude: Generierungsmethoden – evtl. Nutzung von instanzierten Modulen: z.B. 10 verschiedene Gebäude-Fassadenmodelle, die skaliert/komponiert werden. Oder einfache Extrusion von Gebäudegrundrissen zu 3D-Blöcken mit Textur. Implementieren dieser Generierung entweder offline (Pre-Compute in Editor) oder zur Laufzeit beim Level-Init. Ziel: authentisches Stadtgefühl, aber noch handhabbarer Aufwand.

Detail-Assets für Umgebung: Zusammenstellen eines Sets an 3D-Modellen für Props: Straßenschilder, Laternen, Ampeln, Bäume, Parkbänke, Bushaltestellen, etc. Diese in sinnvollen Mustern platzieren (z.B. Bäume entlang Boulevards, Bänke in Parks, Lampen an Straßenrand regelmäßig). Evtl. pro Objekttyp eine Routine (z.B. "placeStreetLights(roadPolyline)").

Terrain und Straßen: Geländemesh generieren (Wien ist nicht ganz flach, leichte Hügel berücksichtigen). Straßen als Mesh-Bänder mit Asphalt-Textur generieren entlang der OSM-Straßen. Bürgersteige als separate schmale Polygone mit Gehweg-Textur. Kollisionsmesh für Böden generieren (für Physik Laufebene).

Interieur & begehbare Gebäude: Falls der Spieler Gebäude betreten kann (z.B. Impfzentrum, ORF-Zentrum), müssen für diese Gebäude Innenräume modelliert sein. Identifizieren, welche Gebäude relevant sind (Level 2 und 7 aus Liste). Diese speziell modellieren (Innenräume separat laden), ggf. beim Betreten Level-Innenraum instanziert. Der Generator kann die restlichen Gebäude verschlossen halten.

Beleuchtung & Atmosphäre: Platzieren von Lichtquellen: Tageslicht (Sonne/Mond) durch Wetter-System (Phase 15) gesteuert. Straßenlaternen als Point/Spotlights bei Nacht. Einsatz volumetrischer Effekte: Nebel in Nächten, Godrays durch Laternen in Nebel (via Postprocessing Shader). Implementieren eines Nebel-Parameters in Three.js Szene (scene.fog) abhängig von Wetter. Volumetric Light evtl. mit Raymarching Post-Process (GodRays-Shader).

Optimierung der Szene: Verwenden von Instancing für wiederholte Objekte (z.B. Laternen alle instanziert aus einem Mesh), um Draw Calls niedrig zu halten. Anwenden von LOD: z.B. entfernte Gebäude nur als simplere Blöcke, nahe mit Details. BVH für große statische Meshes: nach dem Generieren der Gebäude, auf dem finalen Stadt-Geometry Mesh MeshBVH generieren, um Kollisionen/Raycasts (Schüsse, KI-Sicht) schnell zu machen. Dieses BVH kann auch für Occlusion Culling genutzt werden.

Level-Streaming (optional): Falls die Stadtgebiete sehr groß sind, überlegen, ob Streaming nötig ist (Abschnitte nachladen). Evtl. pro Level (7 total) eh getrennt, also bei Levelwechsel laden wir neue Szenerie. Innerhalb eines Level das Areal begrenzen (z.B. unsichtbare Wände oder plausibel gesperrte Straßen). Wenn Streaming, dann Implementierung eines Stream-Managers: laden/entladen von Chunks auf Distanz. Das ist fortgeschritten und ggf. nicht nötig, wenn Level klein genug gewählt.

Begehbare Dächer/Kletterspots definieren: Damit Gameplay interessant ist, vielleicht Möglichkeit aufs Dach zu klettern (Parkour). Im Generator oder Leveldesign definieren, welche Gebäude begehbar sind oben (z.B. Flachdächer) und entsprechende Aufgänge (Feuerleitern, Treppenhäuser). Diese als Teil des generierten Props oder manuell in Level integrieren. Prüfen, dass Physik-Kollisionsmesh entsprechend vorhanden ist.

Phase 15: Wetter- & Tag/Nacht-Zyklus

Technische Beschreibung: Ein dynamisches Wetter- und Tageszeiten-System verleiht der Spielwelt mehr Realismus. Es gibt 7 Wetter-Typen (z.B. Sonnig, Bewölkt, Regen, Sturm, Nebel, Schnee, Nachtklar) und Tag/Nacht-Zyklus. Das System schaltet je nach Missionsskript oder Realzeit zwischen diesen Zuständen um. Vermutlich sind einige Level zu bestimmten Zeiten fest (z.B. Level 4: Praterstern bei Nacht), aber ein generisches System ermöglicht Übergänge während freiem Spiel.

Komponenten: Himmel und Beleuchtung (Sonnenstand, Mond, Sterne bei Nacht, bewegte Wolken), Wettereffekte (Regen: Partikel + Regengeräusche + nasse Oberflächen Shader; Nebel: erhöhtes Fog und Godrays; Schnee: Partikel + Boden ggf. weiß Texturwechsel). Außerdem Temperatur vlt egal fürs Gameplay. Tag/Nacht: Helligkeit regeln (Directional Light Intensity), Farbtemperatur ändern (nachts kühleres Mondlicht), Straßenlaternen automatisch an/aus.

Three.js bietet eventuell Hilfen, z.B. PMREM für Umgebungslicht, und SkyShader for dynamic sky. Regen/Schnee als Partikelsystem (Phase 21).

Aufgaben:

Wettertypen definieren: Liste der Zustände mit Parametern:

Sonnig: klarer Himmel, starke Schatten, kein Nebel.

Bewölkt: bedeckt, weiches Licht, evtl. leichter Nebel.

Regen: dunkler Himmel, Regenpartikel, Pfützen-Shader auf Boden (spiegelnd).

Sturm: starker Regen + Wind (Bäume bewegen sich?), Gewitter (Blitze).

Nebel: Sichtweite reduziert (Fog stark), gedämpftes Licht.

Schnee: Schneepartikel, weiße Bodenüberzüge (Materialtausch), Atemwolken bei NPCs.

Nacht (klar/bewölkt): Himmel dunkel, Mond+Sterne oder bedeckt, Stadtlichter an.

Übergang & Timing: Entscheiden, ob Wetter dynamisch wechselt oder pro Mission festgelegt ist. Mögliche Implementation: Missionsskript kann Wetter setzen ("Mission 3: Sturm bei Nacht"). Zusätzlich, wenn frei spielbar, könnte ein Zyklus laufen: z.B. alle 10 min Spielzeit = 1h ingame; Wetter wechselt zufällig oder per Story. Implementieren einer Funktion setWeather(type) die alle notwendigen Parameter updated.

Himmelsdarstellung: Integration eines Sky-Shaders. Three.js hat z.B. Sky in drei/examples, das per Sonnenwinkel realistischen Himmel generiert. Nutzen, um Sonnenstand abhängig von Tageszeit einzustellen. Für Nacht: evtl. CubeMap mit Sternenhimmel oder procedurale Generierung. Mond als Light Source (weniger intensiv).

Lichtsteuerung: Tageslicht (DirectionalLight) ausrichten je nach Uhrzeit (einfache Rotation über den Himmel). Farbton anpassen (Morgens/Abends orange). Ambient Light ebenfalls modifizieren (nachts dunkler). Streetlights: In Szene vorhanden (Phase 14); hier eine globale Steuerung: wenn isNight == true dann intensity der Lampen = e.g. 1, sonst 0. Evtl. Schaltlogik bei Dämmerung (Übergang mit fade).

Wettereffekte einbauen:

Regen: Partikelsystem (Phase 21) generieren: viele transparente Streifen oder Punkte, die in einem großen Volume fallen. Evtl. einfacher: ein paar emittierende Regen-Emitter um Player positioniert (damit Regen lokal um Spieler). Einschalten von Regengeräusch (Audio). Bodenshader: nutzen von normalmaps für Nässe oder planar reflections. Könnte Materialuniform "wetness" sein, die in Shader den Roughness verringert (glänzend) und dunkler macht. Bei Regen =1, bei trocken =0.

Schnee: Ähnlich Regen, aber Flocken partikel (langsamer fallend, wirbelnd). Bodentexturen: Wechsel auf Schnee-Variante (oder mischen via shader).

Nebel: Scene.fog.density hoch setzen. Option: Volumetric light scattering intensiver (die Godrays effektiver sichtbar).

Wind: Bei Sturm/Nebel vlt. Wind-Effekte: Schwenken Bäume (falls Vegetation hat animierte shader).

Physikalische Auswirkungen: Evtl. Regen macht Straßen rutschig (Autos schlechter bremsen -> Friction Param in Physik ändern), Nebel reduziert NPC-Sichtweite (KI param), Sturm könnte Präzision der Schüsse mindern (Streuung erhöhen). Diese Effekte definieren und im Wettermanager verankern, der entsprechenden Systemen Flags setzt.

Performance & Toggle: Möglichkeit, Wetter/Tag-Nacht für Performance runterzuschrauben (z.B. in Optionen: einfache Himmelbox statt volumetric, Partikeleffekte weniger). Aber das gehört zu Optionen in Phase 25 (Barrierefreiheit/Settings), hier nur im Code vorsehen, z.B. definieren, dass Partikeldichte an Grafikeinstellung hängt.

Test verschiedener Kombinationen: Sicherstellen, dass alle Wetter auf allen Levels funktionieren (z.B. Nacht + Schnee + Nebel -> Sichtbarkeit, zu dunkel?). Feintuning: Regenpartikel sollen nur draußen sichtbar sein, nicht in Innenräumen -> evtl. Zonen definieren (Inside volumes), wo Partikel ausgeblendet.

Phase 16: Level-Design & Umsetzung

Technische Beschreibung: In Phase 16 werden die 7 Spiel-Levels konkret ausgestaltet. Dies baut auf Phase 14 (Weltgenerator) auf, geht aber ins Detail pro Level. Jedes Level repräsentiert einen markanten Ort in Wien mit spezifischem Layout und Aufgaben. Die Level sind:

Level 1: Kärntner Straße (Tutorial) – Fußgängerzone, dicht bevölkert, dient als Tutorial-Schauplatz (Basics lernen).

Level 2: Impfzentrum – eventuell ein Gebäude (Innenraum) + Außenbereich mit Warteschlange, um Gameplay um Menschenmassen und evtl. Konflikte dort einzuführen.

Level 3: Heldenplatz – große öffentliche Fläche, möglicherweise Demo/Kundgebung Setting, viel Crowd und erste Eskalationen.

Level 4: Praterstern (Nacht) – Bahnhofsumfeld bei Nacht, Beleuchtung und Kriminalitätsszenario, Dunkelheitstest.

Level 5: Ballhausplatz – politisches Zentrum (Kanzleramt), wichtig für Story, evtl. schwer bewacht, Stealth-Mission?

Level 6: Gürtel – urbaner Hotspot, möglicherweise Autoverfolgungsjagd (die Ringstraße/Gürtel), Mischung aus Fahr- und Lauf-Action.

Level 7: ORF-Zentrum (Finale, 5 Enden) – Fernsehstudio, finale Konfrontation je nach Moral Pfad, verschiedene Endsequenzen.

In jedem Level werden die Gameplay-Elemente orchestriert: Platzierung von Missionszielen, Gegner-Spawns, Verstecken, etc. Level-spezifische Scripting: z.B. im Tutorial sanfter Einstieg (nur niedrige Eskalation möglich, Hinweise eingeblendet). Level 7 hat verzweigte Ausgänge.

Technisch werden Level möglicherweise als separate Scenes umgesetzt, die beim Wechsel geladen werden. Oder streaming, aber wohl einfacher: harter Cut mit Zwischensequenz. Jedes Level hat eigene Konfigurationsdatei (NPC-Dichte, Spawnorte, verfügbare Fahrzeuge, Startwetter, etc.).

Aufgaben:

Layout-Planung pro Level: Basierend auf realen Karten grobe Layouts zeichnen: wo sind Grenzen, welche Straßen passierbar, wo Blockaden. Festlegen der Schlüsselorte im Level (z.B. Level2: Eingang Impfzentrum, Warteraum innen, Hinterausgang).

Umsetzung in Engine: Für jedes Level eine Init-Funktion, die den Weltgenerator (Phase 14) passend nutzt: z.B. für Heldenplatz nur relevante Gebäude generieren und Rest ausblenden. Zusätzlich manuell platzierte Objekte einfügen: Kisten, Barrikaden, verstellte Fahrzeuge etc., um Deckung zu bieten und Pfade zu definieren (Level-Design fürs Gameplay). Diese können als separate Modelldatei pro Level geladen werden, die sog. "Level Decor" enthält.

Missionsintegration: Verknüpfen mit Phase 12 – pro Level die Missionsziele platzieren. Z.B. Level 3: Missionsziel "Rede halten auf Bühne am Heldenplatz" – also eine Bühne im Level aufstellen, dort Trigger, der Mission fortführt wenn Spieler drauf ist. Level 4: Verfolgungsjagd – definieren der Route, Spawn eines Fluchtfahrzeugs und Verfolger. Diese Scripte in Missionssystem implementieren und mit Level verknüpfen (z.B. Missionsmanager kennt die Level-spezifischen Entities).

NPC-Platzierung und Population: Einstellen, wie viele NPCs wo im Level herumstehen initial. Tutorial (Level1) hat viele Zivilisten schlendernd in Fußgängerzone -> per NPC-Spawner definieren: Spawn-Region über gesamte Straße mit default "civilian" NPCs, ~100 Leute. Impfzentrum (Level2) innen dicht gedrängt Warteschlange -> platzierte NPCs in Reihen. Heldenplatz Demo -> Gruppen von NPCs mit Transparenten (für Atmosphäre, diese NPCs vllt passiv bis Eskalation). Diese spezifischen Setpieces im NPC-System konfigurieren.

Interaktive Objekte je Level: In jedem Level gibt es evtl. einzigartige Objekte: z.B. Level2 Impfdosen/Evidenz, Level5 geheime Dokumente, Level7 Sendeanlage. Diese als Items (Phase 7) modellieren und im Level positionieren. Interaktions-Trigger setzen (Phase 5 Mechanik).

Levelgrenzen & Übergänge: Definieren, wo Level enden. Z.B. optische Sperren (Polizeibarrikaden, Türen die zu bleiben). Bei Level-Wechsel: Missionsziel "Entkomme über den Rand X" -> wenn Spieler dort, fade-out -> Lade nächstes Level Szene. Implementieren eines LevelLoader, der aktuelle Szene räumt und nächste aufbaut. Übergabe von Player-Stats (persistieren).

Performance pro Level optimieren: Jedes Level durchgehen und schauen: Sind unsichtbare Bereiche deaktiviert (z.B. Innenraum-Inventar erst laden wenn betritt)? NPC-Anzahl vs. Performance – ggf. in Level1 (Tutorial) nicht zu viele NPCs um Engine Warmlaufen zu lassen, später steigern. BVH aus Phase 14 pro Level generieren für statics. Aufteilen von Sektoren: in Heldenplatz offener Platz – wenig Occlusion, aber in Impfzentrum Innenräumen mehrere Räume -> Türen als Occluder definieren, damit Raum nicht gerendert wenn Tür zu.

Testing Gameplay Flow: Jeden Level einzeln testen: Ist Tutorial verständlich? (auch Tutorial-System Phase 24). Sind Missions lösbar ohne Verwirrung? Hat der Spieler genug Deckung in Kampfleveln? Sind Eskalation und Spawn so eingestellt, dass es herausfordernd aber machbar ist? Feintuning nach Testläufen.

Phase 17: Physik-Engine Integration

Technische Beschreibung: In Phase 17 wird die Physik-Engine voll in das Spiel integriert. Geplant ist die Verwendung von Rapier3D (Rust-basiert, WebAssembly) aufgrund der guten Performance und der vorhandenen R3F-Integration. Rapier handhabt Kollisionen, Rigidbodies und Kräfte. Alle beweglichen Objekte (Spieler, NPCs, Fahrzeuge, Geschosse, Trümmer) werden als Physik-Objekte repräsentiert, um realistische Interaktionen zu garantieren.

Eine Herausforderung ist, dass wir ein Gemisch aus animierten Charakteren und Physik haben (Ragdolls etc. Phase 19). Hierfür wird eine Hybrid-Lösung gebraucht: normal animierte Charaktere haben Kollision über einfache Collider (Kapsel für Spieler/NPC), während im Ragdoll-Zustand einzelne Körperteile RigidBodies mit Joints werden. Rapier unterstützt Joints/Constraints, was für Ragdolls nötig ist.

Weiter werden Collision Layers definiert (z.B. Charaktere vs. Welt, Projektil vs. NPC, Fahrzeuge vs. alles etc.) um unnötige Checks zu vermeiden.

Jolt Physics könnte als Alternative via WASM zum Einsatz kommen, sollte Rapier an Grenzen stoßen (z.B. Jolt ist sehr performant und unterstützt noch komplexere Szenarien, wird z.B. in AAA verwendet). Wir planen jedoch primär mit Rapier, halten aber die Architektur modular, dass ein Wechsel möglich wäre (z.B. Kapsel-Charaktere vs. raycast-Charaktere logik getrennt von Lib-spezifischem Code).

Aufgaben:

Physik-Welt initialisieren: In der Hauptscene initial den Physics World Context erstellen (via useRapier() Hook oder Physics component von @react-three/rapier). Parameter einstellen: Schwerkraft (-9.81 m/s^2 nach unten), eventuell größen-scaling (1 unit = 1 Meter).

Kollisionsschichten definieren: Z.B.: Layer 1 = Umwelt (statische Geometrie), Layer 2 = Charaktere, Layer 3 = Fahrzeuge, Layer 4 = Projektil. In Rapier Konfiguration vorsehen, welche Layer mit welcher interagiert (z.B. Projektil checkt mit Char+Umwelt, Char mit Umwelt+Fahrzeug, etc.). Das verhindert überflüssige Checks (Performance).

RigidBody-Komponenten zuweisen: Dem Spieler einen Kapsel-Collider (Radius ~0.5m, Höhe ~1.8m) geben, so dass er mit Umgebung kollidiert. NPCs ebenso (möglicherweise kleinere Variation z.B. 1.7m). Fahrzeuge bekommen mehrere Colliders: ein umschließendes Box-Collider für Karosserie, und ggf. 4 kleinere an Rädern (oder vorerst ignore detail, Räder haben separate handling Phase 7).

Physik-Update und Render-Sync: Rapier läuft pro Frame im useFrame. Sicherstellen, dass Step-Frequenz fixiert ist (z.B. 60Hz) und bei FPS-Drops evtl. mehrere substeps. Die bewegten Objekte (R3F) bekommen entweder RigidBody Components, die automatisch die Three-Transform synchronisieren (Rapier-Integration macht das). Test: Player bewegt sich per Physik? Oder wird gesteuert und dann Position dem RigidBody nachgeführt. Hier Decision: Evtl. einfacher, Spieler als Kinematic Body: d.h. Kollisionserkennung aber Bewegung manuell. Rapier hat Kinematic mode – nutzen, damit Gravity und Steigungen wirken aber Steuerung kontrolliert bleibt.

Charakter vs. Umwelt Kollision: Testen, dass Player/NPCs nicht durch Wände/Boden fallen. Feinjustage der Colliders (z.B. mittig an Beine ansetzen, sodass Kopf/Schultern leicht clippen können vs. zu hoch ansetzen). Evtl. komplexere Colliders (Capsule + sphere for head) falls nötig.

Trigger-Zonen implementieren: Physik-Engine kann auch Trigger (Sensoren) statt harter Kollisionen. Nutzen für Missions- und Interaktionsbereiche (z.B. Missionsziel erreicht wenn Player Collider in unsichtbarer Zone). Implementation: Collider mit sensor = true, onCollisionEnter Event hooking (Rapier events) -> Missionsmanager informieren.

Physikalische Materialien: Einstellen von Reibung und Elastizität für wichtige Materialtypen: z.B. Straßen = hohe Reibung, damit Autos nicht rutschen (außer bei Regen, Phase 15 könnte Reibung gesenkt werden), Eis oder nasser Boden = rutschiger. Gummi (Reifen) vs Metall (Karosserie) Kollision mit bestimmten Werten. Rapier erlaubt das Setzen von Kollisionsgruppen mit eigenen coefficients. Das trägt zur Realistik bei (z.B. Bälle springen, Autos bleiben eher liegen).

Performance Tuning Physik: Bei 500 NPCs + Objekte kann Physik heavy werden. Strategien: Für entferntere NPCs Physik deaktivieren (set sleeping or not simulate when offscreen). Partikel/Trümmer nach kurzer Zeit entfernen oder machen Sensor. Step-Verkürzung falls CPU Last. Evtl. Broadphase-BVH in Rapier config param nutzen (Rapier likely uses broadphase anyway). Option: bestimmte Effekte (Ragdolls) nur für nahe Figuren aktiv, sonst ragdoll nicht simulieren weit weg. Diese Überlegungen einbringen.

Jolt Option prüfen: Im Hintergrund evaluieren, ob Jolt via wasm besser Performance bietet oder Features. Evtl. Test einer Demo-Szene (viele ragdolls) mit Rapier vs Jolt. Wenn signifikant, Schnittstelle so designen, dass Wechsel möglich (z.B. abstrakte PhysikService mit Adapter für Rapier oder Jolt). Dokumentieren, aber nicht zwingend implementieren, außer es wird notwendig.

Phase 18: Zerstörungssystem

Technische Beschreibung: Phase 18 konzentriert sich auf die zerstörbare Umgebung und allgemeine Destruction-Mechaniken. Ziel ist, dass Objekte realistisch kaputt gehen können: z.B. Glas zerspringt, Holzkisten zerschmettern, Fahrzeuge verbeulen oder explodieren, Gebäudeteile können einstürzen (im begrenzten Rahmen). Echtzeit-Zerstörung erhöht die Immersion enorm, erfordert aber clevere Ansätze für Performance.

Methoden: Für viele Objekte wird Pre-Fracturing genutzt – d.h. vordefinierte Bruch-Modelle. Beispiel: Eine Fensterscheibe hat ein alternatives Modell mit Scherben, das beim Treffer aktiviert wird. Ein Mauersegment kann ein kaputtes Modell (Trümmer) haben, oder mittels Voronoi-Fracture vorgeschnitten sein, sodass bei Impuls Teile gelöst werden. Für kleinere Objekte (Kisten, Fässer) kann eine Physik-Simulation beim Zerstören starten: Kiste spawnt Holzplanken-Stücke (RigidBodies), Fass spawnt Trümmer.

Active Ragdoll wurde extra erwähnt (Phase 19), hier fokussieren wir auf Umgebung:

Gebäudeschäden: z.B. Fassaden bekommen Einschusslöcher (Decals), Fenster splittern.

Fahrzeugschäden: Bei heftiger Kollision ändern wir das Modell (Beule via MorphTarget oder tauschen zu kaputter Modelldatei), evtl. Rad fällt ab -> beeinflusst Fahrphysik. Explosion möglich -> Fahrzeug in mehrere Teile (Türen ab, Motorblock raus).

Terrain/Boden: evtl. Krater bei Explosion (kann via Parallax-Decal vorgetäuscht werden, echter Geometriecrater wäre aufwändig).

GPGPU könnte bei großflächigen Zerstörungen helfen, aber eher nicht nötig; wir nutzen GPU v.a. für Partikel (Staubwolken, Funken).

Aufgaben:

Zerstörbare Objekttypen katalogisieren: Auflisten, welche Objekte im Spiel zerstörbar sein sollen: z.B. Türen, Fenster, Holzkisten, Fässer, Straßenschilder, Laternen, Fahrzeuge, vielleicht einzelne Mauersegmente. Für jeden Typ bestimmen: Grad der Zerstörung (komplett verschwinden vs. in Teile brechen) und Methode (Voronoi-Bruch oder simpler Ersatz).

Modelle/Fragmente vorbereiten: Für jedes zerstörbare Modell entsprechende Fragmente erstellen. Evtl. Tools/Blender-Addons nutzen um Voronoi-Shatter. Speichern: entweder als getrennte Objekte (z.B. window.glb und window_broken.glb mit Scherben), oder in einer Datei mit separaten Meshes für intakt und kaputt. Fahrzeuge: Modellieren separierte Türen, Hauben, etc. und in normalem Modell diese als separate Child-Objects, die man bei Schaden lösen kann.

Schadens-Trigger implementieren: Erkennen, wann ein Objekt zerstört wird. Das kann durch Projektilkollision (Physik event: bullet hits object) oder Explosion (distanz < radius). Jedes zerstörbare Objekt wird als spezielles Component registriert, mit Parametern: z.B. HP = 100, oder "one hit -> break". Implementieren einer Destructible Klasse, die Kollisionen abonniert. Bei Treffer: HP reduzieren, wenn <=0 -> destroyObject().

Objekt-Zerstörung ausführen: destroyObject() Logik: Das intakte Objekt entfernen/ausblenden, stattdessen die Trümmerobjekte hinzufügen. Diese Trümmer erhalten RigidBodies und werden eine kurze Zeit simuliert (damit sie runterfallen, auseinanderfliegen). Optional: nach z.B. 30 Sekunden könnten kleine Trümmer wieder entfernt oder schlafen gelegt werden, um Performance (Aufräum-Mechanismus).

Effekte bei Zerstörung: Gleichzeitig Partikel und Sound auslösen: z.B. Glasbruch-Sound, Glassplitter-Partikel (kleine transparente Dreiecke) aus Partikelsystem (Phase 21). Staubwolke bei großen Zerstörungen (z.B. Wand bricht -> Staub-Puff Partikel). Lichtblitze/Feuer falls Explosion. All das in dem Moment triggern.

Einschusslöcher & Decals: Für nicht komplett zerstörte Objekte, aber Treffer, erstellen wir Decals (Textur-Flicken) auf Oberflächen. Z.B. Bullet Hole Decal (schwarzer Punkt) aufgeklebt auf Wände. Implementierung: Raycast-Einschlag -> an Impact-Point ein Decal-Mesh erzeugen (using Three.js DecalGeometry) and attach to static object. Limit Anzahl, ältere ggf. entfernen, um Performance nicht zu belasten.

Fahrzeugschäden simulieren: Wenn Fahrzeug RigidBody starke Kollision erlebt (Rapier liefert Impact Force), dann verforme das Fahrzeug: Möglichkeit: simple Approach – definieren ein paar MorphTargets für Beulen an Front, Seite, und je nach Impact-Position entsprechende Morph einschalten (z.B. Frontcrash -> morph "frontCrush" to 1). Oder Child-Parts wie Türen: bei sehr starkem Schaden RigidBody Tür ablösen (neuen RigidBody für Tür mit Impuls weg). Motorbrand: ab gewissem Schaden spawnt Rauchpartikel aus Motorhaube (Phase 21).

Persistenz & Auswirkungen: Falls ein Objekt zerstört ist, bleibt es zerstört (Weltpersistenz Phase 26) – also Speichern des Zustands, damit nicht nach Reload plötzlich alles heil. Das implementieren durch Markieren im SaveGame (Liste zerstörter Objekt-IDs). Auswirkungen: ein zerstörtes Deckungsobjekt bietet keine Deckung mehr -> KI muss das berücksichtigen (z.B. deckt sich NPC nicht hinter zerstörter Kiste). Ggf. Collider des Objekts entfernen oder austauschen durch unregelmäßige Trümmer-Collider.

Stress-Test und Tuning: Testen, was passiert, wenn viele Sachen gleichzeitig kaputt gehen (Explosion in Markt mit 20 Kisten) – droppen FPS? Falls ja, Parameter reduzieren: Weniger Trümmerstücke pro Objekt, kürzere Simulation (Trümmer direkt zu statisch setzen nach initialer Physikphase), Partikelanzahl deckeln. Tuning bis es flüssig läuft, ohne den "Chaos-Effekt" zu sehr einzuschränken.

Phase 19: Animations- & Ragdoll-System

Technische Beschreibung: Diese Phase behandelt das Animationssystem für alle Charaktere (Spieler und NPCs) sowie die Implementierung aktiver Ragdolls. Geplant sind über 85 Animationen für diverse Aktionen. Das Animationssystem muss flüssige Übergänge (Blending) zwischen Zuständen ermöglichen und auf Eingaben bzw. KI-Zustände reagieren. Für den Spieler vermutlich ein State Machine Ansatz (Idle -> Walk -> Run -> Jump etc.), für NPCs ähnlich aber gesteuert durch KI (Phase 6). Eine populäre Lösung ist die Verwendung eines Animation State Machines oder Animators (Unity-like). In React Three Fiber/Three.js kann man mit AnimationMixer arbeiten, der verschiedene Clips blendet.

Active Ragdoll: Das heißt, dass ein Charakter nicht abrupt von Animations- in Physikmodus wechselt (was oft zu unnatürlichem Kollaps führt), sondern dass die Ragdoll physikalisch simuliert wird, während vielleicht noch eine Art Kraft die Gliedmaßen grob in Animationspose ziehen (so dass z.B. bei einem Schlag der Körper reagiert aber versucht Balance zu halten). Eine vereinfachte Version ist: Wenn NPC von Explosion erfasst wird, aktiviert Ragdoll (normale Animation stop, alle Bones bekommen RigidBody, die mit Joints verbunden). Nach kurzer Zeit kann NPC ggf. aufstehen (dann Ragdoll off, Animations-On mit "steh auf"-Animation). "Aktiv" bedeutet auch in lebendigem Zustand reagiert Körper auf Physik: z.B. leichte Stöße kippen ihn etwas. Das umzusetzen ist komplex, erfordert Motors on joints oder PD-Controller. Vielleicht zunächst klassische Ragdoll bei Tod reicht, active ragdoll optional.

Aufgaben:

Animation Clips importieren: Alle benötigten Animations (vgl. Liste Phase 5 und 6) entweder selbst erstellen (MoCap oder handanimiert) oder aus Asset-Packs importieren. Animations sollten zum Rig kompatibel sein (Mixamo etc. möglich). Diese als separate .fbx oder in GLTF mit dem Charakter mitliefern.

Animation State Machine aufbauen (Spieler): Logik entwerfen, die basierend auf Spieler-Input und Zustand entscheidet, welche Animation aktiv ist. Z.B. Simplified: If moving & grounded -> "Walk" (blend speed based on velocity), if sprinting -> blend to "Run", if no input -> "Idle". Jump -> trigger Jump anim (and on landing maybe a Land anim). Combat: if aiming -> blend upper body to "aim pose" while lower continues run (layered animation). Implementieren mit Three.AnimationMixer: Läden aller Clips, erstellen eines Mixers und Actions. Übergänge: .crossFadeTo() etc. Parameter (booleans like isRunning) in einem small manager class auswerten und entsprechende fade steuern.

NPC-Animationen: Ähnliche Vorgehensweise, aber KI-getrieben. NPC hat States: Idle/Patrol, Alert, Combat, Flee, etc. Jedem State eine Animationsclip zugeordnet. Evt. Idle varianten (stehen, rauchen, sitzen). KI modul setzt State, Animationsmanager NPC-komponente hört darauf und wechselt Animation. Für NPCs evtl. weniger komplexes Blend nötig, aber grundlegendes (Lauf vs. Schieß).

Animation Layering: Entscheiden, ob Schichtensystem gebraucht wird. Bsp: Spieler schießt während Laufen -> Beine laufen, Oberkörper schießen. In Three.js kann man zwei mixers oder use mixers with subset of bones. Possibly create two Skeletons? Oder simpler: separate animations that already combine (like run+shoot baked). Up to assets. If layering needed, one can use AnimationMixer's weight on specific bones (rare).

Ragdoll Setup (Tod/Impact): Vorbereiten der Ragdoll-RigidBodies: Pro wichtigem Bone (Head, Torso, Upper/Lower arms, Upper/Lower legs) einen Collider definieren (Capsules approximating limb shape) and connect with joints (constraints that mimic human joints: e.g. hinge for knee, ball-socket for shoulder). Hardcode or compute from rig. Possibly create ragdoll in Blender and export physics info? Alternatively, define in code approximate positions. When NPC dies or knocked out:

Transfer current pose to ragdoll initial state (set rigid bodies transforms equal to bone transforms).

Disable character's Animation/Controller.

Enable physics on those rigid bodies so they fall.
This yields a physically correct collapse.

Aufstehen-Mechanik (optional): Falls NPC bewusstlos statt tot, ermöglichen, dass nach X Sekunden Aufstehen animiert passiert. Schwer: muss Ragdoll pose zurück in anim kontrolliert überführt werden. Evt. einfach despawn Ragdoll NPC und spawn normal NPC with "stand up" animation if we cheat. Possibly skip for complexity.

Active Ragdoll (Staggering): Versuchen, Physik während Anim zu beeinflussen: z.B. bei Explosion stoß, NPC nicht komplett ragdoll aber Animationsmixer Blend auf "hit-react" plus add forces to push character, and maybe briefly enable ragdoll on some limbs for a flailing effect. Another approach: use physics constraints with motors that try to maintain animation pose (like target angles), so that when external force comes, it deviates but tries to come back. That is advanced; if time, might implement for player only or key scene. Possibly skip detailed physics control – simpler cheat: simulate by animation (pre-made stumble anims).

Integration mit Physik (Collision): Die animierten characters should still collide properly with environment even when not ragdoll. Typically one uses a CharacterController (capsule) and does not collide per bone. We'll stick to that to avoid complexity. But for ragdoll, each bone collider collides. Ensure ragdoll colliders are set to same layer as characters or new? Possibly separate so that ragdoll colliders still collide with environment but maybe not with other ragdolls to avoid jitter? Probably allow it for pile-ups.

Performance Animations: 85 Animations if all loaded might be heavy on memory. Possibly use draco compressed GLBs or load on demand (only load specific to level context). Also verify that using a single rig for all NPCs and sharing AnimationMixer if possible can save CPU (some engines allow one animation drive multiple characters via instancing if same rig; not sure in three.js). At least, reuse clips across NPCs.

Testing transitions: Check that transitions are smooth, no popping between animations. Adjust crossfade durations. Ensure certain animations interrupt others properly (e.g. death ragdoll interrupts any current anim immediately). Fine-tune foot sliding (maybe add small IK to keep feet on ground in uneven terrain if needed, but maybe skip).

Polish: If possible, add some Inverse Kinematics (IK) for better realism: e.g. foot IK so feet stick to ground on slopes, look-at IK so NPC heads turn to player naturally. Three.js might need custom solutions or use an existing small IK lib. Could be heavy for 500 NPC, so maybe only for key characters or skip. Document as future improvement if skip.

Phase 20: Grafikengine & Shader

Technische Beschreibung: In dieser Phase wird das Grafikpipeline verfeinert, inklusive benutzerdefinierter Shader, Post-Processing und Ausnutzung moderner APIs. Durch Einsatz der Three.js Shading Language (TSL) können wir komplexe Shader-Effekte in TypeScript erstellen und sowohl unter WebGL2 als auch WebGPU nutzen.

Wichtige Grafikfeatures:

Physically Based Rendering (PBR): Verwendung von MeshStandardMaterial und Umgebungslichtern/IBL, damit Materialien realistisch auf Licht reagieren. Alle Assets sollten entsprechende Maps (Albedo, Normal, Roughness, Metalness) haben.

High-Resolution Lighting: Dynamische Schatten für Sonne/Mond und wichtige Lichtquellen (z.B. Scheinwerfer). Achtung auf Performance (Schattenkaskaden, begrenzte Anzahl Lichtquellen mit ShadowMap).

Volumetrische Effekte: Implementierung von Lichtstrahlen/God Rays in post-processing, Nebel per Raymarching oder volumetric shader (Three hat Beispiele in WebGPU).

Post-Processing Pipeline: Einsatz von Drei/Post oder manuelles Composer: Effekte wie Bloom (für Lichter glühen), Motion Blur (bei schnellen Kamerabewegungen oder Fahrzeugen), Depth of Field (cinematic Fokus in Cutscenes), Color Grading LUTs per Shader for different moods.

TSL Shader Modules: Erstellen eigener Shader-Node-Materialen via TSL: z.B. für Regen auf Oberflächen (dynamische Normalmap Wellen), Glass Shader (Reflektion+Refraction), Hologram-Shader falls Sci-fi elemente, etc. TSL ermöglicht uns modulare Shader und sogar Compute-Shader-Funktionalität im Rahmen der Pipeline.

WebGPU nutzen: Wenn verfügbar, kann ein experimenteller Pfad aktiviert werden. Vorteil: Compute Shaders für z.B. Partikel (Phase 21) oder KI (boids) lassen sich über WGSL definieren. TSL kann diese nutzen und mit WebGL fallback.

GPU-Beschleunigung (GPGPU): Einige Simulationen aus Phase 21/28 werden auf GPU ausgelagert (Partikel, evtl. Crowd update). Mit TSL integrierte Compute-Nodes können wir diese Berechnungen einbetten.

Aufgaben:

Rendering Pipeline aufsetzen: Falls noch nicht, Verwendung von Canvas mit drei's <Leva> or <Effects> to add postprocessing. Oder manuell Three.EffectComposer nutzen. Sicherstellen, dass die Auflösung für 4K eingestellt werden kann (UI-Option), aber initial evtl. 1080p render target for performance.

Licht und Schatten konfigurieren: Eine Sonnenlicht-Quelle (DirectionalLight) für Tag mit ShadowMap (evtl. drei Kaskaden if large area), Nachts Mond ähnliches aber dunkler. Zusätzlich Punktlichter in Straßenlampen (viele -> besser ohne Schatten, stattdessen global GI approximation). Finetune ShadowMap resolution (4K for sun?), Range etc. Bake bei Bedarf statische Schatten für Innenräume (lightmaps) um Performance zu entlasten.

PostProcessing-Effekte implementieren: In Composer hinzufügen: Bloom (threshold so nur sehr helle emitters blühen), GodRays (z.B. via postprocessing shader or custom TSL node if WebGPU), MotionBlur (if camera moves fast or as stylistic during car chase), Vignette for cinematic feel, maybe Chromatic aberration subtle. Ensure they can be toggled in settings (Phase 25).

Shader-Spezialeffekte via TSL: Konkrete Shader anfertigen:

GlassMaterial: NodeMaterial that does refraction: use scene depth texture or envMap for refraction. TSL to combine with cracks normal map for broken glass effect.

WetSurface: For rainy weather, a shader node that blends between dry texture and a reflective wet look (roughness -> low when wet).

Hologram (if needed in UI or so): e.g. for some AR display effect in game, using sin wave distortion.

Use of TSL ensures outputs can run on WebGPU. Possibly cite that integrated compute for GPGPU tasks is easier with TSL.

WebGPU Rendering Option: Test the Three.js WebGPURenderer. Probably off by default (requires browser flag as of 2025 maybe available stable). But ensure our materials largely are NodeMaterials (TSL) which can compile to WGSL. Create a toggle (maybe query if navigator.gpu available). If on, enjoy performance boost in heavy scenes (predict 500 NPC easier due to GPU compute).

HDR and Color Grading: Use float rendering for HDR bloom, then tone map (ACES tone mapping perhaps default in Three). Option to apply LUT color grading for different moods (cool blue for night, warm for day, etc.).

Optimization via LOD & Frustum Culling: Ensure all heavy geometry has LOD levels (can generate simpler models for far distance). Use THREE.LOD or manually switch models based on camera distance. Also ensure R3F's culling is on (objects outside camera auto not drawn). For massive static geometry, consider dynamic occlusion if needed (could integrate three-mesh-bvh to do occlusion queries, advanced).

Debug Shading Mode: Implement a toggle for debugging: wireframe mode, normal visualization etc., to help development.

Visual Consistency and Polishing: Check that materials of all assets are calibrated (all roughness in realistic range, no overly shiny unless intended, etc.). Setup an IBL environment map (e.g. HDRI of a sky or city) to give baseline reflections. Use it with PMREM for realism. Also ensure no material has high emission inadvertently (like no neon unless intended).

Testing on target hardware: On an RTX-level GPU, test in 4K with full effects – measure performance. Identify bottlenecks (e.g. fillrate heavy effects at 4K like heavy postprocessing). Optimize: e.g. render certain passes at half res (common for bloom, dof). Possibly allow DLSS or FSR if hooking up (maybe out of scope for web, but if WebGPU with WGSL maybe future).

Phase 21: Partikel- & Effekt-Systeme

Technische Beschreibung: Ein umfangreiches Partikel-System ermöglicht spektakuläre Effekte: Explosionen, Feuer, Rauch, Funken, Blut, Mündungsfeuer, Regen/Schnee (aus Phase 15), Staub, etc. Es sollen ca. 12 unterschiedliche Partikelsysteme eingesetzt werden. Die Herausforderung: Partikel in WebGL/WebGPU performant darstellen, gerade in großer Zahl.

Wir nutzen GPGPU-Techniken: GPU-basiertes Partikelsystem, bei dem z.B. Bewegung der Partikel in einem Vertex Shader berechnet wird (oder mittels Compute bei WebGPU). In Three.js kann man Partikel als Points (Punkt-Sprites) realisieren oder als instanzierte Sprites. Für große Mengen wie Regen (Millionen Tropfen) - aber Regen kann auch simpler (limit auf z.B. 10k, bewegt sich mit Kamera). Explosionen und Rauch eher lokal (<1000 Partikel pro Ereignis).

Setzt TSL ein: TSL erlaubt uns Compute-like Nodes und den SpriteNodeMaterial. In WawaSensei Example wurden hunderttausende Partikel als SpriteNodes gerendert mit WebGPU. Wir können dieses Prinzip adaptieren.

Effekte orchestrieren: z.B. eine Explosion ruft gleichzeitig: Feuerball-Partikel (glühende Orangen), Rauch (graue billboards, langsam steigend), Funken (kleine helle Punkte wegspritzend), und Trümmer (Phase 18 physik).

Das System sollte mehrere Emitter definieren, die getriggert werden können. Jeder Emitter hat Parameter: Partikeltyp, Spawnrate oder Burst, Lebensdauer, Geschwindigkeit, Streuung, Gravitation, etc.

Aufgaben:

Partikel-Engine auswählen/entwickeln: Prüfen, ob es eine Library gibt (z.B. tweenParticles oder so). Oder selbst aufbauen: Nutzen von Points geometry mit ShaderMaterial. Evtl. einfacher: in Drei gibt es Sparkles or so, aber das ist eher simpel. Selbst entworfene "ParticleManager": Verwaltung von Pools je Effekt.

Material und Shader für Partikel: Erstellen eines generischen Partikel-Vertex/Fragment-Shader, parametriert über Attribute (oder textures bei GPGPU). Minimale Version: CPU spawnt Partikel, add to buffer (pos, velocity, age), each frame update on CPU small counts = okay for <1k. Für >10k better push to GPU: e.g. use transform feedback or compute.

Option A (WebGL2): Use a texture containing particle state (pos+vel for each), update via framebuffer ping-pong with custom shader (as known technique).

Option B (WebGPU): use compute shaders with TSL, simpler approach if available.

Considering timeline, do CPU for moderate counts, and do heavy only for rain using instancing.

Definition der Emitter: z.B.

MuzzleFlash: 20 particles, very short life, bright yellow sprite, spawn in random cone forward.

Explosion: 100 fire + 100 spark + 50 smoke at point.

SmokePuff: 50 grey, slowly rising, fade out.

Blood: 30 red droplets (spawn on NPC hit).

Sparks (for metal hits): 20 bright, bounce off ground (maybe physics or just ballistic arc).

Dust from collapse: large number small dust, maybe simulate as expanding sphere.

Rain: continuous emitter above camera, 5000 vertical fast streaks.

Snow: similar but slow drifting.

etc.
Encapsulate each in a config entry.

Triggering events hooking: Connect to game events: e.g. Phase 18 destruction calls ParticleManager.explode(position), which looks up explosion config, spawns needed emitters. Gun shot triggers muzzle flash at barrel position. Car drift triggers small dust at wheels (if on dirt).

Visual aspects: Use additive blending for fire/sparks (so bright), alpha blending for smoke (with soft edges). Use small textures for sprites (like a blurry disc for smoke, an elongated streak for rain). Possibly create these procedurally or include as PNG.

Lighting & Shadows: Usually particles don't cast shadows (except maybe big smoke might). It's expensive for many. Could allow largest smoke to receive shadows for realism (if WebGL, skip; if WebGPU, maybe).

Performance: Fine tune counts, use frustum culling for emitters if off-screen (e.g. explosion behind camera doesn't sim when not seen? Or still do because might come into view). Possibly use distance-based reduction (far away explosions spawn fewer particles or none). The GPGPU approach if used ensures GPU does heavy lifting. If CPU, ensure to avoid heavy math in JS for too many items.

Lifetime and recycling: Particles should die after set lifetime and be reused. Implement pool so we don't GC each time. Possibly allocate buffers of max size per emitter upfront. Use an attribute "alive" or age beyond life to move them off or reuse index.

Testing density: Simulate worst-case: many simultaneous explosions, rain on, etc. See if frame still >60. Optimize accordingly (maybe reduce simultaneous count or skip certain effects if already many active).

Integrate with WebGPU (optional): If running on WebGPU, try enabling compute update for a particular heavy emitter (like the continuous rain or a persistent smoke column). Use TSL's storage buffer or texture support. This is advanced, if time allows, else document as potential improvement.

Phase 22: Audio-System

Technische Beschreibung: Das Audio-System umfasst Soundeffekte, Musik und evtl. Sprach-Ausgabe. Insgesamt sind 150+ Soundeffekte und 20 Musiktracks geplant. Die Umsetzung erfordert 3D-Sound-Fähigkeiten (Klangpositionierung in der Welt), ein Mischsystem für parallele Sounds sowie einen Musik-Manager, der dynamisch zwischen Musikstücken wechseln kann (z.B. ruhige Musik in Erkundungsphasen, action-geladene in Kämpfen).

Genutzt wird WebAudio API via Drei's useAudio oder eigene AudioLoader. 3D-Sound kann mit PositionalAudio in Three.js erfolgen, das Entfernungs-Abfall etc. handhabt. Für Musik eher normale HTML5 Audio or one WebAudio source since non-positional.

Sprachausgabe (Voice Lines) falls vorhanden ~15 Zeilen, die punktuell in Zwischensequenzen oder Missions komm. Die müssen lippensynchron zum Dialog ablaufen (siehe Phase 13 hooking voice).

Auch implementiert: Ein Audio-Effekt-Manager für z.B. Hall in bestimmten Räumen (Innenraum-Effekte), Low-pass filter bei Explosion nahe (Ohrensausen), Doppler-Effekt bei Fahrzeugen. Das kann WebAudio by connecting Filter nodes.

Aufgaben:

Audio Assets verwalten: Struktur in public/audio/ oder so, Unterordner für SFX, Music, Voice. Eine JSON oder TS list file für easy referencing (key -> filepath).

Sound-Manager Klasse: Stellen, um Sound abzuspielen. Bsp: AudioManager.playSound(name, position?). Wenn position gegeben, entweder create PositionalAudio at that location attached to a mesh (like gun fire attaches to gun muzzle, vehicle engine sound attaches to vehicle). For non-positional (UI click, background ambience) just normal Audio without panning.

3D Sound Setup: For Three PositionalAudio: need Listener on camera (R3F Canvas has listener). The AudioManager can manage gain nodes. Possibly grouping (master volume control: overall, plus separate SFX, Music sliders).

Music System: Possibly have 2 tracks that can crossfade for smooth transitions. Or at least stop one and play next with slight fade. A playlist or states: e.g. "exploration", "combat", "suspense" loops. Missions might dictate track choices. Implement logic e.g. if Eskalation high -> switch to tension music. All definable mapping.

Voice Lines: Integrate with Dialog (Phase 13): if a dialog node has voice: file, AudioManager plays it as non-positional (or slight spatial if NPC stands somewhere, but mostly treat as UI so volume not drop if camera moves).

Environmental Audio: Looping ambient sounds per level: e.g. city traffic noise in distance, crowd murmur in demonstration, wind noise at night. Place them as looping PositionalAudio or stereo ambient. Possibly level config triggers them.

Filters & Effects: Use WebAudio nodes for special effects:

Explosion close -> trigger a short tinny ear-ringing (lowpass filter all sounds for few seconds, then restore).

Indoors: if player inside building, apply reverb or echo effect to sounds. Could detect via zone triggers (phase 16 define reverb zones).

Doppler effect: Three PositionalAudio might do automatically? Not sure, might need manual frequency shift for fast-moving vehicles; could be heavy, skip if needed.

Volume rolloff curves: ensure realistic (e.g. gunshot heard from far but quieter).

Performance & Concurrency: Limit number of simultaneous sounds. Polyphony capping: e.g. if 10 gunshots in one frame, maybe mix into one or limit. Avoid memory leak: reuse Audio objects or have a pool for repetitive sounds (footsteps).

Volume controls: Provide global variables for SFX volume, Music volume. UI (Phase 25) will manipulate. Apply by setting gain node values. Possibly separate gain for voice as well.

Testing & Balancing: Go in game, check if important sounds audible in mix, adjust volumes relative. For instance, engine noise vs music vs voice clarity. Possibly implement ducking (music volume lowers when dialogue voice plays). Also verify spatialization - e.g. explosion behind player pans correctly to headphones.

Phase 23: UI/HUD & Menüsystem

Technische Beschreibung: Hier werden die User Interface Elemente gestaltet: das In-Game HUD (Heads-up-Display) und die Menüs (Hauptmenü, Pause-Menü, Einstellungen). Das HUD zeigt wichtige Spielerinfos: Gesundheit, Ausdauer, Munitionsstand, vielleicht ein Mini-Map oder Kompass, Missionsziel-Indikator, Eskalationslevel-Anzeige, Moral/Ruf Indikatoren. Stilistisch sollte es ins Setting passen (z.B. seriös, modern). Da evtl. Corona-Thematik, könnte HUD Elemente wie "Infektionsanzeige" haben – aber unklar, scheint mehr politisch/Action orientiert.

Menüs: Startbildschirm mit Spielstart, Optionen, ggf. Kapitelwahl. Pause-Menü im Spiel zum Resume, Optionen, zum Hauptmenü zurück. Optionen-Menü ermöglicht Einstellen von Grafik (Qualität, Auflösung?), Audio-Lautstärken, Steuerung (Tastenbelegung?), Gameplay (Schwierigkeitsgrad?). Accessibility (Phase 25) separate.

UI wird mit React DOM oder HTML/CSS überlagert auf Canvas umgesetzt (z.B. via createPortal in R3F for HTML). R3F drei hat <Html> component for placing HTML in 3D or as overlay. We likely do overlay for HUD fixed to screen, except maybe some 3D UI element (like marker in world space showing mission location or NPC name, that can be done with <Html> anchored to object).

Aufgaben:

HUD-Layout entwerfen: Zeichnen einer schematischen Anordnung: z.B. Linksboven Lebensbalken & Rüstungsbalken, rechtsboben Missionsziel Text, obenmittig Eskalationslevel (evtl. als Sterne oder Polizei-Warnsymbol), untenlinks Moral/Ruf (evtl. als Balken oder icon + value), untenrechts Munitionsanzeige für aktuelle Waffe, evtl. Waffensymbol. Mittig unten: ggf. Aktionshinweis "Drücke [E] um zu interagieren" kontextabhängig. Fadenkreuz in der Mitte falls aiming.

Technische Umsetzung HUD: In React, eine separate HUD-Komponente, die in DOM gerendert wird (outside Canvas). Use absolute positioning for elements. Or use R3F's HUD canvas layer. Possibly easier: normal React DOM for flexibility in styling (CSS).

Bindung an Game-State: HUD muss live Daten reflektieren. So binden wir an Zustand-store (Phase 3/4): e.g. const health = useGameState(state=> state.player.health). Update triggers re-render, show updated health bar length. Similarly ammo count from weapon state, etc.

Design HUD Elements: Use visual assets from UI design (icons for health, ammo, etc.). Or simple styled divs. Possibly incorporate mini portraits or faction logos for rep? Up to aesthetics. Should be thematically consistent (e.g. color scheme maybe red for health, blue for stamina etc.).

Mission UI: Show current mission objective text on screen (top or bottom). e.g. "Ziel: Begib dich zum Impfzentrum". Update via Missionsmanager events. Possibly also small arrow indicator or marker in world for location (like an arrow on screen border pointing to objective).

Main & Pause Menus: Implement a separate React route or state when game not running. MainMenu: Title, background (maybe animated BG or static image), buttons for Start, Settings, Credits, Exit. PauseMenu: overlay with Resume, Settings, Quit. Use same component style for consistency.

Settings UI: Sliders for volumes, dropdowns for resolution (if applicable on web maybe not), toggles for graphics features (postFX on/off, etc.), key mapping if ambitious or at least list controls. Connect these to actual systems (volume to AudioManager etc).

In-Game Over/Cutscene UI: Might need minimal UI for when player dies (Game Over screen with stats or restart option), and for final end (Ending summary and credits).

Integration with Input: Menus navigierbar per Maus (easy) und per Keyboard/controller (arrow keys to change selection, Enter to activate). Possibly implement focus management or custom input handling for menus.

Testing on different resolutions: Ensure UI anchors correctly (using relative units or flex) so that 1080p vs 4K scaling is okay (maybe scale UI in 4K up a bit to be readable). Also test on different aspect ratios (16:9 vs 21:9 if window resizing allowed).

Performance: UI typically cheap but ensure heavy updates (like rapidly changing numbers) do not cause undue re-renders. Possibly throttle certain updates (but usually fine).

Localization support: If needed, structure text via i18n (phase 23 in anchor mentions i18n 10 items). Possibly the UI text "Press E" etc. might be multi-language. We can plan for a simple dictionary or use react-i18next if overhead acceptable.

Phase 24: Tutorial-System

Technische Beschreibung: Das Tutorial-System führt neue Spieler behutsam an die Spielmechaniken heran, insbesondere im Level 1 (Kärntner Straße). Geplant sind ~13 Schritt-für-Schritt Anleitungspunkte, die kontextabhängig eingeblendet werden. Das Tutorial soll dynamisch reagieren: z.B. erst wenn der Spieler eine bestimmte Aktion noch nicht versteht, Hilfstexte anzeigen. Es sollte aber auch übersprungen werden können von erfahrenen Spielern.

Im Tutorial-Level sind Trigger vorgesehen, die bestimmte Tips auslösen. Beispiel: Spieler erreicht eine Tür -> Einblendung "Drücke [E] um Türen zu öffnen". Oder erste Konfrontation -> "Nutze [LMT] zum Schießen". Idealerweise mit visuelle Markierungen (Tasten-Symbol).

Das System steuert auch ggf. Einschränkungen: im Tutoriallevel könnten manche Aktionen gesperrt sein bis erklärt (z.B. Waffe noch nicht ziehen können bis es erklärt wurde, um Reihenfolge zu sichern).

Aufgaben:

Tutorial-Schritte definieren: Liste aller Lerneinheiten, in sinnvoller Reihenfolge. Etwa: Bewegung (WASD + Kamera), Schauen (Maus), Interaktion (E), Kämpfen (Zielen, Schießen), Deckung, etc. Explizit die, die das Spiel besonders ausmachen (Moral-Hinweis?). Notieren, wo im Level diese am besten stattfinden.

Erkennungs-Trigger setzen: In Level 1 z.B. Zonentrigger: Spieler bewegt Kamera das erste Mal -> "Gut, schaue dich mit der Maus um." Oder nach x Sekunden Idle -> Tipp "Bewege dich mit WASD". Implementation: Monitor certain conditions (lack of movement, first time pressing certain key etc.).

Tutorial UI-Anzeigen: Design kleiner Popups oder text at top/bottom. Possibly highlight portion of screen or an arrow pointing to UI element (like health bar introduction). Use simple stylized text box with maybe semi-transparent background.

Progression Logik: TutorialManager to ensure each tip is shown only once, and possibly require acknowledging (e.g. press the mentioned key to continue or press any key to dismiss tip). Sequence them so as not to overwhelm (one at time).

Optional Skipping: Provide an option to skip tutorial entirely (maybe at game start ask "Tutorial spielen?"). If skip, Level1 either becomes normal mission or skip to next.

Integration Missions Phase 12: The tutorial likely integrated as the mission in Level1 with some special flows. Missions scripting might wait for tutorial step done. Possibly handle via event triggers: TutorialManager marks tasks as completed (like "player moved" event triggers mission objective complete "Learn Movement").

Gentle difficulty: Ensure during tutorial things like enemies either are absent or don't harm player seriously while instructions open (maybe freeze AI when tip showing).

Repeat cues if needed: If player fails to follow (e.g. doesn't press jump after prompt), maybe repeat or amplify tip (flash text, or a NPC voice encourages).

Tutorial metrics: Possibly log how quickly actions done, to gauge if tutorial effective, though not necessary unless analytics.

Testing: Try with someone unfamiliar, see if instructions clear, or if any needed not covered.

Phase 25: Barrierefreiheit

Technische Beschreibung: Das Spiel soll möglichst barrierefrei sein, d.h. Zugänglichkeits-Optionen anbieten. Dazu gehören: Anpassbare Steuerung (Tasten umbelegen für Leute mit Einschränkungen), verschiedene Farbschemata für Farbsehschwäche (Colorblind Modes), Untertitel für alle Dialoge und Audiohinweise, skalierbare UI (größere Schrift), eventuell ein Modus für motorisch eingeschränkte (z.B. Zeitlupe Option oder Auto-Aim).

Auch Option, schnell viel Klick/Drücken zu ersetzen (z.B. statt Button Mashing eine Halten-Option).

Implementiert vor allem im Optionsmenü (Phase 23/24), aber auch in core Systems: z.B. Untertitel = Dialogsystem Phase 13 muss Text anzeigen können während Voice. Farbschema = UI CSS anpassbar (contrasty mode). Sound = vielleicht visual cues (Hitmarker or controller rumble not applicable on PC except gamepad).

Aufgaben:

Schrift- und UI-Skalierung: Eine Option im Menü für UI-Größe (100%, 150% etc.). Implementieren indem die CSS oder transform scale der UI root je nach Setting gesetzt wird. Test if it remains crisp enough (maybe use vector icons).

Colorblind-Modi: Evtl. 2-3 Presets (Deuteranopia, Protanopia, Tritanopia). Implementation: adjust color palette of UI (like friend/enemy indicators colors). Possibly apply a post-process filter shader if needed globally (but easier: design UI with shapes + patterns not rely solely on color).

Untertitel: All dialogues from Phase 13 have text, so ensure an option "Subtitles On" that will display dialogues text even if voice present. For environmental sounds (explosion, "Boom" subtitle?), maybe not needed typically, but key audio cues like "Police: Stop!" from NPC should be shown if accessibility needed. Possibly have generic subtitles for important off-screen lines.

Input remapping: Provide in options to rebind keys. That means storing a keymap and using that in input system (Phase 5 hooking uses dynamic). UI for rebind: click on control, press new key. Save to local storage.

Alternate input: If someone cannot use mouse well, maybe implement partial gamepad support. Not explicitly asked, but good AAA practice. If time, include mapping for gamepad (using e.g. gamepad API or an existing library).

Difficulty aids: Possibly include an easier difficulty setting: lower enemy damage, slower escalation. Though that's general, but accessibility could consider adding "invincibility mode" or "skip quicktime events" if such exist. Check design if needed.

Audio accessibility: Volume control separate for voices (for hard of hearing might want voices louder relative to effects). And maybe a mono audio option for those with one ear hearing (some games provide this). Could implement by mixing both channels.

Visual effects toggle: Allow disabling motion blur, flashes (for epilepsy). Already in options we have toggles for postFX; ensure things like rapid flashing (police lights) have a toggle or toned down in accessibility mode.

Testing with guidelines: Verify against common accessibility guidelines (e.g. UI text contrast >= 4.5:1 ratio for readability).

Documentation: In game manual or README, mention these features so players know. Possibly incorporate into menu initial boot "Accessibility Settings" upfront.

Phase 26: Persistenz & Speicherstände

Technische Beschreibung: Das Speicher-System stellt sicher, dass Spielstände und der persistente Weltzustand gesichert und geladen werden können. Angesichts der komplexen Welt will man, dass z.B. zerstörte Objekte, getötete NPCs, Missionsfortschritt etc. beim Laden fortbestehen (Weltpersistenz).

Wir planen Checkpoint-basierte Saves (z.B. automatischer Save bei Missionsende oder Level-Wechsel) und eventuell manuelle Speichermöglichkeiten (im Menü "Speichern" falls gewünscht). Da es sich vermutlich um ein webbasiertes Spiel handelt, kann im Browser z.B. LocalStorage/IndexedDB genutzt werden. Alternativ, falls PC Standalone via Electron, normale Dateispeicherung.

Die Save-Daten beinhalten: Spielerstatus (Position, Gesundheit, Inventar, Moral, Ruf), Missionsfortschritt (aktuelle Mission ID und Phase), Eskalationslevel (wenn relevant), Weltzustand (Zustand zerstörbarer Objekte, erledigte NPCs). Um Weltzustand zu speichern, muss man eindeutig identifizierbare Entities haben (IDs). Evtl. kann man aber auch simpler: Speichere nicht jeden Kleinkram sondern nur Schlüsseldinge. Aber für absolute Persistenz vielleicht doch. Z.B. Liste zerstörter Objekt-IDs (Phase 18), Liste wichtiger NPCs tot/leben.

Aufgaben:

Speicherdaten-Struktur festlegen: Definiere SaveGame format, z.B. JSON:

{
  "player": { "position": [x,y,z], "health": 100, "morality": 20, "reputation": {...}, "inventory": [weapon1,weapon2,...] },
  "mission": { "current": "Mission5", "phase": 2, "completed": ["Mission1","Mission2",...] },
  "world": { "destroyedObjects": ["obj_12","obj_47"], "npcStates": { "npc_33": "dead" } },
  "timestamp": "...",
  "version": 1
}


So ziemlich all info in hierarchischer Form.
2. Serialisierung & Deserialisierung implementieren: Funktionen saveGame(slot) und loadGame(slot) die den State aus dem Spiel ausliest bzw. einliest. Serialisieren bedeutet: z.B. PlayerPosition aus three.js, transform to numbers. Only store relevant precision. Possibly compress large arrays if exist, but likely small enough.
3. Speicherort: Im Browser: use localStorage.setItem("save1", jsonString) oder better indexedDB if large. Could try simpler localStorage if data not huge (<5MB likely). If desktop, file write (not relevant in web context unless using electron FS).
4. Auto-Save: Hook up auto-saves at key points. Missionsmanager kann nach Missionsende saveGame. Levelchange triggers save. Possibly periodic backup saves to avoid data loss.
5. Load logic: When loading, need to properly reset game state: unload current level, load appropriate level (if different from current), spawn player at saved position (with some check if safe?), restore health, etc. Set mission progress (maybe directly jump to mission state? Could call some mission skip triggers).
6. Persistente Welt anwenden: For each destroyed object id in save, find that object in level and apply destruction (like skip to broken state). For NPC states: if some important NPC was killed, ensure not spawned or is marked dead in scene (maybe body on ground if we keep). Possibly simpler: if dead, do not spawn in spawner. So Spawner should check save "if npc id in dead list skip".
7. Multiple Save Slots: Perhaps at least 3 slots and one auto-save. Provide UI in main menu to choose. Not crucial if not asked, but common. Implementation: store differently, e.g. "save_slot1".
8. Testing Save/Load: Try at different game stages, see if any data not captured (like escalation level, or certain flags) - add them. Check that loading mid-combat doesn't break (maybe choose safer points to allow loading).
9. Edge Cases: If game code updates (version change) old saves might be incompatible. Could embed a version number, and attempt conversion or warn user if mismatch (for dev, may not need robust backward compat).
10. Security: If cheating an issue, maybe obfuscate or compress data so not trivially editable. But probably not necessary for single player.
11. Performance: Saving is quick (just generating JSON), but if world state large (e.g. tracking hundreds of minor objects), it could be weighty. We might not store minor things (like hundreds of bullet hole decals, skip those; they disappear on load which is fine). Focus on critical and large things.

Phase 27: Achievements & Progression

Technische Beschreibung: Ein Achievement-System motiviert den Spieler durch langfristige Ziele und Belohnungen. Geplant sind ~50 Achievements, z.B. "Mission 1 abgeschlossen", "100 Gegner besiegt", "Alle Enden gesehen", "Keine Zivilisten verletzt in Level 3", etc. Diese Erfolge werden getrackt und im UI (z.B. separater Menüpunkt) angezeigt. Evtl. auch Steam-Integration, aber wohl irrelevant im reinen Web-Kontext.

Zusätzlich könnte ein einfaches XP/Level-System vorhanden sein (Progression), aber da in Spezifikation nicht erwähnt, wohl Achievements als Hauptprogress. Allerdings "Fortschrittsverfolgung" im Phasentitel deutet evtl. an Fortschritt im Sinne Missionsfortschritt oder Stats.

Achievements-Speicherung muss persistent sein (Phase 26 can include them).

Aufgaben:

Liste der Achievements erstellen: Alle 50 mit Namen und Kriterien. Kategorisieren: Story (für Missions/Enden), Kampf (z.B. X Kills mit Waffe Y), Erkundung (alle Orte besucht), Moralisch (Spiel ohne Zivilisten zu töten), Fun (Easter eggs).

Tracking-Mechanismen implementieren: Für jedes Achievement definieren, welche Events oder Stats gebraucht: z.B. Zähler für "Gegner getötet" – global im State killsCount++ each kill. Or flags like noCivKillInLevel3 that is set false if any civ kill event in that level.

Achievement Manager: A system that listens auf relevante Events (via global Event bus or direct calls in code). Jedes Mal, wenn ein Kriterium erfüllt, prüfen ob entsprechendes Achievement noch offen. Wenn ja, freischalten (unlock).

Freischalten und Benachrichtigen: Wenn Achievement erreicht, im UI eine Einblendung ("Achievement unlocked: ...") anzeigen, mit vielleicht einem kleinen Icon/Trophy. Diese UI Componente kurz anzeigen (like bottom of screen).

Speichern der Achievements: In SaveGame oder separate (maybe separate, to not tie to single save slot - achievements usually across game). Possibly store in localStorage separate key. Achievements typical unlocked forever once, no matter if new game.

Achievement-Anzeige: Im Hauptmenü oder Pause ein Bereich mit Liste aller Achievements, mit Status (locked/unlocked, maybe date unlocked). Provide icons or just text list with checkmark.

Integration in Gameplay (Belohnungen): Option: Achievements könnten Belohnungen schalten (Cheats, concept art, etc.). Not necessary, but mention if any. If yes, need a system to deliver reward (like unlock a skin etc.). Might skip if not needed.

Statistics Tracking: In service of achievements, track various stats (counters for kills, shots fired, damage taken, missions done etc.). Possibly present these in a "Stats" screen too.

Testing Edge Cases: Ensure achievements unlock properly (some might need careful conditions to avoid multiple triggers or missing triggers). E.g. "all endings" only after final mission multiple times -> track which ending seen, then unlock after all 5.

Reset Achievements option: For completionists maybe allow clearing to re-earn. Could implement if time.

Phase 28: Performance-Optimierung

Technische Beschreibung: Diese Phase bündelt die vielen Optimierungsmaßnahmen (teils schon in früheren Phasen erwähnt) und führt umfangreiche Performance-Tests durch. Ziel ist stabile 60 FPS bei maximaler Grafik auf High-End-PC, und annehmbare Performance auf mittleren PCs ggf. mit reduzierten Einstellungen.

Optimierungsfelder:

Spatial Partitioning: Einsatz von BVH für Raycasts/Kollision, Octree for find nearby objects if needed. Already three-mesh-bvh used for static geometry, Rapier has broadphase for dynamics.

Level of Detail (LOD): As defined, implement progressive LOD models for NPCs, vehicles, perhaps use simpler shader for far objects (no normal maps far).

Instancing & Batching: Group identical meshes (lamps, trees, crowd NPC maybe if static in distance) to single draw calls. Use InstancedMesh for such.

Object Pooling: Avoid constant creation/destruction of objects (bullets, particles, NPC on spawn). Recycle from pools.

WebWorkers: If CPU-bound tasks: Perhaps AI for 500 NPC can be heavy, consider moving some calculations to a WebWorker thread (like background update of far NPCs or pathfinding). Or use threads if WebGPU compute not available.

Memory Management: Ensure no memory leaks: event listeners removed, disposed geometries if not used. Use THREE.Cache for reused assets.

Profiling & Bottleneck removal: Use browser Performance and Three.js tools to find slow parts: e.g. too many draw calls, heavy shader? Then fix by optimizing shader or combining materials (like do we need unique material per object or can share).

GPU optimization: Use reasonable texture sizes (maybe downscale huge 4K textures if not needed up close). Mipmaps properly generated to avoid aliasing/perf issues.

Aufgaben:

Profiling Setup: Utilize stats (fps, frame time) in dev. Possibly incorporate three.js Inspector or Chrome DevTools performance to capture frames. Also consider using Three.js built-in tools (if any).

Batching/Instancing audit: Examine scene at peak (e.g. Heldenplatz with crowd & vehicles) – count draw calls. If hundreds+, identify repeating meshes to instance. Implement instancing for them (replace individual meshes with one InstancedMesh with many matrices).

LOD implementation: Create LOD objects for heavy models (NPC, vehicles, some buildings): If not already prepared, generate simplified versions (maybe manually decimate models in Blender or use three.js SimplifyModifier). Then code: LOD.addLevel(highDetail, 0), LOD.addLevel(medDetail, 50), LOD.addLevel(lowDetail, 100) etc with distances. Attach to scene in place of normal mesh.

Culling tunings: The engine does frustum cull by bounding sphere by default. Ensure bounding boxes are correct for instanced groups. Potentially implement dynamic occlusion culling: e.g. divide world into zones and don't update/render NPCs outside camera/zone. Might integrate with our partition structure from NPC manager (only simulate near NPCs as did).

Worker offload: Identify heavy CPU loops - possibly NPC AI decision tick if done synchronously. Could experiment offloading AI calcs (like pathfinding, or behavior tree evaluation for many NPCs) to a WebWorker (communication overhead might offset, but could try partition NPC updates).

GPU performance: Check fill rate: effects like full-screen godrays or heavy particles can cost. See if resolution scaling needed (like temporarily render at lower res during heavy scenes). Or include an option for resolution scale in settings (internally render e.g. 0.8x).

Physics performance: 500 bodies ragdoll with joints could be heavy, but rapier is efficient. Maybe in stress times skip sim of far-away ragdolls (set to sleep). Also consider limiting number of active ragdolls at once (others just despawn bodies after a while).

GPGPU usage: We have it in Particles, maybe could also do crowd movement computing on GPU if needed, but probably not trivial. Ensure our TSL compute for particles is efficient (like using one large compute for many vs many small).

Memory footprint: Monitor memory usage. Freed when level unload? Ensure .dispose() called on geometries, materials removed event listeners. Large arrays (like navmesh) maybe keep as static.

Testing on target hardware: Actually run on an RTX-level PC if possible. If only dev environment, simulate by capping fps or such, not ideal. But have quality presets: "Ultra" for RTX (all features on), "High/Med" for weaker - reduce particle count, turn off volumetrics etc. Expose those in options. Possibly auto-detect (if performance low few seconds, prompt to lower settings).

Final framerate optimization: Tweak until most demanding scenarios (e.g. big firefight at night in rain with crowd) holds ~60fps. If not, decide what to sacrifice (density of crowd or effect).

Document performance features: Summarize in technical doc what advanced techniques used (for perhaps portfolio/presentation), e.g. "Used BVH for 10x faster raycasts, GPGPU for large-scale particles, etc."

Phase 29: Testing & QA

Technische Beschreibung: In Phase 29 wird das Spiel umfangreich getestet. Es werden Unit-Tests für kritische Funktionen, Integrationstests für zusammenhängende Abläufe und spielerische Tests (QA) durchgeführt. Geplant sind mindestens 25 Unit-Tests und weitere Integrationstests, sowie manuelles Gameplay-Testen aller Missionen und Enden.

Automatisierte Tests: mithilfe von z.B. Jest für reine JS/TS-Logik (z.B. Utility-Funktionen Phase 4, Zustand-Veränderungen, Missions-Logik). Integrationstests evtl. mit headless browser or controlled environment to simulate sequences (aber 3D Dinge schwer vollautomatisch, vlt. test mission script flows by calling functions).

QA: Testers spielen das Spiel, loggen Bugs, überprüfen, ob Anforderungen erfüllt (868 Komponenten 😉). Besonderes Augenmerk auf: KI reagiert richtig, keine Softlocks in Mission, Physik glitchfrei (kein Durch-die-Welt-Fallen), Performance stable, UI verständlich.

Aufgaben:

Testplan erstellen: Liste der zu testenden Bereiche: Gameplay-Mechaniken (Bewegung, Kampf, Eskalation), Missions und Dialoge (alle Enden triggerbar?), Systems (Saving/Loading correctness), edge cases (Was passiert, wenn man in Mission X sofort NPC Y erschießt?).

Unit-Testing Infrastruktur: Einrichten von Jest or similar. Write tests for:

Utility functions (math, string, etc.).

State management: e.g. test that moral adjustments clamp between -100 and 100.

Mission logic: simulate conditions to ensure mission transitions correctly.

Dialogue branching: function that given a choice yields correct next id (without actual UI).

Integration Test Cases: Possibly write some automated flows. For example, simulate player picking up item triggers mission update. Could do in code by calling the functions because full gameplay loop not easily headless. But at least test Save/Load: create fake game state, save, load, compare if consistent.

Continuous Integration: If using CI pipeline (like GitHub actions), incorporate test running on push.

Manual QA and Bug tracking: Use an issue tracker to log bugs found. Possibly categorize by severity. Ensure each major feature from earlier phases has been manually verified:

E.g. Ragdoll: test on various surfaces, ensure no physics explosion.

Multi-branch dialogues: check each branch triggers correct flag.

Achievements: unlock conditions actually unlock.

Performance Testing: As part of QA, measure performance on different machines if available (High-end, mid-range, maybe a laptop GPU to gauge scaling). Identify if any memory leaks by monitoring usage over long play session.

Usability & UX feedback: Have some testers who were not developers play through tutorial and a few missions, gather feedback on clarity, difficulty balance, fun factor.

Edge-case testing: Try to break game: go out of bounds, skip objectives (like run to end of level without doing mission), see what happens. Implement fixes like invisible walls or fail conditions if needed.

Regression tests: If bugs fixed, re-test those scenarios to ensure no recurrence.

Final QA sign-off: Ensure all test cases pass, all high severity bugs fixed or acceptable. Possibly create a checklist from original requirements to tick off (like "500 NPC at 60fps achieved", "No TS errors" etc.). For example, compile with tsc --noEmit to ensure 0 TS errors.

Phase 30: Build & Deployment

Technische Beschreibung: In der letzten Phase wird das Spiel fertiggestellt für die Veröffentlichung. Dazu gehört der Build-Prozess (Minifizierung, Bundling, evtl. WebGPU fallback handling), sowie das Deployment auf die Zielplattform. Zielplattform ist High-End-PC, was hier vermutlich heißt Verteilung als Web (z.B. auf einer Website) oder evtl. als Electron App.

Angenommen Web: Deployment beinhaltet Upload auf einen Server, ggf. CDN für Assets. Stellen sicher, dass alle Assets eingebunden sind (eine Liste aus dem bundler). Service Worker für Caching könnte eingerichtet werden, sodass einmal geladene Assets offline vorliegen (für schnellen Reload).

Wenn PC standalone: Erstellen einer Desktop-Version via Electron oder NW.js bundling the web app, oder using an installer.

Weiterhin letzter Polish: Entfernen von Debug-Ausgaben, Konsolen, Test Keys. Sicherstellen, dass verbotene Dinge (Platzhalter, "TODO"s) wirklich raus sind. Das Spiel bekommt eine Versionsnummer, evtl. ein kleines Splashscreen.

Aufgaben:

Final Code Cleanup: Durchgehen des Repos, alle Debugging code entfernen (no console.log in production, cheat keys disabled). Check for any temporary assets or placeholders, replace them. Confirm compliance with spec (z.B. no "TODO" comments in final code).

Build Configuration: Adjust bundler config for production: enable minify, tree-shaking. If using Webpack/Vite, set NODE_ENV=production, etc. Generate source maps optionally (maybe keep separate).

Asset Pipeline: Ensure models, textures are optimized (maybe compress textures to GPU formats if possible (Basis/KTX2 for smaller size)). Preload critical assets or use dynamic import such that initial load not too heavy. Generate a manifest of assets if needed for caching.

Testing Production Build: Run the built version locally, test that everything works (some differences can occur due to base paths, or code that was fine in dev might break when minified due to subtle issues).

Deployment - Web: If it's a web game, prepare a static hosting. Possibly using GitHub Pages or upload to an S3 bucket or personal site. If multiple files, consider bundling in .zip for easy download? But likely just host it.

If Electron: package the app (use electron-builder).

If itch.io or Steam: prepare zip with executables.

Server/Backend Considerations: Likely not needed as it's single-player. If any online features, ensure server available. Not in spec though.

Versioning: Tag the build with a version (1.0.0). Also embed short hash or version in UI somewhere (so testers know which build).

Documentation for Release: Create a short README for players: controls, known issues. Possibly a separate technical documentation for future dev reference.

Post-Release Plan: Outline how updates would be handled (like if a patch needed, how to redeploy).

Final review meeting: Go through all items to ensure nothing critical left undone. Possibly get sign-off from stakeholders.

Launch: Make the game accessible to target audience. If applicable, send links or installables. Monitor initial feedback for any urgent bug fix.