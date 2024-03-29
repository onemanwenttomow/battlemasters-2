export interface GameState {
  board: Array<Array<Tile>>;
  startingZones: StartingZones;
  units: Unit[];
  activeUnit: UnitId | null;
  addUnitToBoard: boolean;
  canRandomise: boolean;
  canPositionPreStart: boolean;
  playingCards: PlayingCards;
  playedCards: PlayingCards;
  gameStarted: boolean;
  possibleMoves: Offset[];
  possibleAttacks: Offset[];
  battleInProgress: boolean;
  attackingUnitId: UnitId | null;
  defendingUnitId: UnitId | null;
  attackingDice: DiceInterface[];
  defendingDice: DiceInterface[];
  resetGame: () => void;
  setCampaign: (id: CampaignId) => void;
  getUnitByCoords: (x: number, y: number) => Unit | undefined;
  getUnitById: (id: UnitId) => Unit;
  tileHasUnit: (x: number, y: number) => boolean;
  shufflePlayingCards: () => void;
  drawNextCard: () => void;
  setActiveUnit: (id: UnitId) => void;
  moveUnit: (x: number, y: number) => void;
  skipMove: (id: UnitId) => void;
  skipAttack: (id: UnitId) => void;
  skipEntireTurn: () => void;
  startBattle: (attackingId: UnitId, defendingId: UnitId) => void;
  endBattle: (attackingUnitId: UnitId, defendingUnitId: UnitId) => void;
  setPreGameActiveUnit: (id: UnitId, army: Army) => void;
  randomiseUnits: (army: Army) => void;
  activeUnitsTurnComplete: () => boolean;
}

export interface CanonSlice {
  canonTiles: CanonTile[];
  canonTilesSet: boolean;
  canonMisFire: CanonTile | null;
  startCanonBattle: (defendingUnitId: UnitId, preview?: boolean) => void;
  canonTileReveal: (canonTile: CanonTile) => void;
  setCanonMisFire: () => void;
  canonMisfireReveal: () => void;
}

export interface OgreSlice {
  ogreCards: OgreCard[];
  drawOgreCard: () => void;
}

export interface StartingZones {
  Imperial: {
    x: number;
    y: number[];
  };
  Chaos: {
    x: number;
    y: number[];
  };
}

export interface Unit {
  name: string;
  id: UnitId;
  x: number | null;
  y: number | null;
  src: string;
  alt: string;
  isActive: boolean;
  hasMoved: boolean;
  hasAttacked: boolean;
  army: Army;
  range: number;
  combatValue: number;
  damageSustained: number;
}

export type Army = "Imperial" | "Chaos";

export type UnitId =
  | "canon"
  | "empire-knights"
  | "grunberg-archers"
  | "bogenhaffen"
  | "melgar"
  | "reikwald"
  | "grunburg-arms"
  | "altdorf"
  | "delbornes"
  | "blitzens"
  | "normands"
  | "gorefists"
  | "grimorg"
  | "gorebands"
  | "finmars"
  | "bogrots"
  | "blackfangs"
  | "bale"
  | "flint"
  | "gazkulls"
  | "zogrods"
  | "grom"
  | "uglub"
  | "doomguard"
  | "fellmoors";

export interface DiceInterface {
  id: number;
  value: number;
}

export type PlayingCards = Array<Card>;

export interface Card {
  ids: Array<UnitId>;
  img: string;
  moves: number;
  extraDice: 0 | 1;
}

export type Tile = "ri" | "g" | "ro" | "sw" | "to" | "di";

export interface Cube {
  q: number;
  r: number;
  s: number;
}

export type Offset = [number, number];

export type CanonCard =
  | "/canon-cards/canon-explosion.png"
  | "/canon-cards/canon-bounce.png"
  | "/canon-cards/canon-fly.png"
  | "/canon-cards/canon-target.png";

export interface OgreCard {
  src: OgreSrc;
  revealed: boolean;
}

export type OgreSrc =
  | "/ogre-cards/ogre-attack-card.png"
  | "/ogre-cards/ogre-move-card.png";

export interface CanonTile {
  src: CanonCard;
  offset: Offset;
  revealed: boolean;
  isTarget: boolean;
}

export type CampaignId =
  | "battle-of-the-borderlands"
  | "battle-of-the-river-tengin"
  | "battle-on-the-road-to-grunberg"
  | "battle-of-the-plains"
  | "battle-of-altdorf";

export interface Campaign {
  title: string;
  id: CampaignId;
}
