import React from "react";
import useSortHandler from "./model/useSortHandler";
import MatchCard from "./ui/MatchCard";
import MatchLineup from "./ui/MatchLineup";

const MatchListContainer = (props: MatchListContainerProps) => {
  const { matchList } = props;
  const [selectedIdx, setSelectedIdx] = React.useState<number>(-1);
  const handleSelect = (idx: number) => setSelectedIdx(idx);
  const {
    searchTerm,
    sortOption,
    handleSearchChange,
    handleSortChange,
    sortedMatches,
  } = useSortHandler(matchList);

  return (
    <div className="w-full mx-auto flex flex-col md:flex-row gap-4">
      {/* 매치 결과 리스트 (좌측) */}
      <div className="max-w-md w-full flex-shrink-0">
        <h2 className="text-lg font-bold text-blue-700 mb-4">매치 결과</h2>
        {/* 검색 및 정렬 옵션 UI */}
        <div className="flex gap-4 mb-6 bg-white p-4 rounded-lg shadow-md">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="🔍 팀명 검색"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          />
          <select
            value={sortOption}
            onChange={handleSortChange}
            className="border border-gray-300 rounded-lg px-4 py-2 bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all">
            <option value="default">정렬 없음</option>
            <option value="asc">매치번호 ↑</option>
            <option value="desc">매치번호 ↓</option>
          </select>
        </div>
        <ul className="space-y-3 w-full max-h-[470px] overflow-y-scroll overflow-x-hidden cursor-pointer flex flex-col items-center">
          {sortedMatches.map((match, index) => (
            <MatchCard
              selectedIdx={selectedIdx}
              handleSelect={handleSelect}
              match={match}
              index={index}
            />
          ))}
        </ul>
      </div>

      {/* MatchLineup (반응형 적용) */}
      <div className="flex-1 min-h-[500px] bg-gray-100 p-4 overflow-x-auto md:overflow-visible">
        <MatchLineup matchIdx={selectedIdx} />
      </div>
    </div>
  );
};

export default MatchListContainer;
