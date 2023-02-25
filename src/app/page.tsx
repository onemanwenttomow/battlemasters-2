"use client";
import Battle from "./components/Battle";
import Board from "./components/Board";
import Cards from "./components/Cards";
import CurrentTurn from "./components/CurrentTurn";
import useGameStore from "hooks/useStore";
import OgreCards from "./components/OgreCards";
import { Campaign } from "types";

const campaigns: Campaign[] = [
  { title: "Battle of the Borderlands", id: "battle-of-the-borderlands" },
  { title: "Battle of the river Tengin", id: "battle-of-the-river-tengin" },
];

export default function Home() {
  const { battleInProgress, setCampaign } = useGameStore((store) => store);

  return (
    <main className="p-4 grid grid-cols-[_1fr_1fr]">
      <Board />
      <div className="relative">
        {battleInProgress && <Battle />}
        <Cards />
        <CurrentTurn />
        <OgreCards />
        <div>
          <h2>Campaigns</h2>
          <ul>
            {campaigns.map((campaign) => (
              <li key={campaign.id} onClick={() => setCampaign(campaign.id)}>
                {campaign.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
