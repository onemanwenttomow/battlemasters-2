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
      className="absolute inset-0 bg-white bg-opacity-90 z-20 top-12 left-1/2 grid grid-cols-[_1fr_1fr]"
      style={{
        height: "635px",
        width: "1316px",
        transform: "translateX(-50%)",
      }}
    >
      <div className="flex justify-center items-center">
        <div>
          <h2 className="text-5xl mb-4 text-center">Battle</h2>

          <div className="flex gap-4">
            <BattleUnit unit={attackingUnit} dice={attackingDice} />
            <div className="text-5xl flex items-center">VS</div>
            <BattleUnit unit={defendingUnit} dice={defendingDice} />
          </div>

          <button onClick={() => endBattle(attackingUnit.id, defendingUnit.id)}>
            End Battle
          </button>
        </div>
      </div>
      <div className="relative">
        <Image
          src="/knight_background.jpeg"
          alt="battle image"
          className="object-cover"
          fill
        />
      </div>
    </div>
  );
}
