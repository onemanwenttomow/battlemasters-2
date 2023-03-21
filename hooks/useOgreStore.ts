import { StateCreator } from "zustand";
import { GameState, OgreSlice } from "types";

import ogreCards from "../lib/ogreCards";
import { shuffle } from "lib/utils";

export const createOgreSlice: StateCreator<
  GameState & OgreSlice,
  [],
  [],
  OgreSlice
> = (set, get) => ({
  ogreCards: shuffle(ogreCards),

  drawOgreCard: () => {
    const nextCard = get().ogreCards.find((card) => !card.revealed);
    if (!nextCard) return;

    const grimorg = { ...get().getUnitById("grimorg") };
    const currentCard = { ...get().playedCards[0] };

    if (nextCard.src === "/ogre-cards/ogre-attack-card.png") {
      grimorg.hasMoved = true;
      grimorg.hasAttacked = false;
      currentCard.moves = 0;
    }
    if (nextCard.src === "/ogre-cards/ogre-move-card.png") {
      grimorg.hasMoved = false;
      currentCard.moves = 1;
    }

    const playedCards = get().playingCards.map((card, i) =>
      i === 0 ? currentCard : card
    );

    const units = get().units.map((unit) =>
      unit.id === "grimorg" ? grimorg : unit
    );

    const ogreCards = get().ogreCards.map((card) => {
      if (nextCard === card) {
        return {
          ...card,
          revealed: true,
        };
      }
      return card;
    });

    set({ ogreCards, units, playedCards });
    get().setActiveUnit("grimorg");
  },
});
