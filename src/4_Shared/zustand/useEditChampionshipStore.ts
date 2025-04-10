import { create } from "zustand";

type EditChampionshipStore = {
  championshipInfo: ChampionshipInfo | null;
  setChampionshipInfo: (info: ChampionshipInfo) => void;
  clearSetChampionshipInfo: () => void;
};

const useEditChampionshipStore = create<EditChampionshipStore>((set) => ({
  championshipInfo: null,
  setChampionshipInfo: (info: ChampionshipInfo) =>
    set({ championshipInfo: info }),
  clearSetChampionshipInfo: () => set({ championshipInfo: null }),
}));

export default useEditChampionshipStore;
