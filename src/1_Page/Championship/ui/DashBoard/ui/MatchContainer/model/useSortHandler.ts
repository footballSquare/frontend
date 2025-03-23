import React from "react";

const useSortHandler = (
  matchList: ChampionshipMatchList[]
): UseSortHandlerReturn => {
  // 검색어
  const [searchTerm, setSearchTerm] = React.useState("");
  // 정렬 옵션: 기본 / 오름차순 / 내림차순
  const [sortOption, setSortOption] = React.useState<
    "default" | "asc" | "desc"
  >("default");

  // 검색어 변경 핸들러
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // 정렬 옵션 변경 핸들러
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value as "default" | "asc" | "desc");
  };

  // 1) 검색 필터 적용
  const filteredMatches = React.useMemo(() => {
    const lowerSearch = searchTerm.toLowerCase();

    return matchList.filter((match) => {
      const { team_list_name: fn, team_list_short_name: fs } =
        match.championship_match_first;
      const { team_list_name: sn, team_list_short_name: ss } =
        match.championship_match_second;

      // 두 팀 중 하나라도 검색어를 포함하면 표시
      return (
        fn.toLowerCase().includes(lowerSearch) ||
        fs.toLowerCase().includes(lowerSearch) ||
        sn.toLowerCase().includes(lowerSearch) ||
        ss.toLowerCase().includes(lowerSearch)
      );
    });
  }, [searchTerm, matchList]);

  // 2) 정렬 적용
  const sortedMatches = React.useMemo(() => {
    const sorted = [...filteredMatches];

    if (sortOption === "asc") {
      // 매치 번호 오름차순
      sorted.sort(
        (a, b) => a.championship_match_idx - b.championship_match_idx
      );
    } else if (sortOption === "desc") {
      // 매치 번호 내림차순
      sorted.sort(
        (a, b) => b.championship_match_idx - a.championship_match_idx
      );
    }

    return sorted;
  }, [filteredMatches, sortOption]);

  return {
    searchTerm,
    sortOption,
    handleSearchChange,
    handleSortChange,
    sortedMatches,
  };
};

export default useSortHandler;
