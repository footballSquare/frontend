import { create } from "zustand";

type CurrentCommunityInfo = {
  communityIdx: number;
  setCommunityIdx: (data: number) => void;
};

const useCurrentCommunityInfo = create<CurrentCommunityInfo>()((set) => ({
  communityIdx: -1,
  setCommunityIdx: (data: number) => set(() => ({ communityIdx: data })),
}));

export default useCurrentCommunityInfo;
