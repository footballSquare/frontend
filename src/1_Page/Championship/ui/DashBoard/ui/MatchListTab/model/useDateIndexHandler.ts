import React from "react";
import { generateDateNavigation } from "../lib/dateUtils";
import { categorizeMatchesByDate } from "../lib/categorizeMatchesByDate";

const useDateIndexHandler = (
  filteredMatches: ChampionshipMatchList[]
): UseDateIndexReturn => {
  // 초기 선택 날짜 설정
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());

  const handleSetSelectedDate = (date: Date) => {
    setSelectedDate(date);
  };

  // 날짜 네비게이션 데이터 생성
  const availableDates = React.useMemo(
    () => generateDateNavigation(filteredMatches),
    [filteredMatches]
  );

  const { selectedDateMatches } = categorizeMatchesByDate(
    filteredMatches,
    selectedDate
  );

  return {
    availableDates,
    selectedDate,
    selectedDateMatches,
    handleSetSelectedDate,
  };
};

export default useDateIndexHandler;
