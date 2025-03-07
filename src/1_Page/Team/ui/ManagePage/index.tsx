import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TeamInfo } from "../../../../3_Entity/Team/type";
import { TeamInfoInput } from "./type";
import { schema } from "./lib/schema";
import useManageModify from "./model/useManageModify";
import ImageInput from "./ui/ImageInput";

const ManagePage = (props: {
  teamInfo: TeamInfo;
  handleMoveTeamPage: () => void;
}) => {
  const { teamInfo, handleMoveTeamPage } = props;
  const {
    reset,
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<TeamInfoInput>({
    resolver: yupResolver(schema),
  });
  const { modifyMode, handleCancle, handleModifyFalse, handleBackupData } =
    useManageModify({ reset, teamInfo });

  const onSubmit: SubmitHandler<TeamInfoInput> = () => {
    handleModifyFalse();
  };

  return (
    <div className="w-full p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-blue-600 font-semibold text-center text-sm">
        TEAM MANAGEMENT
      </h2>
      <h1 className="text-lg font-bold text-center mt-1">TEAM DETAILS</h1>
      <div className="space-y-6">
        {/* Team Banner */}
        <div className="relative">
          <ImageInput
            imgSrc={teamInfo.team_list_banner}
            width="w-full"
            height="h-[160px]"
            putEvent={console.log}
          />
        </div>

        {/* Team Emblem */}
        <div className="flex justify-start items-center space-x-4">
          <ImageInput
            imgSrc={teamInfo.team_list_emblem}
            width="w-[40px]"
            height="h-[40px]"
            putEvent={console.log}
          />
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold text-gray-700">Team Info</h2>
            <p className="text-sm text-gray-500">
              Edit or update team details below.
            </p>
          </div>
        </div>

        {/* Team Name */}
        <div>
          <label className="text-sm font-medium text-gray-600">Team Name</label>
          <input
            {...register("team_list_name")}
            disabled={!modifyMode}
            className={`w-full p-2 text-sm border rounded-md ${
              modifyMode ? "border-gray-300" : "bg-gray-100 text-gray-500"
            }`}
            placeholder="Enter Team Name"
          />
          {errors.team_list_name && (
            <p className="text-red-500 text-xs">
              {errors.team_list_name.message}
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Short Team Name */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Short Team Name
            </label>
            <input
              {...register("team_list_short_name")}
              disabled={!modifyMode}
              className={`w-full p-2 text-sm border rounded-md ${
                modifyMode ? "border-gray-300" : "bg-gray-100 text-gray-500"
              }`}
              placeholder="Enter Short Team Name"
            />
            {errors.team_list_short_name && (
              <p className="text-red-500 text-xs">
                {errors.team_list_short_name.message}
              </p>
            )}
          </div>

          {/* Team Color */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Team Color
            </label>
            <input
              {...register("team_list_color")}
              type="color"
              disabled={!modifyMode}
              className={`w-12 h-12 ${
                modifyMode ? "border cursor-pointer" : "bg-transparent"
              }`}
            />
            {errors.team_list_color && (
              <p className="text-red-500 text-xs">
                {errors.team_list_color.message}
              </p>
            )}
          </div>

          {/* Team Notice */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Team Notice
            </label>
            <textarea
              {...register("team_list_announcement")}
              disabled={!modifyMode}
              className="w-full p-2 text-sm border rounded-md"
              placeholder="Enter Team Notice"
            />
            {errors.team_list_announcement && (
              <p className="text-red-500 text-xs">
                {errors.team_list_announcement.message}
              </p>
            )}
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end gap-4 mt-4">
            {!modifyMode ? (
              <button
                className="py-2 px-4 bg-blue-600 text-white rounded-md"
                onClick={(e) => {
                  e.preventDefault();
                  handleBackupData(getValues());
                }}>
                수정하기
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  className="py-2 px-4 bg-red-600 text-white rounded-md"
                  onClick={handleCancle}>
                  취소
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 bg-green-600 text-white rounded-md">
                  저장
                </button>
              </div>
            )}
          </div>
        </form>
        {/* Back Button */}
        <div className="flex justify-end mt-4">
          <button
            onClick={handleMoveTeamPage}
            type="button"
            className="py-2 px-4 bg-gray-300 text-gray-700 rounded-md">
            뒤로가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManagePage;
