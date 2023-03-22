import Image from "next/image";
import useStore from "hooks/useStore";
import { getCurrentOgreCard } from "lib/utils";

export default function OgreCards() {
  const { ogreCards, drawOgreCard } = useStore((store) => store);
  const activeUnits = useStore((store) =>
    store.units.filter((unit) => unit.isActive)
  );
  const ogreCardsRemaining = ogreCards.filter((card) => !card.revealed);
  const ogreCardsPlayed = ogreCards.filter((card) => card.revealed);
  const currentCard = ogreCards.reduceRight(getCurrentOgreCard, null);

  const isGrimorg = activeUnits.map((unit) => unit.id).includes("grimorg");

  // TODO add flip to ogre cards

  return !isGrimorg ? null : (
    <>
      <h3>Ogre Cards Remaining {ogreCardsRemaining.length}</h3>
      <div className="flex items-start">
        {ogreCardsRemaining.length > 0 ? (
          <Image
            src="/ogre-cards/ogre-back.png"
            alt="back of card"
            width="200"
            height="130"
            onClick={drawOgreCard}
            priority
          />
        ) : (
          <div style={{ height: "130px", width: "200px" }}></div>
        )}

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
