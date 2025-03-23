import React from "react";
import { useFetch } from "../../4_Shared/util/apiUtil.ts";
import { mockChampionshipEvidence } from "../../4_Shared/mock/championshipInfo.ts";

const useGetChampionshipEvidence = (
  championshipInfoIdx: number
): [EvidenceImage, boolean] => {
  const [serverState, request, loading] = useFetch();
  const [evidenceImage, setEvidenceImage] = React.useState<EvidenceImage>(
    {} as EvidenceImage
  );

  React.useEffect(() => {
    request(mockChampionshipEvidence);
    console.log(championshipInfoIdx);
  }, []);

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
