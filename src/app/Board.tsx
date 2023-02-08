"use client";

import { board, tilesDictionary } from "lib/board";
import { Tiles } from "types";
import useStore from "hooks/useStore";
import Unit from "./Unit";

export default function Board() {
  const tileHasUnit = useStore((state) => state.tileHasUnit);

  function handleClick(tile: Tiles) {
    console.log(tile);
  }
  return (
    <ul
      className="grid gap-[0.15rem] grid-cols-[repeat(27,_32.5px)] grid-rows-[repeat(14,_22.25px_44.5px)+22.25px] list-none"
      style={{ height: "600px" }}
    >
      {board.map((row, y) =>
        row.map((tile, x) => (
          <li
            key={y + x + tile}
            className="col-span-2 row-span-3"
            style={{
              gridColumnStart: y % 2 === 0 ? x * 2 + 2 : x * 2 + 1,
              gridRowStart: y * 2 + 1,
              transform: `translateY(-${y * 22.25}px)`,
            }}
          >
            <div
              className={`h-full hexagon bg-no-repeat`}
              style={{
                backgroundImage: tilesDictionary[tile],
              }}
              onClick={() => handleClick(tile)}
            >
              {tileHasUnit(x, y) && <Unit x={x} y={y} />}
            </div>
          </li>
        ))
      )}
    </ul>
  );
}
