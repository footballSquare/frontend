import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../../../../../../../../../4_Shared/lib/imgSchema";

const useTeamImageInputForm = (props: UseTeamImageInputProps) => {
  const { initialSrc, putImage, handleChangePreview } = props;
  const [preview, setPreview] = React.useState<string | null>(
    initialSrc ?? null
  );
  const [editing, setEditing] = React.useState(false);
  const backupRef = React.useRef<string | null>(initialSrc ?? null);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const method = useForm<ImageInputForm>({
    resolver: yupResolver(schema),
  });
  const { reset, setValue } = method;

  const onSubmitHandler = async (props: ImageInputForm) => {
    const { file } = props;
    const selected = file;
    if (!selected) return;
    const url = URL.createObjectURL(selected);
    // handleChangePreview : 메인 팀페이지의 이미지 설정
    handleChangePreview?.(url);
    setEditing(false);
    reset();
    if (inputRef.current) inputRef.current.value = ""; // ★ 추가
    const status = await putImage(selected);
    switch (status) {
      case 200:
        backupRef.current = preview;
        return;
      default:
        setPreview(backupRef.current);
        handleChangePreview?.(backupRef.current);
        break;
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    setValue("file", file, { shouldValidate: true });
    setEditing(true);
  };

  const cancelEdit = () => {
    setPreview(backupRef.current);
    setEditing(false);
    reset();
    if (inputRef.current) inputRef.current.value = ""; // ★ 추가
  };

  const openFileDialog = () => inputRef.current?.click();

  return {
    method,
    preview,
    editing,
    onSubmitHandler,
    handleFileChange,
    cancelEdit,
    inputRef,
    openFileDialog,
  };
};

export default useTeamImageInputForm;
