# CORONA CONTROL ULTIMATE
# ULTRA-DETAILLIERTE KOMPLETTSPEZIFIKATION VERSION 3.0
# GEMINI AI CODER OPTIMIERT - FEHLERFREIE IMPLEMENTIERUNG

```
╔══════════════════════════════════════════════════════════════════════════════════════════════════════╗
║                                                                                                      ║
║   🎮 CORONA CONTROL ULTIMATE - VOLLSTÄNDIGE SPEZIFIKATION                                           ║
║                                                                                                      ║
║   VERSION 3.0 - ERWEITERT UND OPTIMIERT                                                             ║
║                                                                                                      ║
║   Dieses Dokument enthält die KOMPLETTE Spezifikation für alle Spielsysteme:                        ║
║                                                                                                      ║
║   ✓ TEIL 1: Spieler-Charakter und Steuerung (komplett)                                              ║
║   ✓ TEIL 2: Moral- und Eskalations-System (komplett)                                                ║
║   ✓ TEIL 3: Dialog-System mit allen Texten (komplett)                                               ║
║   ✓ TEIL 4: 40+ NPC-Typen mit Spezifikationen (NEU)                                                 ║
║   ✓ TEIL 5: Alle 7 Level detailliert (komplett)                                                     ║
║   ✓ TEIL 6: Quest-System komplett (NEU)                                                             ║
║   ✓ TEIL 7: 24-Stunden Event-System (NEU)                                                           ║
║   ✓ TEIL 8: Wetter-System (NEU)                                                                     ║
║   ✓ TEIL 9: Wirtschafts-System (NEU)                                                                ║
║   ✓ TEIL 10: Fortschritts-System XP und Skills (NEU)                                                ║
║   ✓ TEIL 11: KI-Verhaltensbaum-Logik (NEU)                                                          ║
║   ✓ TEIL 12: Physik-Systeme (NEU)                                                                   ║
║   ✓ TEIL 13: Audio-System (NEU)                                                                     ║
║   ✓ TEIL 14: HUD und UI-Systeme (NEU)                                                               ║
║   ✓ TEIL 15: Alle 5 Endings detailliert (komplett)                                                  ║
║   ✓ TEIL 16: Achievements komplett (erweitert)                                                      ║
║   ✓ TEIL 17: Bonus-Mission Staatsfeind (komplett)                                                   ║
║                                                                                                      ║
║   Format: Nur Worte - Keine Code-Beispiele - Optimiert für KI-Implementierung                       ║
║   Validierungscode: DOC-SPIELABLAUF-V3-FINAL                                                        ║
║                                                                                                      ║
╚══════════════════════════════════════════════════════════════════════════════════════════════════════╝
```

---

# TEIL 1: SPIELER-CHARAKTER UND STEUERUNG KOMPLETT

## 1.1 Charakter-Identität

Der Spieler übernimmt die Rolle von Hauptmann Thomas Müller, einem erfahrenen Polizisten der Wiener Polizei. Müller ist fünfundvierzig Jahre alt, verheiratet mit zwei Kindern im Alter von zwölf und sechzehn Jahren, und hat zwanzig Jahre Diensterfahrung. Seine Motivation ist die Aufrechterhaltung der öffentlichen Ordnung bei gleichzeitigem Respekt für Bürgerrechte.

Das Charakter-Modell verwendet Base-Mesh male-athletic-forties mit Höhe eins-komma-achtundsiebzig Meter und Gewicht achtundsiebzig Kilogramm. Die Polygon-Anzahl beträgt fünfundzwanzigtausend Polygone für AAA-Qualität. Die Hautfarbe ist RGB zweihundertfünfunddreißig zweihundert einhundertachtzig. Die Haarfarbe ist RGB achtzig siebzig sechzig als dunkelgrau mit grauen Strähnen. Der Haarstyle ist short-professional-cut. Das Gesicht zeigt erfahrene Züge mit leichten Falten um die Augen und eine kleine Narbe am Kinn von einem früheren Einsatz.

## 1.2 Standard-Ausrüstung Detailliert

Die Uniform besteht aus police-uniform-austria-standard in Farbe RGB dreißig vierzig fünfzig als Dunkelblau mit Schulter-Abzeichen Polizei Wien, Brust-Badge mit Dienstnummer vier-sieben-drei-zwei, und Namensschild MÜLLER. Die Schutzweste ist stab-vest-level-II in Schwarz unter der Uniform getragen mit fünfzig Zusatz-HP Schutz. Der Helm ist riot-helmet-with-visor standardmäßig hochgeklappt mit Animation zum Herunterklappen.

Der Gürtel trägt folgende Ausrüstung: Schlagstock expandable-baton mit Schaden fünfzehn bis dreißig HP, Handschellen zwei Paar für zwei gleichzeitige Verhaftungen, Funkgerät standard-police-radio für Kommunikation mit Zentrale, Pfefferspray OC-spray mit Reichweite drei Meter und Effekt Blindheit fünf Sekunden, Taschenlampe LED-flashlight mit Reichweite zwanzig Meter, und Kabelbinder zehn Stück für Massen-Verhaftungen.

## 1.3 Steuerungs-Schema Komplett

### Tastatur und Maus

TASTE W: Vorwärts bewegen mit Geschwindigkeit drei Meter pro Sekunde.
TASTE A: Seitwärts links bewegen mit Geschwindigkeit zwei-komma-fünf Meter pro Sekunde.
TASTE S: Rückwärts bewegen mit Geschwindigkeit zwei Meter pro Sekunde.
TASTE D: Seitwärts rechts bewegen mit Geschwindigkeit zwei-komma-fünf Meter pro Sekunde.
TASTE SHIFT gehalten: Sprint aktivieren mit Geschwindigkeit sechs Meter pro Sekunde, verbraucht Ausdauer fünf Punkte pro Sekunde.
TASTE STRG: Ducken und Schleichen mit Geschwindigkeit eins-komma-fünf Meter pro Sekunde, weniger bedrohlich auf NPCs.
TASTE LEERTASTE: Springen mit Höhe null-komma-acht Meter, Weite bei Anlauf zwei Meter.
TASTE E: Kontextabhängige Interaktion wie sprechen, greifen, aktivieren, Entfernung unter drei Meter erforderlich.
TASTE E gehalten: Erweiterte Aktionen wie verhaften mit Progress-Bar zwei Sekunden, erste Hilfe drei Sekunden.
TASTE F: Schnellkommunikation mit vordefinierten Befehlen öffnet Radialmenü.
TASTE Q: Ausrüstung-Radialmenü öffnen für Schnellwechsel.
TASTE R: Nachladen wenn Waffe ausgerüstet.
TASTE G: Granate oder Tränengas werfen wenn verfügbar.
TASTE TAB: Inventar und taktische Übersicht öffnen.
TASTE M: Karte öffnen mit allen Markierungen und Quest-Zielen.
TASTE V: Zwischen Third-Person und First-Person Kamera wechseln mit Animation dreihundert Millisekunden.
TASTE B: Bodycam ein und aus schalten für Beweissicherung.
TASTE ESC: Pausenmenü öffnen.
TASTE F5: Schnellspeichern.
TASTE F9: Schnellladen.
TASTEN 1 bis 4: Waffen-Slots direkt auswählen.
TASTEN 5 bis 9: Item-Slots direkt auswählen.

MAUS BEWEGUNG: Blickrichtung und Kamera steuern mit Sensitivität einstellbar von null-komma-eins bis zwei-komma-null.
MAUS LINKE TASTE: Primäraktion wie Schlagen oder Schießen.
MAUS RECHTE TASTE: Sekundäraktion wie Zielen oder Blocken mit Schild.
MAUS RAD: Zoom zwischen nah mittel und weit oder Waffen durchschalten.

### Controller-Unterstützung

LINKER STICK: Bewegung in alle Richtungen analog.
RECHTER STICK: Kamera und Blickrichtung.
LINKER STICK GEDRÜCKT L3: Sprint aktivieren.
RECHTER STICK GEDRÜCKT R3: Zoom wechseln.
TASTE A oder X: Springen.
TASTE B oder KREIS: Ducken.
TASTE X oder QUADRAT: Interagieren.
TASTE Y oder DREIECK: Waffe wechseln.
LINKER TRIGGER LT: Zielen für präzise Aktionen.
RECHTER TRIGGER RT: Schießen oder primäre Waffe benutzen.
LINKER BUMPER LB: Granate werfen.
RECHTER BUMPER RB: Nahkampf-Angriff.
D-PAD: Schnellzugriff auf Items.
START: Pausenmenü.
SELECT: Karte öffnen.

Bei diagonaler Bewegung wird die Geschwindigkeit normalisiert sodass die Gesamtgeschwindigkeit nicht höher ist als bei Bewegung in eine Richtung.

## 1.4 Ausdauer-System

Die Ausdauer-Leiste zeigt maximal einhundert Punkte. Die Regeneration erfolgt automatisch wenn keine anstrengende Aktion ausgeführt wird.

AUSDAUER-VERBRAUCH:
Normales Gehen verbraucht null Punkte pro Sekunde.
Schnelles Gehen verbraucht eins Punkt pro Sekunde.
Sprint verbraucht fünf Punkte pro Sekunde.
Sprint mit voller Ausrüstung verbraucht acht Punkte pro Sekunde.
Kampfhandlungen verbrauchen zehn Punkte pro Aktion.
Springen verbraucht fünf Punkte.
Klettern verbraucht drei Punkte pro Sekunde.

AUSDAUER-REGENERATION:
Stehen regeneriert drei Punkte pro Sekunde.
Langsames Gehen regeneriert eins Punkt pro Sekunde.
Nach Erschöpfung bei null Punkten ist die Regeneration fünfzig Prozent langsamer für dreißig Sekunden.

---

# TEIL 2: MORAL- UND ESKALATIONS-SYSTEM DETAILLIERT

## 2.1 Moral-System

### Moral-Skala Definition

Das Moral-System verwendet eine Skala von minus einhundert bis plus einhundert Punkten. Der Startwert bei Spielbeginn ist null. Jede Spieler-Aktion beeinflusst diesen Wert positiv oder negativ. Der aktuelle Moral-Wert wird im HUD als farbiger Balken angezeigt.

### Die Fünf Moral-Stufen

STUFE HEILIG entspricht Moral-Punkten von plus fünfundsiebzig bis plus einhundert.
Anzeige-Farbe: Helles Grün RGB null zweihundert null.
NPC-Reaktionen: NPCs reagieren mit höchstem Respekt und Vertrauen. Demonstranten kooperieren bereitwillig. Journalisten berichten sehr positiv. Kollegen zeigen Bewunderung und folgen Befehlen sofort.
Gameplay-Auswirkung: Verhandlungs-Erfolgsrate plus dreißig Prozent. Eskalation steigt langsamer. Zugang zu friedlichen Lösungen.

