import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil.ts";

const useGetChampionshipEvidence = (
  championshipMatchIdx: number
): [EvidenceImage[], boolean] => {
  const [serverState, request, loading] = useFetchData();
  const [evidenceImage, setEvidenceImage] = React.useState<EvidenceImage[]>(
    {} as EvidenceImage[]
  );

  const endPoint = `/championship/championship_match/${championshipMatchIdx}/evidance_img`;

  React.useEffect(() => {
    request("GET", endPoint, null, true);
    console.log(championshipMatchIdx);
  }, []);

  React.useEffect(() => {
    if (!loading && serverState && "evidance_img" in serverState) {
      setEvidenceImage(
        (serverState as { evidance_img: EvidenceImage[] }).evidance_img
      );
    }
  }, [loading, serverState]);

  return [evidenceImage, loading];
};

export default useGetChampionshipEvidence;
