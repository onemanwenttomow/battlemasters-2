"use client";
import Battle from "./components/Battle";
import Board from "./components/Board";
import Cards from "./components/Cards";
import CurrentTurn from "./components/CurrentTurn";
import useGameStore from "hooks/useStore";
import OgreCards from "./components/OgreCards";

export default function Home() {
  const { battleInProgress, ogreCards } = useGameStore((store) => store);

  return (
    <main className="p-4 grid grid-cols-[_1fr_1fr]">
      <Board />
      <div className="relative">
        {battleInProgress && <Battle />}
        <Cards />
        <CurrentTurn />
        <OgreCards />
      </div>
    </main>
  );
}
