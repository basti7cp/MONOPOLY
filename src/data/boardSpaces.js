export const SPACE_TYPES = Object.freeze({
  START: 'start', PROPERTY: 'property', STATION: 'station', UTILITY: 'utility', TAX: 'tax',
  EVENT: 'event', COMMUNITY: 'community', JAIL: 'jail', FREE_PARKING: 'freeParking', GO_TO_JAIL: 'goToJail'
});

const groups = ['harbor', 'river', 'industry', 'city', 'green', 'culture', 'north', 'west'];
const property = (index, name, group, price, icon = null) => ({ index, type: SPACE_TYPES.PROPERTY, name, group, price, rent: Math.round(price * 0.12), icon });

const spaces = [
  { index: 0, type: SPACE_TYPES.START, name: 'Starthafen', subtitle: 'Bonus beim Passieren', action: 'collectStartBonus' },
  property(1, 'Friedrichplatz', groups[0], 400, 'harbor'),
  { index: 2, type: SPACE_TYPES.COMMUNITY, name: 'Nachbarschaft', deck: 'community' },
  property(3, 'König Brauerei', groups[0], 600, 'innerHarbor'),
  { index: 4, type: SPACE_TYPES.TAX, name: 'Schutzgeld', amount: 2000 },
  { index: 5, type: SPACE_TYPES.STATION, name: 'Marxloh Pollmann', price: 2000, icon: 'trainStation' },
  property(6, 'Alt-Hamborn', groups[1], 1000, 'university'),
  { index: 7, type: SPACE_TYPES.EVENT, name: 'Reviermoment', deck: 'event' },
  property(8, 'LaminatDEPOT', groups[1], 1000, 'tram'),
  property(9, 'Landschaftspark', groups[1], 1200, 'river'),
  { index: 10, type: SPACE_TYPES.JAIL, name: 'Nur zu Besuch', subtitle: 'Ruhrpott-Pause' },
  property(11, 'Casino', groups[2], 1400, 'landschaftspark'),
  { index: 12, type: SPACE_TYPES.UTILITY, name: 'Stadtwerke', price: 1500, icon: 'river' },
  property(13, 'Vulkanstraße', groups[2], 1400, 'cityHall'),
  property(14, 'Steinische Gasse', groups[2], 1600, 'steelworks'),
  { index: 15, type: SPACE_TYPES.STATION, name: 'Duisburg Hbf', price: 2000, icon: 'trainStation' },
  property(16, 'FitX Hafen', groups[3], 1800, 'zoo'),
  { index: 17, type: SPACE_TYPES.COMMUNITY, name: 'Kiezkarte', deck: 'community' },
  property(18, 'Gemeinschaftsfeld', groups[3], 1800, 'cityHall'),
  property(19, 'MSV Arena', groups[3], 2000, 'tram'),
  { index: 20, type: SPACE_TYPES.FREE_PARKING, name: 'Freier Parkplatz', subtitle: 'Kurz durchschnaufen' },
  property(21, 'Mr. Wash', groups[4], 2200, 'tigerTurtle'),
  { index: 22, type: SPACE_TYPES.EVENT, name: 'Hafenwind', deck: 'event' },
  property(23, 'Tuna', groups[4], 2200, 'river'),
  property(24, 'Pulp', groups[4], 2400, 'river'),
  { index: 25, type: SPACE_TYPES.STATION, name: 'Duisburg Rahm Bf', price: 2000, icon: 'trainStation' },
  property(26, 'Wolfsee', groups[5], 2600, 'steelworks'),
  property(27, 'Tiger & Turtle', groups[5], 2600, 'cityHall'),
  { index: 28, type: SPACE_TYPES.UTILITY, name: 'DVG', price: 1500, icon: 'steelworks' },
  property(29, 'Golfplatz', groups[5], 2800, 'tram'),
  { index: 30, type: SPACE_TYPES.GO_TO_JAIL, name: 'Ab zur Pause', targetIndex: 10 },
  property(31, 'FitX Rheinhausen', groups[6], 3000, 'tram'),
  property(32, 'Havi', groups[6], 3000, 'river'),
  { index: 33, type: SPACE_TYPES.COMMUNITY, name: 'Vereinsleben', deck: 'community' },
  property(34, 'Willy-Brandt-Berufskolleg', groups[6], 3200, 'steelworks'),
  { index: 35, type: SPACE_TYPES.STATION, name: 'Rheinhausen Bf', price: 2000, icon: 'trainStation' },
  { index: 36, type: SPACE_TYPES.EVENT, name: 'Schichtwechsel', deck: 'event' },
  property(37, 'Hochheide Markt', groups[7], 3500, 'river'),
  { index: 38, type: SPACE_TYPES.TAX, name: 'Schutzgeld', amount: 1000 },
  property(39, 'Weiße Riesen', groups[7], 4000, 'harbor')
];

export const boardSpaces = spaces.map((space) => ({
  ...space,
  tileImage: `assets/tiles/${space.index}.png`
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
