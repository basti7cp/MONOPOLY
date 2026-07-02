import { assetMap } from './config/assetMap.js';
import { boardSpaces, demoPlayers, validateBoardSpaces } from './data/boardSpaces.js';

const typeLabels = {
  start: 'Start', property: 'Ort', station: 'Mobilität', utility: 'Werk', tax: 'Abgabe',
  event: 'Ereignis', community: 'Kiez', jail: 'Pause', freeParking: 'Frei', goToJail: 'Zur Pause'
};

function cssPosition(index) {
  if (index <= 10) return `grid-column:${11 - index};grid-row:11`;
  if (index <= 20) return `grid-column:1;grid-row:${21 - index}`;
  if (index <= 30) return `grid-column:${index - 19};grid-row:1`;
  return `grid-column:11;grid-row:${index - 29}`;
}

function sideClass(index) {
  if ([0, 10, 20, 30].includes(index)) return 'space--corner';
  if (index < 10) return 'space--bottom';
  if (index < 20) return 'space--left';
  if (index < 30) return 'space--top';
  return 'space--right';
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
}

function formatCash(value) {
  return `₡ ${value.toLocaleString('de-DE')}`;
}

function pipCells(value) {
  const positions = { 1: [4], 2: [0, 8], 3: [0, 4, 8], 4: [0, 2, 6, 8], 5: [0, 2, 4, 6, 8], 6: [0, 2, 3, 5, 6, 8] };
  const active = positions[value] ?? [];
  return Array.from({ length: 9 }, (_, index) => active.includes(index));
}

function renderDie(value) {
  return `<span class="die" aria-label="Würfel ${value}">${pipCells(value).map((on) => `<i class="die__cell${on ? ' die__cell--on' : ''}"></i>`).join('')}</span>`;
}

function renderPlayerHud() {
  const activePlayer = demoPlayers[0];
  const activeSpace = boardSpaces.find((space) => space.index === activePlayer.position) ?? boardSpaces[0];
  const dice = [3, 4];
  const playerPills = demoPlayers.map((player, index) => {
    const tokenImage = assetMap.tokens[player.token];
    return `
      <li class="player-pill${index === 0 ? ' player-pill--active' : ''}" style="--player-color:${player.color}">
        <span class="player-pill__band"></span>
        <img class="player-pill__token" src="${escapeHtml(tokenImage)}" alt="${escapeHtml(player.name)}" />
        <span class="player-pill__copy">
          <strong>${escapeHtml(player.name)}</strong>
          <small>${formatCash(player.cash)}</small>
        </span>
      </li>`;
  }).join('');

  return `
    <aside class="hud" aria-label="Spieler-HUD">
      <div class="hud__heading">
        <p class="hud__kicker">Stahlstadt Tycoon</p>
        <h2>Spieler-HUD</h2>
      </div>
      <ol class="player-rail">${playerPills}</ol>
      <section class="hud-card hud-card--active">
        <div class="active-token" style="--player-color:${activePlayer.color}">
          <img src="${escapeHtml(assetMap.tokens[activePlayer.token])}" alt="${escapeHtml(activePlayer.name)}" />
        </div>
        <div class="active-summary">
          <span>Aktiver Spieler</span>
          <strong>${escapeHtml(activePlayer.name)}</strong>
          <em>Steht auf ${escapeHtml(activeSpace.name)}</em>
          <b>${formatCash(activePlayer.cash)}</b>
        </div>
      </section>
      <section class="hud-card hud-card--dice" aria-label="Würfelstatus">
        <div class="dice-pair">${dice.map(renderDie).join('')}</div>
        <div class="dice-sum"><span>Summe</span><strong>${dice[0] + dice[1]}</strong></div>
      </section>
      <section class="hud-card hud-card--actions">
        <button type="button" class="hud-button hud-button--primary">Würfeln</button>
        <button type="button" class="hud-button">Feld kaufen</button>
        <button type="button" class="hud-button">Karte ziehen</button>
        <button type="button" class="hud-button hud-button--dark">Zug beenden</button>
      </section>
      <section class="hud-log">
        <h3>Spielprotokoll</h3>
        <p><span></span>${escapeHtml(activePlayer.name)} ist am Zug — bitte würfeln.</p>
        <p><span></span>Der UI-Entwurf wurde als modulare Seitenleiste übernommen.</p>
      </section>
    </aside>`;
}

