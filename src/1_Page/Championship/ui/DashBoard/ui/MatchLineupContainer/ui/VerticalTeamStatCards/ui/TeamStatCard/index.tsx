import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { statLabels } from "../../constant/teamStatKeys";
import TeamDetailHistoryInput from "../../../../../../../../../../4_Shared/hookForm/TeamDetailHistoryInput";
import { teamStatsSchema } from "../../../../../../../../../../4_Shared/hookForm/TeamDetailHistoryInput/schema";
import StatEvidenceImgFormPanel from "../../../../../../../../../../2_Widget/StatEvidenceImgFormPanel";
import MomSelectionModal from "./ui/MomSelectionModalPanel";
import editIcon from "../../../../../../../../../../4_Shared/assets/svg/edit.svg";

const TeamStatCard = (props: TeamStatCardProps) => {
  const { teamName, stats, onSave, teamEvidenceImage, teamPlayer } = props;
  const [isEditing, setIsEditing] = React.useState(false);

  const methods = useForm<PostTeamStatsForm>({
    resolver: yupResolver(teamStatsSchema),
    defaultValues: {
      ...stats,
    } as unknown as Partial<PostTeamStatsForm>,
  });
  const { handleSubmit, reset, watch } = methods;

  const handleSave = (values: PostTeamStatsForm) => {
    console.log("Saving team stats:", values);
    onSave?.(values);
    setIsEditing(false);
  };

  const handleCancel = () => {
    reset({
      ...stats,
      mom_player_idx: stats.mom_player_idx || 0,
    } as unknown as PostTeamStatsForm);
    setIsEditing(false);
  };

  const handleEvidenceSubmit = (data: FinalData) => {
    console.log("Evidence data:", data);
    // 실제 구현에서는 여기서 증거 이미지를 저장
    // data.urls: 기존 이미지 URL들
    // data.files: 새로 업로드된 파일들
    // data.previewImages: 새 이미지들의 미리보기 URL들 (optional)
  };

  const getCurrentMomPlayer = () => {
    // 편집 모드일 때는 폼의 현재 값을 사용, 아닐 때는 props의 stats 사용
    const momIdx = isEditing ? watch("mom_player_idx") : stats.mom_player_idx;
    return teamPlayer?.find((player) => player.player_list_idx === momIdx);
  };
  const evidenceUrls =
    teamEvidenceImage?.map((item) => item.match_team_stats_evidence_img) || [];

  const formatValue = (
    value: number | null | undefined,
    isPercentage = false
  ): string => {
    if (value === null || value === undefined || Number.isNaN(value))
      return "-";
    return isPercentage ? `${value}%` : value.toString();
  };

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
                  defaultValues={{ urls: evidenceUrls }}
                  onSubmit={handleEvidenceSubmit}
                />
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-300 border border-gray-600 rounded-md hover:bg-gray-800 hover:text-grass transition-colors">
                  <img className="w-[15px] h-[15px]" src={editIcon} />
                  수정
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {isEditing ? (
            /* Edit Mode */
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(handleSave)} className="space-y-4">
                {/* Hidden input for MOM player idx */}
                <input type="hidden" {...methods.register("mom_player_idx")} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {statLabels
                    .filter(
                      ({ key }) => key !== "match_team_stats_evidence_img"
                    )
                    .map(({ key, label, isPercentage, isMomField }) => (
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
                            <MomSelectionModal
                              teamPlayer={teamPlayer}
                              currentMomIdx={stats.mom_player_idx}
                            />
                          </div>
                        ) : (
                          <TeamDetailHistoryInput
                            registerType={key}
                            isFile={false}
                            isPercentage={Boolean(isPercentage)}
                          />
                        )}
                      </div>
                    ))}
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
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-4 py-2 text-gray-300 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors">
                    <span>×</span> 취소
                  </button>
                </div>
              </form>
            </FormProvider>
          ) : (
            /* View Mode */
            <div className="space-y-0">
              <div className="grid gap-2">
                {statLabels
                  .filter(({ key }) => key !== "match_team_stats_evidence_img")
                  .map(({ key, label, isPercentage, isMomField }) => (
                    <div
                      key={key}
                      className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-gray-800/60 transition-colors group">
                      <span className="text-sm font-medium text-gray-300 group-hover:text-gray-200">
                        {label}
                      </span>
                      <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-semibold bg-gray-800 text-grass border border-gray-700">
                        {isMomField ? (
                          <div className="flex items-center gap-2">
                            <span>👑</span>
                            <span>
                              {getCurrentMomPlayer()?.player_list_nickname ||
                                "-"}
                            </span>
                          </div>
                        ) : (
                          formatValue(
                            stats[key as keyof TeamStats] as
                              | number
                              | null
                              | undefined,
                            isPercentage
                          )
                        )}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamStatCard;
