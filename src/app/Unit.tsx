import Image from "next/image";
import { unitAtTile } from "../../lib/units";

interface Props {
  x: number;
  y: number;
}
// box-shadow: -3px 3px orange, -2px 2px orange, -1px 1px orange;
// border: 1px solid orange;

export default function Unit({ x, y }: Props) {
  const unit = unitAtTile(x, y);
  function handleClick() {
    console.log(unit);
  }

  return (
    <Image
      src={unit?.src || "/error.png"}
      alt={unit?.alt || "/error.png"}
      className="unit-shadow mx-auto top-4 relative border border-1 border-gray-700 "
      width="32"
      height="32"
      onClick={handleClick}
    />
  );
}
