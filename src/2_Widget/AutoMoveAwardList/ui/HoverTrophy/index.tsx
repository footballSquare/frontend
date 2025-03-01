import { createPortal } from "react-dom";
import { TeamAwardProps } from "./type";
import useHover from "./model/useHover";
import STYLE from "./style";

const Trophy = ({
  trophyData,
  index,
}: {
  trophyData: TeamAwardProps;
  index: number;
}) => {
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
        key={`trophy-${index}`}
        className={STYLE.trophyContainer}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        {/* 기본 이미지 (Hover 전) */}
        <div className={STYLE.imageWrapper}>
          <img
            src={trophyData.championship_list_throphy_img}
            alt="Trophy"
            className={STYLE.trophyImage}
          />
        </div>
      </div>

      {/* Hover 시 보여줄 정보 (Portal 적용) */}
      {isHovered &&
        createPortal(
          <div
            className={STYLE.hoverContainer}
            style={{
              left: `${hoverPosition.x}px`,
              top: `${hoverPosition.y - window.scrollY}px`, // 스크롤 마우스 보정
              transform: `translate(-50%, -50%)`,
              opacity: isHovered ? 1 : 0,
            }}
            onMouseEnter={handleHover}
            onMouseLeave={handleMouseLeave}>
            <img
              src={trophyData.championship_list_throphy_img}
              alt="Trophy"
              className={STYLE.hoverImage}
            />
            <h3 className={STYLE.hoverTitle}>
              {trophyData.championship_list_name}
            </h3>
            <p className={STYLE.hoverText}>
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
