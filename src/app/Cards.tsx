import { useState } from "react";
import Image from "next/image";
import useStore from "hooks/useStore";

export default function Cards() {
  const [cardsShuffled, setCardsShuffled] = useState(false);

  const { shufflePlayingCards, drawNextCard, playedCards } = useStore((store) => store);
  const currentCard = useStore((store) => store.playingCards[0]);

  function handleClick() {
    if (cardsShuffled) {
      return drawNextCard();
    }
    shufflePlayingCards();
    setCardsShuffled(true);
  }

  return (
      <div>
          <Image
              src="/cards/card-back.png"
              alt="back of card"
              width="400"
              height="260"
              onClick={handleClick}
              priority
          />
          {cardsShuffled && (
              <Image
                  src={currentCard.img}
                  alt="card"
                  width="400"
                  height="260"
              />
          )}
      <div>{playedCards.map(card => (<div key={card.img}>{ card.ids.join(",") }</div>))}</div>
      </div>
  );
}
