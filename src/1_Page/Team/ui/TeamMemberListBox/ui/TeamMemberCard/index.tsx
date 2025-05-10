import React from "react";

import { getPlatformIcon } from "../../../../../../4_Shared/lib/getPlatformIcon";

import { teamRole } from "../../../../../../4_Shared/constant/teamRole";
import useDeleteTeamPlayer from "../../../../../../3_Entity/Team/useDeleteTeamPlayer";
import usePostChangeTeamRole from "../../../../../../3_Entity/Team/usePostChangeTeamRole";
import { modalReducer } from "./model/reducer";

import defaultProfile from "../../../../../../4_Shared/assets/svg/profile.svg";
import { useAuthStore } from "../../../../../../4_Shared/lib/useMyInfo";
import { useNavigate } from "react-router-dom";
import useParamInteger from "../../../../../../4_Shared/model/useParamInteger";

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
    handleChangeMyRole,
  } = props;
  const navigate = useNavigate();

  const initialRoleRef = React.useRef<number>(team_role_idx); // 저장용 Ref
  const [modalState, dispatch] = React.useReducer(modalReducer, {
    detail: false,
    manage: false,
  }); //모달 state

  const { setTeamRoleIdx } = useAuthStore();

  const teamIdx = useParamInteger("teamIdx");
  const [deleteTeamPlayer] = useDeleteTeamPlayer(teamIdx);
  const [postChangeTeamRole] = usePostChangeTeamRole(teamIdx);

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
              onChange={(event) => {
                handleChangeTeamRole(
                  player_list_idx,
                  Number(event.target.value)
                );
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
                  deleteTeamPlayer(team_role_idx);
                  handleDelete(player_list_idx);
                  alert("방출되었습니다");
                }
              }}>
              방출
            </button>
            <button
              disabled={team_role_idx === initialRoleRef.current}
              className={`w-full text-white py-2 rounded-md mb-2 transition-all ${
                team_role_idx === initialRoleRef.current
                  ? "bg-gray-300 text-gray-400 cursor-not-allowed opacity-50"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
              onClick={() => {
                if (
                  team_role_idx === 0 &&
                  !confirm("팀장을 양도하면 부팀장이 됩니다. 계속하시겠습니까?")
                ) {
                  return;
                } else {
                  setTeamRoleIdx(1);
                  handleChangeMyRole(1);
                }
                dispatch({ type: "CLOSE_ALL" });
                postChangeTeamRole(player_list_idx, team_role_idx);
                initialRoleRef.current = team_role_idx;
              }}>
              저장
            </button>
            <button
              onClick={() => {
                dispatch({ type: "CLOSE_ALL" });
                handleChangeTeamRole(
                  player_list_idx,
                  Number(initialRoleRef.current)
                );
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
