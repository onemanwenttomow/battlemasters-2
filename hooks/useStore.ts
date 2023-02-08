import { create } from "zustand";

import units from "lib/units.json";
import playingCards from "lib/cards.json";
import { Unit, PlayingCards, Card } from "types";
import { shuffle } from "lib/utils";

interface GameState {
  units: Unit[];
  playingCards: PlayingCards;
  playedCards: PlayingCards;
  getUnitByCoords: (x: number, y: number) => Unit | undefined;
  tileHasUnit: (x: number, y: number) => boolean;
  shufflePlayingCards: () => void;
  drawNextCard: () => void;
}

const useGameStore = create<GameState>((set, get) => ({
  units,
  playingCards,
  playedCards: [],
  shufflePlayingCards: () =>
    set((state) => ({ playingCards: shuffle(state.playingCards) })),
  drawNextCard: () =>
    set((state) => {
      // if all cards have been played shuffle a new deck
      const newPlayingCards = state.playingCards.length === 1 ? shuffle(playingCards) : [...state.playingCards];
      const playedCards = [
        ...state.playedCards,
        newPlayingCards.shift()
      ] as PlayingCards;
      return { playingCards: newPlayingCards, playedCards }
    }),
  getUnitByCoords: (x: number, y: number) =>
    get().units.find((unit) => unit.x === x && unit.y === y),
  tileHasUnit: (x: number, y: number) =>
    get().units.some((unit) => unit.x === x && unit.y === y),
}));

export default useGameStore;
