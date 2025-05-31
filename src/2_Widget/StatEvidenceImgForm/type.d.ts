type StatEvidenceImgFormProps = {
  defaultValues?: Partial<{
    urls: string[];
  }>;
  onSubmit: (data: FinalData) => void;
  onClose?: () => void;
};

type StatsEvidenceFormValues = {
  images: {
    id: string;
    url: string;
    type: "existing" | "new";
    file?: File;
  }[];
};

type DefaultValues = {
  urls?: string[];
  match_match_idx?: number;
};
