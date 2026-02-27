# CORONA CONTROL ULTIMATE - ULTIMATIVER HYPER-TEST-PROMPT VERSION 2.0

## ABSOLUTER PFLICHT-TEST FÜR GEMINI AI CODER

---

# ⛔ STOP - LIES DAS ZUERST KOMPLETT DURCH

## VERBINDLICHE REGELN - KEINE AUSNAHMEN

**REGEL 1: DU MUSST JEDEN TEST TATSÄCHLICH IM AI-BROWSER AUSFÜHREN**
- Kein "Ich nehme an dass..."
- Kein "Das sollte funktionieren..."
- Kein "Basierend auf dem Code..."
- NUR tatsächliche Tests mit echten Ergebnissen

**REGEL 2: DU MUSST BEWEISE LIEFERN**
- Screenshots von jedem kritischen Test
- Exakte Zahlenwerte (nicht "ungefähr")
- Zeitstempel für jeden Test
- Code-Snippets bei Fixes

**REGEL 3: DU DARFST NICHT WEITERMACHEN BEI FEHLERN**
- Jeder fehlgeschlagene Test MUSS sofort behoben werden
- Erst nach erfolgreicher Wiederholung zum nächsten Test
- Keine "ich fixe das später" Ausreden

**REGEL 4: DU MUSST DAS DOKUMENTATIONS-FORMAT EINHALTEN**
- Jeder Test hat eine Test-ID
- Jeder Test hat ein Ergebnis: ✅ BESTANDEN oder ❌ FEHLGESCHLAGEN
- Jeder Test hat einen Beweis (Wert, Screenshot-Referenz, etc.)

**REGEL 5: MINIMALE BESTEHENSQUOTE IST 98%**
- Unter 98% = Projekt nicht akzeptabel
- Kritische Tests (markiert mit 🔴) müssen ALLE bestehen
- Ein einziger kritischer Fehler = Gesamtes Projekt FEHLGESCHLAGEN

---

# DOKUMENTATIONS-VORLAGE

Für JEDEN Test musst du folgendes Format verwenden:

```
TEST-ID: [X.X.X]
KATEGORIE: [Kategorie]
BESCHREIBUNG: [Was getestet wird]
DURCHFÜHRUNG: [Exakte Schritte die du gemacht hast]
ERWARTETES ERGEBNIS: [Was passieren sollte]
TATSÄCHLICHES ERGEBNIS: [Was tatsächlich passiert ist]
MESSWERT: [Exakter Zahlenwert falls zutreffend]
BEWEIS: [Screenshot-Name oder Code-Snippet]
STATUS: ✅ BESTANDEN / ❌ FEHLGESCHLAGEN
TIMESTAMP: [Datum und Uhrzeit des Tests]
[Falls FEHLGESCHLAGEN:]
FEHLER-ANALYSE: [Warum ist es fehlgeschlagen]
FIX-BESCHREIBUNG: [Was du geändert hast]
FIX-CODE: [Der geänderte Code]
NACH-FIX-TEST: ✅ BESTANDEN / ❌ FEHLGESCHLAGEN
```

---

# SEKTION A: PROJEKT-FUNDAMENT-TESTS

## A1: DATEI-EXISTENZ-VALIDIERUNG

### 🔴 TEST A1.1: Package.json Existenz [KRITISCH]

Öffne den AI-Browser. Navigiere zum Projektverzeichnis. Suche die Datei package.json.

ERWARTUNG: Datei existiert im Wurzelverzeichnis.

DURCHFÜHRUNG: Führe im Terminal aus: ls -la package.json

AKZEPTANZKRITERIUM: Datei wird angezeigt mit Größe größer als 0 Bytes.

WENN FEHLGESCHLAGEN: Erstelle package.json mit allen erforderlichen Dependencies sofort.

---

### 🔴 TEST A1.2: Package.json Inhalt [KRITISCH]

Öffne package.json im Editor. Prüfe den Inhalt Zeile für Zeile.

PRÜFPUNKT A1.2.1: Enthält "name" Feld
- Erwarteter Wert: "corona-control-ultimate" oder ähnlich
- Gefundener Wert: ___
- Status: ✅/❌

PRÜFPUNKT A1.2.2: Enthält "version" Feld
- Erwarteter Wert: Semantische Version (X.Y.Z)
- Gefundener Wert: ___
- Status: ✅/❌

PRÜFPUNKT A1.2.3: Enthält "dependencies" Objekt
- Erwartung: Objekt mit mindestens 5 Einträgen
- Gefundene Anzahl: ___
- Status: ✅/❌

PRÜFPUNKT A1.2.4: React Dependency
- Erwartete Version: >=19.0.0
- Gefundene Version: ___
- Ist Version ausreichend: ✅/❌

PRÜFPUNKT A1.2.5: @react-three/fiber Dependency
- Erwartete Version: >=9.0.0
- Gefundene Version: ___
- Ist Version ausreichend: ✅/❌

PRÜFPUNKT A1.2.6: @react-three/drei Dependency
- Erwartete Version: >=10.0.0
- Gefundene Version: ___
- Ist Version ausreichend: ✅/❌

PRÜFPUNKT A1.2.7: three Dependency
- Erwartete Version: >=0.170.0
- Gefundene Version: ___
- Ist Version ausreichend: ✅/❌

PRÜFPUNKT A1.2.8: zustand Dependency
- Erwartete Version: >=5.0.0
- Gefundene Version: ___
- Ist Version ausreichend: ✅/❌

PRÜFPUNKT A1.2.9: @react-three/rapier Dependency
- Erwartung: Vorhanden
- Gefundene Version: ___
- Status: ✅/❌

PRÜFPUNKT A1.2.10: typescript DevDependency
- Erwartung: Vorhanden in devDependencies
- Gefundene Version: ___
- Status: ✅/❌

PRÜFPUNKT A1.2.11: vite DevDependency
- Erwartung: Vorhanden in devDependencies
- Gefundene Version: ___
- Status: ✅/❌

GESAMT A1.2: ___ von 11 Prüfpunkten bestanden.

WENN unter 11: Korrigiere package.json sofort und wiederhole ALLE Prüfpunkte.

---

### 🔴 TEST A1.3: TypeScript Konfiguration [KRITISCH]

Öffne tsconfig.json im Editor.

PRÜFPUNKT A1.3.1: Datei existiert
- Status: ✅/❌

PRÜFPUNKT A1.3.2: compilerOptions.strict ist true
- Gefundener Wert: ___
- Status: ✅/❌

PRÜFPUNKT A1.3.3: compilerOptions.strictNullChecks ist true
- Gefundener Wert: ___
- Status: ✅/❌

PRÜFPUNKT A1.3.4: compilerOptions.noImplicitAny ist true
- Gefundener Wert: ___
- Status: ✅/❌

PRÜFPUNKT A1.3.5: compilerOptions.esModuleInterop ist true
- Gefundener Wert: ___
- Status: ✅/❌

PRÜFPUNKT A1.3.6: compilerOptions.jsx ist "react-jsx"
- Gefundener Wert: ___
- Status: ✅/❌

