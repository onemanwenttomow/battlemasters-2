import { Card, Cube, Offset, PlayingCards, Tiles } from "types";
import { board } from "./board";

export function generateDice(num: number) {
  return [...Array.from(Array(num))].map((x, i) => ({
    id: i,
    value: generateRandomNumber(6),
  }));
}

function generateRandomNumber(max: number, min = 1) {
  return Math.floor(max * Math.random()) + min;
}

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

const evenrDirectionDifferences: Offset[][] = [
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

export function findNeighbours(x: number, row: number, card: Card) {
  return hexReachable([x, row], card.moves);
}

export function findAttackZone(x: number, y: number, range: number) {
  return possibleAttackRadius([x, y], range);
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
  const y = cube.r;
  const x = cube.q + (cube.r + (cube.r & 1)) / 2;
  return [x, y];
}

export function cubeDistance(a: Cube, b: Cube) {
  return Math.max(
    Math.abs(a.q - b.q),
    Math.abs(a.r - b.r),
    Math.abs(a.s - b.s)
  );
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function cubeLerp(a: Cube, b: Cube, t: number) {
  return { q: lerp(a.q, b.q, t), r: lerp(a.r, b.r, t), s: lerp(a.s, b.s, t) };
}

export function cubeLinedraw(a: Cube, b: Cube) {
  const N = cubeDistance(a, b);
  const results = [];
  for (let i = 0; i <= N; i++) {
    results.push(cubeRound(cubeLerp(a, b, (1.0 / N) * i)));
  }
  return results;
}

function cubeRound(frac: Cube) {
  let q = Math.round(frac.q);
  let r = Math.round(frac.r);
  let s = Math.round(frac.s);

  const q_diff = Math.abs(q - frac.q);
  const r_diff = Math.abs(r - frac.r);
  const s_diff = Math.abs(s - frac.s);

  if (q_diff > r_diff && q_diff > s_diff) {
    q = -r - s;
  } else if (r_diff > s_diff) {
    r = -q - s;
  } else {
    s = -q - r;
  }
  return {
    q,
    r,
    s,
  };
}

function hexReachable(start: Offset, movement: number) {
  const visited: Offset[] = []; // set of hexes
  const fringes: Offset[][] = []; // array of arrays of hexes
  fringes.push([start]);

  for (let k = 1; k <= movement; k++) {
    fringes.push([]);
    fringes[k - 1].forEach(function (hex) {
      for (let dir = 0; dir < 6; dir++) {
        const neighbour = hexNeighbour(hex, dir);
        if (
          !visited.some(
            (el) => el[0] === neighbour[0] && el[1] === neighbour[1]
          ) &&
          !isBlocked(neighbour)
        ) {
          visited.push(neighbour);
          fringes[k].push(neighbour);
        }
      }
    });
  }

  return visited.filter((el) => el[0] !== start[0] || el[1] !== start[1]);
}

function possibleAttackRadius(start: Offset, movement: number) {
  const visited: Offset[] = []; // set of hexes
  const fringes: Offset[][] = []; // array of arrays of hexes
  fringes.push([start]);

  for (let k = 1; k <= movement; k++) {
    fringes.push([]);
    fringes[k - 1].forEach(function (hex) {
      for (let dir = 0; dir < 6; dir++) {
        const neighbour = hexNeighbour(hex, dir);
        if (
          !visited.some(
            (el) => el[0] === neighbour[0] && el[1] === neighbour[1]
          )
        ) {
          visited.push(neighbour);
          fringes[k].push(neighbour);
        }
      }
    });
  }

  return visited.filter((el) => el[0] !== start[0] || el[1] !== start[1]);
}

function isBlocked(neighbour: Offset) {
  const boardTile = board[neighbour[1]] && board[neighbour[1]][neighbour[0]];
  return (
    boardTile === undefined || boardTile === "swamp" || boardTile === "river"
  );
}

function hexNeighbour(hex: Offset, dir: number) {
  // check if cube is on or even, then find the neighbour
  const idx = hex[1] % 2 == 0 ? 0 : 1;
  const neighbour = evenrDirectionDifferences[idx][dir];
  return [neighbour[0] + hex[0], neighbour[1] + hex[1]] as Offset;
}
