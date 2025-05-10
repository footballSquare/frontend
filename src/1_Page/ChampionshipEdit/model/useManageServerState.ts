import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const useManageServerState = (
  serverState: Record<string, unknown> | null,
  isEditMode: boolean
) => {
  const successMessage = isEditMode
    ? "수정에 성공했습니다"
    : "생성에 성공했습니다";
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const championshipIdx = Number(searchParams.get("championshipIdx") ?? 0);

  React.useEffect(() => {
    if (!serverState) return;
    switch (serverState.status) {
      case 200: {
        alert(successMessage);
        const championshipListIdx = (
          serverState.data as {
            championship_list_idx: number;
          }
        ).championship_list_idx;

        const targetUrl = isEditMode
          ? `/championship/${championshipIdx}`
          : `/championship/${championshipListIdx}`;

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
