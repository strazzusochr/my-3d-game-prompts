# 🚨 KRITISCHER NOTFALL-PROMPT: GRAFIK IST KOMPLETT FALSCH

## ⛔ STOPP - LIES DAS SOFORT

**DIE AKTUELLE GRAFIK IST INAKZEPTABEL!**

Was du gebaut hast:
- Primitive Zylinder als "Menschen" (ca. 50 Polygone)
- Einfarbige Flächen ohne Texturen
- Ein blaues Rechteck als "Gebäude"
- Keine Details, keine Umgebung, keine Atmosphäre

Was gefordert war:
- 35.000+ Polygone pro Charakter
- 8K PBR-Texturen
- Detaillierte Wiener Architektur
- Hunderte Umgebungs-Objekte

**DAS IST EIN TOTALES VERSAGEN. DU MUSST DAS KOMPLETT NEU MACHEN.**

---

# TEIL 1: SOFORT-MASSNAHMEN

## 1.1 LÖSCHE ALLE PRIMITIVEN PLACEHOLDER

Suche und LÖSCHE jeden Code der so aussieht:

```
// LÖSCHEN - Das sind primitive Placeholder:
<mesh>
  <cylinderGeometry args={[0.5, 0.5, 2]} />
  <meshStandardMaterial color="green" />
</mesh>

<mesh>
  <boxGeometry args={[10, 5, 10]} />
  <meshStandardMaterial color="blue" />
</mesh>

<mesh>
  <capsuleGeometry args={[0.3, 1.5]} />
  <meshBasicMaterial color="red" />
</mesh>
```

**ALLES was cylinderGeometry, boxGeometry, capsuleGeometry für NPCs oder Gebäude verwendet = LÖSCHEN**

---

## 1.2 WARUM DAS PASSIERT IST

Du hast die Spezifikationen ignoriert und stattdessen:
1. Einfache Three.js Primitiven verwendet
2. Keine echten 3D-Modelle erstellt
3. Keine Texturen geladen
4. Die Polygon-Anforderungen komplett missachtet

**Das ist nicht AAA-Qualität. Das ist nicht mal Mobile-Game-Qualität. Das ist Prototype-Müll.**

---

# TEIL 2: KORREKTE CHARAKTER-IMPLEMENTIERUNG

## 2.1 MENSCH-ANATOMIE IN POLYGONEN

Ein realistischer Mensch mit 35.000+ Polygonen besteht aus:

### KOPF (8.000-10.000 Polygone)
- Schädelform: Nicht eine Kugel, sondern anatomisch korrekt mit Stirn, Wangenknochen, Kiefer
- Augen: Jedes Auge hat Augapfel (Kugel mit 500 Polygone), Iris-Detail, Pupille, Lid-Geometrie (oberes und unteres Lid separat modelliert)
- Nase: Nasenbein, Nasenflügel, Nasenlöcher (nicht ein Dreieck, sondern 800+ Polygone)
- Mund: Lippen mit Volumen (Ober- und Unterlippe separat), Mundwinkel, Zähne-Geometrie hinter den Lippen
- Ohren: Vollständig modelliert mit Ohrmuschel, Ohrläppchen, inneren Details (600+ Polygone pro Ohr)
- Haare: Entweder Mesh-basiert (tausende kleine Polygone die Strähnen formen) oder Hair-Cards (planare Geometrie mit Alpha-Textur)

### TORSO (10.000-12.000 Polygone)
- Brustkorb: Nicht ein Zylinder! Anatomische Form mit Rippen-Andeutung
- Schultern: Kugelgelenk-Form, Deltoid-Muskel-Definition
- Rücken: Schulterblätter-Definition, Wirbelsäulen-Verlauf
- Bauch: Core-Muskulatur angedeutet, natürliche Rundung
- Becken: Hüftknochen-Definition

### ARME (4.000 Polygone pro Arm, 8.000 total)
- Oberarm: Bizeps/Trizeps-Definition, nicht ein einfacher Zylinder
- Ellbogen: Gelenk-Detail mit Knöchel
- Unterarm: Verjüngung zum Handgelenk, Muskel-Definition
- Handgelenk: Knöchel sichtbar

### HÄNDE (2.000 Polygone pro Hand, 4.000 total)
- Handfläche: Nicht flach! Anatomisch gewölbt
- Finger: JEDER Finger hat 3 Glieder (außer Daumen mit 2)
- Jedes Fingerglied ist ein separates Segment mit Gelenk
- Fingernägel: Kleine planare Geometrie auf jedem Finger
- Daumen: Eigene Position, eigene Rotation
- Knöchel: Sichtbar auf Handrücken

### BEINE (5.000 Polygone pro Bein, 10.000 total)
- Oberschenkel: Quadrizeps-Definition, Verjüngung zum Knie
- Knie: Kniescheibe-Geometrie
- Unterschenkel: Wadenmuskel-Definition
- Knöchel: Sichtbare Knöchel-Knochen

### FÜSSE (1.500 Polygone pro Fuß, 3.000 total)
- Fußform: Anatomisch korrekt, nicht ein Quader
- Zehen: Alle 5 Zehen modelliert (vereinfacht aber erkennbar)
- Ferse: Gerundete Form
- Fußgewölbe: Innenseite höher als Außenseite

---

## 2.2 KLEIDUNG FÜR DEMONSTRANTEN (zusätzlich 5.000-10.000 Polygone)

