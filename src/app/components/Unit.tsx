import Image from "next/image";
import { Unit } from "../../../types";
import useStore from "../../../hooks/useStore";
import { useState } from "react";

interface Props {
  x: number;
  y: number;
}

export default function UnitImage({ x, y }: Props) {
  const [showDamage, setShowDamage] = useState(false);

  const {
    getUnitByCoords,
    setActiveUnit,
    startBattle,
    startCanonBattle,
    gameStarted,
    activeUnit,
    units,
    possibleAttacks,
  } = useStore((state) => state);

  const activeCard = useStore((store) => store.playedCards[0]);
  const unit = getUnitByCoords(x, y) as Unit;
  const isActive = gameStarted && activeCard?.ids.includes(unit.id);
  const attackingUnit = units.find((unit) => unit.id === activeUnit) as Unit;
  const canBeAttacked =
    possibleAttacks.find((coord) => coord[0] === x && coord[1] === y) &&
    attackingUnit?.army !== unit.army;
  const turnComplete = unit.hasAttacked && unit.hasAttacked;

  function handleClick() {
    if (!isActive) return;
    setActiveUnit(unit.id);
  }

  function handleBattleClick() {
    if (attackingUnit.id === "canon") {
      return startCanonBattle(unit.id);
    }
    startBattle(attackingUnit.id, unit.id);
  }

  function handleMouseEnter() {
    if (attackingUnit.id === "canon") {
      startCanonBattle(unit.id, true);
    }
  }

  return (
    <>
      <Image
        src={unit.src || "/error.png"}
        alt={unit.alt || "/error.png"}
        className={`unit-shadow mx-auto top-5 relative border border-1 border-gray-700 ${
          isActive && !turnComplete && "animate-bounce"
        }`}
        style={{
          cursor: `${isActive ? "pointer" : "auto"}`,
          filter: `brightness(${unit.id === activeUnit ? "1.4" : "1"})`,
        }}
        width="32"
        height="32"
        onClick={handleClick}
        onMouseOver={() => setShowDamage(true)}
        onMouseOut={() => setShowDamage(false)}
      />
      {canBeAttacked && (
        <div
          className="absolute top-2 left-5 bg-red-500 h-6 w-6 grid place-content-center cursor-pointer"
          onClick={handleBattleClick}
          onMouseEnter={handleMouseEnter}
        >
          ⚔️
        </div>
      )}
      {showDamage && (
        <div className="absolute flex flex-col top-5 left-0">
          {[...Array.from(Array(unit.damageSustained))]
            .map((_el, i) => i)
            .map((damage) => (
              <Image
                key={damage}
                className="inline"
                src="/extra-tiles/damage.png"
                alt="damage"
                height="15"
                width="15"
              />
            ))}
        </div>
      )}
    </>
  );
}
