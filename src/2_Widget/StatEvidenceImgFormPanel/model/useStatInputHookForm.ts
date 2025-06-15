import { yupResolver } from "@hookform/resolvers/yup";
import { useFieldArray, useForm } from "react-hook-form";
import { statsEvidenceSchema } from "../schema";
import React from "react";

const useStatInputHookForm = (defaultValues?: string[]) => {
  // 디버깅을 위한 로그 추가
  console.log("useStatInputHookForm - defaultValues:", defaultValues);

  const methods = useForm<StatsEvidenceFormValues>({
    resolver: yupResolver(statsEvidenceSchema),
    defaultValues: {
      images: (defaultValues || [])
        .flat() // 중첩 배열을 평면화
        .filter(
          (url): url is string => typeof url === "string" && url.length > 0
        )
        .map((url: string, index: number) => ({
          id: `existing-${index}`,
          url,
          type: "existing" as const,
          deleted: false,
        })),
    },
  });
  const { reset, control } = methods;

  React.useEffect(() => {
    const processedImages = (defaultValues || [])
      .flat() // 중첩 배열을 평면화
      .filter((url): url is string => typeof url === "string" && url.length > 0)
      .map((url: string, index: number) => ({
        id: `existing-${index}`,
        url,
        type: "existing" as const,
        deleted: false,
      }));

    reset({
      images: processedImages,
    });
  }, [defaultValues, reset]);

  const { fields, append } = useFieldArray({
    control,
    name: "images",
  });

  // 이미지 삭제/복원 토글 핸들러
  const handleToggleDeleteImage = (index: number) => {
    const currentImages = methods.getValues("images");
    if (!currentImages || index >= currentImages.length || index < 0) {
      console.warn("Invalid image index:", index);
      return;
    }

    const updatedImages = [...currentImages];
    const currentImage = updatedImages[index];

    if (currentImage) {
      updatedImages[index] = {
        ...currentImage,
        deleted: !currentImage.deleted,
      };
      methods.setValue("images", updatedImages);
    }
  };

  // 파일 선택 핸들러
  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const newFilesCount = files.length;
    // 현재 활성 이미지 개수 (삭제되지 않은 이미지만)
    const currentImages = methods.getValues("images");
    const activeImageCount = currentImages.filter((img) => !img.deleted).length;
    const newTotalCount = activeImageCount + newFilesCount;

    if (newTotalCount > 5) {
      alert(
        `증빙자료는 총 최대 5개까지만 가능합니다. (현재 활성: ${activeImageCount}개, 추가하려는: ${newFilesCount}개)`
      );
      return;
    }

    Array.from(files).forEach((file: File, index: number) => {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          append({
            id: `new-${Date.now()}-${index}`,
            url: e.target.result as string,
            type: "new",
            file,
            deleted: false,
          });
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // watch, errors를 반환값에 포함시켜 index.tsx에서 바로 사용 가능하게 합니다.
  return {
    methods,
    fields,
    handleToggleDeleteImage,
    handleFileSelect,
  };
};

export default useStatInputHookForm;
