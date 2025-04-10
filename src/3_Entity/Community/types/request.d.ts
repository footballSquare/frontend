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
}

type PutCommunityEmblemProps = {
  communityIdx: number;
  emblem: File | null;
}

type PutCommunityBannerProps = {
  communityIdx: number;
  banner: File | null;
}