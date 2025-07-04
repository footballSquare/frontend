import React from "react";
import { FormProvider } from "react-hook-form";

import { statLabels } from "./constant/teamStatKeys";
import useTeamStatForm from "./model/useTeamStatForm";
import usePostTeamStatsHandler from "./model/usePostTeamStatsHandler";
import {
  getCurrentMomPlayer,
  getEvidenceUrls,
} from "./lib/getMatchDetailStats";

import MomSelectionModalPanel from "./ui/MomSelectionModalPanel";

import StatEvidenceImgFormPanel from "../../../../../../../../2_Widget/StatEvidenceImgFormPanel";
import usePostTeamStatsEvidence from "../../../../../../../../3_Entity/Match/usePostTeamStatsEvidence";
import useToggleState from "../../../../../../../../4_Shared/model/useToggleState";
import {
  useMyTeamIdx,
  useMyTeamRoleIdx,
} from "../../../../../../../../4_Shared/lib/useMyInfo";
import TeamDetailHistoryInput from "../../../../../../../../4_Shared/hookForm/TeamDetailHistoryInput";
import editIcon from "../../../../../../../../4_Shared/assets/svg/edit.svg";
import DefaultTeamEmblem from "../../../../../../../../4_Shared/components/DefaultTeamEmblem";

