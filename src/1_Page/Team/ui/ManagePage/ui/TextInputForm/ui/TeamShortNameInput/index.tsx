import React from "react";

import { InputFieldProps } from "./type";
import useGetRepeatShortTeam from "../../../../../../../../3_Entity/Team/useGetRepeatShortTeam";
import { RESULT_STATE } from "../../../../../../../../3_Entity/Team/useGetRepeatShortTeam";

const TeamShortNameInput = (props: InputFieldProps) => {
  const { register, errors, modifyMode, getValues, isRepeatCheckRef } = props;
  const formKey = "team_list_short_name";
  const [result, loading, getEvent, resetResult] = useGetRepeatShortTeam();
  const isNotRepeat = result === RESULT_STATE.AVAILABLE;
  const isRepeat = result === RESULT_STATE.UNAVAILABLE;

  // result = [available , notavailable , null]
  React.useEffect(() => {
    if (!modifyMode) {
      resetResult(); // 증복
      isRepeatCheckRef.current = false;
    }
  }, [modifyMode]);

  React.useEffect(() => {
    if (isNotRepeat) {
      isRepeatCheckRef.current = true;
    }
    if (isRepeat) {
      isRepeatCheckRef.current = false;
    }
  }, [result]);

  const handleClick = () => {
    getEvent(getValues(formKey));
  };

  return (
    <div>
      <p className="text-sm font-medium text-gray-600">Team Name</p>
      <div className="flex w-full">
        <input
          {...register(formKey)}
          disabled={!modifyMode || isNotRepeat}
          className={`flex-1 p-2 text-sm border rounded-md transition-all duration-300 ${
            !modifyMode || isNotRepeat
              ? "bg-gray-100 text-gray-500 border-gray-300 cursor-not-allowed"
              : "border-gray-300 bg-white text-black"
          }`}
          placeholder="팀 이름을 입력하세요"
        />
        {modifyMode && (
          <button
            type="button"
            onClick={handleClick}
            className="w-[120px] bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200">
            중복 확인하기
          </button>
        )}
      </div>
      {modifyMode && !loading && result && (
        <p
          className={`text-sm mt-1 ${
            isRepeat ? "text-red-500" : "text-green-500"
          }`}>
          {isRepeat
            ? "이미 사용 중인 팀약칭입니다."
            : "사용 가능한 팀약칭입니다."}
        </p>
      )}
      {errors[formKey] && (
        <p className="text-red-500 text-xs">{errors[formKey]?.message}</p>
      )}
    </div>
  );
};

export default TeamShortNameInput;
