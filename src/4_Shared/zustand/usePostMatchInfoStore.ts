// useDisplayStore.ts
import { create } from "zustand";

type PostMatchInfoState = {
  postDataList: MatchInfo[];
  clearPostData: () => void;
  insertPostData: (data: MatchInfo) => void;
};

const usePostMatchInfoStore = create<PostMatchInfoState>((set) => ({
  postDataList: [],
  clearPostData: () => set({ postDataList: [] }),
  insertPostData: (data: MatchInfo) =>
    set((state) => ({
      postDataList: [data, ...state.postDataList],
    })),
}));

export default usePostMatchInfoStore;
