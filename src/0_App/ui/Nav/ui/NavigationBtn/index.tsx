import { NavigationBtnProps } from "./type";
import usePageStore from "../../../../../4_Shared/zustand/usePageStore";

const NavigationBtn = (props: NavigationBtnProps) => {
  const { text, navigationHandler } = props;
  const { page, setPage } = usePageStore();

  return (
    <button
      className="flex items-center justify-center"
      onClick={() => {
        setPage(text);
        navigationHandler();
      }}
    >
      <h5
        className={`lg:text-bold lg:font-bold text-xs font-base ${
          page === text && "text-blue"
        }`}
      >
        {text}
      </h5>
    </button>
  );
};

export default NavigationBtn;
