import useManageModify from "./model/useManageModify";
import InputField from "./ui/InputFiled";
import TeamNameInput from "./ui/TeamNameInput";
import { schema } from "./lib/schema";
import { TeamInfoInput } from "./type";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";

const TextInputForm = (props: TeamInfoInput) => {
  const teamInfo = props;
  const {
    reset,
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<TeamInfoInput>({
    resolver: yupResolver(schema),
  });
  const { modifyMode, handleCancle, handleModifyFalse, handleBackupData } =
    useManageModify({ reset, teamInfo });

  const onSubmit: SubmitHandler<TeamInfoInput> = () => {
    handleModifyFalse();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* 팀명 입력 */}
      <TeamNameInput
        register={register}
        errors={errors}
        modifyMode={modifyMode}
      />

      {/* 팀 약칭 입력 */}
      <InputField
        label="Short Team Name"
        name="team_list_short_name"
        register={register}
        errors={errors}
        modifyMode={modifyMode}
        placeholder="Enter Short Team Name"
      />

      {/* 팀 색상 선택 */}
      <InputField
        label="Team Color"
        name="team_list_color"
        register={register}
        errors={errors}
        modifyMode={modifyMode}
        type="color"
      />

      {/* 팀 공지 입력 */}
      <InputField
        label="Team Notice"
        name="team_list_announcement"
        register={register}
        errors={errors}
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
              className="py-2 px-4 bg-green-600 text-white rounded-md">
              저장
            </button>
          </div>
        )}
      </div>
    </form>
  );
};
export default TextInputForm;