### T-SHIRT / HOODIE
- Nicht flach am Körper! Stoff hat Dicke (0.5-1cm)
- Falten an Achseln, Ellbogen, Taille
- Kragen-Detail: Rundkragen oder V-Ausschnitt mit Dicke
- Saum: Sichtbarer Abschluss unten
- Bei Hoodie: Kapuze als separates Geometrie-Element mit Innenfutter

### HOSE / JEANS
- Bundhöhe: Hose beginnt an natürlicher Taille
- Taschen: Eingesetzte Taschen mit sichtbarer Naht-Linie
- Knie-Bereich: Extra Polygone für Faltenwurf
- Hosenbein-Ende: Umschlag oder glatter Abschluss

### SCHUHE
- Sohle: Mehrschichtig (Laufsohle, Zwischensohle, Einlegesohle)
- Obermaterial: Textur-abhängig (Leder, Stoff, Synthetik)
- Schnürung: Entweder modelliert oder Textur
- Fersenkappe: Verstärkung sichtbar

### ACCESSOIRES FÜR DEMONSTRANTEN
- Rucksack: 2.000 Polygone (Tasche mit Riemen, Reißverschlüssen, Seitentaschen)
- Schild/Banner: 500 Polygone (Planar mit Stange)
- Cap/Mütze: 800 Polygone
- Schal/Tuch: 600 Polygone (für Maskierung)
- Sonnenbrille: 400 Polygone
- Handy in der Hand: 200 Polygone

---

## 2.3 POLIZEI-AUSRÜSTUNG (zusätzlich 8.000-15.000 Polygone)

### TAKTISCHER HELM (3.000 Polygone)
- Helm-Schale: Nicht eine Halbkugel! Taktische Form mit Kanten
- Visier: Transparentes Material, beweglich (hoch/runter)
- Kinnriemen: Modelliert mit Schnalle
- Polsterung innen: Sichtbar am Rand
- Nackenschutz: Verlängerung nach hinten

### SCHUTZWESTE (4.000 Polygone)
- Platten-Träger: MOLLE-System (Schlaufen-Reihen für Ausrüstung)
- Vorderseite: Magazintaschen, Funkgerät-Halterung
- Rückseite: Erste-Hilfe-Tasche, Handschellen-Halterung
- Schulterschutz: Gepanzerte Schulterklappen
- Seitenschutz: Seitenplatten-Taschen
- Beschriftung: "POLIZEI" als Relief oder Aufnäher-Geometrie

### SCHILD (2.500 Polygone)
- Schild-Körper: Leicht gebogen (nicht flach!)
- Sichtfenster: Transparenter Bereich oben
- Griffe: Zwei Griffe auf Rückseite
- Arm-Schlaufe: Schlaufe für Unterarm
- Verstärkungen: Rand-Verstärkung

### SCHLAGSTOCK (800 Polygone)
- Griff: Geriffelt für Grip
- Schaft: Nicht perfekt zylindrisch
- Spitze: Leicht verdickt
- Handschlaufe: Band am Griff

### SONSTIGE AUSRÜSTUNG
- Funkgerät: 400 Polygone (mit Antenne)
- Pfefferspray: 200 Polygone
- Handschellen: 300 Polygone
- Taschenlampe: 250 Polygone
- Kamera/Bodycam: 350 Polygone

---

## 2.4 IMPLEMENTIERUNG MIT REACT THREE FIBER

### METHODE 1: Prozedurale Erstellung (wenn keine GLB-Dateien)

Da du keine externen 3D-Modelle hast, musst du die Geometrie PROZEDURAL erstellen. Das bedeutet: Kombiniere VIELE einfache Formen zu komplexen Modellen.

#### Beispiel: KOPF (vereinfacht aber besser als Kugel)

Der Kopf besteht aus mehreren Mesh-Gruppen:

Schädel-Basis: Eine modifizierte Kugel, die in Y-Richtung gestreckt ist (Faktor 1.2), in Z-Richtung gestaucht (Faktor 0.9). Segmente: 32 horizontal, 24 vertikal. Das ergibt etwa 1.500 Polygone nur für die Grundform.

Kiefer-Region: Eine weitere Geometrie die von unten an den Schädel anschließt. Breiter als hoch, Trapez-Form von vorne gesehen.

Augen-Höhlen: Zwei Vertiefungen die durch Morph-Targets oder separate Geometrie eingedrückt werden.

Nase: Kombiniere einen vertikalen Quader (Nasenrücken) mit einer Kugel-Hälfte (Nasenspitze) und zwei kleinen Kugeln (Nasenflügel).

Ohren: Torus-Segmente kombiniert mit flachen Scheiben.

#### Beispiel: TORSO

Hauptkörper: Nicht ein Zylinder! Verwende eine modifizierte Kapsel die:
- Oben breiter ist (Schulterbreite)
- In der Mitte schmaler (Taille)
- Unten wieder breiter (Hüfte)

Dies erreichst du durch:
- Erstelle Querschnitte auf verschiedenen Höhen
- Verbinde die Querschnitte mit Polygonen
- Jeder Querschnitt hat 32-64 Vertices

#### Beispiel: HAND

Eine Hand besteht aus:
- Handfläche: Abgeflachter Quader mit gerundeten Kanten
- 5 Finger: Jeder Finger ist eine Kette von 3 Zylindern (unterschiedliche Durchmesser)
- Gelenke zwischen Zylindern
- Daumen: Andere Ausrichtung, nur 2 Glieder

### METHODE 2: GLB/GLTF Import (BEVORZUGT)

Wenn du Zugang zu 3D-Modellen hast:

Lade die Modelle mit useGLTF von @react-three/drei.

