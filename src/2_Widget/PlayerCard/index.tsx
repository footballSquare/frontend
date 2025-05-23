import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import useProfileImageHandler from "./model/useProfileImageHandler";
import usePutProfileImage from "../../3_Entity/Account/usePutProfileImage";

import { optionalFileSchema } from "../../4_Shared/lib/imgSchema";
import { matchPosition } from "../../4_Shared/constant/matchPosition";
import profile from "../../4_Shared/assets/svg/profile.svg";
import camera from "../../4_Shared/assets/svg/camera.svg";
import { getPositionColor } from "../../4_Shared/lib/getPositionColor";
import { useNavigate } from "react-router-dom";

const PlayerCard = (props: PlayerCardProps) => {
  // is_mine = true : 수정가능 / = false 수정 불가능
  const {
    is_mine,
    user_idx,
    nickname,
    profile_image,
    team_name,
    match_position_idx,
  } = props;
  const navigate = useNavigate();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<ProfileImageForm>({
    resolver: yupResolver(optionalFileSchema),
  });

  const {
    preview,
    modifyMode,
    handleImageChange,
    handleCancel,
    handleSave,
    handleSetDefaultImage,
  } = useProfileImageHandler({ profile_image, setValue, clearErrors });

  const [putProfileImage] = usePutProfileImage();

  const onSubmit: SubmitHandler<ProfileImageForm> = (data) => {
    handleSave();
    putProfileImage(data.file);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-xl overflow-hidden shadow-2xl border border-gray-700 transform transition-all hover:scale-[1.01] hover:shadow-grass/20">
        {/* Header with position badge */}
        <div className="relative h-16 bg-gradient-to-br from-grass to-grass/80 flex items-center px-4">
          <div
            className={`absolute top-3 right-3 ${getPositionColor(
              match_position_idx
            )} text-xs font-bold px-3 py-1 rounded-full shadow-md`}>
            {match_position_idx && matchPosition[match_position_idx]}
          </div>
        </div>

        {/* Profile section */}
        <div className="relative flex items-center px-5 pt-10 pb-4">
          <div className="absolute -top-10 left-5">
            <input
              id="profileImg"
              type="file"
              accept="image/*"
              className="hidden"
              {...register("file")}
              onChange={is_mine ? handleImageChange : undefined}
              disabled={!is_mine}
            />
            <label
              htmlFor="profileImg"
              className={`block ${
                is_mine ? "cursor-pointer group" : "cursor-default"
              }`}>
              <div className="relative">
                <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-br from-grass to-grass/80">
                  <img
                    className="w-full h-full object-cover rounded-full border-2 border-gray-800 bg-white"
                    src={preview ? preview : profile}
                    alt="프로필 미리보기"
                  />
                </div>
                {is_mine && (
                  <div className="absolute inset-0 bg-black bg-opacity-60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <img src={camera} className="w-8 h-8" />
                  </div>
                )}
              </div>
            </label>
          </div>

          <div className="ml-24">
            <div className="font-bold text-lg tracking-wide">{nickname}</div>
            <div className="text-xs text-grass font-medium">#{user_idx}</div>
          </div>
        </div>

        {/* Control buttons */}
        {is_mine ? (
          <div className="bg-gray-900 bg-opacity-50 px-4 py-3">
            {modifyMode ? (
              <div className="flex justify-between gap-2">
                <button
                  type="button"
                  className="flex-1 py-2 text-xs font-medium bg-gray-700 hover:bg-gray-600 rounded-md transition-colors shadow-md"
                  onClick={handleCancel}>
                  취소
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 text-xs font-medium bg-grass hover:bg-grass/80 rounded-md transition-colors shadow-md">
                  저장
                </button>
              </div>
            ) : (
              <div className="flex justify-center ">
                <button
                  type="button"
                  className="w-full text-xs py-2 font-medium bg-gray-700 hover:bg-gray-600 rounded-md transition-colors shadow-md"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSetDefaultImage();
                  }}>
                  기본 이미지 설정
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex justify-center">
            <button
              type="button"
              className="w-full text-xs py-2 font-medium bg-grass hover:bg-grass/80 rounded-md mx-4 transition-colors shadow-md"
              onClick={(e) => {
                e.preventDefault();
                navigate(`/profile/${user_idx}`);
              }}>
              프로필 상세보기
            </button>
          </div>
        )}

        {/* Error message */}
        {errors.file && (
          <div className="bg-red-900 bg-opacity-40 px-4 py-3 text-red-300 text-xs font-medium">
            {errors.file.message}
          </div>
        )}

        {/* Status indicator */}
        <div className="flex items-center justify-between bg-gray-900 bg-opacity-70 px-4 py-3 border-t border-gray-700">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 shadow-md shadow-green-500/50 mr-2"></div>
            <span className="text-xs font-medium text-gray-300">
              {team_name}
            </span>
          </div>
          <div className="text-xs text-gray-500">Online</div>
        </div>
      </div>
    </form>
  );
};

export default PlayerCard;
