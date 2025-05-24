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
    reset(convertToUserInfoForm(initUserInfo));
  }, [initUserInfo]); // 초기값 설정

  return {
    form,
    watchNickname: nickname,
    watchMatchPositionIdx: matchPositionIdx,
  };
};
export default useProfileDashBoardHookform;

const convertToUserInfoForm = (userInfo: UserInfo): UserInfoForm => {
  return {
    nickname: userInfo.nickname,
    common_status_idx: userInfo.common_status_idx,
    platform: userInfo.platform,
    discord_tag: userInfo.discord_tag,
    message: userInfo.message,
    match_position_idx: userInfo.match_position_idx,
  };
};
