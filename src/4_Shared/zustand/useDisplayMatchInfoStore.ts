// useDisplayStore.ts
import { create } from "zustand";

type DisplayMatchInfoState = {
  displayData: MatchInfo[];
  clearDisplayData: () => void;
  insertDataAtStart: (newData: MatchInfo) => void;
  insertDisplayData: (newData: MatchInfo[]) => void;
};

// { player_list_nickname, player_list_profile_image, player_list_idx, team_list_name,team_list_emblem }

const useDisplayMatchInfoStore = create<DisplayMatchInfoState>((set) => ({
  displayData: [],
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