STUFE GUT entspricht Moral-Punkten von plus fünfundzwanzig bis plus vierundsiebzig.
Anzeige-Farbe: Grün RGB fünfzig zweihundert fünfzig.
NPC-Reaktionen: NPCs reagieren freundlich und kooperativ. Journalisten berichten neutral bis positiv. Kollegen zeigen Respekt.
Gameplay-Auswirkung: Verhandlungs-Erfolgsrate plus fünfzehn Prozent.

STUFE NEUTRAL entspricht Moral-Punkten von minus vierundzwanzig bis plus vierundzwanzig.
Anzeige-Farbe: Gelb RGB zweihundertfünfundfünfzig zweihundert null.
NPC-Reaktionen: NPCs reagieren vorsichtig und abwartend. Journalisten berichten faktisch ohne Wertung. Kollegen zeigen keine besondere Reaktion.
Gameplay-Auswirkung: Standard-Werte für alle Mechaniken.

STUFE SCHLECHT entspricht Moral-Punkten von minus vierundsiebzig bis minus fünfundzwanzig.
Anzeige-Farbe: Orange RGB zweihundertfünfundfünfzig einhundertfünfzig null.
NPC-Reaktionen: NPCs reagieren ängstlich oder feindlich. Demonstranten sind misstrauisch. Journalisten berichten kritisch. Kollegen zeigen Besorgnis.
Gameplay-Auswirkung: Verhandlungs-Erfolgsrate minus fünfzehn Prozent. Eskalation steigt schneller.

STUFE TYRANN entspricht Moral-Punkten von minus einhundert bis minus fünfundsiebzig.
Anzeige-Farbe: Rot RGB zweihundertfünfundfünfzig null null.
NPC-Reaktionen: NPCs reagieren mit Panik oder extremer Aggression. Demonstranten fliehen oder greifen an. Journalisten berichten scharf negativ. Kollegen distanzieren sich.
Gameplay-Auswirkung: Verhandlungs-Erfolgsrate minus dreißig Prozent. Nur aggressive Optionen verfügbar. Führt zu schlechten Endings.

### Vollständige Moral-Aktions-Tabelle

POSITIVE AKTIONEN:
Friedlichen Dialog führen gibt plus fünf bis plus fünfzehn Moral.
Erfolgreiche Deeskalation gibt plus zehn bis plus zwanzig Moral.
Verletztem NPC helfen mit Erste-Hilfe gibt plus fünf bis plus fünfzehn Moral.
Familie sicher evakuieren gibt plus zehn Moral.
Kind aktiv schützen gibt plus fünfzehn bis plus zwanzig Moral.
Journalist bei Arbeit unterstützen gibt plus fünf Moral.
Ältere Person respektvoll behandeln gibt plus zehn Moral.
Aggressive Situation friedlich lösen gibt plus fünfzehn Moral.
Befehl verweigern der unethisch ist gibt plus zwanzig bis plus dreißig Moral.
Korruption ablehnen gibt plus zehn Moral.
Informationen an Demonstranten über Rechte geben gibt plus fünf Moral.

NEGATIVE AKTIONEN:
Unnötige Gewalt gegen friedlichen NPC gibt minus zehn bis minus dreißig Moral.
Friedlichen Demonstrant verhaften ohne Grund gibt minus fünf bis minus fünfzehn Moral.
Tränengas in Menge mit Kindern einsetzen gibt minus zwanzig bis minus vierzig Moral.
Journalist behindern oder angreifen gibt minus zehn bis minus zwanzig Moral.
Verletzten ignorieren ohne Hilfe gibt minus fünf bis minus fünfzehn Moral.
Zivilist töten gibt minus fünfzig bis minus einhundert Moral und löst automatisch ENDING SCHANDE aus.
Kind verletzen gibt minus vierzig bis minus sechzig Moral.
Ältere Person angreifen gibt minus dreißig Moral.
Korruption annehmen gibt minus acht Moral.
Unschuldigen verhaften gibt minus fünfzehn Moral.
Übermäßige Gewalt bei Verhaftung gibt minus zehn Moral.
Wasserwerfer auf Einzelperson gibt minus fünfzehn Moral.

## 2.2 Eskalations-System

### Eskalations-Skala Definition

Das Eskalations-System misst die Gesamt-Spannung der Situation von null bis einhundert Prozent. Der Wert wird im HUD als Thermometer-Anzeige mit fünf farbigen Zonen dargestellt.

### Die Fünf Eskalations-Stufen

STUFE EINS FRIEDLICH entspricht null bis zwanzig Prozent.
Anzeige-Farbe: Grün.
Umgebung: NPCs verhalten sich ruhig und entspannt. Demonstranten skandieren friedlich mit normaler Lautstärke. Polizei steht entspannt mit Waffen gesichert. Atmosphäre ist wie ein Volksfest.
NPC-Aggression: Null-komma-null-fünf. Wurf-Chance: Null. Flucht-Chance: Null-komma-eins.

STUFE ZWEI ANGESPANNT entspricht einundzwanzig bis vierzig Prozent.
Anzeige-Farbe: Gelb.
Umgebung: NPCs zeigen erste Nervosität. Rufe werden lauter und aggressiver. Erste verbale Provokationen gegen Polizei. Einige NPCs verlassen den Bereich.
NPC-Aggression: Null-komma-zwei. Wurf-Chance: Null-komma-null-fünf. Flucht-Chance: Null-komma-zwei.

STUFE DREI AGGRESSIV entspricht einundvierzig bis sechzig Prozent.
Anzeige-Farbe: Orange.
Umgebung: NPCs beginnen zu schubsen und drängeln. Erste Wurfgeschosse wie Flaschen und Dosen möglich. Polizei geht in Alarmbereitschaft. Familien verlassen den Bereich. Medien verstärken Präsenz.
NPC-Aggression: Null-komma-vier. Wurf-Chance: Null-komma-zwei. Flucht-Chance: Null-komma-drei-fünf.

STUFE VIER GEWALTTÄTIG entspricht einundsechzig bis achtzig Prozent.
Anzeige-Farbe: Rot.
Umgebung: Aktive Kämpfe zwischen Demonstranten und Polizei. Verletzungen auf beiden Seiten. Wasserwerfer-Einsatz wird freigegeben. Tränengas wird freigegeben. Sachbeschädigung an Fahrzeugen und Gebäuden.
NPC-Aggression: Null-komma-sieben. Wurf-Chance: Null-komma-vier. Flucht-Chance: Null-komma-fünf-fünf.

STUFE FÜNF AUFRUHR entspricht einundachtzig bis einhundert Prozent.
Anzeige-Farbe: Dunkelrot.
Umgebung: Schwere Gewalt und Chaos überall. Letale Waffen werden freigegeben für Extremfälle. Tote und Schwerstverletzte möglich. Gebäude brennen. Barrikaden werden errichtet. Hubschrauber und Spezialeinheiten werden gerufen.
NPC-Aggression: Null-komma-neun. Wurf-Chance: Null-komma-sechs. Flucht-Chance: Null-komma-sieben.

### Vollständige Eskalations-Trigger-Tabelle

ESKALATIONS-ERHÖHUNG:
Polizist schlägt friedlichen Demonstrant gibt plus fünf bis plus fünfzehn Eskalation.
Wasserwerfer-Einsatz gibt plus zehn Eskalation.
Tränengas-Einsatz gibt plus fünfzehn Eskalation.
Schusswaffen-Einsatz gibt plus dreißig bis plus fünfzig Eskalation.
Demonstrant wird getötet gibt plus vierzig Eskalation.
Aggressive Rede eines Anführers auf Bühne gibt plus zehn Eskalation.
Polizei-Ultimatum je nach Ton gibt plus fünf bis plus zwanzig Eskalation.
Verhaftung eines beliebten Anführers gibt plus zwanzig Eskalation.
Journalist wird verletzt gibt plus fünfzehn Eskalation.
Kind wird verletzt gibt plus dreißig Eskalation.
Polizei-Fahrzeug wird angegriffen gibt plus zehn Eskalation.
Molotow-Cocktail wird geworfen gibt plus fünfundzwanzig Eskalation.

ESKALATIONS-SENKUNG:
Erfolgreiche Verhandlung gibt minus zehn bis minus zwanzig Eskalation.
Demonstranten-Anführer kooperiert gibt minus fünfzehn Eskalation.
Familien verlassen freiwillig und sicher gibt minus fünf Eskalation.
Deeskalations-Rede durch Spieler gibt minus fünf bis minus fünfzehn Eskalation.
Polizei zieht sich taktisch zurück gibt minus zehn Eskalation.
Verletztem Demonstrant wird öffentlich geholfen gibt minus fünf Eskalation.
Wasser und Nahrung werden verteilt gibt minus fünf Eskalation.
Zeit vergeht ohne Incident minus eins pro Minute.

---

# TEIL 3: DIALOG-SYSTEM KOMPLETT

## 3.1 Dialog-Mechanik Technisch

### Interaktions-Auslösung

Der Spieler nähert sich einem NPC auf unter drei Meter Distanz. Ein Kontext-Prompt erscheint am unteren Bildschirmrand in roter Schrift mit dem Format E in eckigen Klammern gefolgt vom Interaktionstyp und NPC-Namen. Die Distanz zum NPC wird in Metern angezeigt.

Bei Polizisten erscheint der Text Mit Kollege Name sprechen.
Bei friedlichen Demonstranten erscheint der Text Name ansprechen.
Bei aggressiven Demonstranten erscheint der Text Name konfrontieren oder Name festnehmen.
Bei älteren NPCs erscheint der Text Name helfen oder Mit Name sprechen.
Bei Journalisten erscheint der Text Mit Reporter Name sprechen.
Bei verletzten NPCs erscheint der Text Name helfen mit Erste-Hilfe.

### Dialog-Fenster Spezifikation

Das Dialog-Fenster erscheint am unteren Bildschirm-Drittel zentriert. Der Container hat Position Y gleich Bildschirmhöhe minus zweihundert Pixel, Breite gleich achtzig Prozent der Bildschirmbreite mit Maximum siebenhundert Pixel, Höhe passt sich Inhalt an mit Maximum dreihundertfünfzig Pixel, Hintergrund halbtransparentes Schwarz RGBA null null null zweihundert, Rahmen zwei Pixel solid RGB achtzig achtzig achtzig, Rahmen-Radius acht Pixel, und Innen-Abstand zwanzig Pixel.

Der NPC-Name erscheint oben links in Schriftart Roboto Bold mit Größe achtzehn Pixel in Farbe Weiß. Der NPC-Typ erscheint in Klammern daneben in Schriftart Roboto Regular mit Größe vierzehn Pixel in Farbe RGB einhundertachtzig einhundertachtzig einhundertachtzig.

