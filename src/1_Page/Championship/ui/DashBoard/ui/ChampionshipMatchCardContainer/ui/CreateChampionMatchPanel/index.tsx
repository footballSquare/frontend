import useToggleState from "../../../../../../../../4_Shared/model/useToggleState";
import { useChampionshipContextInfo } from "../../../../../../model/useChampionshipContext";
import { getTextColorFromBackground } from "../../../../../../../../4_Shared/lib/colorChecker";
import usePostCreateChampionshipMatchHandler from "./model/useManageCreateChampionshipMatch";
import PostChampionshipMatch from "../../../../../../../../4_Shared/hookForm/PostChampionshipMatch";
import useCreateMatchForm from "./model/useCreateMatchForm";

const CreateChampionMatchPanel = (props: CreateChampionMatchPanelProps) => {
  const { filteredTeamList, handleAddMatch, handleSyncMatchIdx, handleSelect } =
    props;

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
      handleSelect,
      filteredTeamList,
    });

  const { championship_list_color } = useChampionshipContextInfo();
  const accentColor = championship_list_color || "#3b82f6"; // fallback blue‑500
  const accentText = getTextColorFromBackground(accentColor);

  return (
    <div>
      <button
        type="button"
        onClick={handleToggleModal}
        className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50"
        style={{
          backgroundColor: accentColor,
          color: accentText,
        }}>
        매치 생성
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white text-center">
                대회 매치 생성
              </h2>
            </div>

            <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
              <form
                onSubmit={handleSubmit((data) => {
                  handleToggleModal();
                  handlePostCreateChampionshipMatch(data);
                })}
                className="p-6 space-y-6">
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    매치 참여 팀 선택
                  </label>
                  <div className="border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800/50 max-h-64 overflow-y-auto">
                    {filteredTeamList.length === 0 ? (
                      <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                        선택 가능한 팀이 없습니다.
                      </div>
                    ) : (
                      <div className="p-3 space-y-2">
                        {filteredTeamList.map((team: ChampionshipTeamInfo) => (
                          <div
                            key={team.team_list_idx}
                            className="flex items-center justify-between bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 p-4 rounded-lg hover:shadow-sm transition-shadow">
                            <div className="flex items-center space-x-3 flex-1 min-w-0">
                              <img
                                className="w-8 h-8 object-cover rounded-full border-2 border-gray-200 dark:border-gray-600"
                                src={
                                  team.team_list_emblem || "/placeholder.svg"
                                }
                                alt={`${team.team_list_name} emblem`}
                              />
                              <span
                                className="w-3 h-3 rounded-full border border-gray-300 dark:border-gray-500"
                                style={{
                                  backgroundColor:
                                    team.team_list_color || "#ffffff",
                                }}></span>
                              <div className="flex-1 min-w-0">
                                <span className="text-sm font-medium text-gray-900 dark:text-white truncate block">
                                  {team.team_list_name}
                                </span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  #{team.team_list_short_name}
                                </span>
                              </div>
                            </div>

                            {selectedTeams.find(
                              (t: ChampionshipTeamInfo) =>
                                t.team_list_idx === team.team_list_idx
                            ) ? (
                              <button
                                type="button"
                                onClick={() => handleRemoveTeam(team)}
                                className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium text-white bg-red-500 hover:bg-red-600 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1">
                                제거
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => handleAddTeam(team)}
                                className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1"
                                style={{
                                  backgroundColor: accentColor,
                                  color: accentText,
                                }}>
                                추가
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <PostChampionshipMatch
                    registerType="teamList"
                    register={register}
                    formState={{ errors }}
                  />
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    선택된 팀
                  </label>
                  <div className="border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800/50 p-4 min-h-[80px]">
                    {selectedTeams.length === 0 ? (
                      <div className="flex items-center justify-center h-12 text-sm text-gray-500 dark:text-gray-400">
                        팀을 선택해주세요
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-4 flex-wrap sm:flex-nowrap">
                        <div className="flex items-center gap-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 p-3 rounded-lg min-w-0 flex-1 max-w-xs">
                          <img
                            className="w-8 h-8 object-cover rounded-full border-2 border-gray-200 dark:border-gray-600 flex-shrink-0"
                            src={
                              selectedTeams[0].team_list_emblem ||
                              "/placeholder.svg"
                            }
                            alt={`${selectedTeams[0].team_list_name} emblem`}
                          />
                          <span
                            style={{ color: selectedTeams[0].team_list_color }}
                            className="text-sm font-medium truncate flex-1"
                            title={selectedTeams[0].team_list_name}>
                            {selectedTeams[0].team_list_name}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleRemoveTeam(selectedTeams[0])}
                            className="inline-flex items-center justify-center w-6 h-6 text-xs text-white bg-red-500 hover:bg-red-600 rounded-full transition-colors flex-shrink-0">
                            ×
                          </button>
                        </div>

                        {selectedTeams.length === 2 && (
                          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-sm rounded-full shadow-lg flex-shrink-0">
                            VS
                          </div>
                        )}

                        {selectedTeams[1] && (
                          <div className="flex items-center gap-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 p-3 rounded-lg min-w-0 flex-1 max-w-xs">
                            <img
                              className="w-8 h-8 object-cover rounded-full border-2 border-gray-200 dark:border-gray-600 flex-shrink-0"
                              src={
                                selectedTeams[1].team_list_emblem ||
                                "/placeholder.svg"
                              }
                              alt={`${selectedTeams[1].team_list_name} emblem`}
                            />
                            <span
                              style={{
                                color: selectedTeams[1].team_list_color,
                              }}
                              className="text-sm font-medium truncate flex-1"
                              title={selectedTeams[1].team_list_name}>
                              {selectedTeams[1].team_list_name}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleRemoveTeam(selectedTeams[1])}
                              className="inline-flex items-center justify-center w-6 h-6 text-xs text-white bg-red-500 hover:bg-red-600 rounded-full transition-colors flex-shrink-0">
                              ×
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* 매치 날짜 입력 */}
                <div className="space-y-3">
                  <PostChampionshipMatch
                    registerType="matchDate"
                    register={register}
                    formState={{ errors }}
                  />
                </div>

                {/* 매치 시작 시각 입력 */}
                <div className="space-y-3">
                  <PostChampionshipMatch
                    registerType="startTime"
                    register={register}
                    formState={{ errors }}
                  />
                </div>
              </form>
            </div>

            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row gap-3 sm:justify-between">
                <button
                  type="submit"
                  onClick={handleSubmit((data) => {
                    handleToggleModal();
                    handlePostCreateChampionshipMatch(data);
                  })}
                  className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold rounded-lg shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50 order-2 sm:order-1"
                  style={{
                    backgroundColor: accentColor,
                    color: accentText,
                  }}>
                  매치 생성하기
                </button>
                <button
                  type="button"
                  onClick={handleToggleModal}
                  className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 order-1 sm:order-2">
                  취소
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateChampionMatchPanel;
