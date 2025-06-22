import React from "react";
import useToggleState from "../../../../../../../../../../4_Shared/model/useToggleState";
import {
  useMyTeamIdx,
  useMyTeamRoleIdx,
} from "../../../../../../../../../../4_Shared/lib/useMyInfo";
import useTeamStatForm from "./model/useTeamStatForm";
import usePostTeamStatsHandler from "./model/usePostTeamStatsHandler";
import usePostTeamStatsEvidence from "../../../../../../../../../../3_Entity/Match/usePostTeamStatsEvidence";
import StatEvidenceImgFormPanel from "../../../../../../../../../../2_Widget/StatEvidenceImgFormPanel";
import { FormProvider } from "react-hook-form";
import { statLabels } from "./constant/teamStatKeys";
import TeamDetailHistoryInput from "../../../../../../../../../../4_Shared/hookForm/TeamDetailHistoryInput";
import editIcon from "../../../../../../../../../../4_Shared/assets/svg/edit.svg";
import MomSelectionModalPanel from "../../../../../../../../../../2_Widget/MomSelectionModalPanel";
import {
  getCurrentMomPlayer,
  getEvidenceUrls,
} from "./lib/getMatchDetailStats";

const VerticalTeamStatCards = (props: VerticalTeamStatCardsProps) => {
  const { firstTeam, secondTeam } = props;
  const [activeTeam, setActiveTeam] = React.useState<0 | 1>(0);
  const teams = [firstTeam, secondTeam];
  const teamData = teams[activeTeam];

  const {
    name: teamName,
    stats,
    evidenceImage,
    players: teamPlayer,
    teamListIdx,
    matchIdx,
  } = teamData;

  const [isEditing, toggleIsEditing] = useToggleState();
  const [myTeamRoleIdx] = useMyTeamRoleIdx();
  const [myTeamIdx] = useMyTeamIdx();
  const isTeamLeader = myTeamRoleIdx === 0 && myTeamIdx === teamListIdx;

  const { methods, cancelEdit, setBackupTeamStats } = useTeamStatForm(
    stats,
    matchIdx
  );
  const { handleSubmit } = methods;
  const [handlePostTeamStats] = usePostTeamStatsHandler(
    cancelEdit,
    setBackupTeamStats
  );

  const [postTeamStatsEvidence, responseUrl] = usePostTeamStatsEvidence();

  const evidenceUrls = getEvidenceUrls(responseUrl, evidenceImage);
  const momPlayer = getCurrentMomPlayer(
    teamPlayer,
    methods.getValues("mom_player_idx")
  );
  return (
    <div className="w-full max-w-6xl mx-auto px-2 py-3 space-y-4 lg:p-4 lg:space-y-6">
      <div className="">
        <div className="flex space-x-1 bg-gray-800 p-1 rounded-lg">
          {teams.map((team, index) => (
            <button
              key={index}
              onClick={() => setActiveTeam(index as 0 | 1)}
              className={`flex-1 py-3 px-3 text-base font-semibold rounded-md transition-colors lg:py-2 lg:px-4 lg:text-sm lg:font-medium ${
                activeTeam === index
                  ? "bg-gray-700 text-gray-100 shadow-sm"
                  : "text-gray-400 hover:text-gray-100"
              }`}>
              {team.name}
            </button>
          ))}
        </div>

        <div className="mt-4 lg:mt-6">
          <div>
            <div className="bg-gray-900/80  border border-gray-700/60 rounded-lg shadow-sm ">
              {/* Header */}
              <div className="px-3 py-2.5 border-b border-gray-700/50 bg-gradient-to-r from-gray-800/80 to-gray-900/80 lg:px-2 lg:py-1.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-grass truncate lg:text-xs lg:font-semibold">
                    {teamName}
                  </h3>
                  {!isEditing && (
                    <div className="flex items-center gap-1 lg:gap-0.5">
                      <StatEvidenceImgFormPanel
                        matchIdx={matchIdx}
                        defaultValues={evidenceUrls}
                        onSubmit={postTeamStatsEvidence}
                        canChange={isTeamLeader}
                      />
                      {isTeamLeader && (
                        <button
                          onClick={toggleIsEditing}
                          className="flex items-center gap-1 px-2 py-1 text-xs text-gray-400 hover:text-grass transition-colors lg:gap-0.5 lg:px-1.5 lg:py-0.5 lg:text-[10px]">
                          <img
                            className="w-3 h-3 lg:w-[10px] lg:h-[10px]"
                            src={editIcon}
                          />
                          편집
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-3 lg:p-2">
                {isEditing ? (
                  /* Edit Mode */
                  <FormProvider {...methods}>
                    <form
                      onSubmit={handleSubmit((data: PostTeamStatsForm) => {
                        handlePostTeamStats({
                          matchIdx,
                          data,
                        });
                        toggleIsEditing();
                      })}
                      className="space-y-3 lg:space-y-2">
                      {/* Hidden input for MOM player idx */}
                      <input
                        type="hidden"
                        {...methods.register("mom_player_idx")}
                      />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-2">
                        {statLabels.map(
                          ({ key, label, isPercentage, isMomField }) => (
                            <div key={key} className="space-y-1 lg:space-y-0.5">
                              <label className="block text-xs font-medium text-gray-400 lg:text-[10px]">
                                {label}
                              </label>
                              {isMomField ? (
                                <div className="flex items-center gap-1 lg:gap-0.5">
                                  <div className="flex-1 px-2 py-1 bg-gray-800/80 border border-gray-600/50 rounded text-xs text-gray-300 lg:px-1.5 lg:py-0.5 lg:text-[10px]">
                                    {momPlayer?.player_list_nickname ||
                                      "미선택"}
                                  </div>
                                  <MomSelectionModalPanel
                                    teamPlayer={teamPlayer}
                                    currentMomIdx={momPlayer?.player_list_idx}
                                  />
                                </div>
                              ) : (
                                <TeamDetailHistoryInput
                                  registerType={key}
                                  isFile={false}
                                  isPercentage={Boolean(isPercentage)}
                                  isEditing={true}
                                />
                              )}
                            </div>
                          )
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-3 border-t border-gray-700/50 lg:gap-1 lg:pt-2">
                        <button
                          type="submit"
                          className="flex items-center gap-1 px-3 py-1.5 bg-grass/90 text-white rounded text-xs hover:bg-grass transition-colors font-medium lg:gap-0.5 lg:px-2 lg:py-1 lg:text-[10px]">
                          <img
                            className="w-3 h-3 lg:w-[10px] lg:h-[10px]"
                            src={editIcon}
                          />
                          저장
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            cancelEdit();
                            toggleIsEditing();
                          }}
                          className="flex items-center gap-1 px-3 py-1.5 text-gray-400 border border-gray-600/50 rounded text-xs hover:bg-gray-800/50 transition-colors lg:gap-0.5 lg:px-2 lg:py-1 lg:text-[10px]">
                          <span className="text-xs lg:text-[8px]">×</span> 취소
                        </button>
                      </div>
                    </form>
                  </FormProvider>
                ) : (
                  <FormProvider {...methods}>
                    <div className="space-y-1 lg:space-y-0">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-1 lg:gap-x-2 lg:gap-y-0">
                        {statLabels.map(({ key, label, isPercentage }) => (
                          <div
                            key={key}
                            className="flex items-center justify-between py-1.5 px-1.5 rounded hover:bg-gray-800/40 transition-colors group lg:py-1 lg:px-1">
                            <span className="text-xs font-medium text-gray-400 group-hover:text-gray-300 truncate pr-2 lg:text-[10px] lg:pr-1">
                              {label}
                            </span>
                            <div className="inline-flex items-center">
                              <TeamDetailHistoryInput
                                registerType={key}
                                isFile={false}
                                isPercentage={Boolean(isPercentage)}
                                isEditing={false}
                                currentMomPlayer={momPlayer}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </FormProvider>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerticalTeamStatCards;
