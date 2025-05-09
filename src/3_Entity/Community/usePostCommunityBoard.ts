import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const usePostCommunityBoard = (): [
  postCommunityBoard: (props: PostCommunityBoardProps) => void
] => {
  const [serverState, request, loading] = useFetchData();

  const postCommunityBoard = (props: PostCommunityBoardProps) => {
    const { communityIdx, title, content, image } = props;
    let payload: FormData | null = null;
    const formData = new FormData();
    formData.append("board_list_title", title);
    formData.append("board_list_content", content);

    if (image) {
      formData.append("file", image);
      payload = formData;
    }

    request("POST", `/community/${communityIdx}/board`, payload, true);
    console.log({
      board_list_title: title,
      board_list_content: content,
      file: payload,
    });
  };

  React.useEffect(() => {
    if (!loading && serverState) {
      switch (serverState.status) {
        case 200:
          window.location.reload();
          break;
        default:
          alert("게시글 작성에 실패했습니다.");
          break;
      }
    }
  }, [loading, serverState]);

  return [postCommunityBoard];
};

export default usePostCommunityBoard;
