type UseStatFormSubmitProps = {
  methods: UseFormReturn<StatsEvidenceFormValues>;
  onSubmit: (data: FinalData) => Promise<number | undefined>;
  onModalClose: () => void;
  matchIdx?: number;
};
