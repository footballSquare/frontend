import { TeamListIdxProps } from "./type";

import usePostTeamMatch from "../../../../3_Entity/Match/usePostTeamMatch";
import { teamMatchAttribute } from "../../../../4_Shared/constant/teamMatchAttribute";
import { matchType } from "../../../../4_Shared/constant/matchType";
import { matchParticipation } from "../../../../4_Shared/constant/matchParticipation";
import { matchDuration } from "../../../../4_Shared/constant/matchDuration";
import { formation } from "../../../../4_Shared/constant/formation";
import { ExtendedMatchFormData } from "./type";
import { useForm, SubmitHandler } from "react-hook-form";

import { MatchFormData } from "../../../../3_Entity/Match/type";
import React from "react";

const MakeTeamMatchModal = ({ team_list_idx }: TeamListIdxProps) => {
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];
  const formattedTime = today.toTimeString().slice(0, 5);

  // 라디오는 defaultChecked로 처리
  const defalutRadioMatchAttribute = 0;
  const defaultRadioMatchParticipationType = 1;

  const [postEvent] = usePostTeamMatch(team_list_idx);

  const {
    register,
    watch,
    handleSubmit,
    setError,
    formState: { errors },
    clearErrors,
  } = useForm<ExtendedMatchFormData>({
    defaultValues: {
      match_match_attribute: defalutRadioMatchAttribute,
      match_type_idx: 0,
      match_match_participation_type: defaultRadioMatchParticipationType,
      match_match_start_date: formattedDate,
      match_match_start_time: formattedTime,
      match_match_duration: matchDuration[0],
      match_formation_idx: 0,
    },
  });

  const selectedMatchType = watch("match_type_idx");

  const onSubmit: SubmitHandler<ExtendedMatchFormData> = (data) => {
    const { match_match_start_date, match_match_start_time, ...rest } = data;

    // 현재 시간 가져오기
    const presentTime = new Date();
    const presentDate = presentTime.toISOString().split("T")[0]; // YYYY-MM-DD

    // 사용자가 선택한 날짜 및 시간
    const selectedDateTime = new Date(
      `${match_match_start_date}T${match_match_start_time}`
    );

    if (new Date(match_match_start_date) < new Date(presentDate)) {
      setError("match_match_start_date", {
        type: "manual",
        message: "과거 날짜는 선택할 수 없습니다.",
      });
      return;
    } else {
      clearErrors("match_match_start_date");
    }

    if (
      match_match_start_date === presentDate &&
      selectedDateTime < presentTime
    ) {
      setError("match_match_start_time", {
        type: "manual",
        message: "과거 시간은 선택할 수 없습니다.",
      });
      return;
    } else {
      clearErrors("match_match_start_time");
    }

    const submitData: MatchFormData = {
      ...rest,
      match_formation_idx: Number(data.match_formation_idx),
      match_match_participation_type: Number(
        data.match_match_participation_type
      ),
      match_type_idx: Number(data.match_type_idx),
      match_match_attribute: Number(data.match_match_attribute),
      match_match_start_time: `${match_match_start_date} ${match_match_start_time}`,
      match_match_duration: data.match_match_duration,
    };

    console.log("최종 전송 데이터:", submitData);
    postEvent(submitData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl w-[500px] p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">팀 매치 모달 생성</h2>
          <button className="text-gray-400 hover:text-gray-600">✖</button>
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
                    defaultChecked={index === defalutRadioMatchAttribute}
                    type="radio"
                    value={index}
                    {...register("match_type_idx", { required: true })}
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
                    defaultChecked={
                      index === defaultRadioMatchParticipationType
                    }
                    type="radio"
                    value={index}
                    {...register("match_match_participation_type", {
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
                required: Number(selectedMatchType) === 0,
              })}
              disabled={Number(selectedMatchType) !== 0}
              className={`w-full border border-gray-300 rounded-lg p-2 mt-1 transition-all ${
                Number(selectedMatchType) !== 0
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
