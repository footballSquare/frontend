import { useFormContext } from "react-hook-form";
import { InputFieldProps } from "./type";
import useResultHandler from "./model/useResultHandler";

import useGetRepeatTeam from "../../../../../../../../3_Entity/Team/useGetRepeatTeam";
import useGetRepeatShortTeam from "../../../../../../../../3_Entity/Team/useGetRepeatShortTeam";

const TeamNameInput = (props: InputFieldProps) => {
  const { modifyMode, isShort } = props;

  const {
    register,
    formState: { errors },
    getValues,
    setValue,
    trigger,
  } = useFormContext();

  // isShort 값에 따라 다른 필드 사용
  const formKey = isShort ? "team_list_short_name" : "team_list_name";
  const repeatFormKey = isShort
    ? "short_team_repeat_checked"
    : "team_repeat_checked";

  const [shortResult, shortLoading, shortGetEvent, shortResetResult] =
    useGetRepeatShortTeam();
  const [result, loading, getEvent, resetResult] = useGetRepeatTeam();

  // 훅 동적 적용
  const selectResult = isShort ? shortResult : result;
  const selectLoading = isShort ? shortLoading : loading;
  const selectGetEvent = isShort ? shortGetEvent : getEvent;
  const selectResetResult = isShort ? shortResetResult : resetResult;

  // result 값에 따라 적용
  const [isNotRepeat, isRepeat] = useResultHandler({
    result: selectResult,
    modifyMode,
    resetResult: selectResetResult,
  });
  const disable = !modifyMode || isNotRepeat;
  if (isNotRepeat) {
    setValue(repeatFormKey, true);
  }
  const handleClick = async () => {
    const isValid = await trigger(formKey);
    if (isValid) {
      selectGetEvent(getValues(formKey));
    }
  };

  return (
    <div>
      <p className="text-sm font-medium text-gray-600">
        {isShort ? "Short Team Name" : "Team Name"}
      </p>
      <div className="flex w-full">
        <input
          {...register(formKey)}
          disabled={disable}
          className={`flex-1 p-2 text-sm border rounded-md transition-all duration-300 ${
            disable
              ? "bg-gray-100 text-gray-500 border-gray-300 cursor-not-allowed"
              : "border-gray-300 bg-white text-black"
          }`}
          placeholder={
            isShort ? "짧은 팀 이름을 입력하세요" : "팀 이름을 입력하세요"
          }
        />
        {modifyMode && (
          <button
            type="button"
            onClick={handleClick}
            disabled={disable}
            className={`w-[140px] flex items-center justify-center gap-2 
                text-white text-sm font-semibold py-2 px-4 rounded-lg shadow-md 
                transition duration-300 ease-in-out
                ${
                  disable
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:ring focus:ring-blue-300"
                }`}>
            중복 확인
          </button>
        )}
      </div>

      {modifyMode && !selectLoading && selectResult && (
        <p
          className={`text-sm mt-1 ${
            isRepeat ? "text-red-500" : "text-green-500"
          }`}>
          {isRepeat ? "이미 사용 중인 팀명입니다." : "사용 가능한 팀명입니다."}
        </p>
      )}

      {errors[formKey] && (
        <p className="text-red-500 text-xs">
          {errors[formKey]?.message?.toString()}
        </p>
      )}

      {errors[repeatFormKey] && (
        <p className="text-red-500 text-xs">
          {errors[repeatFormKey]?.message?.toString()}
        </p>
      )}
    </div>
  );
};

export default TeamNameInput;
