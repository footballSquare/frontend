import { create } from "zustand";
import React from "react";

type MakeMatchModal = {
  isMakeMatchModalOpen: boolean;
  toggleMakeMatchModal: () => void;
  optimisticMatchListSetter: React.Dispatch<
    React.SetStateAction<
      {
        match_match_idx: number;
        match_type_idx: number;
        team_list_idx: number | null;
        team_list_name: string | null;
        team_list_emblem: string | null;
        match_match_attribute: number;
        match_match_participation_type: number;
        player_list_idx: number;
        player_list_nickname: string;
        player_list_profile_image: string | null;
        match_match_start_time: string;
        common_status_idx: number;
        match_match_duration: { hours: number; minutes: number };
      }[]
      // MatchInfo 의 서버로부터 받는 response type이 변경되면 수정 필요
    >
  > | null;
  setOptimisticMatchListSetter: (
    setter: MakeMatchModal["optimisticMatchListSetter"]
  ) => void;
};

const useMakeMatchModalStore = create<MakeMatchModal>((set) => ({
  isMakeMatchModalOpen: false,
  optimisticMatchListSetter: null,
  toggleMakeMatchModal: () =>
    set((state) => ({ isMakeMatchModalOpen: !state.isMakeMatchModalOpen })),
  setOptimisticMatchListSetter: (
    setter: MakeMatchModal["optimisticMatchListSetter"]
  ) => set(() => ({ optimisticMatchListSetter: setter })),
}));

export default useMakeMatchModalStore;
