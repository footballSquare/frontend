import { ButtonProps } from "./type";
const Button = (props: ButtonProps) => {
  const {
    bg = "white",
    textColor = "blue",
    borderColor = "blue",
    border = true,
    text = "BUTTON",
    height = "36px",
    bold = false,
    onClickHandler,
  } = props;
  return (
    <button
      className={` bg-${bg} text-${textColor} border-${borderColor} ${
        border && "border-1"
      } h-[${height}] rounded-lg px-6 ${bold && "font-bold"}`}
      onClick={onClickHandler}
    >
      {text}
    </button>
  );
};
export default Button;
