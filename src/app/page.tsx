"use client";
import Image from "next/image";
import useGameStore from "hooks/useStore";
import Battle from "./components/Battle";
import Board from "./components/Board";
import Cards from "./components/Cards";
import CurrentTurn from "./components/CurrentTurn";
import OgreCards from "./components/OgreCards";
import CampaignSelection from "./components/CampaignSelection";
import UnitsNotOnBoard from "./components/UnitsNotOnBoard";
import DefeatedUnits from "./components/DefeatedUnits";

export default function Home() {
  const { battleInProgress, board } = useGameStore((store) => store);

  return (
    <>
      {battleInProgress && <Battle />}
      {!!board.length ? <Board /> : <CampaignSelection />}
      <div
        className="relative col-start-2 row-start-1 row-end-2 bg-white bg-opacity-0"
        style={{ height: "685px" }}
      >
        {!!board.length ? (
          <div
            className={`${
              battleInProgress ? "" : "squiggle"
            } relative z-10 h-full`}
          >
            <Cards />
            <div
              className="x-4 grid grid-cols-[_1fr_150px] overflow-auto text-xs"
              style={{ height: "425px" }}
            >
              <div>
                <CurrentTurn />
                <UnitsNotOnBoard />
              </div>
              <DefeatedUnits />
            </div>
            <OgreCards />
          </div>
        ) : (
          <>
            <Image
              src="/battle.jpeg"
              alt="battle"
              className="object-cover"
              fill
              priority
              sizes="(max-width: 400px) 100vw,"
            />
          </>
        )}
      </div>
    </>
  );
}
