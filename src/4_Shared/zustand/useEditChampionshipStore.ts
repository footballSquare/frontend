import { create } from "zustand";

interface EditChampionshipStore {
  championshipInfo: ChampionshipInfo | null;
  setChampionshipInfo: (info: ChampionshipInfo) => void;
}

const useEditChampionshipStore = create<EditChampionshipStore>((set) => ({
  championshipInfo: null,
  setChampionshipInfo: (info: ChampionshipInfo) =>
    set({ championshipInfo: info }),
}));

export default useEditChampionshipStore;
