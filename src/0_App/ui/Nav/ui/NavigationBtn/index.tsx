import { NavigationBtnProps } from "./type";
import usePageStore from "../../../../../4_Shared/zustand/usePageStore";

const NavigationBtn = (props: NavigationBtnProps) => {
  const { text, navigationHandler } = props;
  const { page, setPage } = usePageStore();

  return (
    <button
      className={`px-4 py-2 mx-1 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-gray-700/50 ${
        page === text 
          ? "bg-gradient-to-r from-gray-600 to-gray-800 text-white shadow-lg" 
          : "text-gray-300 hover:text-white"
      }`}
      onClick={() => {
        setPage(text);
        navigationHandler();
      }}
    >
      {text}
    </button>
  );
};

export default NavigationBtn;
