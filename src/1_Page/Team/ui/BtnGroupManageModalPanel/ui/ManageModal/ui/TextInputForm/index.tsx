import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";

import InputField from "./ui/InputFiled";
import TeamNameCheckInput from "./ui/TeamNameCheckInput";
import StatusRadio from "./ui/StautsRadio";
import useManageModify from "./model/useManageModify";
import { schema } from "./lib/schema";
import { convertToPutData, convertToTeamInfoForm } from "./util/convet";
import usePutTeamInfo from "../../../../../../../../3_Entity/Team/usePutTeamInfo";

const TextInputForm = (props: TextInputFormProps) => {
  const { team_list_idx, teamInfo, handleSetTeamInfoWithoutImg } = props;

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
    handleSetTeamInfoWithoutImg(data);
    handleModifyFalse();
  };

  return (
    <FormProvider {...forms}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-1 min-w-[300px]  rounded-lg shadow-md p-4">
        {/* 팀명 입력 */}
        <TeamNameCheckInput modifyMode={modifyMode} isShort={false} />
        {/* 짧은 태그 입력 */}
        <TeamNameCheckInput modifyMode={modifyMode} isShort={true} />
        {/* 팀원 모집상태 */}
        <StatusRadio modifyMode={modifyMode} />

        {/* 팀 색상 선택 */}
        <InputField
          label="Team Color"
          name="team_list_color"
          modifyMode={modifyMode}
          type="color"
          placeholder="Enter Team Notice"
        />

        {/* 팀 공지 입력 */}
        <InputField
          label="Team Notice"
          name="team_list_announcement"
          modifyMode={modifyMode}
          type="textarea"
          placeholder="Enter Team Notice"
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
