import { create } from "zustand";

type MakeMatchModal = {
  isOpenMatch: boolean;
  isMakeMatchModalOpen: boolean;
  setToggleModal: () => void;
  setIsOpenMatch: (isOpenMatch: boolean) => void;
};

const useMakeMatchModalStore = create<MakeMatchModal>((set) => ({
  isOpenMatch: false,
  isMakeMatchModalOpen: false,
  setToggleModal: () =>
    set((state) => ({ isMakeMatchModalOpen: !state.isMakeMatchModalOpen })),
  setIsOpenMatch: (isOpenMatch: boolean) =>
    set(() => ({ isOpenMatch, isMakeMatchModalOpen: true })),
}));

export default useMakeMatchModalStore;
