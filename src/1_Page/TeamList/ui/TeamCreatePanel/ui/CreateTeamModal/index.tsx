import { useForm } from "react-hook-form";
import usePostMakeTeam from "../../../../../../3_Entity/Team/usePostMakeTeam";
import { schema } from "./lib/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { commonStatusIdx } from "../../../../../../4_Shared/constant/commonStatusIdx";

const CreateTeamModal = (props: CreateTeamModalProps) => {
  const { handleToggleModal } = props;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<TeamCreateFormValues>({
    resolver: yupResolver(schema),
  });
  const [postMakeTeam] = usePostMakeTeam();

  const onSubmit = (data: TeamCreateFormValues) => {
    postMakeTeam(data);
    handleToggleModal();
  };

  return (
    <div className="fixed inset-0 z-10 h-full bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white p-4 rounded-xl w-full overflow-auto max-h-[90%] max-w-md shadow-lg overscroll-contain">
        <h2 className="text-xl font-bold text-gray-800 mb-5">팀 생성하기</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              팀명 (최대 20글자, 한글/영어만)
            </label>
            <input
              type="text"
              {...register("team_list_name")}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            {errors.team_list_name && (
              <p className="text-red-500 text-xs mt-1">
                {errors.team_list_name.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              팀 약칭 (3글자, 영어만)
            </label>
            <input
              type="text"
              {...register("team_list_short_name")}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            {errors.team_list_short_name && (
              <p className="text-red-500 text-xs mt-1">
                {errors.team_list_short_name.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              팀 컬러 (헥사코드)
            </label>
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="font-semibold text-gray-700">클릭해서 수정하세요</p>
              <input
                type="color"
                value={watch("team_list_color") || "#3182F6"}
                onChange={(e) => setValue("team_list_color", e.target.value)}
                className="w-10 h-10 rounded-full border border-gray-300 hover:shadow-md transition-all"
              />
              <input
                type="text"
                {...register("team_list_color")}
                className="flex-1 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              />
            </div>
            {errors.team_list_color && (
              <p className="text-red-500 text-xs mt-1">
                {errors.team_list_color.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              팀원 모집 상태
            </label>
            <select
              {...register("common_status_idx", { valueAsNumber: true })}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23999'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E\")",
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
            {errors.common_status_idx && (
              <p className="text-red-500 text-xs mt-1">
                {errors.common_status_idx.message}
              </p>
            )}
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              팀 공지 글 (최대 500글자)
            </label>
            <textarea
              {...register("team_list_announcement")}
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
            />
            {errors.team_list_announcement && (
              <p className="text-red-500 text-xs mt-1">
                {errors.team_list_announcement.message}
              </p>
            )}
          </div>

          <div className="flex space-x-3 mt-6">
            <button
              type="submit"
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors">
              팀 생성하기
            </button>
            <button
              type="button"
              onClick={handleToggleModal}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors">
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTeamModal;
