import { Unit } from "types";
import useStore from "../../../hooks/useStore";

export default function Battle() {

  const attackingUnit = useStore(state => state.units.find(unit => unit.id === state.attackingUnitId)) as Unit;
  const defendingUnit = useStore(state => state.units.find(unit => unit.id === state.defendingUnitId)) as Unit;
  const { endBattle } = useStore(state => state);

  return <div className="absolute inset-0 bg-slate-500 z-10">
    <h2>Battle</h2>
    <div>Attacking Unit: { attackingUnit.id}</div>
    <div>Defending Unit: {defendingUnit.id}</div>
    
    <button onClick={endBattle}>End Battle</button>
  </div>;
}
