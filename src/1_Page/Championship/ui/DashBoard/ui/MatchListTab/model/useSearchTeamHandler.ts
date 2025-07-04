import React from "react";
import { useAuthStore } from "../../../../../../../4_Shared/lib/useMyInfo";
import { generateDateNavigation } from "../lib/dateUtils";
import { utcFormatter } from "../../../../../../../4_Shared/lib/utcFormatter";

const useSearchTeamHandler = (
  matchList: ChampionshipMatchList[]
): UseSearchTeamHandlerReturn => {
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());

  const myTeamIdx = useAuthStore((state) => state.teamIdx);

  // 검색어 변경 핸들러
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // 날짜 선택 핸들러
  const handleSetSelectedDate = (date: Date) => {
    const normalizedDate = new Date(date);
    normalizedDate.setHours(0, 0, 0, 0);
    setSelectedDate(normalizedDate);
  };

  // 초기 선택 날짜 설정
  React.useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    setSelectedDate(today);
  }, []);

  // 검색어로 필터링된 매치 (isMyTeamMatch 추가)
  const filteredMatches = React.useMemo(() => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const baseMatches = lowercasedSearchTerm
      ? matchList.filter((match) => {
          const team1Name =
            match.championship_match_first.team_list_name?.toLowerCase() || "";
          const team2Name =
            match.championship_match_second.team_list_name?.toLowerCase() || "";
          return (
            team1Name.includes(lowercasedSearchTerm) ||
            team2Name.includes(lowercasedSearchTerm)
          );
        })
      : matchList;

    return baseMatches.map((match) => ({
      ...match,
      isMyTeamMatch:
        match.championship_match_first.team_list_idx === myTeamIdx ||
        match.championship_match_second.team_list_idx === myTeamIdx,
    }));
  }, [matchList, searchTerm, myTeamIdx]);

  // 날짜 네비게이션 데이터 생성
  const availableDates = React.useMemo(
    () => generateDateNavigation(filteredMatches),
    [filteredMatches]
  );

  // 선택된 날짜의 매치만 필터링
  const selectedDateMatches = React.useMemo(() => {
    const matches = filteredMatches.filter((match) => {
      const formattedDateTime = utcFormatter(match.match_match_start_time);
      const matchDate = new Date(formattedDateTime);
      matchDate.setHours(0, 0, 0, 0);

      const selectedDateNormalized = new Date(selectedDate);
      selectedDateNormalized.setHours(0, 0, 0, 0);

      return matchDate.getTime() === selectedDateNormalized.getTime();
    });

    // 내 팀 매치를 위로, 그 다음 시간순으로 정렬
    return matches.sort((a, b) => {
      // 내 팀 매치 우선 정렬
      if (a.isMyTeamMatch && !b.isMyTeamMatch) return -1;
      if (!a.isMyTeamMatch && b.isMyTeamMatch) return 1;

      // 같은 그룹 내에서는 시간순 정렬
      return (
        new Date(a.match_match_start_time).getTime() -
        new Date(b.match_match_start_time).getTime()
      );
    });
  }, [filteredMatches, selectedDate]);

  return {
    // 검색 관련
    searchTerm,
    handleSearchChange,

    // 날짜 관련
    selectedDate,
    handleSetSelectedDate,
    availableDates,

    // 매치 데이터
    selectedDateMatches,
  };
};

export default useSearchTeamHandler;
