import { create } from "zustand";

type MakeMatchModal = {
  isOpenMatch: boolean;
  teamIdx: number | null;
  isMakeMatchModalOpen: boolean;
  toggleMakeMatchModal: () => void;
  openMatchModal: () => void;
  openTeamMatch: (teamIdx: number) => void;
};

const useMakeMatchModalStore = create<MakeMatchModal>((set) => ({
  isOpenMatch: false,
  teamIdx: null,
  isMakeMatchModalOpen: false,
  toggleMakeMatchModal: () =>
    set((state) => ({ isMakeMatchModalOpen: !state.isMakeMatchModalOpen })),
  openMatchModal: () =>
    set(() => ({ isOpenMatch: true, isMakeMatchModalOpen: true })),
  openTeamMatch: (teamIdx: number) =>
    set(() => ({ teamIdx, isMakeMatchModalOpen: true })),
}));

export default useMakeMatchModalStore;
