import React from "react";
import { useAuthStore } from "../../../../../../../4_Shared/lib/useMyInfo";

const useSearchTeamHandler = (
  matchList: ChampionshipMatchList[]
): UseSearchTeamHandlerReturn => {
  const [searchTerm, setSearchTerm] = React.useState<string>("");

  // 검색어 변경 핸들러
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredMatches = React.useMemo(() => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    if (!lowercasedSearchTerm) {
      return matchList;
    }
    return matchList.filter((match) => {
      const team1Name =
        match.championship_match_first.team_list_name?.toLowerCase() || "";
      const team2Name =
        match.championship_match_second.team_list_name?.toLowerCase() || "";
      return (
        team1Name.includes(lowercasedSearchTerm) ||
        team2Name.includes(lowercasedSearchTerm)
      );
    });
  }, [matchList, searchTerm]);

  const teamIdx = useAuthStore((state) => state.teamIdx);
  const myMatchList = React.useMemo(() => {
    return matchList.filter(
      (match) =>
        match.championship_match_first.team_list_idx === teamIdx ||
        match.championship_match_second.team_list_idx === teamIdx
    );
  }, [matchList, teamIdx]);

  return {
    filteredMatches,
    myMatchList,
    searchTerm,
    handleSearchChange,
  };
};

export default useSearchTeamHandler;
