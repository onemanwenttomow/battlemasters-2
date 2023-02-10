import { Cube, PlayingCards, Tiles } from "types";
import { board } from "./board";

export function shuffle(array: PlayingCards) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

const evenrDirectionDifferences = [
  // even rows
  [
    [+1, 0],
    [+1, -1],
    [0, -1],
    [-1, 0],
    [0, +1],
    [+1, +1],
  ],
  // odd rows
  [
    [+1, 0],
    [0, -1],
    [-1, -1],
    [-1, 0],
    [-1, +1],
    [0, +1],
  ],
];

export function findNeighbours(x: number, row: number) {
  // check if odd or even row https://www.redblobgames.com/grids/hexagons/#neighbors-offset
  const idx = row % 2 == 0 ? 0 : 1;
  let neighbours = evenrDirectionDifferences[idx].map((el) => [
    el[0] + x,
    el[1] + row,
  ]);

  // find spaces 2 away
  // first convert offset to cube
  const tileAsCube = offsetToCube(x, row);
  // then convert all board tile offset to cube.
  const boardAsOffset = board
    .map((row, y) => row.map((_tile, x) => offsetToCube(x, y)))
    .flat();
  // then filter where cubeDistance is 2
  // convert back to offset coordinates
  const twoSpacesAway = boardAsOffset
    .filter((cube) => cubeDistance(cube, tileAsCube) === 2)
    .map((cube) => cubeToOffset(cube));
  console.log("twoSpacesAway", twoSpacesAway);
  // neighbours.push(twoSpacesAway);
  neighbours = [...neighbours, ...twoSpacesAway];

  // check if any neighbours are tiles you cant move to (i.e. water or marsh) and filter then out
  return neighbours.filter((neighbour) => {
    const boardTile = board[neighbour[1]] && board[neighbour[1]][neighbour[0]];
    return isValidTile(boardTile) ? neighbour : null;
  });
}

function isValidTile(tile: Tiles) {
  return tile !== undefined && tile !== "swamp" && tile !== "river";
}

// https://www.redblobgames.com/grids/hexagons/#conversions
export function offsetToCube(x: number, y: number) {
  const q = x - (y + (y & 1)) / 2;
  const r = y;
  const s = -q - r;
  return {
    q,
    r,
    s,
  };
}

export function cubeToOffset(cube: Cube) {
  const x = cube.r;
  const y = cube.q + (cube.r + (cube.r & 1)) / 2;
  return [x, y];
}

export function cubeDistance(a: Cube, b: Cube) {
  return Math.max(
    Math.abs(a.q - b.q),
    Math.abs(a.r - b.r),
    Math.abs(a.s - b.s)
  );
}
