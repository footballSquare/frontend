import usePostTeamStat from "../../../../../../../../../3_Entity/Match/usePostTeamStat";

const usePostTeamStatsHandler = (props: UsePostTeamStatsHandlerProps) => {
  const {
    cancelEdit,
    setBackupTeamStats,
    toggleIsEditing,
    handleUpdateMatchScore,
  } = props;
  const [postTeamMatch] = usePostTeamStat();

  const handlePostPlayerStats = async ({
    matchIdx,
    data,
  }: HandlePostTeamStatProps) => {
    toggleIsEditing();
    const status = await postTeamMatch({
      matchIdx,
      teamStat: data,
    });

    switch (status) {
      case 200:
        setBackupTeamStats(data);
        handleUpdateMatchScore(
          matchIdx,
          data.match_team_stats_our_score,
          data.match_team_stats_other_score
        );
        break;
      default:
        cancelEdit();
        break;
    }
  };

  return [handlePostPlayerStats];
};
export default usePostTeamStatsHandler;
