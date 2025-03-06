import { UseFormRegister } from "react-hook-form";
import { TeamInfoInput } from "../../type";
type FieldNames =
  | "team_list_name"
  | "team_list_short_name"
  | "team_list_color"
  | "team_list_emblem"
  | "team_list_banner"
  | "team_list_announcement";

export type ImageInputProps = {
  name: FieldNames;
  label: string;
  register: UseFormRegister<TeamInfoInput>;
  disabled: boolean;
  errorsMessage: string | undefined;
};
