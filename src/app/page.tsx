"use client";
import Battle from "./components/Battle";
import Board from "./components/Board";
import Cards from "./components/Cards";
import CurrentTurn from "./components/CurrentTurn";
import useGameStore from "hooks/useStore";
import OgreCards from "./components/OgreCards";
import CampaignSelection from "./components/CampaignSelection";
import Image from "next/image";

export default function Home() {
  const { battleInProgress, units, board } = useGameStore((store) => store);

  const allUnitsOnBoard = units.every((unit) => unit.x && unit.y);
  // display units on not on board
  const unitsNotOnBoard = units.filter((unit) => !unit.x && !unit.y);
  const chaosUnitsNotOnBoard = unitsNotOnBoard.filter(
    (unit) => unit.army === "Chaos"
  );
  const imperialUnitsNotOnBoard = unitsNotOnBoard.filter(
    (unit) => unit.army === "Imperial"
  );

  return (
    <main className="p-4 grid grid-cols-[_1fr_1fr]">
      {!!board.length ? <Board /> : <CampaignSelection />}
      <div className="relative">
        {battleInProgress && <Battle />}
        <Cards />
        <CurrentTurn />
        <OgreCards />
        <h2>All units on board: {allUnitsOnBoard.toString()}</h2>
        {!!board.length && (
          <>
            <h3>Chaos units not on board</h3>
            <div className="flex flex-wrap">
              {chaosUnitsNotOnBoard.map((unit) => (
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
        )}
      </div>
    </main>
  );
}
