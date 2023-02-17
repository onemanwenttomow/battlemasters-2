import { create } from "zustand";

import units from "lib/units";
import playingCards from "lib/cards";
import canonCards from "lib/canonCards";
import { Unit, PlayingCards, Offset, UnitId, Dice, CanonTile } from "types";
import {
  findAttackZone,
  generateDice,
  shuffle,
  findNeighbours,
  getCanonPath,
} from "lib/utils";

interface GameState {
  units: Unit[];
  activeUnit: UnitId | null;
  playingCards: PlayingCards;
  playedCards: PlayingCards;
  canonTiles: CanonTile[];
  gameStarted: boolean;
  possibleMoves: Offset[];
  possibleAttacks: Offset[];
  battleInProgress: boolean;
  attackingUnitId: UnitId | null;
  defendingUnitId: UnitId | null;
  attackingDice: Dice[];
  defendingDice: Dice[];
  getUnitByCoords: (x: number, y: number) => Unit | undefined;
  getUnitById: (id: UnitId) => Unit;
  tileHasUnit: (x: number, y: number) => boolean;
  shufflePlayingCards: () => void;
  drawNextCard: () => void;
  setActiveUnit: (id: UnitId) => void;
  moveUnit: (x: number, y: number) => void;
  skipMove: (id: UnitId) => void;
  skipAttack: (id: UnitId) => void;
  startBattle: (attackingId: UnitId, defendingId: UnitId) => void;
  endBattle: (attackingUnitId: UnitId, defendingUnitId: UnitId) => void;
  startCanonBattle: (defendingUnitId: UnitId) => void;
}

const useGameStore = create<GameState>((set, get) => ({
  units,
  activeUnit: null,
  playingCards,
  playedCards: [],
  canonTiles: [],
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
    const activeUnit = get().getUnitById(id);
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

    const activeUnit = get().getUnitById(activeUnitId);

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
    const activeUnit = get().getUnitById(id);
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
    const attackingUnit = get().getUnitById(attackingUnitId);
    const defendingUnit = get().getUnitById(defendingUnitId);

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

  startCanonBattle: (defendingUnitId: UnitId) => {
    set({ canonTiles: [] });
    const canon = get().getUnitById("canon");
    const defendingUnit = get().getUnitById(defendingUnitId);
    const canonPath = getCanonPath(canon, defendingUnit);
    const shuffledCanonCards = shuffle(canonCards);

    // add the target card.
    shuffledCanonCards.unshift("/canon-cards/canon-target.png");
    // remove canon from canonPath
    canonPath.shift();

    const newCanonCards = shuffledCanonCards
      .slice(0, canonPath.length)
      .reverse();
    const canonTiles = newCanonCards.map((card, i) => ({
      src: card,
      offset: canonPath[i],
      revealed: false,
    })) as CanonTile[];

    set({ canonTiles: canonTiles });
  },

  getUnitById: (id: UnitId) =>
    get().units.find((unit) => unit.id === id) as Unit,
  getUnitByCoords: (x: number, y: number) =>
    get().units.find((unit) => unit.x === x && unit.y === y),
  tileHasUnit: (x: number, y: number) =>
    get().units.some((unit) => unit.x === x && unit.y === y),
}));

export default useGameStore;
