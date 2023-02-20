import { useState } from "react";
import Image from "next/image";
import useStore from "hooks/useStore";
import { OgreCard } from "types";

export default function OgreCards() {
  const { ogreCards } = useStore((store) => store);
  const activeUnits = useStore((store) =>
    store.units.filter((unit) => unit.isActive)
  );

  const currentCard = ogreCards.reduceRight((acc: null | OgreCard, card: OgreCard) => {
    if (card.revealed === true && !acc) {
      return card;
    }
    return acc;
  }, null);

  console.log('currentCard: ',currentCard);

  const isGrimorg = activeUnits.map((unit) => unit.id).includes("grimorg");

  function handleClick() {
    console.log("click")
  }

  return !isGrimorg ? null : (
    <>
      <h3>Ogre Cards {ogreCards.length}</h3>
      <div className="flex items-start">
        <Image
          src="/ogre-cards/ogre-back.png"
          alt="back of card"
          width="200"
          height="130"
          onClick={handleClick}
          priority
        />

        {/* <Image
        src={currentCard}
        alt="ogre card"
        width="200"
        height="130"
      /> */}
      </div>
    </>
  );
}