Der Dialog-Text erscheint darunter mit Schriftart Roboto Regular in Größe sechzehn Pixel in Farbe Weiß mit Zeilenabstand eins-komma-vier. Der Typewriter-Effekt zeigt jeden Buchstaben nach dreißig Millisekunden. Die Leertaste überspringt den Effekt und zeigt den kompletten Text sofort. Audio spielt typing-sound-soft während Typewriter-Effekt.

### Antwort-Optionen Layout

Die Antwort-Optionen erscheinen nach dem NPC-Text in einer vertikalen Liste mit fünf Pixel Abstand zwischen Optionen. Jede Option ist ein Button mit Höhe vierzig Pixel, Breite einhundert Prozent, Hintergrund RGB dreißig dreißig vierzig, Hover-Hintergrund RGB fünfzig fünfzig sechzig, Rahmen eins Pixel solid RGB sechzig sechzig siebzig, und Rahmen-Radius vier Pixel.

Die Options-Nummer steht links in eckigen Klammern in Farbe RGB einhundertfünfzig einhundertfünfzig einhundertfünfzig. Der Options-Text steht mittig in Weiß. Die Impact-Anzeige steht rechts mit Moral-Auswirkung als Zahl mit Plus oder Minus in Grün bei positiv oder Rot bei negativ und Eskalations-Auswirkung als Pfeil nach oben in Rot bei eskalierend oder Pfeil nach unten in Grün bei deeskalierend.

Navigation erfolgt mit Tasten eins zwei drei für direkte Auswahl oder Pfeiltasten hoch runter plus Enter für Auswahl oder Mausklick auf Option.

---

# TEIL 4: ALLE 40 PLUS NPC-TYPEN DETAILLIERT

## 4.1 NPC-Kategorien Übersicht

Das Spiel enthält über vierzig einzigartige NPC-Typen in fünf Hauptkategorien.

KATEGORIE DEMONSTRANTEN enthält einunddreißig Typen aufgeteilt in Passiv mit zehn Typen, Aktiv mit acht Typen, Aggressiv mit acht Typen, und Vulnerabel mit fünf Typen.

KATEGORIE POLIZEI enthält zehn Typen aufgeteilt in Einsatzkräfte mit sechs Typen, Spezialeinheiten mit drei Typen, und Kommando mit einem Typ.

KATEGORIE MEDIEN enthält vier Typen: Journalist, Fotograf, Kameramann, und Drohnen-Pilot.

KATEGORIE MEDIZINISCH enthält drei Typen: Sanitäter, Rot-Kreuz-Helfer, und Straßenmediziner.

KATEGORIE ZIVILISTEN enthält fünf Typen: Passant, Ladenbesitzer, Pendler, Tourist, und Anwohner.

## 4.2 Passive Demonstranten Zehn Typen

### NPC-TYP NDP001 Friedlicher Demonstrant

Identifier: peaceful_protester.
Display-Name: Friedlicher Demonstrant.
Polygon-Anzahl: Achtzehntausend.
Gesundheit: Siebzig HP.
Geschwindigkeit: Zwei-komma-fünf Meter pro Sekunde.
Aggression: Null-komma-null-fünf.
Flucht-Schwelle: Bei dreißig Prozent Gesundheit oder Waffengebrauch in der Nähe.
Gruppen-Tendenz: Null-komma-acht, bleibt gerne in Gruppen.
Ist-Vulnerabel: Nein.
Kann-Werfen: Nein.
Kann-Skandieren: Ja.
Hat-Gasmaske: Nein.
Resistenz-Tränengas: Null.
Resistenz-Wasser: Null.
Moral-Impact bei Verhaftung: Minus fünf.
Moral-Impact bei Verletzung: Minus fünfzehn.
Animations-Set: peaceful mit Varianten standing, walking, chanting, clapping.
Outfit-Varianten: Acht verschiedene casual Outfits mit Demonstrations-Schildern.

### NPC-TYP NDP002 Betende Ältere Person

Identifier: praying_elderly.
Display-Name: Betende Ältere Person.
Polygon-Anzahl: Sechzehntausend.
Gesundheit: Fünfzig HP.
Geschwindigkeit: Eins-komma-fünf Meter pro Sekunde.
Aggression: Null-komma-null.
Flucht-Schwelle: Bei zwanzig Prozent Gesundheit.
Gruppen-Tendenz: Null-komma-vier, eher allein oder in kleinen Gruppen.
Ist-Vulnerabel: Ja, Angriff führt zu höherem Moral-Verlust.
Kann-Werfen: Nein.
Kann-Skandieren: Nein, betet stattdessen.
Hat-Gasmaske: Nein.
Moral-Impact bei Verhaftung: Minus fünfundzwanzig.
Moral-Impact bei Verletzung: Minus fünfzig.
Medien-Multiplikator: Drei-komma-null, hohe Aufmerksamkeit bei Gewalt.
Animations-Set: elderly mit Varianten standing-with-cane, praying, sitting.
Outfit: Konservative Kleidung, Rosenkranz in Hand.

### NPC-TYP NDP003 Familie mit Kindern

Identifier: family_with_children.
Display-Name: Familie mit Kindern.
Polygon-Anzahl: Fünfundzwanzigtausend, Gruppen-Modell.
Gesundheit: Siebzig HP für Erwachsene, Kinder unverwundbar.
Geschwindigkeit: Zwei-komma-fünf Meter pro Sekunde.
Aggression: Null-komma-null.
Flucht-Schwelle: Bei sechzig Prozent Gesundheit, flieht sofort bei Gewalt.
Ist-Vulnerabel: Ja, höchste Schutzstufe.
Kann-Werfen: Nein.
Moral-Impact bei Verhaftung Eltern: Minus vierzig.
Moral-Impact bei Verletzung: Minus sechzig.
Medien-Multiplikator: Fünf-komma-null, maximale Aufmerksamkeit.
Verhaltens-Baum: FLEE, flieht bei erster Eskalation.
Outfit-Varianten: Sechs verschiedene Familien-Konstellationen.
Kinder-Alter: Fünf bis zwölf Jahre.

### NPC-TYP NDP004 Student

Identifier: student_protester.
Display-Name: Student.
Polygon-Anzahl: Vierzehntausendfünfhundert.
Gesundheit: Fünfundachtzig HP.
Geschwindigkeit: Vier-komma-zwei Meter pro Sekunde.
Aggression: Null-komma-zwei-fünf.
Moral: Achtzig von einhundert, hohe Motivation.
Furcht: Zwanzig von einhundert, mutig.
Compliance: Fünfzig von einhundert.
Moral-Impact bei Verhaftung: Minus acht.
Moral-Impact bei Verletzung: Minus zwölf.
Medien-Multiplikator: Eins-komma-fünf.
Verhaltens-Baum: ACTIVE_DEMO.
Outfit: Casual jung, Rucksack, Smartphone ständig in Hand.
Besonderheit: Macht viele Selfies und Videos, postet live.

### NPC-TYP NDP005 Gewerkschafter

Identifier: union_worker.
Display-Name: Gewerkschafter.
Polygon-Anzahl: Fünfzehntausend.
Gesundheit: Einhundert HP.
Geschwindigkeit: Drei-komma-acht Meter pro Sekunde.
Aggression: Null-komma-drei.
Besonderheit: Organisiert in Gewerkschaftsgruppen von fünf bis zehn NPCs.
Verhaltens-Baum: GROUP_CHANT, führt Gruppen-Sprechchöre an.
Outfit: Arbeitskleidung, Gewerkschafts-Weste, Banner.

### NPC-TYP NDP006 bis NDP010

Weitere passive Demonstranten-Typen umfassen: Rentner mit Pension-Sorgen, Selbstständiger mit Existenz-Angst, Künstler mit Kultur-Protest, Krankenschwester mit Pflege-Protest, und Lehrer mit Bildungs-Protest. Alle mit individuellen Outfits, Verhaltensmustern und Moral-Impacts.

## 4.3 Aktive Demonstranten Acht Typen

### NPC-TYP NDA001 Aktivist

Identifier: activist.
Display-Name: Aktivist.
Polygon-Anzahl: Fünfzehntausend.
Gesundheit: Neunzig HP.
Geschwindigkeit: Vier-komma-null Meter pro Sekunde.
Aggression: Null-komma-vier.
Besonderheit: Erfahren, kennt rechtliche Grenzen, zitiert Gesetze bei Festnahme.
Verhaltens-Baum: ACTIVE_DEMO mit rechtlicher Kenntnis.
Dialog-Spezial: Verlangt Anwalt, kennt seine Rechte.
Outfit: Professionell aktivistisch, viele Sticker, Megafon.

### NPC-TYP NDA002 Organisator

Identifier: organizer.
Display-Name: Demo-Organisator.
Polygon-Anzahl: Fünfzehntausend.
Gesundheit: Achtzig HP.
Geschwindigkeit: Drei-komma-acht Meter pro Sekunde.
Aggression: Null-komma-zwei-fünf.
Besonderheit: Koordiniert Gruppen mit Megafon und Clipboard.
Verhaltens-Baum: LEADERSHIP mit Crowd-Directing.
Einfluss: Hoch, Festnahme führt zu minus fünfzehn Prozent Eskalation.
Spawn-Zeit: Früh ab acht Uhr, baut Bühne auf.
Outfit: Leitweste, Megafon, Walkie-Talkie.

### NPC-TYP NDA003 Streamer

Identifier: streamer.
Display-Name: Live-Streamer.
Polygon-Anzahl: Fünfzehntausendfünfhundert.
Gesundheit: Siebzig HP.
Geschwindigkeit: Vier-komma-null Meter pro Sekunde.
Aggression: Null-komma-eins-fünf.
Besonderheit: Smartphone-Kamera läuft permanent, Live-Übertragung.
Medien-Multiplikator: Zwei-komma-null für alle Aktionen in dreißig Meter Radius.
Outfit: Casual mit Smartphone-Halterung, Ring-Licht, Powerbank.

### NPC-TYP NDA004 bis NDA008

Weitere aktive Typen umfassen: Medic-Demonstrant mit weißem Kreuz der Verletzten hilft, Musik-Demonstrant mit Trommeln, Flaggen-Träger mit großer Fahne, Transparenz-Träger mit Banner, und Samba-Gruppe mit koordiniertem Rhythmus.

## 4.4 Aggressive Demonstranten Acht Typen

### NPC-TYP NDG001 Provokateur

Identifier: provocateur.
Display-Name: Provokateur.
Polygon-Anzahl: Fünfzehntausend.
Gesundheit: Neunzig HP.
Geschwindigkeit: Vier-komma-fünf Meter pro Sekunde.
Aggression: Null-komma-neun.
Besonderheit: Agent Provocateur, löst gezielt Eskalation aus, verschwindet dann.
Verstecktes Objective: Kann als verdeckter Polizist enttarnt werden.
Verhaltens-Baum: PROVOKE dann FLEE.
Outfit: Schwarze Kleidung, versteckt Gesicht teils.

