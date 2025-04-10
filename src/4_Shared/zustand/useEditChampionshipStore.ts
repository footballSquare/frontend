import { create } from "zustand";

type EditChampionshipStore = {
  championshipListIdx: number | null;
  setChampionshipListIdx: (idx: number) => void;
};

const useEditChampionshipStore = create<EditChampionshipStore>((set) => ({
  championshipListIdx: null,
  setChampionshipListIdx: (idx: number) => set({ championshipListIdx: idx }),
}));

export default useEditChampionshipStore;
