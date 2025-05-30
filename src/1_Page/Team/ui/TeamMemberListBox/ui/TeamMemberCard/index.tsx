import React from "react";

import { getPlatformIcon } from "../../../../../../4_Shared/lib/getPlatformIcon";

import { teamRole } from "../../../../../../4_Shared/constant/teamRole";
import { modalReducer } from "./model/reducer";

import defaultProfile from "../../../../../../4_Shared/assets/svg/profile.svg";
import { useNavigate } from "react-router-dom";
import usePutChangeTeamRoleHandler from "./model/usePutChangeTeamRoleHandler";
import useDeleteTeamPlayerHandler from "./model/useDeleteTeamPlayerHandler";

const TeamMemberCard = (props: TeamMemberCardProps) => {
  const {
    player_list_idx,
    player_list_profile_image,
    player_list_nickname,
    team_role_idx,
    player_list_platform,
    isTeamReader,
    isMine,
    observeRef,
    handleDelete,
    handleChangeTeamRole,
  } = props;
  const navigate = useNavigate();

  const [selectTeamRoleIdx, setSelectTeamRoelIdx] =
    React.useState<number>(team_role_idx); // 초기 직책 인덱스 저장용 state

  const [modalState, dispatch] = React.useReducer(modalReducer, {
    detail: false,
    manage: false,
  }); //모달 state

  const { handleDeleteTeamPlayer } = useDeleteTeamPlayerHandler({
    handleDelete,
  });

  const { handlePutChangeTeamRole } = usePutChangeTeamRoleHandler({
    handleChangeTeamRole,
  });

  return (
    <div>
      {/* 멤버 정보 카드*/}
      <div
        className="flex items-center space-x-2 border-b border-gray-200 pb-2 mb-2 cursor-pointer"
        ref={observeRef}
        onClick={() => dispatch({ type: "OPEN_DETAIL" })}>
        <img
          src={player_list_profile_image || defaultProfile}
          className="w-8 h-8 rounded-full object-cover"
        />
        <span className="text-xs">
          {player_list_nickname} {teamRole[team_role_idx]}
        </span>
        <p className="ml-auto">🔎</p>
      </div>

      {/* 디테일 모달 */}
      {modalState.detail && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-gray-800 rounded-lg w-[300px] p-6 text-center shadow-lg">
            <div className="flex justify-center gap-4 mb-4">
              <img
                src={player_list_profile_image || defaultProfile}
                className="w-8 h-8 rounded-full object-cover"
              />
              <img
                src={getPlatformIcon(player_list_platform)}
                className="w-[40px]  rounded-full"
              />
            </div>

            <h3
              className="text-lg font-semibold hover:underline cursor-pointer"
              onClick={() => {
                navigate(`/profile/${player_list_idx}`);
              }}>
              {player_list_nickname}
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              {teamRole[team_role_idx]}
            </p>

            {/* 자기 자신의 직위는 변경 불가 */}
            {isTeamReader && !isMine && (
              <button
                className="w-full bg-blue-500 text-white text-sm font-medium py-2 rounded-full mb-2"
                onClick={() => {
                  dispatch({ type: "OPEN_MANAGE" });
                }}>
                팀원 관리
              </button>
            )}

            <button
              onClick={() => dispatch({ type: "CLOSE_ALL" })}
              className="w-full border border-gray-300 py-2 rounded-md text-gray-300">
              닫기
            </button>
          </div>
        </div>
      )}

      {/* 팀원 관리 모달 */}
      {modalState.manage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-gray-800 rounded-lg w-[300px] p-6 text-center shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <div className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center">
                📂
              </div>
              <button
                onClick={() => dispatch({ type: "CLOSE_ALL" })}
                className="text-gray-500 text-lg">
                ✕
              </button>
            </div>

            <h2 className="text-lg font-semibold mb-2">팀원 관리</h2>
            <label className="block text-sm text-gray-300 mb-1">
              팀원 직책 변경
            </label>
            <select
              className="w-full border border-gray-300 rounded-md py-2 px-3 mb-4 text-sm"
              defaultValue={team_role_idx}
              onChange={(e) => {
                setSelectTeamRoelIdx(parseInt(e.target.value, 10));
              }}>
              {teamRole.map((value, index) => (
                <option value={index}>{value}</option>
              ))}
            </select>
            <button
              className="w-full bg-red-500 text-white py-2 rounded-md mb-2"
              onClick={() => {
                if (confirm("방출하시겠습니까?")) {
                  dispatch({ type: "CLOSE_ALL" });
                  handleDeleteTeamPlayer(player_list_idx);
                }
              }}>
              방출
            </button>
            <button
              disabled={team_role_idx === selectTeamRoleIdx}
              className={`w-full text-white py-2 rounded-md mb-2 transition-all ${
                team_role_idx === selectTeamRoleIdx
                  ? "bg-gray-300 text-gray-400 cursor-not-allowed opacity-50"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
              onClick={() => {
                dispatch({ type: "CLOSE_ALL" });
                handlePutChangeTeamRole(player_list_idx, selectTeamRoleIdx);
              }}>
              저장
            </button>
            <button
              onClick={() => {
                dispatch({ type: "CLOSE_ALL" });
              }}
              className="w-full border border-gray-300 py-2 rounded-md text-gray-300">
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamMemberCard;
