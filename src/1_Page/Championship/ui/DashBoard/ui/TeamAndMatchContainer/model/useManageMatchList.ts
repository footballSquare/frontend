import React from "react";
import { createDummyMatch } from "../util/createDummyMatch";

const useManageMatchList = (
  matchList: ChampionshipMatchList[],
  teamList: ChampionshipTeamInfo[]
): [
  ChampionshipMatchList[],
  (matchIdx: number) => void,
  (newMatch: UsePostCreateChampionshipMatchProps) => void
] => {
  const [displayMatchList, setDisplayMatchList] = React.useState<
    ChampionshipMatchList[]
  >([]);

  React.useEffect(() => {
    setDisplayMatchList(matchList);
  }, [matchList]);

  const handleDeleteMatch = (matchIdx: number) => {
    setDisplayMatchList((prev) =>
      prev.filter((match) => match.championship_match_idx !== matchIdx)
    );
  };
  const handleAddMatch = (newMatch: UsePostCreateChampionshipMatchProps) => {
    const newMatchTeams = teamList.filter(
      (team) =>
        team.team_list_idx === newMatch.first_team_idx ||
        team.team_list_idx === newMatch.second_team_idx
    );
    console.log(newMatchTeams);
    const dummyMatcth = createDummyMatch(newMatchTeams);
    console.log(dummyMatcth);
    setDisplayMatchList((prev) => [...prev, dummyMatcth]);
  };

  return [displayMatchList, handleDeleteMatch, handleAddMatch];
};

export default useManageMatchList;
