import { useNavigate } from "react-router-dom";
import { headerList } from "./constant/header";
import DefaultTeamEmblem from "../../../../../../../../4_Shared/components/DefaultTeamEmblem";
import useToggleState from "../../../../../../../../4_Shared/model/useToggleState";

const LeagueBracket = (props: LeagueBracketProps) => {
  const { leagueData } = props;
  const navigate = useNavigate();
  const [showAllTeams, handleToggle] = useToggleState();

  if (!leagueData || leagueData.length === 0) {
    return (
      <div className="text-gray-100 text-center p-6">
        현재 리그 데이터가 없습니다.
      </div>
    );
  }

  return (
    <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-lg overflow-hidden shadow-lg">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-[700px]">
          {/* 헤더 */}
          <thead>
            <tr className="bg-gray-800/90 text-gray-100">
              {headerList.map((h, index) => (
                <th
                  key={h}
                  className={`px-4 py-3 font-semibold text-sm border-b border-gray-600/50 
                    ${index === 0 ? "text-center" : "text-left"}
                    ${index === headerList.length - 1 ? "text-center" : ""}
                    ${index === headerList.length - 2 ? "text-center" : ""}
                  `}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {(showAllTeams ? leagueData : leagueData.slice(0, 10)).map(
              (team, index) => (
                <tr
                  key={team.team_list_idx}
                  className={`border-b border-gray-700/40 transition-all duration-200 hover:bg-gray-800/50 group
                    ${index < 3 ? "bg-gray-800/30" : "bg-gray-800/20"}
                  `}>
                  {/* 순위 */}
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm transition-all duration-200
                        ${
                          index === 0
                            ? "bg-yellow-500/90 text-gray-900"
                            : index === 1
                            ? "bg-gray-400/90 text-gray-900"
                            : index === 2
                            ? "bg-amber-600/90 text-white"
                            : "bg-gray-600/90 text-gray-100"
                        }`}>
                      {index + 1}
                    </span>
                  </td>

                  {/* 팀명 */}
                  <td className="px-4 py-3">
                    <div
                      className="flex items-center gap-3 cursor-pointer group/team transition-all duration-200"
                      onClick={() => navigate(`/team/${team.team_list_idx}`)}>
                      {team.team_list_emblem ? (
                        <img
                          src={team.team_list_emblem}
                          alt={team.team_list_name}
                          className="w-10 h-10 object-cover rounded-full border-2 shadow-sm transition-all duration-200"
                          style={{ borderColor: team.team_list_color }}
                        />
                      ) : (
                        <div className="w-10 h-10 flex items-center justify-center rounded-full">
                          <DefaultTeamEmblem
                            text={team.team_list_short_name}
                            bgColor={team.team_list_color}
                          />
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{
                            backgroundColor: team.team_list_color || "#ffffff",
                          }}
                        />
                        <span className="font-medium text-gray-100 truncate max-w-[140px] group-hover/team:text-grass transition-colors">
                          {team.team_list_name.length < 12
                            ? team.team_list_name
                            : team.team_list_short_name}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* 스탯 열 */}
                  <td className="px-4 py-3 text-center text-gray-200 font-medium">
                    {team.matchesPlayed}
                  </td>
                  <td className="px-4 py-3 text-center text-gray-200 font-medium">
                    {team.wins}
                  </td>
                  <td className="px-4 py-3 text-center text-gray-200 font-medium">
                    {team.draws}
                  </td>
                  <td className="px-4 py-3 text-center text-gray-200 font-medium">
                    {team.losses}
                  </td>
                  <td className="px-4 py-3 text-center text-gray-200 font-medium">
                    {team.goalsFor}
                  </td>
                  <td className="px-4 py-3 text-center text-gray-200 font-medium">
                    {team.goalsAgainst}
                  </td>

                  {/* 골득실 */}
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`font-bold ${
                        team.goalDifference > 0
                          ? "text-green-400"
                          : team.goalDifference < 0
                          ? "text-red-400"
                          : "text-gray-300"
                      }`}>
                      {team.goalDifference > 0 ? "+" : ""}
                      {team.goalDifference}
                    </span>
                  </td>

                  {/* 포인트 */}
                  <td className="px-4 py-3 text-center">
                    <span className="font-bold text-grass bg-grass/20 px-3 py-1 rounded-md">
                      {team.points}
                    </span>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      {/* 더보기 버튼 */}
      {leagueData.length > 10 && (
        <div className="text-center py-4 border-t border-gray-700/50">
          <button
            className="bg-grass/90 text-white px-4 py-2 rounded-lg font-medium hover:bg-grass transition-all duration-200"
            onClick={handleToggle}>
            {showAllTeams ? "간략히 보기" : "전체 보기"}
          </button>
        </div>
      )}
    </div>
  );
};

export default LeagueBracket;
