import usePutChampionshipMatchEnd from "../../../../../../../../../3_Entity/Championship/usePutChampionshipMatchEnd";

const usePutChampionshipMatchEndHandler = (
  props: UsePutChampionshipMatchEndHandlerProps
): UsePutChampionshipMatchEndHandlerReturn => {
  const { handleEndMatch, handleCommitMatches, handleRollBackMatchByIdx } =
    props;
  const [putChampionshipMatchEnd] = usePutChampionshipMatchEnd();

  const handlePutChampionshipMatchEnd = async (matchIdx: number) => {
    handleEndMatch(matchIdx);
    const status = await putChampionshipMatchEnd(matchIdx);
    switch (status) {
      case 200:
        handleCommitMatches();
        break;
      default:
        handleRollBackMatchByIdx(matchIdx);
    }
  };
  return { handlePutChampionshipMatchEnd };
};

export default usePutChampionshipMatchEndHandler;
