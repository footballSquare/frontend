import { useState } from "react";
import { MatchCardProps } from "./type";

const MatchCard = (props: MatchCardProps) => {
  const {
    match_match_attribute,
    player_list_nickname,
    team_list_idx,
    match_match_participation_type,
    match_match_idx,
    match_type_idx,
    match_match_start_time,
    match_match_duration,
    observeRef,
    index,
  } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div
      ref={observeRef}
      key={"mathcard-" + index}
      className={`flex flex-row items-center rounded-lg shadow min-h-[100px] 
        ${match_match_attribute === 1 ? "bg-gray-100" : "bg-gray-300"}`}
      onClick={() => setIsModalOpen(true)}>
      <div className="grid grid-cols-4 w-full gap-2 p-4">
        {/* Header Section */}
        <div className="col-span-3 sm:col-span-1 flex flex-col justify-between items-center">
          <p className="text-gray-800 text-sm font-semibold">
            {player_list_nickname} #{team_list_idx}
          </p>
          <span
            className={`text-xs font-medium ${
              match_match_participation_type === 1
                ? "text-red-500"
                : "text-green-500"
            }`}>
            {match_match_participation_type === 1 ? "#승인 필요" : "#자유 참여"}
          </span>
          <span className="text-xs text-gray-400">
            경기 ID: {match_match_idx}
          </span>
        </div>

        {/* Info Section */}
        <div className="hidden sm:flex flex-col col-span-2">
          <p className="text-gray-500 text-xs">
            게임 모드:{" "}
            <span className="font-medium">
              {match_type_idx === 0 ? "일반 경기" : "특별 경기"}
            </span>
          </p>
          <p className="text-gray-500 text-xs">
            매치 진행:{" "}
            <span className="font-medium">{match_match_start_time}</span>
          </p>
          <p className="text-gray-500 text-xs">
            예상 플레이 타임:{" "}
            <span className="font-medium">{match_match_duration}</span>
          </p>
        </div>

        {/* Status Icon */}
        <div className="flex justify-end items-center">
          <span
            className={`w-5 h-5 text-white text-xs flex items-center justify-center rounded-full ${
              match_match_attribute === 1 ? "bg-red-500" : "bg-green-500"
            }`}>
            {match_match_attribute === 1 ? "✗" : "✓"}
          </span>
        </div>
      </div>
      {isModalOpen && <div>매치 매치모달</div>}
    </div>
  );
};

export default MatchCard;
