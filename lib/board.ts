import { Offset, Tile } from "types";

// g - grass
// ro - road
// ri - river
// to - tower
// sw - swamp
// di - ditch

export const board = [
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

const towerRow = board.find((row) => row.includes("to")) as Tile[];
const towerY = board.indexOf(towerRow);
const towerX = towerRow.indexOf("to");

export const towerOffset: Offset = [towerX, towerY];

const ditchRow = board.find((row) => row.includes("di")) as Tile[];
const ditchY = board.indexOf(ditchRow);
const ditchX = ditchRow.indexOf("di");

export const ditchOffset: Offset = [ditchX, ditchY];

export const tilesDictionary = {
  ri: {
    src: "/tiles/tileWater.png",
    extras: [
      {
        src: "/tiles/waveWater.png",
        height: "10px",
        width: "33px",
        top: "30px",
        left: "10px",
      },
    ],
  },
  g: {
    src: "/tiles/tileGrass.png",
    extras: [],
  },
  ro: {
    src: "/tiles/tileDirt.png",
    extras: [],
  },
  sw: {
    src: "/tiles/tileGrass.png",
    extras: [
      {
        src: "/tiles/bushDirt.png",
        width: "15px",
        height: "20px",
        top: "30px",
        left: "30px",
      },
      {
        src: "/tiles/bushGrass.png",
        width: "15px",
        height: "20px",
        top: "0px",
        left: "25px",
      },
      {
        src: "/tiles/bushDirt.png",
        width: "15px",
        height: "20px",
        top: "10px",
        left: "10px",
      },
      {
        src: "/tiles/bushGrass.png",
        width: "15px",
        height: "20px",
        top: "30px",
        left: "15px",
      },
      {
        src: "/tiles/bushDirt.png",
        width: "15px",
        height: "20px",
        top: "10px",
        left: "40px",
      },
      {
        src: "/tiles/bushDirt.png",
        width: "15px",
        height: "20px",
        top: "40px",
        left: "10px",
      },
      {
        src: "/tiles/bushGrass.png",
        width: "15px",
        height: "20px",
        top: "40px",
        left: "45px",
      },
    ],
  },
  to: {
    src: "/tiles/tileGrass.png",
    extras: [
      {
        src: "/tiles/rockRing.png",
        height: "76px",
        width: "65px",
        top: "-5px",
        left: "0",
      },
    ],
  },
  di: {
    src: "/tiles/tileMagic.png",
    extras: [],
  },
};
