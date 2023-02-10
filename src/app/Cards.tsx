import { useState } from "react";
import Image from "next/image";
import useStore from "hooks/useStore";

export default function Cards() {
  const [cardsShuffled, setCardsShuffled] = useState(false);

  const { shufflePlayingCards, drawNextCard, playedCards, activeUnits } =
      useStore((store) => store);
  const currentCard = useStore((store) => store.playingCards[0]);

  function handleClick() {
    if (cardsShuffled) {
      return drawNextCard();
    }
    shufflePlayingCards();
    setCardsShuffled(true);
  }

  console.log(activeUnits)

  return (
    <div>
      <div className="flex items-start">
        <Image
          src="/cards/card-back.png"
          alt="back of card"
          width="200"
          height="130"
          onClick={handleClick}
          priority
        />
        {cardsShuffled && (
          <Image
            src={currentCard.img}
            alt="card"
            width="200"
            height="130"
          />
        )}
      </div>
      <div className="flex overflow-auto w-96 m-2 bg-gray-200" style={{minHeight: "52px"}}>
        {playedCards.slice().reverse().map(card => (<Image key={Math.random()} src={card.img} width="80" height="52" alt="card.id" />))}
      </div>
    </div>
  );
}
