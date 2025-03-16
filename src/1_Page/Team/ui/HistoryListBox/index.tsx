import { HistoryListBoxProps } from "./type";
import useGetTeamHistory from "../../../../3_Entity/Team/useGetTeamHistory";

const HistoryListBox = (props: HistoryListBoxProps) => {
  const { team_list_idx } = props;
  const [teamHistory] = useGetTeamHistory(team_list_idx);
  return (
    <ul className="text-gray-600 text-xs">
      {teamHistory.slice(0, 5).map((history, index) => (
        <li key={"history-" + index}>{history.championship_list_name}</li>
      ))}
      {teamHistory.length > 5 && <li className="text-gray-500">...</li>}
    </ul>
  );
};

export default HistoryListBox;
