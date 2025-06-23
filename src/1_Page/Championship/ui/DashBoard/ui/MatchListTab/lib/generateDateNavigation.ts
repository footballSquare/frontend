// MOD: 날짜 네비게이션 및 매치 분류 유틸 함수
export const generateDateNavigation = (matches: ChampionshipMatchList[]) => {
  // 매치 데이터에서 실제 날짜 추출
  const matchDates = matches.map((match) => {
    const date = new Date(match.match_match_start_time);
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  });

  // 중복 제거 및 정렬
  const uniqueDates = Array.from(
    new Set(matchDates.map((date) => date.getTime()))
  )
    .map((time) => new Date(time))
    .sort((a, b) => a.getTime() - b.getTime());

  // 오늘 날짜 추가 (매치가 없어도 표시)
  const today = new Date();
  const todayDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  if (!uniqueDates.some((date) => date.getTime() === todayDate.getTime())) {
    uniqueDates.push(todayDate);
    uniqueDates.sort((a, b) => a.getTime() - b.getTime());
  }

  return uniqueDates;
};
