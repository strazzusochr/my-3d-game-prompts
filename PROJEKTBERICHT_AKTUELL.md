# Professioneller Projektbericht

## 1. Projektueberblick
Das Projekt ist eine webbasierte 3D-Anwendung auf Basis von React, Vite, TypeScript und Three.js mit Simulationslogik, UI/HUD, Audio-Management sowie mehreren Server-Komponenten fuer lokale Laufzeit und Streaming. Ziel der letzten Arbeitsphase war nicht nur die technische Stabilisierung, sondern auch die Verbesserung der Streaming-Architektur, der Testbarkeit und der Clone-Sicherheit.

## 2. Erreichter Stand

### 2.0 Frischer Verifikationsstand vom 16.03.2026
- `npm run lint`: erfolgreich.
- `npm exec vitest run`: erfolgreich, 2 Testdateien und 7 von 7 Tests bestanden.
- `npm run build`: erfolgreich.
- Health-Endpunkt `http://127.0.0.1:7860/health`: erfolgreich erreichbar.
- Gemeldeter Health-Stand zum Verifikationszeitpunkt: `status=ok`, `profile=low`, `transportSource=canvas-webrtc`, `fps=128`, `rendererFps=128`, `viewerFps=0`, `internalPort=3099`, `publicPort=7860`.

### 2.0.1 Viewer- und Lastnachweis vom 16.03.2026
- Zwei weitere Viewer-Seiten wurden geoeffnet und der Health-Endpunkt achtmal im Abstand von rund 1,5 Sekunden abgefragt.
- Der Stream benoetigte eine kurze Aufwaermphase: zuerst `viewerFps=0`, danach stabile Werte zwischen 22 und 24 FPS.
- Gleichzeitig lag `rendererFps` im Messfenster zwischen 108 und 144 FPS.
- Der Server meldete waehrend dieser Messung `clients=4` bei Profil `low` und `transportSource=canvas-webrtc`.
- Ergebnis: Der echte Viewer-Pfad ist funktional und liefert unter leichter Mehrfach-Viewer-Last reproduzierbar Bilddaten.

### 2.0.2 Mehrprofil- und Capture-Verifikation vom 16.03.2026
- Die Profile `medium`, `high`, `aaa` und abschliessend wieder `low` wurden erfolgreich ueber `POST /api/profile/:profile` live umgeschaltet.
- Der Server meldete dabei durchgaengig `clients=6` und in allen Messreihen `transportSource=canvas-webrtc`.
- `medium`: API bestaetigte `1280x720` bei Ziel-`fps=30`; Health-Snapshots zeigten `viewerFps` von 22, 0 und 0 bei `rendererFps` 43, 50 und 56.
- `high`: API bestaetigte `1600x900` bei Ziel-`fps=45`; Health-Snapshots zeigten `viewerFps` von 17, 14 und 0 bei `rendererFps` 26, 36 und 35.
- `aaa`: API bestaetigte `1920x1080` bei Ziel-`fps=60`; Health-Snapshots zeigten `viewerFps` von 0, 10 und 12 bei `rendererFps` 30, 21 und 27.
- Rueckkehr zu `low`: API bestaetigte `960x540` bei Ziel-`fps=24`; Health-Snapshots zeigten `viewerFps` von 0, 0 und 24 bei `rendererFps` 86, 88 und 86.
- Ergebnis: Die Profilumschaltung funktioniert reproduzierbar unter aktiver Viewer-Last. Der experimentelle Tab-Capture-Pfad wurde praktisch nicht aktiv; in dieser Umgebung laeuft der Stream konsistent ueber den verifizierten `canvas-webrtc`-Fallback.

### 2.0.3 Vollautonomie-Livecheck vom 16.03.2026
- Ein weiterer kompletter Profil- und Health-Lauf wurde auf dem aktuellen Stand durchgefuehrt.
- Start-Health (`low`) meldete: `status=ok`, `profile=low`, `width=960`, `height=540`, `transportSource=canvas-webrtc`, `publicPort=7860`, `internalPort=3099`, `clients=1`.
- `medium`: API bestaetigte `1280x720` bei Ziel-`fps=30`; Health blieb konsistent mit `profile=medium`.
- `high`: API bestaetigte `1600x900` bei Ziel-`fps=45`; Health blieb konsistent mit `profile=high`.
- `aaa`: API bestaetigte `1920x1080` bei Ziel-`fps=60`; Health blieb konsistent mit `profile=aaa`.
- Rueckkehr zu `low`: API bestaetigte erneut `960x540` bei Ziel-`fps=24`; Health blieb konsistent mit `profile=low`.
- Ergebnis: Profilkette `low -> medium -> high -> aaa -> low` laeuft reproduzierbar auf dem aktuellen Stand und bestaetigt die aktiven Server-Zahlen fuer den Streaming-Betrieb.

