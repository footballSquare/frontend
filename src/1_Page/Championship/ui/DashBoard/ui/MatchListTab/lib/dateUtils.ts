//  * 날짜를 표시용 문자열로 포맷합니다 X월 X일
export const formatDateForDisplay = (date: Date): string => {
  const today = new Date();
  const inputNormalized = new Date(date);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (inputNormalized.getTime() === today.getTime()) {
    return "오늘";
  } else if (inputNormalized.getTime() === tomorrow.getTime()) {
    return "내일";
  } else if (inputNormalized.getTime() === yesterday.getTime()) {
    return "어제";
  }

  return `${inputNormalized.getMonth() + 1}월 ${inputNormalized.getDate()}일`;
};

//  매치 데이터로부터 날짜 네비게이션 배열을 생성합니다
export const generateDateNavigation = (
  matches: ChampionshipMatchList[]
): Date[] => {
  // 매치 데이터에서 날짜 추출
  const matchDates = matches.map(
    (match) => new Date(match.match_match_start_time)
  );

  // 중복 제거 및 정렬
  const uniqueDates = Array.from(
    new Set(matchDates.map((date) => date.getTime()))
  )
    .map((time) => new Date(time))
    .sort((a, b) => a.getTime() - b.getTime());

  // 오늘 날짜 추가 (매치가 없어도 표시)
  const today = new Date();
  if (!uniqueDates.some((date) => date.getTime() === today.getTime())) {
    uniqueDates.push(today);
    uniqueDates.sort((a, b) => a.getTime() - b.getTime());
  }

  return uniqueDates;
};

//  * 특정 날짜에 매치가 있는지 확인합니다

export const isMatchOnDate = (
  match: ChampionshipMatchList,
  targetDate: Date
): boolean => {
  const matchDate = new Date(match.match_match_start_time);
  return matchDate.getTime() === targetDate.getTime();
};

export const isSameDate = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};
