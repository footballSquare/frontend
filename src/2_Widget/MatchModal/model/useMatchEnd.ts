import usePutMatchEnd from "../../../3_Entity/Match/usePutMatchEnd";

const useMatchEnd = (props: UseMatchEndProps) => {
  const { setMatchDetail } = props;
  const [putMatchEnd] = usePutMatchEnd();

  const matchEndHandler = async (props: MatchEndHandlerProps) => {
    const { matchIdx } = props;
    const status = await putMatchEnd({ matchIdx });

    if (typeof status === "number" && status === 200) {
      // 매치 상태를 종료로 변경
      setMatchDetail((prev) => ({ ...prev, common_status_idx: 1 }));
    }
  };

  return [matchEndHandler];
};

export default useMatchEnd;
