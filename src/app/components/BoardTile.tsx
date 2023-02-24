import { ReactNode } from "react";
import { tilesDictionary } from "lib/board";
import { Tile } from "types";

interface Props {
  children: ReactNode;
  handleClick: (x: number, y: number) => void;
  x: number;
  y: number;
  brightness: string;
  tile: Tile;
}

export default function BoardTile({
  children,
  handleClick,
  brightness,
  tile,
  x,
  y,
}: Props) {
  const tileDetails = tilesDictionary[tile];
  return (
    <div
      className="h-full hexagon bg-no-repeat relative"
      style={{
        backgroundImage: `url(${tileDetails.src})`,
        filter: `brightness(${brightness})`,
      }}
      onClick={() => handleClick(x, y)}
    >
      {tileDetails.extras.map((extra, i) => (
        <div
          key={i}
          className="absolute top-4"
          style={{
            backgroundImage: `url(${extra.src})`,
            width: extra.width,
            height: extra.height,
            top: extra.top,
            left: extra.left,
            transform: `scale(${extra.scale})`,
          }}
        ></div>
      ))}
      {children}
    </div>
  );
}
