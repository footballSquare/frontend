import { useFormContext } from "react-hook-form";

import useLoadHandler from "./model/useLoadHandler";
import useGetRepeat from "./model/useGetRepeat";

const TeamNameCheckInput = (props: TeamNameCheckInputProps) => {
  const { modifyMode, isShort } = props;

  const {
    register,
    formState: { errors },
    getValues,
    trigger,
    setValue,
  } = useFormContext();

  const { isRepeat, loading, getRepeatEvent, formKey, repeatFormKey } =
    useGetRepeat(isShort);

  const { loadState, isNotChange, handleClick } = useLoadHandler({
    loading,
    modifyMode,
    isRepeat,
    setValue,
    trigger,
    repeatFormKey,
    formKey,
    getValues,
    getRepeatEvent,
  });

  const disable = !modifyMode || (!loadState && !isRepeat) || isNotChange;
  return (
    <div>
      <p className="text-sm font-medium text-gray-300">
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
