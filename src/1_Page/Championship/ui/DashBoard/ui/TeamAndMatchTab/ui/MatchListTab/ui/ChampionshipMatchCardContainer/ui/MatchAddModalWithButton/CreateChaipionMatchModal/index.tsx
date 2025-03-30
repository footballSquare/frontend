import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useSetValueHandler from "./model/useTeamListHandler";
import { schema } from "./lib/schema";
import { convertCreateChampionMatchForm } from "./util/convert";
import usePostCreateChampionshipMatch from "../../../../../../../../../../../../../3_Entity/Championship/usePostCreateChampionshipMatch";
import useParamInteger from "../../../../../../../../../../../../../4_Shared/model/useParamInteger";

const CreateChampionMatchModal = (props: CreateChampionMatchModalProps) => {
  const { onClose, filteredTeamList, handleAddMatch } = props;
  const championshipIdx = useParamInteger("championshipIdx");
  const [postCreateChampionshipMatch] =
    usePostCreateChampionshipMatch(championshipIdx);

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
  const { selectedTeams, handleAddTeam, handleRemoveTeam } =
    useSetValueHandler(setValue);

  const onSubmit = (data: CreateChampionMatchFormValues) => {
    const convertFormData = convertCreateChampionMatchForm(data);
    postCreateChampionshipMatch(convertFormData);
    handleAddMatch(convertFormData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-10 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg overflow-y-scroll">
        <h2 className="text-center text-2xl mb-4">대회 매치 생성</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label>매치 참여 팀 선택</label>
            <div className="flex flex-col gap-2 mt-1 overflow-y-scroll max-h-60">
              {filteredTeamList.map((team: ChampionshipTeamInfo) => (
                <div
                  key={team.team_list_idx}
                  className="flex items-center justify-between border p-2 rounded">
                  <img
                    className="w-[30px] h-[30px] object-cover"
                    src={team.team_list_emblem}
                  />
                  <span style={{ color: team.team_list_color }}>
                    {team.team_list_name}
                  </span>
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
                      className="px-2 py-1 bg-green-500 text-white rounded">
                      추가
                    </button>
                  )}
                </div>
              ))}
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
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              매치 생성하기
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              모달 닫기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateChampionMatchModal;
