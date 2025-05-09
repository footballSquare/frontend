import { ButtonProps } from "./type";
const Button = (props: ButtonProps) => {
  const {
    bg = "black",
    textColor = "white",
    borderColor = "white",
    border = true,
    text = "BUTTON",
    bold = false,
    onClickHandler,
  } = props;
  return (
    <button
      className={`bg-${bg} text-${textColor} border-${borderColor} ${
        border && "border-1"
      } h-[36px] rounded-[4px] px-6 ${bold && "font-bold"}`}
      onClick={onClickHandler}
    >
      {text}
    </button>
  );
};
export default Button;
