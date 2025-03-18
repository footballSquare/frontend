import { create } from "zustand";

type MakeTeamMatchModal = {
  isModalOpen: boolean;
  setToggleModal: () => void;
};

const useMakeTeamMatchModalStore = create<MakeTeamMatchModal>((set) => ({
  isModalOpen: false,
  setToggleModal: () => set((state) => ({ isModalOpen: !state.isModalOpen })),
}));

export default useMakeTeamMatchModalStore;
