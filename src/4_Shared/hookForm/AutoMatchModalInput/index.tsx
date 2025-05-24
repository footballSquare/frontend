import { useFormContext } from "react-hook-form";
import { matchFormation } from "../../constant/matchFormation";
import { matchDuration } from "../../constant/matchDuration";
import { teamMatchAttribute } from "../../constant/teamMatchAttribute";
import { matchType } from "../../constant/matchType";
import { formatTime30 } from "../../lib/dateFormatter";
import { matchParticipation } from "../../constant/matchParticipation";

const AutoMatchModalInput = (props: AutoMatchModalInput) => {
  const { registerType } = props;
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();
  const watchGameType = watch("gameType");
  const isCanFormation = watchGameType === "0";

  return (
    <div>
      {/* autoMatch toggle */}
      {registerType === "autoMatch" && (
        <div className="flex items-center space-x-3">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              {...register("autoMatch")}
              className="sr-only peer"
            />
            <span className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-grass/40 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-grass" />
          </label>
          <span className="text-sm font-medium text-gray-700">
            자동 매치 생성
          </span>
          {errors.autoMatch && (
            <p className="text-red-500 text-xs mt-1 pl-2">
              {errors.autoMatch.message as string}
            </p>
          )}
        </div>
      )}

      {/* matchAttribute select */}
      {registerType === "matchAttribute" && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            매치 속성
          </label>
          <select
            {...register("matchAttribute")}
            className="w-full p-3 text-sm border-2 border-gray-200 rounded-xl focus:border-grass focus:ring-2 focus:ring-grass/20 outline-none transition-all duration-200">
            {teamMatchAttribute.map((attribute, index) => (
              <option key={index} value={index}>
                {attribute}
              </option>
            ))}
          </select>
          {errors.matchAttribute && (
            <p className="text-red-500 text-xs mt-1 pl-2">
              {errors.matchAttribute.message as string}
            </p>
          )}
        </div>
      )}

      {/* gameType select */}
      {registerType === "gameType" && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            게임 종류
          </label>
          <select
            {...register("gameType")}
            className="w-full p-3 text-sm border-2 border-gray-200 rounded-xl focus:border-grass focus:ring-2 focus:ring-grass/20 outline-none transition-all duration-200">
            {matchType.map((type, index) => (
              <option key={index} value={index}>
                {type}
              </option>
            ))}
          </select>
          {errors.gameType && (
            <p className="text-red-500 text-xs mt-1 pl-2">
              {errors.gameType.message as string}
            </p>
          )}
        </div>
      )}

      {/* startTime select */}
      {registerType === "startTime" && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            매치 시작 시간
          </label>
          <select
            {...register("startTime")}
            className="w-full p-3 text-sm border-2 border-gray-200 rounded-xl focus:border-grass focus:ring-2 focus:ring-grass/20 outline-none transition-all duration-200">
            {formatTime30.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
          {errors.startTime && (
            <p className="text-red-500 text-xs mt-1 pl-2">
              {errors.startTime.message as string}
            </p>
          )}
        </div>
      )}

      {/* duration select */}
      {registerType === "duration" && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            매치 진행 시간
          </label>
          <select
            {...register("duration")}
            className="w-full p-3 text-sm border-2 border-gray-200 rounded-xl focus:border-grass focus:ring-2 focus:ring-grass/20 outline-none transition-all duration-200">
            {matchDuration.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
          {errors.duration && (
            <p className="text-red-500 text-xs mt-1 pl-2">
              {errors.duration.message as string}
            </p>
          )}
        </div>
      )}

      {/* participationMode select */}
      {registerType === "participationMode" && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            매치 참여 방식
          </label>
          <select
            {...register("participationMode")}
            className="w-full p-3 text-sm border-2 border-gray-200 rounded-xl focus:border-grass focus:ring-2 focus:ring-grass/20 outline-none transition-all duration-200">
            {matchParticipation.map((participation, index) => (
              <option key={index} value={index}>
                {participation}
              </option>
            ))}
          </select>
          {errors.participationMode && (
            <p className="text-red-500 text-xs mt-1 pl-2">
              {errors.participationMode.message as string}
            </p>
          )}
        </div>
      )}

      {/* formation select */}
      {registerType === "formation" && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            포메이션
          </label>
          <select
            {...register("formation")}
            className={`w-full p-3 text-sm border-2 rounded-xl focus:outline-none transition-all duration-200 ${
              isCanFormation
                ? "border-gray-200 focus:border-grass focus:ring-2 focus:ring-grass/20"
                : "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-300"
            }`}
            disabled={!isCanFormation}>
            {matchFormation.map((formation, index) => (
              <option key={index} value={index}>
                {formation}
              </option>
            ))}
          </select>
          {errors.formation && (
            <p className="text-red-500 text-xs mt-1 pl-2">
              {errors.formation.message as string}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default AutoMatchModalInput;
