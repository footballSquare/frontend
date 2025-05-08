import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const usePostCommunityBoard = (): [
  postCommunityBoard: (props: PostCommunityBoardProps) => void
] => {
  const [serverState, request, loading] = useFetchData();

  const postCommunityBoard = (props: PostCommunityBoardProps) => {
    const { communityIdx = 0, title, content, image } = props;
    let payload: FormData | null = null;
    
    if (image) {
      const formData = new FormData();
      formData.append("file", image);
      payload = formData;
    }

    request(
      "POST",
      `/community/${communityIdx}/board`,
      {
        board_list_title: title,
        board_list_content: content,
        board_list_img: payload,
      },
      true
    );
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
