import { StateCreator } from "zustand";

import { campaigns } from "lib/campaigns";
import units, { canEnterTower, archersAndCrossbow } from "lib/units";
import playingCards from "lib/cards/cards";
import {
  getPossibleStartingMoves,
  getRandomStartingPositions,
} from "lib/utils";

import {
  GameState,
  CanonSlice,
  OgreSlice,
  Unit,
  PlayingCards,
  Offset,
  UnitId,
  CampaignId,
} from "types";

import {
  findAttackZone,
  generateDice,
  shuffle,
  findNeighbours,
  filterDefeatedUnits,
  getCurrentOgreCard,
  isTowerTile,
  isDitchTile,
} from "lib/utils";

export const createGameSlice: StateCreator<
  GameState & CanonSlice & OgreSlice,
  [],
  [],
  GameState
> = (set, get) => ({
  board: [],
  startingZones: {
    Imperial: { x: 0, y: [] },
    Chaos: { x: 0, y: [] },
  },
  units,
  activeUnit: null,
  addUnitToBoard: false,
  canRandomise: false,
  canPositionPreStart: false,
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

  setCampaign: (id: CampaignId) => {
    const {
      unitPositions,
      board,
      startingZones,
      canRandomise,
      canPositionPreStart,
    } = campaigns[id];
    const fullUnits = get().units;
    const units = fullUnits.map((unit) => {
      const { x, y } = unitPositions.find(
        (_unit) => _unit.id === unit.id
      ) as Unit;
      return {
        ...unit,
        x,
        y,
      };
    });

    set({ board, units, startingZones, canRandomise, canPositionPreStart });
  },

  shufflePlayingCards: () =>
    set((state) => ({
      playingCards: shuffle(state.playingCards),
      gameStarted: true,
    })),

  drawNextCard: () => {
    // if all cards have been played shuffle a new
    const newPlayingCards =
      get().playingCards.length === 1
        ? shuffle(playingCards)
        : [...get().playingCards];

    const playedCards = [
      newPlayingCards.shift(),
      ...get().playedCards,
    ] as PlayingCards;

    const activeUnits = get().units.map((unit) => {
      return {
        ...unit,
        isActive: playedCards[0].ids.includes(unit.id),
        hasMoved: false,
        hasAttacked: false,
      };
    }) as Unit[];

    if (playedCards[0].ids.includes("grimorg")) {
      set({
        ogreCards: shuffle([
          ...get().ogreCards.map((card) => ({
            ...card,
            revealed: false,
          })),
        ]),
      });
    }

    set({
      playingCards: newPlayingCards,
      playedCards,
      possibleMoves: [],
      possibleAttacks: [],
      activeUnit: null,
      units: activeUnits,
      addUnitToBoard: false,
    });
  },
  setPreGameActiveUnit: (id, army) => {
    const { x, y } = get().startingZones[army];

    // TODO fix to include halfs (i.e. battle of plains every second row 5/6/5/6)
    // or provide a array of possible starting positions in the campaign itself...
    const possibleMoves = getPossibleStartingMoves(get().board, y, x).filter(
      ([x, y]) => !get().units.find((unit) => unit.x === x && unit.y === y)
    );

    const units = get().units.map((unit) => {
      return unit.id === id ? { ...unit, hasAttacked: true } : unit;
    });

    let ogreCards = [...get().ogreCards];

    if (id === "grimorg") {
      ogreCards = ogreCards.map((card) => ({ ...card, revealed: true }));
    }

    set({
      possibleMoves,
      activeUnit: id,
      addUnitToBoard: true,
      units,
      ogreCards,
    });
  },

  randomiseUnits: (army) => {
    const units = get().units;
    const unitsNotOnBoard = units
      .filter((unit) => unit.x === null || unit.y === null)
      .filter((unit) => unit.army === army);
    const unitsAlreadyAdded = units.filter(
      (unit) => unit.army === army && unit.x
    );
    const { x, y } = get().startingZones[army];
    const board = get().board;

    const possibleMoves = getPossibleStartingMoves(board, y, x).filter(
      ([x, y]) => !units.find((unit) => unit.x === x && unit.y === y)
    );

    const unitsWithPositions = getRandomStartingPositions(
      unitsNotOnBoard.length,
      possibleMoves,
      unitsAlreadyAdded
    );

    const unitsRandomPositions = unitsNotOnBoard.map((unit, i) => ({
      ...unit,
      x: unitsWithPositions[i][0],
      y: unitsWithPositions[i][1],
    }));

    set({
      units: units.map((unit) => {
        const foundUnit = unitsRandomPositions.find((u) => u.id === unit.id);
        return foundUnit ? foundUnit : unit;
      }),
    });
  },

  setActiveUnit: (id: UnitId) => {
    const activeUnit = get().getUnitById(id);
    const { x, y, hasMoved, hasAttacked, range } = activeUnit;
    const turnComplete = hasMoved && hasAttacked;
    const board = get().board;

    if (x === null || y === null) return;

    let possibleMoves: Offset[] = [];
    if (activeUnit && !hasMoved) {
      possibleMoves = findNeighbours(x, y, get().playedCards[0], get().board)
        // check if tile is occupied by another unit
        .filter(
          ([x, y]) => !get().units.find((unit) => unit.x === x && unit.y === y)
        )
        // check if unit can enter tower...
        .filter(
          (potentialMove) =>
            !(isTowerTile(potentialMove, board) && !canEnterTower.includes(id))
        );
    }

    let possibleAttacks: Offset[] = [];
    if (activeUnit && hasMoved && !turnComplete) {
      possibleAttacks = findAttackZone(x, y, range);
    }

    if (activeUnit.id === "grimorg") {
      const currentCard = get().ogreCards.reduceRight(getCurrentOgreCard, null);
      if (currentCard?.src === "/ogre-cards/ogre-move-card.png") {
        possibleAttacks = [];
      }
    }

    set({
      activeUnit: id,
      possibleMoves,
      possibleAttacks,
      addUnitToBoard: false,
    });
  },

  moveUnit: (x: number, y: number) => {
    const activeUnitId = get().activeUnit;
    if (!activeUnitId) return;

    const activeUnit = get().getUnitById(activeUnitId);

    let possibleAttacks = findAttackZone(x, y, activeUnit.range);

    if (get().addUnitToBoard) {
      possibleAttacks = [];
    }

    const units = get().units.map((unit) => {
      if (unit.id === activeUnitId) {
        return {
          ...unit,
          x,
          y,
          hasMoved: true,
          hasAttacked: !!possibleAttacks.length,
        };
      }
      return unit;
    });

    set({
      units,
      possibleMoves: [],
      possibleAttacks:
        activeUnitId === "grimorg" || activeUnitId === "canon"
          ? []
          : possibleAttacks,
    });
  },

  skipMove: (id: UnitId) => {
    set({ activeUnit: id });
    const activeUnit = get().getUnitById(id);
    const { x, y, range } = activeUnit;
    if (x === null || y === null) return;

    const updatedUnits = get().units.map((unit) => {
      if (unit.id === id) {
        return {
          ...unit,
          hasMoved: true,
        };
      }
      return unit;
    });

    const possibleAttacks = findAttackZone(x, y, range);

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
    set({ units: updatedUnits, possibleAttacks: [], canonTiles: [] });
  },

  startBattle: (attackingUnitId: UnitId, defendingUnitId: UnitId) => {
    const attackingUnit = get().getUnitById(attackingUnitId);
    const defendingUnit = get().getUnitById(defendingUnitId);

    if (
      defendingUnit.x === null ||
      attackingUnit.x === null ||
      defendingUnit.y === null ||
      attackingUnit.y === null
    ) {
      return;
    }

    const { extraDice } = get().playedCards[0];
    const board = get().board;

    // DITCH bonus
    const isDitch =
      isDitchTile([defendingUnit.x, defendingUnit.y], board) ||
      isDitchTile([attackingUnit.x, attackingUnit.y], board);

    // person attacking over ditch gets one less
    // person defending over ditch gets one more.
    let ditchDefense = 0;
    let ditchAttack = 0;
    if (isDitch) {
      ditchAttack = archersAndCrossbow.includes(attackingUnit.id) ? 0 : -1;
      ditchDefense = 1;
    }

    // TOWER bonus
    // if defender is in tower then attacking unit gets one less dice
    let towerDefenseBonus = 0;
    if (isTowerTile([defendingUnit.x, defendingUnit.y], board)) {
      towerDefenseBonus = 1;
    }

    // if attacker is in tower than attacker gets one extra dice
    let towerAttackBonus = 0;
    if (isTowerTile([attackingUnit.x, attackingUnit.y], board)) {
      towerAttackBonus = 1;
    }

    const attackingDice = generateDice(
      attackingUnit.combatValue +
        extraDice +
        towerAttackBonus -
        towerDefenseBonus +
        ditchAttack
    );
    const defendingDice = generateDice(
      defendingUnit.combatValue + ditchDefense
    );

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

    if (defendingUnitId === "grimorg") {
      const ogreCards = shuffle([...get().ogreCards]).slice(totalDamage);
      set({ ogreCards });
    }

    const units = get()
      .units.map((unit) => {
        if (unit.id === attackingUnitId) {
          return { ...unit, hasAttacked: true };
        } else if (unit.id === defendingUnitId) {
          return {
            ...unit,
            damageSustained: unit.damageSustained + totalDamage,
          };
        }
        return unit;
      })
      .filter(filterDefeatedUnits);

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

  getUnitById: (id: UnitId) =>
    get().units.find((unit) => unit.id === id) as Unit,
  getUnitByCoords: (x: number, y: number) =>
    get().units.find((unit) => unit.x === x && unit.y === y),
  tileHasUnit: (x: number, y: number) =>
    get().units.some((unit) => unit.x === x && unit.y === y),
});
