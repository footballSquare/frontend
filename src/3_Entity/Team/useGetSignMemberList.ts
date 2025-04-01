import React from "react";
import { useFetch } from "../../4_Shared/util/apiUtil";
import { signTeamMember } from "../../4_Shared/mock/teamInfo";

const useGetSignMemberList = (
  teamListIdx: number
): [TeamSignMember[], boolean] => {
  const [serverState, request, loading] = useFetch();
  const [signMemberList, setSignMemberList] = React.useState<TeamSignMember[]>(
    []
  );

  React.useEffect(() => {
    request(signTeamMember);
    console.log(teamListIdx);
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
