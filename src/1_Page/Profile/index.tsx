import React from "react";
import { useNavigate } from "react-router-dom";

import useGetMyInfo from "../../3_Entity/Account/useGetUserInfo";
import useValidParamInteger from "../../4_Shared/model/useValidParamInteger";
import useProfileDashBoardHookform from "./model/useProfileDashBoardHookForm";
import { useLogout } from "../../4_Shared/lib/useMyInfo";
import useDeleteUserHandler from "./model/useDeleteUserHandler";
import usePutUserInfoHandler from "./model/usePutUserInfoHandler";
import ProfileImageCard from "./ui/ProfileImageCard/index";
import ProfileDashBoardInput from "../../4_Shared/hookForm/ProfileDashBoardInput";

import { PROFILE_TAB, PROFILE_TAB_LIST } from "./constant/tab";
import { FormProvider } from "react-hook-form";
import teamIcon from "../../4_Shared/assets/svg/team.svg";
import plusIcon from "../../4_Shared/assets/svg/plus.svg";
import useToggleState from "../../4_Shared/model/useToggleState";

const Profile = () => {
  const navigate = useNavigate();
  const [userIdx] = useValidParamInteger("userIdx");
  const [userInfo, loading] = useGetMyInfo(userIdx);
  const {
    is_mine,
    team_name,
    team_short_name,
    team_idx,
    Awards = [],
  } = userInfo;

  const [isModifyMode, toggleIsModifyMode] = useToggleState();

  // 훅폼 관리
  const {
    form,
    inputBackupDataRef,
    handleEdit,
    handleCancel,
    handleImageChange,
  } = useProfileDashBoardHookform({ userInfo, toggleIsModifyMode });
  const {
    handleSubmit,
    reset,
    watch,
    formState: { isDirty },
  } = form;
  const watchNickname = watch("nickname");

  const [activeTab, setActiveTab] = React.useState<PROFILE_TAB>(
    PROFILE_TAB.PROFILE
  );

  // API 핸들러
  const [handleDeleteUser] = useDeleteUserHandler();
  const [handlePutUserInfo] = usePutUserInfoHandler({
    reset,
    isDirty,
    inputBackupDataRef,
    toggleIsModifyMode,
  });
  const [logOut] = useLogout();

  if (loading || !userInfo) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        Loading profile...
      </div>
    );
  }
  return (
    <div className="min-h-0 lg:min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white overflow-x-hidden">
      <FormProvider {...form}>
        {/* Main Content */}
        <main className="lg:max-w-6xl lg:mx-auto py-8 px-4 lg:px-6 max-w-full overflow-x-hidden">
          {/* Desktop Layout (LG and above) */}
          <div className="hidden lg:grid grid-cols-[320px_1fr] gap-8 items-start">
            {/* Left Column: Profile Card and Awards */}
            <div className="space-y-6">
              <ProfileImageCard
                userInfo={userInfo}
                isModifyMode={isModifyMode}
                onImageChange={handleImageChange}
              />
              <section className="bg-gradient-to-br from-slate-800 to-gray-800 rounded-2xl p-6 border border-slate-600/50 shadow-xl backdrop-blur-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white flex items-center gap-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                    수상 기록
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                      {Awards?.length || 0}개
                    </span>
                  </div>
                </div>
                {Awards && Awards.length > 0 ? (
                  <div className="space-y-4 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                    {Awards.map((award, index) => (
                      <div
                        key={`${award.championship_list_idx}-desktop-${index}`}
                        className="flex items-center gap-4 p-4 bg-slate-700/40 rounded-xl hover:bg-slate-700/60 transition-colors duration-200 border border-slate-600/30 group"
                        style={{
                          borderLeftColor: award.championship_list_color,
                        }}>
                        <div className="relative flex-shrink-0">
                          <img
                            src={
                              award.championship_list_throphy_img ||
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
                            {award.championship_list_start_date &&
                            award.championship_list_end_date
                              ? `${award.championship_list_start_date} ~ ${award.championship_list_end_date}`
                              : award.championship_list_start_date ||
                                award.championship_list_end_date ||
                                "날짜 정보 없음"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-slate-400 py-12 bg-slate-700/20 rounded-xl border-2 border-dashed border-slate-600">
                    <div className="w-16 h-16 mb-4 bg-slate-600/50 rounded-full flex items-center justify-center">
                      <img src={plusIcon} className="w-8 h-8" alt="Add" />
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
            <form
              onSubmit={handleSubmit(handlePutUserInfo)}
              className="space-y-6">
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
                          src={teamIcon}
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
                {PROFILE_TAB_LIST.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as PROFILE_TAB)}
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
              {activeTab === PROFILE_TAB.PROFILE && (
                <div className="bg-gradient-to-br from-slate-800 to-gray-800 rounded-2xl p-4 border border-slate-600/50 shadow-xl backdrop-blur-sm w-full">
                  <ProfileImageCard
                    userInfo={userInfo}
                    isModifyMode={isModifyMode}
                    onImageChange={handleImageChange}
                  />
                </div>
              )}

              {/* Awards Tab */}
              {activeTab === PROFILE_TAB.AWARDS && (
                <div className="bg-gradient-to-br from-slate-800 to-gray-800 rounded-2xl p-6 border border-slate-600/50 shadow-xl backdrop-blur-sm w-full">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white flex items-center gap-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                      수상 기록
                    </h3>
                    <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                      {Awards?.length || 0}개
                    </span>
                  </div>
                  {Awards && Awards.length > 0 ? (
                    <div className="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                      {Awards.map((award, index) => (
                        <div
                          key={`${award.championship_list_idx}-${index}`}
                          className="flex items-center gap-4 p-4 bg-slate-700/40 rounded-xl hover:bg-slate-700/60 transition-colors duration-200 border border-slate-600/30 group"
                          style={{
                            borderLeftColor: award.championship_list_color,
                          }}>
                          <div className="relative flex-shrink-0">
                            <img
                              src={
                                award.championship_list_throphy_img ||
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
                              {award.championship_list_start_date &&
                              award.championship_list_end_date
                                ? `${award.championship_list_start_date} ~ ${award.championship_list_end_date}`
                                : award.championship_list_start_date ||
                                  award.championship_list_end_date ||
                                  "날짜 정보 없음"}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-slate-400 py-12 bg-slate-700/20 rounded-xl border-2 border-dashed border-slate-600">
                      <div className="w-16 h-16 mb-4 bg-slate-600/50 rounded-full flex items-center justify-center">
                        <img src={plusIcon} className="w-8 h-8" alt="Add" />
                      </div>
                      <p className="text-sm font-medium">
                        수상 기록이 없습니다
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        대회에 참여하여 첫 번째 트로피를 획득해보세요!
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Info Tab */}
              {activeTab === PROFILE_TAB.INFO && (
                <form
                  onSubmit={handleSubmit(handlePutUserInfo)}
                  className="space-y-6">
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
                              src={teamIcon}
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
              {activeTab === PROFILE_TAB.ACCOUNT &&
                (is_mine ? (
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
                ) : (
                  <div>
                    <p className="text-center text-slate-400">
                      본인의 계정이 아닙니다.
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </main>
      </FormProvider>
    </div>
  );
};

export default Profile;
