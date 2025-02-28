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
    <div className="grid grid-cols-2">
      <div className="col-span-1 w-[180px] sm:w-[150px] md:w-[200px] lg:w-[250px] aspect-[3/4] bg-blue-900 text-white rounded-xl flex flex-col items-center justify-between p-4 shadow-lg">
        <div className="text-sm font-bold self-start">RW</div>
        <div className="flex-1 flex items-center justify-center">
          <img
            src="https://example.com/player.png"
            alt="Player"
            className="max-w-[80%] max-h-[60%] object-contain"
          />
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold">김네이마루 #KOR</p>
          <p className="text-sm">10번</p>
        </div>
      </div>

      <div className="col-span-1 flex justify-center items-center min-h-screen bg-gray-100 px-4">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-blue-600 font-bold text-center">
            YOUR NOT ALONE
          </h2>
          <h1 className="text-2xl font-bold text-center mt-2">BEST PLAYER</h1>
          <p className="text-gray-500 text-center">state message in hear</p>

          <form
            onSubmit={(e) => {
              console.log("✅ 폼 제출됨"); // 디버깅용 로그
              handleSubmit(onSubmit)(e);
            }}
            className="mt-4 space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-sm font-medium text-gray-600">
                  name
                </label>
                <input
                  {...register("name")}
                  disabled={!modifyMode}
                  className={`w-full p-2 ${
                    modifyMode
                      ? "border rounded-md"
                      : "border-b bg-transparent text-gray-500 cursor-default"
                  }`}
                  placeholder="name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">
                  nickname
                </label>
                <input
                  {...register("nickname")}
                  disabled={!modifyMode}
                  className={`w-full p-2 ${
                    modifyMode
                      ? "border rounded-md"
                      : "border-b bg-transparent text-gray-500 cursor-default"
                  }`}
                  placeholder="nickname"
                />
                {errors.nickname && (
                  <p className="text-red-500 text-sm">
                    {errors.nickname.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-sm font-medium text-gray-600">
                  platform
                </label>
                <select
                  {...register("platform")}
                  disabled={!modifyMode}
                  className={`w-full p-2 ${
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
                {errors.platform && (
                  <p className="text-red-500 text-sm">
                    {errors.platform.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">
                  team
                </label>
                <input
                  {...register("team")}
                  disabled={!modifyMode}
                  className={`w-full p-2 ${
                    modifyMode
                      ? "border rounded-md"
                      : "border-b bg-transparent text-gray-500 cursor-default"
                  }`}
                  placeholder="team"
                />
                {errors.team && (
                  <p className="text-red-500 text-sm">{errors.team.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">
                position
              </label>
              <select
                {...register("position")}
                disabled={!modifyMode}
                className={`w-full p-2 ${
                  modifyMode
                    ? "border rounded-md"
                    : "border-b bg-transparent text-gray-500 cursor-default"
                }`}>
                <option value="none">none</option>
              </select>
              {errors.position && (
                <p className="text-red-500 text-sm">
                  {errors.position.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">
                tag # discord
              </label>
              <input
                {...register("tag_discord")}
                disabled={!modifyMode}
                className={`w-full p-2 ${
                  modifyMode
                    ? "border rounded-md"
                    : "border-b bg-transparent text-gray-500 cursor-default"
                }`}
                placeholder="#000000"
              />
              {errors.tag_discord && (
                <p className="text-red-500 text-sm">
                  {errors.tag_discord.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">tag</label>
              <input
                {...register("tag")}
                disabled={!modifyMode}
                className={`w-full p-2 ${
                  modifyMode
                    ? "border rounded-md"
                    : "border-b bg-transparent text-gray-500 cursor-default"
                }`}
                placeholder="#000000"
              />
              {errors.tag && (
                <p className="text-red-500 text-sm">{errors.tag.message}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">mmr</label>
              <input
                {...register("mmr")}
                disabled={!modifyMode}
                className={`w-full p-2 ${
                  modifyMode
                    ? "border rounded-md"
                    : "border-b bg-transparent text-gray-500 cursor-default"
                }`}
                placeholder="9"
              />
              {errors.mmr && (
                <p className="text-red-500 text-sm">{errors.mmr.message}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">
                Phone number
              </label>
              <input
                {...register("phone_number")}
                disabled={!modifyMode}
                className={`w-full p-2 ${
                  modifyMode
                    ? "border rounded-md"
                    : "border-b bg-transparent text-gray-500 cursor-default"
                }`}
                placeholder="000-0000-0000"
              />
              {errors.phone_number && (
                <p className="text-red-500 text-sm">
                  {errors.phone_number.message}
                </p>
              )}
            </div>

            {!modifyMode ? (
              <button
                className="w-full bg-blue-600 text-white py-2 rounded-md font-bold mt-2"
                onClick={(e) => {
                  e.preventDefault();
                  setModifyMode(true);
                }}>
                수정하기
              </button>
            ) : (
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md font-bold mt-2">
                저장하기
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
export default PlayerDashBoard;
