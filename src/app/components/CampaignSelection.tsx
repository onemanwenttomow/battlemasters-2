import useGameStore from "hooks/useStore";
import Link from "next/link";
import { Campaign } from "types";

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
    <div className="bg-white bg-opacity-70" style={{ height: "635px" }}>
      <Link href="/about">About</Link>
      <h2>Campaigns</h2>
      <ul>
        {campaigns.map((campaign) => (
          <li
            key={campaign.id}
            className="cursor-pointer text-4xl mt-4"
            onClick={() => setCampaign(campaign.id)}
          >
            {campaign.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
