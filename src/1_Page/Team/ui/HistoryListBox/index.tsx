import useGetTeamHistory from "../../../../3_Entity/Team/useGetTeamHistory";
import { formatDateKoreanDate } from "../../../../4_Shared/lib/dateFormatter";
import useParamInteger from "../../../../4_Shared/model/useParamInteger";

const HistoryListBox = () => {
  const teamIdx = useParamInteger("teamIdx");
  const [teamHistory] = useGetTeamHistory(teamIdx);

  return (
    <ul className="text-gray-600 text-xs max-h-[150px] overflow-y-scroll pr-2">
      {teamHistory.length === 0 ? (
        <li>팀의 대회 이력이 없습니다.</li>
      ) : (
        teamHistory.slice(0, 5).map((history, index) => (
          <div className="" key={"team-list-ul" + index}>
            <li key={"history-list" + index}>{history.team_list_name}</li>
            <li key={"history-" + index}>
              {formatDateKoreanDate(new Date(history.team_history_created_at))}
            </li>
          </div>
        ))
      )}
      {teamHistory.length > 5 && <li className="text-gray-500">...</li>}
    </ul>
  );
};

export default HistoryListBox;
