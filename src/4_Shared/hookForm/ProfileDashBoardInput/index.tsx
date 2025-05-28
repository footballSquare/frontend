import { FieldError, useFormContext, useWatch } from "react-hook-form";

import { platform } from "../../constant/platform";
import { matchPosition } from "../../constant/matchPosition";
import { commonStatusIdx } from "../../constant/commonStatusIdx";
import discord from "../../assets/svg/discord.svg";

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
    <>
      {registerType === "message" && (
        <FieldWrapper label={label} error={error} isModifyMode={isModifyMode}>
          <input
            {...register(name)}
            disabled={!isModifyMode}
            placeholder={placeholder}
            className="w-full bg-transparent outline-none text-sm"
          />
        </FieldWrapper>
      )}

      {/* 닉네임 */}
      {registerType === "nickname" && (
        <FieldWrapper label={label} error={error} isModifyMode={isModifyMode}>
          <input
            {...register(name)}
            disabled={!isModifyMode}
            placeholder={placeholder ?? "Nickname"}
            className="w-full bg-transparent outline-none text-sm"
          />
        </FieldWrapper>
      )}

      {/* Discord 태그 */}
      {registerType === "discord_tag" && (
        <FieldWrapper label={label} error={error} isModifyMode={isModifyMode}>
          <div className="flex items-center w-full p-3 text-sm gap-2">
            <img
              src={discord}
              className="w-[30px] h-[30px] object-cover"
              alt="Discord Icon"
            />
            <input
              {...register(name)}
              disabled={!isModifyMode}
              placeholder={placeholder ?? "Discord Tag"}
              className="w-full bg-transparent outline-none text-sm"
            />
          </div>
        </FieldWrapper>
      )}

      {registerType === "platform" && (
        <FieldWrapper label={label} error={error} isModifyMode={isModifyMode}>
          <div className="flex items-center w-full p-3 text-sm gap-2">
            <img
              src={getPlatformIcon(watchPlatform)}
              className="w-[30px] h-[30px] object-cover"
              alt="Platform Icon"
            />
            <select
              {...register(name)}
              disabled={!isModifyMode}
              className="w-full bg-transparent outline-none text-sm">
              {platform.map((p, i) => (
                <option key={i} value={p.toLowerCase()}>
                  {p}
                </option>
              ))}
            </select>
          </div>
        </FieldWrapper>
      )}

      {registerType === "match_position_idx" && (
        <FieldWrapper label={label} error={error} isModifyMode={isModifyMode}>
          <select
            {...register(name)}
            disabled={!isModifyMode}
            style={{ color: getPositionColor(watchMatchPositionIdx) }}
            className="w-full bg-transparent outline-none text-sm">
            {matchPosition.map((pos, idx) => (
              <option
                key={idx}
                value={idx}
                style={{ color: getPositionColor(idx) }}>
                {pos}
              </option>
            ))}
          </select>
        </FieldWrapper>
      )}

      {/* 팀 구직 상태 (common_status_idx) */}
      {registerType === "common_status_idx" && (
        <FieldWrapper label={label} error={error} isModifyMode={isModifyMode}>
          <select
            {...register(name)}
            disabled={!isModifyMode}
            className="w-full bg-transparent outline-none text-sm">
            {commonStatusIdx.slice(6, 9).map((cs, i) => (
              <option key={i} value={6 + i}>
                {cs}
              </option>
            ))}
          </select>
        </FieldWrapper>
      )}
    </>
  );
};
export default ProfileDashBoardInput;
