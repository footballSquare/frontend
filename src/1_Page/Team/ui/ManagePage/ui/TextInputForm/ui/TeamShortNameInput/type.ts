import {
  UseFormRegister,
  FieldErrors,
  UseFormGetValues,
} from "react-hook-form";

import { TeamInfoInput } from "../../type";

export type InputFieldProps = {
  isRepeatCheckRef: React.MutableRefObject<boolean>;
  register: UseFormRegister<TeamInfoInput>;
  getValues: UseFormGetValues<TeamInfoInput>;
  errors: FieldErrors<TeamInfoInput>;
  modifyMode: boolean;
};
