import useGetTeamHistory from "../../../../3_Entity/Team/useGetTeamHistory";
import { formatDateKoreanDate } from "../../../../4_Shared/lib/dateFormatter";
import useParamInteger from "../../../../4_Shared/model/useParamInteger";

const HistoryListBox = () => {
  const teamIdx = useParamInteger("teamIdx");
  const [teamHistory] = useGetTeamHistory(teamIdx);

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">대회 이력</h3>
      {teamHistory.length === 0 ? (
        <p className="text-gray-500 text-sm text-center">
          팀의 대회 이력이 없습니다.
        </p>
      ) : (
        <ul className="divide-y divide-gray-200 max-h-[200px] overflow-y-auto">
          {teamHistory.slice(0, 5).map((history, index) => (
            <li key={index} className="py-2 flex items-center justify-between">
              <span className="font-medium text-gray-700">
                {history.team_list_name}
              </span>
              <span className="text-gray-500 text-xs">
                {formatDateKoreanDate(
                  new Date(history.team_history_created_at)
                )}
              </span>
            </li>
          ))}
        </ul>
      )}
      {teamHistory.length > 5 && (
        <p className="mt-2 text-center text-gray-500 text-sm">...</p>
      )}
    </div>
  );
};

export default HistoryListBox;
