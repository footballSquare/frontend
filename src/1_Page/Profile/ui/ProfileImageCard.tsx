import React, { useState } from "react";
import PlayerCard from "../../../2_Widget/PlayerCard";
import profileSvg from "../../../4_Shared/assets/svg/profile.svg";
import menu_icon from "../../../4_Shared/assets/svg/menu.svg";
import { getPositionColor } from "../../../4_Shared/lib/getPositionColor";
import { matchPosition } from "../../../4_Shared/constant/matchPosition";

interface ProfileImageCardProps {
  userInfo: UserInfo;
  forceShowPlayerCard?: boolean;
  onImageChange?: (file: File | null) => void;
}

const ProfileImageCard: React.FC<ProfileImageCardProps> = ({
  userInfo,
  forceShowPlayerCard = false,
  onImageChange,
}) => {
  const [showPlayerCard, setShowPlayerCard] = useState(false);

  // forceShowPlayerCard가 true이면 PlayerCard를 보여줌
  const shouldShowPlayerCard = forceShowPlayerCard || showPlayerCard;

  const {
    nickname,
    message,
    team_name,
    team_short_name,
    profile_image,
    match_position_idx,
  } = userInfo;

  return (
    <div className="relative">
      {/* Content */}
      <div className="transition-all duration-300 ease-in-out">
        {shouldShowPlayerCard ? (
          <div className="space-y-3 relative">
            {/* PlayerCard 상태에서의 토글 버튼 */}
            <button
              onClick={() => setShowPlayerCard(!shouldShowPlayerCard)}
              className="absolute top-4 left-4 p-3 bg-white/90 hover:bg-white text-gray-800 hover:text-black rounded-full shadow-lg transition-all duration-200 border-2 border-gray-300"
              style={{ zIndex: 20 }}
              title={
                shouldShowPlayerCard ? "기본 보기로 전환" : "상세 카드로 전환"
              }>
              <img
                src={menu_icon}
                alt="Menu"
                className={`w-5 h-5 transition-transform duration-200 ${
                  shouldShowPlayerCard ? "rotate-180" : ""
                }`}
                style={{ filter: "invert(1)" }}
              />
            </button>
            {/* PlayerCard를 아래로 띄워서 토글 버튼과 겹치지 않도록 */}
            <div className="pt-16">
              <PlayerCard {...userInfo} onImageChange={onImageChange} />
            </div>
            {/* 프로필 이미지 수정 안내 메시지 */}
            <div className="text-center">
              <p className="text-xs text-slate-400 bg-slate-800/30 px-3 py-2 rounded-lg border border-slate-600/30">
                💡 프로필 이미지를 변경하려면 카드의 이미지를 클릭하세요
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-slate-800 to-gray-800 rounded-2xl border border-slate-600/50 shadow-xl overflow-hidden backdrop-blur-sm hover:shadow-2xl transition-all duration-300 relative">
            {/* Toggle Button을 카드 내부로 이동하여 이미지 위에 표시되도록 */}
            <button
              onClick={() => setShowPlayerCard(!shouldShowPlayerCard)}
              className="absolute top-4 left-4 p-3 bg-white/90 hover:bg-white text-gray-800 hover:text-black rounded-full shadow-lg transition-all duration-200 border-2 border-gray-300"
              style={{ zIndex: 20 }}
              title={
                shouldShowPlayerCard ? "기본 보기로 전환" : "상세 카드로 전환"
              }>
              <img
                src={menu_icon}
                alt="Menu"
                className={`w-5 h-5 transition-transform duration-200 ${
                  shouldShowPlayerCard ? "rotate-180" : ""
                }`}
                style={{ filter: "invert(1)" }}
              />
            </button>
            <div className="relative">
              <img
                src={profile_image || profileSvg}
                alt={nickname}
                className="w-full h-56 sm:h-64 lg:h-80 object-contain lg:object-cover bg-slate-900"
              />
              {/* Position Badge - 이미지 위에 오버레이로 배치 */}
              {match_position_idx && (
                <div
                  className={`absolute top-4 right-4 ${getPositionColor(
                    match_position_idx
                  )} text-xs font-bold px-3 py-1 rounded-full shadow-lg border border-white/20`}>
                  {matchPosition[match_position_idx]}
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  {nickname}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {message || "상태 메시지가 없습니다."}
                </p>
                {team_name && (
                  <div
                    className={`mt-3 inline-flex items-center px-3 py-1 ${
                      match_position_idx
                        ? getPositionColor(match_position_idx)
                        : "bg-grass bg-opacity-20 border border-grass border-opacity-30"
                    } rounded-full`}>
                    <span
                      className={`text-xs font-medium ${
                        match_position_idx ? "text-white" : "text-grass"
                      }`}>
                      {team_name} ({team_short_name})
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileImageCard;
