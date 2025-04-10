import { create } from "zustand";

type EditChampionshipStore = {
  championshipListIdx: number | null;
  setChampionshipListIdx: (idx: number | null) => void;
};

const useEditChampionshipStore = create<EditChampionshipStore>((set) => ({
  championshipListIdx: null,
  setChampionshipListIdx: (idx: number | null) =>
    set({ championshipListIdx: idx }),
}));

export default useEditChampionshipStore;