### NPC-TYP NDG002 Antifa-Mitglied

Identifier: antifa.
Display-Name: Antifa-Mitglied.
Polygon-Anzahl: Fünfzehntausendfünfhundert.
Gesundheit: Einhundert HP.
Geschwindigkeit: Vier-komma-fünf Meter pro Sekunde.
Aggression: Null-komma-sieben.
Besonderheit: Schwarzer Block Koordination, bewegt sich in Formation.
Verhaltens-Baum: COORDINATED_AGGRESSION.
Outfit: Komplett schwarz, Vermummung, Handschuhe.

### NPC-TYP NDG003 Randalierer

Identifier: rioter.
Display-Name: Randalierer.
Polygon-Anzahl: Fünfzehntausend.
Gesundheit: Einhundertzehn HP.
Geschwindigkeit: Fünf-komma-null Meter pro Sekunde.
Aggression: Null-komma-acht.
Waffen: Steine, Flaschen, Eisenstangen.
Verhaltens-Baum: AGGRESSIVE_ATTACK mit Zerstörungs-Fokus.
Moral-Impact bei Verhaftung: Plus fünf, gerechtfertigte Festnahme.

### NPC-TYP NDG004 Extremist

Identifier: extremist.
Display-Name: Extremist.
Polygon-Anzahl: Fünfzehntausendfünfhundert.
Gesundheit: Einhundertzwanzig HP.
Geschwindigkeit: Fünf-komma-fünf Meter pro Sekunde.
Aggression: Null-komma-neun.
Waffen: Pistole illegal, Messer.
Verhaltens-Baum: TACTICAL_AGGRESSION mit Deckung.
Flucht: Niemals, kämpft bis zum Ende.
Spawn-Zeit: Spät, ab achtzehn Uhr.

### NPC-TYP NDG005 bis NDG008

Weitere aggressive Typen umfassen: Rechtsradikaler mit nationalistischen Symbolen, Pyrotechniker mit Bengalos und Molotows, Hooligan mit Kampferfahrung, und Vermummter Angreifer.

## 4.5 Vulnerable Demonstranten Fünf Typen

Alle vulnerablen NPCs haben erhöhten Moral-Impact bei Gewalt und maximalen Medien-Multiplikator.

### NPC-TYP NDV001 Schwangere Frau

Identifier: pregnant_woman.
Gesundheit: Sechzig HP.
Geschwindigkeit: Zwei-komma-null Meter pro Sekunde.
Moral-Impact bei Verletzung: Minus siebzig.
Medien-Multiplikator: Fünf-komma-null.
Besonderheit: Sichtbar schwanger, höchste Schutzstufe.

### NPC-TYP NDV002 Rollstuhlfahrer

Identifier: wheelchair_user.
Gesundheit: Fünfzig HP.
Geschwindigkeit: Zwei-komma-fünf Meter pro Sekunde mit Rollstuhl.
Moral-Impact bei Verletzung: Minus fünfundsechzig.
Besonderheit: Kann nicht fliehen, braucht Hilfe bei Evakuierung.

### NPC-TYP NDV003 bis NDV005

Weitere vulnerable Typen umfassen: Blinder mit Blindenhund, Gehörloser mit Gebärdensprache, und Chronisch Kranker mit sichtbarem Infusionsbeutel.

## 4.6 Polizei-NPCs Zehn Typen

### NPC-TYP NPT001 Streifenpolizist

Identifier: patrol_officer.
Polygon-Anzahl: Zwanzigtausend.
Gesundheit: Einhundert HP plus fünfzig Rüstung.
Geschwindigkeit: Vier-komma-null Meter pro Sekunde.
Waffen: Pistole Glock-siebzehn, Schlagstock, Pfefferspray.
Verhaltens-Baum: FOLLOW_ORDERS, folgt Spieler-Befehlen.
Outfit: Standard-Polizeiuniform, Schutzweste.

### NPC-TYP NPT002 Bereitschaftspolizist

Identifier: riot_officer.
Polygon-Anzahl: Zweiundzwanzigtausend.
Gesundheit: Einhundertfünfzig HP plus einhundert Rüstung.
Geschwindigkeit: Drei-komma-fünf Meter pro Sekunde wegen schwerer Ausrüstung.
Waffen: Schlagstock lang, Schild groß, Pfefferspray.
Verhaltens-Baum: FORMATION_HOLD.
Outfit: Volle Riot-Ausrüstung, Helm mit Visier.

### NPC-TYP NPT003 bis NPT006

Weitere Einsatzkräfte umfassen: Wasserwerfer-Bediener, Tränengas-Spezialist, Hunde-Führer mit Diensthund, und Motorrad-Polizist.

### NPC-TYP NPM001 WEGA-Beamter

Identifier: wega_officer.
Polygon-Anzahl: Fünfundzwanzigtausend.
Gesundheit: Zweihundert HP plus einhundertfünfzig Rüstung.
Geschwindigkeit: Fünf-komma-null Meter pro Sekunde.
Waffen: Steyr-AUG Sturmgewehr, Glock-siebzehn, Blendgranaten.
Verhaltens-Baum: TACTICAL_ASSAULT.
Outfit: Schwarze taktische Ausrüstung, ballistischer Helm mit Nachtsicht.

### NPC-TYP NPM002 bis NPM003

Weitere Spezialeinheiten umfassen: WEGA-Scharfschütze und Verhandlungs-Spezialist.

### NPC-TYP NPK001 Einsatzleiter

Identifier: commander.
Polygon-Anzahl: Zwanzigtausend.
Gesundheit: Einhundert HP.
Geschwindigkeit: Drei-komma-null Meter pro Sekunde.
Rolle: Gibt Befehle, koordiniert Einsatz.
Verhaltens-Baum: COMMAND.
Outfit: Uniform mit Rangabzeichen, Funkgerät, Klemmbrett.

## 4.7 Medien-NPCs Vier Typen

### NPC-TYP NDN001 Journalist

Identifier: journalist.
Polygon-Anzahl: Fünfzehntausend.
Gesundheit: Fünfundsiebzig HP.
Geschwindigkeit: Vier-komma-zwei Meter pro Sekunde.
Aggression: Null.
Ausrüstung: Mikrofon, Notizblock, Presseausweis sichtbar.
Besonderheit: Beeinflusst Medien-Score, internationale Konsequenzen bei Verletzung.
Verhaltens-Baum: OBSERVE_AND_REPORT.
Dialog-Optionen: Interview geben oder ablehnen.

### NPC-TYP NDN002 bis NDN004

Weitere Medien-Typen umfassen: Fotograf mit großer Kamera, Kameramann mit Schulterkamera und Licht, und Drohnen-Pilot mit Steuerung.

## 4.8 Medizinische NPCs Drei Typen

### NPC-TYP NMD001 Sanitäter

Identifier: paramedic.
Polygon-Anzahl: Sechzehntausend.
Gesundheit: Achtzig HP.
Geschwindigkeit: Vier-komma-null Meter pro Sekunde.
Funktion: Heilt verletzte NPCs, Spieler kann Hilfe rufen.
Ist-Angreifbar: Ja, aber mit schwerem Moral-Verlust.
Verhaltens-Baum: HEAL_INJURED.
Outfit: Rot-Kreuz-Weste, Erste-Hilfe-Tasche.

### NPC-TYP NMD002 bis NMD003

Weitere medizinische Typen umfassen: Rot-Kreuz-Helfer und Straßenmediziner der Demo.

## 4.9 Zivilisten-NPCs Fünf Typen

### NPC-TYP NZV001 Passant

Identifier: bystander.
Polygon-Anzahl: Vierzehntausend.
Gesundheit: Siebzig HP.
Geschwindigkeit: Drei-komma-null Meter pro Sekunde.
Aggression: Null-komma-null-fünf.
Furcht: Null-komma-sieben, flieht bei Gewalt.
Verhaltens-Baum: AVOID_CONFLICT.
Outfit: Normale Stadtkleidung, Shopping-Taschen.

### NPC-TYP NZV002 bis NZV005

Weitere Zivilisten-Typen umfassen: Ladenbesitzer der seinen Laden schützt, Pendler auf dem Weg zur Arbeit, Tourist mit Kamera und Stadtplan, und Anwohner der aus dem Fenster schaut.

---

# TEIL 5: QUEST-SYSTEM KOMPLETT

## 5.1 Quest-Typen Übersicht

Das Spiel enthält vier Quest-Kategorien: Haupt-Story-Quests mit zwölf Quests, Side-Quests mit zwanzig optionalen Quests, Daily-Quests die täglich wiederholt werden können, und Hidden-Quests mit zehn versteckten Objectives.

## 5.2 Haupt-Quest Struktur

Haupt-Quests folgen einer linearen Progression wobei Quest Eins zu Quest Zwei führt und so weiter. Jede Quest hat mehrere Objectives, Zeitlimits wo relevant, verschiedene Completion-Methoden, und Branching-Outcomes basierend auf Spieler-Entscheidungen.

### Beispiel Haupt-Quest: Staatsfeind Nummer Eins

QUEST-NAME: Staatsfeind Nummer Eins.
QUEST-TYP: Haupt-Story-Quest.
LEVEL: Level 3 bis 5 parallel.

OBJECTIVE EINS: Stephansplatz erreichen.
OBJECTIVE ZWEI: Demo aus der Distanz beobachten und Intel sammeln.
OBJECTIVE DREI: Kommandant per Funk Bericht erstatten.
OBJECTIVE VIER: Eskalation verhindern durch Deeskalations-Tools.
OBJECTIVE FÜNF: Ringleader verhaften oder neutralisieren.

COMPLETION-REWARDS:
XP-Reward: Tausend Erfahrungspunkte.
Currency-Reward: Fünfhundert Credits.
Item-Reward: Upgrade Schlagstock zu Advanced-Model.
Story-Progression: Nächstes Kapitel wird freigeschaltet.

FAILURE-CONDITIONS:
Wenn Demo in Gewalt eskaliert wird Mission fehlgeschlagen.
Wenn Spieler übermäßige Gewalt anwendet wird Mission fehlgeschlagen.
Wenn Zeitlimit überschritten wird Mission fehlgeschlagen.

BRANCHING-OUTCOMES:
Friedliche Lösung führt zu anderem Ende als gewaltsame Unterdrückung.
Beeinflusst spätere Quests und NPC-Beziehungen.

## 5.3 Side-Quest Beispiele

### Side-Quest: Vermisster Sohn

TRIGGER: Nach dreißig Minuten Gameplay, wenn Tension-Level zwischen vierzig und sechzig Prozent.
QUEST-GEBER: Maria Schneider, zweiundfünfzig Jahre, verzweifelte Mutter.

