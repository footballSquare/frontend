import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { schema } from "../lib/schema";
import type { UseFormReturn } from "react-hook-form";

const useHookForm = (
  boadDetail: BoardDetails
): [UseFormReturn<PostEditFormFields>, string | undefined] => {
  const [preview, setPreview] = React.useState<string>();

  const { reset, watch, ...rest } = useForm<PostEditFormFields>({
    resolver: yupResolver(schema),
    defaultValues: {
      category: undefined,
      board_list_title: "",
      board_list_content: "",
    },
  });

  const form = { reset, watch, ...rest };
  const imageFile = watch("board_list_img")?.[0];

  React.useEffect(() => {
    reset({
      category: boadDetail?.board_category_idx,
      board_list_title: boadDetail?.board_list_title,
      board_list_content: boadDetail?.board_list_content,
    });
    setPreview(boadDetail?.board_list_img);
  }, [boadDetail]);

  React.useEffect(() => {
    if (!imageFile) return setPreview(undefined);
    const url = URL.createObjectURL(imageFile);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  return [form, preview];
};
export default useHookForm;
