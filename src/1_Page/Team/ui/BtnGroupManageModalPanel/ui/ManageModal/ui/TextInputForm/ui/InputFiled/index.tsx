import { useFormContext } from "react-hook-form";

const InputField = (props: InputFieldProps) => {
  const { label, modifyMode, type = "text", name, placeholder = "" } = props;
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block mb-1.5 text-sm font-medium text-gray-700">
        {label}
      </label>

      {type === "textarea" ? (
        <textarea
          id={name}
          {...register(name)}
          disabled={!modifyMode}
          className={`w-full p-3 text-sm border-2 rounded-xl outline-none transition-all duration-200 ${
            modifyMode
              ? "border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              : "bg-gray-700 text-gray-200 border-gray-100"
          }`}
          placeholder={placeholder}
        />
      ) : (
        <input
          id={name}
          {...register(name)}
          type={type}
          disabled={!modifyMode}
          className={`${
            type === "color" ? "w-[48px] h-[48px] p-1" : "w-full p-3"
          } text-sm border-2 rounded-xl outline-none transition-all duration-200 ${
            modifyMode
              ? "border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              : "bg-gray-700 text-gray-500 border-gray-100"
          }`}
          placeholder={placeholder}
        />
      )}

      {errors[name] && (
        <p className="mt-1.5 text-rose-500 text-xs font-medium">
          {errors[name]?.message?.toString()}
        </p>
      )}
    </div>
  );
};

export default InputField;
