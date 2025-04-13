import { useNavigate } from "react-router-dom";
import logo from "../../../../../4_Shared/assets/img/logo.png";
import usePageStore from "../../../../../4_Shared/zustand/usePageStore";

const HomeBtn = () => {
  const navigate = useNavigate();
  const { setPage } = usePageStore();
  return (
    <button
      className="lg:flex hidden items-center justify-center"
      onClick={() => {
        navigate("/");
        setPage("HOME");
      }}
    >
      <img
        className="lg:min-w-[140px] w-[140px]"
        src={logo}
        alt="home button"
      />
    </button>
  );
};

export default HomeBtn;
