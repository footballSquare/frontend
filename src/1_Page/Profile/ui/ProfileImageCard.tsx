import React, { useState } from "react";
import PlayerCard from "../../../2_Widget/PlayerCard";
import profileSvg from "../../../4_Shared/assets/svg/profile.svg";
import { MenuIcon } from "../../../4_Shared/assets/svg/Icons";

interface ProfileImageCardProps {
  userInfo: UserInfo;
  forceShowPlayerCard?: boolean;
}

const ProfileImageCard: React.FC<ProfileImageCardProps> = ({
  userInfo,
  forceShowPlayerCard = false,
}) => {
  const [showPlayerCard, setShowPlayerCard] = useState(false);

  // forceShowPlayerCard가 true이면 PlayerCard를 보여줌
  const shouldShowPlayerCard = forceShowPlayerCard || showPlayerCard;

  const { nickname, message, team_name, team_short_name, profile_image } =
    userInfo;

  return (
    <div className="relative">
      {/* Toggle Button */}
      <button
        onClick={() => setShowPlayerCard(!shouldShowPlayerCard)}
        className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-all duration-200"
        title={shouldShowPlayerCard ? "기본 보기로 전환" : "상세 카드로 전환"}>
        <MenuIcon
          className={`w-5 h-5 text-white transition-transform duration-200 ${
            shouldShowPlayerCard ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Content */}
      <div className="transition-all duration-300 ease-in-out">
        {shouldShowPlayerCard ? (
          <div className="space-y-3">
            <PlayerCard {...userInfo} />
            {/* 프로필 이미지 수정 안내 메시지 */}
            <div className="text-center">
              <p className="text-xs text-slate-400 bg-slate-800/30 px-3 py-2 rounded-lg border border-slate-600/30">
                💡 프로필 이미지를 변경하려면 카드의 이미지를 클릭하세요
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-slate-800 to-gray-800 rounded-2xl border border-slate-600/50 shadow-xl overflow-hidden backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
            <div className="relative">
              <img
                src={profile_image || profileSvg}
                alt={nickname}
                className="w-full h-56 sm:h-64 lg:h-80 object-contain lg:object-cover bg-slate-900"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  {nickname}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {message || "상태 메시지가 없습니다."}
                </p>
                {team_name && (
                  <div className="mt-3 inline-flex items-center px-3 py-1 bg-grass bg-opacity-20 border border-grass border-opacity-30 rounded-full">
                    <span className="text-grass text-xs font-medium">
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
