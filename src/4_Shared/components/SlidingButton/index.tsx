const SlidingButton = (props: SlidingButtonProps) => {
  const { onClickHandler, text } = props;
  return (
    <button
      onClick={onClickHandler}
      className="p-3 shadow-md rounded-lg text-sm bg-gray-700 hover:bg-grass hover:opacity-60 hover:translate-x-2 hover:text-black duration-500"
    >
      {text}
    </button>
  );
};

export default SlidingButton;
