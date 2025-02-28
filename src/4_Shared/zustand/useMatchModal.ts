import { create } from "zustand";

type MatchModal = {
  matchIdx: number;
  isMatchModalOpen: boolean;
  toggleMatchModal: () => void;
  setMatchIdx: (matchIdx: number) => void;
};

const useMatchModalStore = create<MatchModal>()((set) => ({
  matchIdx: 0,
  isMatchModalOpen: false,
  toggleMatchModal: () => set((state) => ({ isMatchModalOpen: !state.isMatchModalOpen })),
  setMatchIdx: (matchIdx: number) => set({ matchIdx }),
}));

export default useMatchModalStore;
