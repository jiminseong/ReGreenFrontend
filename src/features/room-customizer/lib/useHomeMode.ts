import { create } from "zustand";
import { HomeMode } from "../model/type";

interface HomeModeState {
  mode: HomeMode;
  setMode: (mode: HomeMode) => void;
}

export const useHomeMode = create<HomeModeState>((set) => ({
  mode: "home",
  setMode: (mode) => set({ mode }),
}));
