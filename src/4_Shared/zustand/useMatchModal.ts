import { create } from "zustand";

type MatchModal = {
  matchIdx: number;
  isMatchModalOpen: boolean;
  isMatchEnd: boolean;
  toggleMatchModal: () => void;
  setMatchIdx: (matchIdx: number) => void;
  setIsMatchEnd: (isMatchEnd: boolean) => void;
};

const useMatchModalStore = create<MatchModal>()((set) => ({
  matchIdx: 0,
  isMatchModalOpen: false,
  isMatchEnd: false,
  toggleMatchModal: () =>
    set((state) => ({ isMatchModalOpen: !state.isMatchModalOpen })),
  setMatchIdx: (matchIdx: number) => set({ matchIdx }),
  setIsMatchEnd: (isMatchEnd: boolean) => set({ isMatchEnd }),
}));

export default useMatchModalStore;
