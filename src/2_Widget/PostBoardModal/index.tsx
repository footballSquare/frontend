import usePostBoardModalStore from "../../4_Shared/zustand/usePostBoardModalStore";
import close_icon from "../../4_Shared/assets/svg/closeBtn.svg";
import { useForm } from "react-hook-form";
import usePostCommunityBoard from "../../3_Entity/Community/usePostCommunityBoard";
import useCurrentCommunityInfo from "../../4_Shared/zustand/useCurrentCommunityInfoStore";
import { yupResolver } from "@hookform/resolvers/yup";
import postBoardInputSchema from "../../4_Shared/hookForm/PostBoardInput/schema";

const PostBoardModal = () => {
  const { category, togglePostBoardModal } = usePostBoardModalStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(postBoardInputSchema) });
  const [postCommunityBoard] = usePostCommunityBoard();
  const { communityIdx } = useCurrentCommunityInfo();

  return (
    <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
      {/* 레이어 */}
      <div
        className="absolute top-0 left-0 w-full h-full opacity-50 bg-gray"
        onClick={togglePostBoardModal}
      ></div>
      {/* 모달 */}
      <div className="flex flex-col relative w-[80%] h-[80%] bg-white gap-4 border border-gray p-4 overflow-auto">
        {/* 닫기 버튼*/}
        <div className="flex justify-end p-4">
          <button onClick={togglePostBoardModal}>
            <img src={close_icon} alt="close" />
          </button>
        </div>
        <form
          onSubmit={handleSubmit((data) => {
            if (category === 0) {
              postCommunityBoard({
                communityIdx,
                title: data.title,
                content: data.content,
                image: data.file,
              });
            }
          })} // TODO: submit 함수 작성
          className="flex flex-col gap-4 h-full"
        >
          <div>
            <input
              type="text"
              id="title"
              {...register("title")}
              className={`mt-1 block w-full h-full p-2 border ${
                errors.title ? "border-red-500" : "border-gray"
              } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="제목"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>
          <div className="h-full">
            <textarea
              id="content"
              {...register("content")}
              className={`mt-1 block w-full h-full p-2 border ${
                errors.content ? "border-red-500" : "border-gray"
              } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="내용"
            />
            {errors.content && (
              <p className="text-red-500 text-sm mt-1">
                {errors.content.message}
              </p>
            )}
          </div>
          <input
            id="image"
            type="file"
            accept="image/*"
            {...register("file")}
          />
          {errors.file && (
            <p className="text-red-500 text-sm mt-1">{errors.file.message}</p>
          )}
          <button type="submit">작성</button>
        </form>
      </div>
    </div>
  );
};

export default PostBoardModal;
