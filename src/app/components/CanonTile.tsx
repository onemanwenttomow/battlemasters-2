import Image from "next/image";
import { CanonTile } from "types";
import useStore from "hooks/useStore";

interface Props {
  canonTile: CanonTile;
}

export default function CanonTileImage({ canonTile }: Props) {
  const { canonTileReveal } = useStore((state) => state);
  let { isTarget, src } = canonTile;
  const isBack = !canonTile.revealed;

  if (isTarget && !isBack) {
    src = "/canon-cards/canon-explosion.png";
  }

  if (isBack && !isTarget) {
    return (
      <div
        className="absolute top-4 left-4 h-8 w-8 cursor-pointer rounded-full bg-gray-800 brightness-125"
        onClick={() => canonTileReveal(canonTile)}
      ></div>
    );
  }

  return (
    <Image
      src={src}
      alt="canon tile"
      height="32"
      width="32"
      className="absolute top-4 left-4 cursor-pointer rounded-full brightness-125"
      onClick={() => canonTile?.isTarget && canonTileReveal(canonTile)}
      priority
    />
  );
}
