import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useToggleState from "../../../../../../../../../../../../../../../../4_Shared/model/useToggleState";

export interface TeamStatsEvidenceFormValues {
  files?: FileList;
  match_match_idx: number;
  urls: string[];
  // 추가 스탯 필드들
  match_player_stats_goal?: number;
  match_player_stats_assist?: number;
  // ... 기타 스탯 필드들
}

const teamStatsEvidenceSchema = yup.object({
  files: yup
    .mixed<FileList>()
    .test("fileSize", "각 파일은 최대 1MB까지 업로드 가능합니다.", (value) => {
      if (!value || value.length === 0) return true;
      for (let i = 0; i < value.length; i++) {
        if (value[i].size > 1024 * 1024) return false;
      }
      return true;
    })
    .test("fileType", "JPG, JPEG, PNG 파일만 업로드 가능합니다.", (value) => {
      if (!value || value.length === 0) return true;
      for (let i = 0; i < value.length; i++) {
        if (!["image/jpeg", "image/jpg", "image/png"].includes(value[i].type)) {
          return false;
        }
      }
      return true;
    }),
  match_match_idx: yup
    .number()
    .required("매치 인덱스는 필수값입니다.")
    .typeError("매치 인덱스는 숫자여야 합니다."),
  urls: yup
    .array()
    .of(
      yup
        .string()
        .url("유효한 URL이 아닙니다.")
        .required("유효한 URL이 아닙니다.")
    )
    .required("기존 증빙자료 정보가 필요합니다.")
    .max(5, "증빙자료는 최대 5개까지 업로드 가능합니다."),
});

interface Props {
  defaultValues?: Partial<TeamStatsEvidenceFormValues>;
}

