import usePostBoard from "../../../3_Entity/Board/usePostBoard";
import usePutBoard from "../../../3_Entity/Board/usePutBoard";

const useSubmitBoardHandler = (
  isNew: boolean,
  postId?: number
): UseSubmitBoardHandlerReturn => {
  const [postBoard] = usePostBoard();
  const [putBoard] = usePutBoard(postId!);

  return [
    (data: PostEditFormFields, categoryIndex: number) => {
      if (isNew) {
        postBoard(data, categoryIndex);
      } else {
        putBoard(data);
      }
    },
  ];
};

export default useSubmitBoardHandler;
