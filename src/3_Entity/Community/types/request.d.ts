type UseGetChampionshipListProps = {
  communityIdx: number;
  page: number;
};

type UseGetCommunityInfoProps = {
  communityIdx: number;
};

type UseGetCommunityStaffListProps = {
  communityIdx: number;
};

type UseGetCommunitySTeamListProps = {
  communityIdx: number;
  page: number;
};

type PostApplyCommunityStaffProps = {
  communityIdx: number;
};

type UseGetCommunityStaffAplicationListProps = {
  communityIdx: number;
};

type PostApproveCommunityStaffApplicationProps = {
  communityIdx: number;
  userIdx: number;
};

type DeleteCommunityStaffApplicationProps = {
  communityIdx: number;
  userIdx: number;
};

type DeleteCommunityStaffProps = {
  communityIdx: number;
  userIdx: number;
};

type UseGetCommunityTeamApplicationListProps = {
  communityIdx: number;
};

type PutCommunityEmblemProps = {
  communityIdx: number;
  emblem: File | null;
};

type PutCommunityBannerProps = {
  communityIdx: number;
  banner: File | null;
};

type PostChampionshipProps = {
  championship_list_name: string;
  championship_type_idx: number;
  championship_list_color: string;
  championship_list_description: string;
  participation_team_idxs: number[];
  championship_list_start_date: string;
  championship_list_end_date: string;
  championship_award_name: string[];
  file: FormData;
};

type PutChampionshipProps = {
  championship_list_name: string;
  championship_type_idx: number;
  championship_list_color: string;
  championship_list_description: string;
  participation_team_idxs: number[];
  championship_list_start_date: string;
  championship_list_end_date: string;
  championship_award_name: string[];
  file: FormData;
};

type PutCommunityNoticeProps = {
  communityIdx: number;
  notice: string;
};

type DeleteCommunityTeamProps = {
  teamIdx: number;
  communityIdx: number;
};

type PostApproveCommunityTeamApplicationProps = {
  communityIdx: number;
  teamIdx: number;
};

type DeleteCommunityTeamApplicationProps = {
  communityIdx: number;
  teamIdx: number;
};

type PostApplyCommunityTeamProps = {
  communityIdx: number;
};

type PostCommunityBoardProps = {
  communityIdx: number;
  title: string;
  content: string;
  image: File | null;
}

type UseGetCommunityBoardListProps = {
  communityIdx: number;
  page: number;
}