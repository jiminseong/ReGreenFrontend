import { create } from "zustand";

interface InstallPromptStore {
  isIOS: boolean;
  isAndroid: boolean;
  isStandalone: boolean;
  promptVisible: boolean;
  promptSkipped: boolean;
  setPromptVisible: (value: boolean) => void;
  setPromptSkipped: () => void;
  initEnvironment: () => void;
}

export const useInstallPromptStore = create<InstallPromptStore>((set) => ({
  isIOS: false,
  isAndroid: false,
  isStandalone: false,
  promptVisible: false,
  promptSkipped: false,

  setPromptVisible: (value) => set({ promptVisible: value }),
  setPromptSkipped: () => set({ promptSkipped: true }),

  initEnvironment: () => {
    const ua = typeof window !== "undefined" ? window.navigator.userAgent.toLowerCase() : "";
    const isAndroid = ua.includes("android");

    const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent) && !("MSStream" in window);
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      ("standalone" in window.navigator && window.navigator.standalone === true);

    set({ isIOS, isAndroid, isStandalone, promptVisible: !isStandalone });
  },
}));
