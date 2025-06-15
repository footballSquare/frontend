import React from "react";

const useStatFormSubmit = ({
  methods,
  onSubmit,
  onModalClose,
  matchIdx = 0,
}: UseStatFormSubmitProps) => {
  const backupRef = React.useRef<StatsEvidenceFormValues | null>(null);

  const handleFormSubmit = async (data: StatsEvidenceFormValues) => {
    // 제출 전 백업 생성
    backupRef.current = structuredClone(data);

    // 삭제되지 않은 기존 이미지 URL만 포함
    const existingUrls = data.images
      .filter((img) => img.type === "existing" && !img.deleted && img.url)
      .map((img) => img.url!)
      .filter(Boolean);

    // 삭제되지 않은 새로 업로드된 File 객체만 골라내기
    const newFiles = data.images
      .filter((img) => img.type === "new" && !img.deleted)
      .map((img) => img.file)
      .filter((f): f is File => Boolean(f));

    const finalData: FinalData = {
      matchIdx,
      urls: existingUrls,
      files: newFiles,
    };

    onModalClose();

    const result = await onSubmit?.(finalData);

    if (result === 200) {
      // 성공 시: 백업을 현재 상태로 업데이트하고 기존 이미지들을 existing 타입으로 변경
      const activeImages = data.images
        .filter((img) => !img.deleted)
        .map((img) => ({
          ...img,
          type: "existing" as const,
          file: undefined, // 파일 참조 제거
        }));

      methods.setValue("images", activeImages);
      backupRef.current = structuredClone({ images: activeImages });

      // 삭제된 이미지들의 blob URL 메모리 해제
      data.images
        .filter((img) => img.deleted && img.url?.startsWith("blob:"))
        .forEach((img) => {
          if (img.url) {
            URL.revokeObjectURL(img.url);
          }
        });
    } else {
      // 실패 시: 백업으로 복원
      if (backupRef.current) {
        methods.reset(backupRef.current);
      }
    }
  };

  // 백업 설정 함수 (외부에서 백업을 수동으로 설정할 때 사용)
  const setBackup = (data: StatsEvidenceFormValues) => {
    backupRef.current = structuredClone(data);
  };

  // 백업으로 복원하는 함수
  const restoreFromBackup = () => {
    if (backupRef.current) {
      methods.reset(backupRef.current);
    }
  };

  return {
    handleFormSubmit,
    setBackup,
    restoreFromBackup,
    hasBackup: () => backupRef.current !== null,
  };
};

export default useStatFormSubmit;
