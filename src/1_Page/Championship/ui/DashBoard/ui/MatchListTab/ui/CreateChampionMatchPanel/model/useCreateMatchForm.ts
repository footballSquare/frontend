import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useWatch } from "react-hook-form";
import { postChampionshipMatchSchema } from "../../../../../../../../../4_Shared/hookForm/PostChampionshipMatchInput/schema";
import React from "react";

const useCreateMatchForm = (props: UseCreateMatchFormProps) => {
  const { filteredTeamList } = props;
  // form
  const methods = useForm<CreateChampionMatchFormValues>({
    resolver: yupResolver(postChampionshipMatchSchema),
    defaultValues: {
      teams: [],
      matchDate: new Date().toISOString().split("T")[0],
      startTime: "10:00",
    },
  });

  const { control, setValue } = methods;

  /** teams 필드를 RHF 상태로 직접 관찰 */
  const teamIds: number[] = useWatch({
    control,
    name: "teams",
    defaultValue: [],
  });

  /** 팀 추가 (최대 2팀) */
  const handleAddTeam = (team: ChampionshipTeamInfo) => {
    if (teamIds.length >= 2) return;
    if (!teamIds.includes(team.team_list_idx)) {
      setValue("teams", [...teamIds, team.team_list_idx], {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  };

  /** 팀 제거 */
  const handleRemoveTeam = (team: ChampionshipTeamInfo) => {
    setValue(
      "teams",
      teamIds.filter((id) => id !== team.team_list_idx),
      { shouldValidate: true, shouldDirty: true }
    );
  };

  /** id 배열을 실제 팀 객체로 매핑 */
  const selectedTeams = React.useMemo(
    () =>
      filteredTeamList.filter((team) => teamIds.includes(team.team_list_idx)),
    [filteredTeamList, teamIds]
  );
  return {
    methods,
    selectedTeams,
    handleAddTeam,
    handleRemoveTeam,
  };
};

export default useCreateMatchForm;
