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

import bg from "../../public/background_map.jpeg";
import Image from "next/image";

export default function Home() {
  const { battleInProgress, board } = useGameStore((store) => store);

  return (
    <main
      className="relative p-4 pt-12 grid grid-cols-[_915px_400px] justify-center"
      style={{
        backgroundImage: `linear-gradient(black, black), url(${bg.src})`,
        width: "100%",
        height: "100%",
        backgroundSize: "cover",
        backgroundBlendMode: "soft-light",
      }}
    >
      {battleInProgress && <Battle />}
      {!!board.length ? <Board /> : <CampaignSelection />}
      <div
        className="relative bg-white bg-opacity-70 overflow-auto"
        style={{ height: "635px" }}
      >
        {!!board.length ? (
          <>
            <Cards />
            <OgreCards />
            <div className="p-4">
              <CurrentTurn />
              <UnitsNotOnBoard />
              <DefeatedUnits />
            </div>
          </>
        ) : (
          <>
            <Image
              src="/battle.jpeg"
              alt="battle"
              className="object-cover"
              fill
            />
          </>
        )}
      </div>
    </main>
  );
}
