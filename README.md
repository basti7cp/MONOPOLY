[README.md](https://github.com/user-attachments/files/29573304/README.md)
# Monopoly Duisburg

**Monopoly Duisburg** ist ein privates, nicht-kommerzielles Browser-Spielprojekt für mich und meine Freunde. Eine Duisburg-Version eines Monopoly-artigen Brettspiels: klassischer 40-Felder-Aufbau, Duisburger Straßen/Orte, Bahnhofs-/Mobilitätsfelder, Werkersatz, Ereignis- und Gemeinschaftskarten sowie eigene Spielfiguren.

> Wichtig: Dieses Repository enthält keine offiziellen Monopoly-Grafiken, keine offiziellen Logos, keine heruntergeladenen Originalassets und keine Vereins-/Markenlogos. Die Gestaltung ist privat, eigenständig erstellt und nur im Freundeskreis genutzt.

---

## Designrichtung — Cinematic Duisburg City Edition

Der Zielstil ist **cinematic photo-collage**, inspiriert von modernen Monopoly-Stadteditions-Brettspielen (z.B. Berlin, Hamburg), aber mit eigenem Duisburg-Charakter.

### Was das bedeutet

- **Brett-Zentrum**: Nahtlose Photo-Collage aus realen Duisburg-Motiven — Innenhafen mit Wasserreflexionen, Tiger & Turtle Skulptur, Landschaftspark Duisburg-Nord bunt beleuchtet, Marxloh Straßenszene, Vulkanstraße Atmosphäre, Rhein-Skyline in der Abenddämmerung.
- **Feldtiles**: Cremefarbener Hintergrund (`#f5eddc`), scharfe anthrazit/schwarze Linien, farbige Gruppen-Leiste ganz oben, kleines realistisches Ortsfoto im mittleren Bereich.
- **Ecktiles**: Eigenständig gestaltet, premium, passend zum cinematic Stil.
- **Karten**: Clean, bold, farbig — Ereignisfeld orange (`#e8820c`), Gemeinschaftsfeld grün (`#2d7a4f`).
- **UI**: High-contrast, anthrazit/creme/grün, kein überladener Stil.

### Was explizit NICHT der Zielstil ist

- ❌ Cartoon-Illustrationen oder Icon-Spielzeugstil
- ❌ Clipart-ähnliche Elemente
- ❌ Verspielt-bunte Comic-Ästhetik
- ❌ Lesbare Texte in generierten Bildassets
- ❌ Offizielle Logos oder Markenzeichen

### Farbpalette

| Token | Hex | Verwendung |
|---|---|---|
| `boardCream` | `#f5eddc` | Brett-Hintergrund, Felder |
| `fieldCream` | `#fff8ec` | Feldinnenfläche |
| `deepGreen` | `#0f5a3d` | Akzente, Buttons, Häuser |
| `blackLine` | `#111111` | Rahmenlinien |
| `anthracite` | `#252a2c` | UI, Text, Sekundärrahmen |
| `goldAccent` | `#b8924b` | Highlights, Hotels |
| `mutedCityBlue` | `#3d6375` | Stadtmotive, Wasserelemente |
| `eventOrange` | `#e8820c` | Ereigniskarten/-felder |
| `communityGreen` | `#2d7a4f` | Gemeinschaftskarten/-felder |

---

## Aktueller technischer Stand

- Dependency-freier Vanilla-JS-Prototyp, kein Framework, kein Build-Tool außer npm-Skripten.
- 11×11 CSS-Grid für ein quadratisches 40-Felder-Board.
- `src/data/boardSpaces.js` — austauschbare Duisburg-Beispielfelder (Platzhalter).
- `src/config/assetMap.js` — zentrale Asset-Pfad-Registry.
- `data/assets_manifest.json` — Asset-Liste mit Bildgenerierungs-Prompts im cinematic Stil.
- `data/board.config.json` — Board-Metadaten, Designrichtung, Farbpalette, TODOs.
- `scripts/validate-project.js` — prüft Board- und Asset-Konfiguration.

---

## Ordnerstruktur

```text
assets/
  board/     # Board-Zentrum PNG, Eckfeld-PNGs
  tiles/     # Feld-Tile-PNGs (Grundstück, Bahnhof, Werk, Ereignis, Gemeinschaft, Steuer)
  icons/     # Duisburg-Ortsbilder / Mini-Location-Assets (je Grundstück)
  tokens/    # Spielfiguren-PNGs
  cards/     # Ereignis-/Gemeinschaftskarten-Assets (Vorder-/Rückseite)
  ui/        # Würfel, Buttons, Geldsymbol, Dialog-/Panel-Hintergründe

data/
  assets_manifest.json  # Asset-Liste mit cinematic Duisburg-Prompts
  board.config.json     # Projekt-, Layout-, Design- und Farbkonfiguration

src/
  config/assetMap.js    # zentrale Asset-Pfad-Registry
  data/boardSpaces.js   # 40-Felder-Struktur mit Platzhaltern
  game/                 # Spielregeln, Würfel, Besitz, Mieten (geplant)
  ui/                   # UI-Komponenten (PlayerDashboard, CardOverlay, PropertyCard, TradeDialog)
  main.js               # Vanilla-JS-Rendering
  styles.css            # Board-Optik und responsive Platzhalter
```

---

## Board-Struktur

Klassischer Monopoly-artiger Aufbau, 40 Felder:

- 4 Eckfelder: Los/Start, Gefängnis/Nur zu Besuch, Frei Parken, Gehe ins Gefängnis
- 22 Grundstücke/Orte mit 8 Farbgruppen, Kaufpreisen und Mieten
- 4 Bahnhöfe / Duisburger Mobilitätsfelder
- 2 Werke / Duisburger Infrastrukturfelder
- 3 Ereignisfelder, 3 Gemeinschaftsfelder, 2 Steuerfelder

---

## UI-Komponenten (geplant in src/ui/)

| Datei | Beschreibung |
|---|---|
| `PlayerDashboard.js` | Spieler-Panel: Name, Kontostand, Grundstücke, Würfel-Button, Status |
| `PropertyCard.js` | Kaufdialog: Grundstückskarte mit Farbstreifen, Foto, Preis, Miettabelle |
| `CardOverlay.js` | Karten-Modal: Ereignis (orange) und Gemeinschaft (grün) mit Animation |
| `TradeDialog.js` | Handels-Interface: zweispaltig, Ich biete / Du bietest |

Alle Komponenten: Vanilla JS, kein Framework, kompatibel mit 11×11 CSS-Grid.

---

## Asset-Workflow

1. `data/assets_manifest.json` öffnen.
2. Pro Asset den hinterlegten `prompt` in einem KI-Bildgenerator verwenden (Midjourney, Flux, Ideogram, Gemini etc.).
3. PNG exakt unter dem angegebenen `path` speichern, z.B. `assets/icons/icon_harbor.png`.
4. `status` im Manifest von `"planned"` auf `"generated"` ändern.
5. Code muss für reine Asset-Ersetzungen nicht geändert werden, solange Dateipfade gleich bleiben.

---

## Inhalte, die später eingetragen werden

- Finaler Straßen-/Ortsplan mit Reihenfolge auf dem Board
- Duisburger Mobilitätsfelder (Bahnhöfe-Ersatz)
- Infrastrukturfelder (Wasser-/Stromwerk-Ersatz)
- Ereigniskarten mit finalen Texten und Effekten
- Gemeinschaftskarten mit finalen Texten und Effekten
- Finale Spielfiguren und Spielerfarben
- Preise, Mieten, Haus-/Hotelkosten und Balancing

---

## Entwicklung

```bash
npm run dev      # startet statischen Dev-Server
npm run build    # validiert Datenmodell und Asset-Konfiguration
```