PRÜFPUNKT A1.3.7: include enthält "src"
- Gefundener Wert: ___
- Status: ✅/❌

GESAMT A1.3: ___ von 7 Prüfpunkten bestanden.

---

### TEST A1.4: Vite Konfiguration

Öffne vite.config.ts im Editor.

PRÜFPUNKT A1.4.1: Datei existiert
- Status: ✅/❌

PRÜFPUNKT A1.4.2: React Plugin importiert
- Suche nach: import react from '@vitejs/plugin-react'
- Gefunden: ✅/❌

PRÜFPUNKT A1.4.3: React Plugin in plugins Array
- Suche nach: plugins: [react()]
- Gefunden: ✅/❌

---

## A2: ORDNERSTRUKTUR-VALIDIERUNG

### 🔴 TEST A2.1: Source-Ordner [KRITISCH]

Führe im Terminal aus: ls -la src/

PRÜFPUNKT A2.1.1: src/ Ordner existiert
- Status: ✅/❌

PRÜFPUNKT A2.1.2: src/app/ existiert
- Status: ✅/❌

PRÜFPUNKT A2.1.3: src/components/ existiert
- Status: ✅/❌

PRÜFPUNKT A2.1.4: src/stores/ existiert
- Status: ✅/❌

PRÜFPUNKT A2.1.5: src/systems/ existiert
- Status: ✅/❌

PRÜFPUNKT A2.1.6: src/types/ existiert
- Status: ✅/❌

PRÜFPUNKT A2.1.7: src/constants/ existiert
- Status: ✅/❌

---

### TEST A2.2: Components-Unterordner

Führe im Terminal aus: ls -la src/components/

PRÜFPUNKT A2.2.1: game/ existiert - Status: ✅/❌
PRÜFPUNKT A2.2.2: player/ existiert - Status: ✅/❌
PRÜFPUNKT A2.2.3: npcs/ existiert - Status: ✅/❌
PRÜFPUNKT A2.2.4: environment/ existiert - Status: ✅/❌
PRÜFPUNKT A2.2.5: effects/ existiert - Status: ✅/❌
PRÜFPUNKT A2.2.6: ui/ existiert - Status: ✅/❌
PRÜFPUNKT A2.2.7: weapons/ existiert - Status: ✅/❌

---

### TEST A2.3: Kern-Dateien Existenz

PRÜFPUNKT A2.3.1: src/components/game/GameCanvas.tsx existiert
- Führe aus: ls src/components/game/GameCanvas.tsx
- Status: ✅/❌

PRÜFPUNKT A2.3.2: src/components/game/GameScene.tsx existiert
- Status: ✅/❌

PRÜFPUNKT A2.3.3: src/components/player/PlayerController.tsx existiert
- Status: ✅/❌

PRÜFPUNKT A2.3.4: src/components/npcs/NPCManager.tsx existiert
- Status: ✅/❌

PRÜFPUNKT A2.3.5: src/stores/gameStore.ts existiert
- Status: ✅/❌

PRÜFPUNKT A2.3.6: src/stores/playerStore.ts existiert
- Status: ✅/❌

PRÜFPUNKT A2.3.7: src/types/enums.ts existiert
- Status: ✅/❌

PRÜFPUNKT A2.3.8: src/types/interfaces.ts existiert
- Status: ✅/❌

---

### 🔴 TEST A2.4: Verbotene Dateien [KRITISCH]

Führe im Terminal aus: find src -name "*.js" -type f

ERWARTUNG: Keine Ergebnisse (0 Dateien)

TATSÄCHLICHE ANZAHL: ___

WENN größer als 0: Liste JEDE gefundene .js Datei auf:
1. ___
2. ___
3. ___

AKTION: Konvertiere JEDE .js Datei zu .tsx oder lösche sie.

Führe im Terminal aus: find src -name "*.jsx" -type f

ERWARTUNG: Keine Ergebnisse (0 Dateien)

TATSÄCHLICHE ANZAHL: ___

STATUS: ✅ BESTANDEN (0 verbotene Dateien) / ❌ FEHLGESCHLAGEN

---

## A3: INSTALLATIONS-TESTS

### 🔴 TEST A3.1: NPM Install [KRITISCH]

Führe im Terminal aus: rm -rf node_modules && npm install

BEOBACHTE die Ausgabe für 60 Sekunden.

PRÜFPUNKT A3.1.1: Installation startet ohne Fehler
- Status: ✅/❌

PRÜFPUNKT A3.1.2: Keine npm ERR! Meldungen
- Anzahl Fehler: ___
- Status: ✅/❌

PRÜFPUNKT A3.1.3: Keine npm WARN peer dep Meldungen (kritisch)
- Anzahl kritische Warnungen: ___
- Status: ✅/❌

PRÜFPUNKT A3.1.4: Installation schließt mit "added X packages" ab
- Anzahl Packages: ___
- Status: ✅/❌

PRÜFPUNKT A3.1.5: node_modules/ Ordner wurde erstellt
- Führe aus: ls -la node_modules/ | head -5
- Status: ✅/❌

WENN irgendein Fehler: Kopiere die KOMPLETTE Fehlerausgabe hierher und behebe JEDEN Fehler.

---

## A4: KOMPILIERUNGS-TESTS

### 🔴 TEST A4.1: TypeScript Kompilierung [KRITISCH]

Führe im Terminal aus: npx tsc --noEmit 2>&1

WARTE bis der Befehl abgeschlossen ist.

PRÜFPUNKT A4.1.1: Befehl wurde ausgeführt
- Status: ✅/❌

PRÜFPUNKT A4.1.2: Anzahl Fehler in der Ausgabe
- Suche nach Zeilen mit "error TS"
- Führe aus: npx tsc --noEmit 2>&1 | grep -c "error TS"
- Gefundene Anzahl: ___
- Status: ✅ (wenn 0) / ❌ (wenn größer 0)

WENN Fehler gefunden:

Liste JEDEN Fehler einzeln auf:

FEHLER 1:
- Datei: ___
- Zeile: ___
- Fehlercode: ___
- Fehlermeldung: ___
- FIX: ___

FEHLER 2:
- Datei: ___
- Zeile: ___
- Fehlercode: ___
- Fehlermeldung: ___
- FIX: ___

(Wiederhole für JEDEN Fehler)

NACH DEM FIX: Führe npx tsc --noEmit erneut aus und bestätige 0 Fehler.

---

### TEST A4.2: Any-Type Prüfung

Führe im Terminal aus: grep -r ": any" src --include="*.ts" --include="*.tsx" | wc -l

ERWARTUNG: Weniger als 5 Vorkommen

TATSÄCHLICHE ANZAHL: ___

WENN mehr als 5:

Liste JEDES Vorkommen auf:

Führe aus: grep -rn ": any" src --include="*.ts" --include="*.tsx"

VORKOMMEN 1:
- Datei: ___
- Zeile: ___
- Kontext: ___
- Korrekter Typ sollte sein: ___
- Status nach Fix: ✅/❌

(Wiederhole für JEDES Vorkommen über 5)

---

## A5: BUILD-TESTS

### 🔴 TEST A5.1: Development Server Start [KRITISCH]

Führe im Terminal aus: npm run dev

