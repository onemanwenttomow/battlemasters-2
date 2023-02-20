import Image from "next/image";
import { CanonTile } from "types";
import useStore from "hooks/useStore";

export default function CanonMisfire() {
  const { canonMisfireReveal, canonMisFire } = useStore((state) => state);

  const { revealed, src } = canonMisFire as CanonTile;

  if (!revealed) {
    return (
      <div
        className="rounded-full absolute h-8 w-8 top-4 left-4 brightness-125 bg-gray-800 cursor-pointer"
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
      className="rounded-full absolute top-4 left-4 brightness-125 cursor-pointer"
    />
  );
}
