import { FormProvider } from "react-hook-form";

import useTextInputForm from "./model/useTextInputForm";
import TeamNameRepeatProvider from "./ui/TeamNameRepeatProvider";
import TeamManageTextInput from "../../../../../../../../4_Shared/hookForm/TeamManageTextInput";
import useToggleState from "../../../../../../../../4_Shared/model/useToggleState";
import usePutTeamInfoHandler from "./model/usePutTeamInfoHandler";

const TextInputForm = (props: TextInputFormProps) => {
  const { teamInfo, handleSetTeamInfoPreview } = props;

  const { forms, handleCancle, handleBackupData } = useTextInputForm({
    teamInfo,
  });

  const {
    handleSubmit,
    setValue,
    formState: { isValid },
  } = forms;

  const { handlePutTeamInfo } = usePutTeamInfoHandler({
    team_list_idx: teamInfo.team_list_idx,
    setValue,
    handleSetTeamInfoPreview,
  });

  const [modifyMode, toggleModifyMode] = useToggleState();

  return (
    <FormProvider {...forms}>
      <form
        onSubmit={handleSubmit((data: TeamInfoForm) => {
          handlePutTeamInfo(data);
          toggleModifyMode();
        })}
        className="flex-1 min-w-[300px]  rounded-lg shadow-md p-4">
        {/* 팀명 입력 */}
        <TeamNameRepeatProvider
          modifyMode={modifyMode}
          isShort={false}
          beforeName={teamInfo.team_list_name}>
          <TeamManageTextInput
            modifyMode={modifyMode}
            registerType="team_list_name"
          />
        </TeamNameRepeatProvider>

        {/* 짧은 태그 입력 */}
        <TeamNameRepeatProvider
          modifyMode={modifyMode}
          isShort
          beforeName={teamInfo.team_list_short_name}>
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
                handleBackupData();
                toggleModifyMode();
              }}>
              수정하기
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                className="py-2 px-4 bg-red-600 text-white rounded-md"
                onClick={() => {
                  handleCancle();
                  toggleModifyMode();
                }}>
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
