import { matchParticipation } from "../../../../../../4_Shared/constant/matchParticipation";
import { matchType } from "../../../../../../4_Shared/constant/matchType";
import { MatchCardProps } from "./type";
import apply_icon from "../../../../../../4_Shared/assets/svg/apply.svg";
import denied_icon from "../../../../../../4_Shared/assets/svg/denied.svg";

const MatchCard = (props: MatchCardProps) => {
  const {
    match_match_idx,
    match_type_idx,
    team_list_idx, // 없으면 공방게임, 있으면 팀게임
    match_match_attribute, // 공개 비공개 대회..
    match_match_participation_type,
    player_list_nickname,
    match_match_start_time,
    match_match_duration,
    common_status_idx,
    observeRef,
  } = props;

  return (
    <div ref={observeRef} className="flex items-center justify-between cursor-pointer gap-6 bg-white duration-500 shadow-lg px-4 py-2 p text-xs hover:bg-blue hover:text-white">
      <h3>{`> ${team_list_idx === null ? "공방게임" : "팀게임"}`}</h3>
      <h3>{`# ${matchParticipation[match_match_participation_type]}`}</h3>

      <div className=" font-semibold">
        <h5 className="text-sm">{`게임모드: [${matchType[match_type_idx]}]`}</h5>
        <h5 className="text-sm">{`매치시작시간: ${match_match_start_time}`}</h5>
        <h5 className="text-sm">{`예상 플레이 타임: ${match_match_duration}`}</h5>
      </div>

      <h4>{`주최자: ${player_list_nickname}`}</h4>
      <img src={`${common_status_idx === 0 ? apply_icon : denied_icon}`} alt="상태 아이콘" />
    </div>
  );
};
export default MatchCard;
