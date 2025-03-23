import useGetPlayerStats from "../../../../../../3_Entity/Championship/useGetPlayerStats";
import { ParticipationMembersProps } from "./type";

const PlayerStatsTable = (props: ParticipationMembersProps) => {
  const { championshipIdx } = props;
  const [playerStats] = useGetPlayerStats(championshipIdx);
  return (
    <div className="overflow-x-auto w-full max-w-[900px] mx-auto md:w-[95%]">
      <table className="w-full bg-white border border-gray-300 shadow-sm rounded-lg">
        {/* 헤더 */}
        <thead className="bg-blue-600 text-white border-b border-blue-400 text-[10px] md:text-xs">
          <tr>
            <th className="px-2 py-2 text-left font-semibold border border-blue-400 w-1/6">
              선수
            </th>
            <th className="px-2 py-2 border border-blue-400 w-1/12">득점</th>
            <th className="px-2 py-2 border border-blue-400 w-1/12">
              어시스트
            </th>
            <th className="px-2 py-2 border border-blue-400 w-1/12">패스%</th>
            <th className="px-2 py-2 border border-blue-400 w-1/12">드리블%</th>
            <th className="px-2 py-2 border border-blue-400 w-1/12">태클%</th>
            <th className="px-2 py-2 border border-blue-400 w-1/12">점유율</th>
            <th className="px-2 py-2 border border-blue-400 w-1/6">증거</th>
          </tr>
        </thead>

        <tbody>
          {playerStats.map((player, index) => (
            <tr
              key={index}
              className={`text-center transition duration-200 hover:bg-blue-100 ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              } text-[10px] md:text-xs border-t border-blue-400`}>
              <td className="px-2 py-2 text-left font-semibold flex flex-col items-center border border-blue-400">
                <img
                  src={player.match_player_stats_evidence_img}
                  alt="Player"
                  className="w-6 h-6 md:w-8 md:h-8 rounded-full shadow-sm"
                />
                <span className="text-blue-800">
                  {player.player_list_nickname}
                </span>
              </td>
              <td className="px-2 py-2 border border-blue-400 text-blue-800 font-semibold">
                {player.match_player_stats_goal}
              </td>
              <td className="px-2 py-2 border border-blue-400 text-blue-800 font-semibold">
                {player.match_player_stats_assist}
              </td>
              <td className="px-2 py-2 border border-blue-400">
                {player.match_player_stats_successrate_pass}%
              </td>
              <td className="px-2 py-2 border border-blue-400">
                {player.match_player_stats_successrate_dribble}%
              </td>
              <td className="px-2 py-2 border border-blue-400">
                {player.match_player_stats_successrate_tackle}%
              </td>
              <td className="px-2 py-2 border border-blue-400 font-semibold">
                {player.match_player_stats_possession}%
              </td>
              <td className="px-2 py-2 border border-blue-400">
                <img
                  src={player.match_player_stats_evidence_img}
                  alt="증거 이미지"
                  className="w-8 h-8 md:w-12 md:h-12 rounded-lg shadow-sm border border-blue-400"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayerStatsTable;
