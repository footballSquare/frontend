import React from "react";

const useManageMatchList = (
  matchList: ChampionshipMatchList[]
): [ChampionshipMatchList[], MatchHandlerReturn] => {
  const [displayMatchList, setDisplayMatchList] = React.useState<
    ChampionshipMatchList[]
  >([]);

  React.useEffect(() => {
    setDisplayMatchList(matchList);
  }, [matchList]);

  const handleDeleteMatch = React.useCallback((matchIdx: number) => {
    setDisplayMatchList((prev) =>
      prev.filter((match) => match.championship_match_idx !== matchIdx)
    );
  }, []);

  const handleEndMatch = React.useCallback((matchIdx: number) => {
    setDisplayMatchList((prev) =>
      prev.map((match) => {
        if (match.championship_match_idx === matchIdx) {
          return {
            ...match,
            championship_match_first: {
              ...match.championship_match_first,
              common_satus_idx: 4,
            },
            championship_match_second: {
              ...match.championship_match_second,
              common_satus_idx: 4,
            },
          };
        }
        return match;
      })
    );
  }, []);

  const matchHandlers = React.useMemo(
    () => ({
      handleDeleteMatch,
      handleEndMatch,
    }),
    [handleDeleteMatch, handleEndMatch]
  );

  return [displayMatchList, matchHandlers];
};

export default useManageMatchList;
