export const RESULT_STATE = {
  AVAILABLE: "AVAILABLE",
  UNAVAILABLE: "UNAVAILABLE",
  PENDING: null,
};

export type ResultStateType = (typeof RESULT_STATE)[keyof typeof RESULT_STATE];
