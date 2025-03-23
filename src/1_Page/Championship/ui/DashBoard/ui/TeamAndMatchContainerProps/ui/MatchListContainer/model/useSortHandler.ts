import React from "react";
import { SORT_OPTION } from "../constant/sortOption";

const useSortHandler = (props: useSortHandlerProps): UseSortHandlerReturn => {
  const { matchList } = props;
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  // 2. useState의 타입을 SORT_OPTION으로 변경
  const [sortOption, setSortOption] = React.useState<SORT_OPTION>(
    SORT_OPTION.DEFAULT
  );

  // 검색어 변경 핸들러
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // 3. handleSortChange에서 SORT_OPTION을 올바르게 사용
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value as SORT_OPTION);
  };

  // 1) 검색 필터 적용
  const filteredMatches = React.useMemo(() => {
    const lowerSearch = searchTerm.toLowerCase();

    return matchList.filter((match) => {
      const { team_list_name: fn, team_list_short_name: fs } =
        match.championship_match_first;
      const { team_list_name: sn, team_list_short_name: ss } =
        match.championship_match_second;

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

    if (sortOption === SORT_OPTION.ASC) {
      sorted.sort(
        (a, b) => a.championship_match_idx - b.championship_match_idx
      );
    } else if (sortOption === SORT_OPTION.DESC) {
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
