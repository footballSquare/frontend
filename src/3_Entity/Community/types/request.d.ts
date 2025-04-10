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
  userIdx: number;
};

type UseGetCommunityTeamApplicationListProps = {
  communityIdx: number;
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
