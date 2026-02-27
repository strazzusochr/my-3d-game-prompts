# 🎮 CORONA CONTROL ULTIMATE - KOMPLETTE SPIELMECHANIK-SPEZIFIKATION
## VOLLSTÄNDIGE SPIELREGELN & SYSTEM-LOGIK FÜR GEMINI CODER

---

```
╔═══════════════════════════════════════════════════════════════════════════════════╗
║                                                                                   ║
║             🚔 CORONA CONTROL ULTIMATE - GAME MECHANICS BIBLE 🚔                  ║
║                                                                                   ║
║   BRUTALES, REALISTISCHES POLIZEI-SIMULATIONS-ACTION-SPIEL                       ║
║   KEINE MORAL • KEINE LIMITS • PURE REALITÄT                                     ║
║                                                                                   ║
║   Target: AAA-Qualität | Open-World Wien | 500+ NPCs | Branching Story          ║
║   Style: Brutal-Realistisch | Keine Zensur | Echte Konsequenzen                 ║
║                                                                                   ║
╚═══════════════════════════════════════════════════════════════════════════════════╝
```

---

## 📖 INHALTSVERZEICHNIS

1. [KERN-SPIELKONZEPT](#1-kern-spielkonzept)
2. [SPIELER-MECHANIKEN](#2-spieler-mechaniken)
3. [KAMPF-SYSTEM](#3-kampf-system)
4. [NPC-VERHALTEN & KI](#4-npc-verhalten--ki)
5. [CROWD-SIMULATION](#5-crowd-simulation)
6. [MORAL & ESKALATIONS-SYSTEM](#6-moral--eskalations-system)
7. [MISSIONS-STRUKTUR](#7-missions-struktur)
8. [LEVEL-DESIGN & GEBIETE](#8-level-design--gebiete)
9. [DIALOG-SYSTEM](#9-dialog-system)
10. [INVENTAR & AUSRÜSTUNG](#10-inventar--ausrüstung)
11. [FAHRZEUG-SYSTEM](#11-fahrzeug-system)
12. [ZERSTÖRUNGS-MECHANIK](#12-zerstörungs-mechanik)
13. [WETTER & UMWELT](#13-wetter--umwelt)
14. [WIRTSCHAFTS-SYSTEM](#14-wirtschafts-system)
15. [FORTSCHRITTS-SYSTEM](#15-fortschritts-system)
16. [MULTIPLAYER-ELEMENTE](#16-multiplayer-elemente)
17. [BRANCHING STORY & ENDEN](#17-branching-story--enden)
18. [ACHIEVEMENT-SYSTEM](#18-achievement-system)
19. [SCHWIERIGKEITSGRADE](#19-schwierigkeitsgrade)
20. [SPIEL-MODI](#20-spiel-modi)

---

## 1. KERN-SPIELKONZEPT

### 1.1 SPIEL-PRÄMISSE
Du bist ein österreichischer Polizeibeamter in Wien während einer massiven Corona-Krise. Die Stadt ist im Ausnahmezustand, Proteste eskalieren täglich, die Bevölkerung ist gespalten. Deine Entscheidungen bestimmen nicht nur das Schicksal einzelner Bürger, sondern die Zukunft der gesamten Stadt.

**KEINE MORALISCHEN LIMITS:**
- Realistische Gewalt ohne Zensur
- Brutale Crowd-Control-Methoden erlaubt
- Korruption und Bestechung möglich
- Kollateralschäden haben echte Konsequenzen
- Jede Aktion wird von der Bevölkerung bewertet

### 1.2 KERN-GAMEPLAY-SCHLEIFE
```
Mission erhalten → Gebiet erkunden → Situation bewerten → 
Taktik wählen → Ausführen → Konsequenzen erleben → 
Reputation ändert sich → Neue Optionen freischalten → Repeat
```

### 1.3 SPIELZIELE
**Hauptziel:** Stabilität in Wien wiederherstellen
**Sekundärziele:**
- Persönliche Karriere aufbauen (oder zerstören)
- Vertrauen der Bevölkerung gewinnen/verlieren
- Geheime Verschwörung aufdecken
- 5 verschiedene Enden erreichen je nach Moral-Score

---

## 2. SPIELER-MECHANIKEN

### 2.1 BEWEGUNGS-SYSTEM
**Basis-Bewegung:**
- Gehen: 1,4 m/s (Standard-Geschwindigkeit)
- Laufen: 4,5 m/s (Sprint, begrenzte Ausdauer)
- Schleichen: 0,8 m/s (reduziert Geräusche um 70%)
- Rückwärts: 1,0 m/s
- Seitwärts-Strafe: 1,2 m/s

**Erweiterte Bewegung:**
- Klettern: Über Zäune (1,2m), Mauern (1,8m), Gebäude
- Springen: 0,8m Höhe, 1,5m Weite
- Rollen: Nach Sprint-Sprung, 30% weniger Fallschaden
- Ducken: Unter Hindernissen, hinter Deckung
- Gleiten: An Leitern, Geländern
- Schwimmen: In Donau, Brunnen (begrenzte Luft: 60 Sekunden)

**Ausdauer-System:**
- Maximale Ausdauer: 100 Punkte
- Sprint-Verbrauch: 20 Punkte/Sekunde
- Regeneration: 15 Punkte/Sekunde (nach 2 Sekunden Pause)
- Nahkampf-Verbrauch: 5-15 Punkte pro Aktion
- Klettern-Verbrauch: 10 Punkte/Sekunde
- Schwimmen-Verbrauch: 8 Punkte/Sekunde
- Bei 0 Ausdauer: 50% Bewegungsgeschwindigkeit, kann nicht sprinten

**Physik-Interaktion:**
- Charaktergewicht: 80kg + Ausrüstung (5-25kg)
- Trägheit bei Richtungswechsel
- Rutschige Oberflächen (Eis, Blut): -40% Grip
- Steigungen: >30° = -25% Geschwindigkeit
- Tiefes Wasser: -60% Bewegung
- Getroffen werden: Knockback basierend auf Waffenimpuls

### 2.2 KAMERA-SYSTEM
**Perspektiven:**
- Third-Person (Standard): 2,5m Abstand, 1,5m Höhe
- Third-Person Nah: 1,2m Abstand für Nahkampf
- Aim-Perspektive: Over-Shoulder, 0,8m Abstand
- Fahrzeug-Perspektive: Mehrere Positionen (Hood, Bumper, Chase)

**Kamera-Physik:**
- Dynamische Kollision mit Wänden
- Screen-Shake bei Explosionen (0,1 - 2,0 Intensität)
- Motion-Blur bei schneller Bewegung
- Depth-of-Field beim Zielen
- Automatisches Umschauen zu wichtigen Events

**Kamera-Einstellungen:**
- FOV: 60-120 Grad (Standard: 90)
- Sensitivität: 0,1 - 5,0
- Invertierte Y-Achse: Optional
- Kamera-Abstand: 1,0 - 4,0 Meter
- Kamera-Höhe: -1,0 - 2,0 Meter Offset

### 2.3 INTERAKTIONS-SYSTEM
**Objekt-Interaktion:**
- Türen: Öffnen, Schließen, Eintreten, Aufbrechen
- Fahrzeuge: Einsteigen, Aussteigen, Beschlagnahmen
- Items: Aufheben (max 50kg), Tragen, Werfen (bis 15 Meter)
- Schalter: Aktivieren, Deaktivieren
- NPCs: Sprechen, Festnehmen, Durchsuchen, Verhören

**Umwelt-Interaktion:**
- Deckung nutzen: Automatisch bei Nähe zu Objekten >1,2m Höhe
- Fenster: Zerbrechen (50 HP Schaden wenn nicht geduckt)
- Leitern: Automatisches Klettern
- Treppen: Laufen, Rutschen (Geländer)
- Wasser: Schwimmen, Tauchen (60 Sek Luft)

**Kontext-Aktionen:**
- Dynamische Aktions-Prompts basierend auf Situation
- Mehrfach-Optionen bei komplexen Objekten
- Schnell-Events (Quick-Time-Events) bei kritischen Momenten
- Verzögerte Interaktionen (z.B. Türen aufbrechen: 3 Sekunden)

### 2.4 GESUNDHEITS-SYSTEM
**Gesundheits-Punkte (HP):**
- Maximum: 100 HP
- Regeneration: KEINE automatische Regeneration
- Heilung nur durch: Medikit (+50 HP), Erste-Hilfe (+25 HP), Krankenhaus (+100 HP)
- Kritische Gesundheit: <20 HP (verzerrte Vision, reduzierte Bewegung)

**Schadens-Typen:**
- Stumpfes Trauma: Schlagstock, Fäuste (5-20 HP)
- Scharfe Waffen: Messer, Glas (15-50 HP)
- Schusswaffen: 20-100 HP (abhängig von Kaliber & Treffer-Zone)
- Explosionen: 30-100 HP + Ragdoll-Effekt
- Feuer: 10 HP/Sekunde + Panik-Status
- Chemische Waffen: 5 HP/Sekunde + Blindheit
- Sturz: 10 HP pro Meter über 3m Fallhöhe
- Fahrzeug-Kollision: 20-100 HP basierend auf Geschwindigkeit

**Körperteile-System:**
- Kopf: 2x Schaden-Multiplikator
- Torso: 1x Standard-Schaden
- Arme: 0,7x Schaden (beeinflusst Ziel-Genauigkeit)
- Beine: 0,8x Schaden (beeinflusst Bewegungsgeschwindigkeit)
- Rücken: 1,2x Schaden (keine Rüstung)

**Status-Effekte:**
- Blutung: -2 HP/Sekunde (bis Verband angelegt)
- Betäubt: 5 Sekunden Bewegungsunfähigkeit
- Tränengas: -50% Sicht, -30% Bewegung (20 Sekunden)
- Pfefferspray: -80% Sicht, -50% Bewegung (15 Sekunden)
- Feuer: -10 HP/Sek, Panik-Animation (bis gelöscht)
- Vergiftet: -1 HP/Sek (60 Sekunden)
- Kälte: -5 HP alle 30 Sek (unter 0°C ohne Schutz)
- Hitze: -3 HP alle 20 Sek (über 35°C in voller Ausrüstung)

**Tod & Respawn:**
- Bei 0 HP: Spieler stirbt
- Respawn-Optionen:
  - Letzter Checkpoint (Mission-Start)
  - Krankenhaus (kostet 500€, verliert 10% Reputation)
  - Mission abbrechen (verliert allen Fortschritt)
- Permadeath-Modus: Verfügbar (1 Leben pro Kampagne)

---

## 3. KAMPF-SYSTEM

### 3.1 NAHKAMPF-MECHANIK
**Unbewaffneter Kampf:**
- Leichte Schläge: 8 HP Schaden, 0,5 Sek Cooldown, 5 Ausdauer
- Schwere Schläge: 15 HP Schaden, 1,2 Sek Cooldown, 12 Ausdauer
- Tritt: 12 HP Schaden, 0,8 Sek Cooldown, 8 Ausdauer, Knockback 1,5m
- Greifen: Immobilisiert Gegner (3 Sek), 15 Ausdauer
- Würgen: 5 HP/Sek während Griff
- Kopfstoß: 20 HP Schaden (zu Gegner & Spieler), 1,5 Sek Stun

**Schlagstock-Kampf:**
- Leichter Schlag: 15 HP, 0,6 Sek CD, 5 Ausdauer
- Schwerer Schlag: 30 HP, 1,4 Sek CD, 12 Ausdauer
- Schlag-Kombo (3 Hits): 15-20-25 HP
- Betäubungs-Schlag: 25 HP + 5 Sek Stun (Kopf-Treffer)
- Block: Reduziert 50% Schaden, kostet 8 Ausdauer
- Konter-Angriff: Nach perfektem Block = 40 HP Schaden

**Schild-Kampf:**
- Schild-Block: 80% Schadenreduktion (frontal)
- Schild-Bash: 25 HP + 2 Sek Stun + Knockback 2m
- Schild-Wall: Team-Formation (3+ Spieler), 95% Schutz
- Schildstoß: 30 HP + Niederwerfen
- Deckung: Automatisch gegen Projektile

**Erweiterte Nahkampf-Optionen:**
- Festnahme: 3 Sekunden Griff-Dauer → Handschellen anlegen
- Würgen (Nicht-Letal): 10 Sek bis Bewusstlosigkeit
- Würgen (Letal): 30 Sek bis Tod (NUR wenn erlaubt)
- Kopf-gegen-Wand: 50 HP, hoher Moral-Verlust
- Bein-Fegen: Niederwerfen, 10 HP
- Entwaffnen: Waffe aus Hand schlagen (20% Erfolgsrate)

**Nahkampf-Combos:**
```
Combo 1: Leicht → Leicht → Schwer (45 HP, schnell)
Combo 2: Schwer → Tritt → Schlag (57 HP, Knockback)
Combo 3: Block → Konter → Schlag (65 HP, defensive)
Combo 4: Greifen → Knie → Wurf (70 HP, kontrolliert)
Combo 5: Schild-Bash → Schlagstock → Tritt (80 HP, max dmg)
```

### 3.2 FERNKAMPF-MECHANIK
**Schusswaffen-System:**
- Pistole (Glock 17):
  - Schaden: 30 HP (Torso), 60 HP (Kopf)
  - Magazin: 17 Schuss
  - Nachladezeit: 2,1 Sekunden
  - Reichweite: 50 Meter effektiv
  - Feuerrate: Semi-Auto (max 3 Schuss/Sek)
  - Rückstoß: Gering (0,2° pro Schuss)

- Maschinenpistole (MP5):
  - Schaden: 22 HP (Torso), 44 HP (Kopf)
  - Magazin: 30 Schuss
  - Nachladezeit: 2,5 Sekunden
  - Reichweite: 100 Meter effektiv
  - Feuerrate: 800 Schuss/Minute (Voll-Auto)
  - Rückstoß: Mittel (5° über 10 Schuss)

- Sturmgewehr (Steyr AUG):
  - Schaden: 35 HP (Torso), 70 HP (Kopf)
  - Magazin: 30 Schuss
  - Nachladezeit: 3,0 Sekunden
  - Reichweite: 300 Meter effektiv
  - Feuerrate: 680 Schuss/Minute
  - Rückstoß: Hoch (8° über 10 Schuss)

- Schrotflinte (Remington 870):
  - Schaden: 15 HP × 8 Pellets (120 HP nah)
  - Magazin: 7 Schuss
  - Nachladezeit: 0,8 Sek/Patrone
  - Reichweite: 30 Meter effektiv
  - Feuerrate: Pump-Action (1 Schuss/Sek)
  - Streuung: 10° Kegel

- Scharfschützengewehr (Steyr SSG 08):
  - Schaden: 100 HP (Torso), 200 HP (Kopf = Insta-Kill)
  - Magazin: 10 Schuss
  - Nachladezeit: 3,5 Sekunden
  - Reichweite: 800 Meter effektiv
  - Feuerrate: Bolt-Action (0,5 Schuss/Sek)
  - Zielfernrohr: 4x-12x Zoom

**Ballistik & Präzision:**
- Projektil-Geschwindigkeit: 300-900 m/s (waffen-abhängig)
- Bullet-Drop: Realistische Schwerkraft (9,81 m/s²)
- Wind-Einfluss: ±2° Abweichung bei starkem Wind
- Bewegungs-Ungenauigkeit: +50% Streuung beim Laufen
- Ziel-Ungenauigkeit: -30% beim Zielen (ADS)
- Atmen-Schwanken: ±1° Oszillation (eliminierbar durch Atem-Halten)
- Rückstoß-Muster: Waffenspezifisch, lernbar

**Munitions-System:**
- Standard-Munition: Normal-Schaden
- Hohlspitz-Munition: +30% Schaden, -20% Durchschlag
- Panzerbrechend: +50% gegen Rüstung, -10% gegen Fleisch
- Gummi-Geschosse: 20% Schaden, hoher Betäubungseffekt
- Tracer-Munition: Sichtbare Projektil-Spur
- Fragmentierung: +20% Schaden, +50% Blutung

**Nicht-Letale Waffen:**
- Taser:
  - Reichweite: 7 Meter
  - Effekt: 5 Sekunden Lähmung
  - Nachladezeit: 20 Sekunden
  - Munition: 1 Schuss, dann neu laden

- Pfefferspray:
  - Reichweite: 3 Meter Kegel
  - Effekt: 15 Sek Blindheit, 10 Sek Bewegungs-Debuff
  - Dauer: 5 Sekunden Sprühen
  - Nachfüllbar: 3 Anwendungen/Dose

- Tränengas-Granate:
  - Wurfweite: 30 Meter
  - Radius: 10 Meter Wolke
  - Dauer: 45 Sekunden
  - Effekt: Sicht -80%, Bewegung -40%, 5 HP/Sek

- Blendgranate:
  - Wurfweite: 35 Meter
  - Radius: 8 Meter volle Wirkung
  - Effekt: 8 Sek Blindheit, 5 Sek Taubheit
  - Schaden: Keine

- Rauchgranate:
  - Wurfweite: 30 Meter
  - Radius: 15 Meter Wolke
  - Dauer: 60 Sekunden
  - Sicht-Blockierung: 100% (im Inneren)

**Ziel-System:**
- Freies Zielen: Keine Hilfe, volle Kontrolle
- Ziel-Assistent: Leichtes Magnetismus zu Gegnern (optional)
- Lock-On: Automatisches Verfolgen (nur Singleplayer)
- Schwachstellen-Anzeige: Bei Scannern
- Entfernungs-Messer: Bei Sniper-Rifle

### 3.3 CROWD-CONTROL-WAFFEN
**Wasserwerfer:**
- Reichweite: 60 Meter
- Wasserdruck: Wirft NPCs um (bis 5 Meter zurück)
- Kapazität: 10.000 Liter (500 Sekunden)
- Strahl-Breite: 1 Meter (fokussiert) oder 5 Meter (breit)
- Fahrzeug-montiert: Ja (Einsatzwagen)
- Crowd-Effekt: Zerstreut Gruppen im 10m Radius

**Tränengas-Kanone:**
- Reichweite: 100 Meter
- Projektil: Tränengas-Granaten (6er Magazine)
- Effekt: 15 Meter Radius Wolke
- Dauer: 60 Sekunden
- Feuerrate: 1 Granate/3 Sekunden

**Schallkanone (LRAD):**
- Reichweite: 300 Meter
- Schmerzschwelle: 150 dB
- Effekt: Desorientierung, Übelkeit, Panik
- Dauer: Kontinuierlich bis abgeschaltet
- Crowd-Effekt: NPCs fliehen aus 50m Radius
- Gesundheit: -5 HP/Sek bei direkter Exposition

**Gummigeschoss-Werfer:**
- Reichweite: 50 Meter
- Schaden: 40 HP (nicht-letal bei Torso)
- Magazin: 6 Schuss
- Feuerrate: 1 Schuss/Sekunde
- Knockback: 3 Meter
- Kritische Treffer: Kopf = 100 HP (potentiell letal)

---

## 4. NPC-VERHALTEN & KI

### 4.1 NPC-TYPEN & EIGENSCHAFTEN
**Zivilist (Neutral):**
- Gesundheit: 80 HP
- Geschwindigkeit: 1,2 m/s (gehen), 3,5 m/s (rennen)
- Kampffähigkeit: Keine / Minimal
- Moral: 50/100 (Standard)
- Reaktion auf Spieler: Ignoriert, außer bei Interaktion
- Flucht-Schwelle: Bei 30 HP oder Waffengebrauch in Nähe
- Kooperation: 80% (folgt Befehlen bei hoher Autorität)

**Demonstrant (Friedlich):**
- Gesundheit: 90 HP
- Geschwindigkeit: 1,3 m/s (gehen), 4,0 m/s (rennen)
- Kampffähigkeit: Unbewaffnet (8 HP Schlag)
- Moral: 40/100
- Reaktion auf Spieler: Verbal aggressiv, physisch passiv
- Eskalations-Schwelle: Wird aggressiv bei Gewalt gegen Gruppe
- Gruppendynamik: Folgt Crowd-Entscheidungen (85% Konformität)

**Demonstrant (Aggressiv):**
- Gesundheit: 100 HP
- Geschwindigkeit: 1,4 m/s, 4,5 m/s (rennen)
- Kampffähigkeit: Wurfgegenstände (15 HP), Nahkampf (12 HP)
- Moral: 20/100
- Reaktion auf Spieler: Provokativ, bereit zu kämpfen
- Waffen: Steine, Flaschen, Molotowcocktails
- Gruppendynamik: Initiiert Eskalationen

**Randalierer:**
- Gesundheit: 110 HP
- Geschwindigkeit: 1,5 m/s, 5,0 m/s
- Kampffähigkeit: Nahkampf (15 HP), Wurfwaffen (20 HP)
- Moral: 10/100
- Reaktion auf Spieler: Angriff bei Sichtkontakt
- Waffen: Eisenstangen, Baseballschläger, Molotows
- Zerstörung: Greift Eigentum an (Autos, Fenster, Geschäfte)
- Flucht: Nur bei <20 HP oder Überzahl

**Extremist:**
- Gesundheit: 120 HP
- Geschwindigkeit: 1,6 m/s, 5,5 m/s
- Kampffähigkeit: Bewaffnet (Pistole 30 HP, Messer 25 HP)
- Moral: 5/100
- Reaktion auf Spieler: Tödliche Gewalt ohne Warnung
- Waffen: Schusswaffen, Sprengstoff, Messer
- Taktik: Nutzt Deckung, koordinierte Angriffe
- Flucht: Niemals (kämpft bis zum Tod)

**Terrorist:**
- Gesundheit: 150 HP + Rüstung (50 HP)
- Geschwindigkeit: 1,5 m/s, 5,0 m/s
- Kampffähigkeit: Militärisch trainiert (alle Waffen)
- Moral: 0/100
- Reaktion auf Spieler: Sofortiger Beschuss
- Waffen: Automatikwaffen, Granaten, IEDs
- Taktik: Professionelle Militär-Formationen
- Ziel: Maximales Chaos, Geiselnahmen

**Unterstützer (Pro-Polizei):**
- Gesundheit: 85 HP
- Geschwindigkeit: 1,2 m/s, 3,8 m/s
- Kampffähigkeit: Minimal, defensiv
- Moral: 70/100
- Reaktion auf Spieler: Positiv, kooperativ
- Verhalten: Informiert über Vorfälle, hilft bei Festnahmen
- Schutz-Priorität: Hoch (Spieler sollte schützen)

**Journalist:**
- Gesundheit: 75 HP
- Geschwindigkeit: 1,3 m/s, 4,2 m/s
- Kampffähigkeit: Keine
- Moral: 60/100 (Neutral)
- Reaktion auf Spieler: Dokumentiert Aktionen
- Spezial: Beeinflusst Reputation (+/- basierend auf Verhalten)
- Schutz: Internationale Konsequenzen bei Tod

**Polizist (Verbündeter):**
- Gesundheit: 150 HP + Rüstung (100 HP)
- Geschwindigkeit: 1,4 m/s, 4,8 m/s
- Kampffähigkeit: Polizei-Training (alle Waffen)
- Moral: 80/100
- Reaktion auf Spieler: Unterstützt bei Missionen
- Waffen: Pistole, Schlagstock, Schild
- Taktik: Formations-basiert, defensiv
- KI: Folgt Spieler-Befehlen (Halt, Angriff, Rückzug)

### 4.2 VERHALTENSBAUM-LOGIK
**Entscheidungshierarchie (Priority-based):**
```
1. ÜBERLEBEN (Höchste Priorität)
   - Gesundheit <30 HP → Flucht suchen
   - Feuer in Nähe → Sofort fliehen
   - Explosion → Zu Boden werfen
   - Waffenbedrohung → Hände heben / Fliehen

2. GRUPPE/CROWD-DYNAMIK
   - Crowd-Stimmung = Panisch → Massenpanik
   - Crowd-Stimmung = Aggressiv → Gruppe angreifen
   - Anführer-Befehl → Folgen (85% Wahrscheinlichkeit)
   - Freund verletzt → Helfen oder rächen

3. MISSION/ZIEL
   - Demonstrieren → Zu Protest-Punkt gehen
   - Plündern → Geschäfte aufbrechen
   - Angriff → Polizei angreifen
   - Flucht → Sicheren Ort suchen

4. SELBST-ERHALTUNG
   - Ausdauer <20 → Pause machen
   - Verletzt → Deckung suchen
   - Allein gegen Überzahl → Fliehen

5. SOZIALE INTERAKTION
   - NPC in Nähe → Sprechen
   - Gruppe bilden → Mit anderen zusammenschließen
   - Gerüchte → Informationen austauschen
```

**Situations-Bewertung (Decision-Making):**
```
Threat Level Assessment:
- Spieler Waffe gezogen = Bedrohung +40
- Spieler aggressiv = Bedrohung +20
- Polizei in Sicht = Bedrohung +10
- Schüsse in Nähe = Bedrohung +60
- Explosion = Bedrohung +80
- Crowd aggressiv = Bedrohung +30

Bei Bedrohung >50 → Defensive Haltung
Bei Bedrohung >80 → Flucht
Bei Bedrohung >100 → Panik
```

**Emotions-System:**
- Wut: 0-100 (erhöht durch Ungerechtigkeit, Gewalt gegen Freunde)
- Angst: 0-100 (erhöht durch Waffen, Überzahl, Tod in Nähe)
- Mut: 0-100 (erhöht durch Gruppengröße, Erfolge)
- Moral: 0-100 (Vertrauen in eigene Sache)

**Emotions-Einfluss auf Verhalten:**
```
Wut >70 → Angriffslust +50%, Flucht-Schwelle +30
Angst >70 → Flucht-Tendenz +80%, Kampf-Fähigkeit -40%
Mut >70 → Ignoriert Bedrohung bis 80, Kampf-Bonus +30%
Moral <30 → Desertions-Wahrscheinlichkeit +60%
```

### 4.3 CROWD-VERHALTEN
**Crowd-States:**
```
NEUTRAL (0-20% Erregung):
- NPCs gehen normal umher
- Sprechen miteinander
- Keine koordinierte Aktion
- Reagiert kaum auf Spieler

ANGESPANNT (20-40% Erregung):
- NPCs bilden Gruppen
- Mehr verbale Aggressionen
- Erste Provokationen
- Beobachten Polizei misstrauisch

DEMONSTRATIV (40-60% Erregung):
- Organisierte Proteste
- Sprechchöre, Plakate
- Blockieren von Straßen
- Friedlich aber bestimmt

AGGRESSIV (60-80% Erregung):
- Werfen von Gegenständen
- Erste Gewalttaten
- Angriffe auf Eigentum
- Konfrontation mit Polizei

RIOT (80-100% Erregung):
- Massenchaos
- Plünderungen
- Angriffe auf Polizei
- Brände und Zerstörung
- Gruppenangriffe koordiniert
```

**Crowd-Dynamics:**
- Herdentrieb: 85% folgen der Mehrheit
- Anführer-Einfluss: 1 Charismatischer NPC beeinflusst 20 NPCs
- Stimmungs-Übertragung: Wut/Angst verbreitet sich 5m/Sekunde
- Schwellenwert-Effekte: Bei kritischer Masse (>50 NPCs) schnelle Eskalation
- De-Eskalation: Autoritäts-Figuren können Crowd beruhigen (-10%/Min)

**Formations-Verhalten:**
```
DEMONSTRATION-FORMATION:
- Dichte Gruppe (1 NPC/m²)
- Langsame Bewegung (0,8 m/s)
- Laute Rufe, Schilder
- Hält zusammen

ANGRIFFS-FORMATION:
- Lockere Linie (0,5 NPC/m²)
- Vorderste werfen, hintere nachfüllen
- Rückzug bei Gegenwehr
- Reorganisation nach 10 Sek

FLUCHT-FORMATION:
- Chaotische Streuung
- Jeder für sich
- Sucht nächsten Ausgang
- Stampede-Gefahr (NPCs können andere niedertrampeln)

BELAGERUNGS-FORMATION:
- Umkreist Ziel (Gebäude, Fahrzeug)
- Rotiert um Objekt
- Sucht Schwachstellen
- Koordinierte Angriffe
```

### 4.4 DIALOG & KOMMUNIKATION
**Dialog-Arten:**
- Befehl: Spieler gibt Order ("Hände hoch!", "Gehen Sie!")
- Verhandlung: Spieler versucht zu überzeugen
- Verhör: Nach Festnahme, Informationen erlangen
- Smalltalk: Vertrauen aufbauen
- Bedrohung: Einschüchterung

**Reaktions-System:**
```
NPC-Reaktion abhängig von:
1. Spieler Autorität (0-100): Höher = mehr Gehorsam
2. NPC Moral (0-100): Niedriger = leichter zu brechen
3. Situations-Kontext: Allein vs. Gruppe
4. Vorige Interaktionen: Hat Spieler Wort gehalten?
5. Witness-Effekt: Andere NPCs beobachten?

Reaktions-Wahrscheinlichkeit:
Gehorsam = (Autorität + (100-Moral) + Kontext-Bonus) / 3
Bei Gehorsam >50% → NPC folgt Befehl
Bei Gehorsam <30% → NPC widersetzt sich
Bei 30-50% → NPC zögert, kann überzeugt werden
```

**Dialog-Optionen:**
```
BEFEHL-MODUS:
- "Hände hoch!" → Surrender (75% bei Autorität >50)
- "Weg hier!" → Flüchten (90% bei Waffe gezogen)
- "Zu Boden!" → Hinlegen (60% bei aggressiver Haltung)
- "Festnahme!" → NPC gibt auf oder kämpft

VERHANDLUNGS-MODUS:
- "Beruhigen Sie sich" → Deeskalation
- "Das ist illegal" → Autorität zeigen
- "Wir können reden" → Friedliche Lösung
- "Sie haben noch Zeit zu gehen" → Letzte Warnung

VERHÖR-MODUS:
- "Wer ist Ihr Anführer?" → Information
- "Was ist geplant?" → Intel über Mission
- "Wo sind die anderen?" → Standorte
- "Kooperieren Sie!" → Drohung für schnelle Antwort

SMALLTALK-MODUS:
- "Alles in Ordnung?" → Freundlich
- "Wie geht es Ihnen?" → Empathie
- "Brauchen Sie Hilfe?" → Vertrauen aufbauen
- "Ich verstehe Sie" → Deeskalation
```

**Dynamische Dialoge:**
- 300+ einzigartige Dialog-Zeilen pro NPC-Typ
- Kontext-abhängige Antworten (Wetter, Tageszeit, Event)
- Stimmungs-basierte Variationen (wütend, ängstlich, höflich)
- Geschlechts- und Alters-spezifische Dialoge
- Regional-Dialekt (Wienerisch)

---

## 5. CROWD-SIMULATION

### 5.1 CROWD-PARAMETER
**Crowd-Größe:**
- Klein: 10-30 NPCs
- Mittel: 30-100 NPCs
- Groß: 100-300 NPCs
- Masse: 300-500 NPCs
- Kritisch: 500+ NPCs (Maximum)

**Crowd-Dichte:**
- Locker: 0,3 NPCs/m² (normale Bewegung)
- Normal: 0,6 NPCs/m² (eingeschränkte Bewegung)
- Dicht: 1,0 NPCs/m² (langsame Bewegung)
- Gestaut: 1,5 NPCs/m² (kaum Bewegung)
- Kritisch: 2,0+ NPCs/m² (Stampede-Gefahr)

**Bewegungs-Muster:**
```
FREI UMHER:
- NPCs wählen zufällige Ziele
- Keine Formation
- Individuelle Routen

PROZESSION:
- NPCs folgen vorgegebener Route
- Dichte Formation
- Gleichmäßige Geschwindigkeit

VERSAMMLUNG:
- NPCs strömen zu Zentrum
- Kreisförmige Anordnung
- Ständige Neupositionierung

FLUCHT:
- NPCs suchen nächsten Ausgang
- Chaotische Bewegung
- Gegenseitiges Behindern

BLOCKADE:
- NPCs bilden Linie/Kreis
- Statische Positionen
- Koordinierte Bewegung bei Durchbruch
```

### 5.2 CROWD-ESKALATION
**Eskalations-Stufen:**
```
STUFE 0 - FRIEDLICH:
- 0% Gewalt-Wahrscheinlichkeit
- NPCs sprechen, singen
- Keine Konfrontation
- Polizei-Präsenz akzeptiert

STUFE 1 - VERBAL AGGRESSIV:
- 10% Gewalt-Wahrscheinlichkeit
- Beleidigungen gegen Polizei
- Erste Provokationen
- Ignorieren von Befehlen

STUFE 2 - PHYSISCH KONFRONTATIV:
- 30% Gewalt-Wahrscheinlichkeit
- Schubsen, Blockieren
- Werfen weicher Objekte (Papier)
- Sitzen vor Polizei

STUFE 3 - GEWALTTÄTIG:
- 60% Gewalt-Wahrscheinlichkeit
- Werfen harter Objekte (Steine)
- Angriffe auf Ausrüstung
- Erste Verletzungen

STUFE 4 - RIOT:
- 90% Gewalt-Wahrscheinlichkeit
- Brandsätze, Waffen
- Angriffe auf Personen
- Plünderungen
- Koordinierte Gewalt

STUFE 5 - AUFSTAND:
- 100% Gewalt-Wahrscheinlichkeit
- Militante Organisation
- Schusswaffen-Einsatz
- Gezielte Tötungen
- Territoriale Kontrolle
```

**Eskalations-Trigger:**
```
+5% Eskalation:
- Laute Befehle
- Polizei-Präsenz erhöht
- Straßensperren errichtet

+10% Eskalation:
- Festnahme eines Demonstranten
- Tränengas-Einsatz
- Wasserwerfer-Einsatz

+20% Eskalation:
- Schlagstock-Einsatz
- Verletzung eines NPC
- Ungerechtfertigte Gewalt

+40% Eskalation:
- Schusswaffen-Einsatz
- Tod eines Demonstranten
- Massenfestnahmen

+60% Eskalation:
- Tod eines Kindes/Unbeteiligten
- Brutale Übergriffe gefilmt
- Systematische Gewalt
```

**De-Eskalations-Möglichkeiten:**
```
-5% Eskalation:
- Friedliche Kommunikation
- Rückzug der Polizei
- Raum geben

-10% Eskalation:
- Verhandlungen mit Anführern
- Zugeständnisse machen
- Sanitäter zulassen

-20% Eskalation:
- Gefangene freilassen
- Gewalt einstellen
- Entschuldigung

-40% Eskalation:
- Politische Lösung
- Mission beenden
- Amnestie
```

### 5.3 CROWD-KI-OPTIMIERUNG
**Performance-LOD (Level of Detail):**
```
DISTANZ 0-20m (VOLLE SIMULATION):
- Individuelles Pathfinding
- Vollständiger Behavior-Tree
- Alle Animationen
- Volle Kollision

DISTANZ 20-50m (REDUZIERT):
- Vereinfachtes Pathfinding
- Basis-Behaviors nur
- LOD-Animationen
- Simplified Collision

DISTANZ 50-100m (MINIMAL):
- Grid-basierte Bewegung
- Nur Crowd-State
- Idle/Walk Animationen
- Keine Kollision

DISTANZ 100m+ (CULLED):
- Nur Statistik (kein Render)
- Position-Tracking nur
- Keine Animation
- Keine Kollision
```

**Batch-Processing:**
- NPCs in 10x10m Sektoren gruppiert
- Sektor-basierte Berechnung
- Shared-State für Sektor
- 500 NPCs @ 60 FPS möglich

---

## 6. MORAL & ESKALATIONS-SYSTEM

### 6.1 MORAL-SCORE
**Tracking-System:**
```
Moral-Score: -100 (Brutal) bis +100 (Heilig)
Start-Wert: 0 (Neutral)

Moralische Aktionen (+Punkte):
+1: Verletzte versorgen
+2: NPC vor Gewalt retten
+3: Friedliche Lösung finden
+5: Mission gewaltlos lösen
+8: Korruption ablehnen
+10: Leben retten (direkt)
+15: Massive Zivilisten-Rettung
+20: Verschwörung aufdecken

Unmoralische Aktionen (-Punkte):
-1: NPC unnötig festnehmen
-2: Übermäßige Gewalt
-3: Eigentum zerstören
-5: Unbeteiligte verletzen
-8: Korruption akzeptieren
-10: Unschuldige töten
-15: Kriegsverbrechen (Folter)
-20: Massenmord
-30: Genozid-Befehle folgen
```

**Moral-Konsequenzen:**
```
HEILIG (+80 bis +100):
- NPCs verehren dich
- Demonstranten geben freiwillig auf
- Medien-Unterstützung: 100%
- Politische Karriere möglich
- Finales Ende: "Hero of Vienna"

GUT (+40 bis +79):
- NPCs respektieren dich
- Kooperation hoch
- Medien-Unterstützung: 75%
- Beförderung wahrscheinlich
- Finales Ende: "Ehrenhafter Beamter"

NEUTRAL (-39 bis +39):
- Standard-Behandlung
- Mixed Reaktionen
- Medien-Unterstützung: 50%
- Karriere stagniert
- Finales Ende: "Der Opportunist"

BÖSE (-40 bis -79):
- NPCs fürchten dich
- Widerstand intensiviert
- Medien-Unterstützung: 25%
- Interne Ermittlungen
- Finales Ende: "Gefallener Cop"

MONSTER (-80 bis -100):
- NPCs hassen dich
- Extremisten rekrutieren gegen dich
- Medien-Unterstützung: 0%
- Kriegsgericht droht
- Finales Ende: "Der Schlächter"
```

### 6.2 REPUTATIONS-SYSTEM
**Fraktions-Reputation:**
```
POLIZEI:
+Rep: Missionen erfolgreich, Befehle folgen, Kollegen retten
-Rep: Befehle verweigern, Korruption, Kollegen gefährden
Effekte: Unterstützung im Feld, Ausrüstung, Backup-Geschwindigkeit

REGIERUNG:
+Rep: Ordnung herstellen, Riots beenden, Gehorsam
-Rep: Skandale, Medien-Negativ-Berichte, Versagen
Effekte: Politische Karriere, Ressourcen, Immunität

ZIVILISTEN:
+Rep: Schützen, Helfen, Faire Behandlung
-Rep: Gewalt, Ungerechtigkeit, Ignoranz
Effekte: Informanten, Kooperation, Sicherheit

DEMONSTRANTEN:
+Rep: Friedliche Lösungen, Verständnis zeigen, Verhandeln
-Rep: Gewalt, Festnahmen, Brutalität
Effekte: Eskalations-Geschwindigkeit, Intel, Friedens-Optionen

MEDIEN:
+Rep: Transparenz, Gute Taten, PR-Events
-Rep: Skandale, Gewalt auf Kamera, Lügen
Effekte: Öffentliche Meinung, Karriere, Missionen

EXTREMISTEN:
+Rep: (Paradox) Schwäche zeigen, Chaos zulassen
-Rep: Effektive Polizeiarbeit, Netzwerke zerstören
Effekte: Angriffs-Intensität, Terror-Events
```

**Reputation-Dynamik:**
- Reputation ändert sich in Echtzeit
- Fraktionen beeinflussen sich gegenseitig
- Kompromisse nötig (eine Fraktion zufriedenstellen = andere verärgern)
- Langzeit-Konsequenzen (Entscheidungen in Level 1 beeinflussen Level 5)

### 6.3 WITNESS-SYSTEM
**Zeuge-Mechanik:**
```
ZEUGE ANWESEND:
- NPCs: Sehen Gewalttat
- Journalisten: Filmen Gewalttat
- Bodycams: Zeichnen auf (wenn aktiv)
- CCTV: Kameras in Umgebung

KONSEQUENZEN:
Mit Zeugen:
- -2x Moral-Penalty
- Medien-Berichterstattung
- Interne Ermittlung
- Öffentlicher Aufschrei

Ohne Zeugen:
- Normale Moral-Penalty
- Keine Medien
- "Es passiert nichts" (kurzfristig)
- Gerüchte (langfristig)

ZEUGEN MANIPULIEREN:
- Einschüchtern: Zeugen schweigen (Moral -5)
- Bestechen: Zeugen lügen (Moral -10, Kosten 1000€)
- Eliminieren: Zeuge stirbt (Moral -30, aber keine Beweise)
- Überzeugen: Zeuge versteht Kontext (Moral +2, schwierig)
```

**Beweis-System:**
```
BEWEIS-TYPEN:
- Video-Aufnahmen (Journalisten, Bodycams, CCTV)
- Zeugenaui<parameter name="file_text"># 🎮 CORONA CONTROL ULTIMATE - KOMPLETTE SPIELMECHANIK-SPEZIFIKATION
## VOLLSTÄNDIGE SPIELREGELN & SYSTEM-LOGIK FÜR GEMINI CODER

---

```
╔═══════════════════════════════════════════════════════════════════════════════════╗
║                                                                                   ║
║             🚔 CORONA CONTROL ULTIMATE - GAME MECHANICS BIBLE 🚔                  ║
║                                                                                   ║
║   BRUTALES, REALISTISCHES POLIZEI-SIMULATIONS-ACTION-SPIEL                       ║
║   KEINE MORAL • KEINE LIMITS • PURE REALITÄT                                     ║
║                                                                                   ║
║   Target: AAA-Qualität | Open-World Wien | 500+ NPCs | Branching Story          ║
║   Style: Brutal-Realistisch | Keine Zensur | Echte Konsequenzen                 ║
║                                                                                   ║
╚═══════════════════════════════════════════════════════════════════════════════════╝
```

---

## 📖 INHALTSVERZEICHNIS

1. [KERN-SPIELKONZEPT](#1-kern-spielkonzept)
2. [SPIELER-MECHANIKEN](#2-spieler-mechaniken)
3. [KAMPF-SYSTEM](#3-kampf-system)
4. [NPC-VERHALTEN & KI](#4-npc-verhalten--ki)
5. [CROWD-SIMULATION](#5-crowd-simulation)
6. [MORAL & ESKALATIONS-SYSTEM](#6-moral--eskalations-system)
7. [MISSIONS-STRUKTUR](#7-missions-struktur)
8. [LEVEL-DESIGN & GEBIETE](#8-level-design--gebiete)
9. [DIALOG-SYSTEM](#9-dialog-system)
10. [INVENTAR & AUSRÜSTUNG](#10-inventar--ausrüstung)
11. [FAHRZEUG-SYSTEM](#11-fahrzeug-system)
12. [ZERSTÖRUNGS-MECHANIK](#12-zerstörungs-mechanik)
13. [WETTER & UMWELT](#13-wetter--umwelt)
14. [WIRTSCHAFTS-SYSTEM](#14-wirtschafts-system)
15. [FORTSCHRITTS-SYSTEM](#15-fortschritts-system)
16. [MULTIPLAYER-ELEMENTE](#16-multiplayer-elemente)
17. [BRANCHING STORY & ENDEN](#17-branching-story--enden)
18. [ACHIEVEMENT-SYSTEM](#18-achievement-system)
19. [SCHWIERIGKEITSGRADE](#19-schwierigkeitsgrade)
20. [SPIEL-MODI](#20-spiel-modi)
21. [AUDIO-SYSTEM](#21-audio-system)
22. [PHYSIK-SIMULATION](#22-physik-simulation)
23. [KAMERA & STEUERUNG](#23-kamera--steuerung)
24. [HUD & UI-SYSTEME](#24-hud--ui-systeme)
25. [SPEICHER & CHECKPOINT-SYSTEM](#25-speicher--checkpoint-system)

---

## 1. KERN-SPIELKONZEPT

### 1.1 SPIEL-PRÄMISSE
Du bist ein österreichischer Polizeibeamter in Wien während einer massiven Corona-Krise. Die Stadt ist im Ausnahmezustand, Proteste eskalieren täglich, die Bevölkerung ist gespalten. Deine Entscheidungen bestimmen nicht nur das Schicksal einzelner Bürger, sondern die Zukunft der gesamten Stadt.

**KEINE MORALISCHEN LIMITS:**
- Realistische Gewalt ohne Zensur
- Brutale Crowd-Control-Methoden erlaubt
- Korruption und Bestechung möglich
- Kollateralschäden haben echte Konsequenzen
- Jede Aktion wird von der Bevölkerung bewertet

### 1.2 KERN-GAMEPLAY-SCHLEIFE
```
Mission erhalten → Gebiet erkunden → Situation bewerten → 
Taktik wählen → Ausführen → Konsequenzen erleben → 
Reputation ändert sich → Neue Optionen freischalten → Repeat
```

### 1.3 SPIELZIELE
**Hauptziel:** Stabilität in Wien wiederherstellen
**Sekundärziele:**
- Persönliche Karriere aufbauen (oder zerstören)
- Vertrauen der Bevölkerung gewinnen/verlieren
- Geheime Verschwörung aufdecken
- 5 verschiedene Enden erreichen je nach Moral-Score

---

## 2. SPIELER-MECHANIKEN

### 2.1 BEWEGUNGS-SYSTEM
**Basis-Bewegung:**
- Gehen: 1,4 m/s (Standard-Geschwindigkeit)
- Laufen: 4,5 m/s (Sprint, begrenzte Ausdauer)
- Schleichen: 0,8 m/s (reduziert Geräusche um 70%)
- Rückwärts: 1,0 m/s
- Seitwärts-Strafe: 1,2 m/s

**Erweiterte Bewegung:**
- Klettern: Über Zäune (1,2m), Mauern (1,8m), Gebäude
- Springen: 0,8m Höhe, 1,5m Weite
- Rollen: Nach Sprint-Sprung, 30% weniger Fallschaden
- Ducken: Unter Hindernissen, hinter Deckung
- Gleiten: An Leitern, Geländern
- Schwimmen: In Donau, Brunnen (begrenzte Luft: 60 Sekunden)

**Ausdauer-System:**
- Maximale Ausdauer: 100 Punkte
- Sprint-Verbrauch: 20 Punkte/Sekunde
- Regeneration: 15 Punkte/Sekunde (nach 2 Sekunden Pause)
- Nahkampf-Verbrauch: 5-15 Punkte pro Aktion
- Klettern-Verbrauch: 10 Punkte/Sekunde
- Schwimmen-Verbrauch: 8 Punkte/Sekunde
- Bei 0 Ausdauer: 50% Bewegungsgeschwindigkeit, kann nicht sprinten

**Physik-Interaktion:**
- Charaktergewicht: 80kg + Ausrüstung (5-25kg)
- Trägheit bei Richtungswechsel
- Rutschige Oberflächen (Eis, Blut): -40% Grip
- Steigungen: >30° = -25% Geschwindigkeit
- Tiefes Wasser: -60% Bewegung
- Getroffen werden: Knockback basierend auf Waffenimpuls

### 2.2 KAMERA-SYSTEM
**Perspektiven:**
- Third-Person (Standard): 2,5m Abstand, 1,5m Höhe
- Third-Person Nah: 1,2m Abstand für Nahkampf
- Aim-Perspektive: Over-Shoulder, 0,8m Abstand
- Fahrzeug-Perspektive: Mehrere Positionen (Hood, Bumper, Chase)

**Kamera-Physik:**
- Dynamische Kollision mit Wänden
- Screen-Shake bei Explosionen (0,1 - 2,0 Intensität)
- Motion-Blur bei schneller Bewegung
- Depth-of-Field beim Zielen
- Automatisches Umschauen zu wichtigen Events

**Kamera-Einstellungen:**
- FOV: 60-120 Grad (Standard: 90)
- Sensitivität: 0,1 - 5,0
- Invertierte Y-Achse: Optional
- Kamera-Abstand: 1,0 - 4,0 Meter
- Kamera-Höhe: -1,0 - 2,0 Meter Offset

### 2.3 INTERAKTIONS-SYSTEM
**Objekt-Interaktion:**
- Türen: Öffnen, Schließen, Eintreten, Aufbrechen
- Fahrzeuge: Einsteigen, Aussteigen, Beschlagnahmen
- Items: Aufheben (max 50kg), Tragen, Werfen (bis 15 Meter)
- Schalter: Aktivieren, Deaktivieren
- NPCs: Sprechen, Festnehmen, Durchsuchen, Verhören

**Umwelt-Interaktion:**
- Deckung nutzen: Automatisch bei Nähe zu Objekten >1,2m Höhe
- Fenster: Zerbrechen (50 HP Schaden wenn nicht geduckt)
- Leitern: Automatisches Klettern
- Treppen: Laufen, Rutschen (Geländer)
- Wasser: Schwimmen, Tauchen (60 Sek Luft)

**Kontext-Aktionen:**
- Dynamische Aktions-Prompts basierend auf Situation
- Mehrfach-Optionen bei komplexen Objekten
- Schnell-Events (Quick-Time-Events) bei kritischen Momenten
- Verzögerte Interaktionen (z.B. Türen aufbrechen: 3 Sekunden)

### 2.4 GESUNDHEITS-SYSTEM
**Gesundheits-Punkte (HP):**
- Maximum: 100 HP
- Regeneration: KEINE automatische Regeneration
- Heilung nur durch: Medikit (+50 HP), Erste-Hilfe (+25 HP), Krankenhaus (+100 HP)
- Kritische Gesundheit: <20 HP (verzerrte Vision, reduzierte Bewegung)

**Schadens-Typen:**
- Stumpfes Trauma: Schlagstock, Fäuste (5-20 HP)
- Scharfe Waffen: Messer, Glas (15-50 HP)
- Schusswaffen: 20-100 HP (abhängig von Kaliber & Treffer-Zone)
- Explosionen: 30-100 HP + Ragdoll-Effekt
- Feuer: 10 HP/Sekunde + Panik-Status
- Chemische Waffen: 5 HP/Sekunde + Blindheit
- Sturz: 10 HP pro Meter über 3m Fallhöhe
- Fahrzeug-Kollision: 20-100 HP basierend auf Geschwindigkeit

**Körperteile-System:**
- Kopf: 2x Schaden-Multiplikator
- Torso: 1x Standard-Schaden
- Arme: 0,7x Schaden (beeinflusst Ziel-Genauigkeit)
- Beine: 0,8x Schaden (beeinflusst Bewegungsgeschwindigkeit)
- Rücken: 1,2x Schaden (keine Rüstung)

**Status-Effekte:**
- Blutung: -2 HP/Sekunde (bis Verband angelegt)
- Betäubt: 5 Sekunden Bewegungsunfähigkeit
- Tränengas: -50% Sicht, -30% Bewegung (20 Sekunden)
- Pfefferspray: -80% Sicht, -50% Bewegung (15 Sekunden)
- Feuer: -10 HP/Sek, Panik-Animation (bis gelöscht)
- Vergiftet: -1 HP/Sek (60 Sekunden)
- Kälte: -5 HP alle 30 Sek (unter 0°C ohne Schutz)
- Hitze: -3 HP alle 20 Sek (über 35°C in voller Ausrüstung)

**Tod & Respawn:**
- Bei 0 HP: Spieler stirbt
- Respawn-Optionen:
  - Letzter Checkpoint (Mission-Start)
  - Krankenhaus (kostet 500€, verliert 10% Reputation)
  - Mission abbrechen (verliert allen Fortschritt)
- Permadeath-Modus: Verfügbar (1 Leben pro Kampagne)

---

## 3. KAMPF-SYSTEM

### 3.1 NAHKAMPF-MECHANIK
**Unbewaffneter Kampf:**
- Leichte Schläge: 8 HP Schaden, 0,5 Sek Cooldown, 5 Ausdauer
- Schwere Schläge: 15 HP Schaden, 1,2 Sek Cooldown, 12 Ausdauer
- Tritt: 12 HP Schaden, 0,8 Sek Cooldown, 8 Ausdauer, Knockback 1,5m
- Greifen: Immobilisiert Gegner (3 Sek), 15 Ausdauer
- Würgen: 5 HP/Sek während Griff
- Kopfstoß: 20 HP Schaden (zu Gegner & Spieler), 1,5 Sek Stun

**Schlagstock-Kampf:**
- Leichter Schlag: 15 HP, 0,6 Sek CD, 5 Ausdauer
- Schwerer Schlag: 30 HP, 1,4 Sek CD, 12 Ausdauer
- Schlag-Kombo (3 Hits): 15-20-25 HP
- Betäubungs-Schlag: 25 HP + 5 Sek Stun (Kopf-Treffer)
- Block: Reduziert 50% Schaden, kostet 8 Ausdauer
- Konter-Angriff: Nach perfektem Block = 40 HP Schaden

**Schild-Kampf:**
- Schild-Block: 80% Schadenreduktion (frontal)
- Schild-Bash: 25 HP + 2 Sek Stun + Knockback 2m
- Schild-Wall: Team-Formation (3+ Spieler), 95% Schutz
- Schildstoß: 30 HP + Niederwerfen
- Deckung: Automatisch gegen Projektile

**Erweiterte Nahkampf-Optionen:**
- Festnahme: 3 Sekunden Griff-Dauer → Handschellen anlegen
- Würgen (Nicht-Letal): 10 Sek bis Bewusstlosigkeit
- Würgen (Letal): 30 Sek bis Tod (NUR wenn erlaubt)
- Kopf-gegen-Wand: 50 HP, hoher Moral-Verlust
- Bein-Fegen: Niederwerfen, 10 HP
- Entwaffnen: Waffe aus Hand schlagen (20% Erfolgsrate)

**Nahkampf-Combos:**
```
Combo 1: Leicht → Leicht → Schwer (45 HP, schnell)
Combo 2: Schwer → Tritt → Schlag (57 HP, Knockback)
Combo 3: Block → Konter → Schlag (65 HP, defensive)
Combo 4: Greifen → Knie → Wurf (70 HP, kontrolliert)
Combo 5: Schild-Bash → Schlagstock → Tritt (80 HP, max dmg)
```

### 3.2 FERNKAMPF-MECHANIK
**Schusswaffen-System:**
- Pistole (Glock 17):
  - Schaden: 30 HP (Torso), 60 HP (Kopf)
  - Magazin: 17 Schuss
  - Nachladezeit: 2,1 Sekunden
  - Reichweite: 50 Meter effektiv
  - Feuerrate: Semi-Auto (max 3 Schuss/Sek)
  - Rückstoß: Gering (0,2° pro Schuss)

- Maschinenpistole (MP5):
  - Schaden: 22 HP (Torso), 44 HP (Kopf)
  - Magazin: 30 Schuss
  - Nachladezeit: 2,5 Sekunden
  - Reichweite: 100 Meter effektiv
  - Feuerrate: 800 Schuss/Minute (Voll-Auto)
  - Rückstoß: Mittel (5° über 10 Schuss)

- Sturmgewehr (Steyr AUG):
  - Schaden: 35 HP (Torso), 70 HP (Kopf)
  - Magazin: 30 Schuss
  - Nachladezeit: 3,0 Sekunden
  - Reichweite: 300 Meter effektiv
  - Feuerrate: 680 Schuss/Minute
  - Rückstoß: Hoch (8° über 10 Schuss)

- Schrotflinte (Remington 870):
  - Schaden: 15 HP × 8 Pellets (120 HP nah)
  - Magazin: 7 Schuss
  - Nachladezeit: 0,8 Sek/Patrone
  - Reichweite: 30 Meter effektiv
  - Feuerrate: Pump-Action (1 Schuss/Sek)
  - Streuung: 10° Kegel

- Scharfschützengewehr (Steyr SSG 08):
  - Schaden: 100 HP (Torso), 200 HP (Kopf = Insta-Kill)
  - Magazin: 10 Schuss
  - Nachladezeit: 3,5 Sekunden
  - Reichweite: 800 Meter effektiv
  - Feuerrate: Bolt-Action (0,5 Schuss/Sek)
  - Zielfernrohr: 4x-12x Zoom

**Ballistik & Präzision:**
- Projektil-Geschwindigkeit: 300-900 m/s (waffen-abhängig)
- Bullet-Drop: Realistische Schwerkraft (9,81 m/s²)
- Wind-Einfluss: ±2° Abweichung bei starkem Wind
- Bewegungs-Ungenauigkeit: +50% Streuung beim Laufen
- Ziel-Ungenauigkeit: -30% beim Zielen (ADS)
- Atmen-Schwanken: ±1° Oszillation (eliminierbar durch Atem-Halten)
- Rückstoß-Muster: Waffenspezifisch, lernbar

**Munitions-System:**
- Standard-Munition: Normal-Schaden
- Hohlspitz-Munition: +30% Schaden, -20% Durchschlag
- Panzerbrechend: +50% gegen Rüstung, -10% gegen Fleisch
- Gummi-Geschosse: 20% Schaden, hoher Betäubungseffekt
- Tracer-Munition: Sichtbare Projektil-Spur
- Fragmentierung: +20% Schaden, +50% Blutung

**Nicht-Letale Waffen:**
- Taser:
  - Reichweite: 7 Meter
  - Effekt: 5 Sekunden Lähmung
  - Nachladezeit: 20 Sekunden
  - Munition: 1 Schuss, dann neu laden

- Pfefferspray:
  - Reichweite: 3 Meter Kegel
  - Effekt: 15 Sek Blindheit, 10 Sek Bewegungs-Debuff
  - Dauer: 5 Sekunden Sprühen
  - Nachfüllbar: 3 Anwendungen/Dose

- Tränengas-Granate:
  - Wurfweite: 30 Meter
  - Radius: 10 Meter Wolke
  - Dauer: 45 Sekunden
  - Effekt: Sicht -80%, Bewegung -40%, 5 HP/Sek

- Blendgranate:
  - Wurfweite: 35 Meter
  - Radius: 8 Meter volle Wirkung
  - Effekt: 8 Sek Blindheit, 5 Sek Taubheit
  - Schaden: Keine

- Rauchgranate:
  - Wurfweite: 30 Meter
  - Radius: 15 Meter Wolke
  - Dauer: 60 Sekunden
  - Sicht-Blockierung: 100% (im Inneren)

**Ziel-System:**
- Freies Zielen: Keine Hilfe, volle Kontrolle
- Ziel-Assistent: Leichtes Magnetismus zu Gegnern (optional)
- Lock-On: Automatisches Verfolgen (nur Singleplayer)
- Schwachstellen-Anzeige: Bei Scannern
- Entfernungs-Messer: Bei Sniper-Rifle

### 3.3 CROWD-CONTROL-WAFFEN
**Wasserwerfer:**
- Reichweite: 60 Meter
- Wasserdruck: Wirft NPCs um (bis 5 Meter zurück)
- Kapazität: 10.000 Liter (500 Sekunden)
- Strahl-Breite: 1 Meter (fokussiert) oder 5 Meter (breit)
- Fahrzeug-montiert: Ja (Einsatzwagen)
- Crowd-Effekt: Zerstreut Gruppen im 10m Radius

**Tränengas-Kanone:**
- Reichweite: 100 Meter
- Projektil: Tränengas-Granaten (6er Magazine)
- Effekt: 15 Meter Radius Wolke
- Dauer: 60 Sekunden
- Feuerrate: 1 Granate/3 Sekunden

**Schallkanone (LRAD):**
- Reichweite: 300 Meter
- Schmerzschwelle: 150 dB
- Effekt: Desorientierung, Übelkeit, Panik
- Dauer: Kontinuierlich bis abgeschaltet
- Crowd-Effekt: NPCs fliehen aus 50m Radius
- Gesundheit: -5 HP/Sek bei direkter Exposition

**Gummigeschoss-Werfer:**
- Reichweite: 50 Meter
- Schaden: 40 HP (nicht-letal bei Torso)
- Magazin: 6 Schuss
- Feuerrate: 1 Schuss/Sekunde
- Knockback: 3 Meter
- Kritische Treffer: Kopf = 100 HP (potentiell letal)

---

## 4. NPC-VERHALTEN & KI

### 4.1 NPC-TYPEN & EIGENSCHAFTEN
**Zivilist (Neutral):**
- Gesundheit: 80 HP
- Geschwindigkeit: 1,2 m/s (gehen), 3,5 m/s (rennen)
- Kampffähigkeit: Keine / Minimal
- Moral: 50/100 (Standard)
- Reaktion auf Spieler: Ignoriert, außer bei Interaktion
- Flucht-Schwelle: Bei 30 HP oder Waffengebrauch in Nähe
- Kooperation: 80% (folgt Befehlen bei hoher Autorität)

**Demonstrant (Friedlich):**
- Gesundheit: 90 HP
- Geschwindigkeit: 1,3 m/s (gehen), 4,0 m/s (rennen)
- Kampffähigkeit: Unbewaffnet (8 HP Schlag)
- Moral: 40/100
- Reaktion auf Spieler: Verbal aggressiv, physisch passiv
- Eskalations-Schwelle: Wird aggressiv bei Gewalt gegen Gruppe
- Gruppendynamik: Folgt Crowd-Entscheidungen (85% Konformität)

**Demonstrant (Aggressiv):**
- Gesundheit: 100 HP
- Geschwindigkeit: 1,4 m/s, 4,5 m/s (rennen)
- Kampffähigkeit: Wurfgegenstände (15 HP), Nahkampf (12 HP)
- Moral: 20/100
- Reaktion auf Spieler: Provokativ, bereit zu kämpfen
- Waffen: Steine, Flaschen, Molotowcocktails
- Gruppendynamik: Initiiert Eskalationen

**Randalierer:**
- Gesundheit: 110 HP
- Geschwindigkeit: 1,5 m/s, 5,0 m/s
- Kampffähigkeit: Nahkampf (15 HP), Wurfwaffen (20 HP)
- Moral: 10/100
- Reaktion auf Spieler: Angriff bei Sichtkontakt
- Waffen: Eisenstangen, Baseballschläger, Molotows
- Zerstörung: Greift Eigentum an (Autos, Fenster, Geschäfte)
- Flucht: Nur bei <20 HP oder Überzahl

**Extremist:**
- Gesundheit: 120 HP
- Geschwindigkeit: 1,6 m/s, 5,5 m/s
- Kampffähigkeit: Bewaffnet (Pistole 30 HP, Messer 25 HP)
- Moral: 5/100
- Reaktion auf Spieler: Tödliche Gewalt ohne Warnung
- Waffen: Schusswaffen, Sprengstoff, Messer
- Taktik: Nutzt Deckung, koordinierte Angriffe
- Flucht: Niemals (kämpft bis zum Tod)

**Terrorist:**
- Gesundheit: 150 HP + Rüstung (50 HP)
- Geschwindigkeit: 1,5 m/s, 5,0 m/s
- Kampffähigkeit: Militärisch trainiert (alle Waffen)
- Moral: 0/100
- Reaktion auf Spieler: Sofortiger Beschuss
- Waffen: Automatikwaffen, Granaten, IEDs
- Taktik: Professionelle Militär-Formationen
- Ziel: Maximales Chaos, Geiselnahmen

**Unterstützer (Pro-Polizei):**
- Gesundheit: 85 HP
- Geschwindigkeit: 1,2 m/s, 3,8 m/s
- Kampffähigkeit: Minimal, defensiv
- Moral: 70/100
- Reaktion auf Spieler: Positiv, kooperativ
- Verhalten: Informiert über Vorfälle, hilft bei Festnahmen
- Schutz-Priorität: Hoch (Spieler sollte schützen)

**Journalist:**
- Gesundheit: 75 HP
- Geschwindigkeit: 1,3 m/s, 4,2 m/s
- Kampffähigkeit: Keine
- Moral: 60/100 (Neutral)
- Reaktion auf Spieler: Dokumentiert Aktionen
- Spezial: Beeinflusst Reputation (+/- basierend auf Verhalten)
- Schutz: Internationale Konsequenzen bei Tod

**Polizist (Verbündeter):**
- Gesundheit: 150 HP + Rüstung (100 HP)
- Geschwindigkeit: 1,4 m/s, 4,8 m/s
- Kampffähigkeit: Polizei-Training (alle Waffen)
- Moral: 80/100
- Reaktion auf Spieler: Unterstützt bei Missionen
- Waffen: Pistole, Schlagstock, Schild
- Taktik: Formations-basiert, defensiv
- KI: Folgt Spieler-Befehlen (Halt, Angriff, Rückzug)

### 4.2 VERHALTENSBAUM-LOGIK
**Entscheidungshierarchie (Priority-based):**
```
1. ÜBERLEBEN (Höchste Priorität)
   - Gesundheit <30 HP → Flucht suchen
   - Feuer in Nähe → Sofort fliehen
   - Explosion → Zu Boden werfen
   - Waffenbedrohung → Hände heben / Fliehen

2. GRUPPE/CROWD-DYNAMIK
   - Crowd-Stimmung = Panisch → Massenpanik
   - Crowd-Stimmung = Aggressiv → Gruppe angreifen
   - Anführer-Befehl → Folgen (85% Wahrscheinlichkeit)
   - Freund verletzt → Helfen oder rächen

3. MISSION/ZIEL
   - Demonstrieren → Zu Protest-Punkt gehen
   - Plündern → Geschäfte aufbrechen
   - Angriff → Polizei angreifen
   - Flucht → Sicheren Ort suchen

4. SELBST-ERHALTUNG
   - Ausdauer <20 → Pause machen
   - Verletzt → Deckung suchen
   - Allein gegen Überzahl → Fliehen

5. SOZIALE INTERAKTION
   - NPC in Nähe → Sprechen
   - Gruppe bilden → Mit anderen zusammenschließen
   - Gerüchte → Informationen austauschen
```

**Situations-Bewertung (Decision-Making):**
```
Threat Level Assessment:
- Spieler Waffe gezogen = Bedrohung +40
- Spieler aggressiv = Bedrohung +20
- Polizei in Sicht = Bedrohung +10
- Schüsse in Nähe = Bedrohung +60
- Explosion = Bedrohung +80
- Crowd aggressiv = Bedrohung +30

Bei Bedrohung >50 → Defensive Haltung
Bei Bedrohung >80 → Flucht
Bei Bedrohung >100 → Panik
```

**Emotions-System:**
- Wut: 0-100 (erhöht durch Ungerechtigkeit, Gewalt gegen Freunde)
- Angst: 0-100 (erhöht durch Waffen, Überzahl, Tod in Nähe)
- Mut: 0-100 (erhöht durch Gruppengröße, Erfolge)
- Moral: 0-100 (Vertrauen in eigene Sache)

**Emotions-Einfluss auf Verhalten:**
```
Wut >70 → Angriffslust +50%, Flucht-Schwelle +30
Angst >70 → Flucht-Tendenz +80%, Kampf-Fähigkeit -40%
Mut >70 → Ignoriert Bedrohung bis 80, Kampf-Bonus +30%
Moral <30 → Desertions-Wahrscheinlichkeit +60%
```

### 4.3 CROWD-VERHALTEN
**Crowd-States:**
```
NEUTRAL (0-20% Erregung):
- NPCs gehen normal umher
- Sprechen miteinander
- Keine koordinierte Aktion
- Reagiert kaum auf Spieler

ANGESPANNT (20-40% Erregung):
- NPCs bilden Gruppen
- Mehr verbale Aggressionen
- Erste Provokationen
- Beobachten Polizei misstrauisch

DEMONSTRATIV (40-60% Erregung):
- Organisierte Proteste
- Sprechchöre, Plakate
- Blockieren von Straßen
- Friedlich aber bestimmt

AGGRESSIV (60-80% Erregung):
- Werfen von Gegenständen
- Erste Gewalttaten
- Angriffe auf Eigentum
- Konfrontation mit Polizei

RIOT (80-100% Erregung):
- Massenchaos
- Plünderungen
- Angriffe auf Polizei
- Brände und Zerstörung
- Gruppenangriffe koordiniert
```

**Crowd-Dynamics:**
- Herdentrieb: 85% folgen der Mehrheit
- Anführer-Einfluss: 1 Charismatischer NPC beeinflusst 20 NPCs
- Stimmungs-Übertragung: Wut/Angst verbreitet sich 5m/Sekunde
- Schwellenwert-Effekte: Bei kritischer Masse (>50 NPCs) schnelle Eskalation
- De-Eskalation: Autoritäts-Figuren können Crowd beruhigen (-10%/Min)

**Formations-Verhalten:**
```
DEMONSTRATION-FORMATION:
- Dichte Gruppe (1 NPC/m²)
- Langsame Bewegung (0,8 m/s)
- Laute Rufe, Schilder
- Hält zusammen

ANGRIFFS-FORMATION:
- Lockere Linie (0,5 NPC/m²)
- Vorderste werfen, hintere nachfüllen
- Rückzug bei Gegenwehr
- Reorganisation nach 10 Sek

FLUCHT-FORMATION:
- Chaotische Streuung
- Jeder für sich
- Sucht nächsten Ausgang
- Stampede-Gefahr (NPCs können andere niedertrampeln)

BELAGERUNGS-FORMATION:
- Umkreist Ziel (Gebäude, Fahrzeug)
- Rotiert um Objekt
- Sucht Schwachstellen
- Koordinierte Angriffe
```

### 4.4 DIALOG & KOMMUNIKATION
**Dialog-Arten:**
- Befehl: Spieler gibt Order ("Hände hoch!", "Gehen Sie!")
- Verhandlung: Spieler versucht zu überzeugen
- Verhör: Nach Festnahme, Informationen erlangen
- Smalltalk: Vertrauen aufbauen
- Bedrohung: Einschüchterung

**Reaktions-System:**
```
NPC-Reaktion abhängig von:
1. Spieler Autorität (0-100): Höher = mehr Gehorsam
2. NPC Moral (0-100): Niedriger = leichter zu brechen
3. Situations-Kontext: Allein vs. Gruppe
4. Vorige Interaktionen: Hat Spieler Wort gehalten?
5. Witness-Effekt: Andere NPCs beobachten?

Reaktions-Wahrscheinlichkeit:
Gehorsam = (Autorität + (100-Moral) + Kontext-Bonus) / 3
Bei Gehorsam >50% → NPC folgt Befehl
Bei Gehorsam <30% → NPC widersetzt sich
Bei 30-50% → NPC zögert, kann überzeugt werden
```

**Dialog-Optionen:**
```
BEFEHL-MODUS:
- "Hände hoch!" → Surrender (75% bei Autorität >50)
- "Weg hier!" → Flüchten (90% bei Waffe gezogen)
- "Zu Boden!" → Hinlegen (60% bei aggressiver Haltung)
- "Festnahme!" → NPC gibt auf oder kämpft

VERHANDLUNGS-MODUS:
- "Beruhigen Sie sich" → Deeskalation
- "Das ist illegal" → Autorität zeigen
- "Wir können reden" → Friedliche Lösung
- "Sie haben noch Zeit zu gehen" → Letzte Warnung

VERHÖR-MODUS:
- "Wer ist Ihr Anführer?" → Information
- "Was ist geplant?" → Intel über Mission
- "Wo sind die anderen?" → Standorte
- "Kooperieren Sie!" → Drohung für schnelle Antwort

SMALLTALK-MODUS:
- "Alles in Ordnung?" → Freundlich
- "Wie geht es Ihnen?" → Empathie
- "Brauchen Sie Hilfe?" → Vertrauen aufbauen
- "Ich verstehe Sie" → Deeskalation
```

**Dynamische Dialoge:**
- 300+ einzigartige Dialog-Zeilen pro NPC-Typ
- Kontext-abhängige Antworten (Wetter, Tageszeit, Event)
- Stimmungs-basierte Variationen (wütend, ängstlich, höflich)
- Geschlechts- und Alters-spezifische Dialoge
- Regional-Dialekt (Wienerisch)

---

## 5. CROWD-SIMULATION

### 5.1 CROWD-PARAMETER
**Crowd-Größe:**
- Klein: 10-30 NPCs
- Mittel: 30-100 NPCs
- Groß: 100-300 NPCs
- Masse: 300-500 NPCs
- Kritisch: 500+ NPCs (Maximum)

**Crowd-Dichte:**
- Locker: 0,3 NPCs/m² (normale Bewegung)
- Normal: 0,6 NPCs/m² (eingeschränkte Bewegung)
- Dicht: 1,0 NPCs/m² (langsame Bewegung)
- Gestaut: 1,5 NPCs/m² (kaum Bewegung)
- Kritisch: 2,0+ NPCs/m² (Stampede-Gefahr)

**Bewegungs-Muster:**
```
FREI UMHER:
- NPCs wählen zufällige Ziele
- Keine Formation
- Individuelle Routen

PROZESSION:
- NPCs folgen vorgegebener Route
- Dichte Formation
- Gleichmäßige Geschwindigkeit

VERSAMMLUNG:
- NPCs strömen zu Zentrum
- Kreisförmige Anordnung
- Ständige Neupositionierung

FLUCHT:
- NPCs suchen nächsten Ausgang
- Chaotische Bewegung
- Gegenseitiges Behindern

BLOCKADE:
- NPCs bilden Linie/Kreis
- Statische Positionen
- Koordinierte Bewegung bei Durchbruch
```

### 5.2 CROWD-ESKALATION
**Eskalations-Stufen:**
```
STUFE 0 - FRIEDLICH:
- 0% Gewalt-Wahrscheinlichkeit
- NPCs sprechen, singen
- Keine Konfrontation
- Polizei-Präsenz akzeptiert

STUFE 1 - VERBAL AGGRESSIV:
- 10% Gewalt-Wahrscheinlichkeit
- Beleidigungen gegen Polizei
- Erste Provokationen
- Ignorieren von Befehlen

STUFE 2 - PHYSISCH KONFRONTATIV:
- 30% Gewalt-Wahrscheinlichkeit
- Schubsen, Blockieren
- Werfen weicher Objekte (Papier)
- Sitzen vor Polizei

STUFE 3 - GEWALTTÄTIG:
- 60% Gewalt-Wahrscheinlichkeit
- Werfen harter Objekte (Steine)
- Angriffe auf Ausrüstung
- Erste Verletzungen

STUFE 4 - RIOT:
- 90% Gewalt-Wahrscheinlichkeit
- Brandsätze, Waffen
- Angriffe auf Personen
- Plünderungen
- Koordinierte Gewalt

STUFE 5 - AUFSTAND:
- 100% Gewalt-Wahrscheinlichkeit
- Militante Organisation
- Schusswaffen-Einsatz
- Gezielte Tötungen
- Territoriale Kontrolle
```

**Eskalations-Trigger:**
```
+5% Eskalation:
- Laute Befehle
- Polizei-Präsenz erhöht
- Straßensperren errichtet

+10% Eskalation:
- Festnahme eines Demonstranten
- Tränengas-Einsatz
- Wasserwerfer-Einsatz

+20% Eskalation:
- Schlagstock-Einsatz
- Verletzung eines NPC
- Ungerechtfertigte Gewalt

+40% Eskalation:
- Schusswaffen-Einsatz
- Tod eines Demonstranten
- Massenfestnahmen

+60% Eskalation:
- Tod eines Kindes/Unbeteiligten
- Brutale Übergriffe gefilmt
- Systematische Gewalt
```

**De-Eskalations-Möglichkeiten:**
```
-5% Eskalation:
- Friedliche Kommunikation
- Rückzug der Polizei
- Raum geben

-10% Eskalation:
- Verhandlungen mit Anführern
- Zugeständnisse machen
- Sanitäter zulassen

-20% Eskalation:
- Gefangene freilassen
- Gewalt einstellen
- Entschuldigung

-40% Eskalation:
- Politische Lösung
- Mission beenden
- Amnestie
```

### 5.3 CROWD-KI-OPTIMIERUNG
**Performance-LOD (Level of Detail):**
```
DISTANZ 0-20m (VOLLE SIMULATION):
- Individuelles Pathfinding
- Vollständiger Behavior-Tree
- Alle Animationen
- Volle Kollision

DISTANZ 20-50m (REDUZIERT):
- Vereinfachtes Pathfinding
- Basis-Behaviors nur
- LOD-Animationen
- Simplified Collision

DISTANZ 50-100m (MINIMAL):
- Grid-basierte Bewegung
- Nur Crowd-State
- Idle/Walk Animationen
- Keine Kollision

DISTANZ 100m+ (CULLED):
- Nur Statistik (kein Render)
- Position-Tracking nur
- Keine Animation
- Keine Kollision
```

**Batch-Processing:**
- NPCs in 10x10m Sektoren gruppiert
- Sektor-basierte Berechnung
- Shared-State für Sektor
- 500 NPCs @ 60 FPS möglich

---

## 6. MORAL & ESKALATIONS-SYSTEM

### 6.1 MORAL-SCORE
**Tracking-System:**
```
Moral-Score: -100 (Brutal) bis +100 (Heilig)
Start-Wert: 0 (Neutral)

Moralische Aktionen (+Punkte):
+1: Verletzte versorgen
+2: NPC vor Gewalt retten
+3: Friedliche Lösung finden
+5: Mission gewaltlos lösen
+8: Korruption ablehnen
+10: Leben retten (direkt)
+15: Massive Zivilisten-Rettung
+20: Verschwörung aufdecken

Unmoralische Aktionen (-Punkte):
-1: NPC unnötig festnehmen
-2: Übermäßige Gewalt
-3: Eigentum zerstören
-5: Unbeteiligte verletzen
-8: Korruption akzeptieren
-10: Unschuldige töten
-15: Kriegsverbrechen (Folter)
-20: Massenmord
-30: Genozid-Befehle folgen
```

**Moral-Konsequenzen:**
```
HEILIG (+80 bis +100):
- NPCs verehren dich
- Demonstranten geben freiwillig auf
- Medien-Unterstützung: 100%
- Politische Karriere möglich
- Finales Ende: "Hero of Vienna"

GUT (+40 bis +79):
- NPCs respektieren dich
- Kooperation hoch
- Medien-Unterstützung: 75%
- Beförderung wahrscheinlich
- Finales Ende: "Ehrenhafter Beamter"

NEUTRAL (-39 bis +39):
- Standard-Behandlung
- Mixed Reaktionen
- Medien-Unterstützung: 50%
- Karriere stagniert
- Finales Ende: "Der Opportunist"

BÖSE (-40 bis -79):
- NPCs fürchten dich
- Widerstand intensiviert
- Medien-Unterstützung: 25%
- Interne Ermittlungen
- Finales Ende: "Gefallener Cop"

MONSTER (-80 bis -100):
- NPCs hassen dich
- Extremisten rekrutieren gegen dich
- Medien-Unterstützung: 0%
- Kriegsgericht droht
- Finales Ende: "Der Schlächter von Wien"
```

### 6.2 REPUTATIONS-SYSTEM
**Fraktions-Reputation:**
```
POLIZEI:
+Rep: Missionen erfolgreich, Befehle folgen, Kollegen retten
-Rep: Befehle verweigern, Korruption, Kollegen gefährden
Effekte: Unterstützung im Feld, Ausrüstung, Backup-Geschwindigkeit

REGIERUNG:
+Rep: Ordnung herstellen, Riots beenden, Gehorsam
-Rep: Skandale, Medien-Negativ-Berichte, Versagen
Effekte: Politische Karriere, Ressourcen, Immunität

ZIVILISTEN:
+Rep: Schützen, Helfen, Faire Behandlung
-Rep: Gewalt, Ungerechtigkeit, Ignoranz
Effekte: Informanten, Kooperation, Sicherheit

DEMONSTRANTEN:
+Rep: Friedliche Lösungen, Verständnis zeigen, Verhandeln
-Rep: Gewalt, Festnahmen, Brutalität
Effekte: Eskalations-Geschwindigkeit, Intel, Friedens-Optionen

MEDIEN:
+Rep: Transparenz, Gute Taten, PR-Events
-Rep: Skandale, Gewalt auf Kamera, Lügen
Effekte: Öffentliche Meinung, Karriere, Missionen

EXTREMISTEN:
+Rep: (Paradox) Schwäche zeigen, Chaos zulassen
-Rep: Effektive Polizeiarbeit, Netzwerke zerstören
Effekte: Angriffs-Intensität, Terror-Events
```

**Reputation-Dynamik:**
- Reputation ändert sich in Echtzeit
- Fraktionen beeinflussen sich gegenseitig
- Kompromisse nötig (eine Fraktion zufriedenstellen = andere verärgern)
- Langzeit-Konsequenzen (Entscheidungen in Level 1 beeinflussen Level 5)

### 6.3 WITNESS-SYSTEM
**Zeuge-Mechanik:**
```
ZEUGE ANWESEND:
- NPCs: Sehen Gewalttat
- Journalisten: Filmen Gewalttat
- Bodycams: Zeichnen auf (wenn aktiv)
- CCTV: Kameras in Umgebung

KONSEQUENZEN:
Mit Zeugen:
- -2x Moral-Penalty
- Medien-Berichterstattung
- Interne Ermittlung
- Öffentlicher Aufschrei

Ohne Zeugen:
- Normale Moral-Penalty
- Keine Medien
- "Es passiert nichts" (kurzfristig)
- Gerüchte (langfristig)

ZEUGEN MANIPULIEREN:
- Einschüchtern: Zeugen schweigen (Moral -5)
- Bestechen: Zeugen lügen (Moral -10, Kosten 1000€)
- Eliminieren: Zeuge stirbt (Moral -30, aber keine Beweise)
- Überzeugen: Zeuge versteht Kontext (Moral +2, schwierig)
```

**Beweis-System:**
```
BEWEIS-TYPEN:
- Video-Aufnahmen (Journalisten, Bodycams, CCTV)
- Zeugenaussagen (NPCs)
- Forensische Beweise (Blut, Kugeln, Fingerabdrücke)
- Audio-Aufnahmen (Gespräche, Befehle)

BEWEIS-VERARBEITUNG:
- Beweise sammeln sich automatisch
- Interne Ermittlung startet bei Schwellenwert
- Tribunal-Mission möglich
- Fraktions-Reputation stark betroffen

BEWEIS-VERNICHTUNG:
- Videos löschen (Illegal, Moral -15)
- Zeugen beseitigen (Illegal, Moral -20)
- Forensik manipulieren (Illegal, Moral -10)
- Berichte fälschen (Illegal, Moral -12)
```

---

## 7. MISSIONS-STRUKTUR

### 7.1 MISSION-TYPEN
**Patrol (Streife):**
- Ziel: Gebiet überwachen, Vorfälle melden
- Dauer: 10-30 Minuten
- Belohnung: 500-1500€, +5 Polizei-Rep
- Eskalation-Risiko: Niedrig
- Freiheit: Hoch (Open-World-Exploration)

**Crowd Control (Menschenmenge-Kontrolle):**
- Ziel: Demonstration beobachten/kontrollieren
- Dauer: 15-45 Minuten
- Belohnung: 1000-3000€, +10 Polizei-Rep, -5 Demonstranten-Rep
- Eskalation-Risiko: Hoch
- Freiheit: Mittel (definiertes Gebiet)

**Riot Suppression (Aufruhr-Niederschlagung):**
- Ziel: Gewalttätigen Riot beenden
- Dauer: 20-60 Minuten
- Belohnung: 2000-5000€, +15 Polizei-Rep, -15 Demonstranten-Rep
- Eskalation-Risiko: Extrem hoch
- Freiheit: Niedrig (klare Befehle)

**Investigation (Ermittlung):**
- Ziel: Beweise sammeln, Verdächtige befragen
- Dauer: 30-90 Minuten
- Belohnung: 1500-4000€, +10 Polizei-Rep
- Eskalation-Risiko: Niedrig
- Freiheit: Hoch (freie Ermittlung)

**Raid (Razzia):**
- Ziel: Gebäude stürmen, Verdächtige festnehmen
- Dauer: 10-30 Minuten
- Belohnung: 2500-6000€, +20 Polizei-Rep
- Eskalation-Risiko: Mittel (Schusswechsel möglich)
- Freiheit: Niedrig (taktische Planung nötig)

**Hostage Rescue (Geiselbefreiung):**
- Ziel: Geiseln retten ohne Verluste
- Dauer: 20-60 Minuten
- Belohnung: 5000-10000€, +30 Polizei-Rep, +20 Zivilisten-Rep
- Eskalation-Risiko: Hoch (Zeit-Limit)
- Freiheit: Mittel (mehrere Lösungsansätze)

**VIP Protection (VIP-Schutz):**
- Ziel: Wichtige Person eskortieren/schützen
- Dauer: 15-45 Minuten
- Belohnung: 3000-8000€, +25 Regierung-Rep
- Eskalation-Risiko: Mittel (Anschläge möglich)
- Freiheit: Niedrig (VIP folgen)

**Undercover (Verdeckt):**
- Ziel: In Demonstranten-Gruppe infiltrieren
- Dauer: 45-120 Minuten
- Belohnung: 4000-10000€, +30 Polizei-Rep, Intel
- Eskalation-Risiko: Hoch (Enttarnung = Tod)
- Freiheit: Sehr hoch (Rollenspiel)

**Story Mission (Haupt-Story):**
- Ziel: Story-Fortschritt, Plot-Punkte
- Dauer: 30-120 Minuten
- Belohnung: Variabel, Story-Unlock
- Eskalation-Risiko: Variabel
- Freiheit: Mittel bis Hoch (verzweigte Pfade)

### 7.2 MISSIONS-STRUKTUR
**Phasen einer Mission:**
```
1. BRIEFING:
   - Missions-Ziele erklärt
   - Intel-Daten (Karten, NPCs, Gefahren)
   - Ausrüstungs-Auswahl
   - Team-Auswahl (falls verfügbar)
   - Moral-Kontext (was ist ethisch richtig?)

2. VORBEREITUNG:
   - Route planen
   - Ausrüstung kaufen/upgraden
   - Team-Befehle geben
   - Optionale Recherche (mehr Intel)

3. ANREISE:
   - Zum Missions-Gebiet fahren/gehen
   - Erste Beobachtungen
   - Positions-Wahl
   - Last-Minute-Adjustments

4. AUSFÜHRUNG:
   - Haupt-Gameplay-Phase
   - Dynamische Events
   - Entscheidungs-Punkte
   - Eskalations-Management

5. KONSEQUENZEN:
   - Sofort-Feedback (Verletzungen, Todesfälle)
   - Fraktions-Reputation-Änderungen
   - Medien-Berichte
   - Interne Bewertung

6. DEBRIEFING:
   - Missions-Bericht
   - Belohnung ausgezahlt
   - Stats-Übersicht
   - Nächste Schritte
```

**Verzweigte Mission-Pfade:**
```
BEISPIEL: DEMONSTRATION-MISSION

START:
- 200 friedliche Demonstranten
- Eskalation: 30%
- Ziel: Versammlung friedlich auflösen

PFAD 1: FRIEDLICH
→ Verhandeln mit Anführer
→ Zugeständnisse machen
→ Demonstranten gehen freiwillig
→ Belohnung: +20 Demonstranten-Rep, +10 Zivilisten-Rep
→ Ergebnis: Mission Erfolg (ohne Gewalt)

PFAD 2: AUTORITÄR
→ Befehle geben (Lautsprecher)
→ Deadline setzen
→ Drohung mit Gewalt
→ 60% gehen, 40% bleiben
→ Eskalation: 60%
→ Belohnung: +10 Polizei-Rep, -10 Demonstranten-Rep
→ Ergebnis: Mission Teilweise Erfolg

PFAD 3: GEWALTSAM
→ Sofortige Räumung befehlen
→ Tränengas-Einsatz
→ Massenfestnahmen
→ Eskalation: 90%
→ Verletzungen: 20 NPCs
→ Belohnung: +15 Polizei-Rep, -30 Demonstranten-Rep, -10 Zivilisten-Rep
→ Ergebnis: Mission Erfolg (brutale Methoden)

PFAD 4: ESKALATION
→ Übermäßige Gewalt
→ Schusswaffen-Einsatz
→ Todesfälle: 5+ NPCs
→ Eskalation: 100% → RIOT
→ Mission scheitert (Kontrollverlust)
→ Belohnung: Keine, Interne Ermittlung
→ Ergebnis: Mission Fehlgeschlagen (Desaster)
```

### 7.3 DYNAMISCHE MISSIONS-EVENTS
**Random Events während Mission:**
- Journalist erscheint (Reputation auf dem Spiel)
- Verletzte benötigen Erste Hilfe (moralische Entscheidung)
- Extremist mit Waffe entdeckt (Bedrohung)
- Kind geht verloren (Suche & Rettung)
- Medizinischer Notfall (Herzinfarkt, Asthma-Anfall)
- Feuer bricht aus (Evakuierung nötig)
- Anführer will verhandeln (Chance auf friedliche Lösung)
- Insider-Intel (Anschlag wird geplant)
- Sabotage (Ausrüstung beschädigt)
- Backup verspätet sich (alleine durchhalten)

**Konsequenz-Ketten:**
```
EVENT: Kind verloren

OPTION 1: Ignorieren
→ Kind findet nicht zurück
→ Eltern verzweifelt
→ Medien-Skandal
→ -20 Zivilisten-Rep
→ -10 Medien-Rep
→ -5 Moral

OPTION 2: Mission pausieren & suchen
→ Kind gefunden (5 Min)
→ Eltern dankbar
→ Positiver Medien-Bericht
→ +15 Zivilisten-Rep
→ +10 Medien-Rep
→ +8 Moral
→ ABER: Mission-Ziel verzögert

OPTION 3: Kollegen delegieren
→ Kollege sucht
→ Mission fortsetzen
→ Kind gefunden (50% Chance)
→ Kompromiss: +5 Zivilisten-Rep, Mission pünktlich
```

---

## 8. LEVEL-DESIGN & GEBIETE

### 8.1 WIEN-STADTBEZIRKE
**1. Bezirk - Innere Stadt:**
- Größe: 2,87 km²
- Landmarks: Stephansdom, Hofburg, Ringstraße
- NPC-Dichte: Hoch (Touristen, Bürger, Geschäfte)
- Missions: VIP-Schutz, Demonstrationen am Heldenplatz
- Atmosphäre: Historisch, nobel, stark bevölkert
- Besonderheiten: Viele Kameras, hohe Medien-Präsenz

**2. Bezirk - Leopoldstadt:**
- Größe: 19,27 km²
- Landmarks: Prater, Ernst-Happel-Stadion, Donauinsel
- NPC-Dichte: Mittel (Familien, Sportler)
- Missions: Crowd-Events bei Großveranstaltungen
- Atmosphäre: Familiär, Grünflächen, Freizeitparks
- Besonderheiten: Große Open-Spaces für Riots

**3. Bezirk - Landstraße:**
- Größe: 7,42 km²
- Landmarks: Belvedere, Hundertwasserhaus
- NPC-Dichte: Mittel (Wohn- und Geschäftsviertel)
- Missions: Ermittlungen, Razzias
- Atmosphäre: Mix aus Kultur und Wohnen
- Besonderheiten: Viele verwinkelte Gassen

**4-9. Bezirke (Gürtel-Bezirke):**
- Größe: 5-8 km² je Bezirk
- Charakteristik: Wohngebiete, Geschäfte, Parks
- Missions: Patrols, kleine Demonstrationen
- Atmosphäre: Alltags-Wien, bürgerlich

**10. Bezirk - Favoriten:**
- Größe: 31,90 km² (größter Bezirk)
- Landmarks: Hauptbahnhof, Viktor-Adler-Markt
- NPC-Dichte: Sehr hoch (multikulturell)
- Missions: Großeinsätze, Gangs, Riots
- Atmosphäre: Arbeiterklasse, multikulturell, angespannt
- Besonderheiten: Hohe Kriminalität, Konflikt-Potenzial

**16. Bezirk - Ottakring:**
- Größe: 8,60 km²
- Charakteristik: Altbau-Wohnungen, Industrie-Geschichte
- NPC-Dichte: Hoch
- Missions: Demonstrationen, soziale Unruhen
- Atmosphäre: Working-Class, rebellisch
- Besonderheiten: Hochburg der Proteste

**Donauinsel & Donaukanal:**
- Charakteristik: Naturflächen, Freizeit
- Missions: Verfolgungsjagden, Verstecke
- Atmosphäre: Kontrast zur Stadt
- Besonderheiten: Wasser-Physik, Schwimmen

### 8.2 GEBÄUDE-TYPEN
**Polizeiwachen:**
- Funktion: Missions-Hub, Speichern, Ausrüstung, Briefings
- Anzahl: 12 (je Bezirk 1-2)
- Interaktionen: Upgraden, NPCs, Datenbank

**Krankenhäuser:**
- Funktion: Heilen (volle HP), Save-Point
- Anzahl: 8
- Kosten: 500€ pro Heilung

**Geschäfte (Shops):**
- Waffen-Shop: Waffen kaufen/upgraden
- Ausrüstungs-Shop: Rüstung, Items
- Fahrzeug-Shop: Fahrzeuge kaufen/tunen
- Schwarz-Markt: Illegale Items (Moral-Kosten)

**Wohngebäude:**
- Funktion: NPCs wohnen hier
- Interaktion: Klingeln, Befragen, Durchsuchen (mit Warrant)
- Interieurs: Apartments, Büros, Lager

**Öffentliche Gebäude:**
- Rathaus: Politische Missionen
- Parlamente: Story-Missions
- Universitäten: Demonstrationen-Hotspot
- Museen: VIP-Events

**Industrie/Lager:**
- Funktion: Verstecke, Schmuggel
- Missions: Razzien, Ermittlungen
- Atmosphäre: Dunkel, gefährlich

### 8.3 UMWELT-ZONEN
**Protest-Zonen:**
- Heldenplatz, Stephansplatz, Karlsplatz
- Permanente Demonstrationen
- Hohe Eskalations-Gefahr
- Viele Journalisten

**Sicherheitszonen:**
- Regierungsviertel, Botschaften
- Schwer bewacht
- Kein Zutritt ohne Autorisierung
- Sofort-Alarm bei Gewalt

**Konflikt-Zonen:**
- Favoriten, Ottakring (Brennpunkte)
- Hohe Kriminalität
- Gang-Aktivitäten
- Riots wahrscheinlich

**Neutrale Zonen:**
- Parks, Wohngebiete
- Normale Bevölkerung
- Sichere Zonen (meist)
- Patrols

---

## 9. DIALOG-SYSTEM

### 9.1 DIALOG-WHEELS
**Dialog-Kategorien:**
```
NEUTRAL:
- Freundlich
- Höflich
- Professionell
- Interessiert

AUTORITÄR:
- Befehlen
- Drohen
- Fordern
- Einschüchtern

VERSTÄNDNISVOLL:
- Empathisch
- Deeskalierend
- Kompromiss
- Helfen

MANIPULATIV:
- Lügen
- Bestechen
- Überreden
- Täuschen

AGGRESSIV:
- Beleidigen
- Provozieren
- Angriff androhen
- Gewalt
```

**Erfolgs-Mechanik:**
```
Dialog-Erfolg = 
  (Spieler-Charisma × 20%) +
  (Fraktions-Reputation × 30%) +
  (Dialog-Kategorie-Match × 30%) +
  (NPC-Stimmung × 20%)

Dialog-Kategorie-Match:
- NPC ängstlich → Autoritär funktioniert
- NPC wütend → Verständnisvoll funktioniert
- NPC gierig → Manipulativ funktioniert
```

### 9.2 KONSEQUENZ-DIALOGE
**Langzeit-Konsequenzen:**
- NPCs erinnern sich an vorherige Gespräche
- Lügen werden später aufgedeckt
- Versprechen müssen gehalten werden
- Vertrauen ist schwer aufzubauen, leicht zu zerstören

**Beispiel-Konsequenz-Kette:**
```
MISSION 1:
Spieler: "Ich verspreche, niemanden zu verletzen"
NPC: "Gut, dann arbeiten wir zusammen"
→ Mission erfolgreich
→ NPC vertraut Spieler

MISSION 5 (Wochen später):
Spieler benutzt Gewalt gegen Demonstranten
NPC sieht es (oder hört davon)
NPC: "Du hast gelogen! Ich vertraue dir nicht mehr!"
→ NPC verweigert Kooperation
→ Mission schwieriger
→ Reputation-Verlust
```

### 9.3 SPEZIAL-DIALOGE
**Verhör-System:**
```
VERHÖR-PHASEN:
1. Aufbau (Good Cop):
   - Freundlich sein
   - Angebot machen
   - Verständnis zeigen

2. Druck (Bad Cop):
   - Beweise zeigen
   - Konsequenzen drohen
   - Zeitdruck erzeugen

3. Verhandlung:
   - Deal anbieten
   - Immunität versprechen
   - Schutz garantieren

4. Erzwingung:
   - Extreme Drohungen
   - Körperlicher Druck (illegal!)
   - Folter (extrem illegal, Moral -50)

ERFOLGSRATE:
- Phase 1: 30% Geständnis
- Phase 2: 60% Geständnis
- Phase 3: 80% Geständnis
- Phase 4: 95% Geständnis (aber Moral-Verlust)
```

**Verhandlungs-System:**
```
MIT ANFÜHRERN VERHANDELN:

FORDERUNGEN (Demonstranten):
1. Polizei zieht sich zurück
2. Gefangene werden freigelassen
3. Politiker kommt und spricht
4. Amnestie für alle
5. Politische Zugeständnisse

GEGENANGEBOTE (Spieler):
1. Friedliche Auflösung zugesagt
2. Keine Gewalt gegen Demonstranten
3. Treffen mit niedrigem Beamten
4. Amnestie für Unbewaffnete
5. Medien-Statement

VERHANDLUNGS-ERFOLG:
Abhängig von:
- Fraktions-Reputation
- Vorige Taten (Vertrauenswürdig?)
- Angebots-Attraktivität
- NPC-Moral
- Zeit-Druck
```

---

## 10. INVENTAR & AUSRÜSTUNG

### 10.1 WAFFEN-KATEGORIEN
**Nahkampf-Waffen:**
```
SCHLAGSTOCK:
- Schaden: 15-30 HP
- Ausdauer-Kosten: 5-12
- Gewicht: 0,5 kg
- Preis: Standard-Ausrüstung
- Upgrades: Gummi-Griff (+Grip), Verstärkt (+Schaden)

SCHILD:
- Schutz: 80% Frontal
- Gewicht: 5 kg
- Preis: 500€
- Upgrades: Ballistisch (+Kugel-Schutz), Verstärkt (+Haltbarkeit)

ELEKTROSCHOCKER:
- Schaden: 5 HP + 5 Sek Stun
- Reichweite: Nahkampf
- Gewicht: 0,3 kg
- Preis: 300€
- Munition: Batterie (100 Anwendungen)
```

**Fernkampf-Waffen:**
(Siehe Kapitel 3.2 für Details)

**Nicht-Letale Waffen:**
(Siehe Kapitel 3.2 für Details)

**Crowd-Control:**
(Siehe Kapitel 3.3 für Details)

### 10.2 RÜSTUNGS-SYSTEM
**Schutzwesten:**
```
STUFE 1 - LEICHTE WESTE:
- Schutz: 30 HP
- Gewicht: 3 kg
- Mobilität: -5%
- Preis: 1000€
- Schutz-Typ: Stichfest

STUFE 2 - MITTLERE WESTE:
- Schutz: 60 HP
- Gewicht: 6 kg
- Mobilität: -10%
- Preis: 2500€
- Schutz-Typ: Pistolen

STUFE 3 - SCHWERE WESTE:
- Schutz: 100 HP
- Gewicht: 10 kg
- Mobilität: -20%
- Preis: 5000€
- Schutz-Typ: Gewehre

STUFE 4 - TAKTISCHE RÜSTUNG:
- Schutz: 150 HP
- Gewicht: 15 kg
- Mobilität: -30%
- Preis: 10000€
- Schutz-Typ: Vollschutz + Schrapnell
```

**Spezial-Ausrüstung:**
```
HELM:
- Schutz: +30 HP (Kopf)
- Gewicht: 1,5 kg
- Preis: 800€
- Spezial: Verhindert 1-Hit-Kill bei Kopfschuss

GASMASKE:
- Effekt: Immun gegen Tränengas
- Gewicht: 0,8 kg
- Preis: 400€
- Sicht: -10% (leicht eingeschränkt)

NACHTSICHTGERÄT:
- Effekt: Perfekte Sicht bei Dunkelheit
- Gewicht: 1,2 kg
- Preis: 3000€
- Batterie: 4 Stunden

BODYCAM:
- Effekt: Zeichnet alles auf (Beweise)
- Gewicht: 0,2 kg
- Preis: 600€
- Speicher: 8 Stunden

FUNKGERÄT:
- Effekt: Backup rufen, Intel erhalten
- Gewicht: 0,3 kg
- Preis: Standard-Ausrüstung
- Reichweite: 5 km
```

### 10.3 VERBRAUCHSMATERIALIEN
**Medizinische Items:**
```
ERSTE-HILFE-KIT:
- Heilung: +25 HP
- Gewicht: 0,5 kg
- Preis: 100€
- Anwendungs-Zeit: 3 Sekunden

MEDIKIT:
- Heilung: +50 HP
- Gewicht: 1 kg
- Preis: 250€
- Anwendungs-Zeit: 5 Sekunden

VERBAND:
- Effekt: Stoppt Blutung
- Gewicht: 0,1 kg
- Preis: 50€
- Anwendungs-Zeit: 2 Sekunden

ADRENALIN-INJEKTION:
- Effekt: +50% Geschwindigkeit (30 Sek)
- Gewicht: 0,1 kg
- Preis: 500€
- Cooldown: 2 Minuten
```

**Taktische Items:**
```
HANDSCHELLEN:
- Funktion: NPC festnehmen
- Gewicht: 0,2 kg/Paar
- Preis: 50€/Paar
- Kapazität: 5 Paare tragbar

ABSPERRBAND:
- Funktion: Bereich absperren
- Länge: 50 Meter
- Preis: 100€
- Effekt: NPCs respektieren Grenze (meist)

MEGAFON:
- Funktion: Befehle verstärken (+20% Autorität)
- Gewicht: 2 kg
- Preis: 300€
- Reichweite: 100 Meter

SCHEINWERFER:
- Funktion: Gebiet beleuchten
- Gewicht: 5 kg
- Preis: 500€
- Batterie: 2 Stunden
```

### 10.4 INVENTAR-MANAGEMENT
**Gewichts-System:**
```
TRAG-KAPAZITÄT:
Basis: 40 kg
Mit Training: bis 60 kg

GEWICHTS-EFFEKTE:
0-20 kg: Normale Bewegung
20-40 kg: -10% Geschwindigkeit, -20% Ausdauer-Regen
40-60 kg: -25% Geschwindigkeit, -40% Ausdauer-Regen
60+ kg: -50% Geschwindigkeit, -70% Ausdauer-Regen, kann nicht springen

QUICK-ACCESS SLOTS:
- 4 Waffen-Slots (Schnellwahl)
- 6 Item-Slots (Medikits, Granaten, etc.)
- Unbegrenzt Inventar (langsamer Zugriff im Menü)
```

---

## 11. FAHRZEUG-SYSTEM

### 11.1 POLIZEI-FAHRZEUGE
**Streifenwagen (BMW 5er):**
```
STATS:
- Geschwindigkeit: 220 km/h
- Beschleunigung: 0-100 in 6,5 Sek
- Handling: Gut
- Panzerung: Keine
- Kapazität: 4 Personen + 2 Gefangene

FEATURES:
- Sirene & Blaulicht
- Funkgerät
- Laptop (Datenbank-Zugriff)
- Erste-Hilfe-Kit
- Schlagstöcke im Kofferraum

PREIS: Standard-Ausrüstung
```

**Einsatzwagen (Mercedes Sprinter):**
```
STATS:
- Geschwindigkeit: 160 km/h
- Beschleunigung: 0-100 in 9 Sek
- Handling: Mittel
- Panzerung: Leicht
- Kapazität: 10 Personen

FEATURES:
- Verstärkter Rammbock
- Ausrüstungs-Lager
- Megafon-Anlage
- Wasserwerfer (optional)
- SWAT-Team Transport

PREIS: 50.000€
```

**Gepanzertes Fahrzeug:**
```
STATS:
- Geschwindigkeit: 100 km/h
- Beschleunigung: 0-100 in 15 Sek
- Handling: Schwer
- Panzerung: Schwer (1000 HP)
- Kapazität: 6 Personen

FEATURES:
- Kugelsicher
- Ramm-fähig
- Tränengas-Kanone
- Schallkanone (LRAD)
- Riot-Shield-Schutz

PREIS: 250.000€
```

**Motorrad:**
```
STATS:
- Geschwindigkeit: 280 km/h
- Beschleunigung: 0-100 in 3,5 Sek
- Handling: Exzellent
- Panzerung: Keine
- Kapazität: 1 Person

FEATURES:
- Sehr wendig
- Perfekt für Verfolgungen
- Sirene & Blaulicht
- Keine Ausrüstung

PREIS: 15.000€
```

### 11.2 FAHRZEUG-MECHANIK
**Fahrzeug-Steuerung:**
- Realistische Physik (Gewicht, Trägheit, Grip)
- Schadens-System (Karosserie, Reifen, Motor)
- Wetter-Einfluss (Regen = weniger Grip)
- Kollisionen (mit NPCs, Objekten, Fahrzeugen)

**Verfolgungsjagden:**
```
VERFOLGUNGS-SYSTEM:
- Flucht-NPCs nutzen Straßen-Netzwerk intelligent
- Blockaden möglich (Roadblocks)
- Ramm-Manöver (PIT-Maneuver)
- Reifen-Schießen (stoppt Fahrzeug)
- Heli-Unterstützung (bei hohem Wanted-Level)

WANTED-LEVEL:
Stufe 1: Ein Streifenwagen
Stufe 2: Zwei Streifenwagen
Stufe 3: Vier Streifenwagen + Straßensperren
Stufe 4: SWAT + Helicopter
Stufe 5: Gepanzerte Fahrzeuge + Militär
```

**Fahrzeug-Upgrades:**
```
MOTOR:
- Stufe 1: +20% Geschwindigkeit (5000€)
- Stufe 2: +40% Geschwindigkeit (15000€)
- Stufe 3: +60% Geschwindigkeit (35000€)

PANZERUNG:
- Stufe 1: +200 HP (10000€)
- Stufe 2: +400 HP (25000€)
- Stufe 3: +600 HP (50000€)

WAFFEN:
- Rammbock: 2000€
- Wasserwerfer: 20000€
- Schallkanone: 40000€
- Tränengas-Werfer: 15000€
```

---

## 12. ZERSTÖRUNGS-MECHANIK

### 12.1 ZERSTÖRBARE OBJEKTE
**Fenster & Glas:**
- HP: 50 (normal), 200 (Sicherheitsglas)
- Zerstörung: Schläge, Schüsse, Explosionen
- Effekt: Glasscherben, Durchgang möglich
- Lärm: Alarmiert NPCs im Umkreis (30m)

**Türen:**
```
HOLZTÜR:
- HP: 100
- Aufbrechen: 3 Sekunden Interaktion
- Rammen: Mit Schulter (20 HP Schaden zu Spieler)
- Schüsse: 10 Schüsse (Pistole)

METALLTÜR:
- HP: 300
- Aufbrechen: 10 Sekunden + Werkzeug
- Rammen: Nicht möglich
- Explosiv: 1 Sprengladung

SICHERHEITSTÜR:
- HP: 1000
- Aufbrechen: Unmöglich
- Code/Schlüssel: Benötigt
- Explosiv: 3 Sprengladungen
```

**Fahrzeuge:**
- HP: 500-2000 (je nach Typ)
- Beschädigung: Kollisionen, Schüsse, Explosionen
- Teile-System: Reifen, Motor, Karosserie einzeln zerstörbar
- Brand: Bei kritischem Schaden → Explosion (30 Sek Delay)

**Straßenmöbel:**
- Ampeln, Schilder, Bänke: 50-100 HP
- Zerstörbar durch Schläge, Fahrzeuge
- Keine gameplay-kritischen Effekte

**Barrikaden:**
- NPCs können Barrikaden errichten (Müllcontainer, Autos)
- HP: 200-800
- Entfernung: Rammen mit Fahrzeug oder Explosiv

### 12.2 UMWELT-ZERSTÖRUNG
**Gebäude-Schaden:**
- Fassaden: Einschusslöcher, Explosionsspuren
- Interieur: Möbel zerstörbar, Wände einschießbar
- Strukturell: Keine kompletten Gebäude-Zerstörungen (Performance)

**Feuer-System:**
```
FEUER-AUSBREITUNG:
- Start: Molotov, Explosion, brennende Objekte
- Ausbreitung: 1 m²/Sekunde (brennbare Materialien)
- Schaden: 10 HP/Sek zu NPCs und Spieler
- Rauch: Sicht-Reduzierung, Erstickung
- Löschung: Feuerlöscher, Wasser, Zeit (10 Min ohne Nahrung)

FEUER-EFFEKTE:
- NPCs fliehen in Panik
- Gebäude unbetretbar
- Feuerwehr wird gerufen (nach 3 Min)
- Großbrände = Mission-Fail (bei Story-Missions)
```

**Explosionen:**
```
GRANATE:
- Radius: 5 Meter (letal), 10 Meter (Schaden)
- Schaden: 100 HP (Zentrum), 50 HP (Rand)
- Effekt: Ragdoll, Zerstörung, Feuer

MOLOTOV:
- Radius: 3 Meter (Feuer)
- Schaden: 10 HP/Sek
- Dauer: 15 Sekunden
- Effekt: Feuerfläche, Panik

IED (Improvised Explosive):
- Radius: 10 Meter (letal), 20 Meter (Schaden)
- Schaden: 150 HP (Zentrum), 75 HP (Rand)
- Effekt: Massive Zerstörung, Krater
```

---

## 13. WETTER & UMWELT

### 13.1 WETTER-SYSTEM
**Wetter-Typen:**
```
SONNIG:
- Sicht: 100%
- NPC-Verhalten: Normal
- Gameplay-Effekt: Keine
- Wahrscheinlichkeit: 40%

BEWÖLKT:
- Sicht: 95%
- NPC-Verhalten: Normal
- Gameplay-Effekt: Keine
- Wahrscheinlichkeit: 30%

REGEN:
- Sicht: 70% (Regen-Effekt)
- NPC-Verhalten: Suchen Schutz, weniger NPCs draußen
- Gameplay-Effekt: -20% Fahrzeug-Grip, Rutschige Oberflächen
- Wahrscheinlichkeit: 20%

STARKER REGEN:
- Sicht: 50%
- NPC-Verhalten: Drastisch weniger NPCs draußen
- Gameplay-Effekt: -40% Fahrzeug-Grip, Pfützen
- Wahrscheinlichkeit: 5%

NEBEL:
- Sicht: 30-60% (variabel)
- NPC-Verhalten: Vorsichtiger
- Gameplay-Effekt: Sniper unwirksam, Stealth einfacher
- Wahrscheinlichkeit: 3%

SCHNEE (Winter):
- Sicht: 80%
- NPC-Verhalten: Langsamer
- Gameplay-Effekt: -30% Fahrzeug-Grip, -10% Bewegung
- Wahrscheinlichkeit: 2% (nur Dezember-Februar)
```

**Dynamisches Wetter:**
- Wetter ändert sich im Lauf der Mission
- Übergänge (z.B. Sonnig → Bewölkt → Regen)
- Wettervorhersage im HUD (nächste 2 Stunden)

### 13.2 TAGESZEIT-SYSTEM
**Tageszeiten:**
```
NACHT (00:00-06:00):
- Beleuchtung: Straßenlaternen, Gebäude-Lichter
- NPC-Dichte: 10% (nur Nachtschwärmer, Obdachlose)
- Kriminalität: +50%
- Sicht: 30% (ohne Licht)

MORGEN (06:00-09:00):
- Beleuchtung: Dämmerung → Tageslicht
- NPC-Dichte: 40% (Pendler, Frühaufsteher)
- Kriminalität: Normal
- Sicht: 70% → 100%

TAG (09:00-18:00):
- Beleuchtung: Volles Tageslicht
- NPC-Dichte: 100% (max. NPCs)
- Kriminalität: Normal
- Sicht: 100%

ABEND (18:00-21:00):
- Beleuchtung: Dämmerung, Lichter gehen an
- NPC-Dichte: 70% (Feierabend, Restaurants)
- Kriminalität: +20%
- Sicht: 100% → 60%

SPÄT-ABEND (21:00-00:00):
- Beleuchtung: Nacht-Beleuchtung
- NPC-Dichte: 30% (Nachtschwärmer, Bars)
- Kriminalität: +40%
- Sicht: 50%
```

**Zeit-Beschleunigung:**
- Real-Time: 1 Minute Echtzeit = 1 Minute Spielzeit
- Beschleunigt: 1 Minute Echtzeit = 5 Minuten Spielzeit (Optional)
- Manuell: Zeit vorspulen (zu bestimmter Stunde)

### 13.3 ATMOSPHÄRE-EFFEKTE
**Lichteffekte:**
- Dynamische Schatten (Tageszeit-abhängig)
- Straßenlaternen (an bei <20% Helligkeit)
- Gebäude-Fenster-Lichter (an bei Nacht)
- Fahrzeug-Scheinwerfer
- Feuer-Licht (dynamisch)

**Sound-Atmosphäre:**
- Ambient-Sounds (Verkehr, Stimmen, Vögel)
- Tageszeit-abhängig (Nachts: Stille, Tagsüber: Laut)
- Wetter-Sounds (Regen, Wind, Donner)
- Sirenen in der Ferne
- Musik aus Gebäuden

---

## 14. WIRTSCHAFTS-SYSTEM

### 14.1 GELD-VERDIENEN
**Missions-Belohnungen:**
- Patrol: 500-1500€
- Crowd Control: 1000-3000€
- Riot Suppression: 2000-5000€
- Investigation: 1500-4000€
- Raid: 2500-6000€
- Hostage Rescue: 5000-10000€
- VIP Protection: 3000-8000€
- Undercover: 4000-10000€

**Bonus-Belohnungen:**
```
PERFORMANCE-BONUS:
- Keine zivilen Opfer: +20%
- Unter Zeit-Limit: +15%
- Keine Verletzungen: +10%
- Alle Ziele erreicht: +25%
- Perfekte Bewertung: +50%

MORAL-BONUS:
- Gewaltfrei gelöst: +30%
- Minimaler Schaden: +20%
- Positive Medien-Berichte: +15%

STRAFEN:
- Zivile Opfer: -10% pro Toter
- Zeit überschritten: -20%
- Mission fehlgeschlagen: -50%
- Korruption entdeckt: -100%
```

**Nebeneinnahmen:**
```
BESTECHUNG (ILLEGAL):
- NPCs bestechen dich: 100-5000€
- Moral-Kosten: -5 bis -20
- Risiko: Interne Ermittlung (20%)

BESCHLAGNAHMUNG:
- Illegale Waren verkaufen: 1000-10000€
- Moral-Kosten: -10
- Risiko: Interne Ermittlung (30%)

SCHWARZMARKT:
- Waffen verkaufen: 500-5000€
- Moral-Kosten: -15
- Risiko: Verhaftung (40%)
```

### 14.2 GELD-AUSGEBEN
**Ausrüstung:**
- Waffen: 500€ - 50.000€
- Rüstung: 1.000€ - 10.000€
- Upgrades: 500€ - 35.000€
- Verbrauchsmaterialien: 50€ - 500€

**Fahrzeuge:**
- Motorrad: 15.000€
- Streifenwagen: Standard
- Einsatzwagen: 50.000€
- Gepanzertes Fahrzeug: 250.000€

**Immobilien:**
```
SAFEHOUSE:
- Kleine Wohnung: 50.000€
- Große Wohnung: 150.000€
- Haus: 500.000€

NUTZEN:
- Speichern
- Ausrüstungs-Lager
- Fahrzeug-Garage
- Schnellreise-Punkt
```

**Investitionen:**
```
AKTIEN-MARKT:
- Polizei-Ausrüster (steigt bei Unruhen)
- Medien-Konzerne (steigt bei Skandalen)
- Immobilien (stabil)
- Spekulativ: +/- 50% möglich

BUSINESS:
- Sicherheitsfirma: 100.000€ (passives Einkommen +1000€/Tag)
- Waffen-Shop: 200.000€ (passives Einkommen +2000€/Tag)
```

### 14.3 KOSTEN-STRAFEN
```
KRANKENHAUSKOSTEN:
- Pro Heilung: 500€
- Bei Tod ohne Versicherung: 5000€

AUSRÜSTUNGS-VERLUST:
- Bei Tod: Verliere 50% Verbrauchsmaterialien
- Bei Flucht: Verliere Waffe (wenn fallen gelassen)

STRAFEN:
- Interne Ermittlung: 10.000€ Anwaltskosten
- Gerichtsverfahren: 50.000€ Kosten
- Verurteilung: 100.000€ + Gefängnis
```

---

## 15. FORTSCHRITTS-SYSTEM

### 15.1 LEVEL-SYSTEM
```
SPIELER-LEVEL: 1-50

LEVEL-UP DURCH:
- Missionen abschließen
- NPCs festnehmen
- Dialogerfolge
- Spezialfähigkeiten nutzen

XP-BELOHNUNGEN:
- Mission: 500-2000 XP
- NPC festgenommen: 50 XP
- Dialog-Erfolg: 25 XP
- Geheimnis entdeckt: 100 XP
```

**Level-Belohnungen:**
```
JEDES LEVEL:
- +1 Skill-Punkt
- +100€ Gehalts-Bonus (passiv/Tag)

MEILENSTEIN-LEVEL:
Level 10: Unlock SWAT-Missions
Level 20: Unlock Undercover-Missionen
Level 30: Unlock VIP-Protection Advanced
Level 40: Unlock Secret Service Missions
Level 50: Unlock "Final Showdown" Story-Path
```

### 15.2 SKILL-BAUM
**Kategorien:**
```
KAMPF (Combat):
1. Erhöhter Nahkampf-Schaden (+20%)
2. Schnelleres Nachladen (-15% Zeit)
3. Erhöhte Schuss-Präzision (+15%)
4. Kritische Treffer (+10% Chance)
5. Combo-Master (4-Hit-Combos verfügbar)

AUSDAUER (Stamina):
1. Mehr Ausdauer (+20 Punkte)
2. Schnellere Regeneration (+25%)
3. Reduzierter Sprint-Verbrauch (-20%)
4. Unbegrenzt Sprint (Stufe 5 Skill)

ÜBERLEBEN (Survival):
1. Mehr Gesundheit (+20 HP)
2. Schnellere Heilung (+30% Item-Effekt)
3. Reduzierter Fall-Schaden (-50%)
4. Auto-Regeneration (1 HP/Sek bei <20 HP)

CHARISMA (Charisma):
1. Bessere Dialog-Chancen (+15%)
2. Höhere Bestechungs-Akzeptanz (+20%)
3. Schnellere Verhöre (-30% Zeit)
4. Anführer-Aura (NPCs folgen leichter)

STEALTH (Heimlichkeit):
1. Leiser (-30% Lärm)
2. Unsichtbar bei Schleichen (50% weniger Sichtbarkeit)
3. Schnelles Verstecken (Instant-Deckung)
4. Meister-Dieb (Türen lautlos öffnen)

FAHRZEUG (Driving):
1. Besseres Handling (+15%)
2. Höhere Geschwindigkeit (+20%)
3. Ramm-Meister (+50% Ramm-Schaden)
4. Stunt-Fähigkeiten (Sprünge, Drifts)

FÜHRUNG (Leadership):
1. Team-Buffs (+10% Team-Schaden)
2. Schnelleres Backup (-30% Ankunftszeit)
3. Bessere KI-Partner (+20% Effektivität)
4. Stratege (Taktische Karte verfügbar)
```

**Skill-Punkte:**
- 1 Punkt pro Level = 50 Punkte total
- Re-Spec möglich: 10.000€ Kosten

### 15.3 ACHIEVEMENTS
```
STORY-ACHIEVEMENTS:
- "Ersten Tag überleben" (Story-Start)
- "Die Wahrheit" (Verschwörung aufdecken)
- "Finale Entscheidung" (Finale Mission)
- "5 Enden gesehen" (Alle Enden erreicht)

KAMPF-ACHIEVEMENTS:
- "Pazifist" (10 Missionen ohne Gewalt)
- "Brutaler" (100 NPCs getötet)
- "Meister-Schütze" (100 Kopfschüsse)
- "Nahkampf-Legende" (50 Combo-Kills)

SOCIAL-ACHIEVEMENTS:
- "Diplomat" (50 erfolgreiche Verhandlungen)
- "Verhör-Experte" (25 erfolgreiche Verhöre)
- "Vertrauenswürdig" (Reputation +80 bei allen Fraktionen)

KOLLEKTIONS-ACHIEVEMENTS:
- "Waffensammler" (Alle Waffen besessen)
- "Vollausgerüstet" (Alle Upgrades gekauft)
- "Immobilien-Mogul" (Alle Safehouses gekauft)

CHALLENGE-ACHIEVEMENTS:
- "Unbesiegbar" (Kampagne ohne Tod)
- "Speedrunner" (Kampagne unter 10 Stunden)
- "Perfektionist" (Alle Missionen mit 100%)
```

---

## 16. MULTIPLAYER-ELEMENTE

### 16.1 CO-OP-MODUS
**Spieler-Anzahl:** 2-4 Spieler

**Missionen:**
- Alle Singleplayer-Missionen spielbar
- Schwierigkeit skaliert mit Spielerzahl
- Geteilte Belohnung

**Teamwork-Mechaniken:**
```
FORMATIONS:
- Schild-Wall: 2+ Spieler mit Schilden
- Pincer-Angriff: Umzingeln von NPCs
- Suppression: Ein Spieler schießt, andere rücken vor

REVIVAL-SYSTEM:
- Gefallene Spieler können wiederbelebt werden (10 Sek)
- Bei Tod aller: Mission fehlgeschlagen

KOMMUNIKATION:
- Voice-Chat
- Ping-System (Ziele markieren)
- Schnell-Befehle (Halt, Angriff, Folgen)
```

**Konkurrenz-Elemente:**
```
FREUNDLICHER WETTBEWERB:
- Kill-Counter
- Arrest-Counter
- Dialog-Erfolge
- MVP am Ende (meiste Punkte)

REWARD:
- MVP bekommt +10% Belohnung
```

### 16.2 PVP-MODUS (OPTIONAL)
**Cops vs. Demonstranten:**
```
TEAMS:
- Team 1: Polizei (6 Spieler)
- Team 2: Demonstranten (12 Spieler)

ZIELE:
Polizei: Demonstration auflösen (alle festnehmen)
Demonstranten: Ziel erreichen (Rathaus, Parlament)

ZEITLIMIT: 30 Minuten

GEWINN-BEDINGUNGEN:
Polizei: Alle Demonstranten festgenommen/neutralisiert
Demonstranten: 6+ Spieler erreichen Ziel
```

**Respawn-System:**
- Polizei: Unbegrenzt (bei Wache)
- Demonstranten: 3 Leben pro Spieler

**Loadouts:**
- Polizei: Volle Ausrüstung
- Demonstranten: Nahkampf, Wurfwaffen, keine Schusswaffen

---

## 17. BRANCHING STORY & ENDEN

### 17.1 STORY-STRUKTUR
**Akt 1 - Der Ausbruch (10 Missionen):**
- Erste Proteste in Wien
- Spieler lernt Grundlagen
- Erste moralische Entscheidungen
- Entdeckung: Corona-Maßnahmen spalten Bevölkerung

**Akt 2 - Die Eskalation (15 Missionen):**
- Riots beginnen
- Extremistische Gruppen tauchen auf
- Politische Intrigen
- Entdeckung: Regierung manipuliert Information

**Akt 3 - Die Verschwörung (10 Missionen):**
- Verschwörung aufgedeckt
- Spieler muss Seite wählen
- Massive Entscheidungs-Punkte
- Endgame-Vorbereitung

**Akt 4 - Das Finale (5 Missionen):**
- Wien am Abgrund
- Spieler-Wahl bestimmt Ende
- Konsequenzen aller Entscheidungen
- Multiple Enden

### 17.2 HAUPT-ENTSCHEIDUNGSPUNKTE
```
ENTSCHEIDUNG 1 (Akt 1):
- Demonstranten brutal niederschlagen?
  → JA: -20 Moral, +15 Polizei-Rep, Riot in Akt 2
  → NEIN: +10 Moral, -10 Polizei-Rep, Friedlicher in Akt 2

ENTSCHEIDUNG 2 (Akt 2):
- Korruption von Vorgesetztem decken?
  → JA: -25 Moral, +20 Regierung-Rep, Befördert
  → NEIN: +20 Moral, -30 Regierung-Rep, Unter Druck

ENTSCHEIDUNG 3 (Akt 3):
- Verschwörung aufdecken oder mitspielen?
  → AUFDECKEN: +30 Moral, alle Fraktionen -50 Rep, Verfolgt
  → MITSPIELEN: -40 Moral, Regierung +50 Rep, Reich

ENTSCHEIDUNG 4 (Akt 4):
- Finale: Für Regierung oder Volk?
  → REGIERUNG: Ende 1-2 (basierend auf Moral)
  → VOLK: Ende 3-4 (basierend auf Moral)
  → SELBST: Ende 5 (nur bei Moral = 0, Neutral)
```

### 17.3 DIE 5 ENDEN
```
ENDE 1 - "DER HELD VON WIEN":
Bedingungen: Moral +60, Regierung unterstützt
Story: Du beendest Riots, rettest Wien, wirst gefeiert
Karriere: Polizei-Chef von Wien
Konsequenzen: Wien stabil, aber autoritär
Video: Parade, Orden, positive Medien

ENDE 2 - "DER SCHLÄCHTER":
Bedingungen: Moral -60, Regierung unterstützt
Story: Du zerschlägst Proteste brutal, Terror-Regime
Karriere: Sicherheitschef (gefürchtet)
Konsequenzen: Wien unterdrückt, Widerstand im Untergrund
Video: Militär-Staat, Massenproteste brutal beendet

ENDE 3 - "DER WHISTLEBLOWER":
Bedingungen: Moral +60, Volk unterstützt
Story: Du deckst Verschwörung auf, Regierung stürzt
Karriere: Held des Volkes, Politiker
Konsequenzen: Wien demokratisch, neue Regierung
Video: Freie Wahlen, Versöhnung

ENDE 4 - "DER ANARCHIST":
Bedingungen: Moral -60, Volk unterstützt
Story: Du wendest dich gegen beide Seiten, Chaos
Karriere: Outlaw, Anführer von Extremisten
Konsequenzen: Wien im Bürgerkrieg
Video: Brennende Stadt, Gesetzlosigkeit

ENDE 5 - "DER OPPORTUNIST":
Bedingungen: Moral -20 bis +20 (Neutral)
Story: Du spielst alle Seiten, überlebst
Karriere: Privat-Sicherheitsfirma, reich
Konsequenzen: Wien moderat verändert, du bist raus
Video: Du verlässt Wien, neutral-zynisches Ende
```

---

## 18. ACHIEVEMENT-SYSTEM

### 18.1 COMBAT-ACHIEVEMENTS
```
"Pazifist" - Beende 10 Missionen ohne zu töten
"Brutaler" - Töte 100 NPCs
"Meisterschütze" - 100 Kopfschüsse
"Nahkampf-Legende" - 50 Combo-Kills
"Taser-Experte" - 25 Taser-Festnahmen
"Shield-Master" - Block 500 Schaden mit Schild
"Granaten-Regen" - Wirf 50 Tränengas-Granaten
```

### 18.2 STORY-ACHIEVEMENTS
```
"Ersten Tag überlebt" - Schließe Akt 1 ab
"Die Wahrheit" - Decke Verschwörung auf
"Alle Enden gesehen" - Erreiche alle 5 Enden
"Perfekte Entscheidungen" - Wähle alle "guten" Optionen
"Korrupter Cop" - Wähle alle "schlechten" Optionen
```

### 18.3 CHALLENGE-ACHIEVEMENTS
```
"Unbesiegbar" - Beende Kampagne ohne zu sterben
"Speedrunner" - Beende Kampagne unter 10 Stunden
"Perfektionist" - 100% bei allen Missionen
"Hardcore" - Beende Permadeath-Modus
```

---

## 19. SCHWIERIGKEITSGRADE

```
LEICHT:
- Spieler: 150 HP, Auto-Regeneration
- NPCs: 50% Gesundheit, 50% Schaden
- Zeit-Limits: +50% mehr Zeit
- Belohnung: -20%

NORMAL:
- Spieler: 100 HP, keine Auto-Regen
- NPCs: 100% Gesundheit, 100% Schaden
- Zeit-Limits: Standard
- Belohnung: 100%

SCHWER:
- Spieler: 75 HP, keine Auto-Regen
- NPCs: 150% Gesundheit, 150% Schaden
- Zeit-Limits: -25% Zeit
- Belohnung: +25%

BRUTAL:
- Spieler: 50 HP, keine Auto-Regen
- NPCs: 200% Gesundheit, 200% Schaden
- Zeit-Limits: -50% Zeit
- Belohnung: +50%

PERMADEATH:
- Spieler: 100 HP, ein Leben
- NPCs: 150% Gesundheit, 150% Schaden
- Tod = Kampagne neu starten
- Belohnung: +100%
```

---

## 20. SPIEL-MODI

### 20.1 STORY-MODUS
- Haupt-Kampagne
- 40 Missionen
- Verzweigte Story
- 5 Enden

### 20.2 FREIES SPIEL
- Open-World nach Story-Abschluss
- Endlose Missions
- Alle Gebiete offen
- Experimentieren

### 20.3 CHALLENGE-MODUS
```
"Überlebens-Welle":
- Verteidige Position gegen endlose NPC-Wellen
- Highscore-System

"Zeit-Angriff":
- Beende Mission so schnell wie möglich
- Online-Leaderboards

"Nur Nahkampf":
- Keine Schusswaffen erlaubt
- Erhöhter Schwierigkeitsgrad
```

### 20.4 SANDBOX-MODUS
- Gott-Modus (unbesiegbar)
- Unendlich Geld
- Alle Waffen freigeschalten
- Experimentier-Modus

---

## 21. AUDIO-SYSTEM

### 21.1 MUSIK
```
DYNAMISCHE MUSIK:
- Ruhig: Ambient-Soundtracks während Patrol
- Spannend: Orchestral bei Verfolgungen
- Intensiv: Heavy Drums bei Riots
- Boss-Musik: Elektro-Industrial bei Finalkampf

ADAPTIVE MUSIK:
- Passt sich Eskalations-Level an
- Schneller bei höherer Bedrohung
- Leiser bei Stealth
```

### 21.2 SOUND-EFFEKTE
```
WAFFEN:
- Realistische Schuss-Sounds
- Nachhall in Gebäuden
- Entfernungs-basiert (leiser wenn weit weg)

UMWELT:
- Schritte: Oberflächen-abhängig (Asphalt, Gras, Metall)
- Explosionen: Druckwellen-Effekt
- Feuer: Knistern, Rauch

NPC:
- Schreie bei Schmerz
- Sprechen (300+ Dialog-Zeilen)
- Massen-Lärm bei Crowds

FAHRZEUGE:
- Motor-Sounds
- Reifen quietschen
- Sirenen
- Kollisions-Geräusche
```

### 21.3 VOICE-ACTING
- Vollständig synchronisiert (Deutsch)
- Professionelle Sprecher
- Lippensynchron
- Variations basierend auf Kontext

---

## 22. PHYSIK-SIMULATION

### 22.1 RAGDOLL-PHYSIK
```
AKTIVIERUNG:
- Bei Tod
- Bei starkem Schlag
- Bei Explosion
- Bei Fahrzeug-Kollision

REALISMUS:
- Realistische Gelenk-Limits
- Gewicht-basiert
- Momentum-Erhaltung
- Kollision mit Umwelt
```

### 22.2 OBJEKT-PHYSIK
```
TRAGBARE OBJEKTE:
- Steine, Flaschen, Stühle
- Werfen mit Physik-Bogen
- Schaden basierend auf Masse & Geschwindigkeit

FAHRZEUGE:
- Realistische Kollisions-Physik
- Gewicht & Trägheit
- Schadens-Modell
```

### 22.3 ZERSTÖRUNGS-PHYSIK
- Gebäude-Teile können einstürzen
- Glas zerbricht realistisch
- Explosionen erzeugen Schuttteile
- Feuer breitet sich physikalisch aus

---

## 23. KAMERA & STEUERUNG

### 23.1 KAMERA-MODI
(Siehe Kapitel 2.2)

### 23.2 STEUERUNGS-SCHEMA
```
TASTATUR + MAUS:
- WASD: Bewegung
- Maus: Kamera
- Shift: Sprint
- Ctrl: Ducken
- Leertaste: Springen
- E: Interagieren
- R: Nachladen
- F: Nahkampf
- G: Granate
- Q: Cover
- Tab: Inventar
- M: Karte
- Esc: Menü

CONTROLLER:
- Linker Stick: Bewegung
- Rechter Stick: Kamera
- A: Springen
- B: Ducken
- X: Interagieren
- Y: Waffe wechseln
- LT: Zielen
- RT: Schießen
- LB: Granate
- RB: Nahkampf
- D-Pad: Schnellzugriff
- Start: Menü
- Select: Karte
```

---

## 24. HUD & UI-SYSTEME

### 24.1 HUD-ELEMENTE
```
GESUNDHEIT:
- Rotes Balken-Symbol (links unten)
- Numerischer Wert (100/100)
- Puls-Animation bei <30 HP

AUSDAUER:
- Grünes Balken-Symbol (unter Gesundheit)
- Leert sich bei Sprint/Nahkampf
- Regeneriert automatisch

MUNITION:
- Rechts unten
- Aktuell/Gesamt (17/85)
- Warnung bei <5 Schuss

MINIMAP:
- Rechts oben
- Zeigt: NPCs (Punkte), Ziele (Marker), Spieler (Pfeil)
- Zoom-bar

MISSIONS-ZIELE:
- Links oben
- Aktive Ziele aufgelistet
- Fortschritts-Balken

WANTED-LEVEL:
- Sterne-System (1-5)
- Oben Mitte
- Blinkt bei aktiver Verfolgung

DIALOG-OPTIONEN:
- Unten Mitte
- Rad-Menü (4-6 Optionen)
- Icon-basiert

BENACHRICHTIGUNGEN:
- Rechts Mitte
- Neue Missionen, Achievements, Reputation
- Auto-Fade nach 5 Sek
```

### 24.2 MENÜ-SYSTEME
```
HAUPT-MENÜ:
- Fortsetzen
- Neue Kampagne
- Laden
- Optionen
- Credits
- Beenden

PAUSE-MENÜ:
- Fortsetzen
- Karte
- Inventar
- Missionen
- Stats
- Optionen
- Speichern
- Laden
- Beenden

INVENTAR:
- Waffen-Tab
- Rüstung-Tab
- Items-Tab
- Schlüssel-Items-Tab
- Gewicht-Anzeige

KARTE:
- Wien-Übersicht
- Zoom-bar
- Filter (Missionen, Geschäfte, Safehouses)
- Schnellreise (zu Safehouses)
- Legende

STATS:
- Missionen abgeschlossen
- NPCs festgenommen/getötet
- Geld verdient
- Zeit gespielt
- Achievements
- Fraktions-Reputation
```

---

## 25. SPEICHER & CHECKPOINT-SYSTEM

### 25.1 SPEICHERN
```
AUTO-SAVE:
- Nach jeder Mission
- Bei Safehouse-Betreten
- Alle 10 Minuten im Freien Spiel

MANUELLES SPEICHERN:
- Bei Polizeiwachen
- Bei Safehouses
- Im Pause-Menü (nur außerhalb Missionen)

SPEICHER-SLOTS:
- 5 manuelle Slots
- 1 Auto-Save-Slot (überschreibt sich)
```

### 25.2 CHECKPOINT-SYSTEM
```
CHECKPOINTS:
- Automatisch während Missionen
- Bei Missions-Phasen-Wechsel
- Vor schwierigen Kämpfen
- Nach wichtigen Ereignissen

BEI TOD:
- Respawn am letzten Checkpoint
- Verliere Verbrauchsmaterialien (50%)
- Behalte Waffen & Ausrüstung
- Verliere 10% Geld
```

---

# 🎯 ZUSAMMENFASSUNG FÜR GEMINI CODER

## WAS IST CORONA CONTROL ULTIMATE?

Ein **ultra-realistisches, brutales Polizei-Simulations-Action-Spiel** in Wien während einer Corona-Krise.

**KERN-FEATURES:**
1. **Open-World Wien** - 7+ Bezirke, komplett explorierbar
2. **500+ NPCs** - Intelligente Crowd-Simulation
3. **Brutaler Realismus** - Keine moralischen Limits, echte Konsequenzen
4. **Verzweigte Story** - 5 unterschiedliche Enden
5. **Komplexe Systeme** - Moral, Reputation, Eskalation, Wirtschaft
6. **AAA-Gameplay** - Kampf, Fahrzeuge, Dialoge, Stealth
7. **Multiplayer** - Co-Op & PVP-Optionen

**TECHNISCHE ANFORDERUNGEN:**
- React Three Fiber + TypeScript
- WebGPU für Graphics
- Realistische Physik (Jolt/Rapier)
- 60 FPS @ 4K
- Performance-optimiert (LOD, Culling, Instancing)

**ENTWICKLUNGS-PRIORITÄTEN:**
1. Kern-Gameplay-Loop funktional
2. NPC-KI & Crowd-Simulation robust
3. Moral-System vollständig implementiert
4. Story-Verzweigungen korrekt
5. Performance-Ziele erreicht
6. Polish & Details

**WICHTIG:**
- KEINE Zensur - Brutale Realität
- KEINE Shortcuts - Vollständige Implementation
- KEINE Platzhalter - Production-Ready Code

---

## 🎮 GESAMTUMFANG

**SYSTEME:** 25 Haupt-Kategorien
**MISSIONEN:** 40+ Story + Endlos Freies Spiel
**NPCs:** 8 Typen mit individueller KI
**WAFFEN:** 15+ verschiedene
**FAHRZEUGE:** 5+ verschiedene
**GEBIETE:** 10+ Wien-Bezirke
**DIALOGE:** 300+ Zeilen pro NPC-Typ
**ACHIEVEMENTS:** 30+
**ENDEN:** 5 komplett verschiedene

**GESCHÄTZTE SPIELZEIT:**
- Story: 20-40 Stunden
- 100% Completion: 60-100 Stunden
- Freies Spiel: Endlos

---

**DIESES DOKUMENT IST VOLLSTÄNDIG UND BEREIT FÜR GEMINI CODER ZUR IMPLEMENTATION!**
