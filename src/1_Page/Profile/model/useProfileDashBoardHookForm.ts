import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { profileDashBoardInputSchema } from "../../../4_Shared/hookForm/ProfileDashBoardInput/schema";

const useProfileDashBoardHookform = (
  props: UseProfileDashBoardHookformProps
): UseProfileDashBoardHookformReturn => {
  const { userInfo: initUserInfo, toggleIsModifyMode } = props;
  const form = useForm<UsePutUserInfoProps>({
    resolver: yupResolver(profileDashBoardInputSchema),
    mode: "onChange",
  });
  const { reset, getValues } = form;
  const inputBackupDataRef = React.useRef<UserInfoForm>({} as UserInfoForm);

  React.useEffect(() => {
    reset({
      nickname: initUserInfo.nickname,
      common_status_idx: initUserInfo.common_status_idx,
      platform: initUserInfo.platform,
      discord_tag: initUserInfo.discord_tag,
      message: initUserInfo.message,
      match_position_idx: initUserInfo.match_position_idx,
    });
  }, [initUserInfo, reset]); // 초기값 설정

  const handleEdit = () => {
    inputBackupDataRef.current = getValues();
    toggleIsModifyMode();
  };

  const handleCancel = () => {
    toggleIsModifyMode();
    reset(inputBackupDataRef.current);
  };

  const handleImageChange = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        reset((prev) => ({
          ...prev,
          profile_image: imageUrl,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      reset((prev) => ({
        ...prev,
        profile_image: null, // 이미지 제거 시 null로 설정
      }));
    }
  };

  return {
    form,
    inputBackupDataRef,
    handleEdit,
    handleCancel,
    handleImageChange,
  };
};
export default useProfileDashBoardHookform;
