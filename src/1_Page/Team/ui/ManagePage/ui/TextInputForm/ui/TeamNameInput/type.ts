import { UseFormRegister, FieldErrors } from "react-hook-form";

import { TeamInfoInput } from "../../type";

type TeamListName = Pick<TeamInfoInput, "team_list_name">;

export type InputFieldProps = {
  label: string;
  name: keyof TeamListName;
  register: UseFormRegister<TeamInfoInput>;
  errors: FieldErrors<TeamListName>;
  modifyMode: boolean;
  placeholder?: string;
  defaultValue?: number | string;
};
