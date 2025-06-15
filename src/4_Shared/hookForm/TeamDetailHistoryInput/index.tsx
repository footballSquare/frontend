import { useFormContext } from "react-hook-form";

const TeamDetailHistoryInput = (props: TeamDetailHistoryInputProps) => {
  const { registerType, isFile = false, isPercentage = false } = props;
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const hasError = !!errors[registerType];

  return (
    <div className="space-y-2">
      {isFile ? (
        <div className="relative">
          <input
            type="file"
            accept="image/jpeg,image/png,image/jpg,image/webp"
            {...register(registerType)}
            className={`
              w-full text-sm text-gray-100 
              file:mr-4 file:px-4 file:py-3 file:rounded-lg file:border-0 
              file:bg-gradient-to-r file:from-grass file:to-grass/80 
              file:text-white file:font-medium file:shadow-sm
              hover:file:from-grass/90 hover:file:to-grass/70
              file:transition-all file:duration-200 file:cursor-pointer
              bg-gray-800/50 border-2 border-dashed rounded-lg p-4
              transition-all duration-200 hover:border-grass/50
              ${
                hasError
                  ? "border-red-500/70 bg-red-900/10 file:from-red-500 file:to-red-600"
                  : "border-gray-600 hover:bg-gray-800/70"
              }
            `}
          />
          <div className="absolute top-1 right-2 text-xs text-gray-400">
            JPG, PNG, WEBP
          </div>
        </div>
      ) : (
        <div className="relative">
          <input
            type="number"
            step={
              registerType === "match_team_stats_expectation_goal" ? "0.1" : "1"
            }
            min="0"
            max={isPercentage ? 100 : undefined}
            {...register(registerType, { valueAsNumber: true })}
            className={`
              w-full px-4 py-3 bg-gray-800/80 border-2 rounded-lg 
              text-gray-100 placeholder-gray-400 font-medium
              transition-all duration-200 
              focus:outline-none focus:ring-2 focus:ring-grass/50 
              focus:border-grass focus:bg-gray-800
              hover:bg-gray-800 hover:border-gray-500
              [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
              ${
                hasError
                  ? "border-red-500 bg-red-900/10 focus:ring-red-500/50 focus:border-red-500"
                  : "border-gray-600"
              }
            `}
            placeholder={isPercentage ? "0-100%" : "숫자 입력"}
          />
          {isPercentage && (
            <div className="absolute top-1/2 right-3 -translate-y-1/2 text-sm text-gray-400 pointer-events-none">
              %
            </div>
          )}
        </div>
      )}

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
