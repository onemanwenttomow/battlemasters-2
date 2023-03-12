import { create } from "zustand";
import { CanonSlice, GameState } from "types";
import { createCanonSlice } from "./useCanonStore";
import { createGameSlice } from "./useGameStore";

const useGameStore = create<CanonSlice & GameState>()((...a) => ({
    ...createCanonSlice(...a),
    ...createGameSlice(...a)
}));

export default useGameStore
