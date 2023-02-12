import Image from "next/image";
import { Unit } from "../../types";
import useStore from "../../hooks/useStore";

interface Props {
  x: number;
  y: number;
}

export default function UnitImage({ x, y }: Props) {
  const { getUnitByCoords, gameStarted, setActiveUnit, activeUnit } = useStore(
    (state) => state
  );
  const activeCard = useStore((store) => store.playingCards[0]);
  const unit = getUnitByCoords(x, y) as Unit;
  const isActive = gameStarted && activeCard?.ids.includes(unit.id);

  function handleClick() {
    if (!isActive) return;
    setActiveUnit(unit.id);
  }

  return (
    <Image
      src={unit.src || "/error.png"}
      alt={unit.alt || "/error.png"}
      className={`unit-shadow mx-auto top-5 relative border border-1 border-gray-700 ${
        isActive && "animate-bounce"
      }`}
      style={{
        cursor: `${isActive ? "pointer" : "auto"}`,
        filter: `brightness(${unit.id === activeUnit ? "1.4" : "1"})`,
      }}
      width="32"
      height="32"
      onClick={handleClick}
    />
  );
}
