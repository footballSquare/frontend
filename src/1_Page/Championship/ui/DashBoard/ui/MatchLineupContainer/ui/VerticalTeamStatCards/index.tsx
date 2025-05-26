import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type TeamStats = {
  match_team_stats_our_score: number | null;
  match_team_stats_other_score: number | null;
  match_team_stats_possesion: number | null; // ← 주의: 오타 유지
  match_team_stats_total_shot: number | null;
  match_team_stats_total_pass: number | null;
  match_team_stats_total_tackle: number | null;
  match_team_stats_success_tackle: number | null;
  match_team_stats_expectation_goal: number | null;
  match_team_stats_saved: number | null;
  match_team_stats_cornerkick: number | null;
  match_team_stats_freekick: number | null;
  match_team_stats_penaltykick: number | null;
  match_team_stats_evidence_img?: File;
  match_match_idx: number | null;
  mom: number | null; // MOM 선수 인덱스
};

const teamStatsSchema = yup.object({
  match_team_stats_our_score: yup.number().min(0).required(),
  match_team_stats_other_score: yup.number().min(0).required(),
  match_team_stats_possesion: yup.number().min(0).max(100).required(),
  match_team_stats_total_shot: yup.number().min(0).required(),
  match_team_stats_total_pass: yup.number().min(0).required(),
  match_team_stats_total_tackle: yup.number().min(0).required(),
  match_team_stats_success_tackle: yup.number().min(0).required(),
  match_team_stats_expectation_goal: yup.number().min(0).required(),
  match_team_stats_saved: yup.number().min(0).required(),
  match_team_stats_cornerkick: yup.number().min(0).required(),
  match_team_stats_freekick: yup.number().min(0).required(),
  match_team_stats_penaltykick: yup.number().min(0).required(),
  match_match_idx: yup.number().required(),
  mom: yup.number().required(),
  match_team_stats_evidence_img: yup
    .mixed<File>()
    .test(
      "fileSize",
      "1 MB 이하 이미지",
      (file) => !file || file.size <= 1024 * 1024
    )
    .test(
      "fileType",
      "JPG,JPEG,PNG 만 허용",
      (file) =>
        !file || ["image/jpeg", "image/png", "image/jpg"].includes(file.type)
    ),
});

// Component
export default function VerticalTeamStatCards({
  teamName,
  stats,
}: VerticalTeamStatCardsProps) {
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TeamStats>({
    resolver: yupResolver(teamStatsSchema),
    defaultValues: stats,
  });

  const onSave = (values: TeamStats) => {
    console.log("Saving team stats:", values);
    setIsEditing(false);
  };

  const onCancel = () => {
    reset(stats);
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

  const statLabels = [
    { key: "match_team_stats_our_score", label: "우리 팀 득점" },
    { key: "match_team_stats_other_score", label: "상대 팀 득점" },
    { key: "match_team_stats_possesion", label: "점유율", isPercentage: true },
    { key: "match_team_stats_total_shot", label: "슛팅 횟수" },
    { key: "match_team_stats_total_pass", label: "패스 횟수" },
    { key: "match_team_stats_total_tackle", label: "태클 횟수" },
    { key: "match_team_stats_success_tackle", label: "태클 성공 횟수" },
    { key: "match_team_stats_expectation_goal", label: "기대 득점" },
    { key: "match_team_stats_saved", label: "선방 횟수" },
    { key: "match_team_stats_cornerkick", label: "코너킥 횟수" },
    { key: "match_team_stats_freekick", label: "프리킥 횟수" },
    { key: "match_team_stats_penaltykick", label: "페널티킥 횟수" },
    { key: "mom", label: "MOM 선수 인덱스" },
    {
      key: "match_team_stats_evidence_img",
      label: "팀 스탯 증빙 자료",
      isFile: true,
    },
    { key: "match_match_idx", label: "팀 인덱스" },
  ] as const;

  // Reusable RHF input
  const RHFInput = ({
    name,
    isFile = false,
    isPercentage = false,
  }: {
    name: keyof TeamStats;
    isFile?: boolean;
    isPercentage?: boolean;
  }) => {
    const error = errors[name];
    return (
      <div className="space-y-1">
        {isFile ? (
          <input
            type="file"
            accept="image/jpeg,image/png"
            {...register(name)}
            className={`w-full text-sm text-gray-100 file:mr-4 file:px-4 file:py-2 file:rounded-md file:border-0 file:bg-gray-700 file:text-gray-100 hover:file:bg-gray-600 ${
              error ? "ring-2 ring-red-500" : ""
            }`}
          />
        ) : (
          <input
            type="number"
            step={name === "match_team_stats_expectation_goal" ? "0.1" : "1"}
            min="0"
            max={isPercentage ? 100 : undefined}
            {...register(name, { valueAsNumber: true })}
            className={`w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-grass focus:border-transparent ${
              error ? "ring-2 ring-red-500" : ""
            }`}
          />
        )}
        {error && (
          <p className="text-sm text-red-400">{error?.message as string}</p>
        )}
      </div>
    );
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
            <form onSubmit={handleSubmit(onSave)} className="space-y-4">
              <div className="space-y-3">
                {statLabels.map(({ key, label, isPercentage, isFile }) => (
                  <div key={key} className="space-y-1">
                    <label className="block text-sm font-medium text-gray-300">
                      {label}
                    </label>
                    <RHFInput
                      name={key as keyof TeamStats}
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
          ) : (
            /* View Mode */
            <div className="space-y-0">
              <table className="w-full">
                <tbody className="divide-y divide-gray-700">
                  {statLabels.map(({ key, label, isPercentage, isFile }) => (
                    <tr
                      key={key}
                      className="hover:bg-gray-800/60 transition-colors">
                      <td className="py-3 pr-4 text-sm font-medium text-gray-300">
                        {label}
                      </td>
                      <td className="py-3 text-right">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-sm font-medium bg-gray-800 text-gray-100">
                          {key === "match_team_stats_evidence_img"
                            ? stats[key]
                              ? "첨부 완료"
                              : "-"
                            : key === "mom"
                            ? stats[key] ?? "-"
                            : formatValue(
                                stats[key as keyof TeamStats] as number | null,
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
}
