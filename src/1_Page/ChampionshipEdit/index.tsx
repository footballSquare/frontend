import { useFieldArray, FormProvider } from "react-hook-form";
import React from "react";
import { matchCount } from "../../4_Shared/constant/matchCount";
import { CHAMPIONSHIP_EDIT_TAB } from "./constant/tab";
import useManageSearchParam from "./lib/useManageSearchParam";

import TeamTab from "./ui/TeamTab";
import AwardTab from "./ui/AwardTab";
import BasicTab from "./ui/BasicTab";
import DateTab from "./ui/DateTab";

import { championshipTypes } from "../../4_Shared/constant/championshipTypes";
import EditRequest from "./ui/EditRequest";
import { calculateProgress } from "./lib/calculateProgress";
import { getTextColorFromBackground } from "../../4_Shared/lib/colorChecker";
import useChanpionshipForm from "./model/useChampionshipForm";

// SVG 아이콘 imports
import menuLinesIcon from "../../4_Shared/assets/svg/menu-lines.svg";
import usersGroupIcon from "../../4_Shared/assets/svg/users-group.svg";
import awardIcon from "../../4_Shared/assets/svg/award.svg";
import calendarIcon from "../../4_Shared/assets/svg/calendar.svg";
import chevronRightIcon from "../../4_Shared/assets/svg/chevron-right.svg";

