import { create } from "zustand";

interface UIState {
  isMegaMenuOpen: boolean;
  setIsMegaMenuOpen: (isOpen: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isMegaMenuOpen: false,
  setIsMegaMenuOpen: (isOpen) => set({ isMegaMenuOpen: isOpen }),
}));
