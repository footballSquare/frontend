import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { schema } from "./lib/schema";
// 타입
import { UserInfoProps } from "./type";
import { UserInfoInput } from "./type";
// 상수
import { platform } from "../../../../4_Shared/constant/platform";
import { matchPosition } from "../../../../4_Shared/constant/matchPosition";
import { commonStatusIdx } from "../../../../4_Shared/constant/commonStatusIdx";

import useInputHandler from "./model/useInputHandler";
import usePostUserInfo from "../../../../3_Entity/Account/usePutUserInfo";
import useDeleteUserInfo from "../../../../3_Entity/Account/useDeleteUserInfo";
import PlayerCard from "./ui/PlayerCard";
import { hasChanges } from "./util/validate";
import { converPostData } from "./util/convert";

const PlayerDashBoard = ({ userInfo }: { userInfo: UserInfoProps }) => {
  const {
    is_mine,
    user_idx,
    nickname,
    position,
    profile_img,
    short_team_name,
    team,
    team_emblem,
  } = userInfo;
  const profileProps = { is_mine, user_idx, nickname, position, profile_img };

  const {
    reset,
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<UserInfoInput>({
    resolver: yupResolver(schema),
  });

  const [modifyMode, setModifyMode] = React.useState<boolean>(false);
  const [defaultUserInfoInput] = useInputHandler(reset, userInfo);
  const inputBackupDataRef = React.useRef<UserInfoInput>(defaultUserInfoInput);

  const handleCancle = () => {
    reset(inputBackupDataRef.current);
    setModifyMode(false);
  };

  const [postEvent] = usePostUserInfo({
    userIdx: user_idx,
    onFail: handleCancle,
  });
  const [deleteEvent] = useDeleteUserInfo(user_idx);

  const onSubmit: SubmitHandler<UserInfoInput> = (data) => {
    setModifyMode(false);
    if (!hasChanges(data, inputBackupDataRef.current)) return;
    postEvent(converPostData(data));
  };

  return (
    <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4  ">
      {/* Player 카드 */}
      <PlayerCard userInfo={profileProps} />

      {/* 정보 수정 폼 */}
      <div className="w-full max-w-sm bg-white shadow-md rounded-lg p-4">
        <h2 className="text-blue-600 font-semibold text-center text-sm">
          YOUR NOT ALONE
        </h2>
        <h1 className="text-lg font-bold text-center mt-1">BEST PLAYER</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("state_message")}
            disabled={!modifyMode}
            className={`w-full p-1 text-xs text-center ${
              modifyMode
                ? "border-b bg-transparent text-gray-500"
                : "text-gray-500  text-xs"
            }`}
            placeholder="상태 메시지 입력"
          />
          {/* 팀 & 플랫폼 */}
          <div>
            <label className="text-xs font-medium text-gray-600">Team</label>
            {!team ? (
              <div className="flex w-full p-1 text-xs gap-1 border-b bg-transparent text-gray-500">
                {team_emblem && (
                  <img
                    className="w-[15px] h-[15px] object-cover"
                    src={team_emblem}
                    alt="Team Emblem"
                  />
                )}
                <p>{team}</p>
              </div>
            ) : (
              <select
                {...register("common_status_idx")}
                disabled={!modifyMode}
                className={
                  modifyMode
                    ? "w-full p-1 text-xs border rounded-md"
                    : "w-full p-1 text-xs border-b bg-transparent text-gray-500"
                }>
                {commonStatusIdx.map((commontStatusIdx, index) => (
                  <option key={index} value={commontStatusIdx}>
                    {commontStatusIdx}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div className="mt-2 space-y-3">
            {/* 이름 & 닉네임 */}
            <div>
              <label className="text-xs font-medium text-gray-600">
                Nickname
              </label>
              <div
                className={`flex w-full p-1 text-xs ${
                  modifyMode
                    ? "border rounded-md"
                    : "border-b bg-transparent text-gray-500"
                }`}>
                <p className="whitespace-nowrap">{`#${short_team_name} - `}</p>
                <input
                  {...register("nickname")}
                  disabled={!modifyMode}
                  placeholder="Nickname"
                />
              </div>

              {errors.nickname && (
                <p className="text-red-500 text-xs">
                  {errors.nickname.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-xs font-medium text-gray-600">
                Platform
              </label>
              <select
                {...register("platform")}
                disabled={!modifyMode}
                className={
                  modifyMode
                    ? "w-full p-1 text-xs border rounded-md"
                    : "w-full p-1 text-xs border-b bg-transparent text-gray-500"
                }>
                {platform.map((plat, index) => (
                  <option key={index} value={plat}>
                    {plat}
                  </option>
                ))}
              </select>
              {errors.platform && (
                <p className="text-red-500 text-xs">
                  {errors.platform.message}
                </p>
              )}
            </div>

            {/* 포지션 선택 */}
            <div>
              <label className="text-xs font-medium text-gray-600">
                Position
              </label>
              <select
                {...register("position")}
                disabled={!modifyMode}
                className={
                  modifyMode
                    ? "w-full p-1 text-xs border rounded-md"
                    : "w-full p-1 text-xs border-b bg-transparent text-gray-500"
                }>
                {matchPosition.map((position) => (
                  <option key={`match-position-${position}`} value={position}>
                    {position}
                  </option>
                ))}
              </select>
              {errors.position && (
                <p className="text-red-500 text-xs">
                  {errors.position.message}
                </p>
              )}
            </div>

            {/* MMR & 전화번호 */}
            <div>
              <label className="text-xs font-medium text-gray-600">
                Discord Tag
              </label>
              <div
                className={`flex w-full p-1 text-xs ${
                  modifyMode
                    ? "border rounded-md"
                    : "border-b bg-transparent text-gray-500"
                }`}>
                <input
                  {...register("tag_discord")}
                  disabled={!modifyMode}
                  placeholder="discord tag"
                />
              </div>

              {errors.nickname && (
                <p className="text-red-500 text-xs">
                  {errors.nickname.message}
                </p>
              )}
            </div>

            {/* 수정/저장 버튼 */}
            {is_mine &&
              (!modifyMode ? (
                <button
                  className="w-full py-1 text-xs rounded-md font-bold mt-1 bg-blue-600 text-white"
                  onClick={(e) => {
                    e.preventDefault();
                    inputBackupDataRef.current = getValues(); // 현재 폼 데이터 백업
                    setModifyMode(true);
                  }}>
                  수정하기
                </button>
              ) : (
                <div className="flex w-full py-1 text-xs rounded-md font-bold mt-1 justify-end gap-2">
                  <button
                    className="w-full h-6 border border-red-600 text-red-600 font-semibold px-2 py-0.5 text-[10px] rounded shadow-sm transition-all duration-200"
                    onClick={handleCancle}>
                    취소
                  </button>
                  <button
                    type="submit"
                    className="w-full h-6 border border-blue-600 text-blue-600 font-semibold px-2 py-0.5 text-[10px] rounded shadow-sm transition-all duration-200">
                    저장
                  </button>
                </div>
              ))}
          </div>
        </form>
        {!modifyMode && is_mine && (
          <div className="flex w-full py-1 text-xs rounded-md font-bold mt-1 justify-end gap-2">
            <button
              className="w-full h-6 border border-red-600 text-red-600 font-semibold px-2 py-0.5 text-[10px] rounded shadow-sm transition-all duration-200"
              onClick={() => {
                if (confirm("정말로 삭제하시겠습니까?")) {
                  alert("삭제되었습니다.");
                  deleteEvent();
                }
              }}>
              delete
            </button>
            <button
              className="w-full h-6 border border-blue-600 text-blue-600 font-semibold px-2 py-0.5 text-[10px] rounded shadow-sm transition-all duration-200"
              onClick={() => {
                if (confirm("로그아웃 하시겠습니까?")) {
                  alert("로그아웃되었습니다");
                }
              }}>
              logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerDashBoard;
