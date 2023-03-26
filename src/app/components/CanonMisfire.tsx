import Image from "next/image";
import { CanonTile } from "types";
import useStore from "hooks/useStore";

export default function CanonMisfire() {
  const { canonMisfireReveal, canonMisFire } = useStore((state) => state);

  const { revealed, src } = canonMisFire as CanonTile;

  if (!revealed) {
    return (
      <div
        className="absolute top-4 left-4 h-8 w-8 cursor-pointer rounded-full bg-gray-800 brightness-125"
        onClick={canonMisfireReveal}
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
    />
  );
}
