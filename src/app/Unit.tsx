import Image from "next/image";
import { Unit } from "../../types";
import useStore from "../../hooks/useStore";

interface Props {
  x: number;
  y: number;
}

export default function UnitImage({ x, y }: Props) {
  const { getUnitByCoords, gameStarted } = useStore((state) => state);
  const activeCard = useStore((store) => store.playingCards[0]);

  const unit = getUnitByCoords(x, y) as Unit;
  function handleClick() {
    console.log(unit);
  }


  return (
    <Image
      src={unit.src || "/error.png"}
      alt={unit.alt || "/error.png"}
      className={`unit-shadow mx-auto top-5 relative border border-1 border-gray-700 
          ${gameStarted && activeCard?.ids.includes(unit.id) && 'animate-bounce'}`}
      width="32"
      height="32"
      onClick={handleClick}
    />
  );
}
