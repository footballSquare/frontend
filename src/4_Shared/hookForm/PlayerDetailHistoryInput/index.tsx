// 공통 숫자 입력 필드
const PlayerStatsDetailInput = (props: PlayerStatsDetailInputProps) => {
  const { label, name, register, errors, readOnly, children } = props;

  const inputCls =
    "w-20 px-2 py-1 bg-gray-900 border border-gray-700 rounded text-center text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";

  return (
    <div className="flex flex-col gap-1 text-sm">
      <div className="flex items-center gap-3">
        <span className="w-32 text-gray-400 flex-shrink-0">{label}:</span>
        {readOnly ? (
          <span className="font-medium text-white">{children}</span>
        ) : (
          <input
            type="number"
            className={inputCls}
            min="0"
            {...register(name, {
              valueAsNumber: true,
              min: { value: 0, message: "0 이상의 값을 입력해주세요" },
            })}
          />
        )}
      </div>
      {!readOnly && errors[name] && (
        <span className="text-xs text-red-500 ml-36">
          {errors[name]?.message as string}
        </span>
      )}
    </div>
  );
};

export default PlayerStatsDetailInput;
