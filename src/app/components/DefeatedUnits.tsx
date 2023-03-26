import useStore from "hooks/useStore";
import { filterDefeatedUnits } from "lib/utils";
import Image from "next/image";

export default function DefeatedUnits() {
  const { units } = useStore((store) => store);
  const defeatedUnits = units.filter((unit) => !filterDefeatedUnits(unit));

  return (
    <div>
      <h2>💀 Defeated Units 💀</h2>
      <div className="flex flex-wrap">
        {defeatedUnits.map((unit) => (
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
