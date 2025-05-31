import usePostTeamStat from "../../../../../../../../../../../../../../../3_Entity/Match/usePostPlayerStats";

const usePostPlayerStatsHandler = (
  cancelEdit: () => void,
  setBackupPlayerStats: (data: PlayerStatsFormValues) => void
) => {
  const [postPlayerStats] = usePostTeamStat();

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
        console.log("Team stats posted successfully");
        break;
      default:
        cancelEdit();
        alert("Failed to post team stats. Please try again.");
        break;
    }
  };

  return [handlePostPlayerStats];
};
export default usePostPlayerStatsHandler;
