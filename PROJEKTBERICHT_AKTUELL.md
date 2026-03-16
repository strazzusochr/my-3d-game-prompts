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

### 2.0.32 Replay-Metadaten-Persistenz ueber Reload vom 16.03.2026
- Der Runtime-Snapshot wurde um eine dedizierte Replay-Sektion erweitert: `replayState` speichert jetzt `mode`, `rebuildStatus`, `rebuildEventCount` und `anchorTime`.
- Die Snapshot-Sanitisierung validiert Replayfelder robust (ungueltige Modi/Status werden auf sichere Defaults gesetzt, Eventanzahl wird auf >=0 begrenzt, Zeitwerte normalisiert).
- Der Store hydratisiert den Replaystatus nun beim Start aus dem Snapshot und persistiert aktualisierte Replaywerte bei allen relevanten Zustandsschritten weiter.
- Testnachweis wurde erweitert: Persistenz- und Sanitisierungstests fuer Replaydaten plus Store-Nachweis, dass Rewind-Metadaten auch im gespeicherten Snapshot ankommen.
- Vollverifikation: `npm run autonomy:full` erfolgreich mit `AUTONOMY_PROOF_OK` und `AUTONOMY_FULL_OK`; Tests weiterhin 251 von 251 bestanden, Lint und Build gruen.

### 2.0.33 Replay-Rebuild-Historie mit HUD-Transparenz vom 16.03.2026
- Der Store wurde um `replayRebuildHistory` erweitert und fuehrt jetzt die letzten Rebuilds mit `anchorTime`, `rebuildEventCount`, `mode` und Zeitstempel.
- Die Historie ist bewusst auf sechs Eintraege begrenzt, damit Runtime- und Snapshot-Daten kompakt bleiben.
- `runtimePersistence` persistiert diese Historie in `replayState.rebuildHistory` und sanitisiert ungueltige Eintraege/Zeiten/Eventcounts beim Laden.
- Die Operationsansicht im HUD zeigt unter `Letzte Rebuilds` die juengsten Rekonstruktionen direkt live an.
- Testnachweis wurde erweitert: Snapshot-Sanitisierung fuer Rebuild-Historie sowie Store-/Snapshot-Assertion nach Rewind.
- Vollverifikation: `npm run autonomy:full` erfolgreich mit `AUTONOMY_PROOF_OK` und `AUTONOMY_FULL_OK`; Lint gruen, Tests 251 von 251 gruen, Build gruen.

### 2.0.34 Replay-Qualitaetsindikator im 90-Minuten-Fenster vom 16.03.2026
- Der Store berechnet jetzt eine kompakte Replay-Qualitaet ueber ein gleitendes 90-Minuten-Fenster auf Basis der Rebuild-Historie.
- Metriken: Anzahl Rebuilds im Fenster, durchschnittliche Eventanzahl pro Rebuild sowie Klassifikation `stable`/`watch`/`critical`.
- `runtimePersistence` speichert diese Quality-Werte unter `replayState.quality` und sanitisiert Grenzwerte robust beim Laden.
- Die HUD-Operationsansicht zeigt den Quality-Status als Live-Badge sowie die beiden Kennzahlen (`Rebuilds im Fenster`, `Avg Events/Rebuild`) direkt neben den Rebuild-Infos.
- Testnachweis erweitert: Sanitisierung fuer Quality-Felder in `runtimePersistence.test.ts` sowie Store-/Snapshot-Nachweise nach Rewind in `gameStore.test.ts`.
- Vollverifikation: `npm run autonomy:full` erfolgreich mit `AUTONOMY_PROOF_OK` und `AUTONOMY_FULL_OK`; Lint gruen, Tests 251 von 251 gruen, Build gruen.

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

### 2.0.7 Runner-Haertung und Fehlerbehebung vom 16.03.2026
- Beim weiteren Ausbau wurde ein Windows-Prozessstartfehler im Runner festgestellt (`AUTONOMY_FULL_FAIL: spawn EINVAL`).
- Der Runner wurde daraufhin technisch gehaertet: Shell-basierter Kommandoaufruf mit expliziten Schrittmarkern (`lint`, `test`, `build`, `proof`).
- Der Nachlauf war erfolgreich und lieferte beide Abschlussmarker: `AUTONOMY_PROOF_OK` und `AUTONOMY_FULL_OK`.
- Ergebnis: Der GO-GO-GO-Standardlauf ist nun auch gegen den vorherigen Spawn-Fehler abgesichert.

### 2.0.8 Selbstheilender Proof-Lauf vom 16.03.2026
- Der Proof wurde gegen kurzzeitige Netzwerkfenster gehaertet (Retry bei Fetch-Fehlern sowie retryfaehige Statuslagen waehrend Profilwechseln).
- Danach wurde `autonomy:full` im Zustand ohne erreichbaren Stream gestartet.
- Der Runner startete den Stream automatisch, erkannte Health-Bereitschaft, durchlief `lint`, `test`, `build` und den Profil-Proof erfolgreich.
- Profilfolge blieb korrekt: `low -> medium -> high -> aaa -> low` mit Abschlussmarker `AUTONOMY_PROOF_OK`.
- Abschlussmarker des Gesamtlaufs: `AUTONOMY_FULL_OK`.
- Ergebnis: GO-GO-GO ist nun reproduzierbar, selbstheilend und ohne manuellen Vorlauf nutzbar.

### 2.0.9 Pflichtlauf-Wiederholung vom 16.03.2026
- Ein weiterer vollstaendiger GO-GO-GO-Lauf wurde ohne Vorabserver erneut gestartet.
- Der Runner startete den Stream wieder selbststaendig, fuehrte danach `lint`, `test`, `build` und den Profil-Proof in Serie aus.
- Tests blieben stabil bei 7 von 7, Build war erfolgreich, Proof endete erneut mit `AUTONOMY_PROOF_OK`.
- Abschluss des Gesamtlaufs erneut erfolgreich mit `AUTONOMY_FULL_OK`.
- Ergebnis: Der Ablauf ist nicht nur einmalig, sondern in unmittelbarer Wiederholung robust reproduzierbar.

### 2.0.10 Finaler Stabilitaetsnachweis vom 16.03.2026
- Nach der zusaetzlichen Retry-Haertung wurde `autonomy:full` erneut als kompletter End-to-End-Lauf ausgefuehrt.
- Der Runner startete den Stream selbst, fuehrte danach `lint`, `test`, `build` und den Proof-Block erfolgreich aus.
- Im Proof lief die komplette Profilfolge ohne Abbruch durch und endete direkt im ersten Versuch mit `AUTONOMY_PROOF_OK`.
- Abschlussmarker des Gesamtlaufs erneut erreicht: `AUTONOMY_FULL_OK`.
- Ergebnis: Der GO-GO-GO-Standard ist fuer den aktuellen Stand stabil und konsistent reproduzierbar.