const VerticalTeamStatCards = (props: VerticalTeamStatCardsProps) => {
  const {
    championshipMatchDetail,
    evidenceImage,
    selectedMatchList,
    handleUpdateMatchScore,
  } = props;
  const [activeTeam, setActiveTeam] = React.useState<0 | 1>(0);

  // 팀 데이터 추출
  const firstTeam = championshipMatchDetail.first_team;
  const secondTeam = championshipMatchDetail.second_team;
  const teams = [firstTeam, secondTeam];
  const currentTeam = teams[activeTeam];

  const [myTeamRoleIdx] = useMyTeamRoleIdx();
  const [myTeamIdx] = useMyTeamIdx();
  const isTeamLeader =
    myTeamRoleIdx === 0 && myTeamIdx === currentTeam.team_list_idx;

  // selectedMatchList에서 팀 정보 추출
  const teamInfos = [
    selectedMatchList?.championship_match_first,
    selectedMatchList?.championship_match_second,
  ];
  const currentTeamInfo = teamInfos[activeTeam];

  // 매치 정보 추출
  const matchIdxs = [
    evidenceImage.first_match_idx,
    evidenceImage.second_match_idx,
  ];
  const currentMatchIdx = matchIdxs[activeTeam];

  const [isEditing, toggleIsEditing] = useToggleState();

  const { methods, cancelEdit, setBackupTeamStats } = useTeamStatForm(
    currentTeam.stats,
    currentMatchIdx
  );
  const { handleSubmit, watch } = methods;
  const [handlePostTeamStats] = usePostTeamStatsHandler({
    cancelEdit,
    setBackupTeamStats,
    toggleIsEditing,
    handleUpdateMatchScore,
  });

  const [postTeamStatsEvidence, responseUrl] = usePostTeamStatsEvidence();

  // 현재 팀의 증거 이미지 추출
  const currentTeamEvidence =
    activeTeam === 0
      ? evidenceImage.first_team_evidence
      : evidenceImage.second_team_evidence;

  const evidenceUrls = getEvidenceUrls(responseUrl, currentTeamEvidence || []);

  const momPlayerIdx = watch("mom_player_idx");
  const momPlayer = getCurrentMomPlayer(currentTeam.player_stats, momPlayerIdx);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-6">
      <FormProvider {...methods}>
        {/* 팀 선택 탭 */}
        <div className="flex space-x-1 bg-gray-800 p-1 rounded-lg">
          {teamInfos.map((teamInfo, index) => (
            <button
              key={index}
              onClick={() => setActiveTeam(index as 0 | 1)}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                activeTeam === index
                  ? "text-white shadow-sm"
                  : "text-gray-400 hover:text-gray-100"
              }`}
              style={
                activeTeam === index
                  ? { backgroundColor: teamInfo?.team_list_color }
                  : undefined
              }>
              {teamInfo?.team_list_name}
            </button>
          ))}
        </div>

        {/* 팀 스탯 카드 */}
        <div className="bg-gray-900 border border-gray-700 rounded-lg">
          {/* 헤더 */}
          <div className="px-4 py-3 border-b border-gray-700 bg-gray-800 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8">
                  {currentTeamInfo?.team_list_emblem ? (
                    <img src={currentTeamInfo?.team_list_emblem} />
                  ) : (
                    <DefaultTeamEmblem
                      bgColor={currentTeamInfo?.team_list_color}
                      text={currentTeamInfo?.team_list_short_name}
                    />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {currentTeamInfo?.team_list_name}
                  </h3>
                  <p className="text-sm text-gray-400">
                    점수: {currentTeamInfo?.match_team_stats_our_score ?? 0}
                  </p>
                </div>
              </div>

              {!isEditing && (
                <div className="flex items-center gap-2">
                  <StatEvidenceImgFormPanel
                    matchIdx={currentMatchIdx}
                    defaultValues={evidenceUrls}
                    onSubmit={postTeamStatsEvidence}
                    canChange={isTeamLeader}
                  />
                  {isTeamLeader && (
                    <button
                      onClick={toggleIsEditing}
                      className="flex items-center gap-1 px-3 py-1 text-sm text-gray-400 hover:text-white transition-colors border border-gray-600 rounded">
                      <img className="w-4 h-4" src={editIcon} />
                      편집
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* 콘텐츠 */}
          <div className="p-4">
            {isEditing ? (
              /* 편집 모드 */
              <form
                onSubmit={handleSubmit((data: PostTeamStatsForm) => {
                  handlePostTeamStats({
                    matchIdx: currentMatchIdx,
                    data,
                  });
                })}
                className="space-y-4">
                <input type="hidden" {...methods.register("mom_player_idx")} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {statLabels.map(
                    ({ key, label, isPercentage, isMomField }) => (
                      <div key={key} className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300">
                          {label}
                        </label>
                        {isMomField ? (
                          <div className="flex items-center gap-2">
                            <TeamDetailHistoryInput
                              registerType={key}
                              isPercentage={isPercentage}
                              currentMomPlayer={momPlayer}
                              isEditing
                            />
                            <MomSelectionModalPanel
                              teamPlayer={currentTeam.player_stats}
                              currentMomIdx={momPlayerIdx}
                            />
                          </div>
                        ) : (
                          <TeamDetailHistoryInput
                            registerType={key}
                            isPercentage={isPercentage}
                            currentMomPlayer={momPlayer}
                            isEditing
                          />
                        )}
                      </div>
                    )
                  )}
                </div>

                {/* 액션 버튼 */}
                <div className="flex gap-2 pt-4 border-t border-gray-700">
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                    <img className="w-4 h-4" src={editIcon} />
                    저장
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      cancelEdit();
                      toggleIsEditing();
                    }}
                    className="px-4 py-2 text-gray-400 border border-gray-600 rounded hover:bg-gray-800 transition-colors">
                    취소
                  </button>
                </div>
              </form>
            ) : (
              /* 보기 모드 */
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {statLabels.map(({ key, label, isPercentage }) => (
                  <div
                    key={key}
                    className="flex items-center justify-between py-2 px-3 rounded bg-gray-800/50 hover:bg-gray-800 transition-colors">
                    <span className="text-sm font-medium text-gray-300">
                      {label}
                    </span>
                    <TeamDetailHistoryInput
                      registerType={key}
                      isPercentage={Boolean(isPercentage)}
                      currentMomPlayer={momPlayer}
                      isEditing={false}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </FormProvider>
    </div>
  );
};

export default VerticalTeamStatCards;
