import React from "react";
import PlayerHistoryTable from "./ui/PlayerHistoryTable";
import VerticalTeamStatCards from "./ui/VerticalTeamStatCards";
import ChampionshipMatchCard from "./ui/ChampionshipMatchCard";
import CreateChampionMatchPanel from "./ui/CreateChampionMatchPanel";
import EmptySearchResult from "./ui/EmptySearchResult";

import { VIEW_MODE, VIEW_MODE_BUTTONS } from "./constant/tab";
import useSearchTeamHandler from "./model/useSearchTeamHandler";
import useSelectHandler from "./model/useSelectHandler";
import { getMatchMaxStats } from "./lib/getMatchMaxStats";

// MOD: 날짜 네비게이션 및 매치 분류 유틸 함수
const generateDateNavigation = () => {
  const today = new Date();
  const dates: Date[] = [];

  // 현재 날짜 기준 ±7일 생성 (실제로는 매치 데이터의 날짜를 사용)
  for (let i = -7; i <= 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push(date);
  }

  return dates;
};

const categorizeMatchesByDate = (matches: ChampionshipMatchList[]) => {
  // 임시로 모든 매치를 선택된 날짜로 분류 (실제로는 match.match_date 사용)
  const selectedDateMatches: ChampionshipMatchList[] = matches;

  return { selectedDateMatches };
};

const formatDateForDisplay = (date: Date) => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return "오늘";
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return "내일";
  } else if (date.toDateString() === yesterday.toDateString()) {
    return "어제";
  }

  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
};

import FootballGroundSection from "../../../../../../2_Widget/FootballGroundSection";
import useGetChampionshipEvidence from "../../../../../../3_Entity/Championship/useGetChampionshipEvidence";
import useChampionshipInfoContext from "../../../../../../4_Shared/model/useChampionshipInfoContext";
import useMatchModalStore from "../../../../../../4_Shared/zustand/useMatchModal";
import ChevronDownIcon from "../../../../../../4_Shared/assets/svg/ChevronDown.svg";
import ChevronUpIcon from "../../../../../../4_Shared/assets/svg/ChevronUp.svg";
import { useAuthStore } from "../../../../../../4_Shared/lib/useMyInfo";
import useGetChampionshipDetail from "../../../../../../3_Entity/Championship/useGetChampionshipDetail";