### 2.0.11 Weitere GO-GO-GO Wiederholung vom 16.03.2026
- Der Pflichtablauf wurde erneut vollstaendig ausgefuehrt: Browserdurchlauf, Debug-Pruefung, dann `autonomy:full`.
- Quality-Gates blieben stabil: `lint` gruen, `vitest` 7 von 7 gruen, `build` erfolgreich.
- Proof-Teil lief wieder mit kompletter Profilkette bis `AUTONOMY_PROOF_OK`.
- Gesamtlauf endete erneut mit `AUTONOMY_FULL_OK`.
- Ergebnis: Die Pipeline bleibt auch in weiterer Wiederholung stabil reproduzierbar.

### 2.0.12 Reihenfolgefix und erfolgreicher Nachlauf vom 16.03.2026
- Ein weiterer Stabilitaetsfix wurde umgesetzt: `autonomy:full` fuehrt nun zuerst `lint`, `test`, `build` aus und startet den Stream danach.
- Damit ist `dist/index.html` vor dem Streamstart garantiert vorhanden.
- Der anschliessende Nachlauf war erfolgreich und endete erneut mit `AUTONOMY_PROOF_OK` und `AUTONOMY_FULL_OK`.
- Ergebnis: Der GO-GO-GO-Flow ist auch gegen fehlende Dist-Artefakte beim Streamstart abgesichert.

### 2.0.13 Missionsbranch-Runtimeblock vom 16.03.2026
- Die Missionskette wirkt jetzt nicht nur ueber Hook-Readiness und Korrelation indirekt, sondern triggert drei direkte Laufzeit-Branches im Store.
- Neu aktivierte Runtime-Events: `dyn-mission-epoch-media` (Medienabschirmung), `dyn-mission-hazard-shield` (Gefahrenzonen-Schild) und `dyn-mission-fullchain-deescalation` (spaete Deeskalationsumschaltung).
- Der Deeskalationsbranch setzt konfliktnahe Demonstranten-/Rioter-Verhalten gezielt auf `RETREAT` und reduziert dadurch Verletzungs- sowie Schadenstrend in der Spaetphase.
- Das Operations-Overlay zeigt diese Missionsbranches nun als eigene Live-Badges neben den korrelationsgetriebenen Triggern.
- Validierung: `npm run autonomy:full` erfolgreich mit `AUTONOMY_PROOF_OK` und `AUTONOMY_FULL_OK`; Teststand 227 von 227 bestanden, Lint und Build ebenfalls gruen.

### 2.0.14 Zweite Missionswellen vom 16.03.2026
- Die Missionsbranches wurden um zeitversetzte zweite Wellen erweitert, damit Entscheidungen nicht als Einzeltrigger enden.
- Neu aktivierte Folgeevents: `dyn-mission-epoch-press-corridor`, `dyn-mission-hazard-firebreak` und `dyn-mission-fullchain-recovery`.
- Diese zweite Ebene verbindet zusaetzliche Support-/Security-Reaktionen mit weiterer DayStats-Entlastung in spaeteren Zeitfenstern und staerkt damit den Verlaufseffekt ueber den Tag.
- Das Operations-Overlay zeigt nun auch diese zweite Wellenstufe als aktive Missions-Badges.
- Validierung: `npm run autonomy:full` erneut erfolgreich mit `AUTONOMY_PROOF_OK` und `AUTONOMY_FULL_OK`; Teststand 230 von 230 bestanden, Lint und Build gruen.

### 2.0.15 Alternative Ergebnisbaeume vom 16.03.2026
- Das Missionssystem wurde von einem nur positiv fortschreitenden Ast auf echte Alternativpfade erweitert.
- Bei verpassten Missionsschritten aktivieren sich nun negative Fallback-Wellen: `dyn-mission-epoch-misinformation`, `dyn-mission-hazard-surge` und `dyn-mission-fragmented-command`.
- Damit entstehen je nach Missionsdisziplin unterschiedliche Endlagen mit klar unterscheidbarem Belastungsprofil in den DayStats.
- Das Operations-Overlay bildet diese positiven und negativen Branches als getrennte aktive Badges ab.
- Validierung: `npm run autonomy:full` erfolgreich mit `AUTONOMY_PROOF_OK` und `AUTONOMY_FULL_OK`; Teststand 233 von 233 bestanden, Lint und Build gruen.

### 2.0.16 Gewichtete Pfadregeln vom 16.03.2026
- Die Korrelations-Engine wurde um `missionPathWeightPercent` erweitert.
- Das Pfadgewicht wird aus Rollen-Trenddelta, Panikquote, Hook-Auslastung, Missionsfortschritt, aktiven Reaktionen und Rollenungleichgewicht abgeleitet.
- Die Runtime nutzt dieses Gewicht jetzt direkt zur Skalierung von positiven und negativen Missionszweigen (dynamische Triggerstaerke statt fixer Spawnmengen).
- Die Korrelationszeile im Operations-Insight zeigt das berechnete Pfadgewicht explizit an.
- Validierung: `npm run autonomy:full` erfolgreich mit `AUTONOMY_PROOF_OK` und `AUTONOMY_FULL_OK`; Teststand 234 von 234 bestanden, Lint und Build gruen.

### 2.0.17 Trendkorrelierte Branch-Trigger vom 16.03.2026
- Die Korrelations-Engine wurde um ein explizites `trendSignal` erweitert (`stabilizing`, `deteriorating`, `volatile`, `flat`).
- Auf dieser Basis wurden zwei neue Runtime-Pfade integriert: `dyn-trend-synchronization` als stabilisierender Folgepfad und `dyn-trend-fracture-wave` als verschlechternder Gegenpfad.
- Die Branch-Entscheidung kombiniert nun Missionspfadgewicht und Trendlage, wodurch Folgewellen nicht nur statisch zeitgebunden, sondern lagegebunden ausgelöst werden.
- Das Operations-Overlay zeigt die neuen trendgekoppelten Trigger als eigene aktive Badges.
- Validierung: `npm run autonomy:full` erfolgreich mit `AUTONOMY_PROOF_OK` und `AUTONOMY_FULL_OK`; Teststand 237 von 237 bestanden, Lint und Build gruen.

### 2.0.18 Fensterspezifische Gewichtung vom 16.03.2026
- Die Korrelations-Engine liefert nun zusaetzlich `phaseBand` (`NIGHT`, `MORNING`, `MIDDAY`, `EVENING`, `LATE`) aus der aktuellen Trendzeit.
- Das Pfadgewicht wird je Zeitfenster differenziert angepasst, statt global identische Schwellen zu verwenden.
- Die Runtime nutzt fensterspezifische Profile fuer Skalierung und Triggergrenzen (Synchronisierung/Fracture), wodurch der gleiche Lagezustand zu unterschiedlichen Tageszeiten differenziert bewertet wird.
- Damit sind Triggerstaerke und Trigger-Schwelle jetzt gleichzeitig trend-, missions- und fenstergekoppelt.
- Validierung: `npm run autonomy:full` erfolgreich mit `AUTONOMY_PROOF_OK` und `AUTONOMY_FULL_OK`; Teststand 238 von 238 bestanden, Lint und Build gruen.

