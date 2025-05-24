import { useState } from "react";
import { useMyUserIdx } from "../../../../4_Shared/lib/useMyInfo";
import { mockMatchStats } from "../../../../4_Shared/mock/matchStats";
import ModalLayer from "../../../../4_Shared/components/ModalLayer";
import statFields from "./constant/statFields";

const StatPanel = (props: StatPanelProps) => {
  const { matchParticipants, isMatchLeader } = props;
  const matchStats = mockMatchStats;
  const [userIdx] = useMyUserIdx();

  const [modal, setModal] = useState<"none" | "team" | "player">("none");
  const [currentPlayer, setCurrentPlayer] = useState<number>(-1);

  // 선수별 버튼 클릭 시
  const handlePlayerClick = (playerIdx: number) => {
    setModal("player");
    setCurrentPlayer(playerIdx);
  };

  return (
    <div className="w-full border-1 flex flex-col gap-4 px-4">
      <div className="flex gap-2 flex-wrap">
        {/* 선수 버튼들 */}
        {matchParticipants.map((player) => (
          <button
            className={`border-2 rounded px-3 py-1 font-bold ${
              matchStats.player_stats.some(
                (p) => p.player_list_idx === player.player_list_idx
              )
                ? "border-green-500"
                : "border-red-500"
            } hover:bg-gray-200`}
            onClick={() => handlePlayerClick(player.player_list_idx)}
          >
            {player.player_list_nickname}
          </button>
        ))}
        {/* 팀 스탯 자세히 보기 버튼 */}
        <button
          className="border-2 border-blue-500 rounded px-3 py-1 font-bold hover:bg-gray-200"
          onClick={() => setModal("team")}
        >
          팀 스탯 자세히 보기
        </button>
      </div>

      {/* 모달 영역 */}
      {modal === "team" && (
        <ModalLayer
          toggleModalHandler={() => setModal("none")}
          shape="narrow"
          mode="white"
        >
          <div>
            <h3>팀 스탯</h3>
            {statFields.map(({ key, label }) => (
              <form key={key} className="mb-2 flex items-center gap-2">
                <label className="w-32 text-xs font-semibold text-gray-800">
                  {label}
                </label>
                <input
                  className="border border-gray-500 rounded p-1 flex-1 bg-gray-800 text-white focus:outline-none focus:border-blue-500"
                  value={
                    key in matchStats.team_stats
                      ? String(
                          (matchStats.team_stats as Record<string, unknown>)[
                            key
                          ] ?? ""
                        )
                      : ""
                  }
                  disabled={!isMatchLeader}
                  placeholder={
                    isMatchLeader
                      ? "입력하세요"
                      : "HOST만 입력 가능합니다."
                  }
                  onChange={() => {}}
                />
              </form>
            ))}
          </div>
        </ModalLayer>
      )}
      {modal === "player" && currentPlayer !== -1 && (
        <ModalLayer
          toggleModalHandler={() => setModal("none")}
          shape="narrow"
          mode="white"
        >
          <div>
            <h3>
              {
                matchParticipants.find(
                  (p) => p.player_list_idx === currentPlayer
                )?.player_list_nickname
              }{" "}
              스탯
            </h3>
            {(() => {
              const stat = matchStats.player_stats.find(
                (p) => p.player_list_idx === currentPlayer
              );
              const editable = currentPlayer === userIdx;
              if (stat) {
                return statFields.map(({ key, label }) => (
                  <div key={key} className="mb-2 flex items-center gap-2">
                    <label className="w-32 text-xs font-semibold text-gray-800">
                      {label}
                    </label>
                    <input
                      className="border border-gray-500 rounded p-1 flex-1 bg-gray-800 text-white focus:outline-none focus:border-blue-500"
                      value={String(
                        (stat as Record<string, unknown>)[key] ?? ""
                      )}
                      disabled={!editable}
                      onChange={() => {}}
                    />
                  </div>
                ));
              } else {
                // stat이 없으면 빈 입력폼만 보여줌
                return statFields.map(({ key, label }) => (
                  <form key={key} className="mb-2 flex items-center gap-2">
                    <label className="w-32 text-xs font-semibold text-gray-800">
                      {label}
                    </label>
                    <input
                      className="border border-gray-500 rounded p-1 flex-1 bg-gray-800 text-white focus:outline-none focus:border-blue-500"
                      value={""}
                      disabled={!editable}
                      placeholder={
                        editable
                          ? "입력하세요"
                          : "다른 유저는 입력이 불가능 합니다."
                      }
                      onChange={() => {}}
                    />
                  </form>
                ));
              }
            })()}
          </div>
        </ModalLayer>
      )}
    </div>
  );
};

export default StatPanel;
