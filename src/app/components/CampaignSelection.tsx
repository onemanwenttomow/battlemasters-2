import useGameStore from "hooks/useStore";
import { Campaign } from "types";

const campaigns: Campaign[] = [
  { title: "Battle of the Borderlands", id: "battle-of-the-borderlands" },
  { title: "Battle of the River Tengin", id: "battle-of-the-river-tengin" },
];

export default function CampaignSelection() {
  const { setCampaign } = useGameStore((store) => store);

  return (
    <div>
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