### 2.0.19 Mehrpunkt-Momentum und Turbulenzklassifikation vom 16.03.2026
- Die Trendauswertung nutzt nun ein echtes Mehrpunkt-Momentum ueber alle aufeinanderfolgenden Trendschritte statt eines reinen First/Last-Vergleichs.
- Zusaetzlich wurde eine Turbulenzmetrik eingefuehrt (Absolut-Summen der gewichteten Schrittbewegungen), damit gegensaetzliche Bewegungen sich nicht gegenseitig zu `flat` wegheben.
- Die Klassifikation `trendSignal=volatile` basiert damit auf hoher Turbulenz bei gleichzeitig niedrigem Netto-Momentum und erkennt oszillierende Lagen robuster.
- Der zugehoerige Testfall wurde auf das neue Zielbild angepasst: volatile Lage trotz kleinem Netto-Momentum.
- Validierung: `npm run autonomy:full` erfolgreich mit `AUTONOMY_PROOF_OK` und `AUTONOMY_FULL_OK`; Teststand 239 von 239 bestanden, Lint und Build gruen.

### 2.0.20 Spawn-Marker-Neudesign mit Zeitfenster vom 16.03.2026
- Die Spawn-Visualisierung wurde von dauerhaften Textmarkern auf fotoaehnliche Neon-Karten am Spawn-Ort umgestellt (Billboard-Karte plus Bodenring).
- Die Sichtbarkeit ist jetzt strikt zeitgesteuert: Marker erscheinen nur im Pre-Spawn-Fenster von T-10 bis T-5 Minuten und verschwinden danach automatisch.
- Karteninhalt zeigt Uhrzeit, aggregierte Einheiteninformationen pro Spawn-Ort/Zeit und einen Countdown, wodurch die Szene deutlich aufgeraeumter und taktischer lesbar ist.
- Dummy-/Null-Spawn-Ereignisse werden nicht mehr als Marker visualisiert.
- Validierung: `npm run autonomy:full` erfolgreich mit `AUTONOMY_PROOF_OK` und `AUTONOMY_FULL_OK`; Teststand 239 von 239 bestanden, Lint und Build gruen.

### 2.0.21 Spawn-Marker-Feintuning fuer Live-Lesbarkeit vom 16.03.2026
- Zur Entzerrung bei nahen Spawn-Punkten wurden deterministische Offset-Lanes eingefuehrt, damit Karten nicht mehr deckungsgleich uebereinanderliegen.
- Die Marker besitzen nun eine deutlichere physische Verankerung (Standsaeule und Standfuss), was dem Referenzstil mit aufgestellten Einsatztafeln naeher kommt.
- Die visuelle Gewichtung wurde nach Restzeit abgestuft (Ring-/Glow-Emphasis), wodurch unmittelbar bevorstehende Spawns priorisiert auffallen.
- Informationsdichte auf den Karten wurde komprimiert (maximal drei Detailzeilen), um Textmatsch in dichten Spawn-Phasen zu vermeiden.
- Validierung: `npm run autonomy:full` erfolgreich mit `AUTONOMY_PROOF_OK` und `AUTONOMY_FULL_OK`; Teststand 239 von 239 bestanden, Lint und Build gruen.

### 2.0.22 Spawn-Marker-Phasenkalibrierung und Dichteprofil vom 16.03.2026
- Die Spawn-Karten wurden visuell an die Tagesphasen angebunden: Zeitfarbe, Glaswirkung und Kartenhintergrund reagieren jetzt auf `NIGHT`, `MORNING`, `MIDDAY`, `EVENING` und `LATE`.
- Dadurch bleibt der Neon-Look konsistent, wirkt aber je Zeitfenster differenzierter und besser an die Szenenlichtlage angepasst.
- Fuer dichte Spawn-Lagen wurde ein automatisches Dichteprofil eingefuehrt: Kartenskalierung und Detailzeilen werden dynamisch reduziert, sobald viele Marker gleichzeitig sichtbar sind.
- Die Taktiklesbarkeit bleibt dadurch auch in Stoßzeiten stabil, ohne die T-10 bis T-5 Sichtfensterregel zu verletzen.
- Validierung: `npm run autonomy:full` erfolgreich mit `AUTONOMY_PROOF_OK` und `AUTONOMY_FULL_OK`; Teststand 239 von 239 bestanden, Lint und Build gruen.

### 2.0.23 Spawn-Marker-Priorisierung bei Lastspitzen vom 16.03.2026
- Fuer sehr dichte Spawn-Phasen wurde ein Priorisierungslimit eingefuehrt: maximal acht Spawn-Karten werden gleichzeitig sichtbar dargestellt.
- Die Priorisierung folgt operativer Relevanz: zuerst kuerzeste Restzeit bis Spawn, dann hoechste aggregierte Spawnmenge pro Karte.
- Nicht dargestellte Karten werden nicht still verworfen, sondern als Sammelhinweis auf der letzten sichtbaren Karte transparent kommuniziert.
- Damit bleibt die Karte bei Lastspitzen lesbar und entscheidungsfaehig, ohne die zeitliche Spawn-Vorschau oder Datenintegritaet zu verlieren.
- Validierung: `npm run autonomy:full` erfolgreich mit `AUTONOMY_PROOF_OK` und `AUTONOMY_FULL_OK`; Teststand 239 von 239 bestanden, Lint und Build gruen.

### 2.0.24 Spawn-Marker-Dringlichkeitsstufen vom 16.03.2026
- Die Spawn-Karten wurden um countdown-basierte Dringlichkeitsstufen erweitert: `WATCH`, `READY` und `IMMINENT`.
- Die Einstufung nutzt die verbleibenden Minuten bis Spawn innerhalb des bestehenden T-10 bis T-5-Fensters.
- Unmittelbar bevorstehende Spawns erhalten eine staerkere visuelle Hervorhebung (Ring-/Glow-Emphasis und Countdown-Farbakzent), damit operative Prioritaeten schneller erfassbar sind.
- Damit entsteht neben Dichtepriorisierung und Phasenkalibrierung nun eine dritte Lesbarkeitsebene: semantische Dringlichkeit.
- Validierung: `npm run autonomy:full` erfolgreich mit `AUTONOMY_PROOF_OK` und `AUTONOMY_FULL_OK`; Teststand 239 von 239 bestanden, Lint und Build gruen.

