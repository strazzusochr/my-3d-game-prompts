# Projekt Gedaechtnisprotokoll

## Arbeitsregeln
- Immer mit dem naechsten logisch besten Schritt beginnen.
- Reihenfolge der Arbeitsschritte so waehlen, dass Folgefehler minimiert werden.
- Vor jedem neuen Arbeitspunkt dieses Protokoll und die persistente Nutzerpraeferenz lesen.
- Antworten, Dokumentation und neu erzeugte Projektartefakte konsequent auf Deutsch halten.
- Vorhandene Eintraege nicht loeschen, sondern nur fortlaufend ergaenzen.
- Aenderungen nach Moeglichkeit mit Verifikation absichern.
- Keine Abkuerzungen und keine Ausweichwege: nach jedem Implementierungsblock zwingend Tests, Browserdurchlauf und Debug-Pruefung.
- Zielzustand ist immer null Probleme und null Fehler; autonom weiterarbeiten bis der Zielzustand erreicht ist.

## Aktueller Arbeitsstand
- Persistente Nutzerpraeferenzen wurden um die neuen Ablaufregeln erweitert.
- Aktueller Repository-Stand enthaelt bereits Test-, Lint- und Streaming-Anpassungen aus der vorigen Arbeitsphase.
- Fuer den aktuellen Schritt wird ein professioneller Projektbericht erzeugt und der gegenwaertige Stand festgehalten.
- Vollverifikation am 16.03.2026 erfolgreich: Lint gruen, 7 von 7 Tests gruen, Produktionsbuild gruen.
- Erneute Vollverifikation am 16.03.2026 erfolgreich: Lint gruen, 7 von 7 Tests gruen, Produktionsbuild gruen (Abnahme-Refresh).
- Streaming-Health bestaetigt: Status `ok`, Profil `low`, Transport `canvas-webrtc`, Renderer-FPS 128, Viewer-FPS 0 im momentanen Headless-/Kontrollzustand.
- Viewer-Pfad nachaktiviert und bestaetigt: unter aktiven Viewer-Seiten stabilisierte sich `viewerFps` auf 22 bis 24 FPS bei `clients=4`.
- Arbeitsbaum grob getrennt: Quellcodeaenderungen in Server-, Store-, UI- und Konfigurationsdateien; generierte Build-Artefakte liegen separat unter `dist/`.
- Mehrprofil-Lasttest am 16.03.2026 abgeschlossen: `medium`, `high`, `aaa` und Rueckkehr auf `low` wurden per API live umgeschaltet und ueber `/health` verifiziert.
- Praktischer Capture-Fallback bestaetigt: in allen Profilen blieb `transportSource=canvas-webrtc`; der experimentelle `tab-webrtc`-Pfad wurde in dieser Umgebung nicht aktiv.
- Viewer-Metrik unter Last ist profilabhaengig und nicht in jedem Snapshot stabil, war aber in allen vier Profilphasen reproduzierbar groesser als 0.
- `.gitignore` wurde auf Artefakt-Trennung erweitert, damit `dist/`, `hf_space_pull/` und lokale Env-Dateien kuenftig nicht mit Quellcodeaenderungen vermischt werden.
- Vollautonomie-Lauf am 16.03.2026 erneut ausgefuehrt: Live-Health und Profilumschaltung (`low -> medium -> high -> aaa -> low`) erfolgreich, konsistente Server-Zahlen `publicPort=7860`, `internalPort=3099`, `transportSource=canvas-webrtc`, `clients=1`.
- Finaler Quality-Gate-Nachweis am 16.03.2026 im Einzelmodus erfolgreich: `npm run lint` gruen, `vitest` 7 von 7 gruen, Build gruen (`BUILD_OK`).
- Verbindlicher Null-Fehler-Prozess am 16.03.2026 erneut bestaetigt: Browserdurchlauf aktiv, Debug-Pruefung ohne Fehler, Runtime-Health `ok`, danach Quality-Gates komplett gruen.
- GO-GO-GO-Automation umgesetzt: `npm run autonomy:full` fuehrt nun in einem Lauf Lint, Tests, Build und serverseitigen Profil-/Health-Beweis aus.
- Autonomy-Proof am 16.03.2026 bestaetigt: Profilkette `low -> medium -> high -> aaa -> low` erfolgreich, Abschlussmarker `AUTONOMY_PROOF_OK` erreicht.
- Wiederholungslauf nach Doku-Update erfolgreich: `npm run autonomy:full` erneut komplett gruen inklusive Proof-Marker `AUTONOMY_PROOF_OK`.
- Runner-Haertung am 16.03.2026 abgeschlossen: Windows-Spawn-Problem (`EINVAL`) in `autonomy:full` behoben, neuer Shell-basierter Prozessstart validiert.
- Neuer Nachweislauf erfolgreich: `AUTONOMY_FULL_OK` sowie `AUTONOMY_PROOF_OK` in einem Durchgang erreicht.
- Retry-Haertung am 16.03.2026 abgeschlossen: `autonomy:proof` faengt nun kurzzeitige Reconnect-Phasen bei Profilwechseln ab.
- Selbstheilender Lauf bestaetigt: `autonomy:full` startete den Stream bei nicht erreichbarer Health-URL selbst, fuehrte alle Gates aus und beendete den runner-eigenen Stream kontrolliert.
- Weiterer Wiederholungslauf erfolgreich: `autonomy:full` erneut komplett gruen mit `AUTONOMY_PROOF_OK` und `AUTONOMY_FULL_OK`.
- Finaler Stabilitaetslauf erfolgreich: nach Retry-Haertung lief `autonomy:full` erneut ohne Abbruch bis `AUTONOMY_FULL_OK`.
- Neuer GO-GO-GO-Zyklus erfolgreich: Browser-Check und Debug-Check ohne Fehler, danach `autonomy:full` komplett bis `AUTONOMY_PROOF_OK` und `AUTONOMY_FULL_OK`.
- Reihenfolgefix umgesetzt: `autonomy:full` baut nun vor Streamstart und verhindert damit fehlende Dist-Dateien beim Start.
- Nachweislauf nach Reihenfolgefix erfolgreich mit `AUTONOMY_PROOF_OK` und `AUTONOMY_FULL_OK`.

## Naechster logischer Schritt
- Etappe 1 des Masterplans technisch ausbauen und nach jedem Block den Command `npm run autonomy:full` als Pflichtnachweis ausfuehren.