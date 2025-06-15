type StatEvidenceImgFormPanelProps = {
  defaultValues?: {
    urls: string[];
  };
  matchIdx?: number;
  onSubmit?: (data: FinalData) => void;
  onClose?: () => void;
};

type FinalData = {
  urls: string[];
  files: File[];
  previewImages?: string[];
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
