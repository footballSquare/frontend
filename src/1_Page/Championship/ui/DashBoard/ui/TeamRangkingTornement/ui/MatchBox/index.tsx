const MatchBox = (props: MatchBoxProps) => {
  const { match } = props;

  const team1Score = match.championship_match_first.match_team_stats_our_score;
  const team2Score = match.championship_match_second.match_team_stats_our_score;
  const team1Won = team1Score > team2Score;
  const team2Won = team2Score > team1Score;

  // 경기 상태 (예: common_status_idx=4가 종료)
  const isFinished =
    match.championship_match_first.common_status_idx === 4 ||
    match.championship_match_second.common_status_idx === 4;

  return (
    <div key={match.championship_match_idx} className="relative">
      {/* 현재 라운드 매치카드 */}
      <div className="border border-gray-200 rounded-lg overflow-hidden shadow-md bg-white">
        <div className="bg-gray-100 px-4 py-2 flex justify-between items-center border-b">
          <span className="text-sm font-medium text-gray-600">
            매치 {match.championship_match_idx}
          </span>
          <span
            className={`px-2 py-1 text-xs rounded-full ${
              isFinished
                ? "bg-blue-100 text-blue-700"
                : "bg-amber-100 text-green-700"
            }`}>
            {isFinished ? "종료" : "진행 예정"}
          </span>
        </div>

        {/* 팀 1 */}
        <div
          className={`p-3 flex items-center ${
            team1Won && isFinished ? "bg-blue-50" : ""
          }`}>
          <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center p-1 mr-3">
            <img
              src={match.championship_match_first.team_list_emblem}
              alt={match.championship_match_first.team_list_name}
              className="w-8 h-8 object-contain"
            />
          </div>
          <div className="flex-grow">
            <span
              className={`font-medium ${
                team1Won && isFinished ? "font-bold" : ""
              }`}
              style={{
                color:
                  match.championship_match_first.team_list_color || "inherit",
              }}>
              {match.championship_match_first.team_list_short_name}
            </span>
          </div>
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full ${
              team1Won && isFinished
                ? "bg-blue-600 text-white font-bold"
                : "bg-gray-100"
            }`}>
            {team1Score}
          </div>
        </div>

        {/* 구분선 */}
        <div className="border-t border-gray-200"></div>

        {/* 팀 2 */}
        <div
          className={`p-3 flex items-center ${
            team2Won && isFinished ? "bg-blue-50" : ""
          }`}>
          <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center p-1 mr-3">
            <img
              src={match.championship_match_second.team_list_emblem}
              alt={match.championship_match_second.team_list_name}
              className="w-8 h-8 object-contain"
            />
          </div>
          <div className="flex-grow">
            <span
              className={`font-medium ${
                team2Won && isFinished ? "font-bold" : ""
              }`}
              style={{
                color:
                  match.championship_match_second.team_list_color || "inherit",
              }}>
              {match.championship_match_second.team_list_short_name}
            </span>
          </div>
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full ${
              team2Won && isFinished
                ? "bg-blue-600 text-white font-bold"
                : "bg-gray-100"
            }`}>
            {team2Score}
          </div>
        </div>
      </div>
    </div>
  );
};
export default MatchBox;