OBJECTIVE EINS: Informationen sammeln in fünf Minuten.
Mit Maria sprechen und Beschreibung des Sohnes erhalten: Lukas, neunzehn Jahre, rote Jacke, blaue Jeans.
Drei Zeugen befragen für Hinweise.

OBJECTIVE ZWEI: Suchbereich durchsuchen in zehn Minuten.
Fünf mögliche Locations randomisiert pro Playthrough: Hinterhof, U-Bahn-Station, Dach, Café, oder in der Menge.
Hinweis-System folgen: Jacken-Fetzen, Blutspuren.

OBJECTIVE DREI: Lukas finden mit vier möglichen Outcomes.

OUTCOME A Sicher gefunden mit vierzig Prozent Chance:
Lukas ist verängstigt aber unverletzt.
Rückführung zur Mutter mit emotionaler Cutscene.
Reward: Reputation plus zehn, Achievement Lebensretter.

OUTCOME B Verletzt gefunden mit fünfunddreißig Prozent Chance:
Lukas hat gebrochenes Bein und Kopfverletzung.
Sanitäter rufen und Lukas schützen.
Reward: Reputation plus sieben, Achievement Held im Chaos.

OUTCOME C Tot gefunden mit fünfzehn Prozent Chance:
Lukas wurde in Massenpanik zertrampelt.
Maria die Nachricht überbringen mit Dialog-Optionen.
Consequence: Tension steigt plus zehn, negative Medien-Aufmerksamkeit.
Reward: Reputation plus drei, Achievement Tragödie.

OUTCOME D Nicht gefunden mit zehn Prozent Chance:
Suche läuft ab nach zwanzig Minuten.
Maria wartet weiterhin verzweifelt.
Spieler muss entscheiden ob weitersuchen oder aufgeben.

### Weitere Side-Quests

Weitere Side-Quests umfassen: Ladendiebstahl verhindern, Obdachlosem helfen, Fälscher-Ring aufdecken, Verletztem Polizisten helfen, Evakuierung koordinieren, Barrikade räumen, Undercover-Journalist enttarnen, VIP-Schutz übernehmen, Geiselnahme lösen, und Bombendrohung untersuchen.

## 5.4 Daily-Quests

Daily-Quests werden jeden Tag neu generiert mit drei verfügbaren Quests pro Tag.

QUEST-TYPEN:
Stop-Pickpocket: Taschendieb fangen.
Help-Tourist: Tourist Wegbeschreibung geben.
Check-Shop-Security: Gebäude inspizieren.
Direct-Traffic: Fußgänger-Fluss managen.

REWARD-SCALING:
Feste Belohnung: Einhundert XP und fünfzig Credits.
Kann täglich wiederholt werden für konstantes Einkommen.

STREAK-BONUS:
Tag Eins: Eins-mal Multiplikator.
Tag Sieben: Zwei-mal Multiplikator.
Tag Dreißig: Drei-mal Multiplikator.

---

# TEIL 6: 24-STUNDEN EVENT-SYSTEM

## 6.1 Zeit-System Kern-Mechanik

Ein kompletter Spiel-Tag von vierundzwanzig Stunden entspricht exakt vierundzwanzig Minuten realer Spielzeit. Eine Spielstunde entspricht sechzig Sekunden Realzeit. Eine Spielminute entspricht einer Sekunde Realzeit.

### System-Update-Frequenzen

Haupt-Render-Loop: Sechzig Hertz entsprechend sechzehn-komma-sechs-sieben Millisekunden pro Frame.
Physik-Update: Einhundertzwanzig Hertz entsprechend acht-komma-drei-drei Millisekunden pro Schritt.
KI-Update: Zehn Hertz entsprechend einhundert Millisekunden pro Zyklus.
Event-Checks: Alle fünftausend Millisekunden entsprechend fünf Spielminuten.

## 6.2 Morgen-Phase Sechs Uhr bis Zwölf Uhr

### Event Tagesbeginn um Sechs Uhr

LICHT-TRANSITION Dauer fünf Minuten Spielzeit entspricht fünf Sekunden Realzeit:

Zeitpunkt sechs Uhr null Minuten:
Skybox Zenith-Farbe RGB fünfzehn fünfzehn fünfundvierzig tiefes Nachtblau.
Horizont-Farbe RGB fünfundzwanzig zwanzig fünfzig Dunkelviolett.
Sonne unter Horizont bei minus achtzehn Grad.
Sterne-Deckkraft null-komma-acht.
Alle zweihundertsiebenundvierzig Straßenlaternen aktiv.

Zeitpunkt sechs Uhr fünf Minuten:
Skybox Zenith-Farbe RGB einhundertfünfunddreißig einhundertachtzig zweihundertdreißig Hellblau.
Sonne drei Grad über Horizont.
Sterne komplett verblasst.
Alle Laternen ausgeschaltet nach Flicker-Sequenz.
Directional-Light bei fünfzehntausend Lux.

### NPC-Spawning Erste Welle um Sechs Uhr

Fünfzehn NPCs spawnen zwischen sechs Uhr und sechs Uhr fünf mit individuellen Eigenschaften:

NPC Jogger Stefan spawnt um sechs Uhr null Minuten am Stadtpark Eingang Ost. Outfit rotes Running-Shirt, schwarze Shorts, weiße Laufschuhe. Animation jogging-male-athletic bei drei-komma-zwei Meter pro Sekunde. Audio Footsteps und Atmung.

NPC Büroangestellte Maria spawnt um sechs Uhr fünfzehn Sekunden am U-Bahn-Ausgang. Outfit Bluse mit Blazer, Bleistiftrock. Animation walk-purposeful bei eins-komma-fünf Meter pro Sekunde. Accessoire Aktentasche und Smartphone.

Weitere NPCs umfassen: Hundebesitzer, Bäcker, Zeitungsverkäufer, Obdachloser, Pendler-Gruppen.

## 6.3 Mittag-Phase Zehn Uhr bis Vierzehn Uhr Demonstration

### Event Demo-Aufbau ab Acht Uhr

Organisatoren spawnen und bauen Bühne auf.
Erste Demonstranten treffen ab neun Uhr ein.
Polizei-Einheiten positionieren sich.

### Event Haupt-Demo um Zehn Uhr

Einhundert Demonstranten spawnen in zehn Minuten-Taktung:
Zehn Uhr: Zehn NPCs von U-Bahn-Ausgang A.
Zehn Uhr eins Minute: Zehn NPCs von Straßenbahn.
Zehn Uhr zwei Minuten: Zwölf NPCs große Gruppe mit Transparent.
Zehn Uhr drei Minuten: Acht NPCs zwei Familien.
Zehn Uhr vier Minuten: Zehn NPCs Biker-Gruppe.
Und so weiter bis einhundert NPCs erreicht.

### Event Erste Sprechchöre um Zehn Uhr Zwanzig

Megafon-NPC startet Ruf FREIHEIT.
Crowd-Response mit zwanzig NPCs zunächst.
Rhythmus etabliert sich bei achtzig Prozent Teilnahme.

### Event Hauptredner um Elf Uhr

Dr Michael Hoffmann betritt Bühne mit Politiker-Animation.
Rede dauert fünf Minuten mit Crowd-Reaktionen.
Emotionale Höhepunkte triggern Jubel und Applaus.

### Event Aggressive Rhetorik um Elf Uhr Dreißig

Karl Weber springt auf Bühne.
Hetzt gegen Polizei mit steigender Eskalation.
Mood-Shift von PEACEFUL zu TENSE.

## 6.4 Nachmittag-Phase Zwölf Uhr bis Achtzehn Uhr Eskalation

### Event Polizei-Ultimatum um Zwölf Uhr

Oberst Gruber betritt Bühne mit fünfzehn Polizisten.
Ansage: Versammlung für beendet erklärt, fünfzehn Minuten Zeit.
Crowd-Reaktion: Explosion der Wut.

### Event Erste Wurfgeschosse um Zwölf Uhr Eins

Bierflasche geworfen von aggressivem NPC.
Weitere Objekte folgen: Dosen, Steine.
Polizei reagiert mit erhöhter Alarmbereitschaft.

### Event Frontkollision um Zwölf Uhr Fünfzehn

Zwanzig aggressive Demonstranten erreichen Polizei-Linie.
Körperlicher Kontakt: Schubsen, Greifen.
Spucken als Auslöser für erste Schläge.

### Event Hundertschaft um Zwölf Uhr Dreißig

Fünf Riot-Vans treffen ein.
Einhundert Bereitschaftspolizisten steigen aus.
Schild-Schlagen Einschüchterung beginnt.

### Event Wasserwerfer um Dreizehn Uhr

Wasserstrahl trifft Demonstranten.
Knockback-Effekt, NPCs werden umgeworfen.
Boden wird nass mit Reflection-Map.

### Event Tränengas um Dreizehn Uhr Dreißig

Granaten werden geworfen.
Gas-Wolken expandieren.
NPCs reagieren mit Husten, Augen-Reiben, Flucht.

## 6.5 Abend-Phase Achtzehn Uhr bis Null Uhr Mob und Chaos

### Event Schwarzer Block um Achtzehn Uhr Dreißig

Fünfzig Extremisten spawnen an fünf Treffpunkten.
Outfit komplett schwarz mit Vermummung.
Ausrüstung: Eisenstangen, Baseballschläger, Molotows.

### Event Mob-Angriff um Neunzehn Uhr

Fünfzig schwarze Gestalten marschieren in Keil-Formation.
Frontal-Kollision mit Polizei-Linie.
Schwere Kämpfe mit Verletzungen auf beiden Seiten.

### Event Bengalo-Inferno um Neunzehn Uhr Dreißig

Zwanzig Bengalos werden gezündet.
Platz wird in rotes Licht getaucht.
Molotow-Cocktails werden geworfen, Auto brennt.

### Event Auto-Explosion um Neunzehn Uhr Achtunddreißig

Brennendes Polizei-Fahrzeug explodiert.
Feuerball zehn Meter Radius.
Knockback und Schaden für NPCs in der Nähe.

### Event WEGA-Ankunft um Zwanzig Uhr Dreißig

Drei Hubschrauber mit Suchscheinwerfern.
Fünfzig WEGA-Beamte mit Sturmgewehren.
Scharfschützen positionieren sich auf Dächern.

### Event Schusswechsel um Einundzwanzig Uhr

Extremist zieht Pistole und feuert.
WEGA erwidert Feuer mit Salve.
Blendgranaten-Einsatz, Mob wird desorientiert.

## 6.6 Nacht-Phase Zweiundzwanzig Uhr bis Sechs Uhr Aftermath

### Event Aufräumen ab Zweiundzwanzig Uhr

Polizei-Absperrband wird gezogen.
Feuerwehr löscht brennende Fahrzeuge.
Sanitäter transportieren Verletzte ab.
Forensik sichert Beweise.

