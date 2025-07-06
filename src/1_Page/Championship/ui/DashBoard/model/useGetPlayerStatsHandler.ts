import React from "react";
import useGetPlayerStats from "../../../../../3_Entity/Championship/useGetPlayerStats";
import useParamInteger from "../../../../../4_Shared/model/useParamInteger";

const useGetPlayerStatsHandler = (): UseGetPlayerStatsHandlerReturn => {
  const championshipIdx = useParamInteger("championshipIdx");
  const [playerStats] = useGetPlayerStats(championshipIdx);

  const [optimisticPlayerStats, setOptimisticPlayerStats] = React.useState<
    PlayerStats[]
  >([]);

  // 초기값 설정
  React.useEffect(() => {
    setOptimisticPlayerStats(playerStats || []);
  }, [playerStats]);

  // idx를 통해 특정 선수 정보만 수정하는 핸들러 함수
  const handleUpdatePlayer = (
    playerListIdx: number,
    updatedStats: Partial<PlayerStats>
  ) => {
    setOptimisticPlayerStats((prevStats) =>
      prevStats.map((player) =>
        player.player_list_idx === playerListIdx
          ? { ...player, ...updatedStats }
          : player
      )
    );
  };
  return {
    optimisticPlayerStats,
    handleUpdatePlayer,
  };
};
export default useGetPlayerStatsHandler;
