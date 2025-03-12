export type FormValues = {
  autoMatch: number;
  matchAttribute: number;
  gameType: number;
  startTime: string;
  duration: string;
  participationMode: number;
  formation: number;
};

export type AutoMatchModalProps = {
  onClose: () => void;
};
