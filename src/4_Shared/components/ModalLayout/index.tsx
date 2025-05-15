const ModalLayer = (props: ModalLayerProps) => {
  const {children, toggleModalHandler} = props;
  return (
    <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
      {/* 레이어 */}
      <div
        className="absolute top-0 left-0 w-full h-full opacity-50 bg-gray"
        onClick={toggleModalHandler}
      ></div>
      {/* 모달 */}
      <div className="flex flex-col relative w-[80%] h-[80%] bg-gray-800 text-white gap-4 p-4 overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default ModalLayer;
