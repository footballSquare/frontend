import { useNavigate } from "react-router-dom";

const useGoBackHandler = (): UseGoBackHandlerReturn => {
  const navigate = useNavigate();

  // 뒤로가기 핸들러
  const handleGoBack = () => {
    const referrer = document.referrer;

    if (referrer.includes("/team/")) {
      // 팀 페이지에서 왔으면 해당 팀 페이지로
      const teamMatch = referrer.match(/\/team\/(\d+)/);
      if (teamMatch) {
        navigate(`/team/${teamMatch[1]}`);
      } else {
        navigate("/topics");
      }
    } else if (referrer.includes("/topics")) {
      // topics 페이지에서 왔으면 topics로
      navigate("/topics");
    } else {
      // 직접 접근한 경우 기본 페이지로
      navigate("/topics");
    }
  };
  return { handleGoBack };
};
export default useGoBackHandler;
