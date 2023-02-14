import Image from "next/image";
import { Dice, Unit } from "types";

export default function BattleUnit({ unit, dice }: {unit: Unit, dice: Dice[]}) {
  return (
    <div>
      <h3>{unit.name} (Attacker)</h3>
      <Image src={unit.src} alt={unit.alt} height="50" width="50" />
      <p>Damage: {unit.damageSustained}</p>
      <div>
        {dice.map(({id, value}) => (
          <div key={id}>DICE: { value }</div>
        ))}
      </div>
    </div>
  );
}
