type TeamNameRepeatProviderProps = {
  getRepeatCheck: (teamName: string) => Promise<number | undefined>;
  children: React.ReactNode;
};
