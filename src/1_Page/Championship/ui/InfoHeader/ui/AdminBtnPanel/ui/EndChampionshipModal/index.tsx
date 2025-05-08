import { isInvalidEnd } from "./util/valid";
import { convertToPutAwardData } from "./util/convert";
import useTeamSelect from "./model/useTeamSelect";
import useAwardPlayers from "./model/useAwardPlayers";

import usePutChampionshipEnd from "../../../../../../../../3_Entity/Championship/usePutChampionshipEnd";
import useManageChampionshipEndData from "./model/useManageChampionshipEndData";
import useParamInteger from "../../../../../../../../4_Shared/model/useParamInteger";
import check_white from "../../../../../../../../4_Shared/assets/svg/check_white.svg";
import closeBtn from "../../../../../../../../4_Shared/assets/svg/closeBtn.svg";
import AwardPlayerList from "./ui/AwardPlayerList";

const EndChampionshipModal = (props: EndChampionshipModalProps) => {
  const { onClose, cachedChampionshipEndDataRef } = props;

  const championshipListIdx = useParamInteger("championshipIdx");
  // api
  const championshipEndData = useManageChampionshipEndData(
    championshipListIdx,
    cachedChampionshipEndDataRef
  ); // 부모 ref를 이용해 캐싱해서 값이 있을때만 호출
  const [putChampionshipEnd] = usePutChampionshipEnd(championshipListIdx);
  // 선택 및 필터링
  const { selectTeam, handleSetSelectTeam } = useTeamSelect();
  const { selectedAwardPlayers, handlePlayerSelectForAward } =
    useAwardPlayers();
  // 모든 수상이 선택되었는지 확인
  const isFormComplete =
    selectTeam && selectedAwardPlayers.every((player) => player !== null);

  return (
    <div className="fixed inset-0 z-10 bg-black/75 backdrop-blur-sm flex items-center justify-center overflow-y-auto py-8">
      <div className="w-full max-w-xl p-6 bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-2xl transform transition-all animate-fade-in max-h-[90vh] overflow-y-auto border border-blue-100">
        {/* 헤더 영역 */}
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-blue-200">
          <h2 className="text-xl font-bold text-blue-800 flex items-center">
            <span className="text-blue-600 mr-2">🏆</span>
            대회 종료 정보 입력
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 text-blue-500 rounded-full hover:bg-blue-100 transition">
            <img src={closeBtn} />
          </button>
        </div>

        {/* 우승팀 선정 영역 */}
        <div className="mb-6">
          <h3 className="text-sm uppercase font-bold mb-3 text-blue-700 flex items-center">
            <span className="mr-1">🏅</span>우승팀 선정
          </h3>

          <div className="max-h-[120px] overflow-y-auto rounded-lg bg-white/70 border border-blue-200 p-2">
            {championshipEndData.teams &&
            championshipEndData.teams.length === 0 ? (
              <div className="text-blue-500 text-center py-3 text-sm">
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
                              ? `linear-gradient(135deg, rgba(219, 234, 254, 0.9), rgba(191, 219, 254, 0.8))`
                              : "white",
                        }}
                        className={`cursor-pointer p-2 border rounded-md transition-all duration-150 text-sm relative overflow-hidden group
                      ${
                        selectTeam?.team_list_idx === team.team_list_idx
                          ? "shadow-md border-blue-300"
                          : "hover:border-blue-300 hover:shadow-blue-100"
                      }`}>
                        {/* 배경 효과 */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-50/30 to-transparent w-[200%] -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-in-out opacity-0 group-hover:opacity-100"></div>

                        <div className="flex items-center space-x-2 relative z-10">
                          <div className="min-w-0 flex-1">
                            <div
                              className={`font-medium truncate transition-all duration-200 ${
                                selectTeam?.team_list_idx === team.team_list_idx
                                  ? "text-blue-800"
                                  : "text-gray-800 group-hover:text-blue-700"
                              }`}
                              title={team.team_list_name}>
                              {team.team_list_name}
                            </div>
                            <div className="text-xs text-blue-500 opacity-80">
                              {team.team_list_name}
                            </div>
                          </div>

                          {/* 선택 표시 아이콘 */}
                          {selectTeam?.team_list_idx === team.team_list_idx && (
                            <div className="absolute top-1 right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center shadow-sm">
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
            <div className="mt-2 p-2 border rounded-md bg-gradient-to-r from-blue-50 to-blue-100 shadow-sm flex items-center border-blue-200">
              <div className="flex-shrink-0 mr-2">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xs shadow-sm">
                  <img src={check_white} />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm text-blue-800">
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
              <AwardPlayerList
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
          <div className="w-full bg-blue-100 rounded-full h-1.5">
            <div
              className="bg-gradient-to-r from-blue-400 to-blue-600 h-1.5 rounded-full transition-all duration-300 shadow-sm"
              style={{
                width: `${
                  (((selectTeam ? 1 : 0) +
                    selectedAwardPlayers.filter((p) => p !== null).length) /
                    (1 + selectedAwardPlayers.length)) *
                  100
                }%`,
              }}></div>
          </div>
          <div className="flex justify-between mt-1 text-xs text-blue-600">
            <span>우승팀 선택</span>
            <span>수상 선수 선택</span>
          </div>
        </div>

        {/* 제출 버튼 */}
        <div className="flex justify-between mt-5 pt-4 border-t border-blue-200">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-white text-blue-700 rounded-md hover:bg-blue-50 transition text-sm font-medium border border-blue-200">
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
                ? "bg-blue-200 text-blue-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700"
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
