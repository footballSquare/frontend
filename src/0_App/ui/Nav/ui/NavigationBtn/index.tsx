import { NavigationBtnProps } from "./type";

const NavigationBtn = (props: NavigationBtnProps) => {
  const {text} = props;
  return (
    <button className="flex items-center justify-center">
      <h5 className="lg:text-bold lg:font-bold text-xs font-base">{text}</h5>
    </button>
  );
};

export default NavigationBtn;
