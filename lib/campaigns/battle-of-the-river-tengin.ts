import { Tile, Unit } from "types";
// g - grass
// ro - road
// ri - river
// to - tower
// sw - swamp
// di - ditch

export const board = [
  ["g", "ro", "g", "g", "g", "ro", "g", "g", "g", "ro", "g", "g"],
  ["g", "ro", "g", "g", "g", "ro", "g", "g", "g", "ro", "g", "g", "g"],
  ["ro", "g", "ri", "ri", "ro", "g", "ri", "ri", "ro", "g", "ri", "ri"],
  ["ro", "ri", "ri", "g", "ro", "ri", "ri", "g", "ro", "ri", "ri", "g", "ro"],
  ["ro", "g", "g", "ro", "ro", "g", "g", "ro", "ro", "g", "g", "ro"],
  ["g", "ro", "g", "ro", "g", "ro", "g", "ro", "g", "ro", "g", "ro", "g"],
  ["g", "ro", "ro", "to", "g", "ro", "ro", "g", "g", "ro", "ro", "g"],
  ["g", "g", "ro", "g", "g", "g", "ro", "g", "g", "g", "ro", "g", "g"],
  ["g", "g", "ro", "g", "g", "g", "ro", "g", "g", "g", "ro", "g"],
  ["g", "g", "g", "ro", "g", "g", "g", "ro", "g", "g", "g", "ro", "g"],
  ["g", "g", "ro", "g", "g", "g", "ro", "g", "g", "g", "ro", "g"],
  ["g", "g", "ro", "g", "g", "g", "ro", "g", "g", "g", "ro", "g", "g"],
] as Array<Array<Tile>>;

// for now 999 means user needs to add them to the baord

const unitPositions: Pick<Unit, "id" | "x" | "y">[] = [
  { id: "canon", x: 7, y: 7 },
  { id: "empire-knights", x: 10, y: 8 },
  { id: "grunberg-archers", x: 4, y: 4 },
  { id: "bogenhaffen", x: 7, y: 4 },
  { id: "melgar", x: 4, y: 5 },
  { id: "reikwald", x: 4, y: 3 },
  { id: "grunburg-arms", x: 0, y: 2 },
  { id: "altdorf", x: 8, y: 3 },
  { id: "delbornes", x: 11, y: 9 },
  { id: "blitzens", x: 10, y: 10 },
  { id: "normands", x: 10, y: 11 },
  { id: "gorefists", x: 999, y: 999 },
  { id: "grimorg", x: 999, y: 999 },
  { id: "gorebands", x: 999, y: 999 },
  { id: "finmars", x: 999, y: 999 },
  { id: "bogrots", x: 999, y: 999 },
  { id: "blackfangs", x: 999, y: 999 },
  { id: "bale", x: 999, y: 999 },
  { id: "flint", x: 999, y: 999 },
  { id: "gazkulls", x: 999, y: 999 },
  { id: "zogrods", x: 999, y: 999 },
  { id: "grom", x: 999, y: 999 },
  { id: "uglub", x: 999, y: 999 },
  { id: "doomguard", x: 999, y: 999 },
  { id: "fellmoors", x: 999, y: 999 },
];

export const campaign = {
  board,
  unitPositions,
};
