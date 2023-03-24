import Image from "next/image";
import useGameStore from "../../../hooks/useStore";
import { Army, Unit, UnitId } from "../../../types";

export default function UnitsNotOnBoard() {
  const { units } = useGameStore((store) => store);
  const unitsNotOnBoard = units.filter(
    (unit) => unit.x === null && unit.y === null
  );

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
  const {
    gameStarted,
    canRandomise,
    canPositionPreStart,
    setPreGameActiveUnit,
    randomiseUnits,
  } = useGameStore((store) => store);
  const activeCard = useGameStore((store) => store.playedCards[0]);

  const armyNotOnBoard = unitsNotOnBoard.filter((unit) => unit.army === army);

  function handleClick(id: UnitId, army: Army) {
    // TODO fix bug that allows units to be played before first card draw
    console.log("canPositionPreStart", canPositionPreStart)
    console.log('gameStarted: ',gameStarted);
    // (can only add units to board once cards have been drawn)
    if (!gameStarted && !canPositionPreStart) {
      return;
    }

    if (gameStarted && activeCard?.ids.includes(id)) {
      return setPreGameActiveUnit(id, army);
    }

    setPreGameActiveUnit(id, army);
  }

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
            onClick={() => handleClick(unit.id, army)}
            style={{
              filter: `brightness(${
                gameStarted && activeCard?.ids.includes(unit.id) ? "1.4" : "1"
              })`,
            }}
          />
        ))}
      </div>

      {canRandomise && (
        <button type="button" onClick={() => randomiseUnits(army)}>
          Randomise
        </button>
      )}
    </>
  );
}
