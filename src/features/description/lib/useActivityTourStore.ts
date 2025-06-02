// store/useActivityTourStore.ts
import { create } from "zustand";

interface ActivityTourState {
  isSeen: boolean;
  setSeen: (seen: boolean) => void;
  syncWithLocalStorage: () => void;
}

export const useActivityTourStore = create<ActivityTourState>((set) => ({
  isSeen: false,
  setSeen: (seen) => {
    set({ isSeen: seen });
    localStorage.setItem("activityTourSeen", seen ? "true" : "false");
  },
  syncWithLocalStorage: () => {
    const value = localStorage.getItem("activityTourSeen");
    set({ isSeen: value === "true" });
  },
}));
