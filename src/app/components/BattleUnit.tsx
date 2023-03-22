import Image from "next/image";
import { useState } from "react";
import { DiceInterface, Unit } from "types";
import Dice from "./Dice";

const TIME = 110;

interface Props {
  unit: Unit;
  dice: DiceInterface[];
}

export default function BattleUnit({ unit, dice }: Props) {
  const [rolled, setRolled] = useState<number[]>([]);

  function handleDiceClick(i: number) {
    setRolled((prevState) => [...prevState, i]);
  }

  function rollAll() {
    dice.forEach((_, i) =>
      setTimeout(() => setRolled((prevState) => [...prevState, i]), TIME * i)
    );
  }
  return (
    <div className="bg-white p-4 w-60">
      <h3>{unit.name}</h3>
      <Image src={unit.src} alt={unit.alt} height="50" width="50" />
      <p>
        Damage:{" "}
        {[...Array.from(Array(unit.damageSustained))]
          .map((_el, i) => i)
          .map((damage) => (
            <Image
              key={damage}
              className="inline"
              src="/extra-tiles/damage.png"
              alt="damage"
              height="25"
              width="25"
            />
          ))}
      </p>
      <div className="my-2">
        <button type="button" className="block" onClick={rollAll}>
          Roll All
        </button>
        {dice.map(({ id, value }, i) => (
          <div key={id} className="inline mx-4">
            <Dice
              show={value}
              rolled={rolled.includes(i)}
              handleDiceClick={handleDiceClick}
              i={i}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