### 2.0.4 Verbindlicher Null-Fehler-Beweislauf vom 16.03.2026
- Arbeitsmodus wurde auf strikt autonomen Null-Fehler-Prozess festgelegt: immer naechster logisch bester Schritt, danach Browserdurchlauf, Debug-Pruefung, Tests und Build ohne Abkuerzungen.
- Browserdurchlauf: `http://127.0.0.1:7860/` wurde aktiv geoeffnet.
- Debug-Pruefung: Workspace-Fehlerstatus meldete keine Probleme.
- Runtime-Nachweis: `GET /health` meldete `status=ok`, `profile=low`, `transportSource=canvas-webrtc`, `publicPort=7860`, `internalPort=3099`, `clients=2`.
- Quality-Gates: `lint` gruen, `vitest` 7 von 7 gruen, `build` gruen (`BUILD_OK`).
- Ergebnis: Der aktuelle Stand erfuellt den geforderten Null-Fehler-Nachweis im verbindlichen Vollautonomie-Modus.

### 2.0.5 GO-GO-GO Vollautomation vom 16.03.2026
- Der Nachweisprozess wurde als reproduzierbarer Ein-Kommando-Lauf standardisiert: `npm run autonomy:full`.
- Ablauf in diesem Command: `lint` -> `vitest` -> `build` -> `autonomy:proof` (Profilkette und Health-Validierung).
- Der Lauf wurde erfolgreich abgeschlossen und lieferte den Abschlussmarker `AUTONOMY_PROOF_OK`.
- Gepruefte Profilfolge im Proof-Teil: `low -> medium -> high -> aaa -> low`.
- Ergebnis: Die GO-GO-GO-Ausfuehrung ist nun technisch erzwingbar und fuer jeden Folgeblock identisch reproduzierbar.

### 2.0.6 Wiederholter Pflichtnachweis vom 16.03.2026
- Der standardisierte Command `npm run autonomy:full` wurde nach der Dokumentationsaktualisierung erneut ausgefuehrt.
- Quality-Gates erneut gruen: `lint` ok, `vitest` 7 von 7 ok, `build` ok.
- Proof-Abschluss erneut erreicht: `AUTONOMY_PROOF_OK`.
- Initialer Health-Wert im Wiederholungslauf: `profile=low`, `transportSource=canvas-webrtc`, `publicPort=7860`, `internalPort=3099`, `clients=5`.
- Ergebnis: Der Null-Fehler-Modus ist nach Aenderungen weiterhin stabil und reproduzierbar.

### 2.1 Laufzeit und Server
- Die Serverbasis wurde auf eine konsistente ESM-Nutzung ausgerichtet.
- Ports wurden fuer geklonte Umgebungen env-basiert konfigurierbar gemacht.
- Das reduziert Konflikte zwischen parallelen lokalen Instanzen.

### 2.2 Qualitaets- und Streamingprofil
- Mehrere Profile fuer die Stream-Qualitaet wurden eingefuehrt: `low`, `medium`, `high`, `aaa`.
- Die Streaming-Schicht wurde von einer screenshot-basierten Loesung in Richtung WebRTC-basierter Uebertragung entwickelt.
- Der derzeit relevante technische Stand ist eine funktionierende `canvas-webrtc`-Strecke mit Profilumschaltung.

### 2.3 UI, HUD und Messwerte
- Render-FPS und Stream/View-FPS wurden fachlich getrennt und klarer benannt.
- HUD-Funktionen wurden erweitert, inklusive Skalierung und separater Remote-Overlay-Logik.
- Damit ist besser nachvollziehbar, ob ein Engpass im Renderer oder in der Uebertragung liegt.

### 2.4 Tests und Codequalitaet
- Es existieren bereits grundlegende Tests fuer Event-Scheduler und Game-Store.
- Eine minimale ESLint-Konfiguration wurde eingefuehrt.
- Build, Lint und Tests wurden in der vorigen Arbeitsphase bereits erfolgreich stabilisiert.

## 3. Aktuelle Architektur

### 3.1 Frontend
- React 19 mit Vite als Build- und Dev-Umgebung.
- Rendering ueber Three.js mit `@react-three/fiber` und `@react-three/drei`.
- Zentrale Zustandsverwaltung ueber Zustand.

### 3.2 Simulation
- Simulationslogik laeuft teilweise in einem Worker.
- Kernkomponenten sind NPC-Management, Zeitzyklus, Event-Scheduler und Audio-/Tension-Steuerung.

