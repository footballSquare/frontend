import useGetTeamHistory from "../../../../3_Entity/Team/useGetTeamHistory";
import { utcFormatter } from "../../../../4_Shared/lib/utcFormatter";
import useParamInteger from "../../../../4_Shared/model/useParamInteger";

const HistoryListBox = () => {
  const teamIdx = useParamInteger("teamIdx");
  const [teamHistory] = useGetTeamHistory(teamIdx);

  return (
    <div className="w-full bg-gray-800 rounded-lg shadow-lg p-4">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
        팀 연혁
      </h3>
      {teamHistory.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-sm text-center">
          팀의 변동사항이 없습니다.
        </p>
      ) : (
        <ul className="divide-gray-600 max-h-[200px] overflow-y-auto">
          {teamHistory.slice(0, 5).map((history, index) => (
            <li key={index} className="py-2 flex items-center justify-between">
              <span className="font-medium text-gray-700 dark:text-gray-200">
                {history.team_list_name}
              </span>
              <span className="text-gray-500 dark:text-gray-400 text-xs">
                {utcFormatter(history.team_history_created_at)}
              </span>
            </li>
          ))}
        </ul>
      )}
      {teamHistory.length > 5 && (
        <p className="mt-2 text-center text-gray-500 dark:text-gray-400 text-sm">
          ...
        </p>
      )}
    </div>
  );
};

export default HistoryListBox;
