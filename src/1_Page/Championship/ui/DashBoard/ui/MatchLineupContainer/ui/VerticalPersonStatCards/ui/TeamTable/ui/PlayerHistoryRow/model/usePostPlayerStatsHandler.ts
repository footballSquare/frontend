import usePostPlayerStats from "../../../../../../../../../../../../../3_Entity/Match/usePostPlayerStats";

const usePostPlayerStatsHandler = (
  cancelEdit: () => void,
  setBackupPlayerStats: (data: PlayerStatsFormValues) => void
) => {
  const [postPlayerStats] = usePostPlayerStats();

  const handlePostPlayerStats = async ({
    match_match_idx,
    data,
  }: HandlePostTeamStatProps) => {
    const status = await postPlayerStats({
      teamStat: data,
      matchIdx: match_match_idx,
    });

    switch (status) {
      case 200:
        setBackupPlayerStats(data);
        break;
      default:
        cancelEdit();
        break;
    }
  };

  return [handlePostPlayerStats];
};
export default usePostPlayerStatsHandler;
