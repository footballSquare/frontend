import { useNavigate } from "react-router-dom";
import logo from "../../../../../4_Shared/assets/svg/logo.svg";
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
        className="lg:min-w-[120px] w-[120px]"
        src={logo}
        alt="home button"
      />
    </button>
  );
};

export default HomeBtn;
