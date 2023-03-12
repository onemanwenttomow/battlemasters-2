import Image from "next/image";
import { dice as diceArray } from "lib/dice";

const sideToShow = ["front", "right", "back", "left", "top", "bottom"];

export default function Dice({
  show,
  rolled,
}: {
  show: number;
  rolled: boolean;
}) {
  const nonRolledSide = (show - 1 + 5) % 3;
  const mappedDiceArray = diceArray.map((die, i) =>
    i === nonRolledSide ? { ...die, src: "/extra-tiles/blank.png" } : die
  );

  return (
    <div
      className="inline-block"
      style={{ perspective: "150px", height: "50px", width: "50px" }}
    >
      <div
        className={`dice relative ${
          rolled ? `show-${sideToShow[show - 1]}` : "start"
        }`}
        style={{
          transformStyle: "preserve-3d",
          height: "50px",
          width: "50px",
        }}
      >
        {mappedDiceArray.map((die, i) => (
          <DiceSide key={Math.random()} die={die} rolled={rolled} />
        ))}
      </div>
    </div>
  );
}

interface Die {
  src: string;
  side: string;
}

function DiceSide({ die, rolled }: { die: Die, rolled: boolean }) {
  return (
    <Image
      className={`absolute dice__face dice__face--${die.side} ${!rolled && "grayscale"}`}
      src={die.src}
      alt="dice"
      height="50"
      width="50"
    />
  );
}
