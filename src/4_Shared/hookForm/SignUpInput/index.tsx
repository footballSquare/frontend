const SignUpInput = (props: SignUpInputProps) => {
  const { register, registerType, errors, type, placeholder } = props;
  
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-200">
        {registerType.toUpperCase()}
      </label>
      <div className="relative">
        <input
          type={type}
          id={registerType}
          {...register(registerType)}
          className={`w-full px-3 py-2.5 bg-gray-800/50 border ${
            errors[registerType] ? "border-red-400" : "border-gray-600"
          } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm text-sm`}
          placeholder={placeholder || ""}
        />
        {errors[registerType] && (
          <div className="absolute -bottom-5 left-0">
            <p className="text-red-400 text-xs">
              {errors[registerType].message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUpInput;
