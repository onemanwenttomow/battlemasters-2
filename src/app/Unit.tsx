import Image from "next/image";
import { unitAtTile } from "../../lib/units";

interface Props {
  x: number;
  y: number;
}


export default function Unit({ x, y }: Props) {
  const unit = unitAtTile(x, y);
  function handleClick() {
    console.log(unit);
  }

  return (
    <Image
      src={unit?.src || "/error.png"}
      alt={unit?.alt || "/error.png"}
      className="unit-shadow mx-auto top-5 relative border border-1 border-gray-700 "
      width="32"
      height="32"
      onClick={handleClick}
    />
  );
}
