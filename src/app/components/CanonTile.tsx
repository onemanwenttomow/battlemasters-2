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
        className="rounded-full absolute h-8 w-8 top-4 left-4 brightness-125 bg-gray-800 cursor-pointer"
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
      className="rounded-full absolute top-4 left-4 brightness-125 cursor-pointer"
      onClick={() => canonTile?.isTarget && canonTileReveal(canonTile)}
      priority
    />
  );
}
