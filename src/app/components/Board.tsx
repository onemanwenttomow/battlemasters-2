"use client";

import useStore from "hooks/useStore";
import Unit from "./Unit";
import CanonTileImage from "./CanonTile";
import CanonMisfire from "./CanonMisfire";
import BoardTile from "./BoardTile";
import { filterDefeatedUnits } from "lib/utils";

export default function Board() {
  const {
    moveUnit,
    units,
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

  function getBrightness(attack: boolean) {
    if (attack) {
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
      className="row-start-2 grid list-none grid-cols-[repeat(27,_32.5px)] grid-rows-[repeat(14,_22.25px_44.5px)+22.25px] gap-[0.15rem] gap-y-1.5	"
      style={{ width: "905px" }}
    >
      {board.map((row, y) =>
        row.map((tile, x) => {
          const attack = isPossibleAttack(x, y);
          const brightness = getBrightness(attack);
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
              ></BoardTile>
            </li>
          );
        })
      )}
      {units.filter(filterDefeatedUnits).map((unit) => (
        <Unit key={unit.id} unit={unit} />
      ))}
      {possibleMoves.map(([x, y]) => (
        <div
          key={x.toString() + y.toString()}
          className="target pointer-events-none relative top-5 col-span-2 row-span-3 mx-auto animate-pulse"
          style={{
            gridColumnStart:
              (y || 0) % 2 === 0 ? (x || 0) * 2 + 2 : (x || 0) * 2 + 1,
            gridRowStart: (y || 0) * 2 + 1,
            transform: `translateY(-${y * 23.25}px)`,
          }}
        ></div>
      ))}
      {board.map((row, y) =>
        row.map((_, x) => {
          const canonTile = isCanonTile(x, y);
          const canonMisTile = isCanonMisfire(x, y);
          if (!canonTile && !canonMisTile) {
            return null;
          }
          return (
            <div
              key={y + x + _}
              className="col-span-2 row-span-3"
              style={{
                gridColumnStart: y % 2 === 0 ? x * 2 + 2 : x * 2 + 1,
                gridRowStart: y * 2 + 1,
                transform: `translateY(-${y * 22.25}px)`,
              }}
            >
              {canonTile && <CanonTileImage canonTile={canonTile} />}
              {canonMisTile && <CanonMisfire />}
            </div>
          );
        })
      )}
    </ul>
  );
}
