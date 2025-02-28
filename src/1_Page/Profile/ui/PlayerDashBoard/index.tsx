import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./lib/schema";
import React, { useState } from "react";
import { UserInfoProps, UserInfoInput } from "./type";
import { platform } from "../../../../4_Shared/constant/platform";

const POSITION = ["ST", "MF", "DF", "GK"];

const PlayerDashBoard = ({ userInfo }: { userInfo: UserInfoProps }) => {
  const [modifyMode, setModifyMode] = useState(false);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserInfoInput>({
    resolver: yupResolver(schema),
  });

  React.useEffect(() => {
    reset({
      ...userInfo,
      position: "ST",
      platform: platform[userInfo.platform],
    });
  }, [userInfo]);

  const onSubmit: SubmitHandler<UserInfoInput> = (data) => {
    setModifyMode(false);
    console.log("폼 제출됨:", data);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 p-4 bg-white shadow-md rounded-lg">
      {/* Player 카드 */}
      <div className="hidden sm:flex justify-center items-center">
        <div className="w-[120px] sm:w-[100px] md:w-[140px] lg:w-[160px] aspect-[3/4] bg-blue-900 text-white rounded-lg flex flex-col items-center justify-between p-4 shadow-md">
          <div className="text-xs font-bold self-start">RW</div>
          <div className="flex-1 flex items-center justify-center">
            <img
              src="https://example.com/player.png"
              alt="Player"
              className="max-w-[80%] max-h-[60%] object-contain"
            />
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold">김네이마루 #KOR</p>
            <p className="text-xs">10번</p>
          </div>
        </div>
      </div>

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

          {/* 플랫폼 & 팀 */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs font-medium text-gray-600">
                Platform
              </label>
              <select
                {...register("platform")}
                disabled={!modifyMode}
                className={`w-full p-1 text-xs ${
                  modifyMode
                    ? "border rounded-md"
                    : "border-b bg-transparent text-gray-500"
                }`}>
                {platform.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              {errors.platform && (
                <p className="text-red-500 text-xs">
                  {errors.platform.message}
                </p>
              )}
            </div>
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
          </div>

          {/* 포지션 */}
          <div>
            <label className="text-xs font-medium text-gray-600">
              Position
            </label>
            <select
              {...register("position")}
              disabled={!modifyMode}
              className={`w-full p-1 text-xs ${
                modifyMode
                  ? "border rounded-md"
                  : "border-b bg-transparent text-gray-500"
              }`}>
              {POSITION.map((items) => (
                <option>{items}</option>
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
          {!modifyMode ? (
            <button
              className="w-full bg-blue-600 text-white py-1 text-xs rounded-md font-bold mt-1"
              onClick={(e) => {
                e.preventDefault();
                setModifyMode(true);
              }}>
              수정하기
            </button>
          ) : (
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-1 text-xs rounded-md font-bold mt-1">
              저장하기
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default PlayerDashBoard;
