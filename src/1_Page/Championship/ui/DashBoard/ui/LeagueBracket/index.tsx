import { useNavigate } from "react-router-dom";
import useToggleState from "../../../../../../4_Shared/model/useToggleState";

const LeagueBracket = (props: LeagueBracketProps) => {
  const { leagueData } = props;
  const navigate = useNavigate();
  const [showAllTeams, handleToggle] = useToggleState();

  return (
    /* 화면 전체가 어두운 배경을 갖도록 gray‑900 */
    <div className="bg-gray-900 rounded-xl overflow-x-auto">
      <table className="w-full border-collapse rounded-lg overflow-hidden min-w-[600px]">
        {/* 헤더: gray‑800 / 텍스트 gray‑100 */}
        <thead>
          <tr className="bg-gray-800 text-gray-100 text-left">
            {[
              "순위",
              "팀",
              "경기수",
              "승",
              "무",
              "패",
              "득점",
              "실점",
              "골득실",
              "포인트",
            ].map((h) => (
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
                className={`border-b ${
                  index % 2 === 0 ? "bg-gray-850" : "bg-gray-800"
                } hover:bg-gray-700 transition-colors duration-150`}>
                {/* 순위 배지: 상위 3위만 gray‑700 + text‑100, 그 외 gray‑600 + text‑200 */}
                <td className="px-6 py-4 text-center">
                  <span
                    className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold ${
                      index < 3
                        ? "bg-gray-700 text-gray-100"
                        : "bg-gray-600 text-gray-200"
                    }`}>
                    {index + 1}
                  </span>
                </td>

                {/* 팀명 */}
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

                {/* 스탯 열들 – text‑gray‑200 / 강조 색 제거 */}
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

                {/* 골득실 – 양수/음수 색 대신 흰색·회색으로만 구분 */}
                <td className="px-6 py-4 text-center font-semibold text-gray-100">
                  {team.goalDifference > 0 ? "+" : ""}
                  {team.goalDifference}
                </td>

                {/* 포인트 뱃지 – 테이블 유일한 세미‑강조: gray‑700 배경 */}
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

      {/* 더보기 버튼 – gray‑700 */}
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
