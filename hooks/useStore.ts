import { create } from "zustand";

import units, { canEnterTower } from "lib/units";
import playingCards from "lib/cards/cards";
import canonCards from "lib/cards/canonCards";
import ogreCards from "lib/cards/ogreCards";
import { towerOffset } from "lib/board";
import {
  Unit,
  PlayingCards,
  Offset,
  UnitId,
  Dice,
  CanonTile,
  OgreCard,
} from "types";
import {
  findAttackZone,
  generateDice,
  shuffle,
  findNeighbours,
  getCanonPath,
  filterDefeatedUnits,
  getCurrentOgreCard,
  isTowerTile,
} from "lib/utils";

interface GameState {
  units: Unit[];
  activeUnit: UnitId | null;
  playingCards: PlayingCards;
  playedCards: PlayingCards;
  canonTiles: CanonTile[];
  canonMisFire: CanonTile | null;
  ogreCards: OgreCard[];
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
  canonTileReveal: (canonTile: CanonTile) => void;
  setCanonMisFire: () => void;
  canonMisfireReveal: () => void;
  drawOgreCard: () => void;
}

const useGameStore = create<GameState>((set, get) => ({
  units,
  activeUnit: null,
  playingCards,
  playedCards: [],
  canonTiles: [],
  canonMisFire: null,
  ogreCards: shuffle(ogreCards),
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

    if (newPlayingCards[0].ids.includes("grimorg")) {
      set({
        ogreCards: get().ogreCards.map((card) => ({
          ...card,
          revealed: false,
        })),
      });
    }

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
    const { x, y, hasMoved, hasAttacked, range } = activeUnit;
    const turnComplete = hasMoved && hasAttacked;

    let possibleMoves: Offset[] = [];
    // TODO the following cannot enter the tower, knights, wolf riders, canon, ogre
    if (activeUnit && !hasMoved) {
      possibleMoves = findNeighbours(x, y, get().playingCards[0])
        .filter(
          (potentialMove) =>
            !get().units.find(
              (unit) =>
                unit.x === potentialMove[0] && unit.y === potentialMove[1]
            )
        )
        // check if unit can enter tower...
        .filter(
          (potentialMove) =>
            !(isTowerTile(potentialMove) && !canEnterTower.includes(id))
        ) as Offset[];
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
        possibleAttacks: activeUnitId === "grimorg" ? [] : possibleAttacks,
      };
    });
  },

  skipMove: (id: UnitId) => {
    set({ activeUnit: id });
    const activeUnit = get().getUnitById(id);
    const { x, y, range } = activeUnit;
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

    const { extraDice } = get().playingCards[0];

    // DITCH bonus
    // TODO if defending unit or attacking unit is in ditch, attack is -1 , unless attacking unit is archer or crossbow

    // TOWER bonus
    // if defender is in tower then attacking unit gets one less dice
    let towerDefenseBonus = 0;
    if (isTowerTile([defendingUnit.x, defendingUnit.y])) {
      towerDefenseBonus = 1;
    }

    // if attacker is in tower than attacker gets one extra dice
    let towerAttackBonus = 0;
    if (isTowerTile([attackingUnit.x, attackingUnit.y])) {
      towerAttackBonus = 1;
    }

    const attackingDice = generateDice(
      attackingUnit.combatValue +
        extraDice +
        towerAttackBonus -
        towerDefenseBonus
    );
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

    // TODO if unit is ogre, remove one random card per damage received...
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
        } else {
          return unit;
        }
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
    const canonTiles = newCanonCards.map(
      (card, i): CanonTile => ({
        src: card,
        offset: canonPath[i],
        revealed: false,
        isTarget: i === newCanonCards.length - 1,
      })
    );

    set({ canonTiles: canonTiles, possibleAttacks: [] });
  },

  canonTileReveal: (canonTile: CanonTile) => {
    const canonTiles = get().canonTiles;
    const idx = canonTiles.indexOf(canonTile);
    const lowestIndex = canonTiles.findIndex((tile) => !tile.revealed);
    if (idx !== lowestIndex) return;

    const { src, offset, isTarget } = canonTile;
    let damage = 0;

    if (src === "/canon-cards/canon-explosion.png" && idx === 0) {
      get().setCanonMisFire();
    }

    // check if explosion, then remove unit on those coords.
    // check if final card, then also remove unit at those coords
    if (src === "/canon-cards/canon-explosion.png" || isTarget) {
      const canon = get().getUnitById("canon");
      canon.hasAttacked = true;
      damage = 6;
      canonTiles.length = idx + 1;

      setTimeout(() => {
        set({ canonTiles: [] });
      }, 3000);
    }

    // check if bounce, if there is a unit on that space and deal damage.
    if (src === "/canon-cards/canon-bounce.png") {
      damage = 1;
    }

    const possibleUnitUnderCanon = get().getUnitByCoords(offset[0], offset[1]);
    if (possibleUnitUnderCanon) {
      possibleUnitUnderCanon.damageSustained += damage;
    }

    const units = get().units.filter(filterDefeatedUnits);
    const updatedCanonTiles = get().canonTiles.map((tile, i) =>
      i === idx ? { ...tile, revealed: true } : tile
    );

    set({
      canonTiles: updatedCanonTiles,
      units,
    });
  },

  setCanonMisFire: () => {
    const canon = get().getUnitById("canon");
    const canonMisFireCards = canonCards;
    canonMisFireCards.shift();
    const shuffledMisFireCards = shuffle(canonMisFireCards);
    const randomCard = shuffledMisFireCards[0];
    const canonMisFireTile = {
      revealed: false,
      isTarget: false,
      src: randomCard,
      offset: [canon.x, canon.y],
    } as CanonTile;

    set({ canonMisFire: canonMisFireTile });
  },

  canonMisfireReveal: () => {
    const prevCanonMisFire = get().canonMisFire as CanonTile;
    const canonMisFire = {
      ...prevCanonMisFire,
      revealed: true,
    } as CanonTile;

    set({ canonMisFire });

    let damage = 0;
    const { src } = prevCanonMisFire;
    if (src === "/canon-cards/canon-bounce.png") {
      damage = 1;
    } else if (src === "/canon-cards/canon-explosion.png") {
      damage = 3;
    }

    const canon = get().getUnitById("canon");
    canon.damageSustained = damage;

    setTimeout(() => {
      set({
        canonMisFire: null,
        units: get().units.filter(filterDefeatedUnits),
      });
    }, 3000);
  },

  drawOgreCard: () => {
    const nextCard = get().ogreCards.find((card) => !card.revealed);
    if (!nextCard) return;

    const grimorg = { ...get().getUnitById("grimorg") };
    const currentCard = { ...get().playingCards[0] };

    if (nextCard.src === "/ogre-cards/ogre-attack-card.png") {
      grimorg.hasMoved = true;
      grimorg.hasAttacked = false;
      currentCard.moves = 0;
    }
    if (nextCard.src === "/ogre-cards/ogre-move-card.png") {
      grimorg.hasMoved = false;
      currentCard.moves = 1;
    }

    const playingCards = get().playingCards.map((card, i) =>
      i === 0 ? currentCard : card
    );

    const units = get().units.map((unit) => {
      if (unit.id === "grimorg") {
        return grimorg;
      }
      return unit;
    });

    const ogreCards = get().ogreCards.map((card) => {
      if (nextCard === card) {
        return {
          ...card,
          revealed: true,
        };
      }
      return card;
    });

    set({ ogreCards, units, playingCards });
    get().setActiveUnit("grimorg");
  },

  getUnitById: (id: UnitId) =>
    get().units.find((unit) => unit.id === id) as Unit,
  getUnitByCoords: (x: number, y: number) =>
    get().units.find((unit) => unit.x === x && unit.y === y),
  tileHasUnit: (x: number, y: number) =>
    get().units.some((unit) => unit.x === x && unit.y === y),
}));

export default useGameStore;
