import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const useGetSignMemberList = (
  teamListIdx: number
): [TeamSignMember[], boolean] => {
  const [serverState, request, loading] = useFetchData();
  const [signMemberList, setSignMemberList] = React.useState<TeamSignMember[]>(
    []
  );

  React.useEffect(() => {
    const endPoint = `/team/${teamListIdx}/application/list`;
    request("GET", endPoint, null, true);
  }, []);

  React.useEffect(() => {
    if (!loading && serverState && "access_list" in serverState) {
      setSignMemberList(
        (serverState as { access_list: TeamSignMember[] }).access_list
      );
    }
  }, [loading, serverState]);

  return [signMemberList, loading];
};

export default useGetSignMemberList;
