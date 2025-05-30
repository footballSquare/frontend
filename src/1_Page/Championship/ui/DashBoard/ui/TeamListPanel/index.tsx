import { useNavigate } from "react-router-dom";
import { convertHexToRGBA } from "../../../../../../4_Shared/lib/colorConverter";
import useToggleState from "../../../../../../4_Shared/model/useToggleState";
import useChampionshipInfoContext from "../../../../../../4_Shared/model/useChampionshipInfoContext";
import DefaultTeamEmblem from "../../../../../../4_Shared/components/DefaultTeamEmblem";

const TeamListPanel = (props: TeamListPanelProps) => {
  const { teamList } = props;
  const [isModalOpen, handleToggleModal] = useToggleState();
  const navigate = useNavigate();
  const { championshipListColor } = useChampionshipInfoContext();
  const textColor = "white";

  return (
    <div>
      <button
        onClick={handleToggleModal}
        style={{
          background: `linear-gradient(90deg, ${championshipListColor} 0%, ${championshipListColor}B3 50%, ${championshipListColor}80 100%)`,
          color: textColor,
        }}
        className="text-white font-semibold px-4 py-2 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all duration-200">
        🏆 참가 팀 목록 보기
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 z-10 bg-black/50 flex items-center justify-center">
          <div
            className="bg-gray-800 text-gray-100 rounded-lg p-4"
            style={{ borderColor: championshipListColor }}>
            <div className="w-full flex justify-between">
              <h1 className="text-white font-semibold text-center text-2xl">
                🏆 참가 팀 목록
              </h1>
              <button
                onClick={handleToggleModal}
                className="m-1 px-4 py-2 text-red-500 font-semibold border border-red-300 rounded-md hover:bg-red-50 active:scale-95 transition-all">
                닫기
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4 max-h-[700px] p-4 ">
              {teamList.map((team) => {
                const { teamColor, teamBgColor, teamBorderColor } =
                  convertHexToRGBA(team.team_list_color);
                return (
                  <div
                    onClick={() => {
                      navigate(`/team/${team.team_list_idx}`);
                    }}
                    key={"team_card_" + team.team_list_idx}
                    style={{
                      backgroundColor: teamBgColor,
                      borderColor: teamBorderColor,
                      borderLeft: `4px solid ${teamColor}`,
                      color: textColor,
                    }}
                    className={`cursor-pointer p-3 border rounded-lg transition-all duration-200 hover:shadow-md `}>
                    <div className="flex items-center space-x-2">
                      <div
                        className="flex-shrink-0"
                        style={{ minWidth: "40px" }}>
                        {team.team_list_emblem ? (
                          <img
                            src={team.team_list_emblem}
                            alt={team.team_list_short_name}
                            className="w-10 h-10 object-contain rounded-full bg-white p-1 border shadow-sm"
                            style={{ borderColor: teamColor }}
                          />
                        ) : (
                          <DefaultTeamEmblem
                            text={team.team_list_short_name}
                            bgColor={teamBgColor}
                          />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div
                          className="font-bold truncate"
                          style={{ color: textColor }}
                          title={team.team_list_name}>
                          {team.team_list_name}
                        </div>
                        <div
                          className="text-xs truncate font-semibold"
                          style={{ color: textColor }}
                          title={team.team_list_short_name}>
                          {team.team_list_short_name}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamListPanel;
