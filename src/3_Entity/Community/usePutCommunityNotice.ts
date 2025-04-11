import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const usePutCommunityNotice = (): [
  putCommunityNotice: (props: PutCommunityNoticeProps) => void
] => {
  const [serverState, request, loading] = useFetchData();

  const putCommunityNotice = (props: PutCommunityNoticeProps) => {
    const { communityIdx, notice } = props;
    request("PUT", `/community/${communityIdx}/notice`, {community_list_notice: notice}, true);
  };

  React.useEffect(() => {
    if (!loading && serverState) {
      switch (serverState.status) {
        case 200:
          alert("공지 수정 완료되었습니다.");
          break;
        default:
          alert("공지 수정이 완료되지 못 했습니다.");
          break;
      }
    }
  }, [loading, serverState]);

  return [putCommunityNotice];
};

export default usePutCommunityNotice;
