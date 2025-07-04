import React from "react";

const useSearchHandler = (
  playerStats: PlayerStats[]
): UseSearchHandlerReturn => {
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
  };
};
export default useSearchHandler;
