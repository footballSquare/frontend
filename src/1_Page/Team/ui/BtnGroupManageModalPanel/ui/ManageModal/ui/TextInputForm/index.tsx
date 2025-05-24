import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";

import useManageModify from "./model/useManageModify";
import { schema } from "./lib/schema";
import { convertToPutData, convertToTeamInfoForm } from "./util/convet";
import usePutTeamInfo from "../../../../../../../../3_Entity/Team/usePutTeamInfo";
import TeamNameRepeatProvider from "./ui/TeamNameRepeatProvider";
import TeamManageTextInput from "../../../../../../../../4_Shared/hookForm/TeamManageTextInput";

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
    handleSubmit,
    getValues,
    setValue,
    formState: { isValid },
    reset,
  } = forms;

  const { modifyMode, handleCancle, handleModifyFalse, handleBackupData } =
    useManageModify({ reset, setValue, teamInfoForm });

  const [putTeamInfo] = usePutTeamInfo(team_list_idx);

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
        <TeamNameRepeatProvider modifyMode={modifyMode} isShort={false}>
          <TeamManageTextInput
            modifyMode={modifyMode}
            registerType="team_list_name"
          />
        </TeamNameRepeatProvider>

        {/* 짧은 태그 입력 */}
        <TeamNameRepeatProvider modifyMode={modifyMode} isShort>
          <TeamManageTextInput
            modifyMode={modifyMode}
            registerType="team_list_short_name"
          />
        </TeamNameRepeatProvider>
        {/* 팀원 모집상태 */}
        <TeamManageTextInput
          modifyMode={modifyMode}
          registerType="common_status_idx"
        />

        {/* 팀 색상 선택 */}
        <TeamManageTextInput
          modifyMode={modifyMode}
          registerType="team_list_color"
        />

        {/* 팀 공지 입력 */}
        <TeamManageTextInput
          modifyMode={modifyMode}
          registerType="team_list_announcement"
        />

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