Jedes Modell sollte:
- Im GLB oder GLTF Format sein
- Bereits UV-unwrapped für Texturen
- Armature/Skeleton für Animation haben
- LOD-Versionen (hochauflösend und niedrigauflösend)

Platziere die Modelle im public/models/ Ordner:
- public/models/demonstrator_male_01.glb
- public/models/demonstrator_female_01.glb
- public/models/police_officer_riot.glb
- public/models/police_officer_standard.glb

---

# TEIL 3: GEBÄUDE-IMPLEMENTIERUNG

## 3.1 WIENER ARCHITEKTUR-ELEMENTE

### GRÜNDERZEIT-HAUS (60.000-80.000 Polygone)

Ein typisches Wiener Wohnhaus hat:

Erdgeschoss (Sockelzone):
- Höhe: 4-5 Meter
- Rustika-Fassade (Quaderstein-Optik, jeder "Stein" ist Geometrie)
- Eingangsportal: Bogen mit Schlussstein
- Schaufenster: Große Glasflächen mit Rahmen
- Türen: Doppelflügel mit Oberlicht

Hauptgeschosse (2-5 Stockwerke):
- Fenster: Nicht einfache Löcher! Jedes Fenster hat:
  - Außenrahmen (Faschen)
  - Fensterbrett (Gesims)
  - Fensterkreuz (Sprossen)
  - Verdachung (Dreieck oder Bogen über dem Fenster)
- Balkone: Schmiedeeiserne Brüstung mit detailliertem Muster
- Pilaster: Vertikale Gliederung zwischen Fenstern
- Gesimse: Horizontale Bänder zwischen Stockwerken

Dachzone:
- Kranzgesims: Starker horizontaler Abschluss
- Attika: Aufmauerung über Gesims
- Dach: Mansarddach mit Gauben (Dachfenster)
- Schornsteine: Mehrere, gemauert

Fassaden-Details:
- Stuck-Ornamente: Blumenmotive, Masken, Wappen
- Medaillons: Runde Reliefs
- Atlanten/Karyatiden: Figürliche Träger an wichtigen Stellen

### STEPHANSDOM (Wahrzeichen, 200.000+ Polygone)

Südturm (Steffl):
- Höhe: 136 Meter
- Gotische Fialen (kleine Türmchen)
- Maßwerk (durchbrochene Steinarbeit)
- Spitze mit Kreuz

Dach:
- Berühmtes Zickzack-Muster aus glasierten Ziegeln
- Dachneigung und Geometrie der Ziegel
- Dachreiter (kleine Türmchen auf dem Dach)

Hauptportal (Riesentor):
- Romanischer Bogen
- Säulen mit Kapitellen
- Figürlicher Schmuck

---

## 3.2 STRASSEN UND INFRASTRUKTUR

### STRASSE (pro 100m Segment: 5.000 Polygone)

Fahrbahn:
- Nicht flach! Leichte Wölbung zur Mitte (Quergefälle)
- Asphalt-Textur mit Rissen und Flecken
- Fahrstreifen-Markierungen
- Schachtdeckel (Kanaldeckel): Runde Geometrie mit Gitter-Muster

Gehsteig:
- Erhöht (15-20cm über Fahrbahn)
- Bordstein: Separate Geometrie
- Pflasterung: Wiener Würfel (kleine Granitquader)
- Abgesenkte Bereiche bei Übergängen

### STRASSENLATERNE (2.000 Polygone pro Stück)

Mast:
- Nicht zylindrisch! Leicht konisch
- Basis: Dekorativer Fuß
- Höhe: 4-6 Meter

Leuchte:
- Historischer Stil: Laterne mit mehreren Glasscheiben
- Moderner Stil: LED-Ausleger

Arm:
- Geschwungener Ausleger
- Verzierungen

### WEITERE STRASSEN-OBJEKTE

Mülleimer (1.500 Polygone):
- Zylindrisch mit Deckel
- Öffnung vorne
- Halterung/Ständer

Bank (3.000 Polygone):
- Holzlatten auf Metallgestell
- Rückenlehne
- Armlehnen

Telefonzelle (2.500 Polygone):
- Klassische Wiener Telefonzelle
- Glaswände
- Dach

Verkehrsschild (500 Polygone):
- Mast
- Schild-Geometrie
- Halterung

Ampel (1.000 Polygone):
- Mast
- Signalgeber (3 Lichter)
- Fußgänger-Signal

Hydrant (800 Polygone):
- Klassische Form
- Anschlüsse

---

# TEIL 4: TEXTUREN

## 4.1 TEXTUR-ARTEN (PBR-Workflow)

Für JEDES Material brauchst du:

Albedo/Diffuse (Base Color):
- Die Grundfarbe ohne Licht-Einflüsse
- RGB, 8-bit pro Kanal
- Auflösung: 4K (4096x4096) für Hauptcharaktere, 2K für Nebensachen

Normal Map:
- Simuliert Oberflächendetails ohne Geometrie
- RGB, Tangent-Space
- Blau-violetter Farbton
- Fügt Tiefe zu flachen Flächen hinzu (Poren, Nähte, Kratzer)

Roughness Map:
- Grayscale
- Weiß = rau (Stoff, Beton)
- Schwarz = glatt/glänzend (Metall, nasses Leder)

Metallic Map:
- Grayscale
- Weiß = Metall (Knöpfe, Reißverschlüsse)
- Schwarz = Nicht-Metall (fast alles andere)

Ambient Occlusion (AO):
- Grayscale
- Dunkle Bereiche wo Umgebungslicht nicht hinkommt
- Falten, Ecken, unter Kragen

