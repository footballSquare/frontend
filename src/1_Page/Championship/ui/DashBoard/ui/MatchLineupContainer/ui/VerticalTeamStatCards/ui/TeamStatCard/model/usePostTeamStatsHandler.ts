import usePostTeamStat from "../../../../../../../../../../../3_Entity/Match/usePostTeamStat";

const usePostTeamStatsHandler = (
  cancelEdit: () => void,
  setBackupTeamStats: (data: PostTeamStatsForm) => void
) => {
  const [postTeamMatch] = usePostTeamStat();

  const handlePostPlayerStats = async ({
    matchIdx,
    data,
  }: HandlePostTeamStatProps) => {
    const status = await postTeamMatch({
      matchIdx,
      teamStat: data,
    });

    switch (status) {
      case 200:
        setBackupTeamStats(data);
        break;
      default:
        cancelEdit();
        break;
    }
  };

  return [handlePostPlayerStats];
};
export default usePostTeamStatsHandler;
