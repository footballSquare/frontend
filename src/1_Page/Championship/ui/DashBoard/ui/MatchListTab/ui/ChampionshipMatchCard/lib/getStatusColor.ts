// 상태에 따른 색상 설정
export const getStatusColors = (
  isFinished: boolean,
  common_status_idx: number
) => {
  if (isFinished) {
    return {
      bgColor: "bg-gradient-to-r from-gray-700 to-gray-800",
      textColor: "text-white",
      borderColor: "border-gray-600",
      scoreBoxBg: "bg-gray-900/60",
      accentColor: "bg-gray-500",
    };
  } else if (common_status_idx === 3) {
    // 진행 중
    return {
      bgColor: "bg-gradient-to-r from-blue-50 to-indigo-50",
      textColor: "text-gray-800",
      borderColor: "border-blue-300",
      scoreBoxBg: "bg-blue-600",
      accentColor: "bg-blue-500",
    };
  } else if (common_status_idx === 0) {
    // 예정됨
    return {
      bgColor: "bg-gradient-to-r from-green-50 to-emerald-50",
      textColor: "text-gray-800",
      borderColor: "border-green-300",
      scoreBoxBg: "bg-green-600",
      accentColor: "bg-green-500",
    };
  } else {
    return {
      bgColor: "bg-gradient-to-r from-gray-50 to-slate-100",
      textColor: "text-gray-800",
      borderColor: "border-gray-300",
      scoreBoxBg: "bg-gray-600",
      accentColor: "bg-gray-500",
    };
  }
};

export const getTeamStyle = (
  isHome: boolean,
  isFinished: boolean,
  home: ChampionshipMatchFirst
) => {
  if (!isFinished) return "";

  const homeScore = home.match_team_stats_our_score || 0;
  const awayScore = home.match_team_stats_other_score || 0;

  if (homeScore === awayScore) return "opacity-90"; // 무승부

  if (isHome) {
    return homeScore > awayScore ? "font-bold text-green-300" : "opacity-70";
  } else {
    return awayScore > homeScore ? "font-bold text-green-300" : "opacity-70";
  }
};
