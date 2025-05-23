import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const useGetRepeatShortTeam = (): [
  boolean,
  boolean,
  (teamShortName: string) => void
] => {
  const [serverState, request, loading] = useFetchData();
  const [isRepeat, setIsRepeat] = React.useState<boolean>(false);

  const getRepeatShortTeam = (teamShortName: string) => {
    const endPoint = `/team/check_short_name/${teamShortName}`;
    request("GET", endPoint, null, true);
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
        setIsRepeat(true);
        return;
    }
  }, [serverState]);

  return [isRepeat, loading, getRepeatShortTeam];
};

export default useGetRepeatShortTeam;
