import { createPortal } from "react-dom";
import useHover from "./model/useHover";
import { formatDateKoreanDate } from "../../../../4_Shared/lib/dateFormatter";

const HoverTrophy = (props: HoverTrophyProps) => {
  const { trophyData, index } = props;
  const {
    isHovered,
    hoverPosition,
    handleHover,
    handleMouseEnter,
    handleMouseLeave,
  } = useHover();

  return (
    <div>
      <div
        key={`trophy-${index}`}
        className="w-[50px] h-[50px] shadow mr-1 overflow-visible"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        {/* 기본 이미지 (Hover 전) */}
        <div className="flex items-center justify-center w-full h-full">
          <img
            src={trophyData.championship_list_throphy_img}
            alt="Trophy"
            className="w-[50px] h-[50px] object-cover rounded-lg"
          />
        </div>
      </div>

      {/* Hover 시 보여줄 정보 (Portal 적용) */}
      {isHovered &&
        createPortal(
          <div
            className="fixed bg-white rounded-lg flex flex-col items-center justify-center w-[200px] h-[200px] shadow-lg p-4 border border-gray-300 transition-opacity duration-300 ease-in-out"
            style={{
              left: `${hoverPosition.x}px`,
              top: `${hoverPosition.y - window.scrollY}px`,
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
            <h3
              className="text-lg font-semibold text-center"
              style={{ color: trophyData.championship_list_color }}>
              {trophyData.championship_list_name}
            </h3>
            <p className="text-gray-500 text-sm">
              {formatDateKoreanDate(
                new Date(trophyData.championship_list_start_date)
              )}{" "}
              -{" "}
              {formatDateKoreanDate(
                new Date(trophyData.championship_list_end_date)
              )}
            </p>
          </div>,
          document.body
        )}
    </div>
  );
};

export default HoverTrophy;
