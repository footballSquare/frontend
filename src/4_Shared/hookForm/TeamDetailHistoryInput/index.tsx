import { useFormContext } from "react-hook-form";

const TeamDetailHistoryInput = (props: TeamDetailHistoryInputProps) => {
  const { registerType, isFile = false, isPercentage = false } = props;
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-1">
      {isFile ? (
        <input
          type="file"
          accept="image/jpeg,image/png"
          {...register(registerType)}
          className={`w-full text-sm text-gray-100 file:mr-4 file:px-4 file:py-2 file:rounded-md file:border-0 file:bg-gray-700 file:text-gray-100 hover:file:bg-gray-600 ${
            errors[registerType] ? "ring-2 ring-red-500" : ""
          }`}
        />
      ) : (
        <input
          type="number"
          step={
            registerType === "match_team_stats_expectation_goal" ? "0.1" : "1"
          }
          min="0"
          max={isPercentage ? 100 : undefined}
          {...register(registerType, { valueAsNumber: true })}
          className={`w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-grass focus:border-transparent ${
            errors[registerType] ? "ring-2 ring-red-500" : ""
          }`}
        />
      )}
      {errors[registerType] && (
        <p className="text-sm text-red-400">
          {errors[registerType]?.message as string}
        </p>
      )}
    </div>
  );
};

export default TeamDetailHistoryInput;
