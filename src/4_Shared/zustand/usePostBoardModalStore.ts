import { create } from "zustand";

type PostBoardModal = {
  category: number;
  isPostBoardModalOpen: boolean;
  togglePostBoardModal: () => void;
  setBoardCategory: (category: number) => void;
};

const usePostBoardModalStore = create<PostBoardModal>()((set) => ({
  category: 0,
  isPostBoardModalOpen: false,
  togglePostBoardModal: () =>
    set((state) => ({ isPostBoardModalOpen: !state.isPostBoardModalOpen })),
  setBoardCategory: (category: number) =>
    set(() => ({ category: category })),
}));

export default usePostBoardModalStore;
