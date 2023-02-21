import Image from "next/image";
import useStore from "hooks/useStore";
import { OgreCard } from "types";
import { getCurrentOgreCard } from "lib/utils";

export default function OgreCards() {
  const { ogreCards, drawOgreCard } = useStore((store) => store);
  const activeUnits = useStore((store) =>
    store.units.filter((unit) => unit.isActive)
  );
  const ogreCardsRemaining = ogreCards.filter((card) => !card.revealed).length;

  const currentCard = ogreCards.reduceRight(getCurrentOgreCard, null);

  const isGrimorg = activeUnits.map((unit) => unit.id).includes("grimorg");

  return !isGrimorg ? null : (
    <>
      <h3>Ogre Cards Remaining {ogreCardsRemaining}</h3>
      <div className="flex items-start">
        <Image
          src="/ogre-cards/ogre-back.png"
          alt="back of card"
          width="200"
          height="130"
          onClick={drawOgreCard}
          priority
        />
        {currentCard && (
          <Image
            src={currentCard?.src}
            alt="ogre card"
            width="200"
            height="130"
          />
        )}
      </div>
    </>
  );
}
