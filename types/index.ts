export interface Unit {
  name: string;
  id: UnitId;
  x: number;
  y: number;
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

type Army = "Imperial" | "Chaos";

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

export interface Dice {
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

export type Tiles = "river" | "grass" | "road" | "swamp" | "tower";

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

export interface CanonTile {
  src: CanonCard;
  offset: Offset;
  revealed: boolean;
  isTarget: boolean
}
