import Image from "next/image";
import useGameStore from "../../../hooks/useStore";
import { Army, Unit } from "../../../types";

export default function UnitsNotOnBoard() {
  const { units } = useGameStore((store) => store);
  const unitsNotOnBoard = units.filter((unit) => !unit.x && !unit.y);

  return (
    <>
      <ArmyNotOnBoard army="Chaos" unitsNotOnBoard={unitsNotOnBoard} />
      <ArmyNotOnBoard army="Imperial" unitsNotOnBoard={unitsNotOnBoard} />
    </>
  );
}

interface Props {
  army: Army;
  unitsNotOnBoard: Unit[];
}

function ArmyNotOnBoard({ army, unitsNotOnBoard }: Props) {
  const armyNotOnBoard = unitsNotOnBoard.filter((unit) => unit.army === army);

  if (!armyNotOnBoard.length) {
    return null;
  }

  return (
    <>
      <h3>{army} units not on board</h3>
      <div className="flex flex-wrap">
        {armyNotOnBoard.map((unit) => (
          <Image
            key={unit.id}
            src={unit.src}
            alt={unit.id}
            width="32"
            height="32"
            className="cursor-pointer"
          />
        ))}
      </div>
    </>
  );
}
