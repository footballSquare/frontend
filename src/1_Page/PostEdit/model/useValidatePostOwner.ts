import React from "react";
import { useMyUserIdx } from "../../../4_Shared/lib/useMyInfo";
import { useNavigate } from "react-router-dom";

const useValidatePostOwner = (isNew: boolean, boardDetail: BoardDetails) => {
  const navigate = useNavigate();
  const [myIdx] = useMyUserIdx();

  // 게시글이 본인의 것인지 확인합니다
  React.useEffect(() => {
    if (!isNew && Object.keys(boardDetail).length !== 0) {
      if (boardDetail?.player?.player_list_idx !== myIdx) {
        alert("본인의 게시글이 아닙니다.");
        navigate(-1);
      }
    }
  }, [boardDetail]);
};
export default useValidatePostOwner;