### 3.3 Server und Streaming
- `server/server.js`: Socket- bzw. Laufzeitserver.
- `server/server-prod.mjs`: produktionsnahe Auslieferung.
- `server/stream-server.mjs`: Streaming-Orchestrierung, Browser-Start, Profilsteuerung, Health-Status, WebRTC-Signalisierung.

## 4. Aktuell offene Punkte

### 4.1 Experimenteller Full-Page-Stream
- Der Versuch, DOM-HUD direkt per Full-Page-WebRTC-Tab-Capture mitzunehmen, ist nur teilweise abgeschlossen.
- In der aktuellen Umgebung faellt dieser Pfad reproduzierbar auf `canvas-webrtc` zurueck; dies wurde nun auch praktisch ueber alle Streaming-Profile bestaetigt.

### 4.2 Endgueltige Live-Verifikation
- Der Stand ist technisch weit fortgeschritten, aber die vollstaendige End-to-End-Pruefung aller HUD- und Streaming-Pfade muss bei kuenftigen Aenderungen erneut bestaetigt werden.
- Die aktuelle technische Vollverifikation bestaetigt Build- und Server-Funktion, aber kein aktives Viewer-Bild im Health-Snapshot; `viewerFps=0` zeigt, dass zum Messzeitpunkt kein echter konsumierender Viewer-Stream lief.
- Dieser Punkt ist inzwischen teilweise validiert: Nach aktiver Viewer-Anbindung wurde ein stabiler Viewer-Wert von 22 bis 24 FPS nachgewiesen.

### 4.3 Dist-Artefakte im Arbeitsbaum
- Im aktuellen Git-Status sind Build-Artefakte unter `dist/` vorhanden.
- `.gitignore` wurde deshalb erweitert, damit `dist/`, `hf_space_pull/` und lokale Env-Dateien bei kuenftigen Reviews sauber von Quellcodeaenderungen getrennt bleiben.

### 4.4 Arbeitsbaum-Trennung am 16.03.2026
- Modifizierte Quellcode-Dateien: `README.md`, `package-lock.json`, `package.json`, `server/server.js`, `server/stream-server.mjs`, `src/components/ui/HUD.tsx`, `src/stores/gameStore.ts`, `src/systems/eventScheduler.ts`, `vite.config.ts`.
- Neue projektbezogene Quell- und Doku-Dateien: `.env.example`, `.gitignore`, `CHECKPOINT_v6.0_REFERENZPUNKT.md`, `PROJEKTBERICHT_AKTUELL.md`, `PROJEKT_GEDAECHTNISPROTOKOLL.md`, `README_LÖSCHEN_VERBOTEN.md`, `eslint.config.js`, `src/tests/eventScheduler.test.ts`, `src/tests/gameStore.test.ts`, `src/tests/vitest.setup.ts`, `task.md`, `walkthrough.md`.
- Generierte Build-Artefakte: `dist/index.html`, `dist/assets/*`, mehrere `dist/audio/*.mp3`.
- Zusaetzlicher Sonderfall: `hf_space_pull/` ist ein separater gespiegelter bzw. externer Ordner und sollte bei Quellcode-Reviews nicht mit dem Hauptstand verwechselt werden.

## 5. Risikoanalyse
- Das groesste technische Risiko liegt derzeit nicht mehr im Renderer selbst, sondern in der Differenz zwischen hoher Render-Leistung und niedrigerer effektiver Viewer-/Transport-FPS.
- Ein zweites Risiko ist die unterschiedliche Verfuegbarkeit von Browser-Capture-Funktionen je nach Umgebung und Startmodus.
- Ein drittes Risiko ist die Vermischung von Quellcodeaenderungen und generierten Dist-Dateien im Repository-Zustand.
- Ein viertes Risiko ist die Verwechslung des Hauptprojekts mit dem gespiegelten Verzeichnis `hf_space_pull/`.

## 6. Empfohlene naechste Schritte
1. Viewer-Metriken bei Bedarf mit weniger aggressivem Sampling oder expliziter Client-Aktivitaet erneut messen, weil `viewerFps` unter Profilwechseln kurzzeitig auf 0 zurueckfallen kann.
2. Full-Page-Tab-Capture nur dann weiterverfolgen, wenn die Browser- und Berechtigungsbedingungen reproduzierbar kontrolliert werden koennen.
3. Quellcode- und Artefaktaenderungen bei der weiteren Arbeit strikt getrennt halten.
4. Diesen Bericht nach jeder groesseren technischen Aenderung erweitern statt ersetzen.

## 7. Dokumentationsstatus
- Dieses Dokument bildet den aktuellen professionellen Zwischenstand ab.
- Es dient kuenftig als Referenz fuer Folgeentscheidungen, Validierung und Fortschrittsdokumentation.