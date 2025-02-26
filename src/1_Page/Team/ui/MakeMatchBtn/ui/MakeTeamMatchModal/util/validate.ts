export const validateTime = (
  match_match_start_date: string,
  match_match_start_time: string
) => {
  const presentTime = new Date();
  const presentDate = presentTime.toISOString().split("T")[0]; // YYYY-MM-DD
  const selectedDateTime = new Date(
    `${match_match_start_date}T${match_match_start_time}`
  );

  // 1️⃣ 과거 날짜 선택 방지
  if (new Date(match_match_start_date) < new Date(presentDate)) {
    return {
      field: "match_match_start_date",
      message: "과거 날짜는 선택할 수 없습니다.",
    };
  }

  // 2️⃣ 같은 날짜에서 과거 시간 선택 방지
  if (
    match_match_start_date === presentDate &&
    selectedDateTime < presentTime
  ) {
    return {
      field: "match_match_start_time",
      message: "과거 시간은 선택할 수 없습니다.",
    };
  }

  return null; // ✅ 유효한 경우
};