Height/Displacement Map (optional):
- Grayscale
- Echte Geometrie-Verschiebung
- Nur für extreme Close-ups

## 4.2 CHARAKTER-TEXTUREN

### HAUT-TEXTUR

Albedo:
- Variationen im Hautton (nicht einfarbig!)
- Rötliche Bereiche: Wangen, Nase, Ohren, Lippen
- Bläuliche Bereiche: Augenringe, Schatten
- Gelbliche Bereiche: Stirn, Kinn
- Sommersprossen, Leberflecken, Muttermale
- Bartschatten bei Männern

Normal Map:
- Poren (mikroskopische Vertiefungen)
- Falten (Stirn, Augenwinkel, Nasolabial)
- Narben falls gewünscht

Subsurface Scattering:
- Haut ist leicht durchscheinend
- Rot-orange Unterfarbe (Blut)
- Besonders an dünnen Stellen (Ohren, Nasenflügel)

### STOFF-TEXTUR (Kleidung)

Albedo:
- Farbe des Stoffs
- Muster falls vorhanden (Streifen, Karos)
- Abnutzung (ausgeblichene Bereiche)
- Flecken

Normal Map:
- Webart-Struktur (Köper, Leinwand, etc.)
- Nähte (erhabene Linien)
- Falten (im Albedo weniger sichtbar)

Roughness:
- Baumwolle: hoch (0.7-0.9)
- Seide: niedrig (0.2-0.4)
- Leder: mittel (0.4-0.6)
- Abnutzung erhöht Roughness

## 4.3 UMGEBUNGS-TEXTUREN

### ASPHALT

Albedo:
- Dunkelgrau mit Variationen
- Flicken (hellere/dunklere Bereiche)
- Ölflecken
- Reifenspuren

Normal Map:
- Körnung
- Risse
- Schlagloch-Ränder

### BACKSTEIN/ZIEGEL

Albedo:
- Rote/braune Ziegel
- Variationen zwischen Ziegeln
- Mörtel-Fugen (hellgrau)

Normal Map:
- Ziegel-Relief
- Fugen vertieft
- Oberflächenstruktur der Ziegel

### GLAS

Transparent mit:
- Leichter Grünstich
- Reflexionen (Environment Map)
- Verschmutzung (fingerabdrücke, Staub)

---

# TEIL 5: SOFORTIGE CODE-ÄNDERUNGEN

## 5.1 ERSETZE PRIMITIVE NPCs

Lösche diesen Code KOMPLETT:

Alles was so aussieht:
- mesh mit cylinderGeometry für NPC-Körper
- mesh mit sphereGeometry für NPC-Köpfe
- mesh mit capsuleGeometry für NPC-Körper
- Einfarbige meshStandardMaterial oder meshBasicMaterial für NPCs

Ersetze durch einen der folgenden Ansätze:

### ANSATZ A: Prozedural generierte Menschen

Erstelle eine Komponente die einen Menschen aus vielen Teilen zusammensetzt:

Die Komponente HumanCharacter erhält Props für Größe, Körpertyp, Kleidung, Accessories.

Intern erstellt sie Gruppen für:
- Kopf-Gruppe (alle Kopf-Meshes)
- Torso-Gruppe (Oberkörper-Meshes)
- Linker-Arm-Gruppe
- Rechter-Arm-Gruppe
- Linkes-Bein-Gruppe
- Rechtes-Bein-Gruppe
- Kleidungs-Gruppe
- Accessoire-Gruppe

Jede Gruppe enthält mehrere Meshes die zusammen die Form bilden.

### ANSATZ B: LOW-POLY aber DETAILLIERT

Wenn Performance kritisch ist, verwende weniger Polygone aber mit:
- Guten Normal-Maps (simuliert Detail)
- Detaillierten Texturen
- Korrekten Proportionen

Minimum 5.000 Polygone pro Charakter (nicht 50!).

## 5.2 ERSETZE PRIMITIVE GEBÄUDE

Lösche diesen Code KOMPLETT:

Das blaue Rechteck das als "Gebäude" dient.

Ersetze durch:

### Modulares Gebäude-System

Erstelle wiederverwendbare Komponenten:
- Fenster-Modul (mit Rahmen, Glas, Sims)
- Tür-Modul (mit Portal, Türblatt, Oberlicht)
- Balkon-Modul (mit Brüstung, Boden)
- Geschoss-Modul (Wand mit Fenstern)
- Dach-Modul (verschiedene Dachformen)

Kombiniere diese zu vollständigen Gebäuden:

Ein Wohnhaus ist:
- 1x Erdgeschoss-Modul
- 3-5x Geschoss-Module gestapelt
- 1x Dach-Modul oben

## 5.3 FÜGE STRASSENELEMENTE HINZU

Die Szene braucht:
- Straßen mit Texturen (nicht nur Grid-Linien!)
- Gehsteige erhöht
- Straßenlaternen VIELE (alle 20-30 Meter)
- Mülleimer
- Bänke
- Bäume (mindestens als Billboards mit Alpha)
- Verkehrsschilder

---

# TEIL 6: TEXTUR-ERSTELLUNG OHNE EXTERNE DATEIEN

Falls du keine Textur-Dateien hast, erstelle sie PROZEDURAL:

## 6.1 Canvas-basierte Texturen

Erstelle Texturen mit HTML Canvas API:

Für eine Haut-Textur:
1. Erstelle ein Canvas 1024x1024
2. Fülle mit Basis-Hautton (RGB: 255, 205, 180)
3. Füge Noise hinzu (Perlin/Simplex)
4. Male dunklere Bereiche (Augenringe, Bartschatten)
5. Male rötliche Bereiche (Wangen, Nase)
6. Füge kleine Punkte hinzu (Poren, Sommersprossen)
7. Konvertiere zu Three.js Texture

