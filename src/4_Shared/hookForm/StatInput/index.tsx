const StatInput = (props: StatInputProps) => {
  const { register, registerType, errors, text, type, isMatchEnd } = props;
  return (
    <label className="flex flex-col gap-2 text-sm font-medium">
      {text}
      <input
        type={type}
        className={`mt-1 block w-full p-2 border ${
          errors[registerType] ? "border-red-500" : "border-gray"
        } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
        {...register(registerType)}
        disabled={isMatchEnd}
      />
      {errors[registerType] && (
        <p className="text-red-500 text-sm mt-1">
          {errors[registerType].message}
        </p>
      )}
    </label>
  );
};

export default StatInput;
