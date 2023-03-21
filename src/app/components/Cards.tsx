import { useState, useEffect } from "react";
import Image from "next/image";
import useStore from "hooks/useStore";

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
    }, 300);
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
          <div
            className="absolute w-[200px] h-[130px] cursor-pointer group perspective"
            onClick={handleClick}
          >
            <div
              className={`relative preserve-3d w-full h-full duration-300 ${
                clicked ? "card-move-flip" : ""
              }`}
            >
              <div className="absolute backface-hidden w-full h-full">
                <Image
                  src="/cards/card-back.png"
                  alt="back of card"
                  width="200"
                  height="130"
                  priority
                />
              </div>
              <div className="absolute flip backface-hidden w-full h-full">
                <Image
                  src={nextCard.img}
                  alt={nextCard.ids.join(",")}
                  width="200"
                  height="130"
                  priority
                  className="absolute"
                />
              </div>
            </div>
          </div>
        )}
        <div
          className="relative -z-50"
          style={{ width: "200px", height: "130px" }}
        >
          {playedCards
            .slice()
            .reverse()
            .map((card) => (
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
