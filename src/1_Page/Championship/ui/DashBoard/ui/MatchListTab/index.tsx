import React from "react";
import PlayerHistoryTable from "./ui/PlayerHistoryTable";
import VerticalTeamStatCards from "./ui/VerticalTeamStatCards";
import CreateChampionMatchPanel from "./ui/CreateChampionMatchPanel";
import ChampionshipMatchCard from "./ui/ChampionshipMatchCard";

import { VIEW_MODE, VIEW_MODE_BUTTONS } from "./constant/tab";
import useSearchTeamHandler from "./model/useSearchTeamHandler";
import useSelectHandler from "./model/useSelectHandler";
import { getMatchMaxStats } from "./lib/getMatchMaxStats";
import { formatDateForDisplay, isSameDate } from "./lib/dateUtils";

import FootballGroundSection from "../../../../../../2_Widget/FootballGroundSection";
import useGetChampionshipEvidence from "../../../../../../3_Entity/Championship/useGetChampionshipEvidence";
import useChampionshipInfoContext from "../../../../../../4_Shared/model/useChampionshipInfoContext";
import useMatchModalStore from "../../../../../../4_Shared/zustand/useMatchModal";
import { useAuthStore } from "../../../../../../4_Shared/lib/useMyInfo";
import useGetChampionshipDetail from "../../../../../../3_Entity/Championship/useGetChampionshipDetail";
import { days } from "./constant/days";
import { getTextColorFromBackground } from "../../../../../../4_Shared/lib/colorChecker";