### 2.0.25 Spawn-Marker-Logik extrahiert und getestet vom 16.03.2026
- Die Entscheidungslogik der Spawn-Marker wurde aus der Renderkomponente in ein eigenes Systemmodul ausgelagert: `src/systems/spawnMarkerLogic.ts`.
- Abgedeckt sind dort jetzt zentral: Sichtfenster (T-10 bis T-5), Grouping je Zeit/Position, Top-8-Priorisierung bei Last, Phasenband-Ermittlung und Dringlichkeitsklassifikation.
- Dadurch ist die 3D-Komponente schlanker und die Kernlogik unabhängig testbar.
- Neue Testsuite `src/tests/spawnMarkerLogic.test.ts` verifiziert die Regeln inklusive Grenzwerte und Priorisierungsverhalten.
- Validierung: `npm run autonomy:full` erfolgreich mit `AUTONOMY_PROOF_OK` und `AUTONOMY_FULL_OK`; Teststand 243 von 243 bestanden, Lint und Build gruen.

### 2.0.26 Expliziter Live-Browsernachweis (manuell) vom 16.03.2026
- Auf Nutzerhinweis wurde der Browsernachweis zusaetzlich zum automatisierten Proof explizit manuell ausgefuehrt.
- Laufaufbau: Frontend `vite` auf `http://127.0.0.1:3001/` gestartet, Socket-Backend auf Port `3000` gestartet, Seite aktiv im Browser geoeffnet.
- Verifikationssignal: Serverlog meldete eine reale Socket-Verbindung (`Client connected: ...`), damit ist der Browserlauf nicht nur HTTP-erreichbar, sondern mit aktiver Runtime-Kopplung bestaetigt.
- Nach Abschluss wurden die fuer den manuellen Nachweis gestarteten Hintergrundterminals beendet.
- Ergebnis: MANUAL_BROWSER_PASS zusaetzlich zu `AUTONOMY_FULL_OK`/`AUTONOMY_PROOF_OK`.

### 2.0.27 HUD-Kompaktskalierung und Panelsteuerung vom 16.03.2026
- Die komplette Gameplay-HUD wurde standardmaessig auf 75 Prozent der bisherigen Groesse gesetzt, womit die linke Statussaeule und die uebrigen Overlay-Bloecke sichtbar kompakter werden.
- In `src/components/ui/HUD.tsx` wurden die halbfertigen Referenzen der laufenden Refaktorierung bereinigt: Bottom-HUD verwendet wieder den gueltigen Panel-Schluessel, die Profilsteuerung ist an die bestehende `switchStreamProfile`-Logik angebunden und der Lade-/Statuszustand wird sauber gefuehrt.
- Jeder relevante Gameplay-Bereich besitzt nun direkte Min-/x2-Steuerung: linkes Statuspanel, Top-Badge, rechtes Hauptpanel, Interaktionspanel, Bottom-Leiste sowie die Untersektionen NASA-Lagebild, Phase-Telemetrie, Missionslage und Einsatz-Timeline.
- Die Stream-Profilbuttons sind im HUD jetzt explizit sichtbar: `Low`, `Medium`, `High` und `AAA 1080p 60 fps`; der aktive Zustand und laufende Umschaltungen werden im Bottom-HUD angezeigt.
- Validierung: `npm run autonomy:full` erfolgreich mit `AUTONOMY_PROOF_OK` und `AUTONOMY_FULL_OK`; Profilfolge `low -> medium -> high -> aaa -> low` samt `canvas-webrtc`-Transport in allen Profilen bestanden.

### 2.0.28 HUD-World-Fit und Cinematic-Pass vom 16.03.2026
- Die HUD-Proportionen wurden auf die Spielwelt neu kalibriert: reduzierte Basisskalierung auf 68 Prozent plus adaptive Viewport-Fit-Skalierung fuer unterschiedliche Displaygroessen.
- Linkes und rechtes Hauptpanel wurden weiter entschlackt (geringere Breiten/Padding), sodass mehr sichtbare Weltflaeche erhalten bleibt und die Overlay-Dominanz sinkt.
- Die Bottom-Leiste wurde responsive verhaertet: flexibler Umbruch mit kompakter Zwei-Reihen-Tendenz bei niedriger Viewport-Hoehe statt horizontaler Ueberladung.
- Die Einsatz-Timeline wurde fuer Dichte und Lesbarkeit ausbalanciert: dynamische Max-Hoehe nach Viewport sowie kompaktere Event-Cards (Text/Padding/Abstaende).
- Validierung: `npm run autonomy:full` erfolgreich mit `AUTONOMY_PROOF_OK` und `AUTONOMY_FULL_OK`; Lint/Test/Build gruen, Profilfolge `low -> medium -> high -> aaa -> low` und `canvas-webrtc` in allen Profilen bestaetigt.

### 2.0.29 HUD-Micro-Pass (Priorisierung und Feindichte) vom 16.03.2026
- Der rechte HUD-Header wurde nochmals verdichtet: kleinere Abstaende und kompaktere FPS-Kapsel, damit die rechte Spalte ruhiger in die Szene integriert ist.
- Die Timeline erhielt eine subtilere Scrollbar-Darstellung, um visuelle Stoerung zu minimieren und den Fokus auf Inhalte statt Chrome zu legen.
- Die Bottom-Leiste priorisiert bei niedriger Viewport-Hoehe nun die Kernsteuerung (Zeit/Pause/Speed/Eskalation) vor den nachrangigen Bloecken (Stats/Audio/Profile).
- Validierung: `npm run autonomy:full` erneut erfolgreich mit `AUTONOMY_PROOF_OK` und `AUTONOMY_FULL_OK`; Tests weiterhin 243/243 gruen.

### 2.0.30 Trend-/Missionspersistenz vom 16.03.2026
- Ein neues Runtime-Persistenzmodul wurde eingefuehrt: `src/stores/runtimePersistence.ts`.
- Persistiert werden nun stabil ueber Browser-Reloads: Missionsfortschritt, Role-Trendhistorie, Tagesstatistik sowie zentrale Runtime-Regler (`inGameTime`, `timeSpeed`, Reputation, Moral, Master-Volume, Mute-Status).
- Das Persistenzformat ist versioniert und sanitisierend (Zeitformat, Wertebereiche, erlaubte Zonen-IDs, Historienlimit), sodass fehlerhafte oder manipulierte Storage-Inhalte abgefangen werden.
- `src/stores/gameStore.ts` wurde auf Snapshot-Hydration beim Start und Snapshot-Schreiben nach relevanten Zustandsaenderungen erweitert.
- Testausbau:
	- neue Suite `src/tests/runtimePersistence.test.ts` fuer Save/Load/Sanitisierung/Clear,
	- zusaetzlicher Store-Test auf Snapshot-Update nach Missionsinteraktion.
