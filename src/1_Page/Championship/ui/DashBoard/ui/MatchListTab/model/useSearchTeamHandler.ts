import React from "react";
import { useAuthStore } from "../../../../../../../4_Shared/lib/useMyInfo";
import { utcFormatter } from "../../../../../../../4_Shared/lib/utcFormatter";
import { isSameDate } from "../../../../../../../4_Shared/lib/dateUtil";

const useSearchTeamHandler = (
  matchList: ChampionshipMatchList[]
): UseSearchTeamHandlerReturn => {
  const [searchMessage, setSearchMessage] = React.useState<string>("");
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());

  const myTeamIdx = useAuthStore((state) => state.teamIdx);

  // 검색어 변경 핸들러
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchMessage(e.target.value);
  };

  // 날짜 선택 핸들러
  const handleSetSelectedDate = (date: Date) => {
    setSelectedDate(date);
  };

  // 검색어로 필터링된 매치 (isMyTeamMatch 추가)
  const filteredMatches = React.useMemo(() => {
    const lowercasedSearchTerm = searchMessage.toLowerCase();
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
  }, [matchList, searchMessage, myTeamIdx]);

  // 날짜 네비게이션 데이터 생성
  const availableDates = React.useMemo(() => {
    // 매치 데이터에서 날짜 추출
    const matchDates = filteredMatches.map(
      (match) => new Date(utcFormatter(match.match_match_start_time))
    );
    // 오늘 추가
    matchDates.push(new Date());

    // 같은 날짜 중복 제거 및 정렬
    const uniqueDates = Array.from(
      new Set(
        matchDates.map((date) => {
          const dateOnly = new Date(date);
          dateOnly.setHours(0, 0, 0, 0); // 시간을 00:00:00으로 설정
          return dateOnly.getTime();
        })
      )
    )
      .map((time) => new Date(time))
      .sort((a, b) => a.getTime() - b.getTime());

    return uniqueDates;
  }, [filteredMatches]);

  // 선택된 날짜의 매치만 필터링
  const selectedDateMatches = React.useMemo(() => {
    const matches = filteredMatches.filter((match) => {
      const matchDate = new Date(utcFormatter(match.match_match_start_time));
      return isSameDate(matchDate, selectedDate);
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
    searchMessage,
    handleSearchChange,
    selectedDate,
    handleSetSelectedDate,
    availableDates,
    selectedDateMatches,
  };
};

export default useSearchTeamHandler;
