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
  validateBoardSpaces();
  const boardBase = assetMap.board.boardBase;
  const activePlayer = demoPlayers[0];
  const currentSpace = boardSpaces.find((space) => space.index === activePlayer.position);
  const lastDiceRoll = { dice: [3, 4], total: 7 };
  const playerStatus = currentSpace?.price ? 'Kauf möglich' : 'Bitte würfeln';
  const currentPositionLabel = currentSpace ? `${currentSpace.index} · ${currentSpace.name}` : `Feld ${activePlayer.position}`;
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
        <aside class="panel" aria-label="Spieler-Dashboard">
          <h2>Spieler-Dashboard</h2>
          <section class="player-dashboard" aria-live="polite">
            <header class="player-dashboard__header">
              <span class="token" style="--token-color:${activePlayer.color}" aria-hidden="true">
                <img class="token__image" src="${escapeHtml(assetMap.tokens[activePlayer.token])}" alt="" />
              </span>
              <div>
                <p class="eyebrow">Aktiver Spieler</p>
                <h3>${escapeHtml(activePlayer.name)}</h3>
              </div>
            </header>
            <dl class="player-dashboard__stats">
              <div>
                <dt>Kontostand</dt>
                <dd>₡ ${activePlayer.cash.toLocaleString('de-DE')}</dd>
              </div>
              <div>
                <dt>Position</dt>
                <dd>${escapeHtml(currentPositionLabel)}</dd>
              </div>
              <div>
                <dt>Letzter Würfelwurf</dt>
                <dd>${lastDiceRoll.dice.join(' + ')} = ${lastDiceRoll.total}</dd>
              </div>
            </dl>
            <p class="player-dashboard__status">${escapeHtml(playerStatus)}</p>
            <div class="player-dashboard__actions" aria-label="Spielaktionen">
              <button type="button">Würfeln</button>
              <button type="button" ${currentSpace?.price ? '' : 'disabled'}>Kaufen</button>
              <button type="button">Zug beenden</button>
            </div>
          </section>
        </aside>
      </section>
    </main>`;
}

renderApp();
