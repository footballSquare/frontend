import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const usePutCommunityEmblem = (): [
  putCommunityEmblem: (props: PutCommunityEmblemProps) => void
] => {
  const [serverState, request, loading] = useFetchData();

  const putCommunityEmblem = (props: PutCommunityEmblemProps) => {
    const { communityIdx, emblem } = props;
    let payload: FormData | null = null;
    if (emblem) {
      const formData = new FormData();
      formData.append("file", emblem);
      payload = formData;
    }
    request("PUT", `/community/${communityIdx}/emblem`, payload, true);
  };

  React.useEffect(() => {
    if (!loading && serverState) {
      switch (serverState.status) {
        case 200:
          alert("엠블럼 수정 완료되었습니다.");
          break;
        default:
          alert("엠블럼 수정이 완료되지 못 했습니다.");
          break;
      }
    }
  }, [loading, serverState]);

  return [putCommunityEmblem];
};

export default usePutCommunityEmblem;
