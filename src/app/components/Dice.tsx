import Image from "next/image";
import { dice as diceArray } from "lib/dice";

interface Props {
  show: number;
  rolled: boolean;
  handleDiceClick: (i: number) => void;
  i: number;
}

const sideToShow = ["front", "right", "back", "left", "top", "bottom"];

export default function Dice({ show, rolled, handleDiceClick, i }: Props) {
  return (
    <div
      className={`inline-block ${!rolled && "cursor-pointer"}`}
      style={{ perspective: "150px", height: "50px", width: "50px" }}
      onClick={() => handleDiceClick(i)}
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
        {diceArray.map((die, i) => (
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

function DiceSide({ die, rolled }: { die: Die; rolled: boolean }) {
  return (
    <Image
      className={`dice__face absolute dice__face--${die.side} ${
        !rolled && "grayscale"
      }`}
      src={die.src}
      alt="dice"
      height="50"
      width="50"
    />
  );
}
