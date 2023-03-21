import { useState, useEffect } from "react";
import Image from "next/image";
import useStore from "hooks/useStore";
import CardFlip from "./CardFlip";

export default function Cards() {
  const [cardsShuffled, setCardsShuffled] = useState(false);
  const [clicked, setClicked] = useState(false);

  const { shufflePlayingCards, drawNextCard, playedCards } = useStore(
    (store) => store
  );
  const nextCard = useStore((store) => store.playingCards[0]);

  useEffect(() => {
    shufflePlayingCards();
    setCardsShuffled(true);
  }, [shufflePlayingCards]);

  function handleClick() {
    setClicked(true);
    setTimeout(() => {
      drawNextCard();
      setClicked(false);
    }, 400);
  }

  if (!cardsShuffled) {
    return <div style={{ width: "200px", height: "130px" }}></div>;
  }

  return (
    <div>
      <div className="flex items-start relative">
        <Image
          src="/cards/card-back.png"
          alt="back of card"
          width="200"
          height="130"
          priority
        />

        {nextCard && (
          <CardFlip
            width={200}
            height={130}
            backSrc="/cards/card-back.png"
            frontSrc={nextCard.img}
            clicked={clicked}
            handleClick={handleClick}
          />
        )}
        <div
          className="relative -z-50"
          style={{ width: "200px", height: "130px" }}
        >
          {playedCards
            .slice(0, 1)
            .reverse()
            .map((card, i) => (
              <Image
                key={Math.random()}
                src={card.img}
                width="200"
                height="130"
                alt={card.ids.join(",")}
                className="absolute"
                priority
              />
            ))}
        </div>
      </div>
    </div>
  );
}
