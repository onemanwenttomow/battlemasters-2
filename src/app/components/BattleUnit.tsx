import Image from "next/image";
import { useState } from "react";
import { Dice, Unit } from "types";
import { dice as diceArray } from "lib/dice";

interface Props {
  unit: Unit;
  dice: Dice[];
}

export default function BattleUnit({ unit, dice }: Props) {
  const [rolled, setRolled] = useState<number[]>([]);
  return (
    <div>
      <h3>{unit.name} (Attacker)</h3>
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
      <div>
        {dice.map(({ id, value }, i) => (
          <div key={id}>
            <button
              className="text-4xl inline cursor-pointer"
              onClick={() => setRolled((prevState) => [...prevState, i])}
            >
              🎲
            </button>
            {rolled.includes(i) && (
              <Image
                className="inline"
                src={diceArray[value - 1]}
                alt="dice"
                height="50"
                width="50"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
