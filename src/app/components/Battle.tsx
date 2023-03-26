import Image from "next/image";
import { Unit } from "types";
import useStore from "../../../hooks/useStore";
import BattleUnit from "./BattleUnit";
import Dice from "./Dice";

export default function Battle() {
  const attackingUnit = useStore((state) =>
    state.units.find((unit) => unit.id === state.attackingUnitId)
  ) as Unit;
  const defendingUnit = useStore((state) =>
    state.units.find((unit) => unit.id === state.defendingUnitId)
  ) as Unit;
  const { endBattle, attackingDice, defendingDice } = useStore(
    (state) => state
  );

  return (
    <div
      className="absolute inset-0 top-12 left-1/2 z-20 grid grid-cols-[_1fr_1fr] bg-white bg-opacity-90"
      style={{
        height: "760px",
        width: "1316px",
        transform: "translateX(-50%)",
      }}
    >
      <div className="flex items-center justify-center">
        <div>
          <h2 className="mb-4 text-center text-5xl">Battle</h2>

          <div className="flex gap-4">
            <BattleUnit unit={attackingUnit} dice={attackingDice} />
            <div className="flex items-center text-5xl">VS</div>
            <BattleUnit unit={defendingUnit} dice={defendingDice} />
          </div>

          <button onClick={() => endBattle(attackingUnit.id, defendingUnit.id)}>
            End Battle
          </button>
        </div>
      </div>
      <div className="relative">
        <Image
          src="/battle_tower.jpeg"
          alt="battle image"
          className="object-cover"
          fill
        />
      </div>
    </div>
  );
}