- Validierung nach Umsetzung:
	- `npm run lint`: gruen,
	- `vitest`: 248/248 gruen,
	- `npm run build`: gruen,
	- `npm run autonomy:full`: `AUTONOMY_PROOF_OK` + `AUTONOMY_FULL_OK`.

### 2.0.31 Adaptive Triggerkurven fuer NPC-KI vom 16.03.2026
- Die trendgekoppelten Runtime-Trigger wurden um adaptive Kurven erweitert, damit Schwellwerte und Spawn-Skalierung nicht nur phasenstatisch, sondern lageabhaengig reagieren.
- Neues Systemmodul: `src/systems/npcAdaptiveCurves.ts`.
- Eingangsparameter der Kurve:
	- Aggressordruck (`aggressorPressure`),
	- Supportreserve (`supportReserve`),
	- Trendlage (`trendSignal`),
	- Trendmomentum (`trendMomentumScore`),
	- Turbulenz (`trendTurbulenceScore`).
- Ergebnisparameter der Kurve:
	- Delta fuer Synchronisierungs-Schwelle,
	- Delta fuer Fracture-Schwelle,
	- Faktor fuer positive Wellen,
	- Faktor fuer Fallback-Wellen.
- `operationsInsights` wurde um `trendTurbulenceScore` erweitert und liefert damit eine explizite Schwingungsmetrik fuer volatile Lagen.
- `gameStore` nutzt diese Kurvenwerte direkt fuer `dyn-trend-synchronization` und `dyn-trend-fracture-wave`.
- Testausbau:
	- neue Suite `src/tests/npcAdaptiveCurves.test.ts`,
	- erweiterter Turbulenz-Nachweis in `src/tests/operationsInsights.test.ts`.
- Validierung nach Umsetzung:
	- `npm run lint`: gruen,
	- `vitest`: 251/251 gruen,
	- `npm run build`: gruen,
	- `npm run autonomy:full`: `AUTONOMY_PROOF_OK` + `AUTONOMY_FULL_OK`.

### 2.0.32 HUD-Transparenz fuer adaptive Kurven vom 16.03.2026
- Der Operations-Bereich im HUD wurde um eine dedizierte Live-Diagnosekarte erweitert.
- Sichtbar sind jetzt in Echtzeit:
	- adaptive Sync-Schwelle,
	- adaptive Fracture-Schwelle,
	- positiver Skalierungsfaktor,
	- Fallback-Skalierungsfaktor,
	- Aggressordruck,
	- Turbulenzwert.
- Damit ist die zuvor eingefuehrte Kurvenlogik nicht nur intern aktiv, sondern operativ nachvollziehbar fuer Steuerung und Debugging im laufenden Szenario.
- Validierung nach Umsetzung:
	- `npm run lint`: gruen,
	- `vitest`: 251/251 gruen,
	- `npm run build`: gruen,
	- `npm run autonomy:full`: `AUTONOMY_PROOF_OK` + `AUTONOMY_FULL_OK`.

### 2.0.33 Replay-Transparenz fuer Zeitreise und Trigger-Rebuild vom 16.03.2026
- Der Store fuehrt jetzt explizite Replay-Metadaten fuer Rueckspruenge:
	- `replayMode` (`live`/`rewind`),
	- `replayRebuildStatus` (`idle`/`reconstructed`),
	- `replayRebuildEventCount`,
	- `replayAnchorTime`.
- Bei `rewindHour`/`rewindMinute` wird damit sichtbar, dass Trigger und Weltstand rekonstruiert wurden.
- Das Operations-HUD zeigt diese Informationen live in der Belastungskarte an (Zeitreise-Status, Rebuild-Status, Eventanzahl, Ankerzeit).
- Testergänzung: `gameStore.test.ts` verifiziert die neuen Rebuild-Metadaten nach Ruecksprung.
- Validierung nach Umsetzung:
	- `npm run lint`: gruen,
	- `vitest`: 251/251 gruen,
	- `npm run build`: gruen,
	- `npm run autonomy:full`: `AUTONOMY_PROOF_OK` + `AUTONOMY_FULL_OK`.

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
- Die HUD-Ergonomie wurde weiter verfeinert: 75-Prozent-Default, individuelle Panel-Minimierung und x2-Zoom fuer die operativen Unterpaneele sowie sichtbare Profilumschaltung direkt im Gameplay-HUD.
- Die Verhaeltnislogik wurde zusaetzlich auf World-Fit erweitert: adaptive Viewport-Skalierung, kompaktere Panel-Geometrie und responsive Bottom-Leiste fuer konsistente Wirkung zwischen HUD und Spielraum.
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

## 8. Player-Core Ausbau vom 16.03.2026

### 8.1 Umgesetzte Technik
- Der bisher freie Kamera-/Positions-Mover in `Player.tsx` wurde zu einem einfachen, aber echten Player-Core mit Bodenbezug erweitert.
- Die Stadtgeometrie wurde in ein gemeinsames Layout-Modul ausgelagert: Gebaeudelots, Strassensegmente, Parkflaeche und Sidewalk-Zonen sind nun fuer Render- und Bewegungslogik konsistent beschrieben.
- Neu implementiert wurden Ground-Sampling, Ground-Normal-Berechnung, Jump-Arc mit Schwerkraft, Step-/Ground-Snap sowie ein einfaches Obstacle-Resolution-Verhalten gegen Gebaeudeflaechen.
- Die horizontale Bewegung wird im Ground-Zustand auf die lokale Bodenebene projiziert, wodurch sauberes Slope-Handling an Hoehenkanten moeglich ist.
- Fuer Gamepad-Nutzung wurde zusaetzlich `L3` als Sprung-Trigger angeschlossen; Tastatur-Sprung erfolgt ueber `Space`.

### 8.2 Test- und Nachweisstand
- Neuer Testblock `src/tests/playerPhysics.test.ts` validiert Terrainklassen, Sidewalk-/Building-Erkennung, Kollisionsaufloesung und Oberflaechennormalen.
- Gesamtstand nach dem Ausbau: `vitest` 176 von 176 Tests gruen.
- `npm run lint` blieb fehlerfrei.
- `npm run build` blieb erfolgreich.
- Fuer den Browser-/Livecheck wurde zunaechst ein reiner Preview-Lauf geoeffnet; dabei waren Socket-Proxyfehler ohne Backend erwartbar.
- Anschliessend wurde der Vollstack ueber `npm run dev:all` gestartet; die Seite wurde im Browser geoeffnet und der Socket-Server protokollierte eine echte Client-Verbindung.

### 8.3 Bewertung
- Der Player-Core ist deutlich naeher an einem echten Character-Controller als zuvor, weil die Spielfigur nun nicht mehr rein frei durch den Raum gleitet.
- Noch offen fuer eine spaetere Ausbaustufe sind vollstaendige Rapier-Kollision, robustes Sliden entlang komplexer Geometrie, echte Interaktionsflaechen und feinere Physikparameter fuer Grenzfaelle.

