import React from "react";
import { createDummyMatch } from "../util/createDummyMatch";

const useManageMatchList = (
  matchList: ChampionshipMatchList[],
  teamList: ChampionshipTeamInfo[]
): [ChampionshipMatchList[], MatchHandlerReturn] => {
  const [displayMatchList, setDisplayMatchList] = React.useState<
    ChampionshipMatchList[]
  >([]);

  React.useEffect(() => {
    setDisplayMatchList(matchList);
  }, [matchList]);

  const handleDeleteMatch = React.useCallback((matchIdx: number) => {
    setDisplayMatchList((prev) =>
      prev.filter((match) => match.championship_match_idx !== matchIdx)
    );
  }, []);

  const handleAddMatch = React.useCallback(
    (newMatch: UsePostCreateChampionshipMatchProps) => {
      const newMatchTeams = teamList.filter(
        (team) =>
          team.team_list_idx === newMatch.first_team_idx ||
          team.team_list_idx === newMatch.second_team_idx
      );
      const dummyMatch = createDummyMatch(newMatchTeams);
      setDisplayMatchList((prev) => [...prev, dummyMatch]);
    },
    [teamList]
  );

  const handleEndMatch = React.useCallback((matchIdx: number) => {
    setDisplayMatchList((prev) =>
      prev.map((match) => {
        if (match.championship_match_idx === matchIdx) {
          return {
            ...match,
            championship_match_first: {
              ...match.championship_match_first,
              common_satus_idx: 4,
            },
            championship_match_second: {
              ...match.championship_match_second,
              common_satus_idx: 4,
            },
          };
        }
        return match;
      })
    );
  }, []);

  const matchHandlers = React.useMemo(
    () => ({
      handleDeleteMatch,
      handleAddMatch,
      handleEndMatch,
    }),
    [handleDeleteMatch, handleAddMatch, handleEndMatch]
  );

  return [displayMatchList, matchHandlers];
};

export default useManageMatchList;
