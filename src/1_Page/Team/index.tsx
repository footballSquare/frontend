import React from "react";

import HistoryListBox from "./ui/HistoryListBox";
import TeamMatchBox from "./ui/TeamMatchBox";
import TeamMemberListBox from "./ui/TeamMemberListBox";
import TeamAwards from "./ui/TeamAwards";
import BtnGroupManageModalPanel from "./ui/BtnGroupManageModalPanel";

import useGetTeamInfoHandler from "./model/useGetTeamInfoHandler";
import { useMyTeamIdx } from "../../4_Shared/lib/useMyInfo";
import EmptyBanner from "../../4_Shared/components/EmptyBanner";
import {
  MOBILE_TABS,
  MobileTabKey,
  DESKTOP_TABS,
  DesktopTabKey,
} from "./constant/mobileTab";
import { TeamInfoContext } from "../../4_Shared/model/useTeamInfoContext";
import DefaultTeamEmblem from "../../4_Shared/components/DefaultTeamEmblem";
import TeamBoardsList from "./ui/TeamBoardsList";

const Team = () => {
  const [myTeamIdx] = useMyTeamIdx();

  // api with optimistic state
  const { displayTeamInfo, loading, handlers } = useGetTeamInfoHandler();

  // tab state
  const [mobileTab, setMobileTab] = React.useState<MobileTabKey>(
    MobileTabKey.Info
  );
  const [desktopTab, setDesktopTab] = React.useState<DesktopTabKey>(
    DesktopTabKey.Matches
  );

  const {
    team_list_idx,
    team_list_banner,
    team_list_emblem,
    team_list_color,
    team_list_name,
    team_list_short_name,
    team_list_announcement,
  } = displayTeamInfo;

  return (
    <main className="w-full">
      <TeamInfoContext.Provider
        value={{
          teamListColor: team_list_color,
        }}>
        <div className="bg-gray-900 text-white flex flex-col w-full min-h-[100vh] ">
          <div className="w-full sm:w-[90%] max-w-7xl mx-auto text-sm pt-5 px-2 sm:px-0">
            {loading ? (
              <div className="text-center py-10">로딩중...</div>
            ) : (
              <div className="space-y-6">
                {/* 배너 영역 */}
                <section className="relative w-full">
                  {team_list_banner ? (
                    <img
                      className="w-full h-[150px] sm:h-[200px] object-cover rounded-xl shadow-md"
                      src={team_list_banner}
                      alt="Team Banner"
                    />
                  ) : (
                    <EmptyBanner
                      text={team_list_name}
                      hexColor={team_list_color}
                    />
                  )}
                </section>

                {/* 트로피, 혹은 기타 상훈 정보 */}
                <div className="hidden sm:block">
                  <TeamAwards />
                </div>

                {/* 모바일 탭 네비게이션 & 콘텐츠 */}
                <div className="sm:hidden">
                  {/* 탭 버튼 */}
                  <div className="flex justify-around border-b border-gray-700 mb-4">
                    {MOBILE_TABS.map(({ key, label }) => (
                      <button
                        key={key}
                        onClick={() => setMobileTab(key)}
                        className={`flex-1 py-2 text-sm ${
                          mobileTab === key
                            ? "border-b-2 border-blue-400 font-semibold"
                            : "text-gray-400"
                        }`}>
                        {label}
                      </button>
                    ))}
                  </div>

                  {/* 탭 콘텐츠 */}
                  {mobileTab === MobileTabKey.Info && (
                    <div className="space-y-6">
                      {/* 팀 기본 정보 + History */}
                      <div className="flex flex-col items-center space-y-4">
                        <div className="flex flex-col items-center space-y-3">
                          <div className="w-20 h-20 rounded-full shadow-md flex items-center justify-center">
                            {team_list_emblem ? (
                              <img
                                src={team_list_emblem}
                                alt="Team Emblem"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <DefaultTeamEmblem
                                bgColor={team_list_color}
                                text={team_list_short_name}
                              />
                            )}
                          </div>

                          <div className="flex flex-col items-center">
                            <h1
                              className="text-xl font-bold text-center"
                              style={{ color: team_list_color }}>
                              {team_list_name} #{team_list_short_name}
                            </h1>
                            <BtnGroupManageModalPanel
                              handlers={handlers}
                              teamInfo={displayTeamInfo}
                            />
                          </div>

                          <HistoryListBox />
                        </div>

                        <div className="rounded-lg shadow p-4 bg-gray-800">
                          <h2 className="text-base font-semibold mb-2">
                            팀 설명
                          </h2>
                          <p className="text-gray-200 text-sm whitespace-pre-line leading-relaxed">
                            {team_list_announcement}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {mobileTab === MobileTabKey.Members && <TeamMemberListBox />}

                  {mobileTab === MobileTabKey.Matches && (
                    <>
                      {team_list_idx === myTeamIdx ? (
                        <TeamMatchBox />
                      ) : (
                        <div className="rounded-lg shadow p-4 bg-gray-800">
                          <h2 className="text-base font-semibold  mb-2">
                            팀 경기 정보
                          </h2>
                          <p className="text-gray-600 text-sm whitespace-pre-line leading-relaxed">
                            현재 경기 정보는 팀원만 확인할 수 있습니다.
                          </p>
                        </div>
                      )}
                    </>
                  )}

                  {mobileTab === MobileTabKey.Boards && (
                    <>
                      {team_list_idx === myTeamIdx ? (
                        <TeamBoardsList />
                      ) : (
                        <div className="rounded-lg shadow p-4 bg-gray-800">
                          <h2 className="text-base font-semibold mb-2">
                            팀 게시판
                          </h2>
                          <p className="text-gray-600 text-sm whitespace-pre-line leading-relaxed">
                            팀 게시판은 팀원만 확인할 수 있습니다.
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* 본문: 그리드 레이아웃 */}
                <article className="hidden sm:grid sm:grid-cols-5 sm:gap-6 pb-4">
                  {/* 왼쪽 섹션: 팀 정보와 역사 */}
                  <div className="sm:col-span-2 space-y-6">
                    {/* 팀 기본 정보 */}
                    <div className="flex flex-col items-center sm:items-start space-y-4">
                      <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-3">
                        <div className="w-20 h-20 rounded-full overflow-hidden shadow-md flex items-center justify-center">
                          {team_list_emblem ? (
                            <img
                              src={team_list_emblem}
                              alt="Team Emblem"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <DefaultTeamEmblem
                              bgColor={team_list_color}
                              text={team_list_short_name}
                            />
                          )}
                        </div>
                        <div className="flex flex-col items-center sm:items-start">
                          <h1
                            className="text-xl font-bold text-center sm:text-left"
                            style={{ color: team_list_color }}>
                            {team_list_name} #{team_list_short_name}
                          </h1>
                          <BtnGroupManageModalPanel
                            handlers={handlers}
                            teamInfo={displayTeamInfo}
                          />
                        </div>
                      </div>

                      {/* 팀 연혁 */}

                      <HistoryListBox />
                    </div>

                    {/* 팀 설명 */}
                    <div className="rounded-lg shadow p-4 bg-gray-800">
                      <h2 className="text-base font-semibold  mb-2">팀 설명</h2>
                      <p className="text-gray-200 text-sm whitespace-pre-line leading-relaxed">
                        {team_list_announcement}
                      </p>
                    </div>

                    {/* 팀 멤버 현황 */}
                    <TeamMemberListBox />
                  </div>

                  {/* 오른쪽 섹션: 경기 정보 및 게시판 */}
                  <div className="sm:col-span-3 space-y-4">
                    {/* 탭 네비게이션 */}
                    <div className="flex items-center gap-1 bg-gray-800 p-1 rounded-lg">
                      {DESKTOP_TABS.map(({ key, label }) => (
                        <button
                          key={key}
                          onClick={() => setDesktopTab(key)}
                          className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                            desktopTab === key
                              ? "bg-gray-700 text-white"
                              : "text-gray-400 hover:text-white"
                          }`}>
                          {label}
                        </button>
                      ))}
                    </div>

                    {/* 탭 콘텐츠 */}
                    {desktopTab === DesktopTabKey.Matches && (
                      <div>
                        {team_list_idx === myTeamIdx ? (
                          <TeamMatchBox />
                        ) : (
                          <div className="rounded-lg shadow p-4 bg-gray-800">
                            <h2 className="text-base font-semibold mb-2">
                              팀 경기 정보
                            </h2>
                            <p className="text-gray-600 text-sm whitespace-pre-line leading-relaxed">
                              현재 경기 정보는 팀원만 확인할 수 있습니다.
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {desktopTab === DesktopTabKey.Boards && (
                      <div>
                        {team_list_idx === myTeamIdx ? (
                          <TeamBoardsList />
                        ) : (
                          <div className="rounded-lg shadow p-4 bg-gray-800">
                            <h2 className="text-base font-semibold mb-2">
                              팀 게시판
                            </h2>
                            <p className="text-gray-600 text-sm whitespace-pre-line leading-relaxed">
                              팀 게시판은 팀원만 확인할 수 있습니다.
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </article>
              </div>
            )}
          </div>
        </div>
      </TeamInfoContext.Provider>
    </main>
  );
};

export default Team;
