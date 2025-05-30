import {
  useForm,
  SubmitHandler,
  useFieldArray,
  FormProvider,
  SubmitErrorHandler,
} from "react-hook-form";
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { matchCount } from "../../4_Shared/constant/matchCount";
import { CHAMPIONSHIP_EDIT_TAB } from "./constant/tab";
import { defaultValues, schema } from "./lib/schema";
import { errorTabDetector } from "./lib/errors";
import useManageSearchParam from "./lib/useManageSearchParam";
import { convertToAPIChampionship } from "./util/convert";

import TeamTab from "./ui/TeamTab";
import AwardTab from "./ui/AwardTab";
import BasicTab from "./ui/BasicTab";
import DateTab from "./ui/DateTab";

import usePostChampionship from "../../3_Entity/Community/usePostChampionship";
import usePutChampionship from "../../3_Entity/Community/usePutChampionship";
import { championshipTypes } from "../../4_Shared/constant/championshipTypes";
import EditRequest from "./ui/EditRequest";
import { calculateProgress } from "./lib/calculateProgress";
import { getTextColorFromBackground } from "../../4_Shared/lib/colorChecker";

const ChampionshipForm = () => {
  const { isEditMode, communityIdx } = useManageSearchParam();

  const [postChampionship] = usePostChampionship(communityIdx);
  const [putChampionship] = usePutChampionship(communityIdx);

  const [activeTab, setActiveTab] = React.useState<ChampionshipEditTab>(
    CHAMPIONSHIP_EDIT_TAB.BASIC
  );

  const method = useForm<ChampionshipFormValues>({
    resolver: yupResolver(schema),
    defaultValues,
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

  // 성공 시 처리
  const onValid: SubmitHandler<ChampionshipFormValues> = (data) => {
    const body = convertToAPIChampionship(data);
    if (isEditMode) {
      putChampionship(body);
    } else {
      postChampionship(body);
    }
  };

  // 에러 발생 시 해당 에러 탭으로 이동
  const onInvalid: SubmitErrorHandler<ChampionshipFormValues> = (errors) => {
    const errorLocation = errorTabDetector(errors);
    if (errorLocation) {
      setActiveTab(errorLocation);
    }
  };

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
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M4 6H20M4 12H20M4 18H12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>기본 정보</span>
                  </>
                )}
                {tab === CHAMPIONSHIP_EDIT_TAB.TEAMS && (
                  <>
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M17 20H22V18C22 16.3431 20.6569 15 19 15C18.0444 15 17.1931 15.4468 16.6438 16.1429M17 20H7M17 20V18C17 17.3438 16.8736 16.717 16.6438 16.1429M16.6438 16.1429C15.6563 14.4149 13.9568 13.2941 12 13.2941C10.0432 13.2941 8.34369 14.4149 7.35621 16.1429M7 20H2V18C2 16.3431 3.34315 15 5 15C5.95561 15 6.80686 15.4468 7.35621 16.1429M15 7C15 8.65685 13.6569 10 12 10C10.3431 10 9 8.65685 9 7C9 5.34315 10.3431 4 12 4C13.6569 4 15 5.34315 15 7ZM21 10C21 11.1046 20.1046 12 19 12C17.8954 12 17 11.1046 17 10C17 8.89543 17.8954 8 19 8C20.1046 8 21 8.89543 21 10ZM7 10C7 11.1046 6.10457 12 5 12C3.89543 12 3 11.1046 3 10C3 8.89543 3.89543 8 5 8C6.10457 8 7 8.89543 7 10Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>
                      참가 팀 ({teamsSelected.length}/
                      {matchCount[championshipType] || "?"})
                    </span>
                  </>
                )}
                {tab === CHAMPIONSHIP_EDIT_TAB.AWARDS && (
                  <>
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 15C8.8299 15 6.01546 16.5306 4.52354 18.8765C4.17087 19.4642 4 20.1174 4 20.7864V22H20V20.7864C20 20.1174 19.8291 19.4642 19.4765 18.8765C17.9845 16.5306 15.1701 15 12 15Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 12C14.7614 12 17 9.76142 17 7V6C17 3.23858 14.7614 1 12 1C9.23858 1 7 3.23858 7 6V7C7 9.76142 9.23858 12 12 12Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>수상 항목 ({fields.length})</span>
                  </>
                )}
                {tab === CHAMPIONSHIP_EDIT_TAB.DATES && (
                  <>
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
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
                      <svg
                        className="w-4 h-4 ml-2"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M9 6L15 12L9 18"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
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
