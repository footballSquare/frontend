import { UseFormRegister } from "react-hook-form";
import { TeamInfoInput } from "../../type";
import { RefObject } from "react";

export type ImageInputProps = {
  cancleRef: RefObject<boolean>;
  name: keyof TeamInfoInput;
  imgSrc: string;
  label: string;
  register: UseFormRegister<TeamInfoInput>;
  modifyMode: boolean;
  errorsMessage?: string;
};
