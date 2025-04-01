const LoginInput = (props: LoginInputProps) => {
  const { register, registerType, errors, type, placeholder } = props;
  
  return (
    <div>
      <label className="block text-sm font-medium text-gray">
        {registerType.toUpperCase()}
      </label>
      <input
        type={type}
        id={registerType}
        {...register(registerType)}
        className={`mt-1 block w-full p-2 border ${
          errors.id ? "border-red-500" : "border-gray"
        } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
        placeholder={placeholder || ""}
      />
      {errors[registerType] && (
        <p className="text-red-500 text-sm mt-1">
          {errors[registerType].message}
        </p>
      )}
    </div>
  );
};

export default LoginInput;
