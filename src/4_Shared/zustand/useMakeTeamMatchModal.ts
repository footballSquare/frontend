import { create } from "zustand";

type MakeMatchModal = {
  isMakeMatchModalOpen: boolean;
  setToggleModal: () => void;
};

const useMakeMatchModalStore = create<MakeMatchModal>((set) => ({
  isMakeMatchModalOpen: false,
  setToggleModal: () =>
    set((state) => ({ isMakeMatchModalOpen: !state.isMakeMatchModalOpen })),
}));

export default useMakeMatchModalStore;
