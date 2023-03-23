"use client";

// import { board } from "lib/board";
import useStore from "hooks/useStore";
import Unit from "./Unit";
import CanonTileImage from "./CanonTile";
import CanonMisfire from "./CanonMisfire";
import BoardTile from "./BoardTile";

export default function Board() {
  const {
    tileHasUnit,
    moveUnit,
    board,
    possibleMoves,
    possibleAttacks,
    canonTiles,
    canonMisFire,
  } = useStore((state) => state);

  function isCanonTile(x: number, y: number) {
    return canonTiles.find(
      (tile) => tile.offset[0] === x && tile.offset[1] === y
    );
  }

  function isCanonMisfire(x: number, y: number) {
    return canonMisFire?.offset[0] === x && canonMisFire?.offset[1] === y;
  }

  function isPossibleMove(x: number, y: number) {
    return possibleMoves.some((el) => el[0] === x && el[1] === y);
  }

  function isPossibleAttack(x: number, y: number) {
    return possibleAttacks.some((el) => el[0] === x && el[1] === y);
  }

  function getBrightness(move: boolean, attack: boolean) {
    if (move) {
      return "1.4";
    } else if (attack) {
      return "0.7";
    }
    return "1";
  }

  function handleClick(x: number, y: number) {
    if (!isPossibleMove(x, y)) return;
    moveUnit(x, y);
  }

  return (
    <ul
      className="grid gap-[0.15rem] grid-cols-[repeat(27,_32.5px)] grid-rows-[repeat(14,_22.25px_44.5px)+22.25px] list-none"
      style={{ height: "630px", width: "905px" }}
    >
      {board.map((row, y) =>
        row.map((tile, x) => {
          const move = isPossibleMove(x, y);
          const attack = isPossibleAttack(x, y);
          const brightness = getBrightness(move, attack);
          const canonTile = isCanonTile(x, y);
          const canonMisTile = isCanonMisfire(x, y);
          return (
            <li
              key={y + x + tile}
              className="col-span-2 row-span-3"
              style={{
                gridColumnStart: y % 2 === 0 ? x * 2 + 2 : x * 2 + 1,
                gridRowStart: y * 2 + 1,
                transform: `translateY(-${y * 22.25}px)`,
                cursor: `${isPossibleMove(x, y) ? "cell" : "auto"}`,
              }}
            >
              <BoardTile
                x={x}
                y={y}
                handleClick={handleClick}
                brightness={brightness}
                tile={tile}
              >
                {tileHasUnit(x, y) && <Unit x={x} y={y} />}
                {canonTile && <CanonTileImage canonTile={canonTile} />}
                {canonMisTile && <CanonMisfire />}
              </BoardTile>
            </li>
          );
        })
      )}
    </ul>
  );
}
