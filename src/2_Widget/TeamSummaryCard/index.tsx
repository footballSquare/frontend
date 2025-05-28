import userIcon from "../../4_Shared/assets/svg/user.svg";
import calendarIcon from "../../4_Shared/assets/svg/calander.svg";
import { formatDateKoreanDate } from "../../4_Shared/lib/dateFormatter";
import { useNavigate } from "react-router-dom";
import DefaultTeamEmblem from "../../4_Shared/components/DefaultTeamEmblem";

// 팀 카드 컴포넌트
const TeamSummaryCard = (props: TeamSummaryCardProps) => {
  const { team, observeRef, isRecent, isMyTeam } = props;
  const navigate = useNavigate();

  return (
    <div
      id={isRecent ? "recent" : isMyTeam ? "myteam" : undefined}
      ref={observeRef}
      className="group w-full rounded-xl overflow-hidden bg-gray-800 shadow-md transition-shadow duration-200 cursor-pointer hover:shadow-xl">
      <div className="p-5">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 mr-3">
            {team.team_list_emblem ? (
              <img
                src={team.team_list_emblem}
                alt={`${team.team_list_name} 엠블럼`}
                className="rounded-full object-cover"
              />
            ) : (
              <DefaultTeamEmblem
                bgColor={team.team_list_color}
                text={team.team_list_short_name}
              />
            )}
          </div>

          <div className="flex-grow">
            <div className="flex items-center">
              <span
                style={{ backgroundColor: team.team_list_color }}
                className="w-[12px] h-[12px] rounded-full inline-block mr-[6px]"></span>
              <h3 className="text-lg font-bold text-gray-100">
                {team.team_list_name}
              </h3>
            </div>
            <p className="text-sm text-gray-400">{team.team_list_short_name}</p>
          </div>

          <div className="ml-auto">
            {team.whole_member < 10 && (
              <div className="bg-[var(--color-thick-grass)]/40 text-[var(--color-grass)] px-2 py-1 rounded-md text-xs font-medium">
                모집중
              </div>
            )}
          </div>
        </div>

        {/* 데이터 시각화 섹션 */}
        <div className="mt-4 pt-4 border-t border-gray-700">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center text-sm text-gray-400">
              <img src={calendarIcon} className="w-5 h-5" />
              <span className="ml-2 mr-1">생성일:</span>
              <span className="font-medium">
                {formatDateKoreanDate(new Date(team.team_list_created_at))}
              </span>
            </div>

            <div className="flex items-center text-sm text-gray-400">
              <img src={userIcon} className="w-5 h-5" />
              <span className="ml-2 mr-1">멤버:</span>
              <span className="font-medium">{team.whole_member}명</span>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 액션 버튼 */}
      <div
        onClick={() => {
          navigate(`/team/${team.team_list_idx}`);
        }}
        className="flex items-center justify-center p-3 bg-gray-700 transition-colors group-hover:bg-[var(--color-thick-grass)]/40">
        <span className="text-sm font-medium text-gray-300 transition-colors group-hover:text-[var(--color-grass)]">
          팀 상세보기
        </span>
        <span className="text-gray-400 transition-colors group-hover:text-[var(--color-grass)]">
          ›
        </span>
      </div>
    </div>
  );
};

export default TeamSummaryCard;
