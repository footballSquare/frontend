import React from "react";

const useStatFormSubmit = (props: UseStatFormSubmitProps) => {
  const { methods, onSubmit, onModalClose, matchIdx = 0 } = props;
  const backupRef = React.useRef<StatsEvidenceFormValues | null>(null);

  const handleFormSubmit = async (data: StatsEvidenceFormValues) => {
    // 데이터 무결성 검사
    if (!data.images || !Array.isArray(data.images)) {
      return;
    }

    // File 객체는 structuredClone으로 복사할 수 없으므로 별도 처리
    const backupData = {
      images: data.images.map((img) => ({
        ...img,
        file: img.file, // File 객체는 참조 유지
      })),
    };
    backupRef.current = backupData;

    // 삭제되지 않은 기존 이미지 URL만 포함 (타입 안전성 강화)
    const existingUrls = data.images
      .filter(
        (img) =>
          img &&
          typeof img === "object" &&
          img.type === "existing" &&
          !img.deleted &&
          img.url &&
          typeof img.url === "string"
      )
      .map((img) => img.url!)
      .filter(Boolean);

    // 삭제되지 않은 새로 업로드된 File 객체만 골라내기
    const newFiles = data.images
      .filter((img) => {
        const isValid =
          img &&
          typeof img === "object" &&
          img.type === "new" &&
          !img.deleted &&
          img.file;

        return isValid;
      })
      .map((img) => img.file)
      .filter((f): f is File => Boolean(f));

    const finalData: FinalData = {
      matchIdx,
      url: existingUrls,
      file: newFiles,
    };

    onModalClose();

    const finalImages = [
      ...finalData.url.map((url, index) => ({
        id: `existing-${index}`,
        url,
        type: "existing" as const,
        deleted: false,
        file: undefined,
      })),
    ];
    methods.setValue("images", finalImages);

    const result = await onSubmit(finalData);

    if (result === 200) {
      // 백업도 정리된 상태로 업데이트
      backupRef.current = {
        images: finalImages.map((img) => ({
          ...img,
          file: undefined,
        })),
      };
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
