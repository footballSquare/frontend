import useGetTeamHistory from "../../../../3_Entity/Team/useGetTeamHistory";

const HistoryList = () => {
  const [teamHistory] = useGetTeamHistory();
  return (
    <div className="flex flex-col items-start w-full">
      <h2 className="text-base font-semibold">팀 연혁</h2>
      <ul className="text-gray-600 text-xs">
        {teamHistory.slice(0, 5).map((history, index) => (
          <li key={"history-" + index}>{history.championship_list_name}</li>
        ))}
        {teamHistory.length > 5 && <li className="text-gray-500">...</li>}
      </ul>
    </div>
  );
};

export default HistoryList;
