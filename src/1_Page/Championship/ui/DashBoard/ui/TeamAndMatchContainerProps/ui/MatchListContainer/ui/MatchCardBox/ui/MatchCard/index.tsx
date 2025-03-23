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
      className={`flex flex-col w-[90%] rounded-lg p-4 shadow-lg transition-transform transform hover:scale-[1.03]
    ${
      isFinished
        ? "bg-gray-600 text-white hover:bg-gray-700"
        : "bg-white text-gray-800 hover:bg-gray-100"
    }
    ${isSelected ? "border-4 border-blue-600 bg-blue-100 shadow-xl" : ""}`}>
      {/* 팀 명 및 점수 */}
      <div className="flex items-center justify-between w-full">
        <span className="font-medium w-[40%] overflow-hidden text-ellipsis whitespace-nowrap text-left">
          {home.team_list_name.length < 10
            ? home.team_list_name
            : home.team_list_short_name}
        </span>
        <span
          className={`mx-2 px-4 py-1 rounded-full font-bold border flex-grow-0 flex-shrink-0 text-center w-[80px]
    ${
      isFinished
        ? "border-white bg-gray-700 text-white"
        : "border-gray-400 bg-gray-100 text-black"
    }`}>
          {home.match_team_stats_our_score} - {away.match_team_stats_our_score}
        </span>
        <span className="font-medium w-[40%] overflow-hidden text-ellipsis whitespace-nowrap text-right">
          {away.team_list_name.length < 10
            ? away.team_list_name
            : away.team_list_short_name}
        </span>
      </div>

      {/* 상태 표시 */}
      <p
        className={`mt-2 text-sm font-semibold text-center
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
