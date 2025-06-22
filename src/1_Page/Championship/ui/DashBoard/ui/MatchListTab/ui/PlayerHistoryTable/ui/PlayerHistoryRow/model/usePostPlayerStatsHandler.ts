import usePostPlayerStats from "../../../../../../../../../../../3_Entity/Match/usePostPlayerStats";

const usePostPlayerStatsHandler = (
  cancelEdit: () => void,
  setBackupPlayerStats: (data: PlayerStatsFormValues) => void
) => {
  const [postPlayerStats] = usePostPlayerStats();

  const handlePostPlayerStats = async ({
    matchIdx,
    data,
  }: HandlePostPlayerStatProps) => {
    const status = await postPlayerStats({
      playerStat: data,
      matchIdx,
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
