export const mergeMatchLists = (
  postDataList: MatchInfo[],
  teamMatchList: MatchInfo[]
): MatchInfo[] => {
  const filteredTeamMatchList = teamMatchList
    .filter(
      (match) =>
        !postDataList.some(
          (post) => post.match_match_idx === match.match_match_idx
        )
    )
    .sort((a, b) => a.match_match_idx - b.match_match_idx);

  return [...postDataList, ...filteredTeamMatchList];
};
