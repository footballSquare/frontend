type UseStatFormSubmitProps = {
  onSubmit: (data: FinalData) => Promise<number | undefined>;
  onModalClose: () => void;
  matchIdx?: number;
  restoreFromBackup: () => void;
};
