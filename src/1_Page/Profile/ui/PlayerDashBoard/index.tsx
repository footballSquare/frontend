import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { schema } from "./lib/schema";
import { hasChanges } from "./util/validate";
import { convertToPostData, convertToInfoForm } from "./util/convert";
import useModifyHandler from "./model/useModifyHandler";
// 상수
import { platform } from "../../../../4_Shared/constant/platform";
import { matchPosition } from "../../../../4_Shared/constant/matchPosition";
import { commonStatusIdx } from "../../../../4_Shared/constant/commonStatusIdx";

import usePutUserInfo from "../../../../3_Entity/Account/usePutUserInfo";
import useDeleteUser from "../../../../3_Entity/Account/useDeleteUser";

const PlayerDashBoard = (props: PlayerDashBoardProps) => {
  const { is_mine, short_team_name, team_name, team_emblem } = props;

  const {
    reset,
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm<UserInfoForm>({
    resolver: yupResolver(schema),
  });

  const watchAll = watch();
  React.useEffect(() => {
    console.log("🔍 watchAll form values:", watchAll);
  }, [watchAll]);

  const userInfoForm = React.useMemo(() => convertToInfoForm(props), [props]);
  const inputBackupDataRef = React.useRef<UserInfoForm>(userInfoForm);

  const { modifyMode, handleCancle, handleModifyFalse, handleModifyTrue } =
    useModifyHandler({
      userInfoForm,
      reset,
      inputBackupDataRef,
    });

  const [putUserInfo] = usePutUserInfo();
  const [deleteUser] = useDeleteUser();

  const onSubmit: SubmitHandler<UserInfoForm> = (data) => {
    handleModifyFalse();
    if (!hasChanges(data, inputBackupDataRef.current)) return;
    putUserInfo(convertToPostData(data));
  };

  return (
    <div className="w-full bg-white shadow-md rounded-lg p-4 border border-blue-300">
      <h2 className="text-blue-700 font-semibold text-center text-sm">
        YOUR NOT ALONE
      </h2>
      <h1 className="text-lg font-bold text-center mt-1 text-blue-800">
        BEST PLAYER
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit, (errors) => {
          console.log("폼 에러!", errors);
        })}>
        <input
          {...register("state_message")}
          disabled={!modifyMode}
          className={`w-full p-2 text-sm text-center rounded-md ${
            modifyMode
              ? "border border-blue-400 bg-blue-50 text-blue-700"
              : "bg-transparent text-gray-500"
          }`}
          placeholder="상태 메시지 입력"
        />

        {/* 팀 & 플랫폼 */}
        <div className="mt-3">
          <label className="text-xs font-medium text-gray-600">
            {team_name ? "팀" : "팀구직상태"}
          </label>
          {team_name ? (
            <div className="flex items-center w-full p-2 text-xs gap-2 border-b bg-transparent text-gray-500">
              {team_emblem && (
                <img
                  className="w-[18px] h-[18px] rounded-full object-cover border border-blue-400"
                  src={team_emblem}
                  alt="Team Emblem"
                />
              )}
              <p className="text-blue-700 font-semibold">{team_name}</p>
            </div>
          ) : (
            <select
              {...register("common_status_idx")}
              disabled={!modifyMode}
              className={`w-full p-2 text-xs rounded-md ${
                modifyMode
                  ? "border border-blue-400 bg-blue-50 text-blue-700"
                  : "bg-transparent text-gray-500"
              }`}>
              {commonStatusIdx.slice(6, 9).map((commontStatusIdx, index) => (
                <option key={index} value={commontStatusIdx}>
                  {commontStatusIdx}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="mt-3 space-y-3">
          {/* 닉네임 */}
          <div>
            <label className="text-xs font-medium text-gray-600">
              Nickname
            </label>
            <div
              className={`flex items-center w-full p-2 text-xs  ${
                modifyMode
                  ? "border rounded-md border-blue-400 bg-blue-50 text-blue-700"
                  : "border-b bg-transparent text-gray-500"
              }`}>
              {short_team_name && (
                <p className="whitespace-nowrap text-blue-700">{`#${short_team_name} - `}</p>
              )}
              <input
                {...register("nickname")}
                disabled={!modifyMode}
                className="w-full bg-transparent outline-none"
                placeholder="Nickname"
              />
            </div>
            {errors.nickname && (
              <p className="text-red-500 text-xs">{errors.nickname.message}</p>
            )}
          </div>

          {/* 플랫폼 */}
          <div>
            <label className="text-xs font-medium text-gray-600">
              Platform
            </label>
            <select
              {...register("platform")}
              disabled={!modifyMode}
              className={`w-full p-2 text-xs  ${
                modifyMode
                  ? "border rounded-md border-blue-400 bg-blue-50 text-blue-700"
                  : "border-b bg-transparent text-gray-500"
              }`}>
              {platform.map((plat, index) => (
                <option key={index} value={plat === null ? "X" : plat}>
                  {plat === null ? "X" : plat.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          {/* 포지션 */}
          <div>
            <label className="text-xs font-medium text-gray-600">
              Position
            </label>
            <select
              {...register("position")}
              disabled={!modifyMode}
              className={`w-full p-2 text-xs  ${
                modifyMode
                  ? "border rounded-md border-blue-400 bg-blue-50 text-blue-700"
                  : "border-b bg-transparent text-gray-500"
              }`}>
              {matchPosition.map((position) => (
                <option key={`match-position-${position}`} value={position}>
                  {position}
                </option>
              ))}
            </select>
          </div>

          {/* Discord 태그 */}
          <div>
            <label className="text-xs font-medium text-gray-600">
              Discord Tag
            </label>
            <input
              {...register("discord_tag")}
              disabled={!modifyMode}
              className={`w-full p-2 text-xs ${
                modifyMode
                  ? "border border-blue-400 bg-blue-50 text-blue-700 rounded-md"
                  : "border-b bg-transparent text-gray-500"
              }`}
              placeholder="Discord Tag"
            />
          </div>

          {/* 버튼 */}
          {is_mine &&
            (!modifyMode ? (
              <button
                className="w-full py-2 text-xs rounded-md font-bold mt-1 bg-blue-600 text-white hover:bg-blue-700 transition-all"
                onClick={(e) => {
                  e.preventDefault();
                  inputBackupDataRef.current = getValues();
                  handleModifyTrue();
                }}>
                수정하기
              </button>
            ) : (
              <div className="flex justify-end gap-2 mt-2">
                <button
                  className="px-3 py-1 border border-red-500 text-red-500 rounded-md text-xs font-semibold hover:bg-red-500 hover:text-white transition-all"
                  onClick={handleCancle}>
                  취소
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 border border-blue-600 text-blue-600 rounded-md text-xs font-semibold hover:bg-blue-600 hover:text-white transition-all">
                  저장
                </button>
              </div>
            ))}

          {is_mine && !modifyMode && (
            <div className="flex w-full py-1 text-xs rounded-md font-bold mt-1 justify-end gap-2">
              <button
                className="w-full h-6 border border-red-600 text-red-600 font-semibold px-2 py-0.5 text-[10px] rounded shadow-sm transition-all duration-200 hover:bg-red-600 hover:text-white"
                onClick={() => {
                  if (confirm("정말로 삭제하시겠습니까?")) {
                    alert("삭제되었습니다.");
                    deleteUser();
                  }
                }}>
                탈퇴
              </button>

              <button
                className="w-full h-6 border border-blue-600 text-blue-600 font-semibold px-2 py-0.5 text-[10px] rounded shadow-sm transition-all duration-200 hover:bg-blue-600 hover:text-white"
                onClick={() => {
                  if (confirm("로그아웃 하시겠습니까?")) {
                    alert("로그아웃되었습니다");
                  }
                }}>
                로그아웃
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default PlayerDashBoard;
