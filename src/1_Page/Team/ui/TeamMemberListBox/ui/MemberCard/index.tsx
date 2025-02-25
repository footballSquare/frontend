import { useState } from "react";
import { MemberProps } from "./type";

const TEAM_ROLE = ["회장", "부회장", "팀원"];
const PERMIT = ["팀장"];

const initialRole = "팀장";

const MemberCard = (props: MemberProps) => {
  const {
    index,
    player_list_profile_img,
    player_list_nickname,
    team_role_idx,
    player_list_platform,
  } = props;
  const [role, setRole] = useState(initialRole);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="group">
      <div key={index} className=" flex items-center space-x-2">
        <img
          src={player_list_profile_img}
          alt={player_list_nickname}
          className="w-8 h-8 rounded-full"
        />
        <span className="text-xs">
          {player_list_nickname} {TEAM_ROLE[team_role_idx]}
        </span>
      </div>

      {!isModalOpen && (
        <div
          className={`fixed top-1/2 bg-white rounded-lg flex flex-col items-center justify-center w-[200px] h-[200px] transition-all duration-300 ease-in-out transform ${
            index === 0
              ? "translate-x-0"
              : index === length - 1
              ? "translate-x-0"
              : "-translate-x-1/2"
          } -translate-y-1/2 z-50 shadow-lg p-4 border border-gray-300 scale-0 group-hover:scale-100`}
          style={{
            whiteSpace: "nowrap",
            overflow: "visible",
            pointerEvents: "auto",
          }}>
          <div className="flex gap-4">
            <img
              src={player_list_profile_img}
              className="w-[40px] h-[40px] mb-2"
            />
            <img
              src={player_list_platform}
              className="w-[40px] h-[40px] mb-2"
            />
          </div>

          <h3 className="text-lg font-semibold text-center">
            {player_list_nickname}
          </h3>
          <p className="text-gray-500 text-sm">{TEAM_ROLE[team_role_idx]}</p>
          {PERMIT.includes(role) && (
            <button
              className="bg-blue-500 text-white text-sm font-medium py-1 px-3 rounded-full"
              onClick={() => setIsModalOpen(true)}>
              팀원 관리
            </button>
          )}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-lg w-[300px] p-6 text-center shadow-lg">
            {/* 모달 헤더 */}
            <div className="flex justify-between items-center mb-4">
              <div className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center">
                📂
              </div>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                }}
                className="text-gray-500 text-lg">
                ✕
              </button>
            </div>

            {/* 모달 본문 */}
            <h2 className="text-lg font-semibold mb-2">팀원 관리</h2>
            <label className="block text-sm text-gray-600 mb-1">
              팀원 직책 변경
            </label>
            <select
              className="w-full border border-gray-300 rounded-md py-2 px-3 mb-4 text-sm"
              value={role}
              onChange={(event) => {
                setRole(event.target.value);
              }}>
              <option value="회장">회장</option>
              <option value="부회장">부회장</option>
              <option value="팀원">팀원</option>
            </select>
            {/* 버튼 영역 */}
            <button className="w-full bg-red-300 text-white py-2 rounded-md mb-2">
              방출
            </button>
            <button className="w-full bg-blue-500 text-white py-2 rounded-md mb-2">
              저장
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
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
