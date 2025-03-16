import { useForm, Resolver, SubmitHandler } from "react-hook-form";
import { PlayerCardProps, ImageForm } from "./type";
import { yupResolver } from "@hookform/resolvers/yup";

import { schema } from "./lib/schema";
import useImageHandler from "./model/useImageHandler";

import usePutProfileImage from "../../../../../../3_Entity/Account/usePutProfileImage";
import { matchPosition } from "../../../../../../4_Shared/constant/matchPosition";
import profile from "../../../../../../4_Shared/assets/svg/profile.svg";

const PlayerCard = ({ userInfo }: { userInfo: PlayerCardProps }) => {
  const { user_idx, is_mine, nickname, position, profile_img } = userInfo;

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<ImageForm>({
    resolver: yupResolver(schema) as Resolver<ImageForm>,
  });
  const {
    preview,
    modifyMode,
    handleImageChange,
    handleCancel,
    handleSave,
    handleSetDefaultImage,
  } = useImageHandler({ profile_img, setValue, clearErrors });

  const [putEvent] = usePutProfileImage(user_idx);

  const onSubmit: SubmitHandler<ImageForm> = (data) => {
    handleSave();
    putEvent(data.profile_img);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="hidden sm:flex justify-center items-center">
      <div className="w-[160px] sm:w-[140px] md:w-[180px] lg:w-[200px] aspect-[3/4] bg-blue-900 text-white rounded-lg flex flex-col items-center justify-between p-4 shadow-md">
        <div className="text-xs font-bold self-start">
          {matchPosition[position]}
        </div>

        {/* 이미지 업로드 부분 */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <input
            id="profileImg"
            type="file"
            accept="image/*"
            className="hidden"
            {...register("profile_img")}
            onChange={is_mine ? handleImageChange : undefined}
            disabled={!is_mine}
          />
          <label
            htmlFor="profileImg"
            className={`flex flex-col items-center ${
              is_mine ? "cursor-pointer" : "cursor-default"
            }`}>
            <img
              className="w-28 h-28 object-cover rounded-full border-2 border-white shadow-lg"
              src={preview ? preview : profile}
              alt="프로필 미리보기"
            />
            {is_mine && (
              <div className="flex flex-col text-center">
                <span className="text-xs text-gray-300 mt-1">이미지 변경</span>
                <button
                  type="button"
                  className="text-xs text-gray-300 mt-1"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSetDefaultImage();
                  }}>
                  기본 이미지 설정
                </button>
              </div>
            )}
          </label>

          {is_mine && modifyMode && (
            <div className="flex gap-2 mt-2">
              <button
                type="button"
                className="px-3 py-1 text-xs border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition"
                onClick={handleCancel}>
                취소
              </button>
              <button
                type="submit"
                className="px-3 py-1 text-xs border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white transition">
                저장
              </button>
            </div>
          )}
        </div>

        {/* 오류 메시지 출력 */}
        {errors.profile_img && (
          <p className="text-red-500 text-xs mt-1">
            {errors.profile_img.message}
          </p>
        )}

        <div className="text-center">
          <p className="text-sm font-semibold">{nickname} #KOR</p>
        </div>
      </div>
    </form>
  );
};

export default PlayerCard;
