import React from "react";
import { useFetch } from "../../4_Shared/util/apiUtil";
import { signTeamMember } from "../../4_Shared/mock/teamInfo";
import { SignTeamMember } from "./type";

const useGetSignMemberList = (
  teamListIdx: number
): [SignTeamMember[], boolean] => {
  const [serverState, request, loading] = useFetch();
  const [signMemberList, setSignMemberList] = React.useState<SignTeamMember[]>(
    []
  );

  React.useEffect(() => {
    request(signTeamMember);
    console.log(teamListIdx);
  }, []);

  React.useEffect(() => {
    if (!loading && serverState && "access_list" in serverState) {
      setSignMemberList(
        (serverState as { access_list: SignTeamMember[] }).access_list
      );
    }
  }, [loading, serverState]);

  return [signMemberList, loading];
};

export default useGetSignMemberList;
