export interface Unit {
  name: string;
  id: string;
  x: number;
  y: number;
  src: string;
  alt: string;
}

export type PlayingCards = Array<Card>;

export interface Card {
  ids: Array<string>;
  img: string;
}

export type Tiles = "river" | "grass" | "road" | "swamp" | "tower";

export interface Cube {
  q: number;
  r: number;
  s: number;
}
