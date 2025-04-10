import { create } from "zustand";

type EditChampionshipStore = {
  championshipListIdx: number | null;
  championshipInfo: ChampionshipInfo | null;
  setChampionshipInfo: (info: ChampionshipInfo) => void;
  setChampionshipListIdx: (idx: number) => void;
  clearSetChampionshipInfo: () => void;
};

const useEditChampionshipStore = create<EditChampionshipStore>((set) => ({
  championshipListIdx: null,
  championshipInfo: null,
  setChampionshipInfo: (info: ChampionshipInfo) =>
    set({ championshipInfo: info }),
  setChampionshipListIdx: (idx: number) => set({ championshipListIdx: idx }),
  clearSetChampionshipInfo: () => set({ championshipInfo: null }),
}));

export default useEditChampionshipStore;
