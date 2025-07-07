type UseJoinActionReturn = {
  isTeamCaptain: boolean;
  isTeamSubLeader: boolean;
  isCurrentTeamMember: boolean;
  setMembershipToAvailable: () => void;
  setMembershipToUnavailable: () => void;
};

type UseDeleteLeaveTeamHandlerProps = {
  setMembershipToAvailable: () => void;
  setMembershipToUnavailable: () => void;
};
