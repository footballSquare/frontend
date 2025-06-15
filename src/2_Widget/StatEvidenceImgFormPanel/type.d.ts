type StatEvidenceImgFormPanelProps = {
  defaultValues: {
    urls: string[];
  };
  matchIdx: number;
  onSubmit: (data: FinalData) => Promise<number | undefined>;
};

type FinalData = {
  matchIdx: number;
  files: File[];
  urls: string[];
};

type StatsEvidenceFormValues = {
  images: {
    id: string;
    url?: string; // 삭제된 경우 optional
    type?: "existing" | "new"; // 삭제된 경우 optional
    file?: File;
    deleted?: boolean;
  }[];
};

type DefaultValues = {
  urls?: string[];
  match_match_idx?: number;
};
