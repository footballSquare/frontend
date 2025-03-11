import { UseFormRegister, FieldErrors } from "react-hook-form";

import { TeamInfoInput } from "../../type";

export type InputFieldProps = {
  label: string;
  name: keyof TeamInfoInput;
  register: UseFormRegister<TeamInfoInput>;
  errors: FieldErrors<TeamInfoInput>;
  modifyMode: boolean;
  type?: "text" | "color" | "textarea";
  placeholder?: string;
  defaultValue?: number | string;
};
