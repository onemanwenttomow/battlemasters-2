"use client";
import Board from "@/app/Board";
import Cards from "./Cards";

export default function Home() {
  return (
    <main className="p-4 grid grid-cols-[_1fr_1fr]">
      <Board />
      <Cards />
    </main>
  );
}
