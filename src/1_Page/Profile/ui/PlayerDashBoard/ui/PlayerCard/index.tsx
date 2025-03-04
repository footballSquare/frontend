import { useForm, Resolver } from "react-hook-form";
import { PlayerCardProps, ImageInput } from "./type";
import { yupResolver } from "@hookform/resolvers/yup";

import { convertToFile } from "./util/convertToFile";
import { schema } from "./lib/schema";
import useImageHandler from "./model/useImageHandler";

import usePutUserImage from "../../../../../../3_Entity/Account/usePutUserImage";
import { matchPosition } from "../../../../../../4_Shared/constant/matchPosition";
import profile from "../../../../../../4_Shared/assets/svg/profile.svg";

const PlayerCard = ({ userInfo }: { userInfo: PlayerCardProps }) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<ImageInput>({
    resolver: yupResolver(schema) as Resolver<ImageInput>,
  });

  const {
    preview,
    isEditing,
    handleImageChange,
    handleCancel,
    handleSave,
    handleSetDefaultImage,
  } = useImageHandler(userInfo, setValue, clearErrors);

  const [putEvent] = usePutUserImage({ userIdx: userInfo.userIdx });
  const onSubmit = (data: ImageInput) => {
    const file = convertToFile(data.profile_img, profile);
    handleSave();
    putEvent(file);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="hidden sm:flex justify-center items-center">
      <div className="w-[160px] sm:w-[140px] md:w-[180px] lg:w-[200px] aspect-[3/4] bg-blue-900 text-white rounded-lg flex flex-col items-center justify-between p-4 shadow-md">
        <div className="text-xs font-bold self-start">
          {matchPosition[userInfo.position]}
        </div>

        {/* 이미지 업로드 부분 */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <input
            id="profileImg"
            type="file"
            accept="image/*"
            className="hidden"
            {...register("profile_img")}
            onChange={userInfo.isMine ? handleImageChange : undefined}
            disabled={!userInfo.isMine}
          />
          <label
            htmlFor="profileImg"
            className={`flex flex-col items-center ${
              userInfo.isMine ? "cursor-pointer" : "cursor-default"
            }`}>
            <img
              className="w-28 h-28 object-cover rounded-full border-2 border-white shadow-lg"
              src={preview ? preview : profile}
              alt="프로필 미리보기"
            />
            {userInfo.isMine && (
              <>
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
              </>
            )}
          </label>

          {userInfo.isMine && isEditing && (
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
          <p className="text-sm font-semibold">{userInfo.name} #KOR</p>
          <p className="text-xs">{userInfo.tag}번</p>
        </div>
      </div>
    </form>
  );
};

export default PlayerCard;
