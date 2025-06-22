import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import useProfileImageHandler from "./model/useProfileImageHandler";

import { optionalFileSchema } from "../../4_Shared/lib/imgSchema";
import { matchPosition } from "../../4_Shared/constant/matchPosition";
import profile from "../../4_Shared/assets/svg/profile.svg";
import camera from "../../4_Shared/assets/svg/camera.svg";
import { getPositionColor } from "../../4_Shared/lib/getPositionColor";
import { useNavigate } from "react-router-dom";
import usePutProfileImageHandler from "./model/usePutProfileImageHandler";

const PlayerCard = (props: PlayerCardProps) => {
  // isMine = true : 수정가능 / = false 수정 불가능
  const {
    isMine,
    userIdx,
    profileImage,
    teamName,
    nickname,
    matchPositionIdx,
    onImageChange,
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
    handleSetDefaultImage,
    handleBackup,
    handleCloseModifyMode,
  } = useProfileImageHandler({ profileImage, setValue, clearErrors });

  const [handlePutProfileImage] = usePutProfileImageHandler({
    handleBackup,
    handleCloseModifyMode,
    handleCancel,
    onImageChange,
  });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        handlePutProfileImage(data.file);
      })}
      className="w-full h-full">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-xl overflow-hidden shadow-2xl border border-gray-700 transform transition-all hover:scale-[1.01] hover:shadow-lg">
        {/* Header with position badge */}
        <div className="relative h-16 bg-gradient-to-br from-slate-800 to-slate-700 flex items-center px-4">
          {matchPositionIdx && (
            <div
              style={{
                color: getPositionColor(matchPositionIdx),
              }}
              className={`absolute top-3 right-3  text-xs font-bold px-3 py-1 rounded-full shadow-md border border-white/20`}>
              {matchPosition[matchPositionIdx]}
            </div>
          )}
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
              onChange={isMine ? handleImageChange : undefined}
              disabled={!isMine}
            />
            <label
              htmlFor="profileImg"
              className={`block ${
                isMine ? "cursor-pointer group" : "cursor-default"
              }`}>
              <div className="relative">
                <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-br from-slate-600 to-slate-700 shadow-lg">
                  <img
                    className="w-full h-full object-cover rounded-full border-2 border-gray-800 bg-white"
                    src={preview ? preview : profile}
                    alt="프로필 미리보기"
                  />
                </div>
                {isMine && (
                  <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-20 group-hover:opacity-100 transition-opacity duration-200">
                    <img
                      src={camera}
                      className="w-8 h-8 filter invert"
                      alt="카메라"
                    />
                  </div>
                )}
              </div>
            </label>
          </div>

          <div className="ml-24">
            <div className="font-bold text-lg tracking-wide">{nickname}</div>
            <div className="text-xs text-slate-400 font-medium">#{userIdx}</div>
            {teamName && (
              <div className="mt-2 inline-flex items-center px-2 py-1 bg-grass/20 border border-grass/30 rounded-full">
                <span className="text-grass text-xs font-medium">
                  {teamName}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Control buttons */}
        {isMine ? (
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
                navigate(`/profile/${userIdx}`);
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
      </div>
    </form>
  );
};

export default PlayerCard;
