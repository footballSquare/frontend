import { FormProvider } from "react-hook-form";
import { statLabels } from "../../constant/teamStatKeys";
import TeamDetailHistoryInput from "../../../../../../../../../../4_Shared/hookForm/TeamDetailHistoryInput";
import StatEvidenceImgFormPanel from "../../../../../../../../../../2_Widget/StatEvidenceImgFormPanel";
import editIcon from "../../../../../../../../../../4_Shared/assets/svg/edit.svg";
import useTeamStatForm from "./model/useTeamStatForm";
import MomSelectionModalPanel from "./ui/MomSelectionModalPanel";
import {
  useMyTeamIdx,
  useMyTeamRoleIdx,
} from "../../../../../../../../../../4_Shared/lib/useMyInfo";
import useToggleState from "../../../../../../../../../../4_Shared/model/useToggleState";
import usePostTeamStatsHandler from "./model/usePostTeamStatsHandler";
import usePostTeamStatsEvidence from "../../../../../../../../../../3_Entity/Match/usePostTeamStatsEvidence";

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

  console.log(teamEvidenceImage);
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

  const [postTeamStatsEvidence] = usePostTeamStatsEvidence();

  const getCurrentMomPlayer = () => {
    const momIdx = isEditing ? watch("mom_player_idx") : stats.mom_player_idx;
    return teamPlayer?.find((player) => player.player_list_idx === momIdx);
  };

  const evidenceUrls =
    teamEvidenceImage?.map((item) => item.match_team_stats_evidence_img) || [];

  return (
    <div>
      <div className="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-700 bg-gradient-to-r from-gray-800 to-gray-900">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-grass">{teamName}</h3>
            {!isEditing && (
              <div className="flex items-center gap-2">
                <StatEvidenceImgFormPanel
                  matchIdx={matchIdx}
                  defaultValues={{ urls: evidenceUrls }}
                  onSubmit={postTeamStatsEvidence}
                />
                {isTeamLeader && (
                  <button
                    onClick={toggleIsEditing}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-300 border border-gray-600 rounded-md hover:bg-gray-800 hover:text-grass transition-colors">
                    <img className="w-[15px] h-[15px]" src={editIcon} />
                    수정
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {isEditing ? (
            /* Edit Mode */
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Hidden input for MOM player idx */}
                <input type="hidden" {...methods.register("mom_player_idx")} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {statLabels.map(
                    ({ key, label, isPercentage, isMomField }) => (
                      <div key={key} className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300">
                          {label}
                        </label>
                        {isMomField ? (
                          <div className="flex items-center gap-2">
                            <div className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-gray-200">
                              {getCurrentMomPlayer()?.player_list_nickname ||
                                "선택되지 않음"}
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
                <div className="flex gap-3 pt-6 border-t border-gray-700">
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-4 py-2 bg-grass text-white rounded-lg hover:bg-grass/90 transition-colors font-medium shadow-md">
                    <img className="w-[15px] h-[15px]" src={editIcon} />
                    저장
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      cancelEdit();
                      toggleIsEditing();
                    }}
                    className="flex items-center gap-2 px-4 py-2 text-gray-300 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors">
                    <span>×</span> 취소
                  </button>
                </div>
              </form>
            </FormProvider>
          ) : (
            <FormProvider {...methods}>
              <div className="space-y-0">
                <div className="grid gap-2">
                  {statLabels.map(({ key, label, isPercentage }) => (
                    <div
                      key={key}
                      className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-gray-800/60 transition-colors group">
                      <span className="text-sm font-medium text-gray-300 group-hover:text-gray-200">
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
