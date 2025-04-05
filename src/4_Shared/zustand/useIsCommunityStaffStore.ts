import { create } from "zustand";

type IsCommunityStaff = {
  isCommunityStaff: boolean;
  setIsCommunityStaff: (data: boolean) => void;
};

const useIsCommunityStaffStore = create<IsCommunityStaff>()((set) => ({
  isCommunityStaff: false,
  setIsCommunityStaff: (data: boolean) => set(() => ({ isCommunityStaff: data })),
}));

export default useIsCommunityStaffStore;
