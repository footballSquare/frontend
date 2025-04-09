import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import denide from "../../../../../../4_Shared/assets/svg/denied.svg";
import plus from "../../../../../../4_Shared/assets/svg/plus.svg";
import useToggleState from "../../../../../../4_Shared/model/useToggleState";

const PlayerRow = (props: PlayerRowProps) => {
  const { player, index } = props;
  const navigate = useNavigate();
  const [isModalOpen, handleToogleModal] = useToggleState();

  return (
    <tr
      key={index}
      className={`text-center transition-all duration-300 group ${
        index % 2 === 0 ? "bg-gray-50" : "bg-white"
      } text-xs md:text-sm border-b border-gray-200 hover:bg-blue-50 hover:scale-[1.01]`}>
      <td className="px-3 py-3 font-medium">
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => {
            navigate(`/profile/${player.player_list_idx}`);
          }}>
          <div className="relative">
            <img
              src={player.match_player_stats_evidence_img || ""}
              alt="Player"
              className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border-2 border-blue-400 shadow-md group-hover:border-blue-600 group-hover:shadow-lg transition-all duration-300"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:bg-blue-100 transition-colors duration-300">
              <span className="text-[8px] md:text-[10px] font-bold text-blue-700">
                {index + 1}
              </span>
            </div>
          </div>
          <span className="text-blue-800 font-semibold text-left group-hover:text-blue-600 transition-colors duration-300">
            {player.player_list_nickname}
          </span>
        </div>
      </td>
      <td className="px-3 py-3">
        <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-bold group-hover:bg-blue-200 group-hover:shadow-md transition-all duration-300">
          {player.match_player_stats_goal}
        </span>
      </td>
      <td className="px-3 py-3">
        <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-800 font-bold group-hover:bg-green-200 group-hover:shadow-md transition-all duration-300">
          {player.match_player_stats_assist}
        </span>
      </td>
      {/* 패스 횟수를 배지로 표시 */}
      <td className="px-3 py-3">
        <div className="flex items-center justify-center">
          <div className="px-3 py-1 bg-yellow-100 rounded-full shadow-sm group-hover:bg-yellow-200 transition-all duration-300">
            <span className="text-gray-700 font-bold">
              {player.match_player_stats_successrate_pass}
            </span>
          </div>
        </div>
      </td>
      {/* 드리블 횟수를 배지로 표시 */}
      <td className="px-3 py-3">
        <div className="flex items-center justify-center">
          <div className="px-3 py-1 bg-purple-100 rounded-full shadow-sm group-hover:bg-purple-200 transition-all duration-300">
            <span className="text-gray-700 font-bold">
              {player.match_player_stats_successrate_dribble}
            </span>
          </div>
        </div>
      </td>
      {/* 태클 횟수를 배지로 표시 */}
      <td className="px-3 py-3">
        <div className="flex items-center justify-center">
          <div className="px-3 py-1 bg-red-100 rounded-full shadow-sm group-hover:bg-red-200 transition-all duration-300">
            <span className="text-gray-700 font-bold">
              {player.match_player_stats_successrate_tackle}
            </span>
          </div>
        </div>
      </td>
      {/* 점유율 (이미 퍼센트로 처리된 항목) */}
      <td className="px-3 py-3">
        <div className="flex items-center justify-center">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-200 relative group-hover:scale-110 transition-transform duration-300">
            <div
              className="absolute inset-0 rounded-full bg-blue-500 group-hover:bg-blue-600 transition-colors duration-300"
              style={{
                clipPath: `polygon(50% 50%, 50% 0%, ${
                  50 +
                  50 *
                    Math.cos(
                      Math.PI *
                        2 *
                        (player.match_player_stats_possession || 0 / 100)
                    )
                }% ${
                  50 -
                  50 *
                    Math.sin(
                      Math.PI *
                        2 *
                        (player.match_player_stats_possession || 0 / 100)
                    )
                }%, 100% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%)`,
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
      <td className="px-3 py-3">
        <div className="flex justify-center">
          <div
            className="relative cursor-pointer transition transform group-hover:scale-110"
            onClick={(e) => {
              e.stopPropagation();
              handleToogleModal();
            }}>
            <img
              src={player.match_player_stats_evidence_img || ""}
              alt="증거 이미지"
              className="w-10 h-10 md:w-14 md:h-14 rounded-lg object-cover shadow-sm border-2 border-blue-400 group-hover:border-blue-600 group-hover:shadow-md transition-all duration-300"
            />
            <div className="absolute -top-1 -right-1 bg-blue-500 rounded-full w-4 h-4 flex items-center justify-center group-hover:bg-blue-600 group-hover:w-5 group-hover:h-5 transition-all duration-300">
              <img src={plus} alt="plus" />
            </div>
          </div>
        </div>
      </td>
      {/* 이미지 모달 */}
      {isModalOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-10 bg-black/50 flex items-center justify-center"
            onClick={handleToogleModal}>
            <div
              className="bg-white p-2 rounded-lg max-w-3xl max-h-full"
              onClick={(e) => e.stopPropagation()}>
              <div className="relative">
                <img
                  src={player.match_player_stats_evidence_img || ""}
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
