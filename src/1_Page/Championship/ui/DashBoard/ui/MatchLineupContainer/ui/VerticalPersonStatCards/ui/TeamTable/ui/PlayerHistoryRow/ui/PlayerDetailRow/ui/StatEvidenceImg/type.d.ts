type Props = {
  defaultValues: Partial<StatsEvidenceFormValues>;
};

type StatEvidenceImgFormPanelProps = {
  defaultValues?: {
    urls: string[];
  };
  matchIdx: number;
};

type StatsEvidenceFormValues = {
  images: {
    id: string;
    url: string;
    type: "existing" | "new";
    file?: File;
  }[];
};

type FinalData = {
  urls: string[];
  files: File[];
};
