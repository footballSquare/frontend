import { useNavigate } from "react-router-dom";
import logo from "../../../../../4_Shared/assets/img/logo.png";
import usePageStore from "../../../../../4_Shared/zustand/usePageStore";

const HomeBtn = () => {
  const navigate = useNavigate();
  const { setPage } = usePageStore();
  return (
    <button
      className="flex items-center justify-center hover:scale-105 transition-transform duration-200"
      onClick={() => {
        navigate("/");
        setPage("HOME");
      }}
    >      <img
        className="w-36 object-contain"
        src={logo}
        alt="Football Square"
      />
    </button>
  );
};

export default HomeBtn;
