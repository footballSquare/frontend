import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const usePostTeamStatsEvidence = (): [
  postTeamStatsEvidence: (
    props: PostTeamStatsEvidenceProps
  ) => Promise<number | undefined>,
  responseUrl: string[] | null
] => {
  const [serverState, request, loading] = useFetchData();
  const [responseUrl, setResponseUrl] = React.useState<string[] | null>(null);

  const postTeamStatsEvidence = async (
    props: PostTeamStatsEvidenceProps
  ): Promise<number | undefined> => {
    const { matchIdx, file, url } = props;

    const formData = new FormData();

    // 기존 URL들 추가
    url.forEach((urlString) => {
      formData.append("url", urlString);
    });

    // 새 파일들 추가
    file.forEach((fileObj) => {
      formData.append("file", fileObj);
    });

    return await request(
      "POST",
      `/match/${matchIdx}/team_stats/evidence_img`,
      formData,
      true
    );
  };

  React.useEffect(() => {
    if (!loading && serverState) {
      switch (serverState.status) {
        case 200:
          setResponseUrl((serverState?.fileUrls as string[]) || null);
          break;
        default:
          alert("팀 증빙자료 업로드가 완료되지 못했습니다.");
          break;
      }
    }
  }, [loading, serverState]);

  return [postTeamStatsEvidence, responseUrl];
};

export default usePostTeamStatsEvidence;
