import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const useGetRepeatTeam = (): [boolean, boolean, (teamName: string) => void] => {
  const [serverState, request, loading] = useFetchData();
  const [isRepeat, setIsRepeat] = React.useState<boolean>(false);

  const getRepeatTeam = (teamName: string) => {
    const endPoint = `/team/check_name`;
    request("GET", endPoint, { team_list_name: teamName }, true);
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

  return [isRepeat, loading, getRepeatTeam];
};

export default useGetRepeatTeam;
