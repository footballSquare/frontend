import { useFormContext } from "react-hook-form";
import { getTextColorFromBackground } from "../../4_Shared/lib/colorChecker";

const SelectableTeamCard = (props: SelectableTeamCardProps) => {
  const { teamInfo, onClickEvent, observeRef } = props;
  const { watch } = useFormContext();
  const selectedTeams = watch("participation_team_idxs");
  const isSelected = selectedTeams.includes(teamInfo.team_list_idx);

  // 팀 색상 처리 - 색상이 없는 경우 기본값 제공
  const teamColor = teamInfo.team_list_color || "#3b82f6";

  // 다크 모드에서 선택 배경색 및 호버 색상 계산
  const selectedBgColor = `${teamColor}20`; // 투명도 증가

  return (
    <div
      ref={observeRef}
      onClick={() => onClickEvent && onClickEvent(teamInfo.team_list_idx)}
      className={`relative flex items-center p-4 rounded-lg transition-all duration-200 overflow-hidden ${
        isSelected
          ? "shadow-lg shadow-gray-900 transform scale-102"
          : "hover:bg-gray-800 border border-gray-700"
      }`}
      style={{
        borderRight: `6px solid ${teamColor}`,
        backgroundColor: isSelected ? selectedBgColor : "#1f2937", // bg-gray-800
      }}>
      {/* 왼쪽 세로 컬러 바 */}
      <div
        className="absolute left-0 top-0 h-full w-1"
        style={{ backgroundColor: teamColor }}
      />

      <div className="flex items-center space-x-4 w-full">
        {/* 팀 엠블렘 */}
        {teamInfo.team_list_emblem ? (
          <div
            className="w-12 h-12 flex-shrink-0 rounded-full overflow-hidden flex items-center justify-center border-2"
            style={{
              borderColor: teamColor,
              backgroundColor: "#111827", // bg-gray-900
            }}>
            <img
              src={teamInfo.team_list_emblem}
              alt={`${teamInfo.team_list_name} emblem`}
              className="w-10 h-10 object-contain"
            />
          </div>
        ) : (
          <div
            className="w-12 h-12 flex-shrink-0 rounded-full overflow-hidden flex items-center justify-center font-bold text-lg"
            style={{
              backgroundColor: teamColor,
              color: getTextColorFromBackground(teamColor),
            }}>
            {teamInfo.team_list_short_name?.substring(0, 2) ||
              teamInfo.team_list_name.substring(0, 2)}
          </div>
        )}

        {/* 팀 정보 */}
        <div className="flex-grow">
          <h3 className="font-medium text-gray-100 text-lg">
            {teamInfo.team_list_name}
          </h3>
          {teamInfo.team_list_short_name && (
            <p className="text-sm text-gray-400">
              {teamInfo.team_list_short_name}
            </p>
          )}
        </div>

        {/* 선택 표시 */}
        {isSelected ? (
          <div className="flex items-center">
            <div
              className="rounded-full p-2"
              style={{ backgroundColor: teamColor }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill={getTextColorFromBackground(teamColor)}>
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        ) : (
          // 선택되지 않았을 때 체크박스 영역 표시
          <div className="flex items-center">
            <div className="rounded-full p-2 border-2 border-gray-600">
              <div className="h-5 w-5" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectableTeamCard;
