"use client";

import { board, Tiles, tiles } from "../../lib/board";
import { tileHasUnit } from "../../lib/units";
import Unit from "./Unit";

export default function Home() {
  function handleClick(tile: Tiles) {
    console.log(tile);
  }
  return (
    <ul className="grid grid-cols-[repeat(27,_32.5px)] grid-rows-[repeat(14,_22.25px_44.5px)+22.25px] list-none">
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
              className={`h-full hexagon bg-contain`}
              style={{
                backgroundImage: `url('/tiles/${tiles[tile]}')`,
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
