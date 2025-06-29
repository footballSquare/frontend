import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { postEditSchema } from "../../../4_Shared/hookForm/PostEditInput/schema";
import type { UseFormReturn } from "react-hook-form";

const usePostEditForm = (
  boadDetail: BoardDetails
): [UseFormReturn<PostEditFormFields>, string | undefined] => {
  const [preview, setPreview] = React.useState<string>();

  const { reset, watch, ...rest } = useForm<PostEditFormFields>({
    resolver: yupResolver(postEditSchema),
    defaultValues: {
      board_list_title: "",
      board_list_content: "",
    },
  });

  const form = { reset, watch, ...rest };
  // watch 결과가 File | undefined 로 들어오도록 Controller에서 이미 변환했으므로
  const imageFile = watch("board_list_img") as File | undefined;

  // 초기 데이터 설정
  React.useEffect(() => {
    reset({
      board_list_title: boadDetail?.board_list_title,
      board_list_content: boadDetail?.board_list_content,
    });
    setPreview(boadDetail?.board_list_img);
  }, [boadDetail]);

  // 초기 이미지 설정
  React.useEffect(() => {
    if (!imageFile) return setPreview(undefined);
    const url = URL.createObjectURL(imageFile);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  return [form, preview];
};
export default usePostEditForm;
