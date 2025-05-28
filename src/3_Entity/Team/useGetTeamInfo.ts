import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";
import { useNavigate } from "react-router-dom";

const useGetTeamInfo = (teamListIdx: number): [TeamInfo, boolean] => {
  const [serverState, request, loading] = useFetchData();
  const [teamInfo, setTeamInfo] = React.useState<TeamInfo>({} as TeamInfo);

  const navigate = useNavigate();
  React.useEffect(() => {
    const endPoint = `/team/${teamListIdx}/information`;
    request("GET", endPoint, null, true);
  }, [teamListIdx]);

  React.useEffect(() => {
    if (!loading && serverState && "team" in serverState) {
      setTeamInfo((serverState as { team: TeamInfo }).team);
    }
  }, [loading, serverState]);

  React.useEffect(() => {
    if (!serverState) return;
    switch (serverState.status) {
      case 200:
        return;
      case 404:
        alert("존재하지 않는 팀입니다.");
        navigate(-1);
        return;
      default:
        alert("서버 오류입니다.");
        navigate(-1);
        return;
    }
  }, [serverState]);

  return [teamInfo, loading];
};

export default useGetTeamInfo;
