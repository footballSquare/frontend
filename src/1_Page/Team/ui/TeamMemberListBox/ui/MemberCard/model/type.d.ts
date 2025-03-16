export type ModalState = {
  detail: boolean;
  manage: boolean;
};

export type ModalAction =
  | { type: "OPEN_DETAIL" }
  | { type: "OPEN_MANAGE" }
  | { type: "CLOSE_ALL" };
