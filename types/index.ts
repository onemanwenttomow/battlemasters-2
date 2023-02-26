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
  | "battle-of-the-river-tengin";

export interface Campaign {
  title: string;
  id: CampaignId;
}
