// useDisplayStore.ts
import { create } from "zustand";

type DisplayMatchInfoState = {
  displayData: MatchInfo[];
  clearDisplayData: () => void;
  insertDataAtStart: (newData: MatchInfo) => void;
  insertDisplayData: (newData: MatchInfo[]) => void;
};

const useDisplayMatchInfoStore = create<DisplayMatchInfoState>((set) => ({
  displayData: [],
  clearDisplayData: () => set({ displayData: [] }),
  insertDataAtStart: (newData: MatchInfo) =>
    set((state) => ({ displayData: [...state.displayData, newData] })),
  insertDisplayData: (newData: MatchInfo[]) =>
    set((state) => ({ displayData: [...state.displayData, ...newData] })),
}));

export default useDisplayMatchInfoStore;
