import { ExtendedMatchFormData } from "../type";
import { isPastTimeValidation } from "../../../../../../../4_Shared/util/inputValidator";
import { UseFormSetError } from "react-hook-form";

const inputErrorHandler = (
  setError: UseFormSetError<ExtendedMatchFormData>,
  match_match_start_date: string,
  match_match_start_hour: string,
  match_match_start_min: string
): boolean => {
  const match_match_start_time = `${match_match_start_hour}:${match_match_start_min}`;

  // 유효성 검사
  const validationError = isPastTimeValidation(
    match_match_start_date
      ? { key: "match_match_start_date", value: match_match_start_date }
      : undefined,
    match_match_start_time
      ? { key: "match_match_start_time", value: match_match_start_time }
      : undefined
  );

  if (validationError) {
    setError(validationError.field as keyof ExtendedMatchFormData, {
      message: validationError.message,
    });
    return true; // 에러 발생
  }

  return false; // 에러 없음
};

export default inputErrorHandler;
