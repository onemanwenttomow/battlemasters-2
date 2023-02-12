export interface Unit {
  name: string;
  id: UnitId;
  x: number;
  y: number;
  src: string;
  alt: string;
  isActive: boolean;
  hasMoved: boolean;
}

type UnitId =
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

export type PlayingCards = Array<Card>;

export interface Card {
  ids: Array<UnitId>;
  img: string;
  moves: number;
}

export type Tiles = "river" | "grass" | "road" | "swamp" | "tower";

export interface Cube {
  q: number;
  r: number;
  s: number;
}

export type Offset = [number, number];
