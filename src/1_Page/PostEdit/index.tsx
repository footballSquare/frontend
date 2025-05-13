import { Controller } from "react-hook-form";
import useGetBoardDetailHandler from "./model/useGetBoardDetailHandler";
import useHookForm from "./model/useHookForm";
import { useNavigate } from "react-router-dom";
import { convertToFormData } from "./util/convert";

const PostEdit = () => {
  const { boadDetail, isEdit, postId } = useGetBoardDetailHandler();
  const navigate = useNavigate();

  const [form, preview] = useHookForm(boadDetail);
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = form;

  const onSubmit = (data: PostEditFormFields) => {
    const formData = convertToFormData(data);
    if (isEdit && postId) {
      // TODO: PUT /posts/${postId} (게시글 수정)
    } else {
      // TODO: POST /posts (게시글 생성)
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-8 mb-16 space-y-12 text-[#e1e4ea]">
      <h1 className="text-3xl font-semibold mb-6 text-gray-100">
        {isEdit ? "게시글 수정" : "게시글 작성"}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-2">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-300">
            말머리
          </label>
          <select
            id="category"
            {...register("category")}
            className="bg-[#1b1f2e] border border-[#262b40] rounded p-2.5 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-200">
            <option value="">말머리 선택</option>
            <option value="1">공지</option>
            <option value="2">자유</option>
          </select>
          {errors.category && (
            <p className="text-red-400 text-sm">{errors.category.message}</p>
          )}
        </div>

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
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
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
            <img
              src={preview}
              alt="미리보기"
              className="max-h-64 mx-auto rounded"
            />
          </div>
        )}

        <div className="flex space-x-3 pt-4">
          <button
            type="submit"
            className="px-4 py-1.5 text-sm font-medium text-[#2f80ed] border border-[#2f80ed] hover:bg-[#2f80ed] hover:text-white rounded transition-colors">
            {isEdit ? "수정 완료" : "작성 완료"}
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