Für eine Stoff-Textur:
1. Erstelle Canvas 512x512
2. Fülle mit Stoff-Farbe
3. Erstelle Webart-Muster durch Linien-Gitter
4. Füge leichte Farbvariationen hinzu
5. Konvertiere zu Texture

Für Asphalt:
1. Erstelle Canvas 1024x1024
2. Fülle mit Dunkelgrau
3. Füge viel Noise hinzu
4. Male unregelmäßige hellere/dunklere Flecken
5. Male dünne schwarze Linien (Risse)
6. Konvertiere zu Texture

## 6.2 Noise-Funktionen

Implementiere Perlin Noise oder Simplex Noise für:
- Organische Variationen
- Terrain-Höhe
- Wolken
- Verschmutzung

---

# TEIL 7: CHECKLISTE FÜR GEMINI

## NACH DIESER ÜBERARBEITUNG MUSST DU FOLGENDES HABEN:

### NPCs (Mindestens 1 Modell):
- [ ] Polygon-Count: Über 5.000 (Minimum), Ziel 35.000
- [ ] Anatomisch korrekte Proportionen
- [ ] Kopf mit Gesichtszügen (nicht Kugel)
- [ ] Torso mit Körperform (nicht Zylinder)
- [ ] Separate Arme und Beine
- [ ] Hände mit Fingern
- [ ] Kleidung als separate Geometrie
- [ ] Mindestens eine Textur (Albedo)

### Gebäude (Mindestens 1):
- [ ] Polygon-Count: Über 10.000 (Minimum), Ziel 50.000
- [ ] Mehrere Stockwerke
- [ ] Fenster mit Rahmen (nicht Löcher)
- [ ] Tür mit Portal
- [ ] Dach
- [ ] Fassaden-Details
- [ ] Texturen (Wand, Fenster)

### Straße:
- [ ] Fahrbahn mit Textur
- [ ] Gehsteig erhöht
- [ ] Bordstein

### Umgebungs-Objekte (Mindestens 3 Typen):
- [ ] Straßenlaternen
- [ ] Mülleimer oder Bank
- [ ] Baum oder Busch

### Beleuchtung:
- [ ] Direktionales Licht (Sonne)
- [ ] Ambient Light
- [ ] Schatten aktiviert

### Texturen:
- [ ] Mindestens 3 verschiedene Texturen
- [ ] Auflösung mindestens 512x512
- [ ] Korrekte UV-Mapping

---

# TEIL 8: VALIDIERUNG

## FÜHRE DIESE TESTS DURCH:

### Test 1: Polygon-Zählung
Öffne Browser DevTools, Console, tippe:

scene.traverse(obj => { if(obj.geometry) console.log(obj.name, obj.geometry.attributes.position.count/3) })

Das zeigt Polygon-Anzahl pro Objekt.

AKZEPTANZKRITERIUM: Mindestens ein NPC hat über 5.000 Polygone.

### Test 2: Visuelle Inspektion
Gehe mit Kamera nah an einen NPC.

AKZEPTANZKRITERIUM: Du siehst:
- Erkennbares Gesicht
- Körperform
- Kleidung
- Details

### Test 3: Gebäude-Inspektion
Schaue ein Gebäude an.

AKZEPTANZKRITERIUM:
- Mehrere Stockwerke sichtbar
- Fenster erkennbar
- Textur vorhanden

---

# FINALE ANWEISUNG

**DU DARFST DIESEN PROMPT NICHT ALS ERLEDIGT MARKIEREN BIS:**

1. Alle primitiven Zylinder/Kapseln/Boxen für NPCs sind GELÖSCHT
2. Mindestens EIN detaillierter NPC existiert (5.000+ Polygone)
3. Das blaue Rechteck-Gebäude ist GELÖSCHT
4. Mindestens EIN detailliertes Gebäude existiert (10.000+ Polygone)
5. Texturen werden verwendet
6. Umgebungs-Objekte existieren

**BEI NICHTERFÜLLUNG: STARTE VON VORNE.**
# KONKRETE R3F IMPLEMENTIERUNG - ERSETZE DIE PRIMITIVEN

## SOFORT-CODE-BEISPIELE

Hier sind konkrete Code-Strukturen die du verwenden musst statt der primitiven Zylinder.

---

# TEIL 1: DETAILLIERTER NPC

## 1.1 Human Character Komponente Struktur

Die Komponente muss folgende Struktur haben (in Worten beschrieben):

Erstelle eine React Functional Component namens HumanCharacter.

Die Component akzeptiert Props:
- position: Array mit drei Zahlen für X Y Z
- rotation: Array mit drei Zahlen für Rotation
- scale: Zahl für Gesamtgröße
- characterType: String, entweder "demonstrator" oder "police" oder "civilian"
- clothingColor: String für Hauptfarbe der Kleidung
- skinTone: String für Hauttonwahl
- hasSign: Boolean ob die Person ein Demo-Schild trägt
- signText: String für Text auf dem Schild

Innerhalb der Component:

Verwende useRef für die Haupt-Gruppe um später Animation zu ermöglichen.

Return eine group-Komponente die alles enthält.

Innerhalb der group, erstelle weitere group-Komponenten für:
- headGroup
- torsoGroup
- leftArmGroup
- rightArmGroup
- leftLegGroup
- rightLegGroup
- clothingGroup
- accessoriesGroup

