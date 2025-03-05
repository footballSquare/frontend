import { InputProps } from "./type";
const Input = (props: InputProps) => {
  const { register, registerType, errors, text, type, defaultValue, isMatchEnd } = props;
  return (
    <label className=" flex gap-4 text-xs">
      {text}
      <input
        type={type}
        className=" w-[128px] border-1 border-gray shadow-lg rounded-lg"
        {...register(registerType)}
        defaultValue={defaultValue}
        disabled={isMatchEnd}
      />
      {errors[registerType] && <p>{errors[registerType].message}</p>}
    </label>
  );
};

export default Input;
