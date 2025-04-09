import { fieldTabMap } from "../constant/tab";
import { FieldErrors } from "react-hook-form";

export const errorLocationDetector = (
  errors: FieldErrors<ChampionshipFormValues>
) => {
  const errorKeys = Object.keys(errors);
  if (errorKeys.length > 0) {
    const firstErrorKey = errorKeys[0]; // 애러 스택중 가장 첫번째
    const firstErrorTab =
      fieldTabMap[firstErrorKey as keyof ChampionshipFormValues];
    return firstErrorTab;
  }
};
