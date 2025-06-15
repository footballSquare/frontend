import React from "react";

// 공통 숫자 입력 필드
const PlayerStatsDetailInput = (props: PlayerStatsDetailInputProps) => {
  const { label, name, register, errors, isEditing, children } = props;

  const editingInputCls =
    "w-20 px-2 py-1 bg-gray-900 border border-gray-700 rounded text-center text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";

  const readOnlyInputCls =
    "w-20 px-2 py-1 bg-transparent border-none rounded text-center text-white font-medium focus:outline-none cursor-default [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";

  // children이 React 요소인지 확인
  const isChildrenReactElement = React.isValidElement(children);
  const defaultValue = isChildrenReactElement ? undefined : children;

  return (
    <div className="flex flex-col gap-1 text-sm">
      <div className="flex items-center gap-3">
        <span className="w-32 text-gray-400 flex-shrink-0">{label}:</span>
        {!isEditing && isChildrenReactElement ? (
          // 읽기 전용 모드에서 React 컴포넌트 렌더링
          <div className="flex-1">{children}</div>
        ) : (
          // 일반 입력 필드
          <input
            type="number"
            className={isEditing ? editingInputCls : readOnlyInputCls}
            min="0"
            readOnly={!isEditing}
            defaultValue={defaultValue}
            {...register(name, {
              valueAsNumber: true,
              min: { value: 0, message: "0 이상의 값을 입력해주세요" },
            })}
          />
        )}
      </div>
      {isEditing && errors[name] && (
        <span className="text-xs text-red-500 ml-36">
          {errors[name]?.message as string}
        </span>
      )}
    </div>
  );
};

export default PlayerStatsDetailInput;
