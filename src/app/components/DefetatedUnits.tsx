import useStore from "hooks/useStore";
import { filterDefeatedUnits } from "lib/utils";

export default function DefeatedUnits() {
  const { units } = useStore((store) => store);

  console.log(units.filter((unit) => !filterDefeatedUnits(unit)));

  return <div>Defeated</div>;
}
