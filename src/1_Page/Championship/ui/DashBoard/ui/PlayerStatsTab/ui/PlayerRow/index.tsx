import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import { calculatePossessionClipPath } from "./util/calculatePossessionClipPath";

import denide from "../../../../../../4_Shared/assets/svg/denied.svg";
import plus from "../../../../../../4_Shared/assets/svg/plus.svg";
import imageIcon from "../../../../../../4_Shared/assets/svg/image.svg";
import profileIcon from "../../../../../../4_Shared/assets/svg/profile.svg";
import useToggleState from "../../../../../../../../4_Shared/model/useToggleState";
import useChampionshipInfoContext from "../../../../../../../../4_Shared/model/useChampionshipInfoContext";

const PlayerRow = (props: PlayerRowProps) => {
  const { player, index } = props;
  const navigate = useNavigate();
  const [isModalOpen, handleToogleModal] = useToggleState();
  const { championshipListColor } = useChampionshipInfoContext();

  // 증거 이미지가 있는지 확인
  const hasEvidenceImage =
    player.match_player_stats_evidence_img &&
    typeof player.match_player_stats_evidence_img === "string" &&
    player.match_player_stats_evidence_img.trim() !== "";

  return (
    <tr
      key={index}
      className="group transition-all duration-300 hover:bg-white/5 border-b border-gray-700/50 text-gray-100">
      <td className="px-6 py-4">
        <div
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => navigate(`/profile/${player.player_list_idx}`)}>
          {/* 아바타 */}
          <div className="relative">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center overflow-hidden">
              <img
                src={profileIcon}
                alt="Player"
                className="w-8 h-8 object-cover transition-all duration-300"
              />
            </div>
            {/* 순위 뱃지 */}
            <div
              className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center shadow-sm"
              style={{ backgroundColor: championshipListColor }}>
              <span className="text-xs font-bold text-gray-900">
                {index + 1}
              </span>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-white group-hover:text-grass transition-colors duration-300">
              {player.player_list_nickname}
            </div>
            <div className="text-sm text-gray-400">선수 프로필 보기</div>
          </div>
        </div>
      </td>

      {/* 득점 */}
      <td className="px-6 py-4 text-center">
        <div className="inline-flex items-center justify-center min-w-[3rem] h-8 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-lg group-hover:from-orange-500/30 group-hover:to-red-500/30 transition-all duration-300">
          <span className="font-bold text-orange-200 text-sm">
            {player.match_player_stats_goal}
          </span>
        </div>
      </td>

      {/* 어시스트 */}
      <td className="px-6 py-4 text-center">
        <div className="inline-flex items-center justify-center min-w-[3rem] h-8 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-lg group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-300">
          <span className="font-bold text-blue-200 text-sm">
            {player.match_player_stats_assist}
          </span>
        </div>
      </td>

      {/* 패스 성공률 */}
      <td className="px-6 py-4 text-center">
        <div className="relative">
          <div className="inline-flex items-center justify-center min-w-[3.5rem] h-8 bg-grass/20 border border-grass/30 rounded-lg group-hover:bg-grass/30 transition-all duration-300">
            <span className="font-bold text-grass text-sm">
              {player.match_player_stats_successrate_pass}%
            </span>
          </div>
          <div
            className="absolute bottom-0 left-0 h-1 bg-grass/60 rounded-b-lg transition-all duration-500"
            style={{
              width: `${Math.min(
                player.match_player_stats_successrate_pass || 0,
                100
              )}%`,
            }}></div>
        </div>
      </td>

      {/* 드리블 성공률 */}
      <td className="px-6 py-4 text-center">
        <div className="relative">
          <div className="inline-flex items-center justify-center min-w-[3.5rem] h-8 bg-yellow-500/20 border border-yellow-500/30 rounded-lg group-hover:bg-yellow-500/30 transition-all duration-300">
            <span className="font-bold text-yellow-200 text-sm">
              {player.match_player_stats_successrate_dribble}%
            </span>
          </div>
          <div
            className="absolute bottom-0 left-0 h-1 bg-yellow-500/60 rounded-b-lg transition-all duration-500"
            style={{
              width: `${Math.min(
                player.match_player_stats_successrate_dribble || 0,
                100
              )}%`,
            }}></div>
        </div>
      </td>

      {/* 태클 성공률 */}
      <td className="px-6 py-4 text-center">
        <div className="relative">
          <div className="inline-flex items-center justify-center min-w-[3.5rem] h-8 bg-red-500/20 border border-red-500/30 rounded-lg group-hover:bg-red-500/30 transition-all duration-300">
            <span className="font-bold text-red-200 text-sm">
              {player.match_player_stats_successrate_tackle}%
            </span>
          </div>
          <div
            className="absolute bottom-0 left-0 h-1 bg-red-500/60 rounded-b-lg transition-all duration-500"
            style={{
              width: `${Math.min(
                player.match_player_stats_successrate_tackle || 0,
                100
              )}%`,
            }}></div>
        </div>
      </td>

      {/* 점유율 */}
      <td className="px-6 py-4 text-center">
        <div className="flex items-center justify-center">
          <div className="relative w-12 h-12 rounded-full bg-gray-700 group-hover:scale-110 transition-transform duration-300">
            <div
              className="absolute inset-0 rounded-full transition-colors duration-300"
              style={{
                clipPath: calculatePossessionClipPath(
                  player.match_player_stats_possession || 0
                ),
                backgroundColor: championshipListColor,
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white font-bold text-xs">
                {player.match_player_stats_possession}%
              </span>
            </div>
          </div>
        </div>
      </td>

      {/* 증거 이미지 */}
      <td className="px-6 py-4 text-center">
        <div className="flex justify-center">
          <div
            className={`relative transition-all duration-300 group-hover:scale-110 ${
              hasEvidenceImage ? "cursor-pointer" : "cursor-default opacity-50"
            }`}
            onClick={() => {
              if (!hasEvidenceImage) return;
              handleToogleModal();
            }}>
            {hasEvidenceImage ? (
              <div className="relative">
                <img
                  src={player.match_player_stats_evidence_img!}
                  alt="증거 이미지"
                  className="w-14 h-14 rounded-xl object-cover shadow-lg border-2 border-grass/30 group-hover:border-grass/60 transition-all duration-300"
                />
                <div className="absolute -top-1 -right-1 bg-grass rounded-full w-5 h-5 flex items-center justify-center">
                  <img src={plus} alt="확대" className="w-3 h-3" />
                </div>
              </div>
            ) : (
              <div className="w-14 h-14 rounded-xl bg-gray-700 border-2 border-gray-600 flex items-center justify-center">
                <img
                  src={imageIcon}
                  alt="이미지 없음"
                  className="w-6 h-6 opacity-50"
                />
              </div>
            )}
          </div>
        </div>

        {/* 모달 */}
        {isModalOpen &&
          hasEvidenceImage &&
          createPortal(
            <div
              className="fixed inset-0 z-10 bg-black/70 flex items-center justify-center backdrop-blur-sm"
              onClick={handleToogleModal}>
              <div
                className="bg-gray-800 p-4 rounded-2xl max-w-4xl max-h-[90vh] shadow-2xl border border-gray-600"
                onClick={(e) => e.stopPropagation()}>
                <div className="relative">
                  <img
                    src={player.match_player_stats_evidence_img!}
                    alt="증거 이미지 확대"
                    className="max-h-[80vh] max-w-full object-contain rounded-xl"
                  />
                  <button
                    className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg hover:scale-110"
                    onClick={handleToogleModal}>
                    <img src={denide} alt="닫기" className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2">
                    <p className="text-white text-sm font-medium">
                      {player.player_list_nickname}의 경기 증거
                    </p>
                  </div>
                </div>
              </div>
            </div>,
            document.body
          )}
      </td>
    </tr>
  );
};

export default PlayerRow;
