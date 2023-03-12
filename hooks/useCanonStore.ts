import { StateCreator } from "zustand";
import { GameState, CanonSlice, UnitId, CanonTile } from "types";

import canonCards from "lib/cards/canonCards";
import {
  shuffle,
  getCanonPath,
  filterDefeatedUnits,
} from "lib/utils";

export const createCanonSlice: StateCreator<
  CanonSlice & GameState,
  [],
  [],
  CanonSlice
> = (set, get) => ({
  canonTiles: [],
  canonTilesSet: false,
  canonMisFire: null,
  
  startCanonBattle: (defendingUnitId: UnitId, preview) => {
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
        isTarget: i === newCanonCards.length - 1
      })
    );

    set({
      canonTiles,
      possibleAttacks: !preview ? [] : get().possibleAttacks,
      canonTilesSet: preview ? false : true
    });
  },

  canonTileReveal: (canonTile: CanonTile) => {
    if (!get().canonTilesSet) {
      return set({ possibleAttacks: [], canonTilesSet: true });
    }

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
        set({ canonTiles: [], canonTilesSet: false });
      }, 3000);
    }

    // check if bounce, if there is a unit on that space and deal damage.
    if (src === "/canon-cards/canon-bounce.png") {
      damage = 1;
    }

    const possibleUnitUnderCanon = get().getUnitByCoords(
      offset[0],
      offset[1]
    );
    if (possibleUnitUnderCanon) {
      possibleUnitUnderCanon.damageSustained += damage;
    }

    const units = get().units.filter(filterDefeatedUnits);
    const updatedCanonTiles = get().canonTiles.map((tile, i) =>
      i === idx ? { ...tile, revealed: true } : tile
    );

    set({
      canonTiles: updatedCanonTiles,
      units
    });
  },

  setCanonMisFire: () => {
    const canon = get().getUnitById("canon");
    const canonMisFireCards = [...canonCards];
    canonMisFireCards.shift();
    const shuffledMisFireCards = shuffle(canonMisFireCards);
    const randomCard = shuffledMisFireCards[0];
    const canonMisFireTile = {
      revealed: false,
      isTarget: false,
      src: randomCard,
      offset: [canon.x, canon.y]
    } as CanonTile;

    set({ canonMisFire: canonMisFireTile });
  },

  canonMisfireReveal: () => {
    const prevCanonMisFire = get().canonMisFire as CanonTile;
    const canonMisFire = {
      ...prevCanonMisFire,
      revealed: true
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
        units: get().units.filter(filterDefeatedUnits)
      });
    }, 3000);
  }
});
