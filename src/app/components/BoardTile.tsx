import { ReactNode } from "react";
import { motion } from "framer-motion";

import { tilesDictionary } from "lib/board";
import { Tile } from "types";

interface Props {
  handleClick: (x: number, y: number) => void;
  x: number;
  y: number;
  brightness: string;
  tile: Tile;
}

export default function BoardTile({
  handleClick,
  brightness,
  tile,
  x,
  y,
}: Props) {
  const tileDetails = tilesDictionary[tile];
  return (
    <motion.div
      animate={{ filter: `brightness(${Number(brightness)})` }}
      transition={{
        duration: Number(brightness) === 1 ? 0 : 0.3,
        delay: Number(brightness) > 1 ? 0 : 0.3,
      }}
      className="hexagon relative h-full bg-no-repeat"
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
    </motion.div>
  );
}
