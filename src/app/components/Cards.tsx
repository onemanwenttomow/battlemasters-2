import { useState } from "react";
import Image from "next/image";
import useStore from "hooks/useStore";

export default function Cards() {
  const [cardsShuffled, setCardsShuffled] = useState(false);

  const { shufflePlayingCards, drawNextCard, playedCards } = useStore(
    (store) => store
  );
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
      <div
        className="flex overflow-auto w-96 m-2 bg-gray-200"
        style={{ minHeight: "30px" }}
      >
        {playedCards
          .slice()
          .reverse()
          .map((card) => (
            <Image
              key={Math.random()}
              src={card.img}
              width="46"
              height="30"
              alt={card.ids.join(",")}
            />
          ))}
      </div>
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
            alt={currentCard.ids.join(",")}
            width="200"
            height="130"
            priority
          />
        )}
      </div>
    </div>
  );
}