Jede Körperteil-Gruppe enthält die entsprechenden Meshes.

## 1.2 Kopf-Aufbau

Der Kopf ist KEINE einfache Kugel. Erstelle ihn so:

Haupt-Schädel:
- Verwende eine SphereGeometry
- Aber modifiziere sie: Segmente 32 horizontal, 24 vertikal
- WICHTIG: Nach Erstellung, skaliere in Y-Richtung um Faktor 1.15 (Kopf ist höher als breit)
- Skaliere in Z-Richtung um Faktor 0.9 (Kopf ist von der Seite flacher)
- Position relativ zur Gruppe: Y ist Augenhöhe

Kiefer:
- Erstelle eine separate Box oder modifizierte Sphere
- Position: Unterhalb des Hauptschädels
- Skalierung: Breiter als hoch

Nase:
- Erstelle aus mehreren Teilen:
- Nasenrücken: Schmaler vertikaler Quader, leicht nach vorne geneigt
- Nasenspitze: Kleine Kugel am unteren Ende
- Nasenflügel: Zwei winzige Kugeln links und rechts
- Position: Zentrum des Gesichts, nach vorne versetzt

Augen:
- Für jedes Auge erstelle:
- Augenhöhle: Leichte Einbuchtung (dunkleres Material)
- Augapfel: Weiße Kugel
- Iris: Farbige Scheibe vor dem Augapfel
- Pupille: Schwarze Scheibe vor der Iris
- Position: Links und rechts von der Nase, leicht nach innen versetzt

Ohren:
- Erstelle aus Torus-Segmenten oder abgeflachten Ellipsoiden
- Position: Seitlich am Kopf, auf Augenhöhe
- Rotation: Leicht nach hinten geneigt

Mund:
- Erstelle eine horizontale Linie/Furche
- Oberlippe: Leicht gewölbter Quader
- Unterlippe: Dickerer gewölbter Quader

Haare (Optional, aber wichtig für Realismus):
- Methode 1: Haube aus Mesh über dem Schädel
- Methode 2: Viele kleine Planes mit Hair-Textur
- Methode 3: Einfache Form die Frisur andeutet

## 1.3 Torso-Aufbau

Der Torso ist KEIN einfacher Zylinder. Erstelle ihn so:

Hauptkörper:
- Verwende KEINE CylinderGeometry direkt
- Stattdessen: Erstelle eine Custom BufferGeometry ODER verwende eine modifizierte LatheGeometry

Für LatheGeometry:
- Definiere ein Profil (Array von Vector2 Punkten)
- Das Profil beschreibt die Silhouette von der Seite:
  - Starte bei Hals (schmal)
  - Weite zu Schultern (breit)
  - Kurve zum Brustbereich
  - Schmaler bei Taille
  - Leicht breiter bei Hüfte
- LatheGeometry dreht dieses Profil um Y-Achse
- Segmente: 32 für smooth

Alternative: Mehrere Primitive kombinieren
- Oberkörper: Abgeflachte Sphere (Brustkorb)
- Bauch: Zylinder (aber mit Verjüngung)
- Schultern: Zwei halbe Kugeln links und rechts

Schultern:
- Erstelle zwei separate Sphere-Geometrien
- Position: Links und rechts oben am Torso
- Skalierung: In X-Richtung gestreckt

## 1.4 Arme

Jeder Arm besteht aus:

Oberarm:
- Modifizierter Zylinder (dicker oben, dünner unten)
- Oder: CapsuleGeometry für weichere Enden
- Rotation: Nach unten hängend oder in Pose

Ellbogen:
- Kleine Kugel als Übergang
- Oder: Teil des Unter/Oberarms

Unterarm:
- Ähnlich wie Oberarm aber kürzer und dünner

Handgelenk:
- Sehr kleine Kugel oder Teil der Hand

Hand:
- Erstelle als separate Komponente
- Siehe Hand-Detail unten

## 1.5 Hand-Detail

Eine Hand hat:

Handfläche:
- Abgeflachter Quader
- Leicht gebogen (nicht komplett flach)
- Breite etwa 0.08 Einheiten
- Länge etwa 0.1 Einheiten
- Dicke etwa 0.025 Einheiten

Finger (4 Finger, nicht Daumen):
- Jeder Finger: 3 Segmente
- Segment 1 (Grundglied): Zylinder, Durchmesser 0.015
- Segment 2 (Mittelglied): Etwas dünner, 0.013
- Segment 3 (Endglied): Am dünnsten, 0.011
- Zwischen Segmenten: Kleine Kugeln als Gelenke

Daumen:
- Nur 2 Segmente
- Andere Ausrichtung (90 Grad zur Seite)
- Dickere Segmente als andere Finger

## 1.6 Beine

Jedes Bein besteht aus:

Oberschenkel:
- Dicker modifizierter Zylinder
- Oben (bei Hüfte) am dicksten
- Verjüngt sich zum Knie
- Länge etwa gleich Torso-Höhe

Knie:
- Kleine Kugel oder Teil des Ober/Unterschenkels
- Kniescheibe als kleine Erhebung vorne

Unterschenkel (Wade):
- Dünner als Oberschenkel
- Dickste Stelle oben-hinten (Wadenmuskel)
- Verjüngt sich zum Knöchel

Knöchel:
- Kleine Kugeln links und rechts

Fuß:
- Siehe Fuß-Detail

## 1.7 Fuß-Detail

Hauptteil:
- Abgeflachter Quader
- Aber mit Wölbung (nicht flach auf dem Boden)
- Ferse rund
- Vorderseite breiter

