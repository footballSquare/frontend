const usePlayerCheck = (): [
  (userIdx: number, matchParticipants: MatchParticipant[]) => boolean,
  (userIdx: number, matchWaitList: MatchWaitList) => boolean
] => {
  const matchParticipantsChecker = (
    userIdx: number,
    matchParticipants: MatchParticipant[]
  ): boolean => {
    return matchParticipants.some(
      (participant) => participant.player_list_idx === userIdx
    );
  };

  const matchWaitListChecker = (
    userIdx: number,
    matchWaitList: MatchWaitList
  ): boolean => {
    return matchWaitList.match_waitlist
      ? Object.values(matchWaitList.match_waitlist).some((playerList) =>
          playerList.some((player) => player.player_list_idx === userIdx)
        )
      : false;
  };

  return [matchParticipantsChecker, matchWaitListChecker];
};

export default usePlayerCheck;
