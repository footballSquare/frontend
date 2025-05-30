type AutoMatchModalInput = {
  registerType:
    | "autoMatch"
    | "matchAttribute"
    | "gameType"
    | "startTime"
    | "duration"
    | "participationMode"
    | "formation";
};

type AutoMatchFormValues = {
  autoMatch: boolean;
  matchAttribute: number;
  gameType: string;
  startTime: string;
  duration: string;
  participationMode: number;
  formation: number;
};
