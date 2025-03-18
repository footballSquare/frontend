export type AutoMatchForm = {
  autoMatch: number;
  matchAttribute: number;
  gameType: string;
  startTime: string;
  duration: string;
  participationMode: number;
  formation: number;
};

export type AutoMatchModalProps = {
  onClose: () => void;
};
