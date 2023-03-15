import { create } from "zustand";
import { GameState, CanonSlice, OgreSlice } from "types";
import { createGameSlice } from "./useGameStore";
import { createCanonSlice } from "./useCanonStore";
import { createOgreSlice } from "./useOgreStore";

const useGameStore = create<GameState & CanonSlice & OgreSlice>()((...a) => ({
  ...createGameSlice(...a),
  ...createCanonSlice(...a),
  ...createOgreSlice(...a),
}));

export default useGameStore;
