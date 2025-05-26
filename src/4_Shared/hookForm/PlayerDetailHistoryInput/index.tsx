// 공통 숫자 입력 필드
const PlayerStatsDetailInput = (props: PlayerStatsDetailInputProps) => {
  const { label, name, register, errors, readOnly, children } = props;

  const inputCls =
    "w-24 px-1 py-0.5 bg-gray-900 border border-gray-700 rounded text-right";

  return (
    <div className="flex flex-col gap-1 text-sm">
      <div className="flex items-center gap-2">
        <span className="w-32 text-gray-400">{label}:</span>
        {readOnly ? (
          <span className="font-medium">{children}</span>
        ) : (
          <input type="number" className={inputCls} {...register(name)} />
        )}
      </div>
      {!readOnly && errors[name] && (
        <span className="text-xs text-red-500">
          {errors[name]?.message as string}
        </span>
      )}
    </div>
  );
};

export default PlayerStatsDetailInput;
