import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { schema } from "./lib/schema";
import useToggleState from "../../../../4_Shared/model/useToggleState";
import { commonStatusIdx } from "../../../../4_Shared/constant/commonStatusIdx";
import usePostMakeTeam from "../../../../3_Entity/Team/usePostMakeTeam";

import plusCircleIcon from "../../../../4_Shared/assets/svg/plus_circle_blue.svg";

const TeamCreatePanel = () => {
  const [isModalOpen, handleToggleModal] = useToggleState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TeamCreateFormValues>({
    resolver: yupResolver(schema),
  });
  const [postMakeTeam] = usePostMakeTeam();

  const onSubmit = (data: TeamCreateFormValues) => {
    postMakeTeam(data as UsePostMakeTeam);
  };

  return (
    <div>
      <div
        className="bg-white rounded-xl p-4 flex items-center justify-between active:bg-gray-50 transition-colors"
        onClick={handleToggleModal}>
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mr-3">
            <span className="text-blue-500">
              <img src={plusCircleIcon} className="w-full h-full" />
            </span>
          </div>
          <div>
            <h3 className="font-bold">새로운 팀 만들기</h3>
            <p className="text-sm text-gray-500">나만의 팀을 생성해보세요</p>
          </div>
        </div>
        <span className="text-gray-400">›</span>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-10 h-full bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white p-4 rounded-md w-96">
            <h2>팀 생성하기</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-2">
                <label>팀명 (최대 20글자, 한글/영어만)</label>
                <input
                  type="text"
                  {...register("team_list_name")}
                  className="border p-2 w-full"
                />
                {errors.team_list_name && (
                  <p className="text-red-500 text-sm">
                    {errors.team_list_name.message}
                  </p>
                )}
              </div>
              <div className="mb-2">
                <label>팀 약칭 (3글자, 영어만)</label>
                <input
                  type="text"
                  {...register("team_list_short_name")}
                  className="border p-2 w-full"
                />
                {errors.team_list_short_name && (
                  <p className="text-red-500 text-sm">
                    {errors.team_list_short_name.message}
                  </p>
                )}
              </div>
              <div className="mb-2">
                <label>팀 컬러 (헥사코드)</label>
                <input
                  type="text"
                  {...register("team_list_color")}
                  className="border p-2 w-full"
                />
                {errors.team_list_color && (
                  <p className="text-red-500 text-sm">
                    {errors.team_list_color.message}
                  </p>
                )}
              </div>
              <div className="mb-2">
                <label>팀원 모집 상태</label>
                <select
                  {...register("common_status_idx", { valueAsNumber: true })}
                  className="border p-2 w-full">
                  <option value="">-- 상태 선택 --</option>
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
                  <p className="text-red-500 text-sm">
                    {errors.common_status_idx.message}
                  </p>
                )}
              </div>
              <div className="mb-2">
                <label>팀 공지 글 (최대 500글자)</label>
                <textarea
                  {...register("team_list_announcement")}
                  className="border p-2 w-full"
                />
                {errors.team_list_announcement && (
                  <p className="text-red-500 text-sm">
                    {errors.team_list_announcement.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="mr-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                팀 생성하기
              </button>
              <button
                onClick={handleToggleModal}
                className="bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded">
                닫기
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default TeamCreatePanel;
