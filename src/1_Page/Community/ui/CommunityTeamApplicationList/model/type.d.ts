type UseApproveCommunityTeamApplicationProps = {
  setCommunityTeamApplicationList: (
    value: React.SetStateAction<CommunityTeam[]>
  ) => void;
};

type ApproveCommunityTeamApplicationProps = {
  communityIdx: number;
  teamIdx: number;
}

type DisApproveCommunityTeamApplicationProps = {
  communityIdx: number;
  teamIdx: number;
}