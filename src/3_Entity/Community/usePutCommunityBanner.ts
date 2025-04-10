import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const usePutCommunityBanner = (): [
  putCommunityBanner: (props: PutCommunityBannerProps) => void
] => {
  const [serverState, request, loading] = useFetchData();

  const putCommunityBanner = (props: PutCommunityBannerProps) => {
    const { communityIdx, banner } = props;
    let payload: FormData | null = null;
    if (banner) {
      const formData = new FormData();
      formData.append("file", banner);
      payload = formData;
    }
    request("PUT", `/community/${communityIdx}/banner`, payload, true);
  };

  React.useEffect(() => {
    if (!loading && serverState) {
      switch (serverState.status) {
        case 200:
          alert("배너 수정 완료되었습니다.");
          break;
        default:
          alert("배너 수정이 완료되지 못 했습니다.");
          break;
      }
    }
  }, [loading, serverState]);

  return [putCommunityBanner];
};

export default usePutCommunityBanner;