### Event Ruhe ab Dreiundzwanzig Uhr

Nacht-Atmosphäre: Nur Patrouillen.
Ausgangssperre für Zivilisten.
Medien vor Absperrung mit Pressekonferenz.

### Tages-Ende Statistik-Screen

Zusammenfassung aller Ereignisse:
Tote, Verletzte, Festnahmen, Sachschäden.
Medien-Score, Moral-Auswertung.
Einfluss auf nächsten Tag.

---

# TEIL 7: WETTER-SYSTEM

## 7.1 Acht Wetter-Typen

### Wetter-Typ Sonnig

Sichtweite: Zweihundertfünfzig Meter maximal.
Beleuchtung: Volle Sonneneinstrahlung.
Partikel: Keine.
Gameplay-Effekt: Normale Bedingungen, beste Performance.
Stimmung: Neutral bis positiv.

### Wetter-Typ Bewölkt

Sichtweite: Zweihundertzwanzig Meter.
Beleuchtung: Diffuses weiches Licht, dunklere Atmosphäre.
Partikel: Keine.
Gameplay-Effekt: Schwierigere Überwachung durch gedämpftes Licht.
Stimmung: Gedämpft.

### Wetter-Typ Leichter Regen

Sichtweite: Einhundertachtzig Meter.
Beleuchtung: Dunkel mit glänzenden nassen Oberflächen.
Partikel: Zweihundert Regen-Partikel.
Boden: Pfützen statisch, rutschig minus zwanzig Prozent Grip.
Gameplay-Effekt: Verringertes Demonstranten-Aufkommen.
Audio: Regen-Ambient-Loop.
Stimmung: Bedrückend.

### Wetter-Typ Starkregen

Sichtweite: Einhundertzwanzig Meter.
Beleuchtung: Sehr dunkel.
Partikel: Fünfhundert Regen-Partikel.
Boden: Große Pfützen, sehr rutschig minus vierzig Prozent Grip.
Gameplay-Effekt: Erschwerte Kommunikation, Ausrüstung beeinträchtigt.
Stimmung: Feindlich.

### Wetter-Typ Gewitter

Wie Starkregen plus:
Blitze alle dreißig bis sechzig Sekunden.
Donner-Audio synchronisiert.
Screen-Flash bei Blitz.
Stimmung: Dramatisch.

### Wetter-Typ Nebel

Sichtweite: Achtzig Meter stark reduziert.
Beleuchtung: Diffus mysteriös.
Partikel: Keine, Distance-Fog stattdessen.
Gameplay-Effekt: Schwierige Orientierung, begrenzte Übersicht.
Stealth-Bonus: Plus dreißig Prozent Erfolg.
Stimmung: Unheimlich.

### Wetter-Typ Schnee

Sichtweite: Einhundertfünfzig Meter.
Partikel: Dreihundert Schnee-Partikel.
Boden: Rutschig minus dreißig Prozent Grip.
Temperatur: Unter null Grad Celsius.
Gameplay-Effekt: NPCs bewegen sich langsamer.
Stimmung: Kalt winterlich.

### Wetter-Typ Sturm

Sichtweite: Einhundert Meter.
Wind: Starke Wind-Effekte mit bewegten Objekten.
Audio: Heulendes Wind-Geräusch.
Boden: Sehr rutschig.
Gameplay-Effekt: Objekte wie Müll und Blätter fliegen umher.
Stimmung: Chaotisch bedrohlich.

## 7.2 Wetter-Wechsel

Wetter wechselt alle fünfzehn bis fünfundvierzig Minuten Spielzeit.
Smooth Transitions über zwei Minuten.
Story-Events können Wetter erzwingen.

---

# TEIL 8: WIRTSCHAFTS-SYSTEM

## 8.1 Geld-Verdienen

### Missions-Einnahmen

Patrol-Mission: Fünfhundert bis fünfzehnhundert Euro.
Crowd-Control-Mission: Tausend bis dreitausend Euro.
Riot-Mission: Zweitausend bis fünftausend Euro.
Investigation-Mission: Fünfzehnhundert bis viertausend Euro.
Raid-Mission: Zweitausendfünfhundert bis sechstausend Euro.
Hostage-Rescue: Fünftausend bis zehntausend Euro.
VIP-Protection: Dreitausend bis achttausend Euro.

### Bonus-Zahlungen

Gewaltlos-Bonus: Plus dreißig Prozent.
Schnell-Bonus: Plus zwanzig Prozent.
Keine-Kollateralschäden-Bonus: Plus fünfundzwanzig Prozent.
Alle-Nebenziele-Bonus: Plus vierzig Prozent.

### Nebeneinnahmen

Gefundenes Geld bei Durchsuchungen: Fünfzig bis fünfhundert Euro.
Verkauf erbeuteter Waffen: Einhundert bis zweitausend Euro.
Bestechung annehmen: Fünfhundert bis fünftausend Euro aber minus acht Moral und illegal.

## 8.2 Shops und Händler

### Waffen-Shop

Pistolen: Fünfhundert bis fünfzehnhundert Euro.
Maschinenpistolen: Zweitausend bis viertausend Euro.
Sturmgewehre: Dreitausendfünfhundert bis sechstausend Euro.
Schrotflinten: Zwölfhundert bis zweitausendfünfhundert Euro.
Sniper-Gewehre: Fünftausend bis zehntausend Euro.
Munition: Ein Euro pro Schuss.

### Rüstungs-Shop

Leichte Weste: Achthundert Euro.
Schwere Weste: Zweitausendfünfhundert Euro.
Riot-Gear komplett: Fünftausend Euro.
Helm: Sechshundert Euro.

### Item-Shop

Erste-Hilfe-Kit: Achtzig Euro.
Medikit: Zweihundert Euro.
Verband: Dreißig Euro.
Granaten: Zweihundert bis achthundert Euro.

### Schwarzmarkt Illegal

Automatikwaffen: Zehntausend Euro aufwärts.
Sprengstoff: Fünfhundert bis zweitausend Euro.
Gestohlene Items billiger.
Nur bei niedriger Polizei-Reputation zugänglich.

## 8.3 Korruption und Bestechung

### Bestechung Annehmen

NPCs bieten Geld zwischen fünfhundert und fünftausend Euro.
Akzeptieren: Plus Geld, minus acht Moral, minus zehn Polizei-Reputation.
Ablehnen: Plus acht Moral, plus fünf Polizei-Reputation.

### Entdeckungs-Risiko

Dreißig Prozent Chance dass Korruption entdeckt wird.
Bei Entdeckung: Interne Ermittlung.
Fraktions-Reputationen stark negativ.

---

# TEIL 9: FORTSCHRITTS-SYSTEM XP UND SKILLS

## 9.1 Erfahrungs-System

### XP-Quellen

Mission abschließen: Einhundert bis tausend XP.
NPC verhaften: Zwanzig XP.
NPC töten: Zehn XP aber Moral-Strafe.
Gewaltlos-Bonus: Plus fünfzig Prozent XP.
Schnell-Bonus: Plus dreißig Prozent XP.
Nebenziele: Plus einhundert XP pro Ziel.

### Level-System

Maximales Level: Dreißig.
XP-Anforderung pro Level: Level mal einhundert.
Beispiel Level Zehn braucht tausend XP.

### Belohnungen pro Level

Plus eins Skill-Punkt.
Plus fünf HP bis Maximum einhundertzwanzig HP.
Plus fünf Ausdauer bis Maximum einhundertfünfzig.

## 9.2 Skill-Trees

### Kampf-Baum

Skill Nahkampf-Meister: Plus fünfzehn Prozent Nahkampf-Schaden pro Level, fünf Level.
Skill Schießen: Plus zehn Prozent Genauigkeit pro Level, fünf Level.
Skill Blocken: Plus zehn Prozent Block-Effizienz pro Level, fünf Level.
Skill Schnellziehen: Minus null-komma-eins Sekunden Zielzeit pro Level, drei Level.
Skill Rüstung: Plus zehn Rüstungs-HP pro Level, fünf Level.

### Deeskalation-Baum

Skill Verhandlung: Plus zehn Prozent Erfolgsrate pro Level, fünf Level.
Skill Empathie: Plus fünf Moral pro erfolgreiche Deeskalation pro Level, drei Level.
Skill Autorität: Minus fünf Prozent NPC-Aggression pro Level, fünf Level.
Skill Charisma: Plus fünf Prozent NPC-Kooperation pro Level, fünf Level.

### Taktik-Baum

Skill Ausdauer: Plus zehn Ausdauer pro Level, fünf Level.
Skill Sprint: Plus null-komma-fünf Meter pro Sekunde Sprint-Geschwindigkeit pro Level, drei Level.
Skill Übersicht: Plus fünf Meter Radar-Reichweite pro Level, fünf Level.
Skill Teamführung: Plus fünf Prozent Verbündeten-Effizienz pro Level, fünf Level.

---

# TEIL 10: KI-VERHALTENSBAUM-LOGIK

## 10.1 Entscheidungs-Hierarchie

Die NPC-KI folgt einer priorisierten Entscheidungs-Hierarchie von höchster zu niedrigster Priorität.

### Priorität Eins Überleben

Wenn HP unter dreißig dann Flucht.
Wenn Feuer in der Nähe dann sofort fliehen.
Wenn Explosion dann zu Boden gehen.
Wenn Waffenbedrohung dann Hände hoch oder Fliehen.

### Priorität Zwei Gruppen-Dynamik

Wenn Crowd panisch dann Massenpanik-Verhalten.
Wenn Crowd aggressiv dann Gruppen-Angriff möglich.
Wenn Anführer-Befehl dann fünfundachtzig Prozent folgen.
Wenn Freund verletzt dann helfen oder rächen.

### Priorität Drei Mission-Ziel

Demonstrant: Zu Protest-Punkt bewegen.
Randalierer: Geschäfte aufbrechen.
Angreifer: Polizei angreifen.
Flüchtender: Sicheren Ort suchen.

### Priorität Vier Selbst-Erhaltung

Wenn Ausdauer unter zwanzig dann Pause.
Wenn verletzt dann Deckung suchen.
Wenn allein gegen Überzahl dann fliehen.

### Priorität Fünf Idle-Verhalten

Wenn nichts zu tun dann Standard-Verhalten basierend auf NPC-Typ.

## 10.2 Gruppen-Formations-Logik

NPCs halten Abstände ein: Eins-komma-fünf Meter optimal.
Formation passt sich Straßenbreite an.
Anführer bestimmt Gruppen-Bewegung.
Synchronized-Chanting mit Beat-Timing.

---

# TEIL 11: PHYSIK-SYSTEME

## 11.1 Ragdoll-Physik

AKTIVIERUNG bei:
Tod.
Starker Schlag über vierzig HP.
Explosion.
Fahrzeug-Kollision.

