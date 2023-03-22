import useStore from "hooks/useStore";
import { filterDefeatedUnits } from "lib/utils";
import Image from "next/image";

export default function DefeatedUnits() {
  const { units } = useStore((store) => store);

  const defeatedUnits = units.filter((unit) => !filterDefeatedUnits(unit));
  const defeatedImperial = defeatedUnits.filter(
    (unit) => unit.army === "Imperial"
  );
  const defeatedChaos = defeatedUnits.filter((unit) => unit.army === "Chaos");

  return (
    <div>
      <h2>Defeated Imperial</h2>
      <div className="flex">
        {defeatedImperial.map((unit) => (
          <Image
            key={unit.id}
            src={unit.src}
            alt={unit.id}
            width="32"
            height="32"
          />
        ))}
      </div>
      <h2>Defeated Chaos</h2>
      <div className="flex">
        {defeatedChaos.map((unit) => (
          <Image
            key={unit.id}
            src={unit.src}
            alt={unit.id}
            width="32"
            height="32"
          />
        ))}
      </div>
    </div>
  );
}
