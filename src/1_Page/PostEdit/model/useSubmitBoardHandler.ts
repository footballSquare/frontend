import usePostBoard from "../../../3_Entity/Board/usePostBoard";
import usePutBoard from "../../../3_Entity/Board/usePutBoard";

const useSubmitBoardHandler = (
  isNew: boolean,
  postId?: number
): UseSubmitBoardHandlerReturn => {
  const [postBoard] = usePostBoard();
  const [putBoard] = usePutBoard(postId!);

  return [
    (data: PostEditFormFields, category: number) => {
      // 모든 필드를 FormData 로 직렬화
      const formData = new FormData();
      formData.append("board_list_title", data.board_list_title);
      formData.append("board_list_content", data.board_list_content);
      if (data.file) {
        formData.append("file", data.file);
      }
      console.log(data);

      if (isNew) {
        postBoard({ formData, category });
      } else {
        putBoard({ formData });
      }
    },
  ];
};

export default useSubmitBoardHandler;
