import React from "react";
import { EvidenceImage } from "./types/response.ts";
import { useFetch } from "../../4_Shared/util/apiUtil.ts";
import { mockChampionshipEvidence } from "../../4_Shared/mock/championshipInfo.ts";

const useGetChampionshipEvidence = (
  championshipInfoIdx: number
): [EvidenceImage, boolean] => {
  const [serverState, request, loading] = useFetch();
  const [championshipInfo, setChampionshipInfo] = React.useState<EvidenceImage>(
    {} as EvidenceImage
  );

  React.useEffect(() => {
    request(mockChampionshipEvidence);
    console.log(championshipInfoIdx);
  }, []);

  React.useEffect(() => {
    if (!loading && serverState && "evidance_img" in serverState) {
      setChampionshipInfo(
        (serverState as { evidance_img: EvidenceImage }).evidance_img
      );
    }
  }, [loading, serverState]);

  return [championshipInfo, loading];
};

export default useGetChampionshipEvidence;
