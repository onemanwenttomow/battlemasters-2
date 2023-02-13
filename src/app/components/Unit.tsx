import Image from "next/image";
import { Unit } from "../../../types";
import useStore from "../../../hooks/useStore";

interface Props {
  x: number;
  y: number;
}

export default function UnitImage({ x, y }: Props) {
  const {
    getUnitByCoords,
    setActiveUnit,
    gameStarted,
    activeUnit,
    units,
    possibleAttacks,
  } = useStore((state) => state);

  const activeCard = useStore((store) => store.playingCards[0]);
  const unit = getUnitByCoords(x, y) as Unit;
  const isActive = gameStarted && activeCard?.ids.includes(unit.id);
  const attackingUnit = units.find((unit) => unit.id === activeUnit) as Unit;
  const canBeAttacked =
    possibleAttacks.find((coord) => coord[0] === x && coord[1] === y) &&
    attackingUnit.army !== unit.army;

  function handleClick() {
    if (!isActive) return;
    setActiveUnit(unit.id);
  }

  function handleAttack() {
    console.log(`${attackingUnit.id} attacks ${unit.id}`);
  }

  return (
    <>
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
      {canBeAttacked && (
        <div
          className="absolute top-2 left-5 bg-red-500 h-6 w-6 grid place-content-center cursor-pointer"
          onClick={handleAttack}
        >
          ⚔️
        </div>
      )}
    </>
  );
}