import { Tile, Unit } from "types";
// g - grass
// ro - road
// ri - river
// to - tower
// sw - swamp
// di - ditch

const board = [
  ["g", "ro", "g", "g", "g", "ro", "g", "g", "g", "ro", "g", "g"],
  ["g", "ro", "g", "g", "g", "ro", "g", "g", "g", "ro", "g", "g", "g"],
  ["ro", "g", "ri", "ri", "ro", "to", "ri", "ri", "ro", "g", "ri", "ri"],
  ["ro", "ri", "ri", "g", "ro", "ri", "ri", "g", "ro", "ri", "ri", "g", "ro"],
  ["ro", "sw", "g", "ro", "ro", "g", "g", "ro", "ro", "g", "g", "ro"],
  ["g", "ro", "sw", "ro", "g", "ro", "di", "ro", "g", "ro", "g", "ro", "g"],
  ["g", "ro", "ro", "g", "g", "ro", "ro", "g", "g", "ro", "ro", "g"],
  ["g", "g", "ro", "g", "g", "g", "ro", "g", "g", "g", "ro", "g", "g"],
  ["g", "g", "ro", "g", "g", "g", "ro", "g", "g", "g", "ro", "g"],
  ["g", "g", "g", "ro", "g", "g", "g", "ro", "g", "g", "g", "ro", "g"],
  ["g", "g", "ro", "g", "g", "g", "ro", "g", "g", "g", "ro", "g"],
  ["g", "g", "ro", "g", "g", "g", "ro", "g", "g", "g", "ro", "g", "g"],
] as Array<Array<Tile>>;

const unitPositions: Pick<Unit, "id" | "x" | "y">[] = [
  { id: "canon", x: 6, y: 5 },
  { id: "empire-knights", x: 5, y: 4 },
  { id: "grunberg-archers", x: 3, y: 3 },
  { id: "bogenhaffen", x: 7, y: 3 },
  { id: "melgar", x: 6, y: 1 },
  { id: "reikwald", x: 4, y: 3 },
  { id: "grunburg-arms", x: 1, y: 1 },
  { id: "altdorf", x: 8, y: 3 },
  { id: "delbornes", x: 10, y: 5 },
  { id: "blitzens", x: 9, y: 5 },
  { id: "normands", x: 8, y: 5 },
  { id: "gorefists", x: 1, y: 10 },
  { id: "grimorg", x: 1, y: 9 },
  { id: "gorebands", x: 3, y: 10 },
  { id: "finmars", x: 4, y: 10 },
  { id: "bogrots", x: 3, y: 9 },
  { id: "blackfangs", x: 4, y: 9 },
  { id: "bale", x: 5, y: 9 },
  { id: "flint", x: 5, y: 10 },
  { id: "gazkulls", x: 6, y: 10 },
  { id: "zogrods", x: 7, y: 11 },
  { id: "grom", x: 7, y: 9 },
  { id: "uglub", x: 7, y: 10 },
  { id: "doomguard", x: 3, y: 11 },
  { id: "fellmoors", x: 4, y: 11 },
];

const startingZones = {
  Imperial: { x: 0, y: [] },
  Chaos: { x: 0, y: [] },
};

export const campaign = {
  board,
  unitPositions,
  startingZones,
};
