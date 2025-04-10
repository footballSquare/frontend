import { useNavigate, useParams } from "react-router-dom";

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
  return { isEditMode, communityIdx: parsedCommunityIdx };
};

export default useManageSearchParam;
