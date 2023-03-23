import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { GameState, CanonSlice, OgreSlice } from "types";
import { createGameSlice } from "./useGameStore";
import { createCanonSlice } from "./useCanonStore";
import { createOgreSlice } from "./useOgreStore";

const useGameStore = create<GameState & CanonSlice & OgreSlice>()((...a) => ({
  ...createGameSlice(...a),
  ...createCanonSlice(...a),
  ...createOgreSlice(...a),
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("Store", useGameStore);
}

export default useGameStore;
