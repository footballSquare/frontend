import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./lib/schema";
import React, { useState } from "react";
import { UserInfoProps, UserInfoInput } from "./type";
import { platform } from "../../../../4_Shared/constant/platform";
const PlayerDashBoard = (props: { userInfo: UserInfoProps }) => {
  const { userInfo } = props;

  const [modifyMode, setModifyMode] = useState<boolean>(false);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserInfoInput>({
    resolver: yupResolver(schema),
  });

  // default value 설정
  React.useEffect(() => {
    reset({
      ...userInfo,
      position: "st",
      platform: platform[userInfo.platform],
    });
  }, [userInfo]);

  const onSubmit: SubmitHandler<UserInfoInput> = (data) => {
    setModifyMode(false);
    console.log(data);
  };

  return (
    <div className="flex items-center space-y-4 p-2 bg-white shadow-md rounded-lg justify-between">
      {/* 플레이어 카드 */}
      <div className="hidden sm:flex flex-1 w-full h-full justify-center items-center p-4">
        <div className="w-full max-w-sm min-w-[100px] aspect-[3/4] min-h-[75px] h-auto bg-blue-900 text-white rounded-lg flex flex-col items-center justify-between p-4 shadow-md">
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

      {/* 정보 수정 카드 */}
      <div className="w-full max-w-sm ">
        <h2 className="text-blue-600 font-semibold text-center text-sm">
          YOUR NOT ALONE
        </h2>
        <h1 className="text-lg font-bold text-center mt-1">BEST PLAYER</h1>
        <p className="text-gray-500 text-center text-xs">
          state message in here
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-2 space-y-3">
          {/* 이름 & 닉네임 */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs font-medium text-gray-600">name</label>
              <input
                {...register("name")}
                disabled={!modifyMode}
                className={`w-full p-1 text-xs ${
                  modifyMode
                    ? "border rounded-md"
                    : "border-b bg-transparent text-gray-500 cursor-default"
                }`}
                placeholder="name"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600">
                nickname
              </label>
              <input
                {...register("nickname")}
                disabled={!modifyMode}
                className={`w-full p-1 text-xs ${
                  modifyMode
                    ? "border rounded-md"
                    : "border-b bg-transparent text-gray-500 cursor-default"
                }`}
                placeholder="nickname"
              />
            </div>
          </div>

          {/* 플랫폼 & 팀 */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs font-medium text-gray-600">
                platform
              </label>
              <select
                {...register("platform")}
                disabled={!modifyMode}
                className={`w-full p-1 text-xs ${
                  modifyMode
                    ? "border rounded-md"
                    : "border-b bg-transparent text-gray-500 cursor-default"
                }`}>
                {platform.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600">team</label>
              <input
                {...register("team")}
                disabled={!modifyMode}
                className={`w-full p-1 text-xs ${
                  modifyMode
                    ? "border rounded-md"
                    : "border-b bg-transparent text-gray-500 cursor-default"
                }`}
                placeholder="team"
              />
            </div>
          </div>

          {/* 포지션 */}
          <div>
            <label className="text-xs font-medium text-gray-600">
              position
            </label>
            <select
              {...register("position")}
              disabled={!modifyMode}
              className={`w-full p-1 text-xs ${
                modifyMode
                  ? "border rounded-md"
                  : "border-b bg-transparent text-gray-500 cursor-default"
              }`}>
              <option value="none">none</option>
            </select>
          </div>

          {/* Discord Tag & Tag */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs font-medium text-gray-600">
                tag # discord
              </label>
              <input
                {...register("tag_discord")}
                disabled={!modifyMode}
                className={`w-full p-1 text-xs ${
                  modifyMode
                    ? "border rounded-md"
                    : "border-b bg-transparent text-gray-500 cursor-default"
                }`}
                placeholder="#000000"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600">tag</label>
              <input
                {...register("tag")}
                disabled={!modifyMode}
                className={`w-full p-1 text-xs ${
                  modifyMode
                    ? "border rounded-md"
                    : "border-b bg-transparent text-gray-500 cursor-default"
                }`}
                placeholder="#000000"
              />
            </div>
          </div>

          {/* mmr & phone_number */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs font-medium text-gray-600">mmr</label>
              <input
                {...register("mmr")}
                disabled={!modifyMode}
                className={`w-full p-1 text-xs ${
                  modifyMode
                    ? "border rounded-md"
                    : "border-b bg-transparent text-gray-500 cursor-default"
                }`}
                placeholder="9"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600">
                Phone number
              </label>
              <input
                {...register("phone_number")}
                disabled={!modifyMode}
                className={`w-full p-1 text-xs ${
                  modifyMode
                    ? "border rounded-md"
                    : "border-b bg-transparent text-gray-500 cursor-default"
                }`}
                placeholder="000-0000-0000"
              />
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
