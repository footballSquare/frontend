import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";
import { mockMatchParticipants } from "../../4_Shared/mock/matchParticipants";

const useGetMatchParticipants = (
  porps: useGetMatchParticipantsProps
): [
  MatchParticipant[],
  React.Dispatch<React.SetStateAction<MatchParticipant[]>>,
  boolean
] => {
  const { matchIdx } = porps;
  const [serverState, request, loading] = useFetchData();
  const [matchPaticipants, setMatchPaticipants] = React.useState<
    MatchParticipant[]
  >(mockMatchParticipants.match_participant);

  React.useEffect(() => {
    request("GET", `/match/${matchIdx}/participant`, null, false);
  }, [matchIdx]);

  React.useEffect(() => {
    if (!loading && serverState) {
      setMatchPaticipants(
        (serverState as { match_participant: MatchParticipant[] })
          .match_participant
      );
    }
  }, [loading, serverState]);

  return [matchPaticipants, setMatchPaticipants, loading];
};

export default useGetMatchParticipants;