const MatchListTab = (props: MatchListTabProps) => {
  const { matchList, filteredTeamList, matchHandlers, handleUpdatePlayer } =
    props;
  // context
  const { isCommunityOperator, isCommunityManager, championshipListColor } =
    useChampionshipInfoContext();

  // 1. 매치 선택 관련 상태 및 핸들러
  const {
    selectChampionshipMatchIdx,
    selectedMatch,
    handleMatchSelect,
    handleBackToList,
  } = useSelectHandler(matchList);

  const {
    searchTerm,
    handleSearchChange,
    selectedDate,
    handleSetSelectedDate,
    availableDates,
    selectedDateMatches,
  } = useSearchTeamHandler(matchList);

  const myTeamIdx = useAuthStore((state) => state.teamIdx);

  //api
  const [championshipMatchDetail] = useGetChampionshipDetail(
    selectChampionshipMatchIdx
  );
  const [evidenceImage] = useGetChampionshipEvidence(
    selectChampionshipMatchIdx
  );

  //zustand
  const { setMatchIdx, toggleMatchModal } = useMatchModalStore();

  // state
  const [activeTeam, setActiveTeam] = React.useState<0 | 1>(0);
  const [viewMode, setViewMode] = React.useState<VIEW_MODE>(VIEW_MODE.Lineup);

  // value
  const { maxGoal, maxAssist } = getMatchMaxStats(championshipMatchDetail);

  const firstTeamMatchInfo = selectedMatch?.championship_match_first;
  const secondTeamMatchInfo = selectedMatch?.championship_match_second;

  const team1PlayerStats =
    championshipMatchDetail?.first_team?.player_stats || [];
  const team2PlayerStats =
    championshipMatchDetail?.second_team?.player_stats || [];
  const personEvidenceImage = evidenceImage.player_evidence || [];

  return (
    <div>
      {selectChampionshipMatchIdx ? (
        <section className="w-full mx-auto bg-gray-800 rounded-lg shadow-md">
          {/* 매치 상세 정보 헤더 */}
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full flex items-center justify-center">
                <span className="text-xl">⚽</span>
              </div>
              매치 상세 정보
            </h2>
            <p className="text-gray-400">
              선수 포지션, 경기 통계, 그리고 상세 데이터를 확인하세요.
            </p>
            <div className="mt-3 flex items-center gap-4 text-sm text-gray-500">
              <button
                onClick={handleBackToList}
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-gray-200 hover:text-white group">
                <span className="text-lg group-hover:translate-x-[-2px] transition-transform">
                  ←
                </span>
                매치 목록으로
              </button>
            </div>
          </div>

          {/* 매치 상세 컨텐츠 */}
          <div className="p-6">
            {/* 상단 네비게이션 */}
            <nav className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3 lg:mb-6 lg:gap-4">
              {/* 뷰 모드 탭 버튼 */}
              <div className="flex overflow-x-auto space-x-2 p-1 rounded-lg scrollbar-hide w-full lg:w-auto lg:p-2 lg:rounded-md">
                {VIEW_MODE_BUTTONS.map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => setViewMode(id)}
                    className={`flex-shrink-0 px-5 py-3 rounded-full text-base font-semibold transition lg:px-4 lg:py-2 lg:text-sm lg:font-medium ${
                      viewMode === id
                        ? "bg-blue-600 text-white"
                        : "bg-gray-700 text-gray-200 hover:bg-gray-600"
                    }`}
                    style={
                      viewMode === id
                        ? { backgroundColor: championshipListColor }
                        : undefined
                    }>
                    {label}
                  </button>
                ))}
              </div>

              {/* 내 팀 매치 상세보기 버튼 */}
              {selectedMatch && firstTeamMatchInfo && secondTeamMatchInfo && (
                <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                  {firstTeamMatchInfo.team_list_idx === myTeamIdx && (
                    <button
                      className="min-w-[200px] px-4 py-2 rounded border-2"
                      style={{
                        borderColor: firstTeamMatchInfo.team_list_color,
                      }}
                      onClick={() => {
                        setMatchIdx(firstTeamMatchInfo.match_match_idx);
                        toggleMatchModal();
                      }}>
                      {firstTeamMatchInfo.team_list_name}
                      <div>매치 상세보기</div>
                    </button>
                  )}
                  {secondTeamMatchInfo.team_list_idx === myTeamIdx && (
                    <button
                      className="min-w-[200px] px-4 py-2 rounded border-2"
                      style={{
                        borderColor: secondTeamMatchInfo.team_list_color,
                      }}
                      onClick={() => {
                        setMatchIdx(secondTeamMatchInfo.match_match_idx);
                        toggleMatchModal();
                      }}>
                      {secondTeamMatchInfo.team_list_name}
                      <div>매치 상세보기</div>
                    </button>
                  )}
                </div>
              )}
            </nav>

            {/* 뷰 모드별 컨텐츠 */}
            {viewMode === VIEW_MODE.Team && (
              <div className="container mx-auto px-0 py-3 lg:px-4 lg:py-6">
                <VerticalTeamStatCards
                  championshipMatchDetail={championshipMatchDetail}
                  matchList={selectedMatch}
                  evidenceImage={evidenceImage}
                  handleUpdateMatchScore={matchHandlers.handleUpdateMatchScore}
                />
              </div>
            )}

            {viewMode === VIEW_MODE.Personal && (
              <div className="container mx-auto px-0 py-3 lg:px-4 lg:py-6">
                <div className="w-full mx-auto px-2 py-4 space-y-6 lg:p-4 lg:space-y-6 lg:max-w-6xl">
                  {/* 모바일: 탭 전환 */}
                  <div className="lg:hidden">
                    <div className="flex w-full space-x-1 bg-gray-800 p-1.5 rounded-xl lg:space-x-2 lg:p-2">
                      {[firstTeamMatchInfo, secondTeamMatchInfo].map(
                        (team, index) => (
                          <button
                            key={index}
                            onClick={() => setActiveTeam(index as 0 | 1)}
                            className={`flex-1 py-3 px-3 text-lg font-semibold rounded-lg transition-colors lg:py-4 lg:px-6 ${
                              activeTeam === index
                                ? "bg-gray-700 text-gray-100 shadow-sm"
                                : "text-gray-400 hover:text-gray-100"
                            }`}
                            style={
                              activeTeam === index && team?.team_list_color
                                ? { backgroundColor: team.team_list_color }
                                : undefined
                            }>
                            {team?.team_list_name || ""}
                          </button>
                        )
                      )}
                    </div>

                    <div className="mt-6 overflow-x-auto lg:mt-10">
                      <PlayerHistoryTable
                        players={
                          activeTeam === 0 ? team1PlayerStats : team2PlayerStats
                        }
                        teamLabel={
                          (activeTeam === 0
                            ? firstTeamMatchInfo?.team_list_name
                            : secondTeamMatchInfo?.team_list_name) || ""
                        }
                        maxGoal={maxGoal}
                        maxAssist={maxAssist}
                        personEvidenceImage={personEvidenceImage}
                        handleUpdatePlayer={handleUpdatePlayer}
                      />
                    </div>
                  </div>

                  {/* 데스크톱: 2열 */}
                  <div className="hidden lg:grid grid-cols-2 gap-6">
                    <PlayerHistoryTable
                      players={team1PlayerStats}
                      teamLabel={firstTeamMatchInfo?.team_list_name || ""}
                      maxGoal={maxGoal}
                      maxAssist={maxAssist}
                      personEvidenceImage={personEvidenceImage}
                      handleUpdatePlayer={handleUpdatePlayer}
                    />
                    <PlayerHistoryTable
                      players={team2PlayerStats}
                      teamLabel={secondTeamMatchInfo?.team_list_name || ""}
                      maxGoal={maxGoal}
                      maxAssist={maxAssist}
                      personEvidenceImage={personEvidenceImage}
                      handleUpdatePlayer={handleUpdatePlayer}
                    />
                  </div>
                </div>
              </div>
            )}

            {viewMode === VIEW_MODE.Lineup && (
              <div>
                <div className="flex justify-center items-center gap-3 mb-3 lg:gap-4 lg:mb-4">
                  <h2 className="text-lg font-bold lg:text-xl">
                    {firstTeamMatchInfo?.team_list_name || ""}
                    {`(${
                      firstTeamMatchInfo?.match_team_stats_our_score ?? ""
                    })`}
                  </h2>
                  <span className="text-lg font-bold text-gray-300 lg:text-xl">
                    VS
                  </span>
                  <h2 className="text-lg font-bold lg:text-xl">
                    {secondTeamMatchInfo?.team_list_name || ""}{" "}
                    {`(${
                      secondTeamMatchInfo?.match_team_stats_our_score ?? ""
                    })`}
                  </h2>
                </div>

                <h2 className="text-lg font-bold mb-3 text-center lg:text-xl lg:mb-4">
                  매치 #{selectChampionshipMatchIdx} 라인업
                </h2>

                <div className="flex flex-col md:flex-row flex-wrap justify-center gap-3 lg:gap-4">
                  <div className="w-full max-w-4xl mx-auto">
                    <FootballGroundSection
                      championshipDetail={championshipMatchDetail}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      ) : (
        <section className="w-full mx-auto bg-gray-800 rounded-lg shadow-md">
          {/* 매치 목록 헤더 */}
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full flex items-center justify-center">
                <span className="text-xl">⚽</span>
              </div>
              매치 목록
            </h2>
            <p className="text-gray-400">
              대회의 모든 매치를 확인하고 상세 정보를 볼 수 있습니다. 매치를
              클릭하여 선수 라인업과 통계를 확인하세요.
            </p>
            {matchList.length > 0 && (
              <div className="mt-3 flex items-center gap-4 text-sm text-gray-500">
                <span>총 {matchList.length}개 매치</span>
                <span>•</span>
                <span>
                  완료된 매치:{" "}
                  {
                    matchList.filter(
                      (match) =>
                        match?.championship_match_first?.common_status_idx === 4
                    ).length
                  }
                  개
                </span>
              </div>
            )}
          </div>

          {/* 검색 및 관리자 기능 영역 */}
          <div className="p-6 flex flex-col md:flex-row items-center gap-6">
            {/* 검색창 */}
            <div className="relative group w-full md:flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${championshipListColor}, ${championshipListColor}CC)`,
                  }}>
                  <span className="text-white text-xs">🔍</span>
                </div>
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="팀명으로 검색하세요..."
                className="w-full pl-14 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white focus:outline-none focus:bg-white/20 "
              />
            </div>

            {/* 관리자 전용 매치 생성 패널 */}
            {(isCommunityOperator || isCommunityManager) && (
              <div className="w-full md:w-auto">
                <CreateChampionMatchPanel
                  handleBackToList={handleBackToList}
                  handleMatchSelect={handleMatchSelect}
                  handleAddMatch={matchHandlers.handleAddMatch}
                  handleSyncMatchIdx={matchHandlers.handleSyncMatchIdx}
                  handleDeleteMatch={matchHandlers.handleDeleteMatch}
                  filteredTeamList={filteredTeamList}
                />
              </div>
            )}
          </div>

          {/* 날짜 네비게이션 */}
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">경기 일정</h3>
              <div className="flex items-center gap-3">
                <div
                  className="text-sm font-medium"
                  style={{ color: championshipListColor }}>
                  {formatDateForDisplay(selectedDate)}
                </div>
                {selectedDateMatches.length > 0 && (
                  <div
                    className="px-2 py-1 rounded-full text-xs font-bold"
                    style={{
                      backgroundColor: `${championshipListColor}33`,
                      color: championshipListColor,
                    }}>
                    {selectedDateMatches.length}경기
                  </div>
                )}
              </div>
            </div>

            {/* 날짜 스크롤 네비게이션 */}
            <div className="flex overflow-x-auto space-x-2 pb-2 scrollbar-hide">
              {availableDates.map((date, index) => {
                const isSelected = isSameDate(date, selectedDate);
                const isToday = isSameDate(date, new Date());
                return (
                  <button
                    key={index}
                    onClick={() => handleSetSelectedDate(date)}
                    className={`flex-shrink-0 flex flex-col items-center px-4 py-3 rounded-xl transition-all duration-200 min-w-[70px] relative ${
                      isSelected
                        ? "text-gray-900 shadow-lg"
                        : isToday
                        ? "text-gray-300 hover:bg-gray-600/50"
                        : "bg-gray-700/50 text-gray-300 hover:bg-gray-600/50"
                    }`}
                    style={
                      isSelected
                        ? { backgroundColor: championshipListColor }
                        : isToday
                        ? {
                            backgroundColor: `${championshipListColor}33`,
                            color: getTextColorFromBackground(
                              championshipListColor
                            ),
                          }
                        : undefined
                    }>
                    <div className="text-xs font-medium mb-1">
                      {days[date.getDay()]}
                    </div>
                    <div
                      className={`text-lg font-bold`}
                      style={
                        isToday && !isSelected
                          ? { color: championshipListColor }
                          : undefined
                      }>
                      {formatDateForDisplay(date)}
                    </div>
                    {isToday && (
                      <div
                        className="w-1 h-1 rounded-full mt-1"
                        style={{
                          backgroundColor: championshipListColor,
                        }}></div>
                    )}
                    {!isSelected && (
                      <div className="absolute top-1 right-1 w-2 h-2 bg-blue-400 rounded-full"></div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 매치 목록 또는 빈 상태 */}
          <div className="p-6 min-h-[600px]">
            {selectedDateMatches.length > 0 ? (
              <div className="space-y-4">
                {selectedDateMatches.map((match, index) => (
                  <ChampionshipMatchCard
                    key={`selected-date-match-${index}`}
                    match={match}
                    handleMatchSelect={handleMatchSelect}
                    isMyTeam={
                      match.championship_match_first?.team_list_idx ===
                        myTeamIdx ||
                      match.championship_match_second?.team_list_idx ===
                        myTeamIdx
                    }
                    {...matchHandlers}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="flex flex-col items-center gap-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-white/10 via-white/15 to-white/5 rounded-3xl flex items-center justify-center shadow-2xl backdrop-blur-md border border-white/20">
                    <span className="text-5xl">
                      {formatDateForDisplay(selectedDate) ? "🔍" : "⚽"}
                    </span>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-white">
                      {formatDateForDisplay(selectedDate)
                        ? "검색 결과가 없습니다"
                        : "등록된 매치가 없습니다"}
                    </h3>
                    <p className="text-gray-300 max-w-md mx-auto leading-relaxed text-lg">
                      {formatDateForDisplay(selectedDate)
                        ? `"${formatDateForDisplay(
                            selectedDate
                          )}"에 대한 검색 결과를 찾을 수 없습니다. 다른 키워드로 시도해보세요.`
                        : "아직 생성된 매치가 없습니다. 새로운 매치를 생성하여 대회를 시작해보세요."}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default MatchListTab;
