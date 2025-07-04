import { matchAttribute } from "../../../../../../4_Shared/constant/matchAttribute";
import { matchParticipation } from "../../../../../../4_Shared/constant/matchParticipation";
import { useMyTeamIdx } from "../../../../../../4_Shared/lib/useMyInfo";
import { utcFormatter } from "../../../../../../4_Shared/lib/utcFormatter";
import useMatchModalStore from "../../../../../../4_Shared/zustand/useMatchModal";

const TeamMatchCard = (props: TeamMatchCardProps) => {
  const {
    match_match_attribute,
    player_list_nickname,
    team_list_name,
    match_match_participation_type,
    match_match_idx,
    match_type_idx,
    match_match_start_time,
    match_match_duration,
    observeRef,
    common_status_idx,
    team_list_idx,
  } = props;

  const { toggleMatchModal, setMatchIdx } = useMatchModalStore();
  const [myTeamIdx] = useMyTeamIdx();

  const isNotEndMatch = common_status_idx === 0;
  const isMyTeamMatch = myTeamIdx === team_list_idx;

  return (
    <div
      ref={observeRef}
      onClick={() => {
        if (!isMyTeamMatch) {
          alert("팀 소속이 아닙니다");
          return;
        }
        setMatchIdx(match_match_idx);
        toggleMatchModal();
      }}
      className={`w-full p-4 rounded-lg bg-gray-800 border transition-colors ${
        isNotEndMatch
          ? "border-green-500/30 hover:bg-gray-700 cursor-pointer"
          : "border-red-500/30 cursor-not-allowed opacity-75"
      }`}>
      <div className="flex items-center justify-between">
        {/* 왼쪽: 시간 및 기본 정보 */}
        <div className="flex flex-col">
          <div className="text-white font-medium text-sm mb-1">
            {utcFormatter(match_match_start_time)}
          </div>
          <div className="text-gray-400 text-xs">
            {`${
              match_match_duration.hours
                ? `${match_match_duration.hours}h `
                : ""
            }${
              match_match_duration.minutes
                ? `${match_match_duration.minutes}m`
                : ""
            }`.trim()}
          </div>
        </div>

        {/* 중앙: 팀 및 게임 정보 */}
        <div className="flex-1 mx-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-white font-medium">{team_list_name}</span>
            <span className="px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded">
              {match_type_idx === 0 ? "일반" : "특별"}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>#{matchAttribute[match_match_attribute]}</span>
            <span>•</span>
            <span>{player_list_nickname}</span>
          </div>

          <div className="mt-1">
            <span
              className={`text-xs font-medium ${
                match_match_participation_type === 0
                  ? "text-red-400"
                  : "text-green-400"
              }`}>
              {matchParticipation[match_match_participation_type]}
            </span>
          </div>
        </div>

        {/* 오른쪽: 상태 정보 */}
        <div className="flex flex-col items-end gap-1">
          <span
            className={`px-2 py-1 text-xs font-medium rounded ${
              isNotEndMatch
                ? "bg-green-600 text-white"
                : "bg-red-600 text-white"
            }`}>
            {isNotEndMatch ? "진행중" : "완료"}
          </span>
          <span className="text-xs text-gray-500">ID: {match_match_idx}</span>
        </div>
      </div>
    </div>
  );
};

export default TeamMatchCard;
