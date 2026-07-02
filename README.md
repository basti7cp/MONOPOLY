# Duisburg Deal / Stahlstadt Tycoon

Privater, nicht-kommerzieller Fan-Prototyp eines browserbasierten Duisburg-Brettspiels fuer Freunde. Das Projekt arbeitet mit einer Monopoly-aehnlichen Brettspielstruktur, nutzt aber eine eigene lokale Gestaltung, eigene Daten und eine austauschbare Asset-Konfiguration.

## Projektziel

- Quadratisches Spielbrett mit 40 Feldern von `0` bis `39`.
- Duisburg-/Ruhrpott-Thema mit Hafen, Stahl, Rhein/Ruhr, Kiez, Stadtteilen und Stadtleben.
- Cinematic Duisburg City Edition: hochwertiger Foto-Collage-Look statt Cartoon-, Comic- oder Clipart-Stil.
- Texte wie Feldnamen, Preise, Karteninhalte und UI-Beschriftungen werden im Frontend gerendert.
- Assets bleiben ueber zentrale Konfigurationen austauschbar und pruefbar.

## Aktueller Stand

- Vanilla-JS-Prototyp ohne Frontend-Framework.
- 11x11-CSS-Grid mit 40 nummerierten Aussenfeldern.
- 40 Tile-PNGs unter `assets/tiles/` von `0.png` bis `39.png`.
- Board Base als zugeschnittene Mittelgrafik unter `assets/board/board_base.png`.
- 8 freigestellte Token-PNGs unter `assets/tokens/`.
- Zentrale Asset-Registry in `src/config/assetMap.js`.
- Datenmodell fuer 40 Spielfelder in `src/data/boardSpaces.js`.
- Validierung fuer Board-Daten, Asset-Manifest, Tile-Dateien, Board Base und Tokens.

## Projektstruktur

```text
assets/
  board/     # Board Base und spaetere Board-Assets
  tiles/     # 40 finale Feld-Tile-PNGs, nummeriert 0 bis 39
  icons/     # optionale Orts-/Themen-Icons
  tokens/    # 8 Spielfiguren als transparente PNGs
  cards/     # spaetere Kartenfronten/-rueckseiten
  ui/        # spaetere UI-Assets wie Wuerfel, Geldsymbol, Buttons

data/
  assets.manifest.json  # Asset-Pfade, Status und Stil-Prompts
  board.config.json     # Board-Metadaten, Stil, Palette und TODOs

src/
  config/assetMap.js    # zentrale Asset-Pfad-Registry
  data/boardSpaces.js   # 40 Spielfelder und Spielerstartdaten
  game/                 # reserviert fuer kuenftige Spiellogik
  ui/                   # reserviert fuer kuenftige UI-Komponenten
  main.js               # lauffaehiger Vanilla-JS-Prototyp
  styles.css            # responsive Board-Layout und UI-Styling
```

## Stilrichtung

Die visuelle Richtung ist eine private "cinematic Duisburg City Edition": reale Duisburg-Motive, Foto-Collage, klare Brettspielkanten, starke Kontraste und ein hochwertiger, urbaner Look. Wichtige Referenzen sind Innenhafen, Tiger & Turtle, Landschaftspark, Stahl-/Industriekultur, Rhein-Skyline, Stadtteile und lokale Mobilitaet.

Leitplanken fuer neue Assets:

- Cremefarbene Felder und klare anthrazit/schwarze Linien.
- Tiefe Gruen-, Stadtblau-, Gold- und Orange-Akzente.
- Foto-inspirierte Motive statt generischer Symbole.
- Keine offiziellen Logos, keine heruntergeladenen Original-Grafiken, keine eingebrannten lesbaren Texte.
- Bildassets sollen Platz fuer Frontend-Text lassen.

## Asset-Workflow

1. `data/assets.manifest.json` ist die Quelle fuer Asset-Pfade, Status und Stil-Prompts.
2. Neue Assets werden unter den dort angegebenen Pfaden abgelegt.
3. `src/config/assetMap.js` bleibt die technische Registry fuer das Frontend.
4. Feld-Tiles bleiben nummeriert: `assets/tiles/0.png` bis `assets/tiles/39.png`.
5. Board Base und Tokens behalten ihre aktuellen Pfade, damit Rendering und Build stabil bleiben.
6. Nach Asset-Aenderungen immer `npm run build` ausfuehren.

## Entwicklung

```bash
npm run dev
npm run build
```

## Naechste Inhalte

- Finale Strassen-/Ortsliste mit Preisen, Mieten und Farbgruppen abstimmen.
- Karten fuer Ereignis- und Gemeinschaftsfelder als Datenmodell schreiben.
- Kauf, Miete, Besitzstatus, Hypotheken, Haeuser/Hotels und Startbonus implementieren.
- Wuerfellogik, Spielerzuege und Rundenzustand ausbauen.
- Mobile Felddetailansicht und Spielprotokoll ergaenzen.
- Finale Asset-Qualitaet fuer Karten, UI-Elemente und optionale Detailbilder festlegen.
