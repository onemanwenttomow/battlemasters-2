import { create } from "zustand";

import units from "lib/units";
import playingCards from "lib/cards";
import { Unit, PlayingCards, Offset } from "types";
import { shuffle } from "lib/utils";
import { findNeighbours } from "lib/utils";

interface GameState {
  units: Unit[];
  activeUnit: Unit | null;
  playingCards: PlayingCards;
  playedCards: PlayingCards;
  gameStarted: boolean;
  possibleMoves: number[][];
  getUnitByCoords: (x: number, y: number) => Unit | undefined;
  tileHasUnit: (x: number, y: number) => boolean;
  shufflePlayingCards: () => void;
  drawNextCard: () => void;
  setActiveUnit: (id: string) => void;
}

const useGameStore = create<GameState>((set, get) => ({
  units,
  activeUnit: null,
  playingCards,
  playedCards: [],
  gameStarted: false,
  possibleMoves: [],
  shufflePlayingCards: () =>
    set((state) => ({
      playingCards: shuffle(state.playingCards),
      gameStarted: true,
      units: get().units.map((unit) => {
        return {
          ...unit,
          isActive: get().playingCards[0].ids.includes(unit.id),
        };
      }) as Unit[],
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
        newPlayingCards.shift(),
      ] as PlayingCards;
      const activeUnits = get().units.map((unit) => {
        return {
          ...unit,
          isActive: newPlayingCards[0].ids.includes(unit.id),
        };
      }) as Unit[];
      return {
        playingCards: newPlayingCards,
        playedCards,
        possibleMoves: [],
        activeUnit: null,
        units: activeUnits,
      };
    }),
  setActiveUnit: (id: string) => {
    const activeId =
      get().playingCards[0].ids.find((_id) => _id === id) || null;
    const activeUnit = get().units.find((unit) => unit.id === activeId);
    let possibleMoves: Offset[] = [];
    if (activeUnit) {
      possibleMoves = findNeighbours(
        activeUnit.x,
        activeUnit.y,
        get().playingCards[0]
      ).filter(
        (move) =>
          !get().units.find((unit) => unit.x === move[0] && unit.y === move[1])
      ) as Offset[];
    }
    set({ activeUnit, possibleMoves });
  },
  getUnitByCoords: (x: number, y: number) =>
    get().units.find((unit) => unit.x === x && unit.y === y),
  tileHasUnit: (x: number, y: number) =>
    get().units.some((unit) => unit.x === x && unit.y === y),
}));

export default useGameStore;
