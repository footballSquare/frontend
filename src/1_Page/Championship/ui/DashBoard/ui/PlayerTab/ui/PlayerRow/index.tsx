import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import denide from "../../../../../../../../4_Shared/assets/svg/denied.svg";
import plus from "../../../../../../../../4_Shared/assets/svg/plus.svg";
import imageIcon from "../../../../../../../../4_Shared/assets/svg/image.svg";
import profileIcon from "../../../../../../../../4_Shared/assets/svg/profile.svg";

import useToggleState from "../../../../../../../../4_Shared/model/useToggleState";
import useChampionshipInfoContext from "../../../../../../../../4_Shared/model/useChampionshipInfoContext";
import { calculatePossessionClipPath } from "./util/calculatePossessionClipPath";
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

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // 증거 이미지가 있을 때만 모달 열기
    if (hasEvidenceImage) {
      handleToogleModal();
    }
  };

  return (
    <tr
      key={index}
      className="text-center transition-all duration-300 bg-gray-800 text-xs md:text-sm border-b border-gray-600 hover:bg-gray-700 hover:scale-[1.01] text-gray-100">
      <td className="px-3 py-3 font-medium">
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => navigate(`/profile/${player.player_list_idx}`)}>
          {/* 아바타 */}
          <div className="relative">
            <img
              src={profileIcon}
              alt="Player"
              className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover shadow-md transition-all duration-300 bg-gray-600"
              style={{ border: `2px solid ${championshipListColor}` }}
            />
            {/* 순위 뱃지 – 회색으로 환원 */}
            <div className="absolute -bottom-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-gray-600 rounded-full flex items-center justify-center shadow-sm transition-colors duration-300">
              <span className="text-[8px] md:text-[10px] font-bold">
                {index + 1}
              </span>
            </div>
          </div>
          <span className="font-semibold text-left transition-colors duration-300">
            {player.player_list_nickname}
          </span>
        </div>
      </td>

      {/* 득점 / 어시스트 */}
      <td className="px-3 py-3">
        <span
          className="inline-block px-3 py-1 rounded-full transition-all duration-300"
          style={{ backgroundColor: "#374151", color: "#f3f4f6" }}>
          {player.match_player_stats_goal}
        </span>
      </td>
      <td className="px-3 py-3">
        <span
          className="inline-block px-3 py-1 rounded-full transition-all duration-300"
          style={{ backgroundColor: "#374151", color: "#f3f4f6" }}>
          {player.match_player_stats_assist}
        </span>
      </td>

      {/* 패스 / 드리블 / 태클 */}
      {[
        player.match_player_stats_successrate_pass,
        player.match_player_stats_successrate_dribble,
        player.match_player_stats_successrate_tackle,
      ].map((val, i) => (
        <td key={i} className="px-3 py-3">
          <div className="flex items-center justify-center">
            <div
              className="px-3 py-1 rounded-full shadow-sm transition-all duration-300"
              style={{ backgroundColor: "#374151", color: "#f3f4f6" }}>
              <span className="font-bold">{val}</span>
            </div>
          </div>
        </td>
      ))}

      {/* 점유율  */}
      <td className="px-3 py-3">
        <div className="flex items-center justify-center">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-200 relative group-hover:scale-110 transition-transform duration-300">
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
              <span className="text-white font-bold text-xs group-hover:text-sm transition-all duration-300">
                {player.match_player_stats_possession}%
              </span>
            </div>
          </div>
        </div>
      </td>

      {/* 증거 이미지 & 모달 */}
      <td className="px-3 py-3">
        <div className="flex justify-center">
          <div
            className={`relative transition transform group-hover:scale-110 ${
              hasEvidenceImage ? "cursor-pointer" : "cursor-default opacity-50"
            }`}
            onClick={handleImageClick}>
            {hasEvidenceImage ? (
              <img
                src={player.match_player_stats_evidence_img!}
                alt="증거 이미지"
                className="w-10 h-10 md:w-14 md:h-14 rounded-lg object-cover shadow-sm border-2 border-gray-400 group-hover:border-gray-600 group-hover:shadow-md transition-all duration-300"
              />
            ) : (
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-lg bg-gray-600 border-2 border-gray-500 flex items-center justify-center">
                <img
                  src={imageIcon}
                  alt="기본 이미지"
                  className="w-6 h-6 opacity-50"
                />
              </div>
            )}
            {/* '+' 뱃지 – 증거 이미지가 있을 때만 표시 */}
            {hasEvidenceImage && (
              <div className="absolute -top-1 -right-1 bg-gray-500 rounded-full w-4 h-4 flex items-center justify-center group-hover:bg-gray-600 group-hover:w-5 group-hover:h-5 transition-all duration-300">
                <img src={plus} alt="plus" />
              </div>
            )}
          </div>
        </div>
      </td>

      {isModalOpen &&
        hasEvidenceImage &&
        createPortal(
          <div
            className="fixed inset-0 z-10 bg-black/50 flex items-center justify-center"
            onClick={handleToogleModal}>
            <div
              className="bg-gray-800 p-2 rounded-lg max-w-3xl max-h-full"
              onClick={(e) => e.stopPropagation()}>
              <div className="relative">
                <img
                  src={player.match_player_stats_evidence_img!}
                  alt="증거 이미지 확대"
                  className="max-h-[80vh] max-w-full object-contain"
                />
                <button
                  className="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                  onClick={handleToogleModal}>
                  <img src={denide} alt="닫기" />
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </tr>
  );
};

export default PlayerRow;
