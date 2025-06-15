import PlayerHistoryRow from "./ui/PlayerHistoryRow";

const TeamTable = (props: TeamTableProps) => {
  const { players, teamLabel, maxGoal, maxAssist, personEvidenceImage } = props;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-100">{teamLabel}</h3>

      <div className="overflow-hidden rounded-lg border border-gray-700">
        <table className="w-full">
          <thead className="bg-gray-800">
            <tr>
              {["선수", "포지션", "골", "어시"].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-sm font-medium text-gray-100 text-center first:text-left">
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {players.map((p, index) => (
              <PlayerHistoryRow
                key={p.match_player_stats_idx || index}
                p={p}
                maxGoal={maxGoal}
                maxAssist={maxAssist}
                personEvidenceImage={personEvidenceImage}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeamTable;
