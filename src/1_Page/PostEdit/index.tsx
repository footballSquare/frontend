import usePostEditRoutingGuard from "./model/usePostEditRoutingGuard";
import usePostEditForm from "./model/usePostEditForm";
import { useNavigate } from "react-router-dom";
import { CATEGORY_STRING } from "./constant/constant";
import useGetBoardDetail from "../../3_Entity/Board/useGetBoardDetail";
import useValidatePostOwner from "./model/useValidatePostOwner";
import useSubmitBoardHandler from "./model/useSubmitBoardHandler";
import PostEditInput from "../../4_Shared/hookForm/PostEditInput";

const PostEdit = () => {
  const navigate = useNavigate();
  // 게시글 작성/수정 여부 및 게시글 ID를 가져옵니다.
  const { isNew, categoryIndex, postId } = usePostEditRoutingGuard();
  const [boardDetail] = useGetBoardDetail(postId);
  useValidatePostOwner(isNew, boardDetail);

  const [form, preview] = usePostEditForm(boardDetail);
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = form;

  const [submitBoard] = useSubmitBoardHandler(isNew, postId);

  return (
    <div className="w-full max-w-5xl mx-auto mt-8 mb-16 space-y-12 sm :px-8 px-4">
      <h1 className="text-3xl font-semibold mb-6 text-gray-100">
        {isNew
          ? `${CATEGORY_STRING[categoryIndex]} 게시글 작성`
          : `${CATEGORY_STRING[boardDetail.board_category_idx]} 게시글 수정`}
      </h1>

      <form
        onSubmit={handleSubmit((data) => submitBoard(data, categoryIndex))}
        className="space-y-5">
        <div className="space-y-2">
          <PostEditInput
            register={register}
            registerType={"title"}
            errors={errors}
          />
        </div>

        <PostEditInput
          register={register}
          registerType={"content"}
          errors={errors}
          control={control}
        />

        <div className="space-y-2">
          <PostEditInput
            register={register}
            registerType={"img"}
            errors={errors}
            control={control}
          />
        </div>

        {preview && (
          <div className="mt-4 p-2 bg-gray-800 border border-gray-700 rounded">
            <img src={preview} className="max-h-64 mx-auto rounded" />
          </div>
        )}

        <div className="flex space-x-3 pt-4">
          <button
            type="submit"
            className="px-4 py-1.5 text-sm font-medium text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white rounded transition-colors">
            {isNew ? "작성 완료" : "수정 완료"}
          </button>
          <button
            type="button"
            className="px-4 py-1.5 text-sm font-medium text-gray-400 border border-gray-600 hover:bg-gray-700 rounded transition-colors"
            onClick={() => navigate(-1)}>
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostEdit;
