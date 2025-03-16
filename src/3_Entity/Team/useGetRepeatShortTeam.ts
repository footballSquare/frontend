import React from "react";
import { useFetch } from "../../4_Shared/util/apiUtil";

const useGetRepeatShortTeam = (): [
  boolean,
  boolean,
  (teamName: string) => void
] => {
  const [serverState, request, loading] = useFetch();
  const [isRepeat, setIsRepeat] = React.useState<boolean>(false);

  const getRepeatShortTeam = (teamName: string) => {
    request({ teamName });
    setIsRepeat(false);
  };

  React.useEffect(() => {
    if (!serverState) return;

    switch (serverState.status) {
      case 200:
        setIsRepeat(false);
        console.log("중복 없음");
        return;
      case 409:
        setIsRepeat(true);
        console.log("중복");
        return;
      default:
        return;
    }
  }, [serverState]);

  return [isRepeat, loading, getRepeatShortTeam];
};

export default useGetRepeatShortTeam;
