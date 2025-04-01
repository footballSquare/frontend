// useDisplayStore.ts
import { create } from "zustand";

type DisplayMatchInfoState = {
  displayData: MatchInfo[];
  prevData: MatchInfo;
  insertPrevData: (newData: MatchInfo[]) => void;
  clearDisplayData: () => void;
  insertDataAtStart: (newData: MatchInfo) => void;
  insertDisplayData: (newData: MatchInfo[]) => void;
};

const useDisplayMatchInfoStore = create<DisplayMatchInfoState>((set) => ({
  displayData: [],
  prevData: {} as MatchInfo,
  insertPrevData: (newData: MatchInfo[]) => {
    set((state) => newData);
  },
  clearDisplayData: () => set({ displayData: [] }),
  insertDataAtStart: (newData: MatchInfo) =>
    set((state) => ({ displayData: [newData, ...state.displayData] })),
  insertDisplayData: (newData: MatchInfo[]) =>
    set((state) => {
      const existingIds = new Set(
        state.displayData.map((data) => data.match_match_idx)
      );
      const filteredNewData = newData.filter(
        (data) => !existingIds.has(data.match_match_idx)
      );
      return { displayData: [...state.displayData, ...filteredNewData] };
    }),
}));

export default useDisplayMatchInfoStore;
