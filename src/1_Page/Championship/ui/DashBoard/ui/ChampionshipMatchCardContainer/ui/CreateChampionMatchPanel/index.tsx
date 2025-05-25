import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./lib/schema";
import useSetValueHandler from "./model/useTeamListHandler";
import useToggleState from "../../../../../../../../4_Shared/model/useToggleState";
import { useChampionshipContextInfo } from "../../../../../../model/useChampionshipContext";
import { getTextColorFromBackground } from "../../../../../../../../4_Shared/lib/colorChecker";
import usePostCreateChampionshipMatchHandler from "./model/useManageCreateChampionshipMatch";

const CreateChampionMatchPanel = (props: CreateChampionMatchPanelProps) => {
  const { filteredTeamList } = props;
  // form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CreateChampionMatchFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      teams: [],
      matchDate: new Date().toISOString().split("T")[0],
      startTime: "10:00",
    },
  });
  // state
  const [isModalOpen, handleToggleModal] = useToggleState();
  const { selectedTeams, handleAddTeam, handleRemoveTeam } =
    useSetValueHandler(setValue);

  const { championship_list_color } = useChampionshipContextInfo();
  const accentColor = championship_list_color || "#3b82f6"; // fallback blue‑500
  const accentText = getTextColorFromBackground(accentColor);
  // api
  const { handlePostCreateChampionshipMatch } =
    usePostCreateChampionshipMatchHandler({
      handleToggleModal,
    });

  return (
    <div>
      <button
        type="button"
        onClick={handleToggleModal}
        className="px-4 py-2 rounded hover:opacity-80 transition-colors"
        style={{ backgroundColor: accentColor, color: accentText }}>
        매치 생성
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 z-10 bg-black/50 flex items-center justify-center">
          <div className="rounded-lg p-6 w-full max-w-md bg-gray-800 text-gray-100 shadow-lg overflow-y-scroll">
            <h2 className="text-center text-2xl mb-4">대회 매치 생성</h2>
            <form onSubmit={handleSubmit(handlePostCreateChampionshipMatch)}>
              <div className="mb-4">
                <label>매치 참여 팀 선택</label>
                <div className="flex flex-col gap-2 mt-1 overflow-y-scroll max-h-60">
                  {filteredTeamList.length === 0 ? (
                    <div className="text-gray-500">
                      선택 가능한 팀이 없습니다.
                    </div>
                  ) : (
                    filteredTeamList.map((team: ChampionshipTeamInfo) => (
                      <div
                        key={team.team_list_idx}
                        className="flex items-center justify-between border p-2 rounded">
                        <img
                          className="w-[30px] h-[30px] object-cover"
                          src={team.team_list_emblem}
                        />
                        <span
                          className="inline-block w-3 h-3 rounded-full"
                          style={{
                            backgroundColor: team.team_list_color || "#ffffff",
                          }}></span>
                        <span>{team.team_list_name}</span>
                        <span>#{team.team_list_short_name}</span>

                        {selectedTeams.find(
                          (t: ChampionshipTeamInfo) =>
                            t.team_list_idx === team.team_list_idx
                        ) ? (
                          <button
                            type="button"
                            onClick={() => handleRemoveTeam(team)}
                            className="px-2 py-1 bg-red-500 text-white rounded">
                            제거
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleAddTeam(team)}
                            className="px-2 py-1 rounded hover:opacity-80"
                            style={{
                              backgroundColor: accentColor,
                              color: accentText,
                            }}>
                            추가
                          </button>
                        )}
                      </div>
                    ))
                  )}
                </div>
                {errors.teams && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.teams.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label>선택된 팀</label>
                <div className="flex gap-2 mt-1 overflow-x-auto w-full whitespace-nowrap scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 px-1">
                  {selectedTeams.length > 0 && (
                    <>
                      <div className="flex items-center gap-2 border p-2 rounded w-fit min-w-[160px]">
                        <img
                          className="w-[30px] h-[30px] object-cover"
                          src={selectedTeams[0].team_list_emblem}
                        />
                        <span
                          style={{ color: selectedTeams[0].team_list_color }}
                          className="truncate max-w-[80px] block"
                          title={selectedTeams[0].team_list_name}>
                          {selectedTeams[0].team_list_name}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveTeam(selectedTeams[0])}
                          className="px-2 py-1 bg-red-500 text-white rounded">
                          제거
                        </button>
                      </div>
                      {selectedTeams.length === 2 && (
                        <div className="flex items-center font-bold text-xl">
                          VS
                        </div>
                      )}
                      {selectedTeams[1] && (
                        <div className="flex items-center gap-2 border p-2 rounded w-fit min-w-[160px]">
                          <img
                            className="w-[30px] h-[30px] object-cover"
                            src={selectedTeams[1].team_list_emblem}
                          />
                          <span
                            style={{ color: selectedTeams[1].team_list_color }}
                            className="truncate max-w-[80px] block"
                            title={selectedTeams[1].team_list_name}>
                            {selectedTeams[1].team_list_name}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleRemoveTeam(selectedTeams[1])}
                            className="px-2 py-1 bg-red-500 text-white rounded">
                            제거
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <label>매치 진행 일 선택</label>
                <input
                  type="date"
                  {...register("matchDate")}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                />
                {errors.matchDate && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.matchDate.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label>매치 시작 시 각 선택</label>
                <select
                  {...register("startTime")}
                  className="w-full p-2 border border-gray-300 rounded mt-1">
                  {Array.from({ length: 48 }, (_, i) => {
                    const hour = Math.floor(i / 2);
                    const minutes = (i % 2) * 30;
                    const hourString = hour.toString().padStart(2, "0");
                    const minuteString = minutes.toString().padStart(2, "0");
                    return (
                      <option key={i} value={`${hourString}:${minuteString}`}>
                        {`${hourString}:${minuteString}`}
                      </option>
                    );
                  })}
                </select>
                {errors.startTime && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.startTime.message}
                  </p>
                )}
              </div>
              <div className="flex justify-between mt-4">
                <button
                  type="submit"
                  className="px-4 py-2 rounded hover:opacity-80 transition-colors"
                  style={{ backgroundColor: accentColor, color: accentText }}>
                  매치 생성하기
                </button>
                <button
                  type="button"
                  onClick={handleToggleModal}
                  className="px-4 py-2 rounded hover:opacity-80 transition-colors"
                  style={{ backgroundColor: accentColor, color: accentText }}>
                  모달 닫기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateChampionMatchPanel;
