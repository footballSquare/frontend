"use client";

import React, { useState } from "react";
import { FormProvider, useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import useGetMyInfo from "../../3_Entity/Account/useGetUserInfo";
import useValidParamInteger from "../../4_Shared/model/useValidParamInteger";
import useProfileDashBoardHookform from "./model/useProfileDashBoardHookForm";
import { useLogout } from "../../4_Shared/lib/useMyInfo";
import useToggleState from "../../4_Shared/model/useToggleState";
import useDeleteUserHandler from "./model/useDeleteUserHandler";
import usePutUserInfoHandler from "./model/usePutUserInfoHandler";
import usePutProfileImage from "../../3_Entity/Account/usePutProfileImage";
import ProfileImageCard from "./ui/ProfileImageCard";
import ProfileDashBoardInput from "../../4_Shared/hookForm/ProfileDashBoardInput";
import team_icon from "../../4_Shared/assets/svg/team.svg";
import plus_icon from "../../4_Shared/assets/svg/plus.svg";

// The Platform type from the global types, defined here for clarity as it's not explicitly imported.
type Platform = "pc" | "xbox" | "playstation";

interface UserInfoForm {
  message: string;
  nickname: string;
  platform: Platform;
  match_position_idx: number;
  discord_tag: string;
}

interface Award {
  championship_list_name: string;
  logo?: string;
  date?: string;
}

const ProfileContent = ({ userInfo }: { userInfo: UserInfo }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<
    "profile" | "awards" | "info" | "account"
  >("profile");
  const [forceShowPlayerCard, setForceShowPlayerCard] = useState(false);
  const {
    handleSubmit,
    reset,
    getValues,
    watch,
    formState: { isDirty },
  } = useFormContext<UserInfoForm>();

  const [isModifyMode, toggleIsModifyMode] = useToggleState(false);
  const inputBackupDataRef = React.useRef<UserInfoForm>({} as UserInfoForm);

  const [handleDeleteUser] = useDeleteUserHandler();
  const [handlePutUserInfo] = usePutUserInfoHandler({
    reset,
    inputBackupDataRef,
  });
  const [putProfileImage] = usePutProfileImage();
  const [logOut] = useLogout();

  // 프로필 이미지 업데이트 핸들러
  const handlePutImageHandle = (file: File | null) => {
    if (file) {
      putProfileImage(file);
    }
  };

  const { is_mine, team_name, team_short_name, team_idx, Awards, nickname } =
    userInfo;

  const watchNickname = watch("nickname", nickname);
  const awards: Award[] = (Awards ?? []).map((award) => ({
    championship_list_name: award.championship_list_name,
    logo: award.championship_list_throphy_img,
    date: award.championship_list_start_date,
  }));

  const onSubmit = (formData: UserInfoForm) => {
    toggleIsModifyMode();
    if (!isDirty) return;
    handlePutUserInfo(formData);
    // 수정 완료 시 일반 보기로 전환
    setForceShowPlayerCard(false);
  };

  const handleEdit = () => {
    inputBackupDataRef.current = getValues();
    toggleIsModifyMode();
    // 프로필 수정 모드 진입 시 PlayerCard 보기로 전환
    setForceShowPlayerCard(true);
  };

  const handleCancel = () => {
    toggleIsModifyMode();
    reset(inputBackupDataRef.current);
    // 수정 모드 취소 시 일반 보기로 전환
    setForceShowPlayerCard(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white overflow-x-hidden">
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(71, 85, 105, 0.3);
            border-radius: 3px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(148, 163, 184, 0.6);
            border-radius: 3px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(148, 163, 184, 0.8);
          }
        `,
        }}
      />
      {/* Main Content */}
      <main className="lg:max-w-6xl lg:mx-auto py-8 px-4 lg:px-6 max-w-full overflow-x-hidden">
        {/* Desktop Layout (LG and above) */}
        <div className="hidden lg:grid grid-cols-[320px_1fr] gap-8 items-start">
          {/* Left Column: Profile Card and Awards */}
          <div className="space-y-6">
            <ProfileImageCard
              userInfo={userInfo}
              forceShowPlayerCard={forceShowPlayerCard}
              onImageChange={handlePutImageHandle}
            />
            <section className="bg-gradient-to-br from-slate-800 to-gray-800 rounded-2xl p-6 border border-slate-600/50 shadow-xl backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  수상 기록
                </h3>
                <div className="flex items-center gap-2">
                  <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                    {awards.length}개
                  </span>
                </div>
              </div>
              {awards.length > 0 ? (
                <div className="space-y-4 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                  {awards.map((award, index) => (
                    <div
                      key={award.championship_list_name}
                      className="flex items-center gap-4 p-4 bg-slate-700/40 rounded-xl hover:bg-slate-700/60 transition-colors duration-200 border border-slate-600/30 group">
                      <div className="relative flex-shrink-0">
                        <img
                          src={
                            award.logo || "/placeholder.svg?height=48&width=48"
                          }
                          alt={award.championship_list_name}
                          className="w-14 h-14 rounded-xl object-cover shadow-md transition-shadow duration-200"
                        />
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg">
                          {index + 1}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-semibold text-sm mb-1 truncate">
                          {award.championship_list_name}
                        </p>
                        <p className="text-slate-400 text-xs">
                          {award.date || "날짜 정보 없음"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-slate-400 py-12 bg-slate-700/20 rounded-xl border-2 border-dashed border-slate-600">
                  <div className="w-16 h-16 mb-4 bg-slate-600/50 rounded-full flex items-center justify-center">
                    <img src={plus_icon} className="w-8 h-8" alt="Add" />
                  </div>
                  <p className="text-sm font-medium">수상 기록이 없습니다</p>
                  <p className="text-xs text-slate-500 mt-1">
                    대회에 참여하여 첫 번째 트로피를 획득해보세요!
                  </p>
                </div>
              )}
            </section>
          </div>

          {/* Right Column: Profile Info and Actions */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <section className="bg-gradient-to-br from-slate-800 to-gray-800 rounded-2xl p-8 border border-slate-600/50 shadow-xl backdrop-blur-sm">
              <div className="flex justify-between items-start mb-8">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                      {watchNickname}
                    </h2>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                  {team_name && (
                    <p
                      className="text-grass font-medium hover:text-grass hover:text-opacity-80 cursor-pointer transition-colors inline-flex items-center gap-2 group"
                      onClick={() => navigate(`/team/${team_idx}`)}>
                      <img
                        src={team_icon}
                        className="w-4 h-4 group-hover:rotate-12 transition-transform duration-200"
                        alt="Team"
                      />
                      {team_name} ({team_short_name})
                    </p>
                  )}
                </div>
                {is_mine && (
                  <div className="flex gap-2 min-w-[140px] justify-end">
                    {!isModifyMode ? (
                      <button
                        type="button"
                        onClick={handleEdit}
                        className="px-4 py-2 bg-grass hover:bg-grass hover:bg-opacity-80 text-white rounded-lg font-medium transition-colors">
                        수정
                      </button>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={handleCancel}
                          className="px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors text-sm">
                          취소
                        </button>
                        <button
                          type="submit"
                          className="px-3 py-2 bg-grass hover:bg-grass hover:bg-opacity-80 text-white rounded-lg font-medium transition-colors text-sm">
                          저장
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>

              <div className="space-y-8 pt-8 border-t border-slate-600/50">
                <ProfileDashBoardInput
                  label="상태 메시지"
                  registerType="message"
                  name="message"
                  isModifyMode={isModifyMode}
                  placeholder="당신의 상태를 알려주세요..."
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 sm:gap-6">
                  <ProfileDashBoardInput
                    label="게임 ID"
                    registerType="nickname"
                    name="nickname"
                    isModifyMode={isModifyMode}
                    placeholder="닉네임을 입력하세요"
                  />

                  <ProfileDashBoardInput
                    label="플랫폼"
                    registerType="platform"
                    name="platform"
                    isModifyMode={isModifyMode}
                  />

                  <ProfileDashBoardInput
                    label="포지션"
                    registerType="match_position_idx"
                    name="match_position_idx"
                    isModifyMode={isModifyMode}
                  />

                  <ProfileDashBoardInput
                    label="Discord 태그"
                    registerType="discord_tag"
                    name="discord_tag"
                    isModifyMode={isModifyMode}
                    placeholder="Discord#1234"
                  />
                </div>
              </div>
            </section>

            {is_mine && (
              <section className="bg-gradient-to-br from-slate-800 to-gray-800 rounded-2xl p-6 border border-slate-600/50 shadow-xl backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-white mb-6 pb-4 border-b border-slate-600/50">
                  계정 관리
                </h3>
                <div className="flex flex-col sm:flex-row justify-end gap-3">
                  <button
                    type="button"
                    className="px-4 py-2 border border-slate-600 text-slate-300 font-medium rounded-lg hover:bg-slate-700 hover:text-white transition-colors"
                    onClick={() => {
                      if (confirm("로그아웃 하시겠습니까?")) {
                        logOut();
                      }
                    }}>
                    로그아웃
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 border border-red-600 text-red-400 font-medium rounded-lg hover:bg-red-600 hover:text-white transition-colors"
                    onClick={() => {
                      if (
                        confirm(
                          "정말로 계정을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
                        )
                      ) {
                        handleDeleteUser();
                      }
                    }}>
                    회원 탈퇴
                  </button>
                </div>
              </section>
            )}
          </form>
        </div>

        {/* Mobile/Tablet Layout (Below XL) */}
        <div className="lg:hidden w-[calc(100vw-2rem)] mx-auto">
          {/* Tab Navigation */}
          <div className="bg-slate-800/50 rounded-2xl p-2 mb-6 border border-slate-600/50">
            <div className="grid grid-cols-4 gap-1 w-full">
              {[
                { id: "profile", label: "프로필" },
                { id: "awards", label: "수상" },
                { id: "info", label: "정보" },
                { id: "account", label: "계정" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() =>
                    setActiveTab(
                      tab.id as "profile" | "awards" | "info" | "account"
                    )
                  }
                  className={`w-full p-3 rounded-xl transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-grass text-white shadow-lg"
                      : "text-slate-400 hover:text-white hover:bg-grass/30"
                  }`}>
                  <div className="text-sm font-medium">{tab.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="bg-gradient-to-br from-slate-800 to-gray-800 rounded-2xl p-4 border border-slate-600/50 shadow-xl backdrop-blur-sm w-full">
                <ProfileImageCard
                  userInfo={userInfo}
                  forceShowPlayerCard={forceShowPlayerCard}
                  onImageChange={handlePutImageHandle}
                />
              </div>
            )}

            {/* Awards Tab */}
            {activeTab === "awards" && (
              <div className="bg-gradient-to-br from-slate-800 to-gray-800 rounded-2xl p-6 border border-slate-600/50 shadow-xl backdrop-blur-sm w-full">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white flex items-center gap-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                    수상 기록
                  </h3>
                  <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                    {awards.length}개
                  </span>
                </div>
                {awards.length > 0 ? (
                  <div className="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                    {awards.map((award, index) => (
                      <div
                        key={award.championship_list_name}
                        className="flex items-center gap-4 p-4 bg-slate-700/40 rounded-xl hover:bg-slate-700/60 transition-colors duration-200 border border-slate-600/30 group">
                        <div className="relative flex-shrink-0">
                          <img
                            src={
                              award.logo ||
                              "/placeholder.svg?height=48&width=48"
                            }
                            alt={award.championship_list_name}
                            className="w-14 h-14 rounded-xl object-cover shadow-md transition-shadow duration-200"
                          />
                          <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg">
                            {index + 1}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-semibold text-sm mb-1 truncate">
                            {award.championship_list_name}
                          </p>
                          <p className="text-slate-400 text-xs">
                            {award.date || "날짜 정보 없음"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-slate-400 py-12 bg-slate-700/20 rounded-xl border-2 border-dashed border-slate-600">
                    <div className="w-16 h-16 mb-4 bg-slate-600/50 rounded-full flex items-center justify-center">
                      <img src={plus_icon} className="w-8 h-8" alt="Add" />
                    </div>
                    <p className="text-sm font-medium">수상 기록이 없습니다</p>
                    <p className="text-xs text-slate-500 mt-1">
                      대회에 참여하여 첫 번째 트로피를 획득해보세요!
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Info Tab */}
            {activeTab === "info" && (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="bg-gradient-to-br from-slate-800 to-gray-800 rounded-2xl p-6 border border-slate-600/50 shadow-xl backdrop-blur-sm w-full">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                          {watchNickname}
                        </h2>
                        <div className="w-2 h-2 bg-grass rounded-full animate-pulse"></div>
                      </div>
                      {team_name && (
                        <p
                          className="text-grass font-medium hover:text-grass hover:text-opacity-80 cursor-pointer transition-colors inline-flex items-center gap-2 group"
                          onClick={() => navigate(`/team/${team_idx}`)}>
                          <img
                            src={team_icon}
                            alt="Team"
                            className="w-4 h-4 group-hover:rotate-12 transition-transform duration-200"
                          />
                          {team_name} ({team_short_name})
                        </p>
                      )}
                    </div>
                    {is_mine && (
                      <div className="flex gap-2">
                        {!isModifyMode ? (
                          <button
                            type="button"
                            onClick={handleEdit}
                            className="px-4 py-2 bg-grass hover:bg-grass hover:bg-opacity-80 text-white rounded-lg font-medium transition-colors">
                            수정
                          </button>
                        ) : (
                          <>
                            <button
                              type="button"
                              onClick={handleCancel}
                              className="px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors text-sm">
                              취소
                            </button>
                            <button
                              type="submit"
                              className="px-3 py-2 bg-grass hover:bg-grass hover:bg-opacity-80 text-white rounded-lg font-medium transition-colors text-sm">
                              저장
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="space-y-6 pt-6 border-t border-slate-600/50">
                    <ProfileDashBoardInput
                      label="상태 메시지"
                      registerType="message"
                      name="message"
                      isModifyMode={isModifyMode}
                      placeholder="당신의 상태를 알려주세요..."
                    />

                    <div className="grid grid-cols-1 gap-4">
                      <ProfileDashBoardInput
                        label="게임 ID"
                        registerType="nickname"
                        name="nickname"
                        isModifyMode={isModifyMode}
                        placeholder="닉네임을 입력하세요"
                      />

                      <ProfileDashBoardInput
                        label="플랫폼"
                        registerType="platform"
                        name="platform"
                        isModifyMode={isModifyMode}
                      />

                      <ProfileDashBoardInput
                        label="포지션"
                        registerType="match_position_idx"
                        name="match_position_idx"
                        isModifyMode={isModifyMode}
                      />

                      <ProfileDashBoardInput
                        label="Discord 태그"
                        registerType="discord_tag"
                        name="discord_tag"
                        isModifyMode={isModifyMode}
                        placeholder="Discord#1234"
                      />
                    </div>
                  </div>
                </div>
              </form>
            )}

            {/* Account Tab */}
            {activeTab === "account" && is_mine && (
              <div className="bg-gradient-to-br from-slate-800 to-gray-800 rounded-2xl p-6 border border-slate-600/50 shadow-xl backdrop-blur-sm w-full">
                <h3 className="text-lg font-semibold text-white mb-6 pb-4 border-b border-slate-600/50">
                  계정 관리
                </h3>
                <div className="flex flex-col gap-3">
                  <button
                    type="button"
                    className="w-full px-4 py-3 border border-slate-600 text-slate-300 font-medium rounded-lg hover:bg-slate-700 hover:text-white transition-colors"
                    onClick={() => {
                      if (confirm("로그아웃 하시겠습니까?")) {
                        logOut();
                      }
                    }}>
                    로그아웃
                  </button>
                  <button
                    type="button"
                    className="w-full px-4 py-3 border border-red-600 text-red-400 font-medium rounded-lg hover:bg-red-600 hover:text-white transition-colors"
                    onClick={() => {
                      if (
                        confirm(
                          "정말로 계정을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
                        )
                      ) {
                        handleDeleteUser();
                      }
                    }}>
                    회원 탈퇴
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

const Profile = () => {
  const [userIdx] = useValidParamInteger("userIdx");
  const [userInfo, loading] = useGetMyInfo(userIdx);
  const { form } = useProfileDashBoardHookform(userInfo);

  if (loading || !userInfo.user_idx) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        Loading profile...
      </div>
    );
  }

  return (
    <FormProvider {...form}>
      <ProfileContent userInfo={userInfo} />
    </FormProvider>
  );
};

export default Profile;
