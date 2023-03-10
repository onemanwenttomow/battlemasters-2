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
    <div className="absolute inset-0 bg-slate-500 z-10">
      <h2>Battle</h2>

      <BattleUnit unit={attackingUnit} dice={attackingDice} />
      <BattleUnit unit={defendingUnit} dice={defendingDice} />

      <button onClick={() => endBattle(attackingUnit.id, defendingUnit.id)}>
        End Battle
      </button>
    </div>
  );
}
