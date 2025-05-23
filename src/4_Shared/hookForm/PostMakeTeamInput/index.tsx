import { useFormContext } from "react-hook-form";
import { commonStatusIdx } from "../../constant/commonStatusIdx";
import ArrowDownIcon from "../../assets/svg/arrow-down.svg";

const PostMakeTeamInput = (props: PostMakeTeamInputProps) => {
  const { registerType, repeatType } = props;
  const {
    register,
    setValue,
    watch,
    formState: { errors },
    getValues,
  } = useFormContext<TeamCreateFormValues>();

  return (
    <div className="w-full">
      {registerType === "team_list_name" && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-1.5">
            팀명 (최대 20글자, 한글/영어만)
          </label>
          <input
            type="text"
            {...register(registerType)}
            className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-900 text-gray-100 focus:outline-none focus:ring-grass focus:border-transparent transition-all"
          />
          {errors[registerType] ? (
            <p className="text-red-500 text-xs mt-1">
              {errors[registerType].message}
            </p>
          ) : (
            repeatType &&
            errors[repeatType] && (
              <p className="text-red-500 text-xs mt-1">
                {errors[repeatType].message}
              </p>
            )
          )}
          {repeatType && !getValues(repeatType) && (
            <p className="text-green-500 text-xs mt-1">
              팀명 중복확인이 완료되었습니다.
            </p>
          )}
        </div>
      )}

      {registerType === "team_list_short_name" && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-1.5">
            팀 약칭 (3글자, 영어만)
          </label>
          <input
            type="text"
            {...register(registerType)}
            className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-900 text-gray-100 focus:outline-none focus:ring-grass focus:border-transparent transition-all"
          />
          {errors[registerType] ? (
            <p className="text-red-500 text-xs mt-1">
              {errors[registerType].message}
            </p>
          ) : (
            repeatType &&
            errors[repeatType] && (
              <p className="text-red-500 text-xs mt-1">
                {errors[repeatType].message}
              </p>
            )
          )}
          {repeatType && !getValues(repeatType) && (
            <p className="text-green-500 text-xs mt-1">
              팀명 중복확인이 완료되었습니다.
            </p>
          )}
        </div>
      )}

      {registerType === "team_list_color" && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-1.5">
            팀 컬러 (헥사코드)
          </label>
          <div className="flex items-center space-x-4 p-4 bg-gray-700 rounded-lg border border-gray-600">
            <p className="font-semibold text-gray-200">클릭해서 수정하세요</p>
            <input
              type="color"
              value={watch(registerType) || "#3182F6"}
              onChange={(e) => setValue(registerType, e.target.value)}
              className="w-10 h-10 rounded-full border border-gray-500 hover:shadow-md transition-all"
            />
            <input
              type="text"
              {...register(registerType)}
              className="flex-1 py-2 rounded-lg border border-gray-700 bg-gray-900 text-gray-100 focus:outline-none focus:ring-grass transition-all"
            />
          </div>
          {errors[registerType] && (
            <p className="text-red-500 text-xs mt-1">
              {errors[registerType].message}
            </p>
          )}
        </div>
      )}

      {registerType === "common_status_idx" && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-1.5">
            팀원 모집 상태
          </label>
          <select
            {...register(registerType, { valueAsNumber: true })}
            className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-900 text-gray-100 focus:outline-none focus:ring-grass focus:border-transparent transition-all appearance-none"
            style={{
              backgroundImage: `url(${ArrowDownIcon})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 1rem center",
              backgroundSize: "1rem",
            }}>
            <option value={0}>-- 상태 선택 --</option>
            {commonStatusIdx
              .filter((_, index) => index === 5 || index === 8)
              .map((status, index) => (
                <option
                  key={"common_status_idx_" + index}
                  value={index === 0 ? 5 : 8}>
                  {status}
                </option>
              ))}
          </select>
          {errors[registerType] && (
            <p className="text-red-500 text-xs mt-1">
              {errors[registerType].message}
            </p>
          )}
        </div>
      )}

      {registerType === "team_list_announcement" && (
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-300 mb-1.5">
            팀 공지 글 (최대 500글자)
          </label>
          <textarea
            {...register(registerType)}
            rows={4}
            className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-900 text-gray-100 focus:outline-none focus:ring-grass focus:border-transparent transition-all resize-none"
          />
          {errors[registerType] && (
            <p className="text-red-500 text-xs mt-1">
              {errors[registerType].message}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
export default PostMakeTeamInput;
