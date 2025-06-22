import { useFormContext } from "react-hook-form";
import useToggleState from "../../4_Shared/model/useToggleState";

const MomSelectionModalPanel = (props: MomSelectionModalPanelProps) => {
  const { teamPlayer, currentMomIdx } = props;
  const [isMomModalOpen, toggleModalState] = useToggleState();
  const { setValue } = useFormContext();

  return (
    <div>
      <button
        type="button"
        onClick={toggleModalState}
        className="px-3 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors font-medium">
        <span>👑</span>
      </button>
      {isMomModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60"
            onClick={toggleModalState}
          />

          {/* Modal Content */}
          <div className="relative bg-gray-900 rounded-xl shadow-2xl border border-gray-700 max-w-md w-full mx-4 max-h-[80vh] overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-grass">MOM 선택</h3>
                <button
                  onClick={toggleModalState}
                  className="text-gray-400 hover:text-gray-200 transition-colors">
                  <span className="text-xl">×</span>
                </button>
              </div>
              <p className="text-sm text-gray-400 mt-1">
                맨 오브 더 매치를 선택해주세요
              </p>
            </div>

            {/* Player List */}
            <div className="p-6 max-h-96 overflow-y-auto">
              {teamPlayer && teamPlayer.length > 0 ? (
                <div className="space-y-2">
                  {teamPlayer.map((player) => (
                    <button
                      key={player.player_list_idx}
                      onClick={() => {
                        setValue("mom_player_idx", player.player_list_idx);
                        toggleModalState();
                      }}
                      className={`w-full p-3 rounded-lg border transition-all duration-200 text-left ${
                        currentMomIdx === player.player_list_idx
                          ? "border-grass bg-grass/10 text-grass"
                          : "border-gray-600 hover:border-gray-500 hover:bg-gray-800 text-gray-200"
                      }`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">
                            {player.player_list_nickname}
                          </div>
                          <div className="text-sm text-gray-400">
                            ⚽ {player.match_player_stats_goal || 0} | 🎯{" "}
                            {player.match_player_stats_assist || 0}
                          </div>
                        </div>
                        {currentMomIdx === player.player_list_idx && (
                          <div className="text-grass">
                            <span className="text-lg">👑</span>
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  선택 가능한 선수가 없습니다.
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-700 bg-gray-800/50">
              <div className="flex gap-3">
                <button
                  onClick={toggleModalState}
                  className="flex-1 px-4 py-2 text-gray-300 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors">
                  취소
                </button>
                <button
                  onClick={toggleModalState}
                  className="flex-1 px-4 py-2 bg-grass text-white rounded-lg hover:bg-grass/90 transition-colors font-medium">
                  확인
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MomSelectionModalPanel;
