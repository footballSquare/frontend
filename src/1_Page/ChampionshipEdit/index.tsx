import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useGetCommunityTeamList from "../../3_Entity/Community/useGetCommunityTeamList";
import useValidParamInteger from "../../4_Shared/model/useValidParamInteger";
import React, { useState } from "react";
import useInfiniteScrollPaging from "../../4_Shared/model/useInfiniteScrollPaging";
import { defaultValues, schema } from "./lib/schema";
import uploadSvg from "../../4_Shared/assets/svg/upload.svg";
import emptySvg from "../../4_Shared/assets/svg/empty-img.svg";
import TeamCard from "./ui/ParticiPationTab/ui/TeamCard";

const ChampionshipForm = () => {
  const [communityIdx] = useValidParamInteger("communityIdx");
  const [activeTab, setActiveTab] = useState<
    "basic" | "teams" | "awards" | "dates"
  >("basic");
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const [page, setPage] = useState<number>(0);
  const [communityTeamList, hasMoreContent, loading] = useGetCommunityTeamList({
    communityIdx,
    page,
  });
  const [observeRef] = useInfiniteScrollPaging(
    setPage,
    loading,
    hasMoreContent
  );

  // useForm 훅 초기화 (타입: ChampionshipFormValues)
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm<ChampionshipFormValues>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  // useFieldArray로 championship_award 필드 동적 제어
  const { fields, append, remove } = useFieldArray({
    control,
    name: "championship_award",
  });

  // 현재 선택된 값들
  const championshipType = watch("championship_type_idx");
  const championshipColor = watch("championship_list_color");

  // 트로피 이미지 미리보기
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  // 폼 제출
  const onSubmit: SubmitHandler<ChampionshipFormValues> = (data) => {
    console.log("폼 전송 데이터:", data);
    alert("대회 생성/수정이 완료되었습니다!");
  };

  // 팀 클릭 시 선택/해제 처리 (팀 인덱스는 number 타입)
  const handleTeamClick = (teamIdx: number) => {
    const currentTeams = watch("participation_team_idxs");
    // 토너먼트라면 최대 팀 수 제한
    let maxTeams = 9999;
    if (championshipType === 2) {
      // 2: 16강 토너먼트
      maxTeams = 16;
    } else if (championshipType === 3) {
      // 3: 8강 토너먼트
      maxTeams = 8;
    } else if (championshipType === 4) {
      // 예를 들어 4: 4강 토너먼트
      maxTeams = 4;
    }
    // 이미 선택된 상태라면 해제
    if (currentTeams.includes(teamIdx)) {
      setValue(
        "participation_team_idxs",
        currentTeams.filter((id: number) => id !== teamIdx)
      );
    } else {
      // 아직 선택되지 않았고, 최대 수 미만이면 추가
      if (currentTeams.length < maxTeams) {
        setValue("participation_team_idxs", [...currentTeams, teamIdx]);
      } else {
        alert(
          `${
            championshipType === 2
              ? "16강"
              : championshipType === 3
              ? "8강"
              : "4강"
          } 토너먼트는 최대 ${maxTeams}개 팀만 선택 가능합니다.`
        );
      }
    }
  };

  // 토너먼트 종류에 따른 선택 가능한 최대 팀 수
  const getMaxTeams = () => {
    switch (championshipType) {
      case 2:
        return 16;
      case 3:
        return 8;
      case 4:
        return 4;
      default:
        return 9999; // 리그의 경우 제한 없음
    }
  };

  // championship_type_idx 값을 텍스트로 변환 (헤더에 표시)
  const getChampionshipTypeLabel = () => {
    switch (championshipType) {
      case 1:
        return "리그";
      case 2:
        return "16강 토너먼트";
      case 3:
        return "8강 토너먼트";
      case 4:
        return "4강 토너먼트";
      default:
        return "";
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-fit min-h-full bg-white shadow-lg rounded-xl ">
      {/* 헤더 */}
      <div
        className="p-6 text-white relative"
        style={{ backgroundColor: championshipColor }}>
        <h1 className="text-2xl font-bold">
          {watch("championship_list_name") || "새로운 대회 생성"}
        </h1>
        <p className="text-white text-opacity-80">
          {getChampionshipTypeLabel()}
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
          onClick={() => setActiveTab("basic")}
          className={`px-4 py-3 text-sm font-medium ${
            activeTab === "basic"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500"
          }`}>
          기본 정보
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("teams")}
          className={`px-4 py-3 text-sm font-medium ${
            activeTab === "teams"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500"
          }`}>
          참가 팀 ({watch("participation_team_idxs").length}/{getMaxTeams()})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("awards")}
          className={`px-4 py-3 text-sm font-medium ${
            activeTab === "awards"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500"
          }`}>
          수상 항목 ({fields.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("dates")}
          className={`px-4 py-3 text-sm font-medium ${
            activeTab === "dates"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500"
          }`}>
          일정 및 설정
        </button>
      </div>

      {/* 폼 컨텐츠 */}
      <form onSubmit={handleSubmit(onSubmit)} className="p-6">
        {/* 기본 정보 탭 */}
        {activeTab === "basic" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 대회명 */}
              <div className="col-span-1 md:col-span-2">
                <label className="block mb-1 font-medium text-gray-700">
                  대회명
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="예) 우리동네 축구 리그"
                  {...register("championship_list_name")}
                />
                {errors.championship_list_name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.championship_list_name.message}
                  </p>
                )}
              </div>

              {/* 대회 종류 선택 */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  대회 종류
                </label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white transition"
                  {...register("championship_type_idx")}>
                  <option value={1}>리그</option>
                  <option value={2}>16강 토너먼트</option>
                  <option value={3}>8강 토너먼트</option>
                  {/* 필요시 추가 옵션 */}
                </select>
                {errors.championship_type_idx && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.championship_type_idx.message}
                  </p>
                )}
              </div>

              {/* 대회 색상 */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  대회 색상
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    className="w-10 h-10 rounded-md border border-gray-300 cursor-pointer"
                    {...register("championship_list_color")}
                  />
                  <input
                    type="text"
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    value={championshipColor}
                    onChange={(e) =>
                      setValue("championship_list_color", e.target.value)
                    }
                    placeholder="#HEX"
                  />
                </div>
                {errors.championship_list_color && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.championship_list_color.message}
                  </p>
                )}
              </div>

              {/* 트로피 이미지 */}
              <div className="md:col-span-2">
                <label className="block mb-1 font-medium text-gray-700">
                  트로피 이미지
                </label>
                <div className="flex flex-col md:flex-row items-start gap-4">
                  <div className="w-full md:w-2/3">
                    <label className="flex items-center justify-center w-full h-32 px-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                      <input
                        type="file"
                        accept="image/png, image/jpeg"
                        className="hidden"
                        {...register("championship_list_throphy_img")}
                        onChange={handleImageChange}
                      />
                      <div className="text-center">
                        <div className="flex items-center justify-center ">
                          <img
                            src={uploadSvg}
                            alt="Upload"
                            className="w-12 h-12"
                          />
                        </div>

                        <p className="mt-2 text-sm text-gray-500">
                          이미지를 클릭하여 업로드하세요
                        </p>
                        <p className="text-xs text-gray-400">
                          PNG, JPG (최대 2MB)
                        </p>
                      </div>
                    </label>
                    {errors.championship_list_throphy_img && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.championship_list_throphy_img.message as string}
                      </p>
                    )}
                  </div>

                  {/* 이미지 미리보기 */}
                  <div className="w-full md:w-1/3 flex items-center justify-center">
                    <div className="w-24 h-24 border rounded-lg overflow-hidden flex items-center justify-center bg-gray-50">
                      <img
                        src={previewImage || emptySvg}
                        alt="Trophy Preview"
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 대회 설명 */}
              <div className="md:col-span-2">
                <label className="block mb-1 font-medium text-gray-700">
                  대회 공지 및 설명
                </label>
                <textarea
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 h-28 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="대회 진행 방식, 주의사항 등"
                  {...register("championship_list_description")}
                />
                {errors.championship_list_description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.championship_list_description.message}
                  </p>
                )}
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveTab("teams")}
                className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition">
                다음: 참가 팀 선택
              </button>
            </div>
          </div>
        )}

        {/* 팀 선택 탭 */}
        {activeTab === "teams" && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="font-medium text-gray-700">
                  참가 팀 선택
                </label>
                <span className="text-sm text-gray-500">
                  {watch("participation_team_idxs").length}/{getMaxTeams()} 팀
                  선택됨
                </span>
              </div>

              {championshipType !== 1 && (
                <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-sm text-amber-800">
                    {championshipType === 2 ? "16강" : "8강"} 토너먼트는 정확히{" "}
                    {getMaxTeams()}개의 팀을 선택해야 합니다.
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {communityTeamList.map((teamInfo, index) => (
                  <TeamCard
                    key={`team_card_${teamInfo.team_list_idx || index}`}
                    teamInfo={teamInfo}
                    handleTeamClick={handleTeamClick}
                  />
                ))}
              </div>
              {loading && (
                <div className="col-span-full py-4 text-center text-gray-500">
                  팀 목록을 불러오는 중...
                </div>
              )}
              <div ref={observeRef} />
            </div>

            <div className="pt-4 flex justify-between">
              <button
                type="button"
                onClick={() => setActiveTab("basic")}
                className="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition">
                이전: 기본 정보
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("awards")}
                className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition">
                다음: 수상 항목
              </button>
            </div>
          </div>
        )}

        {/* 수상 항목 탭 */}
        {activeTab === "awards" && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="font-medium text-gray-700">
                  개인 수상 종류
                </label>
                <button
                  type="button"
                  onClick={() =>
                    append({ championship_award_name: "", file: undefined })
                  }
                  className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 transition">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  수상 항목 추가
                </button>
              </div>

              <div className="space-y-3">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="flex items-center p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full text-sm font-medium text-gray-700 mr-3">
                      {index + 1}
                    </div>
                    <input
                      type="text"
                      className="flex-1 border-0 border-b border-gray-200 py-1 focus:ring-0 focus:border-blue-500 outline-none transition"
                      placeholder="예) MVP, 득점왕, 베스트 골키퍼"
                      {...register(
                        `championship_award.${index}.championship_award_name` as const
                      )}
                    />
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="ml-2 w-8 h-8 flex items-center justify-center text-gray-500 hover:text-red-500 transition">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                ))}

                {fields.length === 0 && (
                  <div className="p-6 text-center border border-dashed border-gray-300 rounded-lg">
                    <p className="text-gray-500">수상 항목을 추가해주세요</p>
                  </div>
                )}
              </div>

              {errors.championship_award && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.championship_award.message as string}
                </p>
              )}
            </div>

            <div className="pt-4 flex justify-between">
              <button
                type="button"
                onClick={() => setActiveTab("teams")}
                className="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition">
                이전: 참가 팀
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("dates")}
                className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition">
                다음: 일정 및 설정
              </button>
            </div>
          </div>
        )}

        {/* 일정 및 설정 탭 */}
        {activeTab === "dates" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 대회 기간 (시작일, 종료일) */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  시작일
                </label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  {...register("championship_list_start_date")}
                />
                {errors.championship_list_start_date && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.championship_list_start_date.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  종료일
                </label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  {...register("championship_list_end_date")}
                />
                {errors.championship_list_end_date && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.championship_list_end_date.message}
                  </p>
                )}
              </div>
            </div>

            {/* 요약 정보 */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="font-medium text-gray-700 mb-3">대회 정보 요약</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 text-sm">
                <div className="flex">
                  <span className="w-24 text-gray-500">대회명:</span>
                  <span className="font-medium">
                    {watch("championship_list_name") || "-"}
                  </span>
                </div>
                <div className="flex">
                  <span className="w-24 text-gray-500">대회 종류:</span>
                  <span className="font-medium">
                    {getChampionshipTypeLabel()}
                  </span>
                </div>
                <div className="flex">
                  <span className="w-24 text-gray-500">시작일:</span>
                  <span className="font-medium">
                    {watch("championship_list_start_date") || "-"}
                  </span>
                </div>
                <div className="flex">
                  <span className="w-24 text-gray-500">종료일:</span>
                  <span className="font-medium">
                    {watch("championship_list_end_date") || "-"}
                  </span>
                </div>
                <div className="flex">
                  <span className="w-24 text-gray-500">참가 팀:</span>
                  <span className="font-medium">
                    {watch("participation_team_idxs").length}팀
                  </span>
                </div>
                <div className="flex">
                  <span className="w-24 text-gray-500">수상 항목:</span>
                  <span className="font-medium">{fields.length}개</span>
                </div>
              </div>
            </div>

            <div className="pt-6 flex justify-between">
              <button
                type="button"
                onClick={() => setActiveTab("awards")}
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
    </div>
  );
};

export default ChampionshipForm;
