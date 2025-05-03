import { matchAttribute } from "../../../../../../4_Shared/constant/matchAttribute";
import { matchParticipation } from "../../../../../../4_Shared/constant/matchParticipation";
import { formatDateKoreanDate } from "../../../../../../4_Shared/lib/dateFormatter";
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
    index,
    common_status_idx,
  } = props;

  const { toggleMatchModal, setMatchIdx } = useMatchModalStore();
  const isNotEndMatch = common_status_idx === 0;

  return (
    <div
      ref={observeRef}
      key={`matchcard-${index}`}
      onClick={() => {
        if (!isNotEndMatch) return;
        setMatchIdx(match_match_idx);
        toggleMatchModal();
      }}
      className={`w-full border-l-4 ${
        isNotEndMatch
          ? "border-l-green-500 hover:bg-gray-50"
          : "border-l-red-500 cursor-not-allowed"
      } bg-white shadow-sm mb-2 transition-all`}>
      <div className="p-3 flex flex-col md:flex-row">
        {/* 왼쪽: 시간 정보 */}
        <div className="md:w-2/6 flex flex-col justify-center items-center md:items-start mb-2 md:mb-0 md:pr-3 border-r border-gray-100">
          <div className="text-sm font-medium text-gray-500">
            {formatDateKoreanDate(new Date(match_match_start_time))}
          </div>
          <div className="text-xs text-gray-500 mt-1">
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
        <div className="flex justify-center items-center md:w-3/6 flex-col  px-3">
          <div className="flex items-center">
            <div className="font-bold text-gray-900">{team_list_name}</div>
            <div className="ml-2 text-xs bg-gray-100 px-2 py-1 rounded">
              {match_type_idx === 0 ? "일반" : "특별"}
            </div>
          </div>

          <div className="flex items-center text-sm text-gray-600 mt-1">
            <span className="font-medium mr-2">
              #{matchAttribute[match_match_attribute]}
            </span>
            <span className="text-gray-500">#{player_list_nickname}</span>
          </div>

          <div
            className={`flex items-center text-xs ${
              match_match_participation_type === 0
                ? "text-red-500"
                : "text-green-500"
            } font-medium mt-1`}>
            {matchParticipation[match_match_participation_type]}
          </div>
        </div>

        {/* 오른쪽: 상태 및 ID 정보 */}
        <div className="md:w-1/6 flex flex-col md:flex-row justify-between items-center">
          <span className="text-xs text-gray-400 mb-1 md:mb-0">
            ID: {match_match_idx}
          </span>
          <span
            className={`text-xs font-bold px-2 py-1 rounded ${
              isNotEndMatch
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}>
            {isNotEndMatch ? "완료" : "진행중"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TeamMatchCard;
