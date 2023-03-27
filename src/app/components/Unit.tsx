import Image from "next/image";
import { motion } from "framer-motion";

import { Unit } from "../../../types";
import useStore from "../../../hooks/useStore";
import { useState } from "react";

interface Props {
  unit: Unit;
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
    y: 5,
    opacity: 1,
  },
};

export default function UnitImage({ unit }: Props) {
  const [showDamage, setShowDamage] = useState(false);

  const {
    setActiveUnit,
    startBattle,
    startCanonBattle,
    gameStarted,
    activeUnit,
    units,
    possibleAttacks,
  } = useStore((state) => state);

  const activeCard = useStore((store) => store.playedCards[0]);
  const isActive = gameStarted && activeCard?.ids.includes(unit.id);
  const attackingUnit = units.find((unit) => unit.id === activeUnit) as Unit;
  const canBeAttacked =
    possibleAttacks.find(
      (coord) => coord[0] === unit.x && coord[1] === unit.y
    ) && attackingUnit?.army !== unit.army;
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
    <motion.div
      layout
      transition={{
        type: "spring",
        stiffness: 350,
        damping: 25,
      }}
      style={{
        cursor: `${isActive ? "pointer" : "auto"}`,
        gridColumnStart:
          (unit.y || 0) % 2 === 0
            ? (unit.x || 0) * 2 + 2
            : (unit.x || 0) * 2 + 1,
        gridRowStart: (unit.y || 0) * 2 + 1,
      }}
      className={`
        relative top-5 col-span-2 row-span-3 mx-auto 
        ${isActive && !turnComplete && "animate-bounce"}
        ${unit.id === activeUnit ? "brightness-150" : "brightness-100"} 
      `}
    >
      <Image
        src={unit.src || "/error.png"}
        alt={unit.alt || "/error.png"}
        width="32"
        height="32"
        onClick={handleClick}
        onMouseOver={() => setShowDamage(true)}
        onMouseOut={() => setShowDamage(false)}
        className={`unit-shadow border-1 border border-gray-700`}
        style={{
          transform: `translateY(-${(unit.y || 0) * 22.5}px)`,
        }}
      />
      {canBeAttacked && (
        <div
          className="absolute top-3 left-3 grid h-6 w-6 cursor-pointer place-content-center bg-red-500"
          onClick={handleBattleClick}
          onMouseEnter={handleMouseEnter}
          style={{
            transform: `translateY(-${(unit.y || 0) * 22.5}px)`,
          }}
        >
          ⚔️
        </div>
      )}
      {showDamage && unit.damageSustained > 0 && (
        <motion.div
          className="absolute -top-8 left-0 flex w-full justify-center"
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
                  style={{
                    transform: `translateY(-${(unit.y || 0) * 22.5}px)`,
                  }}
                />
              </motion.div>
            ))}
        </motion.div>
      )}
    </motion.div>
  );
}
