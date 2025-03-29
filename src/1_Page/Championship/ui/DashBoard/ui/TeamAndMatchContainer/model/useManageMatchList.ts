import React from "react";
import { createFakeMatch } from "../util/createFakeMatch";

const useManageMatchList = (
  matchList: ChampionshipMatchList[]
): [
  ChampionshipMatchList[],
  (matchIdx: number) => void,
  (newMatch: UsePostCreateChampionshipMatchProps) => void
] => {
  const [displayMatchList, setDisplayMatchList] =
    React.useState<ChampionshipMatchList[]>(matchList);

  const handleDeleteMatch = (matchIdx: number) => {
    setDisplayMatchList((prev) =>
      prev.filter((match) => match.championship_match_idx !== matchIdx)
    );
  };
  const handleAddMatch = (newMatch: UsePostCreateChampionshipMatchProps) => {
    const fakeMatcth = createFakeMatch(newMatch);
    setDisplayMatchList((prev) => [...prev, fakeMatcth]);
  };
  return [displayMatchList, handleDeleteMatch, handleAddMatch];
};

export default useManageMatchList;
