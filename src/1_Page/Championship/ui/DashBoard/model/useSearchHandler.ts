import React from "react";

const useSearchHandler = (
  initialPlayerStats: PlayerStats[]
): UseSearchHandlerReturn => {
  // playerStats를 내부 상태로 관리
  const [playerStats, setPlayerStats] = React.useState<PlayerStats[]>(
    initialPlayerStats || []
  );

  // 초기값 설정
  React.useEffect(() => {
    setPlayerStats(initialPlayerStats || []);
  }, [initialPlayerStats]);

  // idx를 통해 특정 선수 정보만 수정하는 핸들러 함수
  const handleUpdatePlayer = (
    playerListIdx: number,
    updatedStats: Partial<PlayerStats>
  ) => {
    setPlayerStats((prevStats) =>
      prevStats.map((player) =>
        player.player_list_idx === playerListIdx
          ? { ...player, ...updatedStats }
          : player
      )
    );
  };

  // 기존 검색 및 정렬 로직은 유지
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [sortConfig, setSortConfig] = React.useState<{
    key: keyof PlayerStats;
    direction: "asc" | "desc";
  }>({ key: "player_list_nickname", direction: "asc" });

  const handleSort = (key: keyof PlayerStats) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  // displayPlayerStats는 이제 내부 상태(playerStats)를 기반으로 계산
  const displayPlayerStats = React.useMemo(() => {
    if (!playerStats) return [];

    let filteredData = [...playerStats];

    // 검색어 필터링
    if (searchTerm) {
      filteredData = filteredData.filter((player) =>
        player.player_list_nickname
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }

    // 정렬
    const key = sortConfig.key;
    if (key) {
      filteredData.sort((a, b) => {
        const aVal = a[key];
        const bVal = b[key];
        if (aVal == null && bVal == null) return 0;
        if (aVal == null) return sortConfig.direction === "asc" ? -1 : 1;
        if (bVal == null) return sortConfig.direction === "asc" ? 1 : -1;
        if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filteredData;
  }, [playerStats, searchTerm, sortConfig]);

  return {
    searchTerm,
    setSearchTerm,
    sortConfig,
    handleSort,
    displayPlayerStats,
    handleUpdatePlayer, // 새로 추가된 핸들러
  };
};
export default useSearchHandler;
