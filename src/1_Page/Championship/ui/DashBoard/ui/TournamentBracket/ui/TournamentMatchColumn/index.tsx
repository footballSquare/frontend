import defaultTeamImg from "../../../../../../../../4_Shared/assets/svg/team.svg";
import { useChampionshipContextInfo } from "../../../../../../model/useChampionshipContext";
import { getTextColorFromBackground } from "../../../../../../../../4_Shared/lib/colorChecker";

const TournamentMatchColumn = (props: TournamentMatchColumnProps) => {
  const { match } = props;

  const team1Score =
    match.championship_match_first.match_team_stats_our_score || 0;
  const team2Score =
    match.championship_match_second.match_team_stats_our_score || 0;

  const team1Won = team1Score > team2Score;
  const team2Won = team2Score > team1Score;

  // 경기 상태 (예: common_status_idx=4가 종료)
  const isFinished =
    match.championship_match_first.common_status_idx === 4 ||
    match.championship_match_second.common_status_idx === 4;

  const { championship_list_color } = useChampionshipContextInfo();
  const textColor = getTextColorFromBackground(championship_list_color);

  return (
    <div className="relative">
      {/* 현재 라운드 매치카드 */}
      <div className="border border-gray-600 rounded-lg overflow-hidden shadow-md text-gray-100">
        <div className="px-4 py-2 flex justify-between items-center bg-gray-700">
          <span className="text-sm font-medium">{`매치 ${match.championship_match_idx}`}</span>
          <span
            className="px-2 py-1 text-xs rounded-full"
            style={{
              backgroundColor: isFinished
                ? championship_list_color
                : `${textColor}33`,
              color: isFinished ? textColor : championship_list_color,
            }}>
            {isFinished ? "종료" : "진행 예정"}
          </span>
        </div>

        {/* 팀 1 */}
        <div
          className="p-3 flex items-center"
          style={{
            backgroundColor:
              team1Won && isFinished
                ? `${championship_list_color}33`
                : "#1F2937", // Tailwind gray‑800 to guarantee readability
          }}>
          <div className="w-10 h-10 rounded-full shadow-sm flex items-center justify-center p-1 mr-3">
            <img
              src={
                match.championship_match_first.team_list_emblem ||
                defaultTeamImg
              }
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
              {match.championship_match_first.team_list_name}
            </span>
          </div>
          <div
            className="w-8 h-8 flex items-center justify-center rounded-full font-bold"
            style={{
              backgroundColor: team1Won ? championship_list_color : "#374151", // Tailwind gray-700
              color: team1Won && isFinished ? textColor : "#f3f4f6", // Tailwind gray-100
            }}>
            {team1Score}
          </div>
        </div>

        {/* 구분선 */}
        <div className="border-t border-gray-200"></div>

        {/* 팀 2 */}
        <div
          className="p-3 flex items-center"
          style={{
            backgroundColor: team2Won
              ? `${championship_list_color}33`
              : "#1F2937",
          }}>
          <div className="w-10 h-10 rounded-full shadow-sm flex items-center justify-center p-1 mr-3">
            <img
              src={
                match.championship_match_second.team_list_emblem ||
                defaultTeamImg
              }
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
              {match.championship_match_second.team_list_name}
            </span>
          </div>
          <div
            className="w-8 h-8 flex items-center justify-center rounded-full font-bold"
            style={{
              backgroundColor:
                team2Won && isFinished ? championship_list_color : "#374151", // Tailwind gray-700
              color: team2Won && isFinished ? textColor : "#f3f4f6", // Tailwind gray-100
            }}>
            {team2Score}
          </div>
        </div>
      </div>
    </div>
  );
};
export default TournamentMatchColumn;
