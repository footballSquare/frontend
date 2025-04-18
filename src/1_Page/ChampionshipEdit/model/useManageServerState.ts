import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const useManageServerState = (
  serverState: Record<string, unknown> | null,
  isEditMode: boolean
) => {
  const sucessMessage = isEditMode
    ? "수정에 성공했습니다"
    : "생성에 성공했습니다";
  const navigate = useNavigate();
  const naviateUrl = "/championship";

  const [searchParams] = useSearchParams();
  const championshipIdx = Number(searchParams.get("championshipIdx") ?? 0);
  const editUrl = `/championship/${championshipIdx}`;

  React.useEffect(() => {
    if (!serverState) return;
    switch (serverState.status) {
      case 200: {
        alert(sucessMessage);
        const targetUrl = isEditMode
          ? editUrl
          : `${naviateUrl}/${
              (serverState.data as { championship_list_idx: number })
                .championship_list_idx
            }`;
        navigate(targetUrl);
        break;
      }

      case 409:
        alert("이미 존재하는 대회명입니다");
        break;

      default:
        console.log("실패");
    }
  }, [serverState]);
};

export default useManageServerState;