### 8.4 Rapier-Kollisionswelt vom 16.03.2026
- Der zuvor terrain-gesampelte Player-Core wurde auf eine echte `@react-three/rapier`-Physikwelt gehoben.
- `GameCanvas` kapselt die 3D-Szene nun in `Physics`, waehrend `WorldColliders` feste Collider fuer Park, Strassen, Sidewalks und Gebaeude bereitstellt.
- Der Player nutzt jetzt einen dynamischen Capsule-RigidBody mit gesperrten Rotationen, Daempfung und CCD statt reiner Positionsmutation.
- Sprung und Schwerkraft laufen ueber die Physik-Engine; die horizontale Bewegung wird weiterhin aus Eingabe und Kamerayaw abgeleitet, nun aber mit echter Kollisionsantwort gegen die Welt.
- Die Gebaeudehoehen wurden zwischen Renderwelt und Colliderwelt deterministisch synchronisiert, damit sichtbare Architektur und Physik dieselbe Geometrie verwenden.

### 8.5 Rapier-Nachweis
- `npm run lint`: erfolgreich.
- `npx vitest run`: erfolgreich, 176 von 176 Tests bestanden.
- `npm run build`: erfolgreich.
- Livecheck: `npm run dev:all` gestartet, Browserseite geoeffnet, Socket-Server meldete eine reale Client-Verbindung.
- Der fuer den Livecheck gestartete Hintergrundprozess wurde nach dem Nachweis wieder beendet.

### 8.6 Triggerzonen und Interaktionsflaechen vom 16.03.2026
- Auf der Rapier-Basis wurden nun echte Interaktionspunkte in die Szene eingebaut: Lage-Terminal, Hazard-Konsole sowie drei Evakuierungsboards fuer Risikozonen.
- Die Interaktionsdaten wurden in ein eigenes Modell ausgelagert, damit Missionseffekte, Fortschritt und HUD-Anzeige zentral und testbar bleiben.
- Der `gameStore` fuehrt jetzt eine dedizierte Interaktionsspur mit nahem Zielpunkt, letzter Systemmeldung und Missionsfortschritt.
- Die Spielfigur kann aktive Interaktionen per Tastatur (`E`) oder kontextuell per Gamepad-`X` ausloesen; Wiederholungen werden sauber erkannt und nicht doppelt gewertet.
- Das HUD zeigt im unteren Zentrum nun ein echtes Interaktionsfenster mit Titel, Beschreibung, Eingabehinweis und Rueckmeldung der zuletzt ausgefuehrten Aktion.
- Die bisher statische Missionsliste im rechten Panel wird jetzt aus realem Missionsfortschritt gespeist.

### 8.7 Interaktions-Nachweis
- Neuer Testblock `src/tests/interactionZones.test.ts` validiert Zonenmetadaten, Fortschrittslogik, Duplikatschutz und Missionschecklisten.
- `src/tests/gameStore.test.ts` prueft nun zusaetzlich die Uebernahme von Interaktionseffekten in Reputations-, Moral- und Spannungswerte.
- `npx vitest run`: erfolgreich, 183 von 183 Tests bestanden.
- `npm run lint`: erfolgreich.
- `npm run build`: erfolgreich.
- Livecheck: `npm run dev:all` gestartet, Browserseite geoeffnet, Socket-Server meldete eine reale Client-Verbindung; der Hintergrundprozess wurde anschliessend wieder beendet.

### 8.8 Controller- und Interaktions-Feinschliff vom 16.03.2026
- Die Interaktionsflaechen wurden missionsgebunden verknuepft: Hazard-Konsole ist nun erst nach dem Epoch-Terminal verfuegbar, Evakuierungsboards erst nach Hazard-Abschluss.
- Gesperrte Zonen liefern klare Rueckmeldungen im Store und in der HUD-Anzeige (`GESPERRT: ...`) statt stiller No-Op-Aktionen.
- Die 3D-Zonenvisualisierung zeigt Lock-Zustaende durch reduzierte Farbe/Opacity und aktualisierte Prompt-Texte.
- Der Player-Controller wurde fuer bessere Lesbarkeit und Steuerbarkeit auf beschleunigungsbasierte horizontale Bewegung mit separater Boden-/Luftkontrolle umgestellt.
- Das sorgt fuer saubereres Start-/Stop-Verhalten und weniger abruptes Abbremsen an Kollisionskanten.

### 8.9 Feinschliff-Nachweis
- `src/tests/interactionZones.test.ts` wurde um Availability-/Prerequisite-Pruefungen erweitert.
- `src/tests/gameStore.test.ts` prueft nun auch Lock-Meldungen und die aktualisierte Missionsketten-Reihenfolge.
- `npx vitest run`: erfolgreich, 186 von 186 Tests bestanden.
- `npm run lint`: erfolgreich.
- `npm run build`: erfolgreich.
- Livecheck: `npm run dev:all` gestartet, Browserseite geoeffnet, Socket-Server meldete reale Client-Verbindungen; der Hintergrundprozess wurde anschliessend wieder beendet.

### 8.10 NPC-KI/Behavior-Erweiterung vom 16.03.2026
- Fuer die KI wurde ein eigenes Eskalationsmodul eingefuehrt, das lokale Lageparameter auswertet: Hostile-Nachbarn, Polizei-/Agitator-Dichte, Panik-Cluster und Spannungsniveau.
- Dieses Modul steuert adaptive Zustandswechsel im Worker (unter anderem `FLEE`, `RETREAT`, `COMBAT`, `ATTACK`, `SHIELD_WALL`) und fuehrt bei Entspannung auf Rollen-Baselines zurueck.
- Nicht-interruptible Rollen wie `GUARD`, `CLEANUP` und `SURROUND` bleiben stabil und werden nicht durch spontane Eskalation ueberschrieben.
- Die bisherigen fest verdrahteten Einzelbewegungen bleiben erhalten, werden aber durch die adaptive Lageentscheidung um eine echte Reaktionsschicht erweitert.

### 8.11 NPC-KI-Nachweis
- Neuer Testblock `src/tests/behaviorEscalation.test.ts` validiert Non-Interrupt-Regeln, Eskalation, Deeskalation und Rollen-Baselines.
- `npx vitest run`: erfolgreich, 193 von 193 Tests bestanden.
- `npm run lint`: erfolgreich.
- `npm run build`: erfolgreich.
- Livecheck: `npm run dev:all` gestartet, Browserseite geoeffnet, Socket-Server meldete reale Client-Verbindung; der Hintergrundprozess wurde anschliessend wieder beendet.

