import React, { useRef } from "react";
import useGetChampionshipMatchList from "../../../../../3_Entity/Championship/useGetChampionshipMatchList";
import useParamInteger from "../../../../../4_Shared/model/useParamInteger";

const useGetChampionshipMatchListHandler =
  (): UseGetChampionshipMatchListHandlerReturn => {
    const championshipIdx = useParamInteger("championshipIdx");
    const [matchList] = useGetChampionshipMatchList(championshipIdx); // 대회 생성된 매치 리스트

    const originalListRef = useRef<ChampionshipMatchList[]>(matchList);
    const backupRef = useRef<Map<number, ChampionshipMatchList>>(new Map());

    const [optimisticMatchList, setOptimisticMatchList] = React.useState<
      ChampionshipMatchList[]
    >([]);

    React.useEffect(() => {
      originalListRef.current = matchList;
      setOptimisticMatchList(matchList);
    }, [matchList]);

    const handleDeleteMatch = React.useCallback((matchIdx: number) => {
      setOptimisticMatchList((prev) => {
        // 백업이 없을 때만 최초 상태 저장
        const original = prev.find(
          (m) => m.championship_match_idx === matchIdx
        );
        if (original && !backupRef.current.has(matchIdx)) {
          backupRef.current.set(matchIdx, original);
        }
        return prev.filter(
          (match) => match.championship_match_idx !== matchIdx
        );
      });
    }, []);

    const handleRollBackMatchByIdx = React.useCallback((matchIdx: number) => {
      const backup = backupRef.current.get(matchIdx);
      if (!backup) return; // 백업이 없으면 롤백 불가

      setOptimisticMatchList((prev) => {
        const exists = prev.some((m) => m.championship_match_idx === matchIdx);
        if (exists) {
          // 이미 목록에 있으면 상태만 덮어쓰기
          return prev.map((m) =>
            m.championship_match_idx === matchIdx ? backup : m
          );
        }

        // 삭제된 매치라면 원래 인덱스 위치에 삽입
        const insertIndex = originalListRef.current.findIndex(
          (m) => m.championship_match_idx === matchIdx
        );
        const newList = [...prev];
        newList.splice(
          insertIndex === -1 ? newList.length : insertIndex,
          0,
          backup
        );
        return newList;
      });

      backupRef.current.delete(matchIdx); // 롤백 후 백업 제거
    }, []);

    const handleEndMatch = React.useCallback((matchIdx: number) => {
      setOptimisticMatchList((prev) => {
        const original = prev.find(
          (m) => m.championship_match_idx === matchIdx
        );
        if (original && !backupRef.current.has(matchIdx)) {
          backupRef.current.set(matchIdx, original);
        }

        return prev.map((match) => {
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
        });
      });
    }, []);

    const handleCommitMatches = React.useCallback((idxArr?: number[]) => {
      if (idxArr && idxArr.length > 0) {
        idxArr.forEach((id) => backupRef.current.delete(id));
      } else {
        backupRef.current.clear();
      }
    }, []);

    const handleAddMatch = React.useCallback(
      (newMatch: ChampionshipMatchList) => {
        setOptimisticMatchList((prev) => {
          // 이미 존재하는 더미(혹은 실) 챔피언십 매치는 추가하지 않음
          const exists = prev.some(
            (m) => m.championship_match_idx === newMatch.championship_match_idx
          );
          if (exists) return prev;

          return [...prev, newMatch];
        });
      },
      []
    );

    const handleSyncMatchIdx = React.useCallback(
      (
        dummyChampMatchIdx: number,
        realChampMatchIdx: number,
        firstMatchIdx: number,
        secondMatchIdx: number
      ) => {
        setOptimisticMatchList((prev) =>
          prev.map((match) => {
            if (match.championship_match_idx !== dummyChampMatchIdx)
              return match;

            return {
              ...match,
              championship_match_idx: realChampMatchIdx,
              championship_match_first: {
                ...match.championship_match_first,
                match_match_idx: firstMatchIdx,
              },
              championship_match_second: {
                ...match.championship_match_second,
                match_match_idx: secondMatchIdx,
              },
            };
          })
        );

        // 백업이 존재했다면 키를 갱신
        const backup = backupRef.current.get(dummyChampMatchIdx);
        if (backup) {
          backupRef.current.delete(dummyChampMatchIdx);
          backupRef.current.set(realChampMatchIdx, {
            ...backup,
            championship_match_idx: realChampMatchIdx,
            championship_match_first: {
              ...backup.championship_match_first,
              match_match_idx: firstMatchIdx,
            },
            championship_match_second: {
              ...backup.championship_match_second,
              match_match_idx: secondMatchIdx,
            },
          });
        }
      },
      []
    );

    const handleUpdateMatchScore = React.useCallback(
      (matchIdx: number, ourScore: number, otherScore: number) => {
        setOptimisticMatchList((prev) =>
          prev.map((match) => {
            const isFirstTeam =
              match.championship_match_first.match_match_idx === matchIdx;
            const isSecondTeam =
              match.championship_match_second.match_match_idx === matchIdx;

            if (!isFirstTeam && !isSecondTeam) {
              return match;
            }

            const newMatch = { ...match };
            if (isFirstTeam) {
              newMatch.championship_match_first = {
                ...newMatch.championship_match_first,
                match_team_stats_our_score: ourScore,
                match_team_stats_other_score: otherScore,
              };
              newMatch.championship_match_second = {
                ...newMatch.championship_match_second,
                match_team_stats_our_score: otherScore,
                match_team_stats_other_score: ourScore,
              };
            } else {
              // isSecondTeam
              newMatch.championship_match_second = {
                ...newMatch.championship_match_second,
                match_team_stats_our_score: ourScore,
                match_team_stats_other_score: otherScore,
              };
              newMatch.championship_match_first = {
                ...newMatch.championship_match_first,
                match_team_stats_our_score: otherScore,
                match_team_stats_other_score: ourScore,
              };
            }

            return newMatch;
          })
        );
      },
      []
    );

    const matchHandlers = React.useMemo(
      () => ({
        handleAddMatch,
        handleDeleteMatch,
        handleEndMatch,
        handleRollBackMatchByIdx,
        handleCommitMatches,
        handleSyncMatchIdx,
        handleUpdateMatchScore,
      }),
      [
        handleAddMatch,
        handleDeleteMatch,
        handleEndMatch,
        handleRollBackMatchByIdx,
        handleCommitMatches,
        handleSyncMatchIdx,
        handleUpdateMatchScore,
      ]
    );

    return { optimisticMatchList, matchHandlers };
  };

export default useGetChampionshipMatchListHandler;
