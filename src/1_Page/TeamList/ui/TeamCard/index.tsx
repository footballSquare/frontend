import { useNavigate } from "react-router-dom";

// 팀 색상 스타일 생성 함수
const getTeamColorStyle = (colorCode: string) => {
  return {
    backgroundColor: colorCode,
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    display: "inline-block",
    marginRight: "6px",
  };
};

const ChevronRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

type TeamCardProps = {
  team: TeamListInfo;
  showRecruitingTag?: boolean;
  observeRef?: (node?: Element | null) => void;
};

const TeamCard = (props: TeamCardProps) => {
  const { team, showRecruitingTag = false, observeRef } = props;
  const navigate = useNavigate();
  const handleTeamClick = (teamIdx: number) => {
    navigate(`/team/${teamIdx}`);
  };
  return (
    <div
      ref={observeRef}
      className="bg-white rounded-xl p-4 shadow-sm active:bg-gray-50 transition-colors h-full"
      onClick={() => handleTeamClick(team.team_list_idx)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {team.team_list_emblem ? (
            <img
              src={team.team_list_emblem}
              alt="팀 엠블럼"
              className="w-12 h-12 rounded-full bg-gray-100 object-cover border border-gray-200"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 font-bold text-lg">
              {team.team_list_short_name?.slice(0, 2) || "팀"}
            </div>
          )}
          <div>
            <div className="flex items-center">
              <span style={getTeamColorStyle(team.team_list_color)}></span>
              <h3 className="font-bold text-base">{team.team_list_name}</h3>
            </div>
            <p className="text-sm text-gray-500">{team.team_list_short_name}</p>
          </div>
        </div>
        <div className="flex items-center">
          {showRecruitingTag && (
            <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full mr-2">
              모집중
            </span>
          )}
          <span className="text-gray-400">
            <ChevronRightIcon />
          </span>
        </div>
      </div>
    </div>
  );
};
export default TeamCard;
