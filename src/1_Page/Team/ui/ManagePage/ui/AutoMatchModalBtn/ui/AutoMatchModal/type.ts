export type FormValues = {
  autoMatch: boolean;
  matchType: string;
  gameType: string;
  startTime: string;
  duration: string;
  participationMode: string;
  formation: string;
};

export type AutoMatchModalProps = {
  onClose: () => void;
};
