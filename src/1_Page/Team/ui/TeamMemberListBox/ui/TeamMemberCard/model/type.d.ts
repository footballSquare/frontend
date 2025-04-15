type ModalState = {
  detail: boolean;
  manage: boolean;
};

type ModalAction =
  | { type: "OPEN_DETAIL" }
  | { type: "OPEN_MANAGE" }
  | { type: "CLOSE_ALL" };
