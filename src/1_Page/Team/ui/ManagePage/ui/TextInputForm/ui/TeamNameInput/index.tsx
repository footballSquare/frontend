import React from "react";
import useGetRepeatTeam, {
  RESULT_STATE,
} from "../../../../../../../../3_Entity/Team/useGetRepeatTeam";
import { InputFieldProps } from "./type";

const InputTeamName = (props: InputFieldProps) => {
  const { register, errors, modifyMode, getValues } = props;
  const formKey = "team_list_name";
  const [result, loading, getEvent, resetResult] = useGetRepeatTeam();

  // result = [available , notavailable , null]
  React.useEffect(() => {
    if (modifyMode) {
      resetResult(); // 증복
    }
  }, [modifyMode]);

  const handleClick = () => {
    getEvent(getValues(formKey));
  };

  return (
    <div>
      <p className="text-sm font-medium text-gray-600">Team Name</p>
      <div className="flex w-full">
        <input
          {...register(formKey)}
          disabled={!modifyMode}
          className={`flex-1 p-2 text-sm border rounded-md ${
            modifyMode ? "border-gray-300" : "bg-gray-100 text-gray-500"
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
            result !== RESULT_STATE.AVAILABLE
              ? "text-red-500"
              : "text-green-500"
          }`}>
          {result !== RESULT_STATE.AVAILABLE
            ? "이미 사용 중인 팀명입니다."
            : "사용 가능한 팀명입니다."}
        </p>
      )}
      {errors[formKey] && (
        <p className="text-red-500 text-xs">{errors[formKey]?.message}</p>
      )}
    </div>
  );
};

export default InputTeamName;
