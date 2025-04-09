import React from "react";

const useSelectHandler = (
  matchList: ChampionshipMatchList[]
): [number, SelectTeamMatchInfo, (idx: number) => void] => {
  const [selectedIdx, setSelectedIdx] = React.useState<number>(0);

  React.useEffect(() => {
    if (matchList.length === 0) return;
    setSelectedIdx(matchList[0].championship_match_idx);
  }, [matchList]);

  const handleSelect = (idx: number) => setSelectedIdx(idx);

  const selectedTeams = React.useMemo(
    () => getSelectedMatchTeams(matchList, selectedIdx),
    [matchList, selectedIdx]
  );

  return [selectedIdx, selectedTeams, handleSelect];
};

export default useSelectHandler;

const getSelectedMatchTeams = (
  matchList: ChampionshipMatchList[],
  selectedIdx: number
): SelectTeamMatchInfo => {
  if (!matchList || !Array.isArray(matchList) || matchList.length === 0) {
    return { selectTeamList: [], selectTeamScore: [] };
  }

  const selectedMatch = matchList.find(
    (match) => match.championship_match_idx === selectedIdx
  );

  const firstTeam = {
    teamName: selectedMatch?.championship_match_first?.team_list_name ?? "",
    teamScore:
      selectedMatch?.championship_match_first?.match_team_stats_our_score ?? 0,
  };

  const secondTeam = {
    teamName: selectedMatch?.championship_match_second?.team_list_name ?? "",
    teamScore:
      selectedMatch?.championship_match_second?.match_team_stats_our_score ?? 0,
  };

  const selectTeamList = [firstTeam.teamName, secondTeam.teamName];

  const selectTeamScore = [firstTeam.teamScore, secondTeam.teamScore];

  return {
    selectTeamList,
    selectTeamScore,
  };
};