Zehen (vereinfacht):
- 5 kleine zylindrische Segmente vorne
- Oder ein gemeinsamer Zehenblock

Schuh (falls angezogen):
- Umhüllt den Fuß
- Sohle als separate Geometrie
- Schnürung als Textur oder Relief

---

# TEIL 2: KLEIDUNG

## 2.1 T-Shirt/Oberteil

Erstelle als leicht größere Version des Torso:
- Nimm die Torso-Geometrie
- Skaliere um Faktor 1.02-1.05 (Stoff hat Dicke)
- Subtrahiere (oder verdecke) den Hals-Bereich
- Ärmel: Kurze Zylinder die vom Schulterbereich ausgehen

Falten:
- Entweder durch Normal-Map simuliert
- Oder: Extra Geometrie für große Falten
- Wichtige Falten-Bereiche: Unter Achseln, am Bauch wenn gebeugt

## 2.2 Hose

Erstelle als leicht größere Version der Beine:
- Separates Mesh für jedes Bein
- Verbunden im Schritt-Bereich
- Bund oben als separater Torus

Taschen:
- Rechteckige Einbuchtungen an den Seiten
- Oder nur durch Textur/Normal-Map

## 2.3 Polizei-Ausrüstung

Helm:
- Basis: Modifizierte Halbkugel (oben abgeflacht)
- Krempe: Torus-Segment vorne
- Visier: Transparente Plane mit Kurve
- Nackenschutz: Verlängerte Geometrie hinten

Schutzweste:
- Basis: Modifizierter Torso-Wrap
- Dicke: Deutlich dicker als Torso (5-10cm)
- Taschen: Box-Geometrien auf der Front
- MOLLE-Schlaufen: Horizontale Rippen (durch Normal-Map oder Geometrie)

Schild:
- Leicht gebogene Plane
- Dicke: 1-2cm
- Griff auf Rückseite

---

# TEIL 3: GEBÄUDE-KOMPONENTEN

## 3.1 Fenster-Komponente

Erstelle eine wiederverwendbare WindowComponent:

Props:
- width: Breite
- height: Höhe
- hasShutters: Boolean für Fensterläden
- isOpen: Boolean für offenes Fenster

Bestandteile:
- Rahmen außen: Vier schmale Boxen als Faschen
- Fensterbrett: Horizontale Box unten, ragt nach vorne
- Glas: Transparente Plane mit leichtem Grünstich
- Fensterkreuz: Vertikale und horizontale dünne Boxen im Glas
- Verdachung (optional): Dreieck oder Bogen über dem Fenster

## 3.2 Tür-Komponente

Props:
- width
- height
- style: "wooden", "glass", "metal"
- hasTransom: Boolean für Oberlicht

Bestandteile:
- Türrahmen: Drei Boxen (oben, links, rechts)
- Türblatt: Große Box mit Textur
- Türgriff: Kleine Geometrie auf Türblatt
- Oberlicht: Wenn hasTransom, zusätzliches Glas über Tür

## 3.3 Wand-Segment

Props:
- width
- height
- windows: Array von Fenster-Positionen
- material: Textur-Referenz

Bestandteile:
- Hauptwand: Große Box
- Aussparungen für Fenster (durch CSG oder separate Geometrie)
- Fenster eingefügt

## 3.4 Komplettes Gebäude

Props:
- floors: Anzahl Stockwerke
- width
- depth
- style: "gründerzeit", "modern", "industrial"

Erstelle durch Stapelung:
- Erdgeschoss mit Eingangstür und Schaufenstern
- Wiederhole Obergeschoss-Modul
- Dach oben

---

# TEIL 4: TEXTUREN PROZEDURAL ERSTELLEN

## 4.1 Canvas-Textur-Generator

Da du keine externen Textur-Dateien hast, erstelle sie mit JavaScript:

Funktion createSkinTexture:

Erstelle ein HTML Canvas Element mit Größe 1024 mal 1024.
Hole den 2D Kontext.
Fülle das gesamte Canvas mit Basis-Hautfarbe (z.B. RGB 235, 195, 170).
Erstelle Noise-Variation: Iteriere über jeden Pixel, addiere zufälligen Wert zwischen -5 und +5 zu jeder Farbkomponente.
Male dunklere Bereiche für Augenringe, Bartschatten.
Male rötliche Bereiche auf Wangen und Nase.
Erstelle eine Three.CanvasTexture aus dem Canvas.
Setze needsUpdate auf true.
Return die Texture.

Funktion createFabricTexture:

Parameter: baseColor (RGB Array)
Erstelle Canvas 512 mal 512.
Fülle mit baseColor.
Male feines Gitter-Muster (Webart):
- Horizontale Linien alle 4 Pixel, leicht heller
- Vertikale Linien alle 4 Pixel, leicht dunkler
Füge Noise hinzu für Variationen.
Return als CanvasTexture.

Funktion createBrickTexture:

Erstelle Canvas 1024 mal 1024.
Fülle mit Mörtel-Farbe (hellgrau, RGB 200, 195, 185).
Male Ziegel-Muster:
- Ziegel-Größe: 64 mal 32 Pixel
- Versetzte Reihen (jede zweite Reihe um halbe Ziegel versetzt)
- Ziegel-Farbe: Variationen von Rot-Braun
- Jeder Ziegel hat leicht andere Farbe (Noise)
Return als CanvasTexture.

Funktion createAsphaltTexture:

Erstelle Canvas 1024 mal 1024.
Fülle mit Dunkelgrau (RGB 60, 60, 65).
Füge starkes Noise hinzu (Körnung).
Male zufällige Flecken (heller und dunkler).
Male dünne schwarze Linien als Risse.
Return als CanvasTexture.