### 8.12 Mission/24h-Hooks in NPC-Reaktionen vom 16.03.2026
- Die Interaktionskette wirkt jetzt nicht nur auf Meta-Werte, sondern direkt auf die Live-NPCs.
- Bei Hazard-Abschluss werden Einsatzkraefte (Medics/Firefighters) in `CLEANUP` und Patrouillen-Polizei in `SHIELD_WALL` ueberfuehrt.
- Evakuierungsboards schalten populationsbezogen und sektoral (Nord/West/Sued) auf `FLEE`/`PANICKED`, waehrend Nicht-Zielsektoren stabil bleiben.
- Diese Kopplung verbindet erstmals Missionseingaben direkt mit der 24h-Lagesimulation und schafft sichtbare Folgeauswirkungen im Crowd-Verhalten.

### 8.13 Mission-Hook-Nachweis
- `src/tests/gameStore.test.ts` wurde um zielgerichtete NPC-Folgeeffekt-Tests erweitert (Responder/Security + sektorale Evakuierung).
- `npx vitest run`: erfolgreich, 195 von 195 Tests bestanden.
- `npm run lint`: erfolgreich.
- `npm run build`: erfolgreich.
- Livecheck: `npm run dev:all` gestartet, Browserseite geoeffnet, Socket-Server meldete reale Client-Verbindung; der Hintergrundprozess wurde anschliessend wieder beendet.

### 8.14 24h-Phasen-Folgehooks vom 16.03.2026
- Der Missionspfad wurde um zeitfensterbasierte Folgehooks erweitert und direkt in `evaluateEvents` eingebunden.
- Damit entstehen nun automatisch phasenabhaengige Reaktionen bei bestehendem Missionsfortschritt, ohne dass der Spieler jede Folge manuell anstossen muss.
- Mittagsphase: Informationsrollen sammeln sich (`GATHER`) nach Epoch-Verifikation.
- Evakuierungsphase: Sicherheits- und Bevoelkerungsreaktionen werden je priorisiertem Sektor erzwungen.
- Spaetphase: bei vollstaendiger Sektorpriorisierung schalten Agitatoren in geordneten Rueckzug (`RETREAT`).

### 8.15 24h-Phasen-Nachweis
- Neuer Testblock `src/tests/missionPhaseHooks.test.ts` validiert Zeitfensterregeln und Sektorwirkung.
- `src/tests/gameStore.test.ts` enthaelt zusaetzlich einen Integrationsnachweis fuer die Hook-Ausfuehrung in `evaluateEvents`.
- `npx vitest run`: erfolgreich, 201 von 201 Tests bestanden.
- `npm run lint`: erfolgreich.
- `npm run build`: erfolgreich.
- Livecheck: `npm run dev:all` gestartet, Browserseite geoeffnet, Socket-Server meldete reale Client-Verbindung; der Hintergrundprozess wurde anschliessend wieder beendet.

### 8.16 HUD-Telemetrie- und Statistik-Ausbau vom 16.03.2026
- Das HUD wurde um ein eigenes Phase-Telemetrie-Modul erweitert (`src/systems/hudTelemetry.ts`), das aus Echtzeitdaten Missionsfortschritt, Hook-Readiness, aktive Hooks, Panikquote und Kernverhaltenszaehler ableitet.
- Im rechten HUD-Panel werden diese Kennzahlen nun dauerhaft visualisiert und damit die vorher rein technischen 24h-Hooks operativ sichtbar.
- Zusaetzlich wurde ein neues Statistik-Overlay eingebaut, das per `STAT`-Bedienelement geoeffnet werden kann und DayStats plus verhaltensbasierte Live-Balken zusammenfuehrt.
- Der Store erhielt dafuer eine explizite Aktion zum Oeffnen der Statistikansicht sowie eine automatische Einblendung beim Tageswechsel ueber Mitternacht.

### 8.17 HUD-Telemetrie-Nachweis
- Neuer Testblock `src/tests/hudTelemetry.test.ts` validiert Zeitfenster-Mapping, robuste Zeitparser-Logik und Telemetrie-Berechnung.
- `src/tests/gameStore.test.ts` wurde um Statistik-Overlay-Steuerung (manuell + Mitternachtswechsel) erweitert.
- `npx vitest run`: erfolgreich, 207 von 207 Tests bestanden.
- `npm run lint`: erfolgreich.
- `npm run build`: erfolgreich.

### 8.18 DayStats-Runtime und Menue-Drilldowns vom 16.03.2026
- Der Store berechnet Tageskennzahlen nun live aus Timeline-Ereignissen (`SPAWN`, `DESPAWN`, `MOOD_CHANGE`, `BEHAVIOR_CHANGE`) sowie aus Missionsinteraktionen.
- Damit werden Verletzte, Festnahmen und Sachschaden nicht mehr nur angezeigt, sondern als laufende Lagewerte fortgeschrieben.
- Fuer Zeitspruenge rueckwaerts werden die DayStats beim Rebuild des Tageszustands konsistent mitberechnet.
- Das Statistik-Overlay wurde um tab-basierte Menuepfade erweitert: `Overview`, `Operations`, `Mission`.
- In den Drilldowns werden operative Belastung, Phasenlage, Missionsfortschritt und kompakte Handlungsempfehlungen getrennt visualisiert.

### 8.19 DayStats-/Drilldown-Nachweis
- `src/tests/gameStore.test.ts` wurde um DayStats-Runtime-Tests erweitert (Event-Fuellung und missionbedingte Entlastung).
- `npx vitest run`: erfolgreich, 209 von 209 Tests bestanden.
- `npm run lint`: erfolgreich.
- `npm run build`: erfolgreich.
- Livecheck: lokaler Full-Stack gestartet, Browserseite geoeffnet, Socket-Client-Verbindung protokolliert; Hintergrundprozess anschliessend sauber beendet.

### 8.20 Rollenbasierter Breakdown und Aftermath-Ereignisketten vom 16.03.2026
- `src/systems/hudTelemetry.ts` wurde um `npcTypeCounts: Partial<Record<NPCType, number>>`, `dominantRole: NPCType | null` und `roleBalance: {security, aggressors, support, civilian}` erweitert.
- Drei Hilfsfunktionen (`buildNpcTypeCounts`, `getDominantRole`, `getRoleBalance`) implementieren die Klassifizierung ohne Seiteneffekte.
- Das Operations-Drilldown-Panel in `HUD.tsx` zeigt jetzt ein 4-Zellen-Rollen-Grid mit Prozentbalken und Dominant-Gruppen-Hinweis.
- Die Einsatzempfehlung reagiert auf Aggressor-Uebermacht gegenueber den Sicherheitskraeften mit einer spezifischen Warnung.
- `src/systems/eventScheduler.ts` wurde um 5 neue Aftermath-Nacht-Events erweitert: `00:30 Plünderer`, `02:00 Ermittlerteam`, `03:30 Festnahmen`, `05:00 Checkpoint-Wechsel`, `05:30 Presse`. Dazu 2 neue TENSION-Eintraege (`02:00 lvl 12`, `05:00 lvl 8`) und 5 neue PHASE_DESCRIPTIONS.

