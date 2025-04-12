import userIcon from "../../../../4_Shared/assets/svg/user.svg";
import calendarIcon from "../../../../4_Shared/assets/svg/calander.svg";
import { formatDateKoreanDate } from "../../../../4_Shared/lib/dateFormatter";
import { useNavigate } from "react-router-dom";

// 팀 카드 컴포넌트
const TeamSummaryCard = (props: TeamSummaryCardProps) => {
  const { team, observeRef } = props;
  const navigate = useNavigate();

  return (
    <div
      ref={observeRef}
      className="group w-full max-w-md rounded-xl overflow-hidden bg-white shadow-md transition-shadow duration-200 cursor-pointer hover:shadow-xl">
      <div className="p-5">
        <div className="flex items-center mb-4">
          {team.team_list_emblem ? (
            <img
              src={team.team_list_emblem}
              alt={`${team.team_list_name} 엠블럼`}
              className="w-12 h-12 rounded-full mr-3 object-cover"
            />
          ) : (
            <div
              className="w-12 h-12 rounded-full mr-3 flex items-center justify-center text-white font-bold text-lg"
              style={{ backgroundColor: team.team_list_color || "#3182f6" }}>
              {team.team_list_short_name?.slice(0, 2) || "팀"}
            </div>
          )}

          <div className="flex-grow">
            <div className="flex items-center">
              <span
                style={{ backgroundColor: team.team_list_color }}
                className="w-[12px] h-[12px] rounded-full inline-block mr-[6px]"></span>
              <h3 className="text-lg font-bold text-gray-800">
                {team.team_list_name}
              </h3>
            </div>
            <p className="text-sm text-gray-500">{team.team_list_short_name}</p>
          </div>

          <div className="ml-auto">
            {team.whole_member < 10 && (
              <div className="bg-blue-50 text-blue-600 px-2 py-1 rounded-md text-xs font-medium">
                모집중
              </div>
            )}
          </div>
        </div>

        {/* 데이터 시각화 섹션 */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center text-sm text-gray-600">
              <img src={calendarIcon} className="w-5 h-5" />
              <span className="ml-2 mr-1">생성일:</span>
              <span className="font-medium">
                {formatDateKoreanDate(new Date(team.team_list_created_at))}
              </span>
            </div>

            <div className="flex items-center text-sm text-gray-600">
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
        className="flex items-center justify-center p-3 bg-gray-50 transition-colors group-hover:bg-blue-50">
        <span className="text-sm font-medium text-gray-600 transition-colors group-hover:text-blue-600">
          팀 상세보기
        </span>
        <span className="text-gray-400 transition-colors group-hover:text-blue-600">
          ›
        </span>
      </div>
    </div>
  );
};

export default TeamSummaryCard;
