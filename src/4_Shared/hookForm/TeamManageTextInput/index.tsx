import { useFormContext, Controller } from "react-hook-form";

const TeamManageTextInput = (props: TeamManageTextInputProps) => {
  const { modifyMode, registerType, repeatType } = props;
  const {
    watch,
    register,
    control,
    formState: { errors },
    getValues,
  } = useFormContext();

  return (
    <div className="w-full">
      {/* 팀원 모집상태 */}
      {registerType === "team_list_name" && (
        <div>
          <input
            {...register("team_list_name")}
            disabled={!modifyMode}
            className={`w-full p-3 text-sm border-2 rounded-xl outline-none transition-all duration-200 ${
              modifyMode
                ? "border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                : "bg-gray-700 text-gray-200 border-gray-100"
            }`}
            placeholder="팀 이름을 입력하세요"
          />
          {modifyMode && (
            <div>
              {errors.team_list_name ? (
                <p className="mt-1.5 text-rose-500 text-xs font-medium">
                  {String(errors.team_list_name?.message || "")}
                </p>
              ) : errors.team_list_name_repeat ? (
                <p className="mt-1.5 text-rose-500 text-xs font-medium">
                  {String(errors.team_list_name_repeat?.message || "")}
                </p>
              ) : repeatType && !getValues(repeatType) ? (
                <p className="mt-1.5 text-green-500 text-xs font-medium">
                  증복확인이 완료되었습니다
                </p>
              ) : null}
            </div>
          )}
        </div>
      )}
      {registerType === "team_list_short_name" && (
        <div>
          <input
            {...register("team_list_short_name")}
            disabled={!modifyMode}
            className={`w-full p-3 text-sm border-2 rounded-xl outline-none transition-all duration-200 ${
              modifyMode
                ? "border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                : "bg-gray-700 text-gray-200 border-gray-100"
            }`}
            placeholder="짧은 팀 이름을 입력하세요"
          />
          {modifyMode && (
            <div>
              {errors.team_list_short_name ? (
                <p className="mt-1.5 text-rose-500 text-xs font-medium">
                  {String(errors.team_list_short_name?.message || "")}
                </p>
              ) : errors.team_list_short_name_repeat ? (
                <p className="mt-1.5 text-rose-500 text-xs font-medium">
                  {String(errors.team_list_short_name_repeat?.message || "")}
                </p>
              ) : repeatType && !getValues(repeatType) ? (
                <p className="mt-1.5 text-green-500 text-xs font-medium">
                  증복확인이 완료되었습니다
                </p>
              ) : null}
            </div>
          )}
        </div>
      )}
      {registerType === "common_status_idx" && (
        <div>
          <p className="text-sm font-medium text-gray-600">팀 태그 출력</p>
          <div className="flex gap-4">
            {[0, 1].map((value, idx) => {
              const labelText = idx === 0 ? "미출력" : "출력";
              const active = watch("common_status_idx") == value;
              return (
                <label
                  key={value}
                  className={`flex items-center gap-2 ${
                    !modifyMode && "cursor-not-allowed"
                  }`}>
                  <input
                    type="radio"
                    value={value}
                    {...register("common_status_idx")}
                    disabled={!modifyMode}
                    className="hidden"
                  />
                  <div
                    className={`w-5 h-5 rounded-full border-2 transition ${
                      active ? "bg-grass border-grass" : "border-gray-400"
                    } ${!modifyMode && "opacity-50"}`}
                  />
                  <span className="text-sm font-medium">{labelText}</span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      {/* 팀 색상 선택 */}
      {registerType === "team_list_color" && (
        <Controller
          name="team_list_color"
          control={control}
          defaultValue="#FFFFFF"
          render={({ field }) => (
            <div className="mb-4">
              <label
                htmlFor="team_list_color"
                className="block mb-1.5 text-sm font-medium text-gray-700">
                Team Color
              </label>

              <div className="flex items-center gap-2 mb-2">
                {/* Color picker */}
                <input
                  id="team_list_color"
                  type="color"
                  disabled={!modifyMode}
                  {...field}
                  className={`w-[48px] h-[48px] p-1 border-2 rounded-xl outline-none transition-all duration-200 ${
                    modifyMode
                      ? "border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                      : "bg-gray-700 text-gray-200 border-gray-100 opacity-50 cursor-not-allowed"
                  }`}
                />

                {/* Hex value text box */}
                <input
                  id="team_list_color_text"
                  type="text"
                  disabled={!modifyMode}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="#FFFFFF"
                  className={`flex-1 p-3 text-sm border-2 rounded-xl outline-none transition-all duration-200 ${
                    modifyMode
                      ? "border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-gray-200"
                      : "bg-gray-700 text-gray-200 border-gray-100 opacity-50 cursor-not-allowed"
                  }`}
                />
              </div>

              {errors.team_list_color && (
                <p className="mt-1.5 text-rose-500 text-xs font-medium">
                  {String(errors.team_list_color?.message || "")}
                </p>
              )}
            </div>
          )}
        />
      )}

      {/* 팀 공지 입력 */}
      {registerType === "team_list_announcement" && (
        <div className="mb-4">
          <label
            htmlFor="team_list_announcement"
            className="block mb-1.5 text-sm font-medium text-gray-700">
            Team Notice
          </label>
          <textarea
            id="team_list_announcement"
            {...register("team_list_announcement")}
            disabled={!modifyMode}
            className={`w-full p-3 text-sm border-2 rounded-xl outline-none transition-all duration-200 ${
              modifyMode
                ? "border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                : "bg-gray-700 text-gray-200 border-gray-100"
            }`}
            placeholder="Enter Team Notice"
          />
          {errors.team_list_announcement && (
            <p className="mt-1.5 text-rose-500 text-xs font-medium">
              {errors.team_list_announcement?.message as string}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default TeamManageTextInput;
