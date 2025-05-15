import { useNavigate } from "react-router-dom";
import useToggleState from "../../../../../../4_Shared/model/useToggleState";
import { headerList } from "./constant/header";

const LeagueBracket = (props: LeagueBracketProps) => {
  const { leagueData } = props;
  const navigate = useNavigate();
  const [showAllTeams, handleToggle] = useToggleState();

  return (
    /* 전체 배경 */
    <div className="bg-gray-900 rounded-xl overflow-x-auto">
      <table className="w-full border-collapse rounded-lg overflow-hidden min-w-[600px]">
        {/* 헤더 */}
        <thead>
          <tr className="bg-gray-800 text-gray-100 text-left">
            {headerList.map((h) => (
              <th
                key={h}
                className="px-6 py-4 font-semibold text-sm md:text-base">
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
                className="border-b bg-gray-800 hover:bg-gray-700 transition-colors duration-150">
                {/* 순위 배지 – 색상 고정 */}
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full font-bold bg-gray-600 text-gray-200">
                    {index + 1}
                  </span>
                </td>

                {/* 팀명 + 팀 컬러 점 */}
                <td className="px-6 py-4">
                  <div
                    className="flex items-center gap-4 cursor-pointer"
                    onClick={() => navigate(`/team/${team.team_list_idx}`)}>
                    <div className="w-10 h-10 rounded-full bg-gray-700 p-1 shadow-sm flex items-center justify-center">
                      <img
                        src={team.team_list_emblem}
                        alt={team.team_list_name}
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                    <span
                      className="inline-block w-3 h-3 rounded-full"
                      style={{
                        backgroundColor: team.team_list_color || "#ffffff",
                      }}></span>
                    <span className="font-medium text-gray-100">
                      {team.team_list_name.length < 12
                        ? team.team_list_name
                        : team.team_list_short_name}
                    </span>
                  </div>
                </td>

                {/* 스탯 열 – 통일된 색상 */}
                <td className="px-6 py-4 text-center text-gray-200">
                  {team.matchesPlayed}
                </td>
                <td className="px-6 py-4 text-center text-gray-200">
                  {team.wins}
                </td>
                <td className="px-6 py-4 text-center text-gray-200">
                  {team.draws}
                </td>
                <td className="px-6 py-4 text-center text-gray-200">
                  {team.losses}
                </td>
                <td className="px-6 py-4 text-center text-gray-200">
                  {team.goalsFor}
                </td>
                <td className="px-6 py-4 text-center text-gray-200">
                  {team.goalsAgainst}
                </td>

                {/* 골득실 */}
                <td className="px-6 py-4 text-center font-semibold text-gray-100">
                  {team.goalDifference > 0 ? "+" : ""}
                  {team.goalDifference}
                </td>

                {/* 포인트 뱃지 – 살짝 강조 */}
                <td className="px-6 py-4 text-center">
                  <span className="font-bold text-gray-100 bg-gray-700 px-3 py-1 rounded-full">
                    {team.points}
                  </span>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>

      {/* 더보기 버튼 */}
      {leagueData.length > 10 && (
        <div className="text-center py-4">
          <button
            className="bg-gray-700 text-gray-100 px-4 py-2 rounded-full hover:bg-gray-600 transition"
            onClick={handleToggle}>
            {showAllTeams ? "간략히 보기" : "더보기"}
          </button>
        </div>
      )}
    </div>
  );
};

export default LeagueBracket;
