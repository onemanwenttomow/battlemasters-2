"use client";
import Battle from "./components/Battle";
import Board from "./components/Board";
import Cards from "./components/Cards";
import CurrentTurn from "./components/CurrentTurn";
import useGameStore from "hooks/useStore";
import OgreCards from "./components/OgreCards";
import CampaignSelection from "./components/CampaignSelection";
import UnitsNotOnBoard from "./components/UnitsNotOnBoard";
import DefeatedUnits from "./components/DefetatedUnits";

export default function Home() {
  const { battleInProgress, board } = useGameStore((store) => store);

  return (
    <main className="p-4 grid grid-cols-[_1fr_1fr]">
      {!!board.length ? <Board /> : <CampaignSelection />}
      <div className="relative">
        {battleInProgress && <Battle />}
        <Cards />
        <CurrentTurn />
        <OgreCards />
        {!!board.length && <UnitsNotOnBoard />}
        <DefeatedUnits />
      </div>
    </main>
  );
}
