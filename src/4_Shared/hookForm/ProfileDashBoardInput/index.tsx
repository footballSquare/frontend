import { FieldError, useFormContext, useWatch } from "react-hook-form";

import { platform } from "../../constant/platform";
import { matchPosition } from "../../constant/matchPosition";
import { commonStatusIdx } from "../../constant/commonStatusIdx";
import discordIcon from "../../assets/svg/discord.svg";
import userIcon from "../../assets/svg/user.svg";
import positionIcon from "../../assets/svg/position.svg";

import { getPositionColor } from "../../lib/getPositionColor";
import { getPlatformIcon } from "../../lib/getPlatformIcon";
import FieldWrapper from "./ui/FieldWrapper";

const ProfileDashBoardInput = (props: ProfileDashBoardInputProps) => {
  const { label, registerType, name, isModifyMode, placeholder } = props;
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext();

  const watchPlatform = useWatch({ control, name: "platform" });
  const watchMatchPositionIdx = useWatch({
    control,
    name: "match_position_idx",
  });

  const error = (errors as Record<string, FieldError | undefined>)[name];

  return (
    <div>
      {registerType === "message" && (
        <FieldWrapper label={label} error={error} isModifyMode={isModifyMode}>
          <div className="relative">
            <input
              {...register(name)}
              disabled={!isModifyMode}
              placeholder={placeholder}
              className={`w-full outline-none text-sm font-medium placeholder:text-gray-400 placeholder:font-normal focus:text-white transition-colors duration-200 p-2 rounded-lg border border-slate-600 bg-slate-800 ${
                !isModifyMode
                  ? "cursor-not-allowed text-gray-300"
                  : "text-white"
              }`}
            />
            {isModifyMode && (
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-transparent to-grass/10 pointer-events-none" />
            )}
          </div>
        </FieldWrapper>
      )}

      {/* 닉네임 */}
      {registerType === "nickname" && (
        <FieldWrapper label={label} error={error} isModifyMode={isModifyMode}>
          <div className="flex items-center gap-2 p-2 rounded-lg border border-slate-600 bg-slate-800 hover:border-slate-500 transition-all duration-200">
            <div
              className={`flex-shrink-0 p-1.5 rounded-lg transition-all duration-200 ${
                isModifyMode
                  ? "bg-gradient-to-br from-slate-700 to-slate-600 shadow-lg"
                  : "bg-slate-800/50"
              }`}>
              <img
                src={userIcon}
                className="w-4 h-4 filter brightness-125"
                alt="User Icon"
              />
            </div>
            <input
              {...register(name)}
              disabled={!isModifyMode}
              placeholder={placeholder ?? "게임 닉네임을 입력하세요"}
              className={`w-full bg-transparent outline-none text-sm font-medium placeholder:text-gray-400 placeholder:font-normal focus:text-white transition-colors duration-200 ${
                !isModifyMode
                  ? "cursor-not-allowed text-gray-300"
                  : "text-white"
              }`}
            />
          </div>
        </FieldWrapper>
      )}

      {/* Discord 태그 */}
      {registerType === "discord_tag" && (
        <FieldWrapper label={label} error={error} isModifyMode={isModifyMode}>
          <div className="flex items-center gap-2 p-2 rounded-lg border border-slate-600 bg-slate-800 hover:border-slate-500 transition-all duration-200">
            <div
              className={`flex-shrink-0 p-1.5 rounded-lg transition-all duration-200 ${
                isModifyMode
                  ? "bg-gradient-to-br from-slate-700 to-slate-600 shadow-lg"
                  : "bg-slate-800/50"
              }`}>
              <img
                src={discordIcon}
                className="w-4 h-4 filter brightness-125"
                alt="Discord Icon"
              />
            </div>
            <input
              {...register(name)}
              disabled={!isModifyMode}
              placeholder={placeholder ?? "Discord 태그를 입력하세요"}
              className={`w-full bg-transparent outline-none text-sm font-medium placeholder:text-gray-400 placeholder:font-normal focus:text-white transition-colors duration-200 ${
                !isModifyMode
                  ? "cursor-not-allowed text-gray-300"
                  : "text-white"
              }`}
            />
          </div>
        </FieldWrapper>
      )}

      {registerType === "platform" && (
        <FieldWrapper label={label} error={error} isModifyMode={isModifyMode}>
          <div className="flex items-center gap-2 p-2 rounded-lg border border-slate-600 bg-slate-800 hover:border-slate-500 transition-all duration-200">
            <div
              className={`flex-shrink-0 p-1.5 rounded-lg transition-all duration-200 ${
                isModifyMode
                  ? "bg-gradient-to-br from-slate-700 to-slate-600 shadow-lg"
                  : "bg-slate-800/50"
              }`}>
              <img
                src={getPlatformIcon(watchPlatform)}
                className="w-4 h-4 filter brightness-125"
                alt="Platform Icon"
              />
            </div>
            <select
              {...register(name)}
              disabled={!isModifyMode}
              className={`w-full bg-transparent outline-none text-sm font-medium focus:text-white transition-colors duration-200 ${
                !isModifyMode
                  ? "cursor-not-allowed text-gray-300"
                  : "text-white"
              }`}>
              {platform.map((p, i) => (
                <option
                  key={i}
                  value={p.toLowerCase()}
                  className="bg-slate-800 text-white py-2">
                  {p.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </FieldWrapper>
      )}

      {registerType === "match_position_idx" && (
        <FieldWrapper label={label} error={error} isModifyMode={isModifyMode}>
          <div className="flex items-center gap-2 p-2 rounded-lg border border-slate-600 bg-slate-800 hover:border-slate-500 transition-all duration-200">
            <div
              className={`flex-shrink-0 p-1.5 rounded-lg transition-all duration-200 ${
                isModifyMode
                  ? "bg-gradient-to-br from-slate-700 to-slate-600 shadow-lg"
                  : "bg-slate-800/50"
              }`}>
              <img
                src={positionIcon}
                className="w-4 h-4 filter brightness-125"
                alt="Position Icon"
              />
            </div>
            <select
              {...register(name)}
              disabled={!isModifyMode}
              style={{ color: getPositionColor(watchMatchPositionIdx) }}
              className={`w-full bg-transparent outline-none text-sm focus:text-white transition-colors duration-200 font-bold ${
                !isModifyMode
                  ? "cursor-not-allowed text-gray-300"
                  : "text-white"
              }`}>
              <option value={-1} className="bg-slate-800 text-gray-400 py-2">
                포지션 선택
              </option>
              {matchPosition.map((pos, idx) => (
                <option
                  key={idx}
                  value={idx}
                  className="bg-slate-800 text-white py-2 font-medium"
                  style={{ color: getPositionColor(idx) }}>
                  {pos}
                </option>
              ))}
            </select>
          </div>
        </FieldWrapper>
      )}

      {/* 팀 구직 상태 (common_status_idx) */}
      {registerType === "common_status_idx" && (
        <FieldWrapper label={label} error={error} isModifyMode={isModifyMode}>
          <div className="p-2 rounded-lg border border-slate-600 bg-slate-800 hover:border-slate-500 transition-all duration-200">
            <select
              {...register(name)}
              disabled={!isModifyMode}
              className={`w-full bg-transparent outline-none text-sm font-medium focus:text-white transition-colors duration-200 ${
                !isModifyMode
                  ? "cursor-not-allowed text-gray-300"
                  : "text-white"
              }`}>
              {commonStatusIdx.slice(6, 9).map((cs, i) => (
                <option
                  key={i}
                  value={6 + i}
                  className="bg-slate-800 text-white py-2">
                  {cs}
                </option>
              ))}
            </select>
          </div>
        </FieldWrapper>
      )}
    </div>
  );
};
export default ProfileDashBoardInput;
