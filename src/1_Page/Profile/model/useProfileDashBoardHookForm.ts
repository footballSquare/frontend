import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { profileDashBoardInputSchema } from "../../../4_Shared/hookForm/ProfileDashBoardInput/schema";

const useProfileDashBoardHookform = (
  initUserInfo: UserInfo
): UseProfileDashBoardHookformReturn => {
  const form = useForm<UserInfoForm>({
    resolver: yupResolver(profileDashBoardInputSchema),
    mode: "onChange",
  });
  const { reset, watch } = form;

  const nickname = watch("nickname");
  const matchPositionIdx = watch("match_position_idx");

  React.useEffect(() => {
    reset({
      nickname: initUserInfo.nickname,
      common_status_idx: initUserInfo.common_status_idx,
      platform: initUserInfo.platform,
      discord_tag: initUserInfo.discord_tag,
      message: initUserInfo.message,
      match_position_idx: initUserInfo.match_position_idx,
    });
  }, [initUserInfo]); // 초기값 설정

  return {
    form,
    watchNickname: nickname,
    watchMatchPositionIdx: matchPositionIdx,
  };
};
export default useProfileDashBoardHookform;
