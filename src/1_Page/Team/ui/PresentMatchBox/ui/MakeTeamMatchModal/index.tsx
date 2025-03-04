import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toFormattedDate } from "../../../../../../4_Shared/lib/dateFormatter";
import usePostTeamMatch from "../../../../../../3_Entity/Match/usePostTeamMatch";

// 타입
import { makeTeamMatchModalProps } from "./type";
import { MatchDatIaInput } from "./type";

// 상수
import { teamMatchAttribute } from "../../../../../../4_Shared/constant/teamMatchAttribute";
import { matchType } from "../../../../../../4_Shared/constant/matchType";
import { matchParticipation } from "../../../../../../4_Shared/constant/matchParticipation";
import { matchDuration } from "../../../../../../4_Shared/constant/matchDuration";
import { formation } from "../../../../../../4_Shared/constant/formation";
import transformMatchData from "./util/transformMatchData";
import { findNearDate } from "./util/nearDateHandler";
import { schema } from "./lib/schema";

const MakeTeamMatchModal = (props: makeTeamMatchModalProps) => {
  const { team_list_idx, onClose } = props;
  const today = new Date();
  const { hour, min } = findNearDate(today);

  const [postEvent] = usePostTeamMatch({
    teamListIdx: team_list_idx,
    onSuccess: () => {},
  });
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<MatchDatIaInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      match_match_start_date: toFormattedDate(today),
      match_match_start_time: `${hour}:${min}`,
      match_match_start_hour: hour,
      match_match_start_min: min,
      match_match_attribute: 0,
      match_type_idx_radio: "0",
      match_match_participation_type_radio: "1",
      match_match_duration: matchDuration[1],
      match_formation_idx: 0,
    },
  });
  const onSubmit: SubmitHandler<MatchDatIaInput> = (data) => {
    if (confirm("생성하시겠습니까?")) {
      postEvent(transformMatchData(data));
      onClose();
    }
  };

  // 포메이션 변경 조건
  const isCanFormationChange = watch("match_type_idx_radio") === "0";

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl w-[500px] p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">팀 매치 생성</h2>
          <button
            className="text-gray-400 hover:text-gray-600"
            onClick={onClose}>
            ✖
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* 매치 속성 선택 */}
          <div>
            <label className="block text-gray-700">매치 속성 선택</label>
            <select
              {...register("match_match_attribute", { required: true })}
              className="w-full border border-gray-300 rounded-lg p-2 mt-1">
              {teamMatchAttribute.map((item, index) => (
                <option key={index} value={index}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* 매치 종류 선택 */}
          <div>
            <label className="block text-gray-700">매치 종류 선택</label>
            <div className="flex gap-4 mt-1">
              {matchType.map((item, index) => (
                <label key={index} className="flex items-center gap-2">
                  <input
                    type="radio"
                    value={index}
                    {...register("match_type_idx_radio", { required: true })}
                    className="accent-blue-500"
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>

          {/* 승인 참여 방식 선택 */}
          <div>
            <label className="block text-gray-700">승인 참여 방식 선택</label>
            <div className="flex gap-4 mt-1">
              {matchParticipation.map((item, index) => (
                <label key={index} className="flex items-center gap-2">
                  <input
                    type="radio"
                    value={index}
                    {...register("match_match_participation_type_radio", {
                      required: true,
                    })}
                    className="accent-blue-500"
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>

          {/* 시작 날짜 선택 */}
          <div>
            <label className="block text-gray-700">시작 날짜 선택</label>
            <input
              type="date"
              {...register("match_match_start_date", { required: true })}
              className="w-full border border-gray-300 rounded-lg p-2 mt-1"
            />
            {errors.match_match_start_date && (
              <span className="text-red-500">
                {errors.match_match_start_date.message}
              </span>
            )}
          </div>

          {/* 시작 시간 선택 */}
          <div className="mb-4">
            <div className="grid grid-cols-2 gap-4">
              {/* 시간 선택 */}
              <div className="flex flex-col">
                <label className="text-gray-600 text-sm font-medium mb-1 text-start">
                  시작 - 시간
                </label>
                <select
                  {...register("match_match_start_hour", { required: true })}
                  className="w-full border border-gray-300 rounded-lg p-3 text-center text-gray-800 focus:ring-2 focus:ring-blue-400 focus:outline-none">
                  {Array.from({ length: 24 }, (_, index) => {
                    const hours = index.toString().padStart(2, "0");
                    return (
                      <option key={index} value={hours}>
                        {hours}
                      </option>
                    );
                  })}
                </select>
              </div>
              {/* 분 선택 (30분 단위만) */}
              <div className="flex flex-col">
                <label className="text-gray-600 text-sm font-medium mb-1 text-start">
                  분
                </label>
                <select
                  {...register("match_match_start_min", { required: true })}
                  className="w-full border border-gray-300 rounded-lg p-3 text-center text-gray-800 focus:ring-2 focus:ring-blue-400 focus:outline-none">
                  <option value="00">00</option>
                  <option value="30">30</option>
                </select>
              </div>

              {/* 에러 메시지 표시 시간과 분을 합치기 위해서*/}
              {errors.match_match_start_time && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.match_match_start_time.message}
                </span>
              )}
            </div>
          </div>

          {/* 매치 지속 시간 선택 */}
          <div>
            <label className="block text-gray-700">매치 지속 시간 선택</label>
            <div className="flex gap-4 mt-1">
              {matchDuration.map((item, index) => (
                <label key={index} className="flex items-center gap-2">
                  <input
                    type="radio"
                    value={item}
                    {...register("match_match_duration", { required: true })}
                    className="accent-blue-500"
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>

          {/* 포메이션 선택 */}
          <div>
            <label className="block text-gray-700">포메이션 선택</label>
            <select
              {...register("match_formation_idx", {
                required: isCanFormationChange,
              })}
              disabled={!isCanFormationChange}
              className={`w-full border border-gray-300 rounded-lg p-2 mt-1 transition-all ${
                !isCanFormationChange
                  ? "bg-gray-200 cursor-not-allowed opacity-50"
                  : "bg-white"
              }`}>
              {formation.map((item, index) => (
                <option key={index} value={index}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* 버튼 */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={onClose}
              type="button"
              className="px-4 py-2 rounded-lg border border-gray-300">
              취소
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white">
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MakeTeamMatchModal;
