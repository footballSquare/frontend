import React from "react";
import { Controller, FieldArrayWithId } from "react-hook-form";
import useHookForm from "./model/useHookForm";
import useEnlargedImage from "./model/useEnlargedImage";

const StatEvidenceImgForm = (props: StatEvidenceImgFormProps) => {
  const { defaultValues, onSubmit, onClose } = props;
  const [isModalOpen, setIsModalOpen] = React.useState(true);
  const { enlargedImage, handleImageEnlarge, closeEnlargedImage } =
    useEnlargedImage();

  // useHookForm에서 필요한 값들을 모두 구조 분해로 받아옵니다.
  const {
    control,
    watch,
    handleSubmit,
    fields,
    handleDeleteImage,
    handleFileSelect,
    errors,
  } = useHookForm(defaultValues);

  // watch로 images 배열을 감시
  const watchedImages = watch("images") || [];
  const totalImageCount = watchedImages.length;
  const remainingSlots = 5 - totalImageCount;
  const isLimitReached = totalImageCount >= 5;

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    setIsModalOpen(false);
    onClose?.();
  };

  // 폼 제출 핸들러 - 타입을 TeamStatsEvidenceFormValues로 수정
  const handleFormSubmit = async (data: StatsEvidenceFormValues) => {
    // 기존 이미지 URL
    const existingUrls = data.images
      .filter((img) => img.type === "existing")
      .map((img) => img.url);

    // 새로 업로드된 File 객체만 골라내기
    const newFiles = data.images
      .filter((img) => img.type === "new")
      .map((img) => img.file)
      .filter((f): f is File => Boolean(f));

    const finalData = {
      urls: existingUrls,
      files: newFiles,
      // previewImages는 클라이언트 상에서만 보여주기 위한 data
      previewImages: data.images
        .filter((img) => img.type === "new")
        .map((img) => img.url),
    };

    await onSubmit(finalData);
    handleCloseModal();
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleCloseModal}
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
            onClick={handleCloseModal}
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
          <div className="space-y-6">
            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              className="space-y-6">
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

              {/* 이미지 목록 */}
              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[var(--color-grass)]"></div>
                  증빙자료 목록 ({totalImageCount}개)
                </label>

                {fields.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                    {fields.map(
                      (
                        field: FieldArrayWithId<
                          StatsEvidenceFormValues,
                          "images",
                          "id"
                        >,
                        index: number
                      ) => {
                        const image = watchedImages[index];
                        const isExisting = image?.type === "existing";

                        return (
                          <div key={field.id} className="relative group">
                            <div
                              className={`relative overflow-hidden rounded-xl border bg-gray-800 ${
                                isExisting
                                  ? "border-gray-700"
                                  : "border-[var(--color-grass)]/50"
                              }`}>
                              <img
                                src={image?.url}
                                alt={`evidence-${index}`}
                                className="w-full h-28 object-cover transition-transform duration-200 group-hover:scale-105"
                              />

                              {/* 상세보기 버튼 */}
                              <button
                                type="button"
                                onClick={() => handleImageEnlarge(image?.url)}
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

                              {/* 호버 오버레이 */}
                              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-200">
                                <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center">
                                  <span className="text-xs text-white font-medium">
                                    {isExisting ? "기존" : "신규"} {index + 1}
                                  </span>
                                  <button
                                    type="button"
                                    className="pointer-events-auto bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-lg transition-colors duration-200 shadow-lg"
                                    onClick={() => handleDeleteImage(index)}>
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
                              {!isExisting && (
                                <div className="absolute top-2 left-2">
                                  <span className="bg-[var(--color-grass)] text-gray-900 text-xs px-2 py-1 rounded-full font-bold">
                                    NEW
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8 px-4 border-2 border-dashed border-gray-600 rounded-xl bg-gray-800/30 mb-6">
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

              {/* 새 증빙자료 업로드 섹션 */}
              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[var(--color-grass)]"></div>
                  새 증빙자료 추가 ({remainingSlots}개 더 가능)
                </label>

                <Controller
                  name="images"
                  control={control}
                  render={() => (
                    <>
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
                            accept=".jpg,.jpeg,.png"
                            multiple
                            className="hidden"
                            onChange={(e) => handleFileSelect(e.target.files)}
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
                              JPG, JPEG, PNG (최대 1MB) • 최대 {remainingSlots}
                              개 추가 가능
                            </span>
                          </label>
                        </div>
                      )}
                    </>
                  )}
                />

                {/* 에러 메시지 */}
                {errors?.images && (
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
                      {errors.images.message}
                    </p>
                  </div>
                )}
              </div>

              {/* 폼 버튼 */}
              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-700">
                <button
                  type="button"
                  onClick={handleCloseModal}
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

            {/* 이미지 상세보기 모달 */}
            {enlargedImage && (
              <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 transition-opacity duration-300">
                <div
                  className="absolute inset-0 cursor-pointer"
                  onClick={closeEnlargedImage}
                  aria-label="이미지 상세보기 닫기"
                />

                <div className="relative max-w-7xl max-h-[95vh] mx-4 flex flex-col items-center">
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

                  <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-4 shadow-2xl">
                    <img
                      src={enlargedImage}
                      alt="확대된 증빙자료"
                      className="max-w-full max-h-full object-contain rounded-xl shadow-xl"
                      style={{
                        maxWidth: "85vw",
                        maxHeight: "85vh",
                        minWidth: "300px",
                        minHeight: "200px",
                      }}
                    />

                    <div className="absolute bottom-2 left-2 right-2 bg-black/60 backdrop-blur-sm rounded-lg p-2">
                      <div className="flex justify-between items-center text-white text-xs">
                        <span>증빙자료</span>
                        <span>ESC로 닫기</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatEvidenceImgForm;
