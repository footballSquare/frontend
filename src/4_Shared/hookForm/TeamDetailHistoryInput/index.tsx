import { useFormContext } from "react-hook-form";

const TeamDetailHistoryInput = (props: TeamDetailHistoryInputProps) => {
  const {
    registerType,
    isPercentage = false,
    isEditing = true,
    currentMomPlayer,
  } = props;
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const hasError = !!errors[registerType];

  // MOM 선수 선택은 별도 UI로 표시
  if (registerType === "mom_player_idx") {
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span>👑</span>
          <span>{currentMomPlayer?.player_list_nickname || "-"}</span>
        </div>
        {hasError && isEditing && (
          <div className="flex items-center gap-2 text-sm text-red-400 bg-red-900/20 px-3 py-2 rounded-md border border-red-500/30">
            <span>{errors[registerType]?.message as string}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="relative">
        <input
          type="number"
          disabled={!isEditing}
          step={registerType === "match_team_stats_expected_goal" ? "0.1" : "1"}
          min="0"
          max={isPercentage ? 100 : undefined}
          {...register(registerType, { valueAsNumber: true })}
          className={`
              w-full px-2 py-1.5 bg-gray-800/80 border rounded-md text-sm
              text-gray-100 placeholder-gray-400 font-medium
              transition-all duration-200 
              focus:outline-none focus:ring-1 focus:ring-grass/50 
              focus:border-grass focus:bg-gray-800
              hover:bg-gray-800 hover:border-gray-500
              [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
              ${
                hasError
                  ? "border-red-500 bg-red-900/10 focus:ring-red-500/50 focus:border-red-500"
                  : "border-gray-600"
              }
              ${!isEditing ? "opacity-60 cursor-not-allowed" : ""}
            `}
          placeholder={isPercentage ? "0-100%" : "숫자 입력"}
        />
        {isPercentage && (
          <div className="absolute top-1/2 right-2 -translate-y-1/2 text-xs text-gray-400 pointer-events-none">
            %
          </div>
        )}
      </div>

      {hasError && (
        <div className="flex items-center gap-2 text-sm text-red-400 bg-red-900/20 px-3 py-2 rounded-md border border-red-500/30">
          <svg
            className="w-4 h-4 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <span>{errors[registerType]?.message as string}</span>
        </div>
      )}
    </div>
  );
};

export default TeamDetailHistoryInput;