### 8.21 Rollen-/Aftermath-Nachweis
- `src/tests/hudTelemetry.test.ts` um 3 Rollen-Breakdown-Tests erweitert (`npcTypeCounts`, `dominantRole`, `roleBalance`).
- `src/tests/gameStore.test.ts` um 2 Aftermath-Nacht-Tests erweitert (Plünderer spawn 00:30, Festnahmen 03:30).
- `npx vitest run`: erfolgreich, 214 von 214 Tests bestanden.
- `npm run lint`: erfolgreich.
- `npm run build`: erfolgreich, 641 Module.
- Livecheck: lokaler Full-Stack gestartet, Browserseite geoeffnet, Socket `z5ApIUARSI-bF1vHAAAD` verbunden; Prozess sauber beendet.

### 8.22 Phasenbasierte Rollen-Automatik und Replay-Haertung vom 16.03.2026
- `src/stores/gameStore.ts` wurde um einen gemeinsamen Replay-Pfad erweitert, der bei Rueckwaertsspruengen jetzt `SPAWN`, `DESPAWN`, `MOVE`, `MOOD_CHANGE` und `BEHAVIOR_CHANGE` konsistent rekonstruiert.
- Zwei neue dynamische Rollenreaktionen wurden integriert: `dyn-evening-reinforcement` aktiviert ab 18:00 eine zusaetzliche Hundertschaft, `dyn-late-triage` aktiviert ab 21:00 einen Triage-Korridor mit weiteren Sanitaetern.
- Die dynamischen Reaktionen reduzieren gleichzeitig Druck in den Tagesstatistiken (Verletzte/Sachschaden), damit Statistik und Runtime nicht auseinanderlaufen.
- `HUD.tsx` zeigt aktive Automatik-Reaktionen jetzt im Operations-Drilldown als Live-Badges direkt im Rollenverteilungs-Panel.

### 8.23 Rollen-Automatik-Nachweis
- `src/tests/gameStore.test.ts` um 3 weitere Store-Tests erweitert: Abend-Verstaerkung, Spaetphasen-Triage und Rewind-Konsistenz der dynamischen Reaktionen.
- `npx vitest run`: erfolgreich, 217 von 217 Tests bestanden.
- `npm run lint`: erfolgreich.
- `npm run build`: erfolgreich, 641 Module.
- Livecheck: lokaler Full-Stack gestartet, Browserseite geoeffnet, Socket `gfOeXoY-9IyYb1jnAAAF` verbunden; Prozess sauber beendet.

### 8.24 Rollen-Trendhistorie und Operations-Verlauf vom 16.03.2026
- `src/stores/gameStore.ts` fuehrt jetzt `roleTrendHistory` als neuen Zustand mit verdichteten Rollen-Checkpoints (`security`, `aggressors`, `support`, `civilian`, `panicRatioPercent`).
- Bei normalem Zeitfortschritt wird der aktuelle Checkpoint per Upsert/Trim (max 24 Punkte) fortgeschrieben.
- Bei Rueckwaertsspruengen wird die Trendhistorie aus dem Replay bis zur Zielzeit neu aufgebaut, damit Verlauf und Weltzustand synchron bleiben.
- `HUD.tsx` visualisiert im Operations-Drilldown eine kompakte Verlaufsgrafik (SVG-Polylinien) fuer Sicherheit/Aggression/Support der letzten 10 Checkpoints.

### 8.25 Trendhistorie-Nachweis
- `src/tests/gameStore.test.ts` um 2 weitere Tests erweitert: Fortschreibung der Rollenhistorie bei Zeitfortschritt und Leerung bei Tagesreset.
- `npx vitest run`: erfolgreich, 219 von 219 Tests bestanden.
- `npm run lint`: erfolgreich.
- `npm run build`: erfolgreich, 641 Module.
- Livecheck: lokaler Full-Stack gestartet, Browserseite geoeffnet, Socket `Y0d3YxhZ02zjI-P2AAAJ` verbunden; Prozess sauber beendet.

### 8.26 Operations-Korrelations-Engine vom 16.03.2026
- Neues Systemmodul `src/systems/operationsInsights.ts` eingefuehrt. Es berechnet aus Rollen-Trendverlauf, DayStats, Panikquote, Hook-Auslastung und Missionsfortschritt eine strukturierte Auswertung: `priority`, `recommendation`, `correlationLine`, `confidencePercent`.
- `HUD.tsx` nutzt diese Engine im Operations-Drilldown. Die Einsatzempfehlung wird jetzt nicht mehr aus Einzel-if-Ketten, sondern aus korrelierten Lageparametern erzeugt.
- Der Operations-Block zeigt zusaetzlich eine Korrelationszeile sowie Prioritaet und Confidence direkt in der UI.

### 8.27 Korrelations-Nachweis
- Neuer Testblock `src/tests/operationsInsights.test.ts` mit 3 Szenarien (kritische Lage, mittlere Lage, stabile Lage).
- `npx vitest run`: erfolgreich, 222 von 222 Tests bestanden.
- `npm run lint`: erfolgreich.
- `npm run build`: erfolgreich, 642 Module.
- Livecheck: lokaler Full-Stack gestartet, Browserseite geoeffnet, Socket `3Zi--HMxKGEl8XN1AAAB` verbunden; Prozess sauber beendet.

### 8.28 Korrelationsgetriebene Runtime-Folgeevents vom 16.03.2026
- `src/stores/gameStore.ts` bindet die Korrelations-Engine nun direkt in die dynamischen Laufzeitreaktionen ein.
- Neue Folgeevents wurden implementiert: `dyn-high-medical-relief` (zusaetzliche Medics in erhöhter Lage) und `dyn-critical-lockdown` (SEK-Lockdown in kritischer Lage).
- Die Folgeevents wirken direkt auf NPC-Verteilung und DayStats (Verletzte/Sachschaden-Entlastung) und werden in `firedEventKeys` persistiert.
- Rewind-/Replay-Pfade wurden mit dem neuen Korrelationspfad abgestimmt, damit die Triggerzustände konsistent reproduziert werden.
- `HUD.tsx` zeigt die neuen Folgeevent-Trigger als Badges im Operations-Panel.

### 8.29 Folgeevent-Nachweis
- `src/tests/gameStore.test.ts` um 2 weitere Tests erweitert: HIGH-medical-relief Trigger und CRITICAL-lockdown Trigger.
- `npx vitest run`: erfolgreich, 224 von 224 Tests bestanden.
- `npm run lint`: erfolgreich.
- `npm run build`: erfolgreich, 642 Module.
- Livecheck: lokaler Full-Stack gestartet, Browserseite geoeffnet, Socket `eEIHFHDerj45M_TpAAAF` verbunden; Prozess sauber beendet.