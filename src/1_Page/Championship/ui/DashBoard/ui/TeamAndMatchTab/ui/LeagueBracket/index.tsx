import { useNavigate } from "react-router-dom";
import useShowToggle from "./model/useShowToggle";

const LeagueBracket = (props: LeagueBracketProps) => {
  const { leagueData } = props;
  const navigate = useNavigate();
  const [showAllTeams, handleToggle] = useShowToggle();

  return (
    <div className="py-4 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl overflow-x-auto">
      <table className="w-full border-collapse rounded-lg overflow-hidden min-w-[600px]">
        <thead>
          <tr className="bg-gradient-to-r from-blue-700 to-blue-600 text-white text-left">
            <th className="px-6 py-4 font-semibold text-sm md:text-base">
              순위
            </th>
            <th className="px-6 py-4 font-semibold text-sm md:text-base">팀</th>
            <th className="px-6 py-4 font-semibold text-sm md:text-base">
              경기수
            </th>
            <th className="px-6 py-4 font-semibold text-sm md:text-base">승</th>
            <th className="px-6 py-4 font-semibold text-sm md:text-base">무</th>
            <th className="px-6 py-4 font-semibold text-sm md:text-base">패</th>
            <th className="px-6 py-4 font-semibold text-sm md:text-base">
              득점
            </th>
            <th className="px-6 py-4 font-semibold text-sm md:text-base">
              실점
            </th>
            <th className="px-6 py-4 font-semibold text-sm md:text-base">
              골득실
            </th>
            <th className="px-6 py-4 font-semibold text-sm md:text-base">
              포인트
            </th>
          </tr>
        </thead>
        <tbody>
          {(showAllTeams ? leagueData : leagueData.slice(0, 10)).map(
            (team, index) => (
              <tr
                key={team.team_list_idx}
                className={`border-b ${
                  index % 2 === 0 ? "bg-white" : "bg-slate-50"
                } hover:bg-blue-50 transition-colors duration-200`}>
                <td className="px-6 py-4 font-bold text-center">
                  <span
                    className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${
                      index < 3
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}>
                    {index + 1}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div
                    className="flex items-center gap-4 cursor-pointer"
                    onClick={() => navigate(`/team/${team.team_list_idx}`)}>
                    <div className="w-10 h-10 rounded-full bg-white p-1 shadow-sm flex items-center justify-center">
                      <img
                        src={team.team_list_emblem}
                        alt={team.team_list_name}
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                    <span className="font-medium">
                      {team.team_list_name.length < 12
                        ? team.team_list_name
                        : team.team_list_short_name}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">{team.matchesPlayed}</td>
                <td className="px-6 py-4 text-center text-green-600 font-medium">
                  {team.wins}
                </td>
                <td className="px-6 py-4 text-center text-gray-500">
                  {team.draws}
                </td>
                <td className="px-6 py-4 text-center text-red-500">
                  {team.losses}
                </td>
                <td className="px-6 py-4 text-center">{team.goalsFor}</td>
                <td className="px-6 py-4 text-center">{team.goalsAgainst}</td>
                <td className="px-6 py-4 text-center font-semibold">
                  <span
                    className={`${
                      team.goalDifference > 0
                        ? "text-green-600"
                        : team.goalDifference < 0
                        ? "text-red-500"
                        : "text-gray-500"
                    }`}>
                    {team.goalDifference > 0 ? "+" : ""}
                    {team.goalDifference}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
                    {team.points}
                  </span>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
      {leagueData.length > 10 && (
        <div className="text-center py-4">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
            onClick={handleToggle}>
            {showAllTeams ? "간략히 보기" : "더보기"}
          </button>
        </div>
      )}
    </div>
  );
};

export default LeagueBracket;
