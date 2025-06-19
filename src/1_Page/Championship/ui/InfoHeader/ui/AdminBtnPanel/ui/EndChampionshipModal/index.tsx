import { isInvalidEnd } from "./util/valid";
import { convertToPutAwardData } from "./util/convert";
import useTeamSelect from "./model/useTeamSelect";
import useAwardPlayers from "./model/useAwardPlayers";

import usePutChampionshipEnd from "../../../../../../../../3_Entity/Championship/usePutChampionshipEnd";
import useManageChampionshipEndData from "./model/useManageChampionshipEndData";
import useParamInteger from "../../../../../../../../4_Shared/model/useParamInteger";
import check_white from "../../../../../../../../4_Shared/assets/svg/check_white.svg";
import closeBtn from "../../../../../../../../4_Shared/assets/svg/closeBtn.svg";
import AwardPlayerSelector from "./ui/AwardPlayerSelector";

const EndChampionshipModal = (props: EndChampionshipModalProps) => {
  const { onClose, cachedChampionshipEndDataRef } = props;

  const championshipListIdx = useParamInteger("championshipIdx");
  // api
  const championshipEndData = useManageChampionshipEndData(
    championshipListIdx,
    cachedChampionshipEndDataRef
  ); // 부모 ref를 이용해 캐싱해서 값이 있을때만 호출
  const [putChampionshipEnd] = usePutChampionshipEnd(championshipListIdx);

  // 팀 선택 및 필터링
  const { selectTeam, handleSetSelectTeam } = useTeamSelect();
  const { selectedAwardPlayers, handlePlayerSelectForAward } =
    useAwardPlayers();
  // 모든 수상이 선택되었는지 확인
  const isFormComplete =
    selectTeam && selectedAwardPlayers.every((player) => player !== null);

  return (
    <div className="fixed inset-0 z-10 bg-black/75 backdrop-blur-sm flex items-center justify-center overflow-y-auto py-8">
      <div className="w-full max-w-xl p-6 bg-gray-900/95 backdrop-blur-sm rounded-xl shadow-2xl transform transition-all animate-fade-in max-h-[90vh] overflow-y-auto border border-gray-700/50">
        {/* 헤더 영역 */}
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-gray-700/50">
          <h2 className="text-xl font-bold text-gray-100 flex items-center">
            <span className="text-grass mr-2">🏆</span>
            대회 종료 정보 입력
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 rounded-full hover:bg-gray-800 hover:text-gray-100 transition">
            <img src={closeBtn} />
          </button>
        </div>

        {/* 우승팀 선정 영역 */}
        <div className="mb-6">
          <h3 className="text-sm uppercase font-bold mb-3 text-grass flex items-center">
            <span className="mr-1">🏅</span>우승팀 선정
          </h3>

          <div className="max-h-[120px] overflow-y-auto rounded-lg bg-gray-800/50 border border-gray-700/50 p-2">
            {championshipEndData.teams &&
            championshipEndData.teams.length === 0 ? (
              <div className="text-gray-400 text-center py-3 text-sm">
                등록된 팀이 없습니다.
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {championshipEndData.teams &&
                  championshipEndData.teams.map((team) => {
                    return (
                      <div
                        key={"team_card_" + team.team_list_idx}
                        onClick={() => handleSetSelectTeam(team)}
                        style={{
                          background:
                            selectTeam?.team_list_idx === team.team_list_idx
                              ? `linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(34, 197, 94, 0.1))`
                              : "rgba(55, 65, 81, 0.5)",
                        }}
                        className={`cursor-pointer p-2 border rounded-md transition-all duration-150 text-sm relative overflow-hidden group
                      ${
                        selectTeam?.team_list_idx === team.team_list_idx
                          ? "shadow-md border-grass/30 bg-grass/10"
                          : "border-gray-600 hover:border-grass/30 hover:bg-gray-700/50"
                      }`}>
                        {/* 배경 효과 */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-grass/10 to-transparent w-[200%] -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-in-out opacity-0 group-hover:opacity-100"></div>

                        <div className="flex items-center space-x-2 relative z-10">
                          <div className="min-w-0 flex-1">
                            <div
                              className={`font-medium truncate transition-all duration-200 ${
                                selectTeam?.team_list_idx === team.team_list_idx
                                  ? "text-grass"
                                  : "text-gray-100 group-hover:text-grass"
                              }`}
                              title={team.team_list_name}>
                              {team.team_list_name}
                            </div>
                            <div className="text-xs text-gray-400 opacity-80">
                              {team.team_list_name}
                            </div>
                          </div>

                          {/* 선택 표시 아이콘 */}
                          {selectTeam?.team_list_idx === team.team_list_idx && (
                            <div className="absolute top-1 right-1 w-4 h-4 bg-grass rounded-full flex items-center justify-center shadow-sm">
                              <img src={check_white} />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>

          {selectTeam && (
            <div className="mt-2 p-2 border rounded-md bg-grass/10 shadow-sm flex items-center border-grass/30">
              <div className="flex-shrink-0 mr-2">
                <div className="w-6 h-6 bg-grass rounded-full flex items-center justify-center text-white text-xs shadow-sm">
                  <img src={check_white} />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm text-grass">
                  {selectTeam.team_list_name}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 수상 선수 선정 영역 - 아코디언 스타일로 변경 */}
        <div className="space-y-3">
          {championshipEndData.awards &&
            championshipEndData.awards.map((award, index) => (
              <AwardPlayerSelector
                award={award}
                players={championshipEndData.players}
                index={index}
                selectedAwardPlayers={selectedAwardPlayers}
                handlePlayerSelectForAward={handlePlayerSelectForAward}
              />
            ))}
        </div>

        {/* 진행 상태 표시 */}
        <div className="mt-5 mb-4">
          <div className="w-full bg-gray-700 rounded-full h-1.5">
            <div
              className="bg-gradient-to-r from-grass to-green-400 h-1.5 rounded-full transition-all duration-300 shadow-sm"
              style={{
                width: `${
                  (((selectTeam ? 1 : 0) +
                    selectedAwardPlayers.filter((p) => p !== null).length) /
                    (1 + selectedAwardPlayers.length)) *
                  100
                }%`,
              }}></div>
          </div>
          <div className="flex justify-between mt-1 text-xs text-gray-400">
            <span>우승팀 선택</span>
            <span>수상 선수 선택</span>
          </div>
        </div>

        {/* 제출 버튼 */}
        <div className="flex justify-between mt-5 pt-4 border-t border-gray-700/50">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-gray-800 text-gray-300 rounded-md hover:bg-gray-700 hover:text-gray-100 transition text-sm font-medium border border-gray-600">
            취소
          </button>
          <button
            disabled={!isFormComplete}
            onClick={() => {
              if (isInvalidEnd({ selectTeam, selectedAwardPlayers })) return;
              putChampionshipEnd({
                winner_team_idx: selectTeam!.team_list_idx,
                awards: convertToPutAwardData({
                  selectTeam,
                  selectedAwardPlayers,
                  championshipEndData,
                }),
              });
              onClose();
            }}
            className={`px-4 py-1.5 rounded-md transition text-sm font-medium flex items-center shadow-sm ${
              !isFormComplete
                ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-grass to-green-500 text-white hover:from-green-500 hover:to-green-600"
            }`}>
            {!isFormComplete ? (
              "모든 항목 선택 필요"
            ) : (
              <div className="flex items-center">
                <span>대회 종료 확정</span>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EndChampionshipModal;
