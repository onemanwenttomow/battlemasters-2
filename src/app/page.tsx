"use client";
import Board from "./components/Board";
import Cards from "./components/Cards";
import CurrentTurn from "./components/CurrentTurn";

export default function Home() {
  return (
    <main className="p-4 grid grid-cols-[_1fr_1fr]">
      <Board />
      <div>
        <Cards />
        <CurrentTurn />
      </div>
    </main>
  );
}
