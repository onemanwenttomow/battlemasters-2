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

interface TileExtrasDetails {
  src: string;
  height: string;
  width: string;
  top: string;
  left: string;
  scale: number;
}

interface TileDetails {
  src: string;
  type: string;
  extras: TileExtrasDetails[];
}

type TilesDictionary = Record<Tile, TileDetails>;

export const tilesDictionary: TilesDictionary = {
  ri: {
    type: "river",
    src: "/tiles/tileWater.png",
    extras: [
      {
        src: "/tiles/waveWater.png",
        height: "10px",
        width: "33px",
        top: "30px",
        left: "10px",
        scale: 1,
      },
    ],
  },
  g: {
    type: "grass",
    src: "/tiles/tileGrass.png",
    extras: [],
  },
  ro: {
    type: "road",
    src: "/tiles/tileDirt.png",
    extras: [],
  },
  sw: {
    src: "/tiles/tileGrass.png",
    type: "swamp",
    extras: [
      {
        src: "/tiles/bushDirt.png",
        width: "15px",
        height: "20px",
        top: "30px",
        left: "30px",
        scale: 1,
      },
      {
        src: "/tiles/bushGrass.png",
        width: "15px",
        height: "20px",
        top: "0px",
        left: "25px",
        scale: 1,
      },
      {
        src: "/tiles/bushDirt.png",
        width: "15px",
        height: "20px",
        top: "10px",
        left: "10px",
        scale: 1,
      },
      {
        src: "/tiles/bushGrass.png",
        width: "15px",
        height: "20px",
        top: "30px",
        left: "15px",
        scale: 1,
      },
      {
        src: "/tiles/bushDirt.png",
        width: "15px",
        height: "20px",
        top: "10px",
        left: "40px",
        scale: 1,
      },
      {
        src: "/tiles/bushDirt.png",
        width: "15px",
        height: "20px",
        top: "40px",
        left: "10px",
        scale: 1,
      },
      {
        src: "/tiles/bushGrass.png",
        width: "15px",
        height: "20px",
        top: "40px",
        left: "45px",
        scale: 1,
      },
    ],
  },
  to: {
    type: "tower",
    src: "/tiles/tileGrass.png",
    extras: [
      {
        src: "/tiles/rockRing.png",
        height: "76px",
        width: "65px",
        top: "-2px",
        left: "0",
        scale: 0.8,
      },
    ],
  },
  di: {
    type: "ditch",
    src: "/tiles/tileMagic.png",
    extras: [],
  },
};
