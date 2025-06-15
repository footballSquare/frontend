import React from "react";
import PlayerDetailRow from "./ui/PlayerDetailRow";
import { getPositionColor } from "../../../../../../../../../../../../4_Shared/lib/getPositionColor";
import { matchPosition } from "../../../../../../../../../../../../4_Shared/constant/matchPosition";
import useToggleState from "../../../../../../../../../../../../4_Shared/model/useToggleState";
import { useMyUserIdx } from "../../../../../../../../../../../../4_Shared/lib/useMyInfo";

const PlayerHistoryRow = (props: PlayerHistoryRowProps) => {
  const { p, maxGoal, maxAssist } = props;

  const [myUserIdx] = useMyUserIdx();
  const isMine = p.player_list_idx === myUserIdx;
  const [isExpanded, toggleIsExpanded] = useToggleState();

  const goals = p.match_player_stats_goal ?? 0;
  const assists = p.match_player_stats_assist ?? 0;
  const highlight = goals === maxGoal || assists === maxAssist;

  return (
    <React.Fragment key={p.player_list_idx}>
      <tr
        onClick={toggleIsExpanded}
        className={`cursor-pointer hover:bg-grass/10 ${
          highlight ? "ring-2 ring-grass" : ""
        }`}>
        <td className="px-4 py-3 font-medium text-gray-100">
          {p.player_list_nickname}
          {isMine && (
            <span className="ml-2 text-xs text-grass font-semibold">(나)</span>
          )}
        </td>
        <td className="px-4 py-3">
          <span
            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium`}
            style={{
              color: getPositionColor(p.match_position_idx),
            }}>
            {matchPosition[p.match_position_idx]}
          </span>
          {}
        </td>
        <td className="px-4 py-3 text-center text-gray-100">{goals}</td>
        <td className="px-4 py-3 text-center text-gray-100">{assists}</td>
      </tr>

      {isExpanded && <PlayerDetailRow player={p} isMine={isMine} />}
    </React.Fragment>
  );
};

export default PlayerHistoryRow;
