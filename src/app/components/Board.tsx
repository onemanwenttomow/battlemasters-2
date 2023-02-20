"use client";

import { board, tilesDictionary } from "lib/board";
import { Tiles } from "types";
import useStore from "hooks/useStore";
import Unit from "./Unit";
import CanonTileImage from "./CanonTile";
import Image from "next/image";

export default function Board() {
  const {
    tileHasUnit,
    possibleMoves,
    possibleAttacks,
    canonTiles,
    canonMisFire,
    moveUnit,
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

  function handleClick(tile: Tiles, x: number, y: number) {
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
              <div
                className="h-full hexagon bg-no-repeat relative"
                style={{
                  background: tilesDictionary[tile],
                  filter: `brightness(${brightness})`,
                }}
                onClick={() => handleClick(tile, x, y)}
              >
                {/* <div className="absolute top-4 left-4 text-sm">{`[${x}, ${y}]`}</div> */}
                {tileHasUnit(x, y) && <Unit x={x} y={y} />}
                {canonTile && <CanonTileImage canonTile={canonTile} />}
                {canonMisTile && (
                  <Image
                    src="/canon-cards/canon-explosion.png"
                    alt="canon tile"
                    height="32"
                    width="32"
                    className="rounded-full absolute top-4 left-4 brightness-125 cursor-pointer"
                  />
                )}
              </div>
            </li>
          );
        })
      )}
    </ul>
  );
}
