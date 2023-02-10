import Image from "next/image";
import { Unit } from "../../types";
import useStore from "../../hooks/useStore";
import { findNeighbours } from "lib/utils";

interface Props {
  x: number;
  y: number;
}

export default function UnitImage({ x, y }: Props) {
  const { getUnitByCoords, gameStarted, setPossibleMoves } = useStore(
      (state) => state
  );
  const activeCard = useStore((store) => store.playingCards[0]);
  const unit = getUnitByCoords(x, y) as Unit;
  const isActive = gameStarted && activeCard?.ids.includes(unit.id);

  function handleClick() {
    console.log(unit);
    if (!isActive) return;
    const possibleMoves = findNeighbours(x, y, activeCard);
    setPossibleMoves(possibleMoves);
  }


  return (
    <Image
      src={unit.src || "/error.png"}
      alt={unit.alt || "/error.png"}
      className={`unit-shadow mx-auto top-5 relative border border-1 border-gray-700 ${isActive && "animate-bounce"}`}
      width="32"
      height="32"
      onClick={handleClick}
    />
  );
}
