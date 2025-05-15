type UseHookFormProps = {
  boadDetail: BoardDetails;
};

type UseGetBoardDetailHandlerReturn = {
  boardDetail: BoardDetails;
  isNew: boolean;
  postId: number;
  categoryIndex: number | undefined;
};
type UseWriteRouteTypeReturn = {
  isNew: boolean;
  isEdit: boolean;
  categoryIndex: number;
  postId: number;
};
