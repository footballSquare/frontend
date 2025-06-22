import PlayerHistoryRow from "./ui/PlayerHistoryRow";

const TeamTable = (props: TeamTableProps) => {
  const { players, teamLabel, maxGoal, maxAssist, personEvidenceImage } = props;

  return (
    <div className="space-y-4 lg:space-y-4">
      <h3 className="text-xl font-bold text-gray-100 px-1 lg:text-lg lg:font-semibold lg:px-0">
        {teamLabel}
      </h3>

      <div className="overflow-x-auto rounded-lg border border-gray-700 lg:rounded-lg">
        <table className="min-w-full w-full">
          <thead className="bg-gray-800">
            <tr>
              {["선수", "포지션", "골", "어시"].map((h) => (
                <th
                  key={h}
                  className="px-3 py-4 text-base lg:px-4 lg:py-3 lg:text-sm font-semibold text-gray-100 text-center first:text-left lg:font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {players.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-3 py-6 text-center text-gray-400 text-base lg:px-4 lg:py-6 lg:text-base">
                  선수 정보가 없습니다.
                </td>
              </tr>
            ) : (
              players.map((player, index) => (
                <PlayerHistoryRow
                  key={player.match_player_stats_idx || index}
                  player={player}
                  maxGoal={maxGoal}
                  maxAssist={maxAssist}
                  personEvidenceImage={personEvidenceImage}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeamTable;
