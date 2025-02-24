import { TeamAwardProps } from "./type";

const Trophy = ({
  trophyData,
  length,
  index,
}: {
  trophyData: TeamAwardProps;
  length: number;
  index: number;
}) => {
  return (
    <div
      key={"trophy-" + index}
      className="relative group w-[50px] h-[50px] border border-gray-400 rounded-lg shadow mr-1 overflow-visible">
      {/* 기본 이미지 (Hover 전) */}
      <div className="flex items-center justify-center w-full h-full">
        <img
          src={trophyData.championship_list_throphy_img}
          alt="Trophy"
          className="w-[50px] h-[50px]"
        />
      </div>

      {/* Hover 시 보여줄 정보 (200x200 고정 크기) */}
      <div
        className={`absolute ${
          index === 0 ? "left-0" : index === length - 1 ? "right-0" : "left-1/2"
        } top-1/2 bg-white rounded-lg flex flex-col items-center justify-center w-[200px] h-[200px] transition-all duration-300 ease-in-out transform ${
          index === 0
            ? "translate-x-0"
            : index === length - 1
            ? "translate-x-0"
            : "-translate-x-1/2"
        } -translate-y-1/2 z-50 shadow-lg p-4 border border-gray-300 scale-0 group-hover:scale-100`}
        style={{
          whiteSpace: "nowrap",
          overflow: "visible",
          pointerEvents: "auto",
        }}>
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
      </div>
    </div>
  );
};

export default Trophy;
