import { useFormContext } from "react-hook-form";
import { InputFieldProps } from "./type";
const InputField = (props: InputFieldProps) => {
  const { label, modifyMode, type = "text", name, placeholder = "" } = props;
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div>
      <p className="text-sm font-medium text-gray-600">{label}</p>
      {type === "textarea" ? (
        <input
          {...register(name)}
          disabled={!modifyMode}
          className={`w-full p-2 text-sm border rounded-md ${
            modifyMode ? "border-gray-300" : "bg-gray-100 text-gray-500"
          }`}
          placeholder={placeholder}
        />
      ) : (
        <input
          {...register(name)}
          type={type}
          disabled={!modifyMode}
          className={`${
            type === "color" ? "w-[40px] h-[40px]" : "w-full"
          } p-2 text-sm border rounded-md ${
            modifyMode ? "border-gray-300" : "bg-gray-100 text-gray-500"
          }`}
          placeholder={placeholder}
        />
      )}
      {errors[name] && (
        <p className="text-red-500 text-xs">
          {errors[name]?.message?.toString()}
        </p>
      )}
    </div>
  );
};

export default InputField;