WARTE 15 Sekunden.

PRÜFPUNKT A5.1.1: Server startet ohne Crash
- Status: ✅/❌

PRÜFPUNKT A5.1.2: Port wird angezeigt
- Angezeigter Port: ___
- Status: ✅/❌

PRÜFPUNKT A5.1.3: Keine Fehler in der Konsole
- Anzahl Fehler: ___
- Status: ✅/❌

PRÜFPUNKT A5.1.4: "ready" oder "compiled" Meldung erscheint
- Status: ✅/❌

WENN FEHLGESCHLAGEN: Kopiere die KOMPLETTE Konsolenausgabe und analysiere den Fehler.

---

### TEST A5.2: Production Build

Stoppe den Dev-Server (Ctrl+C).

Führe im Terminal aus: npm run build

WARTE bis der Build abgeschlossen ist.

PRÜFPUNKT A5.2.1: Build startet
- Status: ✅/❌

PRÜFPUNKT A5.2.2: Keine Fehler während Build
- Anzahl Fehler: ___
- Status: ✅/❌

PRÜFPUNKT A5.2.3: Build schließt ab mit "built in X.XXs"
- Build-Zeit: ___ Sekunden
- Status: ✅/❌

PRÜFPUNKT A5.2.4: dist/ Ordner wurde erstellt
- Führe aus: ls -la dist/
- Status: ✅/❌

PRÜFPUNKT A5.2.5: dist/index.html existiert
- Status: ✅/❌

