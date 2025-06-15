import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const usePostTeamStatsEvidence = (): [
  postTeamStatsEvidence: (
    props: PostTeamStatsEvidenceProps
  ) => Promise<number | undefined>
] => {
  const [serverState, request, loading] = useFetchData();

  const postTeamStatsEvidence = async (props: PostTeamStatsEvidenceProps) => {
    const { matchIdx, files, urls } = props;
    const body = {
      file: files,
      url: urls,
    };
    return await request(
      "POST",
      `/match/${matchIdx}/team_stats/evidence_img`,
      body,
      true
    );
  };

  React.useEffect(() => {
    if (!loading && serverState) {
      switch (serverState.status) {
        case 200:
          break;
        default:
          alert("팀 증빙자료 업로드가 완료되지 못했습니다.");
          break;
      }
    }
  }, [loading, serverState]);

  return [postTeamStatsEvidence];
};

export default usePostTeamStatsEvidence;
