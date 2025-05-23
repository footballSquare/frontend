import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import discord from "../../../../4_Shared/assets/svg/discord.svg";
import { schema } from "./lib/schema";
import { hasChanges } from "./util/validate";
import { convertToInfoForm } from "./util/convert";
// 상수
import { platform } from "../../../../4_Shared/constant/platform";
import { matchPosition } from "../../../../4_Shared/constant/matchPosition";
import { commonStatusIdx } from "../../../../4_Shared/constant/commonStatusIdx";
import usePutUserInfo from "../../../../3_Entity/Account/usePutUserInfo";
import useDeleteUser from "../../../../3_Entity/Account/useDeleteUser";
import {
  useLogout,
  useRemoveAllCookie,
} from "../../../../4_Shared/lib/useMyInfo";
import { getPositionColor } from "../../../../4_Shared/lib/getPositionColor";
import useManageModifyAndServerState from "./model/useManageModifyAndServerState";
import { useNavigate } from "react-router-dom";
import { getPlatformIcon } from "../../../../4_Shared/lib/getPlatformIcon";

const PlayerDashBoard = (props: PlayerDashBoardProps) => {
  const { is_mine, team_short_name, team_name, team_emblem } = props; // 뷸변값들
  const navigate = useNavigate();

  const {
    reset,
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    watch,
  } = useForm<UserInfoForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const userInfoForm = React.useMemo(() => convertToInfoForm(props), [props]);
  React.useEffect(() => {
    reset(userInfoForm);
  }, [userInfoForm]); // 초기값 설정
  const match_position_idx = watch("match_position_idx");
  const watchPlatform = watch("platform");
  const [putUserInfo, serverState] = usePutUserInfo();
  const [deleteUser] = useDeleteUser();
  const [removeAllCookie] = useRemoveAllCookie();
  const [logOut] = useLogout();

  const {
    inputBackupDataRef,
    modifyMode,
    handleModifyFalse,
    handleModifyTrue,
  } = useManageModifyAndServerState({ serverState, reset });

  const onSubmit: SubmitHandler<UserInfoForm> = (data) => {
    handleModifyFalse();
    if (!hasChanges(data, inputBackupDataRef.current)) return;
    putUserInfo(data);
  };

  return (
    <div className="w-full bg-gray-800 shadow-xl rounded-2xl overflow-hidden border-t border-gray-700 transform transition duration-300 hover:shadow-grass">
      {/* 헤더 부분 */}
      <div className="relative bg-gradient-to-br from-grass to-grass/80 p-6 text-white">
        <div className="absolute top-0 right-0 w-32 h-32 bg-grass opacity-20 rounded-bl-full"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-grass/50 opacity-20 rounded-tr-full"></div>

        <h2 className="text-grass font-semibold text-center text-sm tracking-wider">
          YOUR NOT ALONE
        </h2>
        <h1 className="text-2xl font-bold text-center mt-1 text-white">
          BEST PLAYER
        </h1>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* 상태 메시지 */}
          <div className="mb-6">
            <input
              {...register("message")}
              disabled={!modifyMode}
              className={`w-full p-3 text-sm text-center rounded-lg transition-all duration-200 ${
                modifyMode
                  ? "border border-grass bg-grass/20 text-grass shadow-sm"
                  : "bg-gradient-to-r from-gray-800 to-gray-700 text-gray-300 italic"
              }`}
              placeholder="상태 메시지 입력"
            />
            {errors.message && (
              <p className="text-red-500 text-xs mt-1 pl-2">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* 팀 & 플랫폼 */}
          <div className="mb-5 bg-gray-700 p-4 rounded-xl">
            <label className="text-xs font-semibold text-gray-300 uppercase mb-2 block border-b pb-1">
              {team_name ? "팀" : "팀구직상태"}
            </label>
            {team_name ? (
              <div className="flex items-center w-full p-2 text-sm gap-3 bg-transparent text-gray-300">
                {team_emblem && (
                  <div className="w-10 h-10  overflow-hidden border-2 border-grass shadow-md">
                    <img
                      className="w-full h-full object-cover"
                      src={team_emblem}
                      alt="Team Emblem"
                    />
                  </div>
                )}
                <p className="text-grass font-bold">{team_name}</p>
              </div>
            ) : (
              <select
                {...register("common_status_idx")}
                disabled={!modifyMode}
                className={`w-full p-3 text-sm rounded-lg ${
                  modifyMode
                    ? "border border-grass bg-grass/20 text-grass"
                    : "bg-gray-800 border border-gray-700 text-gray-300"
                }`}>
                {commonStatusIdx.slice(6, 9).map((commontStatusIdx, index) => (
                  <option key={index} value={6 + index}>
                    {commontStatusIdx}
                  </option>
                ))}
              </select>
            )}
            {errors.common_status_idx && (
              <p className="text-red-500 text-xs mt-1 pl-2">
                {errors.common_status_idx.message}
              </p>
            )}
          </div>

          <div className="space-y-5">
            {/* 닉네임 */}
            <div className="group transition-all duration-300">
              <label className="text-xs font-semibold text-gray-300 uppercase mb-1 block">
                Nickname
              </label>
              <div
                className={`flex items-center w-full p-3 text-sm rounded-lg transition-all duration-200 ${
                  modifyMode
                    ? "border border-grass bg-grass/20 text-grass shadow-sm"
                    : "bg-gray-800 border border-gray-700 shadow-sm hover:shadow group-hover:border-grass text-gray-300"
                }`}>
                {team_short_name && (
                  <p className="whitespace-nowrap text-grass font-bold mr-1">{`#${team_short_name} -`}</p>
                )}
                <input
                  {...register("nickname")}
                  disabled={!modifyMode}
                  className="w-full bg-transparent outline-none font-medium"
                  placeholder="Nickname"
                />
              </div>
              {errors.nickname && (
                <p className="text-red-500 text-xs mt-1 pl-2">
                  {errors.nickname.message}
                </p>
              )}
            </div>

            {/* 플랫폼 */}
            <div
              className={`flex items-center w-full text-sm rounded-lg transition-all duration-200 ${
                modifyMode
                  ? "border border-grass bg-grass/20 text-grass shadow-sm"
                  : "bg-gray-800 border border-gray-700 shadow-sm hover:shadow group-hover:border-grass text-gray-300"
              }`}>
              <div className="bg-gray-700 p-2 rounded-l-lg">
                <img
                  src={getPlatformIcon(watchPlatform)}
                  className="w-[30px] h-[30px] object-cover"
                />
              </div>
              <select
                {...register("platform")}
                disabled={!modifyMode}
                className="flex-1 pt-1 bg-transparent outline-none">
                {platform.map((plat, index) => (
                  <option key={index} value={plat?.toLowerCase()}>
                    {plat}
                  </option>
                ))}
              </select>
            </div>
            {errors.platform && (
              <p className="text-red-500 text-xs mt-1 pl-2">
                {errors.platform.message}
              </p>
            )}

            {/* 포지션 */}
            <div className="group transition-all duration-300">
              <label className="text-xs font-semibold text-gray-300 uppercase mb-1 block">
                Position
              </label>
              <div className="relative">
                <select
                  {...register("match_position_idx")}
                  disabled={!modifyMode}
                  style={{ color: getPositionColor(match_position_idx) }}
                  className={`w-full p-3 text-sm rounded-lg transition-all duration-200 ${
                    modifyMode
                      ? "border border-grass bg-grass/20 text-grass shadow-sm"
                      : "bg-gray-800 border border-gray-700 shadow-sm hover:shadow group-hover:border-grass text-gray-300"
                  }`}>
                  {matchPosition.map((position, idx) => (
                    <option
                      key={`match-position-${position}`}
                      value={idx}
                      style={{ color: getPositionColor(idx) }}>
                      {position}
                    </option>
                  ))}
                </select>
              </div>
              {errors.match_position_idx && (
                <p className="text-red-500 text-xs mt-1 pl-2">
                  {errors.match_position_idx.message}
                </p>
              )}
            </div>

            {/* Discord 태그 */}
            <div className="group transition-all duration-300">
              <label className="text-xs font-semibold text-gray-300 uppercase mb-1 block">
                Discord Tag
              </label>
              <div
                className={`flex items-center w-full rounded-lg transition-all duration-200 ${
                  modifyMode
                    ? "border border-grass bg-grass/20 text-grass shadow-sm"
                    : "bg-gray-800 border border-gray-700 shadow-sm hover:shadow group-hover:border-grass"
                }`}>
                <div className="bg-gray-700 p-2 rounded-l-lg">
                  <img
                    src={discord}
                    className="w-[30px] h-[30px] object-cover"
                  />
                </div>
                <input
                  {...register("discord_tag")}
                  disabled={!modifyMode}
                  className={`w-full p-3 bg-transparent outline-none text-sm 
                    ${modifyMode ? "text-grass" : "text-gray-300"}
                    `}
                  placeholder="Discord Tag"
                />
              </div>
              {errors.discord_tag && (
                <p className="text-red-500 text-xs mt-1 pl-2">
                  {errors.discord_tag.message}
                </p>
              )}
            </div>

            {/* 버튼 */}
            {is_mine &&
              (!modifyMode ? (
                <button
                  className="w-full py-3 text-sm rounded-lg font-bold mt-4 bg-grass text-white hover:bg-grass/80 transition-all shadow-md hover:shadow-lg"
                  onClick={(e) => {
                    e.preventDefault();
                    inputBackupDataRef.current = getValues();
                    handleModifyTrue();
                  }}>
                  수정하기
                </button>
              ) : (
                <div className="flex justify-between gap-3 mt-4">
                  <button
                    type="button"
                    className="w-1/2 py-2.5 border-2 border-red-500 text-red-500 rounded-lg text-sm font-bold hover:bg-red-500 hover:text-white transition-all shadow-sm"
                    onClick={() => {
                      handleModifyFalse();
                      reset(inputBackupDataRef.current);
                    }}>
                    취소
                  </button>
                  <button
                    type="submit"
                    className={`w-1/2 py-2.5 text-white rounded-lg text-sm font-bold transition-all shadow-md bg-grass hover:bg-grass/80`}>
                    저장
                  </button>
                </div>
              ))}
          </div>
        </form>

        {is_mine && !modifyMode && (
          <div className="flex w-full mt-4 gap-2">
            <button
              className="w-1/2 h-8 border-2 border-red-500 text-red-600 font-bold px-2 py-1 text-xs rounded-lg shadow-sm transition-all duration-200 hover:bg-red-500 hover:text-white"
              onClick={() => {
                if (confirm("정말로 삭제하시겠습니까?")) {
                  deleteUser();
                  removeAllCookie();
                  navigate("/");
                }
              }}>
              탈퇴
            </button>

            <button
              className="w-1/2 h-8 border-2 border-grass text-grass font-bold px-2 py-1 text-xs rounded-lg shadow-sm transition-all duration-200 hover:bg-grass hover:text-white"
              onClick={() => {
                if (confirm("로그아웃 하시겠습니까?")) {
                  logOut();
                }
              }}>
              로그아웃
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerDashBoard;
