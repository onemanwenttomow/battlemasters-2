import { useState, useEffect } from "react";
import NextImage from "next/image";
import useStore from "hooks/useStore";
import CardFlip from "./CardFlip";

export default function Cards() {
  const [cardsShuffled, setCardsShuffled] = useState(false);
  const [animating, setAnimating] = useState(false);

  const {
    shufflePlayingCards,
    drawNextCard,
    activeUnitsTurnComplete,
    playedCards,
    playingCards,
  } = useStore((store) => store);
  const nextCard = useStore((store) => store.playingCards[0]);

  useEffect(() => {
    if (cardsShuffled) {
      return;
    }
    shufflePlayingCards();
    setCardsShuffled(true);
    // pre load images
    playingCards.forEach((card) => {
      const preloadImage = new Image();
      preloadImage.src = card.img;
    });
  }, [shufflePlayingCards]);

  function handleClick() {
    if (!activeUnitsTurnComplete()) return;

    setAnimating(true);
    setTimeout(() => {
      drawNextCard();
      setAnimating(false);
    }, 200);
  }

  if (!cardsShuffled) {
    return <div style={{ width: "200px", height: "130px" }}></div>;
  }

  return (
    <div>
      <div className="flex items-start relative">
        <NextImage
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
            animating={animating}
            handleClick={handleClick}
          />
        )}
        <div
          className="relative -z-50"
          style={{ width: "200px", height: "130px" }}
        >
          {playedCards.slice(0, 1).map((card, i) => (
            <NextImage
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
