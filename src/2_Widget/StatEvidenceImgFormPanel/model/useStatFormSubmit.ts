const useStatFormSubmit = (props: UseStatFormSubmitProps) => {
  const { onSubmit, onModalClose, matchIdx = 0, restoreFromBackup } = props;

  const handleFormSubmit = async (data: StatsEvidenceFormValues) => {
    // 데이터 무결성 검사
    if (!data.images || !Array.isArray(data.images)) {
      return;
    }

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

    onModalClose?.();

    const result = await onSubmit(finalData);

    if (result === 200) {
      // 백업도 정리된 상태로 업데이트
      // deleted된 이미지들의 blob URL 메모리 해제
      data.images
        .filter((img) => img.deleted && img.url?.startsWith("blob:"))
        .forEach((img) => {
          if (img.url) {
            URL.revokeObjectURL(img.url);
          }
        });
    } else {
      alert("팀 증빙자료 업로드에 실패했습니다.");
      restoreFromBackup();
    }
  };

  return {
    handleFormSubmit,
  };
};

export default useStatFormSubmit;
