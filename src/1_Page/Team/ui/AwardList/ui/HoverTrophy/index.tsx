import { createPortal } from "react-dom";
import { TeamAwardProps } from "./type";
import useHover from "./model/useHover";

const Trophy = (props: { trophyData: TeamAwardProps; index: number }) => {
  const { trophyData, index } = props;
  const [
    isHovered,
    hoverPosition,
    handleHover,
    handleMouseEnter,
    handleMouseLeave,
  ] = useHover();

  return (
    <div>
      <div
        key={"trophy-" + index}
        className="relative w-[50px] h-[50px] border border-gray-400 rounded-lg shadow mr-1 overflow-visible"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        {/* 기본 이미지 (Hover 전) */}
        <div className="flex items-center justify-center w-full h-full">
          <img
            src={trophyData.championship_list_throphy_img}
            alt="Trophy"
            className="w-[50px] h-[50px]"
          />
        </div>
      </div>

      {/* Hover 시 보여줄 정보 (Portal 적용) */}
      {isHovered &&
        createPortal(
          <div
            className="fixed bg-white rounded-lg flex flex-col items-center justify-center 
            w-[200px] h-[200px] shadow-lg p-4 border border-gray-300 z-50
            transition-opacity duration-300 ease-in-out"
            style={{
              left: `${hoverPosition.x}px`,
              top: `${hoverPosition.y}px`,
              transform: `translate(-50%, -50%)`,
              opacity: isHovered ? 1 : 0,
            }}
            onMouseEnter={handleHover}
            onMouseLeave={handleMouseLeave}>
            <img
              src={trophyData.championship_list_throphy_img}
              alt="Trophy"
              className="w-[80px] h-[80px] mb-2"
            />
            <h3 className="text-lg font-semibold text-center">
              {trophyData.championship_list_name}
            </h3>
            <p className="text-gray-500 text-sm">
              {trophyData.championship_list_start_date} -{" "}
              {trophyData.championship_list_end_date}
            </p>
          </div>,
          document.body
        )}
    </div>
  );
};

export default Trophy;
