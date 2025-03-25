import { matchState } from "../../../../../../../../../../../../4_Shared/constant/matchState";

const MatchCard = (props: MatchCardProps) => {
  const { match, index, selectedIdx, handleSelect } = props;
  const home = match.championship_match_first;
  const away = match.championship_match_second;
  const status = matchState[home.common_status_idx] || "";

  // 경기 종료 여부 (common_status_idx === 4)
  const isFinished = home.common_status_idx === 4;
  const isSelected = selectedIdx === match.championship_match_idx;

  return (
    <li
      onClick={() => handleSelect(match.championship_match_idx)}
      key={`match-list-${index}`}
      className={`flex flex-col min-w-[200px] w-auto sm:w-[95%] sm:p-2 p-2 rounded-lg shadow-lg transition-transform transform hover:scale-[1.03]
    ${
      isFinished
        ? "bg-gray-600 text-white hover:bg-gray-700"
        : "bg-white text-gray-800 hover:bg-gray-100"
    }
    ${isSelected ? "border-4 border-blue-600 bg-blue-100 shadow-xl" : ""}`}>
      {/* 팀 명 및 점수 */}
      <div className="flex items-center justify-between w-full">
        <span className="font-medium w-[40%] overflow-hidden text-ellipsis whitespace-nowrap text-left hidden sm:inline sm:text-xs text-[10px]">
          {home.team_list_name}
        </span>
        <span className="font-medium w-[40%] overflow-hidden text-ellipsis whitespace-nowrap text-left inline sm:hidden sm:text-xs text-[10px]">
          {home.team_list_short_name}
        </span>
        <span
          className={`mx-2 px-2 py-1 rounded-full font-bold border flex-grow-0 flex-shrink-0 text-center w-[50px] sm:w-[50px] sm:px-1 sm:py-0.5 text-xs sm:text-[10px]
    ${
      isFinished
        ? "border-white bg-gray-700 text-white"
        : "border-gray-400 bg-gray-100 text-black"
    }`}>
          {home.match_team_stats_our_score} - {away.match_team_stats_our_score}
        </span>
        <span className="font-medium w-[40%] overflow-hidden text-ellipsis whitespace-nowrap text-right hidden sm:inline sm:text-xs text-[10px]">
          {away.team_list_name}
        </span>
        <span className="font-medium w-[40%] overflow-hidden text-ellipsis whitespace-nowrap text-right inline sm:hidden sm:text-xs text-[10px]">
          {away.team_list_short_name}
        </span>
      </div>

      {/* 상태 표시 */}
      <p
        className={`mt-1 text-xs sm:text-[10px] font-semibold text-center
          ${
            home.common_status_idx === 0
              ? "text-green-600"
              : home.common_status_idx === 3
              ? "text-blue-600"
              : home.common_status_idx === 4
              ? "text-red-500"
              : "text-gray-600"
          }`}>
        {status}
      </p>
    </li>
  );
};

export default MatchCard;