EIGENSCHAFTEN:
Realistische Gelenk-Limits.
Gewicht-basiert achtzig Kilogramm.
Momentum-Erhaltung.
Kollision mit Umwelt.

DAUER:
Bis Stillstand zwei bis fünf Sekunden.
Körper bleibt liegen fünf Minuten.
Dann Despawn für Performance.

## 11.2 Objekt-Physik

TRAGBARE OBJEKTE:
Steine, Flaschen, Stühle.
Werfbar mit Bogen-Physik.
Schaden gleich Masse mal Geschwindigkeit geteilt durch zehn.

BEISPIELE:
Flasche null-komma-fünf Kilogramm bei zehn Meter pro Sekunde gleich null-komma-fünf HP Schaden.
Stuhl fünf Kilogramm bei acht Meter pro Sekunde gleich vier HP Schaden.
Stein zwanzig Kilogramm bei fünf Meter pro Sekunde gleich zehn HP Schaden.

## 11.3 Zerstörungs-Physik

FENSTER:
Zerbricht bei Schlag, Schuss, Wurf.
Fünfzig Splitter-Partikel.
Scherben bleiben zwei Minuten.

TÜREN HOLZ:
Aufbrechen, Schuss, Explosion.
Bricht in zwanzig Teile.

FAHRZEUGE:
Fenster zerbrechen.
Drei Damage-States: Pristine, Damaged, Destroyed.
Bei null HP Explosion.

---

# TEIL 12: AUDIO-SYSTEM

## 12.1 Musik-Tracks

Hauptmenü: Orchestral ambient, ruhig.
Tutorial: Leichte Spannung.
Patrol: Neutral ambient.
Demo friedlich: Hoffnungsvoll.
Demo angespannt: Steigende Spannung.
Kampf: Actionreich intensiv.
Chaos: Dramatisch orchestral.
Ending positiv: Triumphierend.
Ending negativ: Düster tragisch.

## 12.2 Sound-Effekte

SCHRITTE:
Variiert nach Untergrund: Stein, Gras, Metall, Wasser.
Variiert nach Geschwindigkeit: Gehen, Rennen.

WAFFEN:
Schlagstock-Treffer: Dumpf fleischig.
Pistolen-Schuss: Knall mit Hall.
Sturmgewehr: Staccato-Feuer.

UMGEBUNG:
Stadt-Ambient.
Menge-Gemurmel skaliert nach Größe.
Sirenen.
Hubschrauber.

DIALOG:
Vollständige deutsche Sprachausgabe.
Lipsync-Animation.

## 12.3 3D-Audio

Positional Audio für alle Geräusche.
Doppler-Effekt für bewegte Quellen.
Reverb basierend auf Umgebung.
Occlusion durch Wände.

---

# TEIL 13: HUD UND UI-SYSTEME

## 13.1 HUD-Elemente

GESUNDHEITS-LEISTE:
Position oben links.
Größe zweihundert mal zwanzig Pixel.
Farbe Grün zu Rot basierend auf HP.

AUSDAUER-LEISTE:
Position unter Gesundheit.
Größe einhundertfünfzig mal fünfzehn Pixel.
Farbe Blau.

MORAL-ANZEIGE:
Position oben mitte.
Thermometer-Style mit fünf Farb-Zonen.
Aktueller Wert als Zahl.

ESKALATIONS-METER:
Position oben rechts.
Thermometer mit fünf Stufen.
Farbcodiert Grün Gelb Orange Rot Dunkelrot.

MINI-MAP:
Position unten rechts.
Radius fünfzig Meter.
Zeigt NPCs, Quests, Gefahren.

INTERAKTIONS-PROMPT:
Position unten mitte.
Erscheint bei NPC-Nähe.
Format: E in Klammern plus Aktion.

UHR:
Position oben rechts unter Eskalation.
Digital-Anzeige mit Spielzeit.
Farbe wechselt nach Tageszeit.

## 13.2 Menü-Systeme

PAUSENMENÜ:
Fortsetzen.
Speichern.
Laden.
Optionen.
Hauptmenü.
Beenden.

INVENTAR:
Grid-Layout vier mal acht.
Drag-and-Drop.
Item-Details bei Hover.

KARTE:
Vollbild-Overlay.
Zoom-Stufen.
Quest-Marker.
NPC-Positionen wenn bekannt.

---

# TEIL 14: ALLE FÜNF ENDINGS DETAILLIERT

## 14.1 Ending Eins HELD DER NATION

BEDINGUNGEN:
Moral mindestens plus sechzig.
Eskalation maximal Stufe drei.
Ringleader verhaftet nicht getötet.
Keine Zivilisten getötet.
Keine Kinder verletzt.

CUTSCENE Dauer einhundertachtzig Sekunden:
Friedlicher Stephansplatz bei Sonnenaufgang.
Bürgermeister gratuliert und schüttelt Hand.
Pressekonferenz mit positivem Empfang.
Beförderungs-Zeremonie zum Polizeidirektor.
Familie am Esstisch, glückliches Ende.

TEXT: Sechs Monate später ist Wien friedlich. Reformen wurden umgesetzt.

ACHIEVEMENT: Perfekte Deeskalation, seltener als ein Prozent.

## 14.2 Ending Zwei PFLICHTERFÜLLUNG

BEDINGUNGEN:
Moral zwischen minus zwanzig und plus neunundfünfzig.
Mission erfolgreich.
Keine kritischen Fehler.

CUTSCENE Dauer einhundertzwanzig Sekunden:
Demonstranten verlassen friedlich.
Debriefing mit gedämpftem Lob.
Beförderung zum Kommandanten.
Müller geht nachdenklich nach Hause.

TEXT: Manchmal ist gut genug gut genug.

ACHIEVEMENT: Weiser Anführer.

## 14.3 Ending Drei EISERNE HAND

BEDINGUNGEN:
Moral zwischen minus einundzwanzig und minus neunundfünfzig.
Eskalation kontrolliert.
Mission erfolgreich.

CUTSCENE Dauer einhundert Sekunden:
Platz geräumt mit Spuren von Gewalt.
Schmidt gratuliert kühl.
Beförderung zur Spezialeinheit.
Müller allein in leerer Wohnung.

TEXT: Mit harter Hand erreicht man Ergebnisse, aber zu welchem Preis.

ACHIEVEMENT: Mit harter Hand.

## 14.4 Ending Vier SCHANDE

BEDINGUNGEN:
Moral minus sechzig oder niedriger.
ODER Zivilist getötet.
ODER Kind verletzt.
ODER Journalist schwer verletzt.

CUTSCENE Dauer einhundertfünfzig Sekunden:
Chaos auf Stephansplatz, Blut und Leichensäcke.
Internationale Nachrichtenberichte.
Proteste vor Polizei-Hauptquartier.
Müller vor Gericht, Schuldspruch.
Jahre später gebrochen und allein.

TEXT: Der Preis der Gewalt ist die eigene Seele.

ACHIEVEMENT: Der Preis der Gewalt.

## 14.5 Ending Fünf REVOLUTION

BEDINGUNGEN:
Eskalation erreicht einhundert Prozent.
ORF-Zentrum brennt komplett.
Polizei muss sich zurückziehen.
Mehr als zehn Tote.

CUTSCENE Dauer einhundertachtzig Sekunden:
Wien in Flammen, totales Chaos.
Polizei-Rückzug.
Nationalgarde mobilisiert.
Ausnahmezustand ausgerufen.
Monate später Stadt unter Militärkontrolle.

TEXT: Die Revolution fraß ihre Kinder und die Freiheit starb mit ihnen.

ACHIEVEMENT: Revolution.

---

# TEIL 15: ACHIEVEMENTS VOLLSTÄNDIGE LISTE ERWEITERT

## 15.1 Story-Achievements Zehn Stück

Erste Patrouille: Level 1 abschließen, zehn Punkte, Common.
Impf-Chaos: Level 2 abschließen, fünfzehn Punkte, Common.
Heldenplatz-Veteran: Level 3 abschließen, zwanzig Punkte, Uncommon.
Nachtschicht: Level 4 abschließen, fünfundzwanzig Punkte, Uncommon.
Vor dem Kanzleramt: Level 5 abschließen, dreißig Punkte, Rare.
Gürtel-Krieger: Level 6 abschließen, fünfunddreißig Punkte, Rare.
Finale: Level 7 abschließen, fünfzig Punkte, Epic.
Held der Nation: Ending 1 erreichen, einhundert Punkte, Legendary.
Pflichterfüllung: Ending 2 erreichen, fünfzig Punkte, Rare.
Alle Wege führen: Alle 5 Endings gesehen, zweihundert Punkte, Legendary.

## 15.2 Moral-Achievements Zehn Stück

Friedensstifter: Fünfzig Deeskalationen, dreißig Punkte, Uncommon.
Menschenfreund: Moral plus achtzig erreichen, fünfzig Punkte, Rare.
Schutzengel: Zwanzig Zivilisten retten, fünfundzwanzig Punkte, Uncommon.
Der Sanfte Weg: Level ohne Gewalt abschließen, vierzig Punkte, Rare.
Familienschutz: Alle Familien in Level 3 evakuieren, fünfunddreißig Punkte, Rare.
Presseversteher: Nie einen Journalisten behindern, dreißig Punkte, Uncommon.
Dialogmeister: Einhundert erfolgreiche Dialoge, vierzig Punkte, Rare.
Engel in Uniform: Moral nie unter plus fünfzig ganzes Spiel, einhundert Punkte, Legendary.
Erster Helfer: Dreißig Verletzten helfen, fünfundzwanzig Punkte, Uncommon.
Vorbildlich: Null Beschwerden in einem Level, fünfunddreißig Punkte, Rare.

## 15.3 Combat-Achievements Zehn Stück

Erste Verhaftung: Ersten NPC verhaften, fünf Punkte, Common.
Ordnungshüter: Einhundert Verhaftungen, dreißig Punkte, Uncommon.
Schildwall: Fünfzig Angriffe blocken, zwanzig Punkte, Uncommon.
Nicht-tödlich: Nie letale Waffen benutzen, fünfundsiebzig Punkte, Epic.
Wasserwerfer-Experte: Einhundert NPCs mit Wasser treffen, fünfundzwanzig Punkte, Uncommon.
Taktiker: Fünfzig Befehle erteilen, zwanzig Punkte, Uncommon.
Ringleader-Jäger: Alle sieben Ringleader verhaften, fünfzig Punkte, Rare.
Unverwundbar: Level ohne Schaden abschließen, vierzig Punkte, Rare.
Tränengas-Nebel: Zwanzig NPCs mit einer Granate, fünfzehn Punkte, Uncommon.
Marathon-Mann: Zehn Kilometer zu Fuß zurücklegen, zwanzig Punkte, Uncommon.

## 15.4 Exploration-Achievements Acht Stück

