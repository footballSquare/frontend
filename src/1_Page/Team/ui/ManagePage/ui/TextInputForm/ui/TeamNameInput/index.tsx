import { useFormContext } from "react-hook-form";
import { TeamNameCheckInputProps } from "./type";

import useLoadHandler from "./model/useLoadHandler";
import useGetRepeatTeam from "../../../../../../../../3_Entity/Team/useGetRepeatTeam";
import useGetRepeatShortTeam from "../../../../../../../../3_Entity/Team/useGetRepeatShortTeam";

const TeamNameCheckInput = (props: TeamNameCheckInputProps) => {
  const { modifyMode, isShort } = props;

  const {
    register,
    formState: { errors },
    getValues,
    trigger,
    setValue,
  } = useFormContext();

  // isShort 값에 따라 다른 필드 사용
  const formKey = isShort ? "team_list_short_name" : "team_list_name";
  const repeatFormKey = isShort
    ? "short_team_repeat_checked"
    : "team_repeat_checked";

  const [isRepeatShort, shortLoading, getRepeatShortTeam] =
    useGetRepeatShortTeam();
  const [isRepeatTeam, teamLoading, getRepeatTeam] = useGetRepeatTeam();

  // 훅 동적 적용
  const isRepeat = isShort ? isRepeatShort : isRepeatTeam;
  const loading = isShort ? shortLoading : teamLoading;
  const selectGetEvent = isShort ? getRepeatShortTeam : getRepeatTeam;
  const [loadState] = useLoadHandler({
    loading,
    modifyMode,
    isRepeat,
    setValue,
    trigger,
    repeatFormKey,
  });
  const disable = !modifyMode || (!loadState && !isRepeat);

  const handleClick = async () => {
    const isValid = await trigger(formKey); // 유효성 검증
    if (isValid) {
      selectGetEvent(getValues(formKey)); // 증복검사
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
          className={`w-full p-3 text-sm border-2 rounded-xl outline-none transition-all duration-200 ${
            !disable
              ? "border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              : "bg-gray-50 text-gray-500 border-gray-100"
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

      {modifyMode && !loadState && (
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

export default TeamNameCheckInput;
