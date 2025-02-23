import { NavigationBtnProps } from "./type";
import usePageStore from "../../../../../4_Shared/zustand/usePageStore";

const NavigationBtn = (props: NavigationBtnProps) => {
  const {page, setPage} = usePageStore();
  const {text} = props;
  return (
    <button className="flex items-center justify-center" onClick={()=>{setPage(text)}}>
      <h5 className={`lg:text-bold lg:font-bold text-xs font-base ${page === text && "text-blue"}`}>{text}</h5>
    </button>
  );
};

export default NavigationBtn;
