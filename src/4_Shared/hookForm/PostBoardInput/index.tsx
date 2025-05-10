const PostBoardInput = (props: PostBoardInputProps) => {
  const { register, registerType, errors, type, placeholder } = props;

  return (
    <div className={`${registerType === "content" && "h-full"}`}>
      {registerType !== "content" ? (
        <div className="h-full">
          <input
            type={type}
            id={registerType}
            {...register(registerType)}
            className={`mt-1 block w-full h-full p-2 border ${
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
      ) : (
        <div className="h-full">
          <textarea
            type={type}
            id={registerType}
            {...register(registerType)}
            className={`mt-1 block w-full h-full p-2 border ${
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
      )}
    </div>
  );
};

export default PostBoardInput;
