// Central asset path registry. Files may be missing during prototyping; UI falls back to CSS placeholders.
const numberedTilePaths = Object.fromEntries(
  Array.from({ length: 40 }, (_, index) => [`space${index}`, `/assets/tiles/${index}.png`])
);

export const assetMap = {
  "board": {
    "boardBase": "/assets/board/board_base.png",
    "cornerStart": "/assets/board/corner_start.png",
    "cornerJail": "/assets/board/corner_jail.png",
    "cornerFreeParking": "/assets/board/corner_free_parking.png",
    "cornerGoToJail": "/assets/board/corner_go_to_jail.png"
  },
  "tiles": {
    ...numberedTilePaths,
    "propertyBase": "/assets/tiles/tile_property_base.png",
    "station": "/assets/tiles/tile_station.png",
    "utility": "/assets/tiles/tile_utility.png",
    "event": "/assets/tiles/tile_event.png",
    "community": "/assets/tiles/tile_community.png",
    "tax": "/assets/tiles/tile_tax.png"
  },
  "icons": {
    "harbor": "/assets/icons/icon_harbor.png",
    "steelworks": "/assets/icons/icon_steelworks.png",
    "river": "/assets/icons/icon_river.png",
    "tram": "/assets/icons/icon_tram.png",
    "trainStation": "/assets/icons/icon_train_station.png",
    "cityHall": "/assets/icons/icon_city_hall.png",
    "tigerTurtle": "/assets/icons/icon_tiger_turtle.png",
    "landschaftspark": "/assets/icons/icon_landschaftspark.png",
    "innerHarbor": "/assets/icons/icon_inner_harbor.png",
    "zoo": "/assets/icons/icon_zoo.png",
    "university": "/assets/icons/icon_university.png",
    "stadiumGeneric": "/assets/icons/icon_stadium_generic.png"
  },
  "tokens": {
    "zebra": "/assets/tokens/token_zebra.png",
    "car": "/assets/tokens/token_car.png",
    "van": "/assets/tokens/token_van.png",
    "bottle": "/assets/tokens/token_bottle.png",
    "fries": "/assets/tokens/token_fries.png",
    "ship": "/assets/tokens/token_ship.png",
    "scooter": "/assets/tokens/token_scooter.png",
    "knife": "/assets/tokens/token_knife.png"
  },
  "cards": {
    "eventFront": "/assets/cards/event_card_front.png",
    "eventBack": "/assets/cards/event_card_back.png",
    "communityFront": "/assets/cards/community_card_front.png",
    "communityBack": "/assets/cards/community_card_back.png"
  },
  "ui": {
    "buttonNormal": "/assets/ui/button_normal.png",
    "buttonHover": "/assets/ui/button_hover.png",
    "moneyIcon": "/assets/ui/money_icon.png",
    "dice1": "/assets/ui/dice_1.png",
    "dice2": "/assets/ui/dice_2.png",
    "dice3": "/assets/ui/dice_3.png",
    "dice4": "/assets/ui/dice_4.png",
    "dice5": "/assets/ui/dice_5.png",
    "dice6": "/assets/ui/dice_6.png"
  }
};

export const assetManifestPath = '/data/assets.manifest.json';

export const getAssetPath = (category, key) => assetMap?.[category]?.[key] ?? null;
