import { matchParticipation } from "../../../../../../4_Shared/constant/matchParticipation";
import { matchType } from "../../../../../../4_Shared/constant/matchType";
import apply_icon from "../../../../../../4_Shared/assets/svg/apply.svg";
import denied_icon from "../../../../../../4_Shared/assets/svg/denied.svg";
import { isPastTime } from "../../../../../../4_Shared/lib/timeChecker";
import useMatchModalStore from "../../../../../../4_Shared/zustand/useMatchModal";

const MatchCard = (props: MatchCardProps) => {
  const {
    match_match_idx,
    match_type_idx,
    team_list_idx,
    team_list_name,
    team_list_emblem,
    match_match_attribute,
    match_match_participation_type,
    player_list_idx,
    player_list_nickname,
    player_list_profile_image,
    match_match_start_time,
    common_status_idx,
    match_match_duration,
    observeRef,
  } = props;
  const { toggleMatchModal, setMatchIdx } = useMatchModalStore();
  if (match_match_attribute !== 0) return;
  return (
    <div
      ref={observeRef}
      className={`flex ${
        !isPastTime(match_match_start_time)
          ? "bg-white hover:bg-blue hover:text-white cursor-pointer"
          : "bg-gray"
      } items-center justify-between gap-6 duration-500 shadow-lg px-4 py-2 p text-xs`}
      onClick={() => {
        if (!isPastTime(match_match_start_time)) {
          toggleMatchModal();
          setMatchIdx(match_match_idx);
        }
      }}
    >
      <h3>{`> ${team_list_idx === null ? "공방게임" : "팀게임"}`}</h3>
      <h3>{`# ${matchParticipation[match_match_participation_type]}`}</h3>

      <div className=" font-semibold">
        <h5 className="text-sm">{`게임모드: [${matchType[match_type_idx]}]`}</h5>
        <h5 className="text-sm">{`매치시작시간: ${match_match_start_time}`}</h5>
        <h5 className="text-sm">{`예상 플레이 타임: ${match_match_duration.hours}시간 ${match_match_duration.minutes}분`}</h5>
      </div>

      <h4>{`주최자: ${player_list_nickname}`}</h4>
      <img
        src={`${common_status_idx === 0 ? apply_icon : denied_icon}`}
        alt="상태 아이콘"
      />
    </div>
  );
};
export default MatchCard;