PRÜFPUNKT A5.2.6: dist/assets/ enthält JS-Dateien
- Führe aus: ls dist/assets/*.js | wc -l
- Anzahl JS-Dateien: ___
- Status: ✅/❌

---

# SEKTION B: RENDERING-TESTS

## B1: CANVAS-VALIDIERUNG

### 🔴 TEST B1.1: Canvas-Element [KRITISCH]

Starte den Dev-Server: npm run dev

Öffne im Browser: http://localhost:[PORT]

Öffne Developer Tools (F12) → Elements Tab

PRÜFPUNKT B1.1.1: Canvas-Element existiert im DOM
- Suche nach: <canvas
- Gefunden: ✅/❌

PRÜFPUNKT B1.1.2: Canvas hat Dimensionen
- Canvas Width Attribut: ___ px
- Canvas Height Attribut: ___ px
- Beide größer als 0: ✅/❌

PRÜFPUNKT B1.1.3: Canvas füllt Viewport
- Erwartete Breite: Mindestens 800px
- Tatsächliche Breite: ___px
- Status: ✅/❌

---

### 🔴 TEST B1.2: Kein Frozen Screen [KRITISCH]

Dies ist der wichtigste Test wegen des bekannten Frozen-Screen-Bugs.

SCHRITT 1: Lade die Seite neu (F5)
SCHRITT 2: Warte exakt 5 Sekunden
SCHRITT 3: Beobachte die Szene

PRÜFPUNKT B1.2.1: Die Szene ist NICHT komplett weiß
- Farbe des Bildschirms: ___
- Status: ✅/❌

PRÜFPUNKT B1.2.2: Die Szene ist NICHT komplett schwarz
- Status: ✅/❌

PRÜFPUNKT B1.2.3: 3D-Objekte sind sichtbar
- Anzahl erkennbarer Objekte: ___
- Status: ✅/❌

PRÜFPUNKT B1.2.4: Bewege die Maus über die Szene - Kamera reagiert
- Kamera dreht sich: ✅/❌

PRÜFPUNKT B1.2.5: Drücke WASD - Etwas bewegt sich
- Bewegung erkennbar: ✅/❌

WENN B1.2.1, B1.2.4 oder B1.2.5 FEHLGESCHLAGEN:

**DAS IST DER FROZEN-SCREEN-BUG!**

SOFORT PRÜFEN:

1. Öffne GameCanvas.tsx
2. Suche nach dem Canvas-Element
3. Prüfe ob camera-Prop im Canvas gesetzt ist:
   - Gefunden <Canvas camera={{...}}>: ❌ DAS IST FALSCH
   - Gefunden <Canvas> ohne camera-Prop: ✅ KORREKT

4. Prüfe ob PerspectiveCamera verwendet wird:
   - Suche nach: <PerspectiveCamera makeDefault
   - Gefunden: ✅/❌

5. Prüfe ob updateMatrixWorld aufgerufen wird:
   - Suche in useFrame nach: camera.updateMatrixWorld(true)
   - Gefunden: ✅/❌

FIX FÜR FROZEN SCREEN:

FALSCHER CODE (entfernen):
```
<Canvas camera={{ position: [0, 5, 10], fov: 75 }}>
```

KORREKTER CODE (verwenden):
```
<Canvas>
  <PerspectiveCamera 
    makeDefault 
    position={[0, 5, 10]} 
    fov={75}
    ref={cameraRef}
  />
```

UND in useFrame:
```
useFrame(({ camera }) => {
  camera.updateMatrixWorld(true);
  // ... rest of camera logic
});
```

NACH DEM FIX: Lade neu und wiederhole Test B1.2 KOMPLETT.

---

### TEST B1.3: WebGL/WebGPU Kontext

Öffne Browser Console (F12 → Console)

Führe aus: 
```javascript
const canvas = document.querySelector('canvas');
const gl = canvas.getContext('webgl2');
console.log('WebGL2:', gl !== null);
```

PRÜFPUNKT B1.3.1: WebGL2 Kontext verfügbar
- Ausgabe: ___
- Status: ✅/❌

Führe aus (falls WebGPU unterstützt):
```javascript
if (navigator.gpu) {
  navigator.gpu.requestAdapter().then(a => console.log('WebGPU:', a !== null));
}
```

PRÜFPUNKT B1.3.2: WebGPU verfügbar (optional)
- Ausgabe: ___
- Status: ✅/❌/N/A

---

## B2: FRAMERATE-TESTS

### 🔴 TEST B2.1: Basis-FPS [KRITISCH]

Öffne Developer Tools → Performance Tab (oder verwende eingebauten FPS-Counter)

Methode 1 - Stats.js (falls eingebaut):
- Suche nach FPS-Anzeige auf dem Bildschirm
- Status: Vorhanden/Nicht vorhanden

Methode 2 - Performance Tab:
- Klicke auf Record
- Warte 10 Sekunden
- Klicke auf Stop
- Analysiere die Frames

PRÜFPUNKT B2.1.1: Durchschnitts-FPS über 10 Sekunden
- Erwartung: Mindestens 30 FPS
- Gemessener Wert: ___ FPS
- Status: ✅/❌

PRÜFPUNKT B2.1.2: Minimum-FPS
- Erwartung: Mindestens 20 FPS
- Gemessener Wert: ___ FPS
- Status: ✅/❌

PRÜFPUNKT B2.1.3: Keine Frame-Drops über 100ms
- Längster Frame: ___ ms
- Status: ✅ (unter 100ms) / ❌ (über 100ms)

---

### TEST B2.2: FPS unter Last

Erhöhe die NPC-Anzahl auf 100 (falls konfigurierbar) oder bewege dich in einen Bereich mit vielen Objekten.

Wiederhole die FPS-Messung:

PRÜFPUNKT B2.2.1: FPS mit 100 NPCs
- Gemessener Wert: ___ FPS
- Erwartung: Mindestens 25 FPS
- Status: ✅/❌

---

### TEST B2.3: Stress-Test FPS

Erhöhe die NPC-Anzahl auf Maximum (500) oder lade die komplexeste Szene.

PRÜFPUNKT B2.3.1: FPS bei maximaler Last
- Gemessener Wert: ___ FPS
- Erwartung: Mindestens 15 FPS (spielbar)
- Status: ✅/❌

---

## B3: RENDER-QUALITÄTS-TESTS

### TEST B3.1: Beleuchtung vorhanden

PRÜFPUNKT B3.1.1: Szene ist nicht komplett dunkel
- Helligkeit erkennbar: ✅/❌

PRÜFPUNKT B3.1.2: Direktionales Licht (Sonne) vorhanden
- Schatten sichtbar: ✅/❌

PRÜFPUNKT B3.1.3: Ambient Light vorhanden
- Schattenbereiche nicht komplett schwarz: ✅/❌

---

### TEST B3.2: Schatten-Qualität

PRÜFPUNKT B3.2.1: Schatten werden gerendert
- Mindestens ein Schatten sichtbar: ✅/❌

PRÜFPUNKT B3.2.2: Schatten sind nicht pixelig
- Schatten haben weiche Kanten: ✅/❌

PRÜFPUNKT B3.2.3: Schatten-Position ist korrekt
- Schatten fallen weg von Lichtquelle: ✅/❌

---

### TEST B3.3: Textur-Qualität

Bewege dich nah an ein texturiertes Objekt (unter 2 Meter).

PRÜFPUNKT B3.3.1: Texturen sind sichtbar
- Objekte haben Texturen (nicht einfarbig): ✅/❌

PRÜFPUNKT B3.3.2: Texturen sind nicht verschwommen
- Details erkennbar: ✅/❌

PRÜFPUNKT B3.3.3: Texturen sind nicht pixelig
- Keine sichtbaren Pixel-Blöcke: ✅/❌

PRÜFPUNKT B3.3.4: MipMapping funktioniert
- Texturen in der Ferne nicht flimmernd: ✅/❌

---

# SEKTION C: 3D-WELT-TESTS

## C1: GRUND-ELEMENTE

### 🔴 TEST C1.1: Boden/Ground [KRITISCH]

PRÜFPUNKT C1.1.1: Boden ist sichtbar
- Status: ✅/❌

PRÜFPUNKT C1.1.2: Boden ist nicht durchsichtig
- Spieler steht auf festem Untergrund: ✅/❌

PRÜFPUNKT C1.1.3: Boden hat Textur
- Textur vorhanden: ✅/❌
- Art der Textur (Asphalt/Gras/etc.): ___

PRÜFPUNKT C1.1.4: Boden-Größe ausreichend
- Kann man vom Boden fallen: ✅ (Ja = ❌) / ❌ (Nein = ✅)

---

### TEST C1.2: Himmel/Skybox

PRÜFPUNKT C1.2.1: Himmel ist sichtbar
- Schaue nach oben
- Status: ✅/❌

PRÜFPUNKT C1.2.2: Himmel ist nicht einfarbig grau
- Farbe des Himmels: ___
- Status: ✅/❌

PRÜFPUNKT C1.2.3: Horizont sichtbar
- Übergang Boden zu Himmel erkennbar: ✅/❌

---

## C2: GEBÄUDE-TESTS

### TEST C2.1: Gebäude-Existenz

PRÜFPUNKT C2.1.1: Mindestens ein Gebäude sichtbar
- Status: ✅/❌

PRÜFPUNKT C2.1.2: Anzahl sichtbarer Gebäude
- Gezählte Anzahl: ___
- Erwartung: Mindestens 5
- Status: ✅/❌

---

### TEST C2.2: Gebäude-Qualität

Wähle ein Gebäude und untersuche es genau:

PRÜFPUNKT C2.2.1: Gebäude hat Wände
- Alle 4 Seiten vorhanden: ✅/❌

PRÜFPUNKT C2.2.2: Gebäude hat Dach
- Dach sichtbar: ✅/❌

PRÜFPUNKT C2.2.3: Gebäude hat Fenster
- Fenster sichtbar: ✅/❌
- Anzahl Fenster: ___

PRÜFPUNKT C2.2.4: Gebäude hat Tür
- Mindestens eine Tür: ✅/❌

PRÜFPUNKT C2.2.5: Gebäude hat Texturen
- Texturiert (nicht einfarbig): ✅/❌

PRÜFPUNKT C2.2.6: Gebäude-Proportionen realistisch
- Sieht wie echtes Gebäude aus: ✅/❌

---

### TEST C2.3: Gebäude-Kollision

Laufe gegen ein Gebäude.

PRÜFPUNKT C2.3.1: Spieler kann nicht durch Wand laufen
- Status: ✅/❌

PRÜFPUNKT C2.3.2: Kollision fühlt sich solide an
- Kein Rutschen oder Zittern: ✅/❌

---

## C3: STRASSEN-TESTS

### TEST C3.1: Straßen-Existenz

PRÜFPUNKT C3.1.1: Straßen sind sichtbar
- Status: ✅/❌

PRÜFPUNKT C3.1.2: Straßen haben andere Farbe als Gehweg
- Unterschied erkennbar: ✅/❌

PRÜFPUNKT C3.1.3: Gehwege vorhanden
- Status: ✅/❌

---

### TEST C3.2: Straßen-Details

PRÜFPUNKT C3.2.1: Straßenmarkierungen vorhanden
- Linien auf Straße: ✅/❌

PRÜFPUNKT C3.2.2: Bordstein zwischen Straße und Gehweg
- Höhenunterschied sichtbar: ✅/❌

---

## C4: UMGEBUNGS-OBJEKTE

### TEST C4.1: Straßenlaternen

PRÜFPUNKT C4.1.1: Straßenlaternen vorhanden
- Status: ✅/❌
- Anzahl sichtbar: ___

PRÜFPUNKT C4.1.2: Laternen haben korrekte Form
- Pfosten + Lampe erkennbar: ✅/❌

PRÜFPUNKT C4.1.3: Laternen emittieren Licht (nachts)
- Setze Zeit auf 22:00 falls möglich
- Licht sichtbar: ✅/❌

---

### TEST C4.2: Weitere Umgebungs-Objekte

PRÜFPUNKT C4.2.1: Mülleimer vorhanden
- Status: ✅/❌
- Anzahl: ___

PRÜFPUNKT C4.2.2: Bänke vorhanden
- Status: ✅/❌
- Anzahl: ___

PRÜFPUNKT C4.2.3: Bäume/Vegetation vorhanden
- Status: ✅/❌
- Anzahl: ___

PRÜFPUNKT C4.2.4: Verkehrsschilder vorhanden
- Status: ✅/❌
- Anzahl: ___

---

# SEKTION D: SPIELER-TESTS

## D1: SPIELER-MODELL

### 🔴 TEST D1.1: Spieler-Existenz [KRITISCH]

PRÜFPUNKT D1.1.1: Spieler-Charakter ist sichtbar
- In Third-Person: Charakter sichtbar ✅/❌
- In First-Person: Hände/Waffe sichtbar ✅/❌

PRÜFPUNKT D1.1.2: Spieler hat menschliche Form
- Kopf erkennbar: ✅/❌
- Körper erkennbar: ✅/❌
- Arme erkennbar: ✅/❌
- Beine erkennbar: ✅/❌

---

### TEST D1.2: Spieler-Aussehen

PRÜFPUNKT D1.2.1: Spieler hat Texturen
- Nicht einfarbig: ✅/❌

PRÜFPUNKT D1.2.2: Spieler trägt Polizei-Uniform
- Uniform erkennbar: ✅/❌

PRÜFPUNKT D1.2.3: Spieler hat Ausrüstung
- Gürtel sichtbar: ✅/❌
- Sonstige Ausrüstung: ___

---

## D2: SPIELER-BEWEGUNG

### 🔴 TEST D2.1: WASD-Bewegung [KRITISCH]

SCHRITT FÜR SCHRITT durchführen:

**TEST D2.1.1: W-Taste (Vorwärts)**
- Drücke W für 3 Sekunden
- Merke Startposition (X: ___, Z: ___)
- Merke Endposition (X: ___, Z: ___)
- Spieler hat sich bewegt: ✅/❌
- Richtung war vorwärts: ✅/❌

**TEST D2.1.2: S-Taste (Rückwärts)**
- Drücke S für 3 Sekunden
- Spieler bewegt sich rückwärts: ✅/❌

**TEST D2.1.3: A-Taste (Links)**
- Drücke A für 3 Sekunden
- Spieler bewegt sich links: ✅/❌

**TEST D2.1.4: D-Taste (Rechts)**
- Drücke D für 3 Sekunden
- Spieler bewegt sich rechts: ✅/❌

**TEST D2.1.5: Diagonale Bewegung**
- Drücke W+D gleichzeitig
- Spieler bewegt sich diagonal: ✅/❌

GESAMT D2.1: ___ von 5 bestanden

WENN irgendein Test FEHLGESCHLAGEN:
- Öffne PlayerController.tsx
- Prüfe den Input-Handler
- Prüfe die Bewegungslogik
- FIX und wiederhole

---

### 🔴 TEST D2.2: Sprint [KRITISCH]

PRÜFPUNKT D2.2.1: Sprint-Taste funktioniert
- Drücke W + SHIFT
- Spieler bewegt sich schneller als normal: ✅/❌

PRÜFPUNKT D2.2.2: Sprint-Geschwindigkeit messbar höher
- Normale Geschwindigkeit (geschätzt): ___ m/s
- Sprint-Geschwindigkeit (geschätzt): ___ m/s
- Unterschied erkennbar: ✅/❌

---

### TEST D2.3: Springen

PRÜFPUNKT D2.3.1: Sprungtaste funktioniert
- Drücke LEERTASTE
- Spieler springt: ✅/❌

PRÜFPUNKT D2.3.2: Spieler landet wieder
- Nach Sprung auf Boden: ✅/❌

PRÜFPUNKT D2.3.3: Sprunghöhe angemessen
- Geschätzte Höhe: ___ Meter
- Realistisch (0.5-1.5m): ✅/❌

---

## D3: KAMERA-TESTS

### 🔴 TEST D3.1: Kamera-Rotation [KRITISCH]

PRÜFPUNKT D3.1.1: Maus-Bewegung links
- Bewege Maus nach links
- Kamera/Blickrichtung dreht nach links: ✅/❌

PRÜFPUNKT D3.1.2: Maus-Bewegung rechts
- Bewege Maus nach rechts
- Kamera/Blickrichtung dreht nach rechts: ✅/❌

PRÜFPUNKT D3.1.3: Maus-Bewegung hoch
- Bewege Maus nach oben
- Kamera schaut nach oben: ✅/❌

PRÜFPUNKT D3.1.4: Maus-Bewegung runter
- Bewege Maus nach unten
- Kamera schaut nach unten: ✅/❌

PRÜFPUNKT D3.1.5: Kamera-Begrenzung vertikal
- Kann nicht durch eigene Füße schauen: ✅/❌
- Kann nicht hinter eigenen Rücken schauen: ✅/❌

---

### TEST D3.2: Kamera-Modus

PRÜFPUNKT D3.2.1: Third-Person Kamera
- Kamera ist hinter Spieler: ✅/❌

PRÜFPUNKT D3.2.2: Kamera folgt Spieler
- Bewege Spieler, Kamera folgt: ✅/❌

PRÜFPUNKT D3.2.3: Kamera-Kollision mit Wänden
- Gehe rückwärts gegen Wand
- Kamera geht nicht durch Wand: ✅/❌

---

## D4: SPIELER-ANIMATION

### TEST D4.1: Idle-Animation

Stehe still für 10 Sekunden.

PRÜFPUNKT D4.1.1: Spieler steht nicht komplett starr
- Leichte Bewegung (Atmen, Schwanken): ✅/❌

PRÜFPUNKT D4.1.2: Animation ist geloopt
- Kein Ruckeln oder Springen: ✅/❌

---

### TEST D4.2: Geh-Animation

Drücke W zum langsamen Gehen.

PRÜFPUNKT D4.2.1: Geh-Animation wird abgespielt
- Beine bewegen sich: ✅/❌

PRÜFPUNKT D4.2.2: Füße berühren Boden
- Kein Schweben über Boden: ✅/❌

PRÜFPUNKT D4.2.3: Animation synchron mit Bewegung
- Füße rutschen nicht: ✅/❌

---

### TEST D4.3: Lauf-Animation

Drücke W + SHIFT zum Sprinten.

PRÜFPUNKT D4.3.1: Lauf-Animation unterscheidet sich von Gehen
- Schnellere Beinbewegung: ✅/❌

PRÜFPUNKT D4.3.2: Arme bewegen sich beim Laufen
- Arm-Schwingen sichtbar: ✅/❌

---

## D5: SPIELER-KOLLISION

### 🔴 TEST D5.1: Wand-Kollision [KRITISCH]

PRÜFPUNKT D5.1.1: Spieler kann nicht durch Gebäude laufen
- Laufe gegen Wand: Gestoppt ✅/❌

PRÜFPUNKT D5.1.2: Spieler kann nicht durch Objekte laufen
- Laufe gegen Laterne: Gestoppt ✅/❌

---

### 🔴 TEST D5.2: Boden-Kollision [KRITISCH]

PRÜFPUNKT D5.2.1: Spieler fällt nicht durch Boden
- Stehe auf Boden: Stabil ✅/❌

PRÜFPUNKT D5.2.2: Spieler kann Stufen/Rampen hochlaufen
- Finde Stufe oder Rampe
- Erfolgreich hochgelaufen: ✅/❌

---

# SEKTION E: NPC-TESTS

## E1: NPC-EXISTENZ

### 🔴 TEST E1.1: NPCs vorhanden [KRITISCH]

PRÜFPUNKT E1.1.1: Mindestens ein NPC sichtbar
- Status: ✅/❌

PRÜFPUNKT E1.1.2: Anzahl sichtbarer NPCs
- Gezählte Anzahl: ___
- Erwartung: Mindestens 10
- Status: ✅/❌

WENN keine NPCs:
- Prüfe NPCManager.tsx
- Prüfe ob NPCs gespawnt werden
- Prüfe ob Spawn-Positionen korrekt sind

---

## E2: NPC-MODELL-TESTS

### TEST E2.1: NPC-Aussehen

Wähle einen NPC und beobachte ihn genau:

PRÜFPUNKT E2.1.1: NPC hat menschliche Form
- Kopf: ✅/❌
- Körper: ✅/❌
- Arme: ✅/❌
- Beine: ✅/❌

PRÜFPUNKT E2.1.2: NPC hat Texturen
- Nicht einfarbig grau/weiß: ✅/❌

PRÜFPUNKT E2.1.3: NPC hat Kleidung
- Kleidung erkennbar: ✅/❌
- Art der Kleidung: ___

---

### TEST E2.2: NPC-Vielfalt

Beobachte 5 verschiedene NPCs:

PRÜFPUNKT E2.2.1: NPCs sehen unterschiedlich aus
- Verschiedene Kleidung: ✅/❌
- Verschiedene Körpergrößen: ✅/❌
- Verschiedene Hautfarben: ✅/❌

---

## E3: NPC-BEWEGUNG

### 🔴 TEST E3.1: NPC-Bewegung [KRITISCH]

Beobachte einen NPC für 30 Sekunden:

PRÜFPUNKT E3.1.1: NPC bewegt sich
- Irgendeine Bewegung: ✅/❌

PRÜFPUNKT E3.1.2: Bewegung ist nicht zufälliges Zittern
- Zielgerichtete Bewegung: ✅/❌

PRÜFPUNKT E3.1.3: NPC läuft nicht durch Wände
- Umgeht Hindernisse: ✅/❌

---

### TEST E3.2: NPC-Animation

PRÜFPUNKT E3.2.1: Stehende NPCs haben Idle-Animation
- Leichte Bewegung bei still stehenden NPCs: ✅/❌

PRÜFPUNKT E3.2.2: Gehende NPCs haben Geh-Animation
- Beine bewegen sich beim Gehen: ✅/❌

PRÜFPUNKT E3.2.3: NPCs schweben nicht
- Füße berühren Boden: ✅/❌

---

## E4: NPC-TYPEN

### TEST E4.1: Demonstranten

PRÜFPUNKT E4.1.1: Demonstranten-NPCs vorhanden
- Erkennbar an Schildern/Banner: ✅/❌
- Anzahl: ___

PRÜFPUNKT E4.1.2: Demonstranten haben Schilder
- Schilder sichtbar: ✅/❌
- Text auf Schildern: ✅/❌

---

### TEST E4.2: Polizei-NPCs

PRÜFPUNKT E4.2.1: Polizei-NPCs vorhanden
- Erkennbar an Uniform: ✅/❌
- Anzahl: ___

PRÜFPUNKT E4.2.2: Polizei trägt Ausrüstung
- Helm sichtbar: ✅/❌
- Schild sichtbar (falls Bereitschaft): ✅/❌

---

### TEST E4.3: Zivilisten

PRÜFPUNKT E4.3.1: Zivilisten-NPCs vorhanden
- Normale Kleidung ohne Schilder: ✅/❌
- Anzahl: ___

---

## E5: NPC-VERHALTEN

### TEST E5.1: Crowd-Verhalten

PRÜFPUNKT E5.1.1: NPCs halten Abstand zueinander
- Mindestabstand ca. 0.5-1m: ✅/❌

PRÜFPUNKT E5.1.2: NPCs laufen nicht ineinander
- Keine Überlappung: ✅/❌

PRÜFPUNKT E5.1.3: Gruppen bewegen sich zusammen
- Koordinierte Bewegung: ✅/❌

---

### TEST E5.2: NPC-Reaktion auf Spieler

Laufe direkt auf einen NPC zu:

PRÜFPUNKT E5.2.1: NPC reagiert auf Spieler-Nähe
- Weicht aus oder bleibt stehen: ✅/❌

PRÜFPUNKT E5.2.2: Kollision mit NPC
- Spieler und NPC überlappen nicht: ✅/❌

---

# SEKTION F: UI/HUD-TESTS

## F1: ZEIT-ANZEIGE

### 🔴 TEST F1.1: Uhr sichtbar [KRITISCH]

PRÜFPUNKT F1.1.1: Zeit-Anzeige ist sichtbar
- Auf Bildschirm erkennbar: ✅/❌

PRÜFPUNKT F1.1.2: Position korrekt
- Rechts oben oder links oben: ✅/❌
- Genaue Position: ___

PRÜFPUNKT F1.1.3: Format korrekt
- Zeigt HH:MM oder HH:MM:SS: ✅/❌
- Angezeigte Zeit: ___

---

### TEST F1.2: Zeit-Fortschritt

Notiere aktuelle Zeit: ___

Warte exakt 60 Sekunden Realzeit.

Notiere neue Zeit: ___

PRÜFPUNKT F1.2.1: Zeit ist fortgeschritten
- Status: ✅/❌

PRÜFPUNKT F1.2.2: Zeit-Fortschritt korrekt
- Differenz in Spielminuten: ___
- Erwartung: ~60 Spielminuten
- Abweichung akzeptabel (±5): ✅/❌

---

## F2: GESUNDHEITS-ANZEIGE

### TEST F2.1: Health-Bar

PRÜFPUNKT F2.1.1: Health-Bar sichtbar
- Status: ✅/❌

PRÜFPUNKT F2.1.2: Health-Bar zeigt Wert
- Prozentualer Wert oder Balken: ✅/❌
- Aktueller Wert: ___

---

## F3: STAMINA-ANZEIGE

### TEST F3.1: Stamina-Bar

PRÜFPUNKT F3.1.1: Stamina-Bar sichtbar
- Status: ✅/❌

PRÜFPUNKT F3.1.2: Stamina sinkt beim Sprinten
- Sprinte 5 Sekunden
- Stamina ist gesunken: ✅/❌

PRÜFPUNKT F3.1.3: Stamina regeneriert
- Stehe still 5 Sekunden
- Stamina ist gestiegen: ✅/❌

---

## F4: ESKALATIONS-ANZEIGE

### TEST F4.1: Eskalations-Meter

PRÜFPUNKT F4.1.1: Eskalations-Anzeige sichtbar
- Status: ✅/❌

PRÜFPUNKT F4.1.2: Zeigt Wert 0-100
- Aktueller Wert: ___
- Im gültigen Bereich: ✅/❌

---

## F5: PAUSE-MENÜ

### TEST F5.1: Pause-Funktion

Drücke ESC.

PRÜFPUNKT F5.1.1: Pause-Menü erscheint
- Status: ✅/❌

PRÜFPUNKT F5.1.2: Spiel ist pausiert
- Keine Bewegung in der Szene: ✅/❌

Drücke ESC erneut.

PRÜFPUNKT F5.1.3: Pause-Menü schließt
- Status: ✅/❌

PRÜFPUNKT F5.1.4: Spiel läuft weiter
- Bewegung wieder möglich: ✅/❌

---

# SEKTION G: PHYSIK-TESTS

## G1: SCHWERKRAFT

### 🔴 TEST G1.1: Fallphysik [KRITISCH]

Springe in die Luft.

PRÜFPUNKT G1.1.1: Spieler fällt nach unten
- Status: ✅/❌

PRÜFPUNKT G1.1.2: Fallgeschwindigkeit realistisch
- Nicht zu schnell (Sofort am Boden): ✅/❌
- Nicht zu langsam (Schweben): ✅/❌

PRÜFPUNKT G1.1.3: Spieler landet auf Boden
- Status: ✅/❌

---

## G2: KOLLISIONEN

### 🔴 TEST G2.1: Statische Kollisionen [KRITISCH]

PRÜFPUNKT G2.1.1: Kollision mit Wand funktioniert
- Spieler wird gestoppt: ✅/❌

PRÜFPUNKT G2.1.2: Kollision mit Boden funktioniert
- Spieler fällt nicht durch: ✅/❌

PRÜFPUNKT G2.1.3: Kollision mit Objekten funktioniert
- Laterne/Mülleimer stoppt Spieler: ✅/❌

---

### TEST G2.2: Dynamische Kollisionen

PRÜFPUNKT G2.2.1: Kollision mit NPC
- Spieler kollidiert mit NPC: ✅/❌

---

# SEKTION H: AUDIO-TESTS

## H1: AUDIO-AUSGABE

### TEST H1.1: Sound vorhanden

Stelle sicher dass Lautsprecher an sind.

PRÜFPUNKT H1.1.1: Irgendein Sound hörbar
- Status: ✅/❌

---

## H2: SOUND-KATEGORIEN

### TEST H2.1: Umgebungs-Sounds

PRÜFPUNKT H2.1.1: Hintergrundgeräusche hörbar
- Stadt-Ambience, Wind, etc.: ✅/❌

---

### TEST H2.2: Spieler-Sounds

Bewege den Spieler.

PRÜFPUNKT H2.2.1: Schrittgeräusche hörbar
- Status: ✅/❌

PRÜFPUNKT H2.2.2: Schritte synchron mit Bewegung
- Status: ✅/❌

---

### TEST H2.3: 3D-Audio

Gehe zu einer Soundquelle (NPC, Fahrzeug, etc.).

PRÜFPUNKT H2.3.1: Sound wird lauter bei Näherung
- Status: ✅/❌

PRÜFPUNKT H2.3.2: Sound hat Richtung
- Kommt von korrekter Seite: ✅/❌

---

# SEKTION I: POLYGON-TESTS

## 🔴 I1: POLYGON-ZÄHLUNG [KRITISCH]

Diese Tests sind KRITISCH für die AAA-Qualität.

### TEST I1.1: Debug-Info aktivieren

Suche nach einer Möglichkeit, Polygon-Zahlen anzuzeigen:
- Stats.js Panel
- Debug-UI
- Browser-Extension (Three.js Inspector)
- Console-Befehl

Methode gefunden: ___

---

### 🔴 TEST I1.2: Spieler-Polygon-Zählung [KRITISCH]

PRÜFPUNKT I1.2.1: Spieler-Modell Polygon-Anzahl
- Gemessene Anzahl: ___ Polygone
- Minimum-Erwartung: 35.000
- Status: ✅ (≥35.000) / ❌ (<35.000)

WENN UNTER 35.000:
- Das Spieler-Modell muss ersetzt werden!
- Aktuelles Modell ist LOW-POLY und nicht AAA-Qualität!

---

### 🔴 TEST I1.3: NPC-Polygon-Zählung [KRITISCH]

Wähle einen NPC in der Nähe (LOD 0).

PRÜFPUNKT I1.3.1: NPC-Modell Polygon-Anzahl
- Gemessene Anzahl: ___ Polygone
- Minimum-Erwartung: 35.000 (LOD 0)
- Status: ✅ (≥35.000) / ❌ (<35.000)

---

### TEST I1.4: Gebäude-Polygon-Zählung

PRÜFPUNKT I1.4.1: Gebäude Polygon-Anzahl
- Gemessene Anzahl: ___ Polygone
- Minimum-Erwartung: 50.000
- Status: ✅ (≥50.000) / ❌ (<50.000)

---

### TEST I1.5: LOD-System Validierung

Gehe nah an einen NPC (unter 10 Meter).
- Polygon-Anzahl nahe: ___

Gehe weit weg (über 100 Meter).
- Polygon-Anzahl fern: ___

PRÜFPUNKT I1.5.1: Polygon-Anzahl sinkt mit Distanz
- Unterschied erkennbar: ✅/❌
- Reduktions-Faktor: ___x

---

# SEKTION J: PERFORMANCE-TESTS

## J1: FPS UNTER VERSCHIEDENEN BEDINGUNGEN

### TEST J1.1: Basis-Performance

NPC-Anzahl: 10 oder minimum

MESSUNG:
- FPS: ___
- Frame-Time: ___ ms
- Draw Calls: ___

ERWARTUNG: 60 FPS

Status: ✅ (≥60) / ❌ (<60)

---

### TEST J1.2: Mittlere Last

NPC-Anzahl: 100

MESSUNG:
- FPS: ___
- Frame-Time: ___ ms
- Draw Calls: ___

ERWARTUNG: 45 FPS

Status: ✅ (≥45) / ❌ (<45)

---

### TEST J1.3: Hohe Last

NPC-Anzahl: 300

MESSUNG:
- FPS: ___
- Frame-Time: ___ ms
- Draw Calls: ___

ERWARTUNG: 30 FPS

Status: ✅ (≥30) / ❌ (<30)

---

### TEST J1.4: Maximale Last

NPC-Anzahl: 500

MESSUNG:
- FPS: ___
- Frame-Time: ___ ms
- Draw Calls: ___

ERWARTUNG: 20 FPS (spielbar)

Status: ✅ (≥20) / ❌ (<20)

---

## J2: SPEICHER-TESTS

### TEST J2.1: Memory Usage

Öffne Task-Manager oder DevTools Memory.

PRÜFPUNKT J2.1.1: Initialer Speicherverbrauch
- Wert: ___ MB
- Erwartung: unter 500 MB
- Status: ✅/❌

Spiele 5 Minuten.

PRÜFPUNKT J2.1.2: Speicherverbrauch nach 5 Minuten
- Wert: ___ MB
- Erwartung: unter 1500 MB
- Status: ✅/❌

PRÜFPUNKT J2.1.3: Memory Leak Check
- Differenz: ___ MB
- Wachstum pro Minute: ___ MB
- Erwartung: unter 20 MB/min
- Status: ✅/❌

---

## J3: DRAW CALL TESTS

### TEST J3.1: Draw Call Zählung

Öffne DevTools oder Debug-Panel.

PRÜFPUNKT J3.1.1: Draw Calls bei normaler Szene
- Gemessene Anzahl: ___
- Erwartung: unter 500
- Status: ✅/❌

---

# SEKTION K: ERROR-TESTS

## 🔴 K1: KONSOLEN-FEHLER [KRITISCH]

### 🔴 TEST K1.1: Keine roten Fehler [KRITISCH]

Öffne Browser-Konsole (F12 → Console).

Lade das Spiel neu.

Spiele 2 Minuten.

PRÜFPUNKT K1.1.1: Anzahl roter Fehler (Errors)
- Gezählte Anzahl: ___
- Erwartung: 0
- Status: ✅ (0) / ❌ (>0)

WENN FEHLER VORHANDEN:

Liste JEDEN Fehler auf und behebe ihn:

FEHLER 1:
```
[Kopiere komplette Fehlermeldung]
```
- Datei: ___
- Zeile: ___
- Ursache: ___
- Fix: ___
- Nach Fix behoben: ✅/❌

FEHLER 2:
```
[Kopiere komplette Fehlermeldung]
```
- Datei: ___
- Zeile: ___
- Ursache: ___
- Fix: ___
- Nach Fix behoben: ✅/❌

(Wiederhole für JEDEN Fehler)

---

### TEST K1.2: Warnungen prüfen

PRÜFPUNKT K1.2.1: Anzahl gelber Warnungen
- Gezählte Anzahl: ___
- Kritische Warnungen: ___

---

# SEKTION L: STAATSFEIND-MISSION TESTS

(Nur ausführen wenn Mission implementiert)

## L1: MISSION-EXISTENZ

### TEST L1.1: Mission verfügbar

PRÜFPUNKT L1.1.1: Mission kann gestartet werden
- Status: ✅/❌/NICHT IMPLEMENTIERT

---

## L2: WOLF-NPC

### TEST L2.1: Wolf existiert

PRÜFPUNKT L2.1.1: Wolf-NPC in Szene vorhanden
- Gefunden: ✅/❌

PRÜFPUNKT L2.1.2: Wolf hat korrektes Aussehen
- Schwarze Jacke: ✅/❌
- Kampfstiefel: ✅/❌
- Cap: ✅/❌

---

## L3: KOMPLIZEN

### TEST L3.1: Komplizen existieren

PRÜFPUNKT L3.1.1: Schakal vorhanden (hinter Wolf)
- Status: ✅/❌

PRÜFPUNKT L3.1.2: Specht vorhanden (vor Wolf)
- Status: ✅/❌

PRÜFPUNKT L3.1.3: Hyäne vorhanden (variabel)
- Status: ✅/❌

---

## L4: BOSS-FIGHT

### TEST L4.1: Boss-Fight funktioniert

PRÜFPUNKT L4.1.1: Boss-Fight startet
- Status: ✅/❌

PRÜFPUNKT L4.1.2: Wolf hat 300 HP
- Status: ✅/❌

PRÜFPUNKT L4.1.3: Phase 1 funktioniert (100-66% HP)
- Status: ✅/❌

PRÜFPUNKT L4.1.4: Phase 2 funktioniert (66-33% HP)
- Status: ✅/❌

PRÜFPUNKT L4.1.5: Phase 3 funktioniert (33-0% HP)
- Status: ✅/❌

---

# FINALE ZUSAMMENFASSUNG

## ERGEBNIS-TABELLE

Fülle diese Tabelle VOLLSTÄNDIG aus:

| Sektion | Kategorie | Tests | Bestanden | Fehlgeschlagen | Quote |
|---------|-----------|-------|-----------|----------------|-------|
| A | Projekt-Fundament | 40 | ___ | ___ | ___% |
| B | Rendering | 25 | ___ | ___ | ___% |
| C | 3D-Welt | 30 | ___ | ___ | ___% |
| D | Spieler | 35 | ___ | ___ | ___% |
| E | NPCs | 25 | ___ | ___ | ___% |
| F | UI/HUD | 15 | ___ | ___ | ___% |
| G | Physik | 10 | ___ | ___ | ___% |
| H | Audio | 10 | ___ | ___ | ___% |
| I | Polygone | 10 | ___ | ___ | ___% |
| J | Performance | 15 | ___ | ___ | ___% |
| K | Errors | 5 | ___ | ___ | ___% |
| L | Mission | 10 | ___ | ___ | ___% |
| **TOTAL** | | **230** | ___ | ___ | **____%** |

---

## KRITISCHE TESTS ZUSAMMENFASSUNG

Alle mit 🔴 markierten Tests MÜSSEN bestanden sein:

| Test-ID | Beschreibung | Status |
|---------|--------------|--------|
| A1.1 | Package.json existiert | ✅/❌ |
| A1.2 | Package.json Inhalt | ✅/❌ |
| A1.3 | TypeScript Konfiguration | ✅/❌ |
| A2.1 | Source-Ordner | ✅/❌ |
| A2.4 | Keine verbotenen Dateien | ✅/❌ |
| A3.1 | NPM Install | ✅/❌ |
| A4.1 | TypeScript Kompilierung | ✅/❌ |
| A5.1 | Dev Server Start | ✅/❌ |
| B1.1 | Canvas-Element | ✅/❌ |
| B1.2 | Kein Frozen Screen | ✅/❌ |
| B2.1 | Basis-FPS | ✅/❌ |
| C1.1 | Boden | ✅/❌ |
| D1.1 | Spieler-Existenz | ✅/❌ |
| D2.1 | WASD-Bewegung | ✅/❌ |
| D2.2 | Sprint | ✅/❌ |
| D3.1 | Kamera-Rotation | ✅/❌ |
| D5.1 | Wand-Kollision | ✅/❌ |
| D5.2 | Boden-Kollision | ✅/❌ |
| E1.1 | NPCs vorhanden | ✅/❌ |
| E3.1 | NPC-Bewegung | ✅/❌ |
| F1.1 | Uhr sichtbar | ✅/❌ |
| G1.1 | Fallphysik | ✅/❌ |
| G2.1 | Statische Kollisionen | ✅/❌ |
| I1.2 | Spieler-Polygone ≥35K | ✅/❌ |
| I1.3 | NPC-Polygone ≥35K | ✅/❌ |
| K1.1 | Keine Console-Errors | ✅/❌ |

**KRITISCHE TESTS BESTANDEN:** ___ von 26

**WENN NICHT ALLE 26 BESTANDEN: PROJEKT IST NICHT AKZEPTABEL!**

---

## FINALE ENTSCHEIDUNG

Gesamt-Quote: ____%

Kritische Tests: ___ / 26

**PROJEKT-STATUS:**

☐ **AKZEPTIERT** (≥98% Quote UND alle kritischen Tests bestanden)

☐ **ABGELEHNT** (<98% Quote ODER kritische Tests fehlgeschlagen)

---

## BEI ABLEHNUNG

Liste JEDEN fehlgeschlagenen Test:

1. Test-ID: ___ - Grund: ___
2. Test-ID: ___ - Grund: ___
3. Test-ID: ___ - Grund: ___

Behebe JEDEN fehlgeschlagenen Test und führe ALLE Tests erneut durch.

**DU BIST NICHT FERTIG BIS DAS PROJEKT AKZEPTIERT IST.**
