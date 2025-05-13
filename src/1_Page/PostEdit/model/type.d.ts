type UseHookFormProps = {
  boadDetail: BoardDetails;
};

type UseGetBoardDetailHandlerReturn = {
  boardDetail: BoardDetails;
  isNew: boolean;
  postId: number;
  categoryIndex: number | undefined;
};
