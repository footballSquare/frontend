import MemberCard from "./ui/PlayerRow";
import useGetPlayerStats from "../../../../../../3_Entity/Championship/useGetPlayerStats";
import useParamInteger from "../../../../../../4_Shared/model/useParamInteger";

const PlayerTab = () => {
  const championshipIdx = useParamInteger("championshipIdx");
  const [playerStats] = useGetPlayerStats(championshipIdx);

  return (
    <div className="w-full mx-auto">
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-4 rounded-t-lg shadow-md">
        <h2 className="text-white font-bold text-lg md:text-xl">선수 통계</h2>
        <p className="text-blue-100 text-xs md:text-sm">
          클릭하여 선수 프로필을 확인하세요
        </p>
      </div>

      <div className="rounded-b-lg shadow-lg border border-gray-200 overflow-x-auto">
        <table className="w-full bg-white min-w-[600px]">
          {/* 헤더 */}
          <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs">
            <tr>
              <th className="px-2 py-2 text-left font-semibold w-1/6">선수</th>
              <th className="px-2 py-2 w-1/12 font-semibold">득점</th>
              <th className="px-2 py-2 w-1/12 font-semibold">어시스트</th>
              <th className="px-2 py-2 w-1/12 font-semibold">패스</th>
              <th className="px-2 py-2 w-1/12 font-semibold">드리블</th>
              <th className="px-2 py-2 w-1/12 font-semibold">태클</th>
              <th className="px-2 py-2 w-1/12 font-semibold">점유율</th>
              <th className="px-2 py-2 w-1/6 font-semibold">증거</th>
            </tr>
          </thead>

          <tbody>
            {playerStats.length === 0 && (
              <tr>
                <td colSpan={8} className="py-4 text-gray-500">
                  선수 통계가 없습니다.
                </td>
              </tr>
            )}
            {playerStats.map((player, index) => (
              <MemberCard player={player} index={index} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlayerTab;
