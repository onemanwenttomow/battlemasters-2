"use client";
import Board from "@/app/Board";
import Cards from "./Cards";

export default function Home() {
  return (
    <main className="p-4 flex flex-wrap">
      <Board />
      <Cards />
    </main>
  );
}
