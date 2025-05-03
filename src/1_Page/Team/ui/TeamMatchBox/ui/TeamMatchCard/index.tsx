import { matchAttribute } from "../../../../../../4_Shared/constant/matchAttribute";
import { matchParticipation } from "../../../../../../4_Shared/constant/matchParticipation";
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

  const isEndMatch = common_status_idx === 0;

  const playTime =
    `${match_match_duration.hours ? `${match_match_duration.hours}h ` : ""}${
      match_match_duration.minutes ? `${match_match_duration.minutes}m` : ""
    }`.trim() || "--";

  // 클릭 이벤트
  const handleClick = () => {
    if (!isEndMatch) return;
    setMatchIdx(match_match_idx);
    toggleMatchModal();
  };

  return (
    <div
      ref={observeRef}
      key={"matchcard-" + index}
      onClick={handleClick}
      style={isEndMatch ? {} : { cursor: "not-allowed" }}
      className="w-full rounded-2xl shadow-sm border border-gray-100 bg-white transition-all hover:shadow-lg hover:border-gray-300 hover:bg-gray-50">
      <div className="p-5 grid gap-4 sm:grid-cols-4">
        {/* 왼쪽(모바일 상단) 정보 */}
        <div className="sm:col-span-1 flex flex-col justify-center items-start">
          <p className="text-gray-900 text-base font-bold mb-1 break-words leading-snug">
            {team_list_name}
          </p>
          <p className="text-gray-600 text-sm font-medium mb-1 leading-tight">
            #{matchAttribute[match_match_attribute]}#{player_list_nickname}
          </p>
          <span
            className={`text-xs font-medium mb-1 ${
              match_match_participation_type === 0
                ? "text-red-500"
                : "text-green-500"
            }`}>
            {matchParticipation[match_match_participation_type]}
          </span>
          <span className="text-[11px] text-gray-400">
            경기 ID: {match_match_idx}
          </span>
        </div>

        {/* 중앙(모바일 두 번째) 정보 */}
        <div className="sm:col-span-2 flex flex-col justify-center">
          <p className="text-sm text-gray-500 mb-1">
            게임 모드:{" "}
            <span className="font-semibold text-gray-900">
              {match_type_idx === 0 ? "일반 경기" : "특별 경기"}
            </span>
          </p>
          <p className="text-sm text-gray-500 mb-1">
            매치 진행:{" "}
            <span className="font-semibold text-gray-900">
              {match_match_start_time}
            </span>
          </p>
          <p className="text-sm text-gray-500">
            예상 플레이 타임:{" "}
            <span className="font-semibold text-gray-900">{playTime}</span>
          </p>
        </div>

        {/* 오른쪽(모바일 맨 아래) 상태 아이콘 */}
        <div className="sm:col-span-1 flex items-center justify-end">
          <span
            className={`w-6 h-6 text-white text-xs flex items-center justify-center rounded-full font-bold shadow-md ${
              common_status_idx === 1 ? "bg-red-500" : "bg-blue-500"
            }`}>
            {common_status_idx === 1 ? "✗" : "✓"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TeamMatchCard;
