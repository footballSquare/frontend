import React from "react";

import { MemberProps } from "./type";
import pc_icon from "../../../../../../4_Shared/assets/svg/pc-desktop.svg";
import ps_icon from "../../../../../../4_Shared/assets/svg/platform-playstation.svg";
import xbox_icon from "../../../../../../4_Shared/assets/svg/platform-xbox.svg";
import { platform } from "../../../../../../4_Shared/constant/platform";
import { teamRole } from "../../../../../../4_Shared/constant/teamRole";
import useDeleteTeamPlayer from "../../../../../../3_Entity/Team/useDeleteTeamPlayer";
import usePostChangeTeamRole from "../../../../../../3_Entity/Team/usePostChangeTeamRole";

const TEST_ROLE = 0;

const MemberCard = (props: MemberProps) => {
  const {
    player_list_idx,
    player_list_profile_img,
    player_list_nickname,
    team_role_idx,
    player_list_platform,
    observeRef,
  } = props;
  const isTeamReader = TEST_ROLE === 0;

  const [deleteEvent] = useDeleteTeamPlayer();

  const [postEvent] = usePostChangeTeamRole();

  const [clickMemberRole, setClickMemberRole] = React.useState<number>(3);
  const initialRoleRef = React.useRef<number>(TEST_ROLE);
  const [isDetailModalOpen, setIsDetailModalOpen] =
    React.useState<boolean>(false);
  const [isManageModalOpen, setIsManageModalOpen] =
    React.useState<boolean>(false);

  return (
    <div>
      {/* 멤버 정보 카드*/}
      <div
        className="flex items-center space-x-2 border-b border-gray-200 pb-2 mb-2 cursor-pointer"
        ref={observeRef}
        onClick={() => setIsDetailModalOpen(true)}>
        <img src={player_list_profile_img} className="w-8 h-8 rounded-full" />
        <span className="text-xs">
          {player_list_nickname} {teamRole[team_role_idx]}
        </span>
        <p className="ml-auto">🔎</p>
      </div>

      {/* 디테일 모달 */}
      {isDetailModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-lg w-[300px] p-6 text-center shadow-lg">
            <div className="flex justify-center gap-4 mb-4">
              <img
                src={player_list_profile_img}
                className="w-[40px]  rounded-full"
              />
              <img
                src={`${
                  platform[player_list_platform] === "PC"
                    ? pc_icon
                    : platform[player_list_platform] === "PS4"
                    ? ps_icon
                    : platform[player_list_platform] === "XBOX" && xbox_icon
                }`}
                className="w-[40px]  rounded-full"
              />
            </div>

            <h3 className="text-lg font-semibold">{player_list_nickname}</h3>
            <p className="text-gray-500 text-sm mb-4">
              {teamRole[team_role_idx]}
            </p>

            {isTeamReader && (
              <button
                className="w-full bg-blue-500 text-white text-sm font-medium py-2 rounded-full mb-2"
                onClick={() => {
                  setIsManageModalOpen(true);
                  setIsDetailModalOpen(false);
                  setClickMemberRole(team_role_idx);
                  initialRoleRef.current = team_role_idx;
                }}>
                팀원 관리
              </button>
            )}

            <button
              onClick={() => setIsDetailModalOpen(false)}
              className="w-full border border-gray-300 py-2 rounded-md text-gray-600">
              닫기
            </button>
          </div>
        </div>
      )}

      {/* 팀원 관리 모달 */}
      {isManageModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-lg w-[300px] p-6 text-center shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <div className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center">
                📂
              </div>
              <button
                onClick={() => {
                  setIsManageModalOpen(false);
                }}
                className="text-gray-500 text-lg">
                ✕
              </button>
            </div>

            <h2 className="text-lg font-semibold mb-2">팀원 관리</h2>
            <label className="block text-sm text-gray-600 mb-1">
              팀원 직책 변경
            </label>
            <select
              className="w-full border border-gray-300 rounded-md py-2 px-3 mb-4 text-sm"
              value={clickMemberRole}
              onChange={(event) => {
                setClickMemberRole(Number(event.target.value)); // 문자열을 숫자로 변환
              }}>
              <option value={0}>{teamRole[0]}</option>
              <option value={1}>{teamRole[1]}</option>
              <option value={2}>{teamRole[2]}</option>
            </select>
            <button
              className="w-full bg-red-500 text-white py-2 rounded-md mb-2"
              onClick={() => {
                if (confirm("방출하시겠습니까?")) {
                  setIsManageModalOpen(false);
                  deleteEvent(clickMemberRole);
                  alert("방출되었습니다");
                }
              }}>
              방출
            </button>
            <button
              disabled={clickMemberRole === initialRoleRef.current}
              className={`w-full text-white py-2 rounded-md mb-2 transition-all ${
                clickMemberRole === initialRoleRef.current
                  ? "bg-gray-300 text-gray-400 cursor-not-allowed opacity-50"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
              onClick={() => {
                setIsManageModalOpen(false);
                postEvent(player_list_idx, clickMemberRole);
              }}>
              저장
            </button>
            <button
              onClick={() => setIsManageModalOpen(false)}
              className="w-full border border-gray-300 py-2 rounded-md text-gray-600">
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberCard;
