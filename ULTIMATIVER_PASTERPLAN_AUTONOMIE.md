# Ultimativer Pasterplan Vollautonomie

## Zielbild
- Die Full-Spec-Vorgaben werden in einen ausfuehrbaren Projektmodus ueberfuehrt.
- Der aktuelle Code-Stand bleibt lauffaehig und verifizierbar.
- Server-Zahlen, Profile, Ports und Quality-Gates sind dauerhaft nachvollziehbar dokumentiert.

## Server-Zahlen Referenz
- VITE_PORT: 5173
- SOCKET_PORT: 3000
- PORT (Public Stream): 7860
- INTERNAL_PORT (Renderer intern): 3099
- Profile:
  - low: 960x540, fps 24
  - medium: 1280x720, fps 30
  - high: 1600x900, fps 45
  - aaa: 1920x1080, fps 60

## Ultimative Ausfuehrungslogik
1. Baseline sichern: Aktuellen Stand als Referenz behandeln, keine unkontrollierten Ruecksetzungen.
2. Quality-Gate vor jeder grossen Aenderung:
   - lint
   - tests
   - build
3. Streaming-Livecheck:
   - health abrufen
   - Profile low -> medium -> high -> aaa -> low schalten
   - health nach jedem Umschalten pruefen
4. Architekturblenden aus dem Full-Spec nur inkrementell aktivieren:
   - Core-Stabilitaet zuerst
   - dann Performance-Optimierungen
   - dann UX/HUD-Verfeinerung
5. Dokumentationspflicht:
   - jedes technische Ergebnis in den Projektbericht
   - jeder Verifikationslauf in das Gedaechtnisprotokoll
6. Abnahmekriterien:
   - Build gruen
   - Tests gruen
   - Profile schaltbar
   - Health-Endpunkt liefert konsistente Ports und Profilwerte

## Status dieses Durchlaufs
- Profilumschaltung und Health-Verifikation erfolgreich ausgefuehrt.
- transportSource war konsistent canvas-webrtc.
- clients waehrend des Verifikationslaufs: 1.

## Naechste technische Etappen
1. Full-Spec in priorisierte Implementierungs-Etappen aufteilen (Core, Streaming, AI, Audio, QA).
2. Jede Etappe mit eigenen Testfaellen und klaren Done-Kriterien verankern.
3. Nach jeder Etappe denselben Quality- und Streaming-Abnahmelauf wiederholen.