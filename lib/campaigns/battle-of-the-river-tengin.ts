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
  { id: "gorefists", x: null, y: null },
  { id: "grimorg", x: null, y: null },
  { id: "gorebands", x: null, y: null },
  { id: "finmars", x: null, y: null },
  { id: "bogrots", x: null, y: null },
  { id: "blackfangs", x: null, y: null },
  { id: "bale", x: null, y: null },
  { id: "flint", x: null, y: null },
  { id: "gazkulls", x: null, y: null },
  { id: "zogrods", x: null, y: null },
  { id: "grom", x: null, y: null },
  { id: "uglub", x: null, y: null },
  { id: "doomguard", x: null, y: null },
  { id: "fellmoors", x: null, y: null },
];

const startingZones = {
  Imperial: { x: 0, y: [] },
  Chaos: { x: 0, y: [0, 1] },
};

export const campaign = {
  board,
  unitPositions,
  startingZones,
  canRandomise: true,
  canPositionPreStart: true,
};
