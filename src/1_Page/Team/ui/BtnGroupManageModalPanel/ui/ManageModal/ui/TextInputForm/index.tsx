import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";

import useManageModify from "./model/useManageModify";
import { schema } from "./lib/schema";
import { convertToPutData, convertToTeamInfoForm } from "./util/convet";
import usePutTeamInfo from "../../../../../../../../3_Entity/Team/usePutTeamInfo";
import TeamNameRepeatProvider from "./ui/TeamNameRepeatProvider";
import useGetRepeatTeam from "../../../../../../../../3_Entity/Team/useGetRepeatTeam";
import useGetRepeatShortTeam from "../../../../../../../../3_Entity/Team/useGetRepeatShortTeam";

const TextInputForm = (props: TextInputFormProps) => {
  const { team_list_idx, teamInfo, handleSetTeamInfoPreview } = props;

  // props가 변경되지 않는 한, 기존 teamInfoForm 값을 재사용하여 불필요한 input form 재생성을 방지
  const teamInfoForm = React.useMemo(
    () => convertToTeamInfoForm(teamInfo),
    [teamInfo]
  );

  const forms = useForm<TeamInfoForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { isValid, errors },
    reset,
  } = forms;

  const { modifyMode, handleCancle, handleModifyFalse, handleBackupData } =
    useManageModify({ reset, setValue, teamInfoForm });

  const [putTeamInfo] = usePutTeamInfo(team_list_idx);
  const [getRepeatTeam] = useGetRepeatTeam();
  const [getRepeatShortTeam] = useGetRepeatShortTeam();

  const onSubmit: SubmitHandler<TeamInfoForm> = (data) => {
    putTeamInfo(convertToPutData(data));
    handleSetTeamInfoPreview(data);
    handleModifyFalse();
  };

  return (
    <FormProvider {...forms}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-1 min-w-[300px]  rounded-lg shadow-md p-4">
        {/* 팀명 입력 */}
        <TeamNameRepeatProvider getRepeatCheck={getRepeatTeam}>
          <input
            {...register("team_list_name")}
            disabled={!modifyMode}
            className={`w-full p-3 text-sm border-2 rounded-xl outline-none transition-all duration-200 ${
              modifyMode
                ? "border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                : "bg-gray-700 text-gray-200 border-gray-100"
            }`}
            placeholder="팀 이름을 입력하세요"
          />
        </TeamNameRepeatProvider>

        {/* 짧은 태그 입력 */}
        <TeamNameRepeatProvider getRepeatCheck={getRepeatShortTeam}>
          <input
            {...register("team_list_short_name")}
            disabled={!modifyMode}
            className={`w-full p-3 text-sm border-2 rounded-xl outline-none transition-all duration-200 ${
              modifyMode
                ? "border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                : "bg-gray-700 text-gray-200 border-gray-100"
            }`}
            placeholder="짧은 팀 이름을 입력하세요"
          />
        </TeamNameRepeatProvider>
        {/* 팀원 모집상태 */}
        <div>
          <p className="text-sm font-medium text-gray-600">팀 태그 출력</p>
          <div className="flex gap-4">
            {["0", "1"].map((value, idx) => {
              const labelText = idx === 0 ? "미출력" : "출력";
              const active = forms.watch("common_status_idx") == value;
              const color = idx === 0 ? "blue" : "green";
              return (
                <label
                  key={value}
                  className={`flex items-center gap-2 ${
                    !modifyMode && "cursor-not-allowed"
                  }`}>
                  <input
                    type="radio"
                    value={value}
                    {...forms.register("common_status_idx")}
                    disabled={!modifyMode}
                    className="hidden"
                  />
                  <div
                    className={`w-5 h-5 rounded-full border-2 transition ${
                      active
                        ? `bg-${color}-600 border-${color}-600`
                        : "border-gray-400"
                    } ${!modifyMode && "opacity-50"}`}
                  />
                  <span className="text-sm font-medium">{labelText}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* 팀 색상 선택 */}
        <div className="mb-4">
          <label
            htmlFor="team_list_color"
            className="block mb-1.5 text-sm font-medium text-gray-700">
            Team Color
          </label>
          <input
            id="team_list_color"
            type="color"
            {...forms.register("team_list_color")}
            disabled={!modifyMode}
            className={`w-[48px] h-[48px] p-1 text-sm border-2 rounded-xl outline-none transition-all duration-200 ${
              modifyMode
                ? "border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                : "bg-gray-700 text-gray-500 border-gray-100"
            }`}
          />
          {errors.team_list_color && (
            <p className="mt-1.5 text-rose-500 text-xs font-medium">
              {String(errors.team_list_color?.message || "")}
            </p>
          )}
        </div>

        {/* 팀 공지 입력 */}
        <div className="mb-4">
          <label
            htmlFor="team_list_announcement"
            className="block mb-1.5 text-sm font-medium text-gray-700">
            Team Notice
          </label>
          <textarea
            id="team_list_announcement"
            {...forms.register("team_list_announcement")}
            disabled={!modifyMode}
            className={`w-full p-3 text-sm border-2 rounded-xl outline-none transition-all duration-200 ${
              modifyMode
                ? "border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                : "bg-gray-700 text-gray-200 border-gray-100"
            }`}
            placeholder="Enter Team Notice"
          />
          {errors.team_list_announcement && (
            <p className="mt-1.5 text-rose-500 text-xs font-medium">
              {errors.team_list_announcement?.message || ""}
            </p>
          )}
        </div>

        {/* 제출 버튼 */}
        <div className="flex justify-end gap-4 mt-4">
          {!modifyMode ? (
            <button
              className="py-2 px-4 bg-blue-600 text-white rounded-md"
              onClick={(e) => {
                e.preventDefault();
                handleBackupData(getValues());
              }}>
              수정하기
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                className="py-2 px-4 bg-red-600 text-white rounded-md"
                onClick={handleCancle}>
                취소
              </button>
              <button
                type="submit"
                disabled={!isValid}
                className={`py-2 px-4 rounded-md text-white font-semibold shadow-md transition duration-300
              ${
                isValid
                  ? "bg-green-600 hover:bg-green-700 active:bg-green-800 focus:ring focus:ring-green-300"
                  : "bg-gray-400 text-gray-500 cursor-none"
              }`}>
                저장
              </button>
            </div>
          )}
        </div>
      </form>
    </FormProvider>
  );
};
export default TextInputForm;
