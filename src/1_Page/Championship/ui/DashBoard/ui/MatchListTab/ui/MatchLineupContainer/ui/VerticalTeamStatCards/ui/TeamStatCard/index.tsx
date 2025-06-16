import { FormProvider } from "react-hook-form";
import { statLabels } from "../../constant/teamStatKeys";
import TeamDetailHistoryInput from "../../../../../../../../../../../../4_Shared/hookForm/TeamDetailHistoryInput";
import StatEvidenceImgFormPanel from "../../../../../../../../../../../../2_Widget/StatEvidenceImgFormPanel";
import editIcon from "../../../../../../../../../../../../4_Shared/assets/svg/edit.svg";
import useTeamStatForm from "./model/useTeamStatForm";
import MomSelectionModalPanel from "./ui/MomSelectionModalPanel";
import {
  useMyTeamIdx,
  useMyTeamRoleIdx,
} from "../../../../../../../../../../../../4_Shared/lib/useMyInfo";
import useToggleState from "../../../../../../../../../../../../4_Shared/model/useToggleState";
import usePostTeamStatsHandler from "./model/usePostTeamStatsHandler";
import usePostTeamStatsEvidence from "../../../../../../../../../../../../3_Entity/Match/usePostTeamStatsEvidence";

const TeamStatCard = (props: TeamStatCardProps) => {
  const { teamData } = props;
  const {
    name: teamName,
    stats,
    evidenceImage: teamEvidenceImage,
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
  const { handleSubmit, watch } = methods;
  const [handlePostTeamStats] = usePostTeamStatsHandler(
    cancelEdit,
    setBackupTeamStats
  );

  const onSubmit = (values: PostTeamStatsForm) => {
    handlePostTeamStats({
      matchIdx,
      data: values,
    });
    toggleIsEditing();
  };

  const [postTeamStatsEvidence, responseUrl] = usePostTeamStatsEvidence();

  const getCurrentMomPlayer = () => {
    const momIdx = isEditing ? watch("mom_player_idx") : stats.mom_player_idx;
    return teamPlayer?.find((player) => player.player_list_idx === momIdx);
  };

  const evidenceUrls =
    responseUrl ||
    teamEvidenceImage?.map((item) => item.match_team_stats_evidence_img) ||
    [];

  return (
    <div>
      <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700/60 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 lg:rounded-md">
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
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-3 lg:space-y-2">
                {/* Hidden input for MOM player idx */}
                <input type="hidden" {...methods.register("mom_player_idx")} />

                <div className="grid grid-cols-2 gap-3 lg:gap-2">
                  {statLabels.map(
                    ({ key, label, isPercentage, isMomField }) => (
                      <div key={key} className="space-y-1 lg:space-y-0.5">
                        <label className="block text-xs font-medium text-gray-400 lg:text-[10px]">
                          {label}
                        </label>
                        {isMomField ? (
                          <div className="flex items-center gap-1 lg:gap-0.5">
                            <div className="flex-1 px-2 py-1 bg-gray-800/80 border border-gray-600/50 rounded text-xs text-gray-300 lg:px-1.5 lg:py-0.5 lg:text-[10px]">
                              {getCurrentMomPlayer()?.player_list_nickname ||
                                "미선택"}
                            </div>
                            <MomSelectionModalPanel
                              teamPlayer={teamPlayer}
                              currentMomIdx={
                                getCurrentMomPlayer()?.player_list_idx
                              }
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
                <div className="grid grid-cols-2 gap-x-3 gap-y-1 lg:gap-x-2 lg:gap-y-0">
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
                          getCurrentMomPlayer={getCurrentMomPlayer}
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
  );
};

export default TeamStatCard;
