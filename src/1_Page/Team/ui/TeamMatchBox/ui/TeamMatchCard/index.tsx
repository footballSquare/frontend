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
      className={`w-full border-l-4 ${
        isNotEndMatch
          ? "border-l-emerald-500 hover:bg-gray-900"
          : "border-l-red-600 cursor-not-allowed"
      } bg-gray-800 shadow-md mb-3 transition-all rounded-r`}>
      <div className="p-4 flex flex-col md:flex-row">
        {/* 왼쪽: 시간 정보 */}
        <div className="md:w-2/6 flex flex-col justify-center items-center md:items-start mb-2 md:mb-0 md:pr-3 border-r border-gray-700">
          <div className="text-sm font-medium text-gray-300">
            {utcFormatter(match_match_start_time)}
          </div>
          <div className="text-xs text-gray-400 mt-1">
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
        <div className="flex justify-center items-center md:w-3/6 flex-col px-3">
          <div className="flex items-center">
            <div className="font-bold text-gray-200">{team_list_name}</div>
            <div className="ml-2 text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">
              {match_type_idx === 0 ? "일반" : "특별"}
            </div>
          </div>

          <div className="flex items-center text-sm text-gray-400 mt-1">
            <span className="font-medium mr-2 text-gray-300">
              #{matchAttribute[match_match_attribute]}
            </span>
            <span className="text-gray-400">#{player_list_nickname}</span>
          </div>

          <div
            className={`flex items-center text-xs ${
              match_match_participation_type === 0
                ? "text-red-400"
                : "text-emerald-400"
            } font-medium mt-1`}>
            {matchParticipation[match_match_participation_type]}
          </div>
        </div>

        {/* 오른쪽: 상태 및 ID 정보 */}
        <div className="md:w-1/6 flex flex-col md:flex-row justify-between items-center">
          <span className="text-xs text-gray-500 mb-1 md:mb-0">
            ID: {match_match_idx}
          </span>
          <span
            className={`text-xs font-bold px-2 py-1 rounded ${
              isNotEndMatch
                ? "bg-emerald-600 text-gray-100"
                : "bg-red-700 text-gray-100"
            }`}>
            {isNotEndMatch ? "완료" : "진행중"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TeamMatchCard;
