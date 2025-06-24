import { isMatchOnDate } from "./dateUtils";

export const categorizeMatchesByDate = (
  matches: ChampionshipMatchList[],
  selectedDate: Date
) => {
  // 선택된 날짜와 같은 날의 매치만 필터링
  const selectedDateMatches = matches.filter((match) =>
    isMatchOnDate(match, selectedDate)
  );

  // 시간순으로 정렬
  selectedDateMatches.sort(
    (a, b) =>
      new Date(a.match_match_start_time).getTime() -
      new Date(b.match_match_start_time).getTime()
  );

  return {
    selectedDateMatches,
  };
};
