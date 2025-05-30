import React from "react";
import { useFormContext } from "react-hook-form";

import { useLogout } from "../../../../4_Shared/lib/useMyInfo";

import usePutUserInfoHandler from "./model/usePutUserInfoHandler";

import useToggleState from "../../../../4_Shared/model/useToggleState";

import ProfileDashBoardInput from "../../../../4_Shared/hookForm/ProfileDashBoardInput";
import useDeleteUserHandler from "./model/useDeleteUserHandler";
import { useNavigate } from "react-router-dom";

const PlayerDashBoard = (props: PlayerDashBoardProps) => {
  const { userInfo } = props; // 뷸변값들
  const { is_mine, team_name, team_short_name, team_idx, team_emblem } =
    userInfo;
  const navigate = useNavigate();

  const {
    handleSubmit,
    reset,
    getValues,
    formState: { isDirty },
  } = useFormContext<UserInfoForm>();

  // ref
  const inputBackupDataRef = React.useRef<UserInfoForm>({} as UserInfoForm);
  // api
  const [handleDeleteUser] = useDeleteUserHandler();
  const [handlePutUserInfo] = usePutUserInfoHandler({
    reset,
    inputBackupDataRef,
  });
  // cookie
  const [logOut] = useLogout();
  // state
  const [isModifyMode, toggleIsModifyMode] = useToggleState();

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
        <form
          onSubmit={handleSubmit((formData) => {
            toggleIsModifyMode();
            if (!isDirty) return;
            handlePutUserInfo(formData);
          })}>
          <ProfileDashBoardInput
            label="상태 메시지"
            registerType="message"
            name="message"
            placeholder="상태 메시지 입력"
            isModifyMode={isModifyMode}
          />

          {/* 팀 & 구직 상태 */}
          {team_name ? (
            <div
              className="mb-6 p-3 rounded-lg bg-gray-700 group"
              onClick={() => {
                navigate(`/team/${team_idx}`);
              }}>
              <p className="mb-1 text-xs font-semibold text-gray-300">팀</p>
              <div className="flex items-center w-full p-2 text-sm gap-3 text-gray-300">
                {team_emblem && (
                  <div className="w-10 h-10 overflow-hidden border-2 border-grass shadow-md">
                    <img
                      className="w-full h-full object-cover"
                      src={team_emblem}
                      alt="Team Emblem"
                    />
                  </div>
                )}
                <p className="text-grass font-bold group-hover:underline">
                  {team_name} {team_short_name}
                </p>
              </div>
            </div>
          ) : (
            /* 팀이 없는 경우: 구직 상태 선택 */
            <ProfileDashBoardInput
              label="팀구직상태"
              registerType="common_status_idx"
              name="common_status_idx"
              isModifyMode={isModifyMode}
            />
          )}

          <div className="space-y-5">
            <ProfileDashBoardInput
              label="GAME ID"
              registerType="nickname"
              name="nickname"
              placeholder="Nickname"
              isModifyMode={isModifyMode}
            />

            <ProfileDashBoardInput
              label="PLATFORM"
              registerType="platform"
              name="platform"
              isModifyMode={isModifyMode}
            />

            <ProfileDashBoardInput
              label="Position"
              registerType="match_position_idx"
              name="match_position_idx"
              isModifyMode={isModifyMode}
            />

            <ProfileDashBoardInput
              label="Discord Tag"
              registerType="discord_tag"
              name="discord_tag"
              placeholder="Discord Tag"
              isModifyMode={isModifyMode}
            />

            {/* 버튼 */}
            {is_mine &&
              (!isModifyMode ? (
                <button
                  className="w-full py-3 text-sm rounded-lg font-bold mt-4 bg-grass text-white hover:bg-grass/80 transition-all shadow-md hover:shadow-lg"
                  onClick={(e) => {
                    e.preventDefault();
                    inputBackupDataRef.current = getValues();
                    toggleIsModifyMode();
                  }}>
                  수정하기
                </button>
              ) : (
                <div className="flex justify-between gap-3 mt-4">
                  <button
                    type="button"
                    className="w-1/2 py-2.5 border-2 border-red-500 text-red-500 rounded-lg text-sm font-bold hover:bg-red-500 hover:text-white transition-all shadow-sm"
                    onClick={() => {
                      toggleIsModifyMode();
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

        {is_mine && !isModifyMode && (
          <div className="flex w-full mt-4 gap-2">
            <button
              className="w-1/2 h-8 border-2 border-red-500 text-red-600 font-bold px-2 py-1 text-xs rounded-lg shadow-sm transition-all duration-200 hover:bg-red-500 hover:text-white"
              onClick={async () => {
                if (confirm("정말로 삭제하시겠습니까?")) {
                  handleDeleteUser();
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
