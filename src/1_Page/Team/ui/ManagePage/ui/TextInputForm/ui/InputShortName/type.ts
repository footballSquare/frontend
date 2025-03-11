import { UseFormRegister, FieldErrors } from "react-hook-form";

import { TeamInfoInput } from "../../type";
import { UseFormWatch } from "react-hook-form";

export type InputFieldProps = {
  register: UseFormRegister<TeamInfoInput>;
  watch: UseFormWatch<TeamInfoInput>;
  errors: FieldErrors<TeamInfoInput>;
  modifyMode: boolean;
};
