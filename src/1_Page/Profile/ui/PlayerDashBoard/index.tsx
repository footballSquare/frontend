import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { schema } from "./lib/schema";
// 타입
import { UserInfoProps } from "./type";
import { UserInfoInput } from "../../../../3_Entity/Account/type";
// 상수
import { platform } from "../../../../4_Shared/constant/platform";
import { matchPosition } from "../../../../4_Shared/constant/matchPosition";

import useInputHandler from "./model/useInputHandler";
import usePostUserInfo from "../../../../3_Entity/Account/usePutUserInfo";
import useDeleteUserInfo from "../../../../3_Entity/Account/useDeleteUserInfo";
import PlayerCard from "./ui/PlayerCard";

const PlayerDashBoard = ({ userInfo }: { userInfo: UserInfoProps }) => {
  const [modifyMode, setModifyMode] = React.useState<boolean>(false);

  const {
    reset,
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<UserInfoInput>({
    resolver: yupResolver(schema),
  });

  const [defaultUserInfoInput] = useInputHandler(reset, userInfo);
  const inputBackupDataRef = React.useRef<UserInfoInput>(defaultUserInfoInput);

  const handleCancle = () => {
    reset(inputBackupDataRef.current);
  };

  const [postEvent] = usePostUserInfo({
    userIdx: userInfo.userIdx,
    onFail: handleCancle,
  });
  const [deleteEvent] = useDeleteUserInfo(userInfo.userIdx);

  const onSubmit: SubmitHandler<UserInfoInput> = (data) => {
    setModifyMode(false);
    const isChange =
      JSON.stringify(data) !== JSON.stringify(inputBackupDataRef.current);
    if (!isChange) return;
    postEvent({
      ...data,
      platform: platform.indexOf(data.platform),
      position: matchPosition.indexOf(data.position),
    });
  };

  return (
    <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 p-4 bg-white shadow-md rounded-lg">
      {/* Player 카드 */}
      <PlayerCard userInfo={userInfo} />

      {/* 정보 수정 폼 */}
      <div className="w-full max-w-sm">
        <h2 className="text-blue-600 font-semibold text-center text-sm">
          YOUR NOT ALONE
        </h2>
        <h1 className="text-lg font-bold text-center mt-1">BEST PLAYER</h1>
        <p className="text-gray-500 text-center text-xs">
          State message in here
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-2 space-y-3">
          {/* 이름 & 닉네임 */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs font-medium text-gray-600">Name</label>
              <input
                {...register("name")}
                disabled={!modifyMode}
                className={`w-full p-1 text-xs ${
                  modifyMode
                    ? "border rounded-md"
                    : "border-b bg-transparent text-gray-500"
                }`}
                placeholder="Name"
              />
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600">
                Nickname
              </label>
              <input
                {...register("nickname")}
                disabled={!modifyMode}
                className={`w-full p-1 text-xs ${
                  modifyMode
                    ? "border rounded-md"
                    : "border-b bg-transparent text-gray-500"
                }`}
                placeholder="Nickname"
              />
              {errors.nickname && (
                <p className="text-red-500 text-xs">
                  {errors.nickname.message}
                </p>
              )}
            </div>
          </div>

          {/* 팀 & 플랫폼 */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs font-medium text-gray-600">Team</label>
              <input
                {...register("team")}
                disabled={!modifyMode}
                className={`w-full p-1 text-xs ${
                  modifyMode
                    ? "border rounded-md"
                    : "border-b bg-transparent text-gray-500"
                }`}
                placeholder="Team"
              />
              {errors.team && (
                <p className="text-red-500 text-xs">{errors.team.message}</p>
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
              <p className="text-red-500 text-xs">{errors.position.message}</p>
            )}
          </div>

          {/* MMR & 전화번호 */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs font-medium text-gray-600">MMR</label>
              <input
                {...register("mmr")}
                type="number"
                disabled={!modifyMode}
                className={`w-full p-1 text-xs ${
                  modifyMode
                    ? "border rounded-md"
                    : "border-b bg-transparent text-gray-500"
                }`}
                placeholder="MMR"
              />
              {errors.mmr && (
                <p className="text-red-500 text-xs">{errors.mmr.message}</p>
              )}
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600">
                Phone Number
              </label>
              <input
                {...register("phone_number")}
                disabled={!modifyMode}
                className={`w-full p-1 text-xs ${
                  modifyMode
                    ? "border rounded-md"
                    : "border-b bg-transparent text-gray-500"
                }`}
                placeholder="000-0000-0000"
              />
              {errors.phone_number && (
                <p className="text-red-500 text-xs">
                  {errors.phone_number.message}
                </p>
              )}
            </div>
          </div>

          {/* 수정/저장 버튼 */}
          {userInfo.isMine &&
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
        </form>
        {!modifyMode && userInfo.isMine && (
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
