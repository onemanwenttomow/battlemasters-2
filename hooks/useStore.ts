import { create } from "zustand";

import units from "lib/units.json";
import playingCards from "lib/cards.json";
import { Unit, PlayingCards } from "types";
import { shuffle } from "lib/utils";

interface GameState {
  units: Unit[];
  playingCards: PlayingCards;
  playedCards: PlayingCards;
  gameStarted: boolean;
  getUnitByCoords: (x: number, y: number) => Unit | undefined;
  tileHasUnit: (x: number, y: number) => boolean;
  shufflePlayingCards: () => void;
  drawNextCard: () => void;
}

const useGameStore = create<GameState>((set, get) => ({
    units,
    playingCards,
    playedCards: [],
    gameStarted: false,
    shufflePlayingCards: () =>
        set((state) => ({
            playingCards: shuffle(state.playingCards),
            gameStarted: true
        })),
    drawNextCard: () =>
        set((state) => {
            // if all cards have been played shuffle a new
            const newPlayingCards =
                state.playingCards.length === 1
                    ? shuffle(playingCards)
                    : [...state.playingCards];
            const playedCards = [
                ...state.playedCards,
                newPlayingCards.shift()
            ] as PlayingCards;
            return { playingCards: newPlayingCards, playedCards };
        }),
    getUnitByCoords: (x: number, y: number) =>
        get().units.find((unit) => unit.x === x && unit.y === y),
    tileHasUnit: (x: number, y: number) =>
        get().units.some((unit) => unit.x === x && unit.y === y)
}));

export default useGameStore;