const ChampionshipForm = () => {
  const { isEditMode, communityIdx } = useManageSearchParam();

  const [activeTab, setActiveTab] = React.useState<ChampionshipEditTab>(
    CHAMPIONSHIP_EDIT_TAB.BASIC
  );
  const { method, onValid, onInvalid } = useChanpionshipForm({
    isEditMode,
    communityIdx,
    setActiveTab,
  });

  const { handleSubmit, control, watch, reset } = method;
  const { fields, append, remove } = useFieldArray({
    name: "championship_award",
    control,
  });

  const championshipType = watch("championship_type_idx");
  const championshipColor = watch("championship_list_color");
  const textColor = getTextColorFromBackground(championshipColor || "#1e293b");
  const teamsSelected = watch("participation_team_idxs");
  const progress = calculateProgress(watch, fields);

  return (
    <div className="flex justify-center items-start w-full min-h-screen bg-gray-950 py-8 px-4">
      <div className="w-full max-w-7xl bg-gray-900 shadow-2xl rounded-xl border border-gray-800 flex flex-col lg:flex-row">
        {/* 사이드바 - 웹 뷰에서만 표시 */}
        <div className="hidden lg:block lg:w-64 border-r border-gray-800 rounded-l-xl">
          <div
            className="p-6 rounded-tl-xl"
            style={{
              backgroundColor: championshipColor || "#1e293b",
              color: textColor,
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.2)",
            }}>
            <h1 className="text-xl font-bold mb-2">
              {watch("championship_list_name") ||
                (!isEditMode ? "새로운 대회 생성" : "대회 수정")}
            </h1>
            <p className="text-opacity-80 text-sm">
              {championshipType
                ? championshipTypes[championshipType]
                : "대회 타입을 선택해주세요"}
            </p>
          </div>

          {/* 수직 탭 네비게이션 */}
          <nav className="py-4">
            {Object.values(CHAMPIONSHIP_EDIT_TAB).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`w-full text-left px-6 py-3 flex items-center space-x-3 transition-colors duration-200
                  ${
                    activeTab === tab
                      ? "border-l-4 border-blue-500 text-blue-400"
                      : "text-gray-400 hover:bg-gray-800 hover:text-gray-200"
                  }`}
                style={
                  activeTab === tab
                    ? {
                        backgroundColor: championshipColor,
                        color: textColor,
                        borderLeftWidth: "4px",
                        borderLeftStyle: "solid",
                        borderLeftColor: championshipColor,
                      }
                    : undefined
                }>
                {tab === CHAMPIONSHIP_EDIT_TAB.BASIC && (
                  <>
                    <img
                      src={menuLinesIcon}
                      alt="기본 정보"
                      className="w-5 h-5"
                    />
                    <span>기본 정보</span>
                  </>
                )}
                {tab === CHAMPIONSHIP_EDIT_TAB.TEAMS && (
                  <>
                    <img
                      src={usersGroupIcon}
                      alt="참가 팀"
                      className="w-5 h-5"
                    />
                    <span>
                      참가 팀 ({teamsSelected.length}/
                      {matchCount[championshipType] || "?"})
                    </span>
                  </>
                )}
                {tab === CHAMPIONSHIP_EDIT_TAB.AWARDS && (
                  <>
                    <img src={awardIcon} alt="수상 항목" className="w-5 h-5" />
                    <span>수상 항목 ({fields.length})</span>
                  </>
                )}
                {tab === CHAMPIONSHIP_EDIT_TAB.DATES && (
                  <>
                    <img
                      src={calendarIcon}
                      alt="일정 및 설정"
                      className="w-5 h-5"
                    />
                    <span>일정 및 설정</span>
                  </>
                )}
              </button>
            ))}
          </nav>

          {/* 진행 상황 표시 - 사이드바 */}
          <div className="px-6 py-6 mt-auto border-t border-gray-800">
            <div className="flex justify-between text-xs mb-2 text-gray-400">
              <span>작성 진행도</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="h-2 rounded-full transition-all duration-300 ease-out"
                style={{
                  width: `${progress}%`,
                  backgroundColor: progress === 100 ? "#10b981" : "#3b82f6",
                }}></div>
            </div>
          </div>
        </div>

        {/* 메인 컨텐츠 */}
        <div className="flex-1">
          {isEditMode && <EditRequest reset={reset} />}

          {/* 모바일 헤더 */}
          <div
            className="lg:hidden p-6 relative rounded-t-xl"
            style={{
              backgroundColor: championshipColor || "#1e293b",
              color: textColor,
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.2)",
            }}>
            <h1 className="text-2xl font-bold mb-1">
              {watch("championship_list_name") ||
                (!isEditMode ? "새로운 대회 생성" : "대회 수정")}
            </h1>
            <p className="text-opacity-80">
              {championshipType
                ? championshipTypes[championshipType]
                : "대회 타입을 선택해주세요"}
            </p>

            {/* 진행 상황 표시 - 모바일 */}
            <div className="mt-3">
              <div className="flex justify-between text-xs mb-1">
                <span>작성 진행도</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-300 ease-out"
                  style={{
                    width: `${progress}%`,
                    backgroundColor: progress === 100 ? "#10b981" : "#3b82f6",
                  }}></div>
              </div>
            </div>
          </div>

          {/* 모바일 탭 네비게이션 */}
          <div className="lg:hidden flex border-b border-gray-800 overflow-x-auto scrollbar-hide bg-gray-800">
            {Object.values(CHAMPIONSHIP_EDIT_TAB).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 text-sm font-medium relative ${
                  activeTab === tab
                    ? "text-blue-400"
                    : "text-gray-400 hover:text-gray-200 hover:bg-gray-700"
                } transition-colors duration-200 flex-shrink-0`}
                style={activeTab === tab ? { color: textColor } : {}}>
                {tab === CHAMPIONSHIP_EDIT_TAB.BASIC && "기본 정보"}
                {tab === CHAMPIONSHIP_EDIT_TAB.TEAMS &&
                  `참가 팀 (${teamsSelected.length}/${
                    matchCount[championshipType] || "?"
                  })`}
                {tab === CHAMPIONSHIP_EDIT_TAB.AWARDS &&
                  `수상 항목 (${fields.length})`}
                {tab === CHAMPIONSHIP_EDIT_TAB.DATES && "일정 및 설정"}

                {/* 액티브 탭 표시 */}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500"></span>
                )}
              </button>
            ))}
          </div>

          {/* 폼 컨텐츠 */}
          <FormProvider {...method}>
            <form
              onSubmit={handleSubmit(onValid, onInvalid)}
              className="p-6 text-gray-300">
              {/* 웹뷰 헤더 - lg 이상에서만 표시 */}
              <div className="hidden lg:block border-b border-gray-800 pb-6 mb-6">
                <h2 className="text-2xl font-bold mb-2">
                  {activeTab === CHAMPIONSHIP_EDIT_TAB.BASIC && "기본 정보"}
                  {activeTab === CHAMPIONSHIP_EDIT_TAB.TEAMS && "참가 팀 선택"}
                  {activeTab === CHAMPIONSHIP_EDIT_TAB.AWARDS &&
                    "수상 항목 설정"}
                  {activeTab === CHAMPIONSHIP_EDIT_TAB.DATES &&
                    "일정 및 세부 설정"}
                </h2>
                <p className="text-gray-400">
                  {activeTab === CHAMPIONSHIP_EDIT_TAB.BASIC &&
                    "대회의 기본적인 정보를 입력해주세요"}
                  {activeTab === CHAMPIONSHIP_EDIT_TAB.TEAMS &&
                    `참가할 팀을 선택해주세요 (${teamsSelected.length}/${
                      matchCount[championshipType] || "?"
                    })`}
                  {activeTab === CHAMPIONSHIP_EDIT_TAB.AWARDS &&
                    "수상 항목과 상금을 설정해주세요"}
                  {activeTab === CHAMPIONSHIP_EDIT_TAB.DATES &&
                    "대회 일정과 세부 설정을 완료해주세요"}
                </p>
              </div>

              {/* 기본 정보 탭 */}
              {activeTab === CHAMPIONSHIP_EDIT_TAB.BASIC && (
                <div className="space-y-6">
                  <BasicTab />
                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setActiveTab(CHAMPIONSHIP_EDIT_TAB.TEAMS)}
                      style={{
                        backgroundColor: championshipColor,
                        color: textColor,
                      }}
                      className="px-6 py-2.5 text-white font-medium rounded-lg hover:opacity-90 transition flex items-center">
                      다음: 참가 팀 선택
                      <img
                        src={chevronRightIcon}
                        alt="다음"
                        className="w-4 h-4 ml-2"
                      />
                    </button>
                  </div>
                </div>
              )}

              {/* 팀 선택 탭 */}
              <div
                className={
                  activeTab === CHAMPIONSHIP_EDIT_TAB.TEAMS
                    ? "space-y-6"
                    : "hidden"
                }
                aria-hidden={activeTab !== CHAMPIONSHIP_EDIT_TAB.TEAMS}>
                <div className="space-y-6">
                  <TeamTab />
                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setActiveTab(CHAMPIONSHIP_EDIT_TAB.BASIC)}
                      className="px-6 py-2.5 border border-gray-700 text-gray-300 font-medium rounded-lg hover:bg-gray-800 transition flex items-center">
                      {"< "}이전: 기본 정보
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab(CHAMPIONSHIP_EDIT_TAB.AWARDS)}
                      style={{
                        backgroundColor: championshipColor,
                        color: textColor,
                      }}
                      className="px-6 py-2.5 text-white font-medium rounded-lg hover:opacity-90 transition flex items-center">
                      다음: 수상 항목
                      {" >"}
                    </button>
                  </div>
                </div>
              </div>

              {/* 수상 항목 탭 */}
              {activeTab === CHAMPIONSHIP_EDIT_TAB.AWARDS && (
                <div className="space-y-6">
                  <AwardTab fields={fields} append={append} remove={remove} />
                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setActiveTab(CHAMPIONSHIP_EDIT_TAB.BASIC)}
                      className="px-6 py-2.5 border border-gray-700 text-gray-300 font-medium rounded-lg hover:bg-gray-800 transition flex items-center">
                      {"< "}이전: 기본 정보
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab(CHAMPIONSHIP_EDIT_TAB.DATES)}
                      style={{
                        backgroundColor: championshipColor,
                        color: textColor,
                      }}
                      className="px-6 py-2.5 text-white font-medium rounded-lg hover:opacity-90 transition flex items-center">
                      다음: 일정 및 설정
                      {" >"}
                    </button>
                  </div>
                </div>
              )}

              {/* 일정 및 설정 탭 */}
              {activeTab === CHAMPIONSHIP_EDIT_TAB.DATES && (
                <div className="space-y-6">
                  <DateTab />
                  <div className="pt-6 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setActiveTab(CHAMPIONSHIP_EDIT_TAB.AWARDS)}
                      className="px-6 py-2.5 border border-gray-700 text-gray-300 font-medium rounded-lg hover:bg-gray-800 transition flex items-center">
                      {"< "}
                      이전: 수상 항목
                    </button>
                    <button
                      type="submit"
                      style={{
                        backgroundColor: championshipColor,
                        color: textColor,
                      }}
                      className="px-8 py-3 font-medium rounded-lg transition flex items-center text-white hover:opacity-90">
                      {isEditMode ? "대회 수정하기" : "대회 생성하기"}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default ChampionshipForm;