## 4.2 Textur-Verwendung

Speichere generierte Texturen in einem Store oder Context damit sie wiederverwendet werden und nicht jedes Frame neu erstellt werden.

Bei Component Mount:
- Prüfe ob Textur bereits existiert
- Wenn nicht, erstelle und speichere
- Verwende aus Store

---

# TEIL 5: MATERIAL-DEFINITIONEN

## 5.1 Haut-Material

Erstelle ein meshStandardMaterial oder meshPhysicalMaterial mit:
- map: Die generierte Haut-Textur
- roughness: 0.7 (Haut ist nicht glatt)
- metalness: 0 (Haut ist nicht metallisch)
- normalMap: Falls vorhanden (für Poren)
- Optional bei meshPhysicalMaterial:
  - clearcoat: 0.1 (leichter Glanz bei Schweiß)
  - transmission: 0.05 (Subsurface-Andeutung)

## 5.2 Stoff-Material

Erstelle meshStandardMaterial mit:
- map: Generierte Stoff-Textur
- roughness: 0.8-0.95 (je nach Stoffart)
- metalness: 0
- normalMap: Webart-Normal

## 5.3 Glas-Material

Erstelle meshPhysicalMaterial mit:
- transmission: 0.95 (fast komplett durchsichtig)
- roughness: 0.05 (sehr glatt)
- metalness: 0
- ior: 1.5 (Brechungsindex von Glas)
- thickness: 0.01 (Glas-Dicke)
- color: Leichter Grünstich (0xE8F5E9)

## 5.4 Metall-Material

Erstelle meshStandardMaterial mit:
- color: Basis-Metallfarbe
- roughness: 0.2-0.4 (je nach Politur)
- metalness: 1.0 (voll metallisch)
- envMapIntensity: 1.5 (starke Reflexionen)

---

# TEIL 6: BELEUCHTUNGS-SETUP

## 6.1 Pflicht-Lichter

Die Szene MUSS haben:

Direktionales Licht (Sonne):
- Typ: directionalLight
- Intensität: 1.5-2.0
- Position: Schräg von oben (z.B. Position 50, 100, 50)
- castShadow: true
- shadow-mapSize: Mindestens 2048 mal 2048
- shadow-camera: Angepasst an Szenen-Größe

Hemisphäre-Licht oder Ambient:
- Typ: hemisphereLight oder ambientLight
- Intensität: 0.3-0.5
- Bei Hemisphere: Himmelfarbe oben, Bodenfarbe unten

Füll-Licht (optional aber empfohlen):
- Typ: directionalLight (schwächer)
- Intensität: 0.3-0.5
- Position: Gegenüber der Hauptsonne
- Keine Schatten

## 6.2 Dynamische Lichter

Straßenlaternen:
- Typ: pointLight
- Intensität: 1.0-2.0
- Distanz: 15-20 (Radius des Lichtkegels)
- Farbe: Warmweiß (0xFFE4B5) für historisch, Weiß für modern
- Nur bei Nacht aktiv (basierend auf Spielzeit)

Fahrzeuglichter:
- Typ: spotLight
- Intensität: 2.0
- Winkel: 30 Grad
- Penumbra: 0.5

---

# TEIL 7: VALIDIERUNGS-CODE

## 7.1 Polygon-Zähler

Füge folgende Debug-Funktion ein:

Funktion countScenePolygons:
Definiere Variable totalTriangles mit Wert 0.
Traversiere scene (scene.traverse).
Für jedes Objekt:
- Wenn geometry existiert und geometry.attributes.position existiert:
  - Hole die Vertex-Anzahl: geometry.attributes.position.count
  - Berechne Dreiecke: Bei indexed geometry, index.count geteilt durch 3
  - Bei non-indexed: position.count geteilt durch 3
  - Addiere zu totalTriangles
  - Logge: Objektname und Dreieckszahl
Logge am Ende: Gesamt-Dreiecke.

Rufe diese Funktion bei Szenen-Load auf und prüfe ob die Zahlen stimmen.

## 7.2 Performance-Monitor

Füge hinzu:
- FPS-Counter (Stats.js oder custom)
- Draw-Call-Zähler: renderer.info.render.calls
- Triangle-Zähler: renderer.info.render.triangles
- Memory-Nutzung: renderer.info.memory

---

# ZUSAMMENFASSUNG DER PFLICHT-ÄNDERUNGEN

Du MUSST:

1. ALLE primitiven Zylinder/Kapseln/Boxen für NPCs LÖSCHEN
2. MINDESTENS einen detaillierten NPC erstellen mit:
   - Anatomisch korrektem Kopf (Gesichtszüge)
   - Torso mit Körperform
   - Arme mit Händen
   - Beine mit Füßen
   - Kleidung
   - ÜBER 5.000 Polygone

3. Das blaue Rechteck-Gebäude LÖSCHEN
4. MINDESTENS ein detailliertes Gebäude erstellen mit:
   - Fenstern (nicht Löcher, sondern mit Rahmen)
   - Tür
   - Mehreren Stockwerken
   - Texturen
   - ÜBER 10.000 Polygone

5. Straße mit Textur erstellen
6. Umgebungs-Objekte hinzufügen (Laternen, Mülleimer, etc.)
7. Texturen verwenden (generiert oder extern)
8. Beleuchtung korrekt einrichten

**OHNE DIESE ÄNDERUNGEN IST DAS PROJEKT INAKZEPTABEL.**
