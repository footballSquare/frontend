import { ModalState, ModalAction } from "./type";

export const modalReducer = (
  state: ModalState,
  action: ModalAction
): ModalState => {
  switch (action.type) {
    case "OPEN_DETAIL":
      return { detail: true, manage: false };
    case "OPEN_MANAGE":
      return { detail: false, manage: true };
    case "CLOSE_ALL":
      return { detail: false, manage: false };
    default:
      return state;
  }
};
