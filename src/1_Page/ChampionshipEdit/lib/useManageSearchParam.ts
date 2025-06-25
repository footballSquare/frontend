import { useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "../../../4_Shared/lib/useMyInfo";

const useManageSearchParam = (): {
  isEditMode: boolean;
  communityIdx: number;
} => {
  const { mode, communityIdx } = useParams();
  const navigate = useNavigate();

  // mode가 "edit"나 "add"가 아닌 경우 리다이렉트 처리
  if (mode !== "edit" && mode !== "add") {
    navigate("/");
  }

  const isEditMode = mode === "edit";
  const parsedCommunityIdx = parseInt(communityIdx || "0", 10);

  const roleIdx = useAuthStore((state) => state.communityRoleIdx);
  if (roleIdx !== 0) {
    alert("권한이 없습니다.");
    navigate("/");
  }
  return { isEditMode, communityIdx: parsedCommunityIdx };
};

export default useManageSearchParam;
