import {
  useForm,
  SubmitHandler,
  useFieldArray,
  FormProvider,
} from "react-hook-form";
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { matchCount } from "../../4_Shared/constant/matchCount";

import { defaultValues, schema } from "./lib/schema";
import uploadSvg from "../../4_Shared/assets/svg/upload.svg";
import { championshipTypes } from "../../4_Shared/constant/championshipTypes";
import TeamTab from "./ui/TeamTab";
import { CHAMPIONSHIP_EDIT_TAB } from "./constant/tab";
import AwardTab from "./ui/AwardTab";
import useImageHandler from "./model/useImageHandler";
import BasicTab from "./ui/BasicTab";
import DateTab from "./ui/DateTab";

const ChampionshipForm = () => {
  const [activeTab, setActiveTab] = React.useState<ChampionshipEditTab>(
    CHAMPIONSHIP_EDIT_TAB.BASIC
  );
  const [previewImage, handleImageChange] = useImageHandler();

  const method = useForm<ChampionshipFormValues>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  // useForm 훅 초기화 (타입: ChampionshipFormValues)
  const {
    handleSubmit,
    control,
    watch,
    formState: { isSubmitting, errors },
  } = method;

  // useFieldArray로 championship_award 필드 동적 제어
  const { fields, append, remove } = useFieldArray({
    name: "championship_award_name",
    control,
  });

  // 현재 선택된 값들
  const championshipType = watch("championship_type_idx");
  const championshipColor = watch("championship_list_color");

  // 폼 제출
  const onSubmit: SubmitHandler<ChampionshipFormValues> = (data) => {
    console.log("폼 전송 데이터:", data);
    alert("대회 생성/수정이 완료되었습니다!");
  };

  // 대회
  return (
    <div className="w-[80%] h-fit min-h-full bg-white shadow-lg rounded-xl ">
      {/* 헤더 */}
      <div
        className="p-6 text-white relative"
        style={{ backgroundColor: championshipColor }}>
        <h1 className="text-2xl font-bold">
          {watch("championship_list_name") || "새로운 대회 생성"}
        </h1>
        <p className="text-white text-opacity-80">
          {championshipTypes[championshipType]}
        </p>
        <div className="absolute right-6 bottom-6 w-16 h-16 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
          <img
            src={previewImage || uploadSvg}
            alt="Trophy"
            className="w-10 h-10 object-contain"
          />
        </div>
      </div>

      {/* 탭 네비게이션 */}
      <div className="flex border-b overflow-x-auto scrollbar-hide">
        <button
          type="button"
          onClick={() => setActiveTab(CHAMPIONSHIP_EDIT_TAB.BASIC)}
          className={`px-4 py-3 text-sm font-medium ${
            activeTab === CHAMPIONSHIP_EDIT_TAB.BASIC
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500"
          }`}>
          기본 정보
        </button>
        <button
          type="button"
          onClick={() => setActiveTab(CHAMPIONSHIP_EDIT_TAB.TEAMS)}
          className={`px-4 py-3 text-sm font-medium ${
            activeTab === CHAMPIONSHIP_EDIT_TAB.TEAMS
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500"
          }`}>
          참가 팀 ({watch("participation_team_idxs").length}/
          {matchCount[championshipType]})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab(CHAMPIONSHIP_EDIT_TAB.AWARDS)}
          className={`px-4 py-3 text-sm font-medium ${
            activeTab === CHAMPIONSHIP_EDIT_TAB.AWARDS
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500"
          }`}>
          수상 항목 ({fields.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab(CHAMPIONSHIP_EDIT_TAB.DATES)}
          className={`px-4 py-3 text-sm font-medium ${
            activeTab === CHAMPIONSHIP_EDIT_TAB.DATES
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500"
          }`}>
          일정 및 설정
        </button>
      </div>

      {/* 폼 컨텐츠 */}
      <FormProvider {...method}>
        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          {/* 기본 정보 탭 */}
          {activeTab === CHAMPIONSHIP_EDIT_TAB.BASIC && (
            <div className="space-y-6">
              <BasicTab
                previewImage={previewImage}
                handleImageChange={handleImageChange}
              />
              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setActiveTab(CHAMPIONSHIP_EDIT_TAB.TEAMS)}
                  className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition">
                  다음: 참가 팀 선택
                </button>
              </div>
            </div>
          )}

          {/* 팀 선택 탭 */}
          {/* 팀 선택 탭의 무한스크롤 로직이 초기화 되는것 방지 위해 hidden 사용*/}
          <div
            className={
              activeTab === CHAMPIONSHIP_EDIT_TAB.TEAMS ? "space-y-6" : "hidden"
            }
            aria-hidden={activeTab !== CHAMPIONSHIP_EDIT_TAB.TEAMS}>
            <div className="space-y-6">
              <TeamTab />
              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setActiveTab(CHAMPIONSHIP_EDIT_TAB.BASIC)}
                  className="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition">
                  이전: 기본 정보
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab(CHAMPIONSHIP_EDIT_TAB.AWARDS)}
                  className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition">
                  다음: 수상 항목
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
                  onClick={() => setActiveTab(CHAMPIONSHIP_EDIT_TAB.TEAMS)}
                  className="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition">
                  이전: 참가 팀
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab(CHAMPIONSHIP_EDIT_TAB.DATES)}
                  className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition">
                  다음: 일정 및 설정
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
                  // onClick={() => setActiveTab(CHAMPIONSHIP_EDIT_TAB.AWARDS)}
                  onClick={() => {
                    console.log(errors);
                  }}
                  className="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition">
                  이전: 수상 항목
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition disabled:bg-blue-400 disabled:cursor-not-allowed">
                  {isSubmitting ? "처리 중..." : "대회 생성하기"}
                </button>
              </div>
            </div>
          )}
        </form>
      </FormProvider>
    </div>
  );
};

export default ChampionshipForm;
