import useGameStore from "hooks/useStore";
import Link from "next/link";
import { Campaign } from "types";
import MainWrapper from "./MainWrapper";

const campaigns: Campaign[] = [
  { title: "Battle of the Borderlands", id: "battle-of-the-borderlands" },
  { title: "Battle of the River Tengin", id: "battle-of-the-river-tengin" },
  {
    title: "Battle on the Road to Grunberg",
    id: "battle-on-the-road-to-grunberg",
  },
  {
    title: "Battle of the Plains",
    id: "battle-of-the-plains",
  },
  {
    title: "Battle of Altdorf",
    id: "battle-of-altdorf",
  },
];

export default function CampaignSelection() {
  const { setCampaign } = useGameStore((store) => store);

  return (
    <MainWrapper>
      <h2 className="text-4xl">Campaigns</h2>
      <ul>
        {campaigns.map((campaign) => (
          <li
            key={campaign.id}
            className="mt-4 cursor-pointer text-2xl"
            onClick={() => setCampaign(campaign.id)}
          >
            {campaign.title}
          </li>
        ))}
      </ul>
    </MainWrapper>
  );
}
