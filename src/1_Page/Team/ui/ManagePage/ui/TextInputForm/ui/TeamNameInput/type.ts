import { UseFormRegister, FieldErrors } from "react-hook-form";

import { TeamInfoInput } from "../../type";

export type InputFieldProps = {
  register: UseFormRegister<TeamInfoInput>;
  errors: FieldErrors<TeamInfoInput>;
  modifyMode: boolean;
};