const StatEvidenceImgFormPanel: React.FC<Props> = ({ defaultValues }) => {
  const [isModalOpen, toggleModal] = useToggleState(false);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [currentUrls, setCurrentUrls] = useState<string[]>(
    defaultValues?.urls || []
  );
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string>("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TeamStatsEvidenceFormValues>({
    resolver: yupResolver(teamStatsEvidenceSchema),
    defaultValues: {
      files: undefined,
      match_match_idx: defaultValues?.match_match_idx || 0,
      urls: defaultValues?.urls || [],
    },
  });

  const watchedFiles = watch("files");

  // 총 이미지 개수 계산
  const totalImageCount = currentUrls.length + previewImages.length;
  const remainingSlots = 5 - totalImageCount;
  const isLimitReached = totalImageCount >= 5;

  // 최대 5개 검증 함수
  const validateTotalCount = (newFilesCount: number) => {
    const totalCount =
      currentUrls.length + previewImages.length + newFilesCount;
    if (totalCount > 5) {
      setValidationError(
        `증빙자료는 총 최대 5개까지만 가능합니다. (현재 기존: ${currentUrls.length}개, 미리보기: ${previewImages.length}개, 새로 선택: ${newFilesCount}개 = 총 ${totalCount}개)`
      );
      return false;
    }
    setValidationError("");
    return true;
  };

  // 파일 추가 시 미리보기 생성 (기존과 누적)
  React.useEffect(() => {
    if (watchedFiles && watchedFiles.length > 0) {
      // 최대 개수 검증
      if (!validateTotalCount(watchedFiles.length)) {
        // 파일 선택 초기화
        setValue("files", undefined);
        return;
      }

      const newPreviews: string[] = [];
      let loadedCount = 0;

      for (let i = 0; i < watchedFiles.length; i++) {
        const file = watchedFiles[i];
        const reader = new FileReader();

        reader.onload = (e) => {
          if (e.target?.result) {
            newPreviews[i] = e.target.result as string;
            loadedCount++;

            if (loadedCount === watchedFiles.length) {
              // 기존 미리보기에 새로운 미리보기들을 추가
              setPreviewImages((prev) => [
                ...prev,
                ...newPreviews.filter(Boolean),
              ]);
              // 파일 입력 초기화 (다음 업로드를 위해)
              setValue("files", undefined);
            }
          }
        };

        reader.readAsDataURL(file);
      }
    }
  }, [watchedFiles, setValue]);

  // 기존 이미지 삭제
  const handleDeleteExistingImage = (index: number) => {
    const newUrls = currentUrls.filter((_, idx) => idx !== index);
    setCurrentUrls(newUrls);
    setValue("urls", newUrls);
    setValidationError(""); // 삭제 시 에러 메시지 클리어
  };

  // 미리보기 이미지 삭제
  const handleDeletePreviewImage = (index: number) => {
    const newPreviews = previewImages.filter((_, idx) => idx !== index);
    setPreviewImages(newPreviews);
    setValidationError(""); // 삭제 시 에러 메시지 클리어
  };

  // 이미지 확대 모달
  const handleImageEnlarge = (imageSrc: string) => {
    setEnlargedImage(imageSrc);
  };

  const closeEnlargedImage = () => {
    setEnlargedImage(null);
  };

  return (
    <div>
      {/* 트리거 버튼 */}
      <button
        type="button"
        onClick={toggleModal}
        className="px-4 py-2 bg-[var(--color-thick-grass)]/20 border border-[var(--color-grass)]/30 text-[var(--color-grass)] rounded-lg hover:bg-[var(--color-thick-grass)]/40 hover:border-[var(--color-grass)] transition-all duration-200 flex items-center gap-2 text-sm font-medium">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        증빙자료 ({totalImageCount}/5개)
      </button>

      {/* 메인 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={toggleModal}
          />

          <div className="relative bg-gray-900 border border-gray-700 rounded-xl shadow-2xl max-w-3xl w-full mx-4 max-h-[85vh] overflow-hidden">
            {/* 모달 헤더 */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700 bg-gray-800/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[var(--color-thick-grass)]/20 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-[var(--color-grass)]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-100">
                  증빙자료 관리 ({totalImageCount}/5)
                </h2>
              </div>
              <button
                onClick={toggleModal}
                className="text-gray-400 hover:text-gray-300 transition-colors p-2 hover:bg-gray-700 rounded-lg">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* 모달 바디 */}
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              <form
                onSubmit={handleSubmit((data) => {
                  console.log("Form submitted:", data);
                })}
                className="space-y-6">
                <input type="hidden" {...register("match_match_idx")} />

                {/* 총 개수 안내 */}
                <div className="p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                  <p className="text-sm text-blue-400 flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    총 {totalImageCount}개의 이미지가 선택되었습니다.
                    {remainingSlots > 0
                      ? ` ${remainingSlots}개 더 추가 가능합니다.`
                      : " 최대 개수에 도달했습니다."}
                  </p>
                </div>

                {/* 검증 에러 메시지 */}
                {validationError && (
                  <div className="p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
                    <p className="text-sm text-red-400 flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {validationError}
                    </p>
                  </div>
                )}

                {/* 기존 증빙자료 섹션 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-200 mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[var(--color-grass)]"></div>
                    기존 증빙자료 ({currentUrls.length}개)
                  </label>
                  {currentUrls.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {currentUrls.map((url, idx) => (
                        <div key={`existing-${idx}`} className="relative group">
                          <div className="relative overflow-hidden rounded-xl border border-gray-700 bg-gray-800">
                            <img
                              src={url}
                              alt={`evidence-${idx}`}
                              className="w-full h-28 object-cover transition-transform duration-200 group-hover:scale-105"
                            />
                            {/* 상세보기 버튼 - 항상 우측 상단 */}
                            <button
                              type="button"
                              onClick={() => {
                                console.log("Enlarge image:", url);
                                handleImageEnlarge(url);
                              }}
                              className="absolute inset-0 z-20 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-200">
                              <svg
                                className="w-3 h-3"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                              </svg>
                            </button>
                            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-200">
                              <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center">
                                <span className="text-xs text-white font-medium">
                                  기존 {idx + 1}
                                </span>
                                <button
                                  type="button"
                                  className="pointer-events-auto bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-lg transition-colors duration-200 shadow-lg"
                                  onClick={() =>
                                    handleDeleteExistingImage(idx)
                                  }>
                                  <svg
                                    className="w-3 h-3"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M6 18L18 6M6 6l12 12"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 px-4 border-2 border-dashed border-gray-600 rounded-xl bg-gray-800/30">
                      <svg
                        className="w-12 h-12 text-gray-500 mx-auto mb-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="text-gray-400 text-sm">
                        등록된 증빙자료가 없습니다.
                      </p>
                    </div>
                  )}
                </div>

                {/* 새로 추가된 이미지 미리보기 */}
                {previewImages.length > 0 && (
                  <div>
                    <label className="text-sm font-semibold text-gray-200 mb-4 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[var(--color-grass)]"></div>
                      새로 추가할 증빙자료 ({previewImages.length}개)
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {previewImages.map((preview, idx) => (
                        <div key={`preview-${idx}`} className="relative group">
                          <div className="relative overflow-hidden rounded-xl border border-[var(--color-grass)]/50 bg-gray-800">
                            <img
                              src={preview}
                              alt={`new-evidence-${idx}`}
                              className="w-full h-28 object-cover transition-transform duration-200 group-hover:scale-105"
                            />
                            {/* 상세보기 버튼 - 항상 우측 상단 */}
                            <button
                              type="button"
                              onClick={() => handleImageEnlarge(preview)}
                              className="absolute top-2 right-2 bg-blue-500 hover:bg-blue-600 text-white p-1.5 rounded-lg transition-all duration-200 shadow-lg">
                              <svg
                                className="w-3 h-3"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                              </svg>
                            </button>
                            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-200">
                              <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center">
                                <span className="text-xs text-white font-medium">
                                  신규 {idx + 1}
                                </span>
                                <button
                                  type="button"
                                  className="pointer-events-auto bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-lg transition-colors duration-200 shadow-lg"
                                  onClick={() => handleDeletePreviewImage(idx)}>
                                  <svg
                                    className="w-3 h-3"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M6 18L18 6M6 6l12 12"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                            {/* 새 이미지 표시 배지 */}
                            <div className="absolute top-2 left-2">
                              <span className="bg-[var(--color-grass)] text-gray-900 text-xs px-2 py-1 rounded-full font-bold">
                                NEW
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 새 증빙자료 업로드 섹션 */}
                <div>
                  <label
                    htmlFor="files"
                    className="text-sm font-semibold text-gray-200 mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[var(--color-grass)]"></div>
                    새 증빙자료 추가 ({remainingSlots}개 더 가능)
                  </label>

                  {isLimitReached ? (
                    <div className="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center bg-gray-800/50 opacity-50">
                      <div className="w-16 h-16 rounded-full bg-gray-600 flex items-center justify-center mb-4 border border-gray-600 mx-auto">
                        <svg
                          className="w-8 h-8 text-gray-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18 18M5.636 5.636L6 6"
                          />
                        </svg>
                      </div>
                      <span className="text-gray-500 font-medium">
                        총 5개 이미지 제한에 도달했습니다
                      </span>
                      <p className="text-xs text-gray-600 mt-1">
                        기존 이미지를 삭제하면 새로 추가할 수 있습니다
                      </p>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-[var(--color-grass)]/30 rounded-xl p-8 text-center hover:border-[var(--color-grass)]/50 hover:bg-[var(--color-thick-grass)]/5 transition-all duration-200 bg-gray-800/30">
                      <input
                        id="files"
                        type="file"
                        {...register("files")}
                        accept=".jpg,.jpeg,.png"
                        multiple
                        className="hidden"
                      />
                      <label
                        htmlFor="files"
                        className="cursor-pointer flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-[var(--color-thick-grass)]/20 flex items-center justify-center mb-4 border border-[var(--color-grass)]/30">
                          <svg
                            className="w-8 h-8 text-[var(--color-grass)]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                          </svg>
                        </div>
                        <span className="text-gray-200 font-medium mb-1">
                          클릭하여 파일을 선택하거나 드래그하여 업로드
                        </span>
                        <span className="text-xs text-gray-400">
                          JPG, JPEG, PNG (최대 1MB) • 최대 {remainingSlots}개
                          추가 가능
                        </span>
                      </label>
                    </div>
                  )}

                  {errors.files && (
                    <div className="mt-3 p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
                      <p className="text-sm text-red-400 flex items-center gap-2">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {errors.files.message}
                      </p>
                    </div>
                  )}
                </div>

                {/* 모달 푸터 */}
                <div className="flex justify-end space-x-3 pt-6 border-t border-gray-700">
                  <button
                    type="button"
                    onClick={toggleModal}
                    className="px-5 py-2.5 text-sm font-medium text-gray-300 bg-gray-700 border border-gray-600 rounded-lg hover:bg-gray-600 hover:text-gray-200 transition-all duration-200">
                    취소
                  </button>
                  <button
                    type="submit"
                    disabled={totalImageCount === 0}
                    className="px-5 py-2.5 text-sm font-medium text-gray-900 bg-[var(--color-grass)] border border-transparent rounded-lg hover:bg-[var(--color-thick-grass)] transition-all duration-200 shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    저장 ({totalImageCount}개 이미지)
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* 개선된 이미지 상세보기 모달 */}
      {enlargedImage && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 transition-opacity duration-300">
          {/* 배경 클릭 영역 */}
          <div
            className="absolute inset-0 cursor-pointer"
            onClick={closeEnlargedImage}
            aria-label="이미지 상세보기 닫기"
          />

          {/* 모달 컨테이너 */}
          <div className="relative max-w-7xl max-h-[95vh] mx-4 flex flex-col items-center ">
            {/* 상단 컨트롤 바 */}
            <div className="absolute -top-16 left-0 right-0 flex justify-between items-center z-20">
              <div className="text-white text-sm px-3 py-1 rounded-lg backdrop-blur-sm">
                증빙자료 상세보기
              </div>
              <button
                onClick={closeEnlargedImage}
                className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full transition-all duration-200 shadow-lg hover:scale-110"
                aria-label="닫기">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* 이미지 컨테이너 */}
            <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-4 shadow-2xl">
              <img
                src={enlargedImage}
                alt="확대된 증빙자료"
                className="max-w-full max-h-full object-contain rounded-xl shadow-xl transition-all duration-500 ease-out"
                style={{
                  maxWidth: "85vw",
                  maxHeight: "85vh",
                  minWidth: "300px",
                  minHeight: "200px",
                  opacity: "0",
                  transform: "scale(0.95)",
                  transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
                }}
                onLoad={(e) => {
                  // 이미지 로드 완료 시 페이드인 효과
                  e.currentTarget.style.opacity = "1";
                  e.currentTarget.style.transform = "scale(1)";
                }}
                onError={(e) => {
                  // 이미지 로드 실패 시 에러 표시
                  e.currentTarget.style.display = "none";
                  const errorDiv = document.createElement("div");
                  errorDiv.className =
                    "flex items-center justify-center w-96 h-64 bg-gray-800 rounded-xl text-gray-400";
                  errorDiv.innerHTML = `
                    <div class="text-center">
                      <svg class="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                      </svg>
                      <p class="text-sm">이미지를 불러올 수 없습니다</p>
                    </div>
                  `;
                  e.currentTarget.parentNode?.appendChild(errorDiv);
                }}
              />

              {/* 이미지 하단 정보 */}
              <div className="absolute bottom-2 left-2 right-2 bg-black/60 backdrop-blur-sm rounded-lg p-2">
                <div className="flex justify-between items-center text-white text-xs">
                  <span>증빙자료</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatEvidenceImgFormPanel;
