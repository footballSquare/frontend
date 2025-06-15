import useDeleteChampionshipMatch from "../../../../../../../../../3_Entity/Championship/useDeleteChampionshipMatch";

const useDeleteChampionshipMatchHandler = (
  props: UseDeleteChampionshipMatchHandlerProps
): UseDeleteChampionshipMatchHandlerReturn => {
  const { handleDeleteMatch, handleRollBackMatchByIdx, handleCommitMatches } =
    props;
  const [deleteChampionshipMatch] = useDeleteChampionshipMatch();

  const handleDeleteChampionshipMatch = async (matchIdx: number) => {
    handleDeleteMatch(matchIdx);
    const status = await deleteChampionshipMatch(matchIdx);
    switch (status) {
      case 200:
        handleCommitMatches();
        break;
      default:
        handleRollBackMatchByIdx(matchIdx);
    }
  };
  return { handleDeleteChampionshipMatch };
};

export default useDeleteChampionshipMatchHandler;