const MatchListTab = (props: MatchListTabProps) => {
  const { matchList, filteredTeamList, matchHandlers, handleUpdatePlayer } =
    props;

  console.log(matchList);
  // state
  const {
    selectChampionshipMatchIdx,
    selectedMatch,
    isMatchDetailView,
    handleMatchSelect,
    handleBackToList,
  } = useSelectHandler(matchList);
  const firstTeam = selectedMatch?.championship_match_first;
  const secondTeam = selectedMatch?.championship_match_second;
  // 필터링 매치 훅
  const { filteredMatches, searchTerm, myMatchList, handleSearchChange } =
    useSearchTeamHandler(matchList);

  // MOD: 날짜별로 매치 분류 및 날짜 네비게이션
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const availableDates = generateDateNavigation();
  const { selectedDateMatches } = categorizeMatchesByDate(filteredMatches);
  const dateScrollRef = React.useRef<HTMLDivElement>(null);

  // 오늘 날짜를 중앙에 위치시키는 useEffect
  React.useEffect(() => {
    const scrollToToday = () => {
      if (dateScrollRef.current) {
        const today = new Date();
        const todayIndex = availableDates.findIndex(
          (date) => date.toDateString() === today.toDateString()
        );

        if (todayIndex !== -1) {
          const scrollContainer = dateScrollRef.current;
          const buttonWidth = 86; // min-w-[70px] + padding 추정값
          const containerWidth = scrollContainer.clientWidth;
          const scrollPosition =
            todayIndex * buttonWidth - containerWidth / 2 + buttonWidth / 2;

          scrollContainer.scrollTo({
            left: Math.max(0, scrollPosition),
            behavior: "smooth",
          });
        }
      }
    };

    // 컴포넌트 마운트 후 스크롤 위치 조정
    const timer = setTimeout(scrollToToday, 100);
    return () => clearTimeout(timer);
  }, [availableDates]);

  const [activeTeam, setActiveTeam] = React.useState<0 | 1>(0);
  const [viewMode, setViewMode] = React.useState<VIEW_MODE>(VIEW_MODE.Lineup);
  const [isMyMatchesOpen, setIsMyMatchesOpen] = React.useState(true);
  const myTeamIdx = useAuthStore((state) => state.teamIdx);

  const [championshipMatchDetail] = useGetChampionshipDetail(
    selectChampionshipMatchIdx
  );

  // championshipMatchIdx에 해당하는 증거 이미지 필터링
  const [evidenceImage] = useGetChampionshipEvidence(
    selectChampionshipMatchIdx
  );

  // admin
  const { isCommunityOperator, isCommunityManager, championshipListColor } =
    useChampionshipInfoContext();

  // zustand
  const { setMatchIdx, toggleMatchModal } = useMatchModalStore();

  const { maxGoal, maxAssist } = getMatchMaxStats(championshipMatchDetail);

  const selectTeamList = [
    firstTeam?.team_list_name,
    secondTeam?.team_list_name,
  ];

  const team1PlayerStats =
    championshipMatchDetail?.first_team?.player_stats || [];
  const team2PlayerStats =
    championshipMatchDetail?.second_team?.player_stats || [];
  const personEvidenceImage = evidenceImage.player_evidence || [];

  return (
    <div>
      {isMatchDetailView ? (
        /* 매치 상세 보기 */
        <div className="bg-gray-800 rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center gap-4">
              <button
                onClick={handleBackToList}
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-gray-200 hover:text-white group">
                <span className="text-lg group-hover:translate-x-[-2px] transition-transform">
                  ←
                </span>
                매치 목록으로
              </button>
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  매치 상세 정보
                </h2>
                <p className="text-gray-400 mt-1">
                  선수 포지션, 경기 통계, 그리고 상세 데이터를 확인하세요
                </p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="px-2 py-3 text-gray-100 lg:p-4">
              {!selectChampionshipMatchIdx ? (
                /* 매치 미선택 안내 – 어두운 배경·밝은 텍스트 */
                <div className="flex flex-col items-center justify-center h-full py-8 lg:py-10">
                  <div className="bg-gray-800 rounded-full p-3 mb-3 lg:p-4 lg:mb-4">
                    <span className="text-gray-300 text-xl lg:text-2xl">
                      {"⚽"}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-gray-100 mb-2 lg:text-lg lg:font-medium">
                    매치를 선택해주세요
                  </h3>
                  <p className="text-sm text-gray-400 text-center max-w-md px-4 lg:px-0">
                    왼쪽 패널에서 확인하고 싶은 매치를 선택하면 상세 정보가
                    표시됩니다.
                  </p>
                </div>
              ) : (
                <div>
                  {/* 매치 선택시 */}

                  {/* 상단 탭 네비게이션 */}
                  <nav className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3 lg:mb-6 lg:gap-4">
                    {/* 스크롤 가능한 탭 버튼 목록 */}
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

                    {/* 상세 보기 버튼 */}
                    {selectedMatch && firstTeam && secondTeam && (
                      <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                        {firstTeam.team_list_idx === myTeamIdx && (
                          <button
                            className="px-4 py-2 rounded-lg text-sm font-semibold border-2 transition-colors duration-200 w-full"
                            style={{
                              borderColor: firstTeam.team_list_color,
                            }}
                            onClick={() => {
                              setMatchIdx(firstTeam.match_match_idx);
                              toggleMatchModal();
                            }}>
                            {firstTeam.team_list_name} {"스탯을 입력하세요"}
                          </button>
                        )}
                        {secondTeam.team_list_idx === myTeamIdx && (
                          <button
                            className="px-4 py-2 rounded-lg text-sm font-semibold border-2 transition-colors duration-200 w-full"
                            style={{
                              borderColor: secondTeam.team_list_color,
                            }}
                            onClick={() => {
                              setMatchIdx(secondTeam.match_match_idx);
                              toggleMatchModal();
                            }}>
                            {secondTeam.team_list_name} {"스탯을 입력하세요"}
                          </button>
                        )}
                      </div>
                    )}
                  </nav>

                  {viewMode === VIEW_MODE.Team ? (
                    /* 팀 통계 카드 – 필터링된 증거 이미지 사용 */
                    <div className="container mx-auto px-0 py-3 lg:px-4 lg:py-6">
                      <VerticalTeamStatCards
                        firstTeam={{
                          teamListIdx:
                            championshipMatchDetail?.first_team
                              ?.team_list_idx || 0,
                          name: firstTeam?.team_list_name || "",
                          stats: championshipMatchDetail?.first_team?.stats,
                          players: team1PlayerStats,
                          evidenceImage:
                            evidenceImage?.first_team_evidence ?? [],
                          matchIdx: firstTeam?.match_match_idx || 0,
                        }}
                        secondTeam={{
                          teamListIdx:
                            championshipMatchDetail?.second_team
                              ?.team_list_idx || 0,
                          name: secondTeam?.team_list_name || "",
                          stats: championshipMatchDetail?.second_team?.stats,
                          players: team2PlayerStats,
                          evidenceImage:
                            evidenceImage?.second_team_evidence ?? [],
                          matchIdx: secondTeam?.match_match_idx || 0,
                        }}
                        handleUpdateMatchScore={
                          matchHandlers.handleUpdateMatchScore
                        }
                      />
                    </div>
                  ) : viewMode === VIEW_MODE.Personal ? (
                    /* 개인 기록 보기 – 필터링된 증거 이미지 사용 */
                    <div className="container mx-auto px-0 py-3 lg:px-4 lg:py-6">
                      <div className="w-full mx-auto px-2 py-4 space-y-6 lg:p-4 lg:space-y-6 lg:max-w-6xl">
                        {/* 모바일: 탭 전환 */}
                        <div className="lg:hidden">
                          <div className="flex w-full space-x-1 bg-gray-800 p-1.5 rounded-xl lg:space-x-2 lg:p-2">
                            {(selectTeamList || []).map((teamName, index) => (
                              <button
                                key={index}
                                onClick={() => setActiveTeam(index as 0 | 1)}
                                className={`flex-1 py-3 px-3 text-lg font-semibold rounded-lg transition-colors lg:py-4 lg:px-6 ${
                                  activeTeam === index
                                    ? "bg-gray-700 text-gray-100 shadow-sm"
                                    : "text-gray-400 hover:text-gray-100"
                                }`}>
                                {teamName}
                              </button>
                            ))}
                          </div>

                          <div className="mt-6 overflow-x-auto lg:mt-10">
                            <PlayerHistoryTable
                              players={
                                activeTeam === 0
                                  ? team1PlayerStats
                                  : team2PlayerStats
                              }
                              teamLabel={
                                (activeTeam === 0
                                  ? firstTeam?.team_list_name
                                  : secondTeam?.team_list_name) || ""
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
                            teamLabel={firstTeam?.team_list_name || ""}
                            maxGoal={maxGoal}
                            maxAssist={maxAssist}
                            personEvidenceImage={personEvidenceImage}
                            handleUpdatePlayer={handleUpdatePlayer}
                          />
                          <PlayerHistoryTable
                            players={team2PlayerStats}
                            teamLabel={secondTeam?.team_list_name || ""}
                            maxGoal={maxGoal}
                            maxAssist={maxAssist}
                            personEvidenceImage={personEvidenceImage}
                            handleUpdatePlayer={handleUpdatePlayer}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* 라인업/포메이션 영역 – 기존 코드 그대로 */
                    <div>
                      <div className="flex justify-center items-center gap-3 mb-3 lg:gap-4 lg:mb-4">
                        <h2 className="text-lg font-bold lg:text-xl">
                          {firstTeam?.team_list_name || ""}
                          {`(${firstTeam?.match_team_stats_our_score ?? ""})`}
                        </h2>
                        <span className="text-lg font-bold text-gray-300 lg:text-xl">
                          VS
                        </span>
                        <h2 className="text-lg font-bold lg:text-xl">
                          {secondTeam?.team_list_name || ""}{" "}
                          {`(${secondTeam?.match_team_stats_our_score ?? ""})`}
                        </h2>
                      </div>

                      <h2 className="text-lg font-bold mb-3 text-center lg:text-xl lg:mb-4">
                        매치 #{selectChampionshipMatchIdx} 라인업
                      </h2>

                      <div className="flex flex-col md:flex-row flex-wrap justify-center gap-3 lg:gap-4">
                        {/* FotMob 스타일 통합 축구장 */}
                        <div className="w-full max-w-4xl mx-auto">
                          <FootballGroundSection
                            championshipDetail={championshipMatchDetail}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* 매치 리스트 보기 */
        <div className="bg-gray-800 rounded-lg shadow-md">
          {/* 헤더 */}
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
                      (m) => m.championship_match_first.common_status_idx === 4
                    ).length
                  }
                  개
                </span>
              </div>
            )}
          </div>

          {/* 내 팀 목록 */}
          {myMatchList.length > 0 && (
            <div className="p-6 border-b border-gray-700">
              <div
                className="flex items-center justify-between mb-4 cursor-pointer"
                onClick={() => setIsMyMatchesOpen((prev) => !prev)}>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-gradient-to-r from-grass to-grass/80 flex items-center justify-center text-lg">
                    ⭐
                  </span>
                  내 팀 경기 목록
                </h3>
                <div className="flex items-center gap-4">
                  <span className="text-gray-400 text-sm">
                    총 {myMatchList.length}개 경기
                  </span>
                  <button className="p-1 rounded-full hover:bg-gray-700 transition-colors">
                    <img
                      src={isMyMatchesOpen ? ChevronUpIcon : ChevronDownIcon}
                      alt={isMyMatchesOpen ? "접기" : "펼치기"}
                      className="w-6 h-6"
                    />
                  </button>
                </div>
              </div>
              {isMyMatchesOpen && (
                <div className="flex overflow-x-auto space-x-6 pb-4 -mx-6 px-6 modern-scrollbar">
                  {myMatchList.map((match, index) => (
                    <div
                      key={`my-match-${index}`}
                      className="w-80 flex-shrink-0 transform transition-all duration-300 hover:scale-[1.03]">
                      <ChampionshipMatchCard
                        {...matchHandlers}
                        isSelected={
                          selectChampionshipMatchIdx ===
                          match.championship_match_idx
                        }
                        handleSelect={handleMatchSelect}
                        match={match}
                        isListViewMode={true}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 검색 및 관리자 기능 영역 */}
          <div className="p-6 flex flex-col md:flex-row items-center gap-6">
            {/* 검색창 */}
            <div className="relative group w-full md:flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <div className="w-5 h-5 rounded-full bg-gradient-to-r from-grass to-grass/80 flex items-center justify-center">
                  <span className="text-white text-xs">🔍</span>
                </div>
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="팀명으로 검색하세요..."
                className="w-full pl-14 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:bg-white/20 focus:border-grass/40 focus:ring-2 focus:ring-grass/20 transition-all duration-300 group-hover:bg-white/15"
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

          {/* MOD: 날짜 네비게이션 */}
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">경기 일정</h3>
              <div className="text-sm text-grass font-medium">
                {formatDateForDisplay(selectedDate)}
              </div>
            </div>

            {/* 날짜 스크롤 네비게이션 */}
            <div
              ref={dateScrollRef}
              className="flex overflow-x-auto space-x-2 pb-2 scrollbar-hide">
              {availableDates.map((date, index) => {
                const isSelected =
                  date.toDateString() === selectedDate.toDateString();
                const isToday =
                  date.toDateString() === new Date().toDateString();

                return (
                  <button
                    key={index}
                    onClick={() => setSelectedDate(date)}
                    className={`flex-shrink-0 flex flex-col items-center px-4 py-3 rounded-xl transition-all duration-200 min-w-[70px] ${
                      isSelected
                        ? "bg-grass text-gray-900 shadow-lg"
                        : isToday
                        ? "bg-grass/20 text-grass hover:bg-grass/30"
                        : "bg-gray-700/50 text-gray-300 hover:bg-gray-600/50"
                    }`}>
                    <div className="text-xs font-medium mb-1">
                      {
                        ["일", "월", "화", "수", "목", "금", "토"][
                          date.getDay()
                        ]
                      }
                    </div>
                    <div
                      className={`text-lg font-bold ${
                        isToday && !isSelected ? "text-grass" : ""
                      }`}>
                      {date.getDate()}
                    </div>
                    {isToday && (
                      <div className="w-1 h-1 bg-grass rounded-full mt-1"></div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* MOD: 선택된 날짜의 매치 리스트 */}
          <div className="p-6">
            {selectedDateMatches.length > 0 ? (
              <div className="space-y-4">
                {selectedDateMatches.map((match, index) => (
                  <div
                    key={`selected-date-match-${index}`}
                    onClick={() =>
                      handleMatchSelect(match.championship_match_idx)
                    }
                    className={`group relative bg-white/5 rounded-2xl p-4 cursor-pointer transition-all duration-300 hover:bg-white/10 border border-white/10 hover:border-white/20 ${
                      selectChampionshipMatchIdx ===
                      match.championship_match_idx
                        ? "ring-2 ring-grass/60 bg-grass/10 border-grass/40"
                        : ""
                    }`}>
                    {/* 매치 시간 및 상태 */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-sm text-gray-400">
                        {`${String(new Date().getHours()).padStart(
                          2,
                          "0"
                        )}:${String(new Date().getMinutes()).padStart(2, "0")}`}
                      </div>
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          match.championship_match_first.common_status_idx === 4
                            ? "bg-grass/20 text-grass"
                            : "bg-amber-500/20 text-amber-200"
                        }`}>
                        {match.championship_match_first.common_status_idx === 4
                          ? "종료"
                          : "예정"}
                      </div>
                    </div>

                    {/* 팀 정보 및 점수 */}
                    <div className="flex items-center justify-between">
                      {/* 홈팀 */}
                      <div className="flex items-center space-x-3 flex-1">
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-white/10 flex items-center justify-center">
                          {match.championship_match_first.team_list_emblem ? (
                            <img
                              src={
                                match.championship_match_first.team_list_emblem
                              }
                              alt="홈팀"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div
                              className="w-full h-full rounded-full flex items-center justify-center text-white text-xs font-bold"
                              style={{
                                backgroundColor:
                                  match.championship_match_first
                                    .team_list_color,
                              }}>
                              {
                                match.championship_match_first
                                  .team_list_short_name
                              }
                            </div>
                          )}
                        </div>
                        <div className="text-white font-medium text-left">
                          {match.championship_match_first.team_list_name}
                        </div>
                      </div>

                      {/* 점수 */}
                      <div className="flex items-center space-x-4 mx-6">
                        <div className="text-2xl font-bold text-white">
                          {match.championship_match_first
                            .match_team_stats_our_score || 0}
                        </div>
                        <div className="text-gray-500">-</div>
                        <div className="text-2xl font-bold text-white">
                          {match.championship_match_second
                            .match_team_stats_our_score || 0}
                        </div>
                      </div>

                      {/* 어웨이팀 */}
                      <div className="flex items-center space-x-3 flex-1 justify-end">
                        <div className="text-white font-medium text-right">
                          {match.championship_match_second.team_list_name}
                        </div>
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-white/10 flex items-center justify-center">
                          {match.championship_match_second.team_list_emblem ? (
                            <img
                              src={
                                match.championship_match_second.team_list_emblem
                              }
                              alt="어웨이팀"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div
                              className="w-full h-full rounded-full flex items-center justify-center text-white text-xs font-bold"
                              style={{
                                backgroundColor:
                                  match.championship_match_second
                                    .team_list_color,
                              }}>
                              {
                                match.championship_match_second
                                  .team_list_short_name
                              }
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* 호버 효과 및 관리자 버튼 */}
                    {(isCommunityOperator || isCommunityManager) &&
                      match.championship_match_first.common_status_idx !==
                        4 && (
                        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (confirm("정말 삭제하시겠습니까?"))
                                matchHandlers.handleDeleteMatch(
                                  match.championship_match_idx
                                );
                            }}
                            className="w-6 h-6 rounded-full bg-red-500/80 text-white text-xs hover:bg-red-600 transition-colors">
                            ×
                          </button>
                        </div>
                      )}
                  </div>
                ))}
              </div>
            ) : (
              <EmptySearchResult
                searchTerm={formatDateForDisplay(selectedDate)}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchListTab;
