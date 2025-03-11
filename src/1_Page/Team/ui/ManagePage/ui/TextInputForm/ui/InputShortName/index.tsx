import useGetRepeatShortTeam from "../../../../../../../../3_Entity/Team/useGetRepeatShortTeam";
import { InputFieldProps } from "./type";

const InputShortName = (props: InputFieldProps) => {
  const { register, errors, modifyMode } = props;
  const formKey = "team_list_name";

  const [isRepeat, loading] = useGetRepeatShortTeam();

  return (
    <div>
      <p className="text-sm font-medium text-gray-600">Team Name</p>
      <input
        {...register(formKey)}
        disabled={!modifyMode}
        className={`w-full p-2 text-sm border rounded-md ${
          modifyMode ? "border-gray-300" : "bg-gray-100 text-gray-500"
        }`}
        placeholder="팀 이름을 입력하세요"
      />
      {errors[formKey] && (
        <p className="text-red-500 text-xs">{errors[formKey]?.message}</p>
      )}
      {modifyMode && (
        <button
          type="button"
          onClick={() => {}}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200">
          {loading ? "확인 중..." : "중복 확인하기"}
        </button>
      )}
      {modifyMode && !loading && (
        <p
          className={`text-sm mt-1 ${
            isRepeat ? "text-red-500" : "text-green-500"
          }`}>
          {isRepeat ? "이미 사용 중인 팀명입니다." : "사용 가능한 팀명입니다."}
        </p>
      )}
    </div>
  );
};

export default InputShortName;
