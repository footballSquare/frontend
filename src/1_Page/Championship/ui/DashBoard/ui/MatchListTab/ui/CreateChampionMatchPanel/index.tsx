import useToggleState from "../../../../../../../../4_Shared/model/useToggleState";
import useChampionshipInfoContext from "../../../../../../../../4_Shared/model/useChampionshipInfoContext";
import { getTextColorFromBackground } from "../../../../../../../../4_Shared/lib/colorChecker";
import usePostCreateChampionshipMatchHandler from "./model/useManageCreateChampionshipMatch";
import PostChampionshipMatch from "../../../../../../../../4_Shared/hookForm/PostChampionshipMatch";
import useCreateMatchForm from "./model/useCreateMatchForm";
import DefaultTeamEmblem from "../../../../../../../../4_Shared/components/DefaultTeamEmblem";

const CreateChampionMatchPanel = (props: CreateChampionMatchPanelProps) => {
  const {
    handleBackToList,
    filteredTeamList,
    handleAddMatch,
    handleSyncMatchIdx,
    handleMatchSelect,
    handleDeleteMatch,
  } = props;

  // state
  const [isModalOpen, handleToggleModal] = useToggleState();

  // hook form
  const { methods, selectedTeams, handleAddTeam, handleRemoveTeam } =
    useCreateMatchForm({
      filteredTeamList,
    });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  // api
  const { handlePostCreateChampionshipMatch } =
    usePostCreateChampionshipMatchHandler({
      handleAddMatch,
      handleSyncMatchIdx,
      handleMatchSelect,
      filteredTeamList,
      handleBackToList,
      handleDeleteMatch,
    });

  const { championshipListColor } = useChampionshipInfoContext();
  const accentColor = championshipListColor || "#3b82f6"; // fallback blue‑500
  const accentText = getTextColorFromBackground(accentColor);

  return (
    <div>
      <button
        type="button"
        onClick={handleToggleModal}
        className="inline-flex items-center justify-center px-6 py-3 text-sm font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50 border-2 border-transparent"
        style={{
          backgroundColor: accentColor,
          color: accentText,
          borderColor: `${accentColor}40`,
        }}>
        <span className="mr-2">⚽</span>
        매치 생성
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <form
            onSubmit={handleSubmit((data) => {
              handlePostCreateChampionshipMatch(data);
              handleToggleModal();
            })}>
            <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm flex flex-col">
              {/* Header */}
              <div className="px-6 py-5 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-black text-gray-900 dark:text-white flex items-center">
                    <span className="mr-3 text-3xl">⚽</span>
                    대회 매치 생성
                  </h2>
                  <button
                    onClick={handleToggleModal}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors">
                    <span className="text-gray-600 dark:text-gray-300 text-lg">
                      ×
                    </span>
                  </button>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-6 space-y-6">
                  {/* 팀 선택 섹션 */}
                  <div className="space-y-4">
                    <label className="flex items-center text-lg font-bold text-gray-800 dark:text-gray-200">
                      <span className="mr-2">👥</span>
                      매치 참여 팀 선택
                    </label>
                    <div className="border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-700/50 max-h-72 overflow-y-auto shadow-inner">
                      {filteredTeamList.length === 0 ? (
                        <div className="p-12 text-center">
                          <div className="text-6xl mb-4">🏟️</div>
                          <p className="text-gray-500 dark:text-gray-400 text-lg">
                            선택 가능한 팀이 없습니다.
                          </p>
                        </div>
                      ) : (
                        <div className="p-4 space-y-3">
                          {filteredTeamList.map(
                            (team: ChampionshipTeamInfo) => (
                              <div
                                key={team.team_list_idx}
                                className="flex items-center justify-between bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-600 p-4 rounded-xl hover:shadow-lg hover:border-gray-200 dark:hover:border-gray-500 transition-all duration-300 hover:scale-[1.02]">
                                <div className="flex items-center space-x-4 flex-1 min-w-0">
                                  <div className="flex items-center space-x-3">
                                    {team.team_list_emblem ? (
                                      <img
                                        className="w-10 h-10 object-cover rounded-xl border-2 border-gray-200 dark:border-gray-600 shadow-sm"
                                        src={team.team_list_emblem}
                                        alt={`${team.team_list_name} emblem`}
                                      />
                                    ) : (
                                      <div className="w-10 h-10 flex items-center justify-center">
                                        <DefaultTeamEmblem
                                          text={team.team_list_short_name}
                                          bgColor={team.team_list_color}
                                        />
                                      </div>
                                    )}
                                    <div
                                      className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                                      style={{
                                        backgroundColor:
                                          team.team_list_color || "#ffffff",
                                      }}></div>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h4 className="text-base font-bold text-gray-900 dark:text-white truncate">
                                      {team.team_list_name}
                                    </h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                      #{team.team_list_short_name}
                                    </p>
                                  </div>
                                </div>

                                {selectedTeams.find(
                                  (t: ChampionshipTeamInfo) =>
                                    t.team_list_idx === team.team_list_idx
                                ) ? (
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveTeam(team)}
                                    className="inline-flex items-center justify-center px-4 py-2 text-sm font-bold text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                                    <span className="mr-1">🗑️</span>
                                    제거
                                  </button>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() => handleAddTeam(team)}
                                    className="inline-flex items-center justify-center px-4 py-2 text-sm font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                                    style={{
                                      backgroundColor: accentColor,
                                      color: accentText,
                                    }}>
                                    <span className="mr-1">➕</span>
                                    추가
                                  </button>
                                )}
                              </div>
                            )
                          )}
                        </div>
                      )}
                    </div>
                    <PostChampionshipMatch
                      registerType="teamList"
                      register={register}
                      formState={{ errors }}
                    />
                  </div>

                  {/* 선택된 팀 섹션 */}
                  <div className="space-y-4">
                    <label className="flex items-center text-lg font-bold text-gray-800 dark:text-gray-200">
                      <span className="mr-2">🏆</span>
                      선택된 팀
                    </label>
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800/30 dark:to-gray-700/30 p-6 min-h-[120px]">
                      {selectedTeams.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-24">
                          <div className="text-4xl mb-2">🎯</div>
                          <p className="text-gray-500 dark:text-gray-400 text-center font-medium">
                            팀을 선택해주세요
                          </p>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-6 flex-wrap">
                          {/* 첫 번째 팀 */}
                          <div className="flex items-center gap-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 p-4 rounded-xl shadow-lg min-w-0 flex-1 max-w-xs">
                            <div className="flex items-center gap-2">
                              {selectedTeams[0].team_list_emblem ? (
                                <img
                                  className="w-10 h-10 object-cover rounded-xl border-2 border-gray-200 dark:border-gray-600 shadow-sm flex-shrink-0"
                                  src={selectedTeams[0].team_list_emblem}
                                  alt={`${selectedTeams[0].team_list_name} emblem`}
                                />
                              ) : (
                                <DefaultTeamEmblem
                                  text={selectedTeams[0].team_list_short_name}
                                  bgColor={selectedTeams[0].team_list_color}
                                />
                              )}
                              <div
                                className="w-3 h-3 rounded-full border border-white shadow-sm"
                                style={{
                                  backgroundColor:
                                    selectedTeams[0].team_list_color,
                                }}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4
                                style={{
                                  color: selectedTeams[0].team_list_color,
                                }}
                                className="text-sm font-bold truncate"
                                title={selectedTeams[0].team_list_name}>
                                {selectedTeams[0].team_list_name}
                              </h4>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveTeam(selectedTeams[0])}
                              className="inline-flex items-center justify-center w-8 h-8 text-sm text-white bg-red-500 hover:bg-red-600 rounded-xl transition-colors flex-shrink-0 shadow-md">
                              ×
                            </button>
                          </div>

                          {/* VS 표시 */}
                          {selectedTeams.length === 2 && (
                            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 text-white font-black text-lg rounded-full shadow-xl flex-shrink-0 animate-pulse">
                              VS
                            </div>
                          )}

                          {/* 두 번째 팀 */}
                          {selectedTeams[1] && (
                            <div className="flex items-center gap-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 p-4 rounded-xl shadow-lg min-w-0 flex-1 max-w-xs">
                              <div className="flex items-center gap-2">
                                {selectedTeams[1].team_list_emblem ? (
                                  <img
                                    className="w-10 h-10 object-cover rounded-xl border-2 border-gray-200 dark:border-gray-600 shadow-sm flex-shrink-0"
                                    src={selectedTeams[1].team_list_emblem}
                                    alt={`${selectedTeams[1].team_list_name} emblem`}
                                  />
                                ) : (
                                  <DefaultTeamEmblem
                                    text={selectedTeams[1].team_list_short_name}
                                    bgColor={
                                      selectedTeams[1].team_list_color ||
                                      "#ffffff"
                                    }
                                  />
                                )}
                                <div
                                  className="w-3 h-3 rounded-full border border-white shadow-sm"
                                  style={{
                                    backgroundColor:
                                      selectedTeams[1].team_list_color,
                                  }}
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4
                                  style={{
                                    color: selectedTeams[1].team_list_color,
                                  }}
                                  className="text-sm font-bold truncate"
                                  title={selectedTeams[1].team_list_name}>
                                  {selectedTeams[1].team_list_name}
                                </h4>
                              </div>
                              <button
                                type="button"
                                onClick={() =>
                                  handleRemoveTeam(selectedTeams[1])
                                }
                                className="inline-flex items-center justify-center w-8 h-8 text-sm text-white bg-red-500 hover:bg-red-600 rounded-xl transition-colors flex-shrink-0 shadow-md">
                                ×
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 매치 날짜 및 시간 입력 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="flex items-center text-lg font-bold text-gray-800 dark:text-gray-200">
                        <span className="mr-2">📅</span>
                        매치 날짜
                      </label>
                      <PostChampionshipMatch
                        registerType="matchDate"
                        register={register}
                        formState={{ errors }}
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="flex items-center text-lg font-bold text-gray-800 dark:text-gray-200">
                        <span className="mr-2">⏰</span>
                        시작 시각
                      </label>
                      <PostChampionshipMatch
                        registerType="startTime"
                        register={register}
                        formState={{ errors }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-5 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 border-t border-gray-200/50 dark:border-gray-700/50 flex-shrink-0">
                <div className="flex flex-col sm:flex-row gap-4 sm:justify-between">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center px-8 py-3 text-base font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50 order-2 sm:order-1 transform hover:scale-105"
                    style={{
                      backgroundColor: accentColor,
                      color: accentText,
                    }}>
                    <span className="mr-2">🚀</span>
                    매치 생성하기
                  </button>
                  <button
                    type="button"
                    onClick={handleToggleModal}
                    className="inline-flex items-center justify-center px-8 py-3 text-base font-bold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 order-1 sm:order-2 shadow-lg hover:shadow-xl transform hover:scale-105">
                    <span className="mr-2">❌</span>
                    취소
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CreateChampionMatchPanel;