function renderSpace(space) {
  const occupyingPlayers = demoPlayers.filter((player) => player.position === space.index);
  const tokens = occupyingPlayers.map((player) => {
    const tokenImage = assetMap.tokens[player.token];
    return `
      <span class="token" style="--token-color:${player.color}" title="${escapeHtml(player.name)}">
        <img class="token__image" src="${escapeHtml(tokenImage)}" alt="${escapeHtml(player.name)}" />
      </span>`;
  }).join('');
  const tileImage = space.tileImage ?? assetMap.tiles[`space${space.index}`];
  const labelParts = [space.index, space.name, typeLabels[space.type], space.price ? `Preis ${space.price}` : null, space.amount ? `Abgabe ${space.amount}` : null].filter(Boolean);

  return `
    <article class="space space--${space.type} ${sideClass(space.index)}" style="${cssPosition(space.index)}" aria-label="${escapeHtml(labelParts.join(', '))}">
      <img class="space__tile-image" src="${escapeHtml(tileImage)}" alt="" />
      <div class="space__meta" aria-hidden="true">
        <div class="space__stripe"></div>
        <span class="space__index">${space.index}</span>
        <strong>${escapeHtml(space.name)}</strong>
        <small>${typeLabels[space.type]}</small>
        ${space.price ? `<span class="space__price">₡ ${space.price}</span>` : ''}
        ${space.amount ? `<span class="space__price">-₡ ${space.amount}</span>` : ''}
      </div>
      <div class="tokens" aria-label="Figuren auf ${escapeHtml(space.name)}">${tokens}</div>
    </article>`;
}

function renderApp() {
  const assetCount = Object.values(assetMap).reduce((sum, group) => sum + Object.keys(group).length, 0);
  const boardIsValid = validateBoardSpaces();
  const boardBase = assetMap.board.boardBase;
  document.getElementById('root').innerHTML = `
    <main class="app-shell">
      <section class="hero">
        <p class="eyebrow">Eigenständiger Ruhrpott-Prototyp</p>
        <h1>Duisburg Deal</h1>
        <p>Browserbasierte Brettspiel-Grundlage mit 40 Feldern, zentraler Asset-Konfiguration und nummerierten Tile-PNGs von LOS bis Logport.</p>
      </section>
      <section class="game-layout">
        <div class="board" aria-label="Duisburg Deal Spielbrett mit 40 Feldern">
          <div class="board__center" aria-label="Board Base mit Duisburg-Motiven">
            <img class="board__base-image" src="${escapeHtml(boardBase)}" alt="" />
          </div>
          ${boardSpaces.map(renderSpace).join('')}
        </div>
        <div class="side-stack">
          ${renderPlayerHud()}
          <aside class="panel">
            <h2>Projektbasis</h2>
            <ul>
              <li>${boardSpaces.length} Felder modelliert (${boardIsValid ? 'validiert' : 'prüfen'})</li>
              <li>${assetCount} Asset-Pfade registriert</li>
              <li>${demoPlayers.length} Beispiel-Token platziert</li>
            </ul>
            <h3>Nächste TODOs</h3>
            <ol>
              <li>Kauf-, Miet-, Würfel- und Kartenlogik ergänzen.</li>
              <li>Kartenstapel für Ereignis- und Kiezkarten als Datenmodell ergänzen.</li>
              <li>Mobile Detailansicht für einzelne Felder ausbauen.</li>
            </ol>
          </aside>
        </div>
      </section>
    </main>`;
}

renderApp();
