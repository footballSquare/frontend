type StatInputProps = {
  register: UseFormRegister<{
    evidence: string;
    goals: number;
    assists: number;
    passAccuracy: number;
    tackleAccuracy: number;
    possession: number;
    standingTackles: number;
    slidingTackles: number;
    interceptions: number;
    saves: number;
    saveSuccessRate: number;
  }>;
  registerType:
    | "evidence"
    | "goals"
    | "assists"
    | "passAccuracy"
    | "tackleAccuracy"
    | "possession"
    | "standingTackles"
    | "slidingTackles"
    | "interceptions"
    | "saves"
    | "saveSuccessRate";
  errors: FieldErrors<{
    evidence: string;
    goals: number;
    assists: number;
    passAccuracy: number;
    tackleAccuracy: number;
    possession: number;
    standingTackles: number;
    slidingTackles: number;
    interceptions: number;
    saves: number;
    saveSuccessRate: number;
  }>;
  text: string;
  type: string;
  isMatchEnd: boolean;
};
