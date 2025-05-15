import useDeleteMatchJoin from "../../../3_Entity/Match/useDeleteMatchJoin";
import useMatchModalStore from "../../../4_Shared/zustand/useMatchModal";

const useCancelMatchApply = (
  props: UseCancelMatchApplyProps
): [(props: CancelMatchApplyHandlerProps) => void] => {
  const { setMatchWaitList } = props;
  const [deleteMatchJoin] = useDeleteMatchJoin();
  const { matchIdx } = useMatchModalStore();

  const cancelMatchApplyHandler = (props: CancelMatchApplyHandlerProps) => {
    const { userIdx, matchPosition } = props;
    deleteMatchJoin({ matchIdx, userIdx });
    setMatchWaitList((prev) => ({
      match_waitlist: {
        ...prev.match_waitlist,
        [matchPosition]: [
          ...(prev.match_waitlist?.[matchPosition] ?? []).filter(
            (waiter) => waiter.player_list_idx !== userIdx
          ),
        ],
      },
    }));
  };

  return [cancelMatchApplyHandler];
};

export default useCancelMatchApply;
