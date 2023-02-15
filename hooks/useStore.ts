import { create } from "zustand";

import units from "lib/units";
import playingCards from "lib/cards";
import { Unit, PlayingCards, Offset, UnitId, Dice } from "types";
import { findAttackZone, generateDice, shuffle } from "lib/utils";
import { findNeighbours } from "lib/utils";

interface GameState {
  units: Unit[];
  activeUnit: UnitId | null;
  playingCards: PlayingCards;
  playedCards: PlayingCards;
  gameStarted: boolean;
  possibleMoves: Offset[];
  possibleAttacks: Offset[];
  battleInProgress: boolean;
  attackingUnitId: UnitId | null;
  defendingUnitId: UnitId | null;
  attackingDice: Dice[];
  defendingDice: Dice[];
  getUnitByCoords: (x: number, y: number) => Unit | undefined;
  tileHasUnit: (x: number, y: number) => boolean;
  shufflePlayingCards: () => void;
  drawNextCard: () => void;
  setActiveUnit: (id: UnitId) => void;
  moveUnit: (x: number, y: number) => void;
  skipMove: (id: UnitId) => void;
  skipAttack: (id: UnitId) => void;
  startBattle: (attackingId: UnitId, defendingId: UnitId) => void;
  endBattle: (attackingUnitId: UnitId, defendingUnitId: UnitId) => void;
}

const useGameStore = create<GameState>((set, get) => ({
  units,
  activeUnit: null,
  playingCards,
  playedCards: [],
  gameStarted: false,
  possibleMoves: [],
  possibleAttacks: [],
  battleInProgress: false,
  attackingUnitId: null,
  defendingUnitId: null,
  attackingDice: [],
  defendingDice: [],
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
      activeUnit: null,
      units: activeUnits,
    });
  },

  setActiveUnit: (id: UnitId) => {
    const activeUnit = get().units.find((unit) => unit.id === id) as Unit;
    const turnComplete = activeUnit.hasAttacked && activeUnit.hasAttacked;

    let possibleMoves: Offset[] = [];
    // TODO the following cannot enter the tower, knights, wolf riders, canon, ogre
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
    set({ activeUnit: id });
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

  startBattle: (attackingUnitId: UnitId, defendingUnitId: UnitId) => {
    const attackingUnit = get().units.find(
      (unit) => unit.id === attackingUnitId
    ) as Unit;
    const defendingUnit = get().units.find(
      (unit) => unit.id === defendingUnitId
    ) as Unit;

    const { extraDice } = get().playingCards[0];
    // TODO if defending unit or attacking unit is in ditch, attack is -1 , unless attacking unit is archer or crossbow
    // if defender is in tower then attacking unit gets one less dice
    // if attacker is in tower than attacker gets one extra dice
    const attackingDice = generateDice(attackingUnit.combatValue + extraDice);

    // TODO check if defending unit gets any bonus (i.e. 1 extra defence when in tower)
    const defendingDice = generateDice(defendingUnit.combatValue);

    set({
      battleInProgress: true,
      attackingUnitId,
      defendingUnitId,
      attackingDice,
      defendingDice,
    });
  },

  endBattle: (attackingUnitId: UnitId, defendingUnitId: UnitId) => {
    // calculate total damage.
    const totalAttack = get()
      .attackingDice.map((dice) => dice.value)
      .filter((num) => num < 4).length;
    const totalDefence = get()
      .defendingDice.map((dice) => dice.value)
      .filter((num) => num === 4).length;

    const totalDamage = Math.max(0, totalAttack - totalDefence);

    const units = get()
      .units.map((unit) => {
        if (unit.id === attackingUnitId) {
          return { ...unit, hasAttacked: true };
        } else if (unit.id === defendingUnitId) {
          return {
            ...unit,
            damageSustained: unit.damageSustained + totalDamage,
          };
        } else {
          return unit;
        }
      })
      .filter((unit) => unit.damageSustained < 3);

    set({
      battleInProgress: false,
      defendingUnitId: null,
      attackingUnitId: null,
      units,
      possibleAttacks: [],
      attackingDice: [],
      defendingDice: [],
    });
  },

  getUnitByCoords: (x: number, y: number) =>
    get().units.find((unit) => unit.x === x && unit.y === y),
  tileHasUnit: (x: number, y: number) =>
    get().units.some((unit) => unit.x === x && unit.y === y),
}));

export default useGameStore;
