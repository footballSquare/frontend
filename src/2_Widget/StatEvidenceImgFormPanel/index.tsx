import { Controller, FieldArrayWithId } from "react-hook-form";

import useToggleState from "../../4_Shared/model/useToggleState";
import useStatInputHookForm from "./model/useStatInputHookForm";
import useEnlargedImage from "./model/useEnlargedImage";
import useStatFormSubmit from "./model/useStatFormSubmit";
import uploadIcon from "../../4_Shared/assets/svg/upload.svg";
import warningIcon from "../../4_Shared/assets/svg/warning.svg";
import searchIcon from "../../4_Shared/assets/svg/search.svg";
import closeIcon from "../../4_Shared/assets/svg/close.svg";
import checkIcon from "../../4_Shared/assets/svg/check.svg";
import imageIcon from "../../4_Shared/assets/svg/image.svg";
import bannedIcon from "../../4_Shared/assets/svg/banned.svg";

const StatEvidenceImgFormPanel = (props: StatEvidenceImgFormPanelProps) => {
  const { defaultValues, onSubmit, matchIdx, canChange = true } = props;
  const [isModalOpen, toggleModal] = useToggleState(false);
  const { enlargedImage, handleImageEnlarge, closeEnlargedImage } =
    useEnlargedImage();

  const {
    methods,
    fields,
    restoreFromBackup,
    handleToggleDeleteImage,
    handleFileSelect,
  } = useStatInputHookForm(defaultValues);

  const { handleFormSubmit } = useStatFormSubmit({
    onSubmit,
    onModalClose: toggleModal,
    matchIdx,
    restoreFromBackup,
  });

  const {
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = methods;

  // watch로 images 배열을 감시
  const watchedImages = watch("images") || [];

  // 삭제되지 않은 이미지만 카운트
  const activeImages = watchedImages.filter((img) => !img.deleted);
  const totalImageCount = activeImages.length;
  const remainingSlots = 5 - totalImageCount;
  const isLimitReached = totalImageCount >= 5;

  return (
    <div>
      {/* 트리거 버튼 */}
      <button
        type="button"
        onClick={toggleModal}
        className="px-4 py-2 bg-[var(--color-thick-grass)]/20 border border-[var(--color-grass)]/30 text-[var(--color-grass)] rounded-lg hover:bg-[var(--color-thick-grass)]/40 hover:border-[var(--color-grass)] transition-all duration-200 flex items-center gap-2 text-sm font-medium">
        <img src={uploadIcon} className="w-[15px] h-[15px]" />
        {canChange ? "증빙자료" : "증빙자료 보기"} ({totalImageCount}/5개)
      </button>

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
                  <img src={uploadIcon} className="w-[15px] h-[15px]" />
                </div>
                <h2 className="text-xl font-bold text-gray-100">
                  {canChange ? "증빙자료 관리" : "증빙자료 보기"} (
                  {totalImageCount}/5)
                </h2>
              </div>
              <button
                onClick={toggleModal}
                className="text-gray-400 hover:text-gray-300 transition-colors p-2 hover:bg-gray-700 rounded-lg"></button>
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
                      <img
                        src={warningIcon}
                        className="w-[15px] h-[15px]"
                        alt="warning"
                      />
                      {canChange ? (
                        <>
                          총 {totalImageCount}개의 활성 이미지가 선택되었습니다.
                          {watchedImages.filter((img) => img.deleted).length >
                            0 && (
                            <span className="text-red-400">
                              (
                              {
                                watchedImages.filter((img) => img.deleted)
                                  .length
                              }
                              개 미포함 예정)
                            </span>
                          )}
                          {remainingSlots > 0
                            ? ` ${remainingSlots}개 더 추가 가능합니다.`
                            : " 최대 개수에 도달했습니다."}
                        </>
                      ) : (
                        `총 ${totalImageCount}개의 증빙자료를 확인할 수 있습니다. (읽기 전용)`
                      )}
                    </p>
                  </div>

                  {/* 이미지 목록 */}
                  <div>
                    <label className="flex text-sm font-semibold text-gray-200 mb-4 items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[var(--color-grass)]"></div>
                      증빙자료 목록 ({totalImageCount}개 활성)
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
                            const isDeleted = image?.deleted || false;

                            return (
                              <div key={field.id} className="relative group">
                                <div
                                  className={`relative overflow-hidden rounded-xl border bg-gray-800 transition-all duration-200 ${
                                    isDeleted
                                      ? "opacity-50 border-red-500/50"
                                      : isExisting
                                      ? "border-gray-700"
                                      : "border-[var(--color-grass)]/50"
                                  }`}>
                                  {/* 이미지 URL 디버깅 정보 추가 */}
                                  {!image?.url && (
                                    <div className="w-full h-28 bg-red-500 flex items-center justify-center text-white text-xs">
                                      URL 없음
                                    </div>
                                  )}
                                  {image?.url && (
                                    <img
                                      src={image.url}
                                      alt={`evidence-${index}`}
                                      className={`w-full h-28 object-cover transition-all duration-200 ${
                                        isDeleted
                                          ? "grayscale group-hover:scale-100"
                                          : "group-hover:scale-105"
                                      }`}
                                    />
                                  )}

                                  {/* 삭제됨 오버레이 */}
                                  {isDeleted && (
                                    <div className="absolute inset-0 bg-red-900/30 flex items-center justify-center">
                                      <span className="text-white text-xs font-bold bg-red-500 px-2 py-1 rounded">
                                        미포함 예정
                                      </span>
                                    </div>
                                  )}

                                  {/* 상세보기 버튼 */}
                                  <button
                                    type="button"
                                    onClick={() => {
                                      if (image?.url) {
                                        handleImageEnlarge(image.url);
                                      }
                                    }}
                                    disabled={isDeleted || !image?.url}
                                    className={`absolute top-2 right-2 text-white p-1.5 rounded-lg transition-all duration-200 shadow-lg ${
                                      isDeleted || !image?.url
                                        ? "bg-gray-500 cursor-not-allowed opacity-50"
                                        : "bg-blue-500 hover:bg-blue-600"
                                    }`}>
                                    <img
                                      src={searchIcon}
                                      className="w-3 h-3"
                                      alt="search"
                                    />
                                  </button>

                                  {/* 호버 오버레이 */}
                                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-200">
                                    <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center">
                                      <span className="text-xs text-white font-medium">
                                        {isExisting ? "기존" : "신규"}{" "}
                                        {index + 1}
                                      </span>
                                      {canChange && (
                                        <button
                                          type="button"
                                          className={`pointer-events-auto text-white p-1.5 rounded-lg transition-colors duration-200 shadow-lg ${
                                            isDeleted
                                              ? "bg-green-500 hover:bg-green-600"
                                              : "bg-red-500 hover:bg-red-600"
                                          }`}
                                          onClick={() =>
                                            handleToggleDeleteImage(index)
                                          }>
                                          {isDeleted ? (
                                            <span className="text-xs font-bold">
                                              복원
                                            </span>
                                          ) : (
                                            <img
                                              src={closeIcon}
                                              className="w-3 h-3"
                                              alt="delete"
                                            />
                                          )}
                                        </button>
                                      )}
                                    </div>
                                  </div>

                                  {/* 새 이미지 표시 배지 */}
                                  {!isExisting && !isDeleted && (
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
                        <img
                          src={imageIcon}
                          className="w-12 h-12 text-gray-500 mx-auto mb-3"
                          alt="image"
                        />
                        <p className="text-gray-400 text-sm">
                          등록된 증빙자료가 없습니다.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* 새 증빙자료 업로드 섹션 */}
                  {canChange && (
                    <div>
                      <label className="flex text-sm font-semibold text-gray-200 mb-4 items-center gap-2">
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
                                  <img
                                    src={bannedIcon}
                                    className="w-8 h-8 text-gray-500"
                                    alt="banned"
                                  />
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
                                  onChange={(e) =>
                                    handleFileSelect(e.target.files)
                                  }
                                />
                                <label
                                  htmlFor="files"
                                  className="cursor-pointer flex flex-col items-center">
                                  <div className="w-16 h-16 rounded-full bg-[var(--color-thick-grass)]/20 flex items-center justify-center mb-4 border border-[var(--color-grass)]/30">
                                    <img
                                      src={uploadIcon}
                                      className="w-8 h-8 text-[var(--color-grass)]"
                                      alt="upload"
                                    />
                                  </div>
                                  <span className="text-gray-200 font-medium mb-1">
                                    클릭하여 파일을 선택하거나 드래그하여 업로드
                                  </span>
                                  <span className="text-xs text-gray-400">
                                    JPG, JPEG, PNG (최대 1MB) • 최대{" "}
                                    {remainingSlots}개 추가 가능
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
                          <div className="text-sm text-red-400">
                            <div className="flex items-center gap-2 mb-2">
                              <img
                                src={warningIcon}
                                className="w-4 h-4"
                                alt="warning"
                              />
                              <span className="font-medium">이미지 오류</span>
                            </div>
                            {Array.isArray(errors.images) ? (
                              <ul className="space-y-1 pl-6">
                                {errors.images.map((imageError, index) => (
                                  <li key={index} className="text-xs">
                                    <span className="font-medium">
                                      이미지 {index + 1}:
                                    </span>{" "}
                                    {imageError?.url?.message ||
                                      "알 수 없는 오류"}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-xs pl-6">
                                {errors.images.message ||
                                  "이미지 관련 오류가 발생했습니다."}
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* 폼 버튼 */}
                  <div className="flex justify-end space-x-3 pt-6 border-t border-gray-700">
                    <button
                      type="button"
                      onClick={toggleModal}
                      className="px-5 py-2.5 text-sm font-medium text-gray-300 bg-gray-700 border border-gray-600 rounded-lg hover:bg-gray-600 hover:text-gray-200 transition-all duration-200">
                      {canChange ? "취소" : "닫기"}
                    </button>
                    {canChange && (
                      <button
                        type="submit"
                        disabled={totalImageCount === 0}
                        className="px-5 py-2.5 text-sm font-medium text-gray-900 bg-grass border border-transparent rounded-lg hover:bg-[var(--color-thick-grass)] transition-all duration-200 shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                        <img src={checkIcon} className="w-4 h-4" alt="check" />
                        저장 ({totalImageCount}개 활성 이미지)
                      </button>
                    )}
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
                          <img
                            src={closeIcon}
                            className="w-6 h-6"
                            alt="close"
                          />
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
      )}
      {/* 모달 사용 */}
    </div>
  );
};

export default StatEvidenceImgFormPanel;
