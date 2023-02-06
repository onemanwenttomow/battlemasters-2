import Image from "next/image";
import cards from "../../lib/cards.json";

export default function Cards() {
  console.log('cards: ', cards[0]);
  return (
    <div>
      <Image
        src="/cards/card-back.png"
        alt="back of card"
        width="400"
        height="260"
      />
      <Image
        src={cards[0].img}
        alt="card"
        width="400"
        height="260"
      />
    </div>
  );
}