import { Controller } from "react-hook-form";
import useGetBoardDetailHandler from "./model/useGetBoardDetailHandler";
import useHookForm from "./model/useHookForm";
import { useNavigate } from "react-router-dom";
import usePostBoard from "../../3_Entity/Board/usePostBoard";
import usePutBoard from "../../3_Entity/Board/usePutBoard";
import uploadIcon from "../../4_Shared/assets/svg/upload.svg";
import { CATEGORY_STRING } from "./constant/constant";

const PostEdit = () => {
  const navigate = useNavigate();
  const {
    boardDetail,
    isNew,
    postId,
    categoryIndex = 0,
  } = useGetBoardDetailHandler();

  const [form, preview] = useHookForm(boardDetail);

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = form;

  const [postBoard] = usePostBoard();
  const [putBoard] = usePutBoard(postId!);

  const onSubmit = (data: PostEditFormFields) => {
    if (isNew) {
      postBoard(data, categoryIndex);
    } else {
      putBoard(data);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-8 mb-16 space-y-12 text-gray-100">
      <h1 className="text-3xl font-semibold mb-6 text-gray-100">
        {isNew
          ? `${CATEGORY_STRING[categoryIndex]} 게시글 작성`
          : `${CATEGORY_STRING[boardDetail.board_category_idx]} 게시글 수정`}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-2">
          <label
            htmlFor="board_list_title"
            className="block text-sm font-medium text-gray-300">
            제목
          </label>
          <input
            id="board_list_title"
            {...register("board_list_title")}
            className="bg-[#1b1f2e] border border-[#262b40] rounded p-2.5 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-200"
            placeholder="제목을 입력하세요 (50자 이하)"
          />
          {errors.board_list_title && (
            <p className="text-red-400 text-sm">
              {errors.board_list_title.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="board_list_content"
            className="block text-sm font-medium text-gray-300">
            내용
          </label>
          <textarea
            id="board_list_content"
            {...register("board_list_content")}
            className="bg-[#1b1f2e] border border-[#262b40] rounded p-2.5 w-full h-72 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-200"
            placeholder="내용을 입력하세요 (6000자 이하)"
          />
          {errors.board_list_content && (
            <p className="text-red-400 text-sm">
              {errors.board_list_content.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            이미지
          </label>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col w-full h-28 border-2 border-dashed border-[#262b40] rounded cursor-pointer hover:border-blue-500 transition-all bg-[#1b1f2e]">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <img src={uploadIcon} className="w-[40px] h-[40px]" />
                <p className="mb-2 text-sm text-gray-400">
                  <span className="font-medium">클릭하여 이미지 업로드</span>
                </p>
                <p className="text-xs text-gray-400">
                  PNG, JPG, GIF (최대 3MB)
                </p>
              </div>
              <Controller
                name="board_list_img"
                control={control}
                render={({ field }) => (
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => field.onChange(e.target.files)}
                  />
                )}
              />
            </label>
          </div>
          {errors.board_list_img && (
            <p className="text-red-400 text-sm">
              {errors.board_list_img.message as string}
            </p>
          )}
        </div>

        {preview && (
          <div className="mt-4 p-2 bg-[#1b1f2e] border border-[#262b40] rounded">
            <img src={preview} className="max-h-64 mx-auto rounded" />
          </div>
        )}

        <div className="flex space-x-3 pt-4">
          <button
            type="submit"
            className="px-4 py-1.5 text-sm font-medium text-[#2f80ed] border border-[#2f80ed] hover:bg-[#2f80ed] hover:text-white rounded transition-colors">
            {isNew ? "작성 완료" : "수정 완료"}
          </button>
          <button
            type="button"
            className="px-4 py-1.5 text-sm font-medium text-[#c9ced8] border border-[#2a2e3d] hover:bg-[#242834] rounded transition-colors"
            onClick={() => navigate(-1)}>
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostEdit;