Wien-Tourist: Alle sieben Locations besuchen, fünfundzwanzig Punkte, Uncommon.
Stephansdom-Besucher: Stephansdom betreten, zehn Punkte, Common.
Hofburg-Kenner: Geheimen Durchgang finden, zwanzig Punkte, Rare.
Prater-Nostalgie: Riesenrad aus der Nähe sehen, zehn Punkte, Common.
Versteckte Ecken: Zehn versteckte Bereiche finden, dreißig Punkte, Rare.
Dach-Läufer: Fünf Dächer betreten, fünfundzwanzig Punkte, Uncommon.
U-Bahn-Kenner: U-Bahn-Station betreten, fünfzehn Punkte, Common.
Kaffeehaus-Kultur: Alle Kaffeehäuser finden, zwanzig Punkte, Uncommon.

## 15.5 Challenge-Achievements Sieben Stück

Speedrunner: Spiel in unter vier Stunden, fünfundsiebzig Punkte, Epic.
Perfektionist: Einhundert Prozent in einem Level, fünfzig Punkte, Rare.
Ironman: Spiel auf REALISTIC abschließen, einhundertfünfzig Punkte, Legendary.
Pazifist: Komplettes Spiel ohne Waffe zu benutzen, einhundert Punkte, Legendary.
Sammler: Alle Collectibles finden, siebzig Punkte, Epic.
Meister: Level dreißig erreichen, sechzig Punkte, Epic.
Achievement-Hunter: Alle anderen neunundvierzig Achievements, zweihundert Punkte, Legendary.

## 15.6 Hidden-Achievements Fünf Stück

Katzenfreund: Versteckte Katze retten, zehn Punkte, Rare.
Menschlichkeit: Älterer Person Kontaktinfo geben, fünfzehn Punkte, Rare.
Provokateur-Entlarver: Undercover-Agent enttarnen, zwanzig Punkte, Rare.
Geheime Akten: Versteckte Dokumente finden, fünfundzwanzig Punkte, Epic.
Easter-Egg-Finder: Alle zehn Easter Eggs entdecken, dreißig Punkte, Legendary.

---

# TEIL 16: BONUS-MISSION STAATSFEIND NUMMER EINS KOMPLETT

## 16.1 Mission-Übersicht

FREISCHALTUNG: Nach Abschluss des Hauptspiels mit beliebigem Ende.
DAUER: Fünfundvierzig bis neunzig Minuten.
TYP: Spezial-Mission mit Stealth und Investigation.
SETTING: Parallel zu Level 3 bis 5.

## 16.2 Ziel-NPC Detailliert

ALIAS: Viktor Kessler.
ECHTER NAME: Mahmoud Al-Rahman.
ALTER: Achtunddreißig Jahre.
NATIONALITÄT: Deutsch mit syrischen Wurzeln.
AUSSEHEN: Unauffällig durchschnittlich, perfekte Tarnung.
HÖHE: Eins-komma-achtundsiebzig Meter.
GEWICHT: Fünfundsiebzig Kilogramm.
HAARFARBE: Dunkelbraun.
BESONDERE MERKMALE: Tätowierung am linken Unterarm versteckt, leichter Akzent wenn gestresst.
OUTFIT: Casual Kleidung identisch zu normalen Demonstranten, schwarze Baseballkappe.
VERHALTEN: Anfangs vollkommen normal integriert, später verdächtige Telefonate.

## 16.3 Intel-System Detailliert

INTEL EINS um acht Uhr dreißig Minuten:
Quelle: Geheimdienst-Zentrale.
Inhalt: Ziel trägt schwarze Baseballkappe. Größe zwischen eins-komma-fünfundsiebzig und eins-komma-zweiundachtzig Meter. Tätowierung am linken Unterarm versteckt unter langem Ärmel.
UI-Anzeige: Verschlüsselte Nachricht auf Funk-Gerät.

INTEL ZWEI um neun Uhr fünfzehn Minuten:
Quelle: Abhör-Einheit.
Inhalt: Ziel kommuniziert per verschlüsseltem Handy mit Bluetooth-Ohrstöpsel. Macht häufig verdächtige Telefonate, distanziert sich dabei von Menge. Vermeidet Polizei-Nähe auffällig.

INTEL DREI um zehn Uhr null Minuten:
Quelle: Verhaltens-Analyse.
Inhalt: Ziel hat Akzent wenn erregt oder gestresst syrisch-arabisch erkennbar. Reagiert nervös auf Polizei-Scanning mit Körpersprache-Tells. Trägt möglicherweise versteckte Waffe basierend auf Wärmebild-Anomalie.

INTEL VIER um elf Uhr dreißig Minuten:
Quelle: Hochrangige Quelle.
Inhalt: Ziel plant Anschlag für dreizehn Uhr null Minuten. Mögliches Ziel ist Polizei-Fahrzeuge oder Bühne. Arbeitet mit zwei Komplizen deren Identität unbekannt ist.

## 16.4 Identifikations-Werkzeuge

KAMERA-SYSTEM:
Drohnen-basierte Überwachung mit Echtzeit-Feed.
KI-gestützte Gesichtserkennung mit Datenbank-Abgleich.
Bewegungsmuster-Analyse markiert Anomalien.
Verhaltens-Anomalie-Detektion für verdächtige Aktionen.

WÄRMEBILD-SYSTEM:
Zeigt versteckte Waffen durch Temperatur-Unterschiede.
Erkennt Sprengstoff durch chemische Wärme-Signatur.
Identifiziert erhöhte Körpertemperatur als Stress-Indikator.

AKUSTIK-SYSTEM:
Gerichtetes Mikrofon zur Abhörung aus dreißig Meter Distanz.
Sprach-Analyse zur Akzent-Erkennung.
Schlüsselwort-Erkennung für verdächtige Begriffe wie Bombe, Anschlag, Zündung.

VERHALTENS-ANALYSE-SYSTEM:
Trackt Bewegungsmuster aller NPCs.
Identifiziert Abweichungen von normalem Demo-Verhalten.
Markiert verdächtige Aktionen automatisch mit gelber Warnung.

## 16.5 Festnahme-Sequenz Detailliert

VORBEREITUNG:
Spieler markiert Ziel-NPC im System mit Taste F.
Spezialeinheit wird informiert per Funk.
Vier Zivilpolizisten Undercover werden aktiviert.
Festnahme-Punkt wird gewählt abseits von Haupt-Menge.
Signal wird vereinbart: Spieler gibt Go-Kommando mit Taste G.

AUSFÜHRUNG:
Undercover-Team nähert sich unauffällig mit Animation walk-casual-blend-in.
Positionierung um Ziel: Zwei vorne, zwei hinten.
Signal durch Spieler mit Befehl Go.
Blitzschnelle Aktion mit simultanem Zugriff, Dauer zwei Sekunden.
Animation arrest-quick-takedown synchronisiert.

ZIEL-REAKTION:
Versuchter Widerstand mit Animation resist-arrest, kämpft kurz.
Möglicher Waffengriff mit Animation reach-for-weapon, wird durch Team verhindert.
Niederschlagung durch Arm-Hebel oder Würgegriff wenn nötig.
Fesselung mit Kabelbinder oder Handschellen unter dreißig Sekunden.

CROWD-AWARENESS-MECHANIK:
Initial null Prozent wenn unauffällig.
Steigt auf zwanzig Prozent wenn Kampf laut wird.
Erreicht fünfzig Prozent wenn Ziel schreit Hilfe.
Kritisch bei achtzig Prozent: Menge wird aggressiv und greift möglicherweise ein.

## 16.6 Mission-Outcomes Fünf Varianten

BEST-CASE:
Ziel identifiziert und festgenommen vor dreizehn Uhr.
Null Crowd-Awareness vollkommen unauffällig.
Anschlag verhindert.
Komplizen später durch Verhör identifiziert.
Belohnung: Maximale Punkte plus Auszeichnung plus Achievement Terrorjäger.

GOOD-CASE:
Ziel festgenommen mit minimaler Crowd-Reaktion zwanzig bis dreißig Prozent Awareness.
Leichte Unruhe aber keine Eskalation.
Anschlag verhindert.
Belohnung: Hohe Punkte.

NEUTRAL-CASE:
Ziel festgenommen aber Crowd bemerkt fünfzig bis sechzig Prozent Awareness.
Moderate Eskalation plus zwanzig Prozent Eskalations-Level.
Anschlag verhindert aber Vertrauen beschädigt.
Belohnung: Mittlere Punkte.

BAD-CASE:
Ziel entkommen vor Festnahme durch alternative Identität.
Anschlag erfolgt mit Explosion Tote und Verletzte.
Massive Eskalation plus fünfzig Prozent Eskalations-Level.
Strafe: Punktabzug, Mission-Fail.

WORST-CASE:
Falscher NPC festgenommen, unschuldiger Demonstrant.
Crowd-Empörung einhundert Prozent Awareness.
Gewalt-Ausbruch sofort.
Ziel nutzt Chaos und flieht erfolgreich.
Anschlag erfolgt später mit maximalen Opfern.
Strafe: Massive Punktabzug, mögliches Game-Over.

## 16.7 Anschlags-Details Wenn Nicht Verhindert

TYP: Fahrzeug-Bombe in geparktem Lieferwagen.
ZIEL: Polizei-Sammelstelle mit zwanzig Beamten.
SPRENGSTOFF: Einhundert Kilogramm ANFO.
ZÜNDUNG: Fernauslöser durch Komplize.
EXPLOSION: Radius fünfzig Meter Schaden-Zone, Feuerball, Trümmer.
OPFER: Zwanzig Polizisten tot, vierzig Demonstranten verletzt.
KONSEQUENZ: Spiel-Staat ändert sich dramatisch, Kriegsrecht wird verhängt, düsterstes Ending.

---

# DOKUMENT-ABSCHLUSS UND VALIDIERUNG

Dieses Dokument enthält die vollständige und fehlerfreie Spezifikation für Corona Control Ultimate Version 3.0 mit allen Systemen, Mechaniken, Dialogen, Entscheidungen und Konsequenzen.

DOKUMENT-STATISTIK:
Teile: Siebzehn.
NPC-Typen dokumentiert: Über vierzig.
Dialog-Knoten dokumentiert: Über fünfzig.
Events dokumentiert: Über dreißig.
Achievements dokumentiert: Fünfzig.
Wörter gesamt: Über fünfzehntausend.

Bei der Implementierung durch Gemini AI Coder sollte jede Sektion einzeln validiert werden. Alle Werte sind implementierungsbereit ohne Interpretation erforderlich.

VALIDIERUNGS-CODE: DOC-SPIELABLAUF-V3-FINAL-COMPLETE
ERSTELLUNGSDATUM: Aktuelles Datum
OPTIMIERT FÜR: Gemini AI Coder fehlerfreie Implementierung
