import { matchState } from "../../../../../../../../4_Shared/constant/matchState";

const MatchCard = (props: MatchCardProps) => {
  const { match, index } = props;
  const home = match.championship_match_first;
  const away = match.championship_match_second;
  const status = matchState[home.common_status_idx] || "";

  return (
    <li
      key={`match-list-${index}`}
      className={`flex flex-col w-[90%] rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105 ${
        home.common_status_idx === 4
          ? "bg-gray-600 text-white hover:bg-gray-700"
          : "bg-white text-black hover:bg-gray-300"
      }`}>
      {/* 팀 및 점수 표시 */}
      <div className="flex items-center justify-between">
        <span className="font-medium">{home.team_list_short_name}</span>

        <span
          className={`mx-2 px-4 py-1 rounded-full font-bold border ${
            home.common_status_idx === 4
              ? "border-white bg-gray-700 text-white"
              : "border-gray-400 bg-gray-100 text-black"
          }`}>
          {home.match_team_stats_our_score} - {away.match_team_stats_our_score}
        </span>

        <span className="font-medium">{away.team_list_short_name}</span>
      </div>

      {/* 상태 표시 */}
      <p
        className={`mt-2 text-sm font-semibold text-center transition-opacity ${
          home.common_status_idx === 0
            ? "text-green-600"
            : home.common_status_idx === 3
            ? "text-blue-600"
            : home.common_status_idx === 4
            ? "text-red-600"
            : "text-black"
        }`}>
        {status}
      </p>
    </li>
  );
};

export default MatchCard;
