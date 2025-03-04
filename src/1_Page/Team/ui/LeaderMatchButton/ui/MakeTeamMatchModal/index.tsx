import { useForm, SubmitHandler } from "react-hook-form";
import {
  toFormattedDate,
  toFormattedTime,
} from "../../../../../../4_Shared/lib/dateFormatter";
import usePostTeamMatch from "../../../../../../3_Entity/Match/usePostTeamMatch";

// 타입
import { makeTeamMatchModalProps } from "./type";
import { ExtendedMatchFormData } from "./type";

// 상수
import { teamMatchAttribute } from "../../../../../../4_Shared/constant/teamMatchAttribute";
import { matchType } from "../../../../../../4_Shared/constant/matchType";
import { matchParticipation } from "../../../../../../4_Shared/constant/matchParticipation";
import { matchDuration } from "../../../../../../4_Shared/constant/matchDuration";
import { formation } from "../../../../../../4_Shared/constant/formation";
import transformMatchData from "./model/transformMatchData";
import inputErrorHandler from "./model/inputErrorHandler";

const MakeTeamMatchModal = (props: makeTeamMatchModalProps) => {
  const { team_list_idx, onClose } = props;
  const today = new Date();

  const [postEvent] = usePostTeamMatch(team_list_idx);
  const {
    register,
    watch,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ExtendedMatchFormData>({
    defaultValues: {
      match_match_start_date: toFormattedDate(today),
      match_match_start_time: toFormattedTime(today),
      match_match_attribute: 0,
      match_type_idx_radio: "0",
      match_match_participation_type_radio: "1",
      match_match_duration: matchDuration[1],
      match_formation_idx: 0,
    } as ExtendedMatchFormData,
  });

  const onSubmit: SubmitHandler<ExtendedMatchFormData> = (data) => {
    const hasError = inputErrorHandler(
      setError,
      data.match_match_start_date,
      data.match_match_start_time
    );
    if (!hasError) {
      postEvent(transformMatchData(data));
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
          <div>
            <label className="block text-gray-700">시작 시간 선택</label>
            <input
              type="time"
              {...register("match_match_start_time", { required: true })}
              className="w-full border border-gray-300 rounded-lg p-2 mt-1"
            />
            {errors.match_match_start_time && (
              <span className="text-red-500">
                {errors.match_match_start_time.message}
              </span>
            )}
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
