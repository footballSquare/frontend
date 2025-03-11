import { InputFieldProps } from "./type";
const TeamNameInput = (props: InputFieldProps) => {
  const { register, errors, modifyMode } = props;
  const formKey = "team_list_name";

  return (
    <div>
      <p className="text-sm font-medium text-gray-600">Team Name</p>
      <input
        {...register(formKey)}
        type="text"
        disabled={!modifyMode}
        className={`w-full p-2 text-sm border rounded-md ${
          modifyMode ? "border-gray-300" : "bg-gray-100 text-gray-500"
        }`}
        placeholder={"팀 이름을 입력하세요"}
      />
      <button className="">버튼</button>
      {errors[formKey] && (
        <p className="text-red-500 text-xs">{errors[formKey]?.message}</p>
      )}
    </div>
  );
};

export default TeamNameInput;
