import { getTextColorFromBackground } from "../../../../../../../../4_Shared/lib/colorChecker";
import useTeamInfoContext from "../../../../../../../../4_Shared/model/useTeamInfoContext";
import useTeamImageInputForm from "./model/useTeamImageInputForm";

const TeamImageInput = (props: TeamImageInputProps) => {
  const {
    label = "Team Emblem",
    placeholderText,
    width = "w-32",
    height = "h-32",
    initialSrc,
    putImage,
    handleChangePreview,
  } = props;

  const { teamListColor } = useTeamInfoContext();

  const {
    method,
    preview,
    editing,
    onSubmitHandler,
    handleFileChange,
    cancelEdit,
    inputRef,
    openFileDialog,
  } = useTeamImageInputForm({ initialSrc, putImage, handleChangePreview });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = method;

  const imgClass = `${width} ${height} object-cover rounded-md`;

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-2">
      <label style={{ color: teamListColor }} className="text-sm font-medium ">
        {label}
      </label>

      <div className="relative p-4 rounded-md shadow-md bg-gray-800/40">
        {preview ? (
          <img src={preview} alt="preview" className={imgClass} />
        ) : (
          <div
            className={`${imgClass} flex items-center justify-center bg-gray-700 text-gray-400`}>
            {placeholderText}
          </div>
        )}

        {editing ? (
          <div className="absolute bottom-4 right-4 flex gap-2">
            <button
              type="button"
              onClick={cancelEdit}
              className="py-2 px-5 rounded-md bg-red-500 hover:bg-red-600 text-white text-sm">
              취소
            </button>
            <button
              type="submit"
              style={{
                backgroundColor: teamListColor,
                color: getTextColorFromBackground(teamListColor),
              }}
              className="py-2 px-5 rounded-md  text-white text-sm">
              저장
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={openFileDialog}
            style={{
              backgroundColor: teamListColor,
              color: getTextColorFromBackground(teamListColor),
            }}
            className="absolute bottom-4 right-4 py-2 px-5 rounded-md text-white text-sm">
            수정하기
          </button>
        )}

        <input
          {...register("file", { required: true })}
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {errors.file && (
        <p className="text-xs text-red-500">이미지를 선택해주세요.</p>
      )}
    </form>
  );
};

export default TeamImageInput;
