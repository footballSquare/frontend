import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../../../../../../../../4_Shared/lib/imgSchema";
import useImageHandler from "./model/useImageHandler";
import EmptyBanner from "../../../../../../../../4_Shared/components/EmptyBanner";

const TeamImageInput = (props: TeamImageInputProps) => {
  const { isBanner, imgSrc, handleSetTeamImg, putImage } = props;
  const key = "file";

  // 폼 유효성 검사 설정
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<ImageForm>({
    resolver: yupResolver(schema),
  });

  // 이미지 미리보기, 수정 모드 핸들링 등
  const {
    imagePreview,
    modifyMode,
    inputFileRef,
    handleImageClick,
    handleImageChange,
    handleCancle,
    handleSave,
  } = useImageHandler({
    imgSrc,
    setValue,
    clearErrors,
  });

  // 폼 submit 시 호출될 함수
  const onSubmit: SubmitHandler<ImageForm> = (data) => {
    handleSave();
    if (!imagePreview) return;
    // 부모 컴포넌트에서 state 설정
    handleSetTeamImg(imagePreview);
    // 서버 업로드
    putImage(data.file);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <label className="text-sm font-medium text-gray-300">
        {/* Label은 공통으로 둠. 필요시 props로 빼도 무방 */}
        Team Emblem
      </label>

      <div className="relative p-4 rounded-md shadow-md">
        <div className="flex gap-1">
          {imagePreview ? (
            <img
              className={
                isBanner
                  ? "w-full h-[140px] object-cover"
                  : "h-[40px] w-[40px] object-cover"
              }
              src={imagePreview}
              alt="Team Emblem or Banner Preview"
            />
          ) : (
            <EmptyBanner
              text={isBanner ? "팀 배너" : "팀 엠블럼"}
              className={
                isBanner
                  ? "w-full h-[140px] object-cover"
                  : "h-[40px] w-[40px] object-cover"
              }
            />
          )}
        </div>

        {modifyMode ? (
          <div className="absolute flex bottom-4 right-4">
            <button
              type="button"
              onClick={handleCancle}
              className="bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors duration-200">
              취소
            </button>
            <button
              type="submit"
              className="ml-2 bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200">
              저장
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleImageClick}
            className="absolute bottom-4 right-4 bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200">
            수정하기
          </button>
        )}

        <div>
          {/* 파일 업로드 input */}
          <input
            {...register(key)}
            ref={inputFileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
          {/* 에러 메시지 */}
          {errors[key] && (
            <p className="text-red-500 text-xs mt-1">{errors[key]?.message}</p>
          )}
        </div>
      </div>
    </form>
  );
};

export default TeamImageInput;
