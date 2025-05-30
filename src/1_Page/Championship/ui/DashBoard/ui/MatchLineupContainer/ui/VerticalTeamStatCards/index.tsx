import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { statLabels } from "./constant/teamStatKeys";
import TeamDetailHistoryInput from "../../../../../../../../4_Shared/hookForm/TeamDetailHistoryInput";
import { teamStatsSchema } from "./schema";

const VerticalTeamStatCards = (props: VerticalTeamStatCardsProps) => {
  const { teamName, stats } = props;
  const [isEditing, setIsEditing] = useState(false);

  const methods = useForm<PostTeamStatsForm>({
    resolver: yupResolver(teamStatsSchema),
    defaultValues: stats as unknown as Partial<PostTeamStatsForm>,
  });
  const { handleSubmit, reset } = methods;

  const onSave = (values: PostTeamStatsForm) => {
    console.log("Saving team stats:", values);
    setIsEditing(false);
  };

  const onCancel = () => {
    reset(stats as unknown as PostTeamStatsForm);
    setIsEditing(false);
  };

  const formatValue = (
    value: number | null | undefined,
    isPercentage = false
  ): string => {
    if (value === null || value === undefined || Number.isNaN(value))
      return "-";
    return isPercentage ? `${value}%` : value.toString();
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-700 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-grass">{teamName}</h3>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-300 border border-gray-600 rounded-md hover:bg-gray-800 transition-colors">
              <span className="text-base">✏️</span>
              수정
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {isEditing ? (
            /* Edit Mode */
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSave)} className="space-y-4">
                <div className="space-y-3">
                  {statLabels.map(({ key, label, isPercentage, isFile }) => (
                    <div key={key} className="space-y-1">
                      <label className="block text-sm font-medium text-gray-300">
                        {label}
                      </label>
                      <TeamDetailHistoryInput
                        registerType={key}
                        isFile={Boolean(isFile)}
                        isPercentage={Boolean(isPercentage)}
                      />
                    </div>
                  ))}
                </div>
                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-4 py-2 bg-grass text-white rounded-md hover:bg-grass/90 transition-colors font-medium">
                    <span className="text-base">💾</span>
                    저장
                  </button>
                  <button
                    type="button"
                    onClick={onCancel}
                    className="flex items-center gap-2 px-4 py-2 text-gray-300 border border-gray-600 rounded-md hover:bg-gray-800 transition-colors">
                    <span className="text-base">✖️</span>
                    취소
                  </button>
                </div>
              </form>
            </FormProvider>
          ) : (
            /* View Mode */
            <div className="space-y-0">
              <table className="w-full">
                <tbody className="divide-y divide-gray-700">
                  {statLabels.map(({ key, label, isPercentage }) => (
                    <tr
                      key={key}
                      className="hover:bg-gray-800/60 transition-colors">
                      <td className="py-3 pr-4 text-sm font-medium text-gray-300">
                        {label}
                      </td>
                      <td className="py-3 text-right">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-sm font-medium bg-gray-800 text-gray-100">
                          {key === "match_team_stats_evidence_img"
                            ? stats[key as keyof TeamStats]
                              ? "첨부 완료"
                              : "-"
                            : key === "mom_player_idx"
                            ? stats[key as keyof TeamStats] ?? "-"
                            : formatValue(
                                stats[key as keyof TeamStats] as
                                  | number
                                  | null
                                  | undefined,
                                isPercentage
                              )}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerticalTeamStatCards;
