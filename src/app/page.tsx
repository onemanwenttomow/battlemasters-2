"use client";
import Battle from "./components/Battle";
import Board from "./components/Board";
import Cards from "./components/Cards";
import CurrentTurn from "./components/CurrentTurn";
import useGameStore from "hooks/useStore";

export default function Home() {
  const { battleInProgress } = useGameStore((store) => store);

  return (
    <main className="p-4 grid grid-cols-[_1fr_1fr]">
      <Board />
      <div className="relative">
        {battleInProgress && <Battle />}
        <Cards />
        <CurrentTurn />
      </div>
    </main>
  );
}
