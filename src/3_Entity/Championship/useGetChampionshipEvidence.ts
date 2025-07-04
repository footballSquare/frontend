import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil.ts";

const useGetChampionshipEvidence = (
  championshipMatchIdx: number | null
): [EvidenceImage, boolean] => {
  const [serverState, request, loading] = useFetchData();
  const [evidenceImage, setEvidenceImage] = React.useState<EvidenceImage>(
    {} as EvidenceImage
  );

  React.useEffect(() => {
    if (championshipMatchIdx && championshipMatchIdx <= 0) return;
    const endPoint = `/championship/championship_match/${championshipMatchIdx}/evidance_img`;
    request("GET", endPoint, null, true);
  }, [championshipMatchIdx, request]);

  React.useEffect(() => {
    if (!loading && serverState && "evidance_img" in serverState) {
      setEvidenceImage(
        (serverState as { evidance_img: EvidenceImage }).evidance_img
      );
    }
  }, [loading, serverState]);

  return [evidenceImage, loading];
};

export default useGetChampionshipEvidence;
