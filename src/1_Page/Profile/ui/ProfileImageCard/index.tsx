import { useFormContext } from "react-hook-form";
import PlayerCard from "../../../../2_Widget/PlayerCard";
import useToggleState from "../../../../4_Shared/model/useToggleState";
import { matchPosition } from "../../../../4_Shared/constant/matchPosition";
import { getPositionColor } from "../../../../4_Shared/lib/getPositionColor";
import profileIcon from "../../../../4_Shared/assets/svg/profile.svg";

const ProfileImageCard = (props: ProfileImageCardProps) => {
  const { userInfo, isModifyMode, onImageChange } = props;
  const { watch } = useFormContext();

  // form 값을 watch하여 현재 상태를 가져옵니다.
  const nickname = watch("nickname", userInfo.nickname);
  const message = watch("message", userInfo.message);
  const platform = watch("platform", userInfo.platform);
  const matchPositionIdx = watch(
    "match_position_idx",
    userInfo.match_position_idx
  );
  const profileImage = watch("profile_image", userInfo.profile_image);

  // 수정모드 또는 플레이어 카드 보기 상태
  const [showPlayerCard, toggleShowPlayerCard] = useToggleState();
  const isShowingPlayerCard = isModifyMode || showPlayerCard;

  return (
    <div className="relative bg-gradient-to-br from-slate-800 to-gray-800 rounded-2xl border border-slate-600/50 shadow-xl backdrop-blur-sm overflow-hidden hover:shadow-2xl transition-all duration-300">
      {/* Toggle Button */}
      <button
        onClick={toggleShowPlayerCard}
        className="absolute top-4 right-4 px-3 py-1.5 bg-slate-700/80 hover:bg-slate-600/80 text-slate-300 hover:text-white text-xs font-medium rounded-lg transition-colors border border-slate-600/50 z-10"
        type="button">
        {isShowingPlayerCard ? "기본 보기" : "상세 보기"}
      </button>

      {isShowingPlayerCard ? (
        <div className="p-6 mt-8">
          <PlayerCard
            isMine={userInfo.is_mine}
            userIdx={userInfo.user_idx}
            teamName={userInfo.team_name}
            profileImage={profileImage}
            matchPositionIdx={matchPositionIdx}
            nickname={nickname}
            onImageChange={onImageChange}
          />
        </div>
      ) : (
        <div className="relative">
          <img
            src={profileImage || profileIcon}
            alt={nickname}
            className="w-full h-48 sm:h-56 md:h-64 lg:h-80 object-contain lg:object-cover bg-slate-900"
          />

          {/* Position Badge - 이미지 위에 오버레이로 배치 */}
          <div
            className="absolute top-4 left-4 px-3 py-1 rounded-full text-white text-xs font-bold shadow-lg border border-white/20"
            style={{
              backgroundColor: getPositionColor(matchPositionIdx),
            }}>
            {matchPosition[matchPositionIdx] || "미정"}
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="text-xl font-bold text-white mb-2">{nickname}</h3>
            <p className="text-slate-300 text-sm leading-relaxed capitalize">
              {platform}
            </p>
            {message && (
              <p className="text-slate-300 text-sm leading-relaxed capitalize">
                {message}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileImageCard;
