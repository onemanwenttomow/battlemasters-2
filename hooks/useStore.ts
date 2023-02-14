import { create } from "zustand";

import units from "lib/units";
import playingCards from "lib/cards";
import { Unit, PlayingCards, Offset, UnitId } from "types";
import { findAttackZone, shuffle } from "lib/utils";
import { findNeighbours } from "lib/utils";

interface GameState {
  units: Unit[];
  activeUnit: UnitId | "";
  playingCards: PlayingCards;
  playedCards: PlayingCards;
  gameStarted: boolean;
  possibleMoves: Offset[];
  possibleAttacks: Offset[];
  battleInProgress: boolean;
  getUnitByCoords: (x: number, y: number) => Unit | undefined;
  tileHasUnit: (x: number, y: number) => boolean;
  shufflePlayingCards: () => void;
  drawNextCard: () => void;
  setActiveUnit: (id: UnitId) => void;
  moveUnit: (x: number, y: number) => void;
  skipMove: (id: UnitId) => void;
  skipAttack: (id: UnitId) => void;
}

const useGameStore = create<GameState>((set, get) => ({
  units,
  activeUnit: "",
  playingCards,
  playedCards: [],
  gameStarted: false,
  possibleMoves: [],
  possibleAttacks: [],
  battleInProgress: true,

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

  drawNextCard: () => {
    // if all cards have been played shuffle a new
    const newPlayingCards =
      get().playingCards.length === 1
        ? shuffle(playingCards)
        : [...get().playingCards];

    const playedCards = [
      ...get().playedCards,
      newPlayingCards.shift(),
    ] as PlayingCards;

    const activeUnits = get().units.map((unit) => {
      return {
        ...unit,
        isActive: newPlayingCards[0].ids.includes(unit.id),
        hasMoved: false,
        hasAttacked: false,
      };
    }) as Unit[];

    set({
      playingCards: newPlayingCards,
      playedCards,
      possibleMoves: [],
      possibleAttacks: [],
      activeUnit: "",
      units: activeUnits,
    });
  },

  setActiveUnit: (id: UnitId) => {
    const activeUnit = get().units.find((unit) => unit.id === id) as Unit;
    const turnComplete = activeUnit.hasAttacked && activeUnit.hasAttacked;

    let possibleMoves: Offset[] = [];
    if (activeUnit && !activeUnit.hasMoved) {
      possibleMoves = findNeighbours(
        activeUnit.x,
        activeUnit.y,
        get().playingCards[0]
      ).filter(
        (move) =>
          !get().units.find((unit) => unit.x === move[0] && unit.y === move[1])
      ) as Offset[];
    }

    let possibleAttacks: Offset[] = [];
    if (activeUnit && activeUnit.hasMoved && !turnComplete) {
      possibleAttacks = findAttackZone(
        activeUnit.x,
        activeUnit.y,
        activeUnit.range
      );
    }

    set({ activeUnit: id, possibleMoves, possibleAttacks });
  },

  moveUnit: (x: number, y: number) => {
    const activeUnitId = get().activeUnit;
    if (!activeUnitId) return;
    const activeUnit = get().units.find(
      (unit) => unit.id === activeUnitId
    ) as Unit;
    // calculate possible attacks
    const possibleAttacks = findAttackZone(x, y, activeUnit.range);
    set((state) => {
      return {
        units: state.units.map((unit) => {
          if (unit.id === activeUnitId) {
            return {
              ...unit,
              x,
              y,
              hasMoved: true,
            };
          }
          return unit;
        }),
        possibleMoves: [],
        possibleAttacks,
      };
    });
  },

  skipMove: (id: UnitId) => {
    // TODO if no active unit then set one
    const activeUnit = get().units.find((unit) => unit.id === id) as Unit;
    const updatedUnits = get().units.map((unit) => {
      if (unit.id === id) {
        return {
          ...unit,
          hasMoved: true,
        };
      }
      return unit;
    });

    const possibleAttacks = findAttackZone(
      activeUnit.x,
      activeUnit.y,
      activeUnit.range
    );

    set({ units: updatedUnits, possibleAttacks, possibleMoves: [] });
  },

  skipAttack: (id: UnitId) => {
    // TODO if no active unit then set one

    const updatedUnits = get().units.map((unit) => {
      if (unit.id === id) {
        return {
          ...unit,
          hasAttacked: true,
        };
      }
      return unit;
    });
    set({ units: updatedUnits, possibleAttacks: [] });
  },

  getUnitByCoords: (x: number, y: number) =>
    get().units.find((unit) => unit.x === x && unit.y === y),
  tileHasUnit: (x: number, y: number) =>
    get().units.some((unit) => unit.x === x && unit.y === y),
}));

export default useGameStore;
