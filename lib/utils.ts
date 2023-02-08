import { PlayingCards } from "types";
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
      array[currentIndex]
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
    [+1, +1]
  ],
  // odd rows
  [
    [+1, 0],
    [0, -1],
    [-1, -1],
    [-1, 0],
    [-1, +1],
    [0, +1]
  ]
];


export function findNeighbours(x: number, row: number) {
  // check if odd or even row https://www.redblobgames.com/grids/hexagons/#neighbors-offset
  const idx = row % 2 == 0 ? 0 : 1;
  let neighbours = evenrDirectionDifferences[idx].map((el) => [
    el[0] + x,
    el[1] + row
  ]);
  // check if any neighbours are tiles you cant move to (i.e. water or marsh)
  neighbours = neighbours.filter((neighbour) => {
    const boardTile = board[neighbour[1]] && board[neighbour[1]][neighbour[0]];
    if (boardTile === undefined || boardTile === "swamp" || boardTile === "river") {
      return null;
    } else {
      return neighbour;
    }
  });
  return neighbours;
}
