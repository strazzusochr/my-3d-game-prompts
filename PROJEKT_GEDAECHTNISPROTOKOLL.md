# Projekt Gedaechtnisprotokoll

## Arbeitsregeln
- Immer mit dem naechsten logisch besten Schritt beginnen.
- Reihenfolge der Arbeitsschritte so waehlen, dass Folgefehler minimiert werden.
- Vor jedem neuen Arbeitspunkt dieses Protokoll und die persistente Nutzerpraeferenz lesen.
- Antworten, Dokumentation und neu erzeugte Projektartefakte konsequent auf Deutsch halten.
- Vorhandene Eintraege nicht loeschen, sondern nur fortlaufend ergaenzen.
- Aenderungen nach Moeglichkeit mit Verifikation absichern.

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

## Naechster logischer Schritt
- Projektbericht mit frischen Verifikationsdaten pflegen und kuenftige Quellcodeaenderungen gegen diesen Referenzstand abgleichen.