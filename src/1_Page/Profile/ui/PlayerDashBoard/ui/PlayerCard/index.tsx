import { useForm, Resolver } from "react-hook-form";

import { matchPosition } from "../../../../../../4_Shared/constant/matchPosition";
import { PlayerCardProps, ImageInput } from "./type";
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./lib/schema";
import useImageHandler from "./model/useImageHandler";

const PlayerCard = ({ userInfo }: { userInfo: PlayerCardProps }) => {
  const { register, setValue } = useForm<ImageInput>({
    resolver: yupResolver(schema) as Resolver<ImageInput>,
  });

  const originalImageRef = React.useRef<string>(userInfo.profile_img); // 초기 이미지 저장
  const { preview, isEditing, handleImageChange, handleCancel, handleSave } =
    useImageHandler(userInfo, originalImageRef, setValue);

  return (
    <div className="hidden sm:flex justify-center items-center">
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
            onChange={handleImageChange}
          />
          <label
            htmlFor="profileImg"
            className="flex flex-col items-center cursor-pointer">
            <img
              className="w-28 h-28 object-cover rounded-full border-2 border-white shadow-lg"
              src={preview}
              alt="프로필 미리보기"
            />
            <span className="text-xs text-gray-300 mt-1">이미지 변경</span>
          </label>

          {/* 이미지 변경 시 저장 & 취소 버튼 표시 */}
          {isEditing && (
            <div className="flex gap-2 mt-2">
              <button
                className="px-3 py-1 text-xs border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition"
                onClick={handleCancel}>
                취소
              </button>
              <button
                className="px-3 py-1 text-xs border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white transition"
                onClick={handleSave}>
                저장
              </button>
            </div>
          )}
        </div>

        <div className="text-center">
          <p className="text-sm font-semibold">{userInfo.name} #KOR</p>
          <p className="text-xs">{userInfo.tag}번</p>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
