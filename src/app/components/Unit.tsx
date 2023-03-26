import Image from "next/image";
import { motion } from "framer-motion";

import { Unit } from "../../../types";
import useStore from "../../../hooks/useStore";
import { useState } from "react";

interface Props {
  x: number;
  y: number;
}

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.05,
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

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
        className={`unit-shadow border-1 relative top-5 mx-auto border border-gray-700 ${
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
          className="absolute top-2 left-5 grid h-6 w-6 cursor-pointer place-content-center bg-red-500"
          onClick={handleBattleClick}
          onMouseEnter={handleMouseEnter}
        >
          ⚔️
        </div>
      )}
      {showDamage && (
        <motion.div
          className="absolute top-0 left-0 flex w-full justify-center"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {[...Array.from(Array(unit.damageSustained))]
            .map((_el, i) => i)
            .map((damage) => (
              <motion.div key={damage} variants={item}>
                <Image
                  className="inline"
                  src="/extra-tiles/damage.png"
                  alt="damage"
                  height="15"
                  width="15"
                />
              </motion.div>
            ))}
        </motion.div>
      )}
    </>
  );
}
