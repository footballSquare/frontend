import { InputFieldProps } from "./type";
const TeamNameInput = (props: InputFieldProps) => {
  const { label, register, name, errors, modifyMode, placeholder = "" } = props;

  return (
    <div>
      <p className="text-sm font-medium text-gray-600">{label}</p>
      <input
        {...register(name)}
        type="text"
        disabled={!modifyMode}
        className={`w-full p-2 text-sm border rounded-md ${
          modifyMode ? "border-gray-300" : "bg-gray-100 text-gray-500"
        }`}
        placeholder={placeholder}
      />
      <button className="">버튼</button>
      {errors[name] && (
        <p className="text-red-500 text-xs">{errors[name]?.message}</p>
      )}
    </div>
  );
};

export default TeamNameInput;
