export const SPACE_TYPES = Object.freeze({
  START: 'start', PROPERTY: 'property', STATION: 'station', UTILITY: 'utility', TAX: 'tax',
  EVENT: 'event', COMMUNITY: 'community', JAIL: 'jail', FREE_PARKING: 'freeParking', GO_TO_JAIL: 'goToJail'
});

const groups = ['harbor', 'river', 'industry', 'city', 'green', 'culture', 'north', 'west'];
const property = (index, name, group, price, icon = null) => ({ index, type: SPACE_TYPES.PROPERTY, name, group, price, rent: Math.round(price * 0.12), icon });

const spaces = [
  { index: 0, type: SPACE_TYPES.START, name: 'Starthafen', subtitle: 'Bonus beim Passieren', action: 'collectStartBonus' },
  property(1, 'Ruhrort Kai', groups[0], 60, 'harbor'),
  { index: 2, type: SPACE_TYPES.COMMUNITY, name: 'Nachbarschaft', deck: 'community' },
  property(3, 'Innenhafen Promenade', groups[0], 60, 'innerHarbor'),
  { index: 4, type: SPACE_TYPES.TAX, name: 'Stadtabgabe', amount: 100 },
  { index: 5, type: SPACE_TYPES.STATION, name: 'Duisburg Hbf', price: 200, icon: 'trainStation' },
  property(6, 'Neudorf Campus', groups[1], 100, 'university'),
  { index: 7, type: SPACE_TYPES.EVENT, name: 'Reviermoment', deck: 'event' },
  property(8, 'Duissern Allee', groups[1], 100, 'tram'),
  property(9, 'Rheinwiese', groups[1], 120, 'river'),
  { index: 10, type: SPACE_TYPES.JAIL, name: 'Nur zu Besuch', subtitle: 'Ruhrpott-Pause' },
  property(11, 'Landschaftspark', groups[2], 140, 'landschaftspark'),
  { index: 12, type: SPACE_TYPES.UTILITY, name: 'Stadtwerke Wasser', price: 150, icon: 'river' },
  property(13, 'Meiderich Markt', groups[2], 140, 'cityHall'),
  property(14, 'Stahlwerk Blick', groups[2], 160, 'steelworks'),
  { index: 15, type: SPACE_TYPES.STATION, name: 'Ruhrort Bahnhof', price: 200, icon: 'trainStation' },
  property(16, 'Zoo Viertel', groups[3], 180, 'zoo'),
  { index: 17, type: SPACE_TYPES.COMMUNITY, name: 'Kiezkarte', deck: 'community' },
  property(18, 'Rathausbogen', groups[3], 180, 'cityHall'),
  property(19, 'Königstraße', groups[3], 200, 'tram'),
  { index: 20, type: SPACE_TYPES.FREE_PARKING, name: 'Freier Parkplatz', subtitle: 'Kurz durchschnaufen' },
  property(21, 'Tiger & Turtle Hügel', groups[4], 220, 'tigerTurtle'),
  { index: 22, type: SPACE_TYPES.EVENT, name: 'Hafenwind', deck: 'event' },
  property(23, 'Wanheim Grünzug', groups[4], 220, 'river'),
  property(24, 'Sechs-Seen-Blick', groups[4], 240, 'river'),
  { index: 25, type: SPACE_TYPES.STATION, name: 'Hafenbahn', price: 200, icon: 'trainStation' },
  property(26, 'Hochfeld Brücke', groups[5], 260, 'steelworks'),
  property(27, 'Dellviertel Bühne', groups[5], 260, 'cityHall'),
  { index: 28, type: SPACE_TYPES.UTILITY, name: 'Stadtwerke Energie', price: 150, icon: 'steelworks' },
  property(29, 'Innenstadt Passage', groups[5], 280, 'tram'),
  { index: 30, type: SPACE_TYPES.GO_TO_JAIL, name: 'Ab zur Pause', targetIndex: 10 },
  property(31, 'Marxloh Boulevard', groups[6], 300, 'tram'),
  property(32, 'Walsum Rheinblick', groups[6], 300, 'river'),
  { index: 33, type: SPACE_TYPES.COMMUNITY, name: 'Vereinsleben', deck: 'community' },
  property(34, 'Hamborn Werkstor', groups[6], 320, 'steelworks'),
  { index: 35, type: SPACE_TYPES.STATION, name: 'S-Bahn Knoten', price: 200, icon: 'trainStation' },
  { index: 36, type: SPACE_TYPES.EVENT, name: 'Schichtwechsel', deck: 'event' },
  property(37, 'Rheinhausen Ufer', groups[7], 350, 'river'),
  { index: 38, type: SPACE_TYPES.TAX, name: 'Hafenbeitrag', amount: 120 },
  property(39, 'Logport Quartier', groups[7], 400, 'harbor')
];

export const boardSpaces = spaces.map((space) => ({
  ...space,
  tileImage: `/assets/tiles/${space.index}.png`
}));

export const demoPlayers = [
  { id: 'p1', name: 'Zebra', token: 'zebra', color: '#2f5f73', position: 0, cash: 1500 },
  { id: 'p2', name: 'Silberwagen', token: 'car', color: '#6f777d', position: 3, cash: 1500 },
  { id: 'p3', name: 'Transporter', token: 'van', color: '#87919a', position: 7, cash: 1500 },
  { id: 'p4', name: 'Flasche', token: 'bottle', color: '#b8c0c7', position: 10, cash: 1500 },
  { id: 'p5', name: 'Pommes', token: 'fries', color: '#c7652d', position: 20, cash: 1500 },
  { id: 'p6', name: 'Frachter', token: 'ship', color: '#1f7a9d', position: 25, cash: 1500 },
  { id: 'p7', name: 'Roller', token: 'scooter', color: '#6f9a73', position: 31, cash: 1500 },
  { id: 'p8', name: 'Messer', token: 'knife', color: '#1d2a2f', position: 39, cash: 1500 }
];

export const validateBoardSpaces = (spaces = boardSpaces) => spaces.length === 40 && spaces.every((space, index) => space.index === index);
