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
  ["g", "ro", "g", "ro", "g", "ro", "sw", "ro", "g", "ro", "g", "ro", "g"],
  ["g", "ro", "ro", "g", "g", "ro", "ro", "g", "g", "ro", "ro", "g"],
  ["g", "g", "ro", "g", "g", "g", "ro", "g", "g", "g", "ro", "g", "g"],
  ["g", "g", "ro", "g", "g", "g", "ro", "g", "g", "g", "ro", "g"],
  ["g", "g", "g", "ro", "g", "g", "sw", "ro", "g", "g", "g", "ro", "g"],
  ["g", "g", "ro", "g", "g", "g", "ro", "g", "g", "g", "ro", "g"],
  ["g", "g", "ro", "g", "g", "g", "ro", "sw", "g", "g", "ro", "g", "g"],
] as Array<Array<Tile>>;

const unitPositions: Pick<Unit, "id" | "x" | "y">[] = [
  { id: "canon", x: null, y: null },
  { id: "empire-knights", x: null, y: null },
  { id: "grunberg-archers", x: null, y: null },
  { id: "bogenhaffen", x: null, y: null },
  { id: "melgar", x: null, y: null },
  { id: "reikwald", x: null, y: null },
  { id: "grunburg-arms", x: null, y: null },
  { id: "altdorf", x: null, y: null },
  { id: "delbornes", x: null, y: null },
  { id: "blitzens", x: null, y: null },
  { id: "normands", x: null, y: null },
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
  Imperial: { x: -1, y: [] },
  Chaos: { x: 1, y: [] },
};

export const campaign = {
  board,
  unitPositions,
  startingZones,
  canRandomise: false,
  canPositionPreStart: false,
};
