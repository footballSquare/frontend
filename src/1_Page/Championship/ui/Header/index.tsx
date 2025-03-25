import React from "react";
import { getTextColorFromBackground } from "../../../../4_Shared/lib/colorChecker";
import { matchType } from "../../../../4_Shared/constant/matchType";
import { championshipTypes } from "../../../../4_Shared/constant/championshipTypes";
import AdminBtns from "./ui/AdminBtns";

type HeaderProps = {
  championshipInfo: ChampionshipInfo;
  isAdmin: boolean;
  championshipIdx: number;
};

const Header = (props: HeaderProps) => {
  const { championshipInfo, isAdmin, championshipIdx } = props;
  const [isHeaderCollapsed, setIsHeaderCollapsed] =
    React.useState<boolean>(false);
  const toggleHeader = () => setIsHeaderCollapsed(!isHeaderCollapsed);

  return (
    <header
      className="relative flex flex-col items-center p-4 overflow-hidden transition-all duration-300"
      style={{
        backgroundColor: championshipInfo.championship_list_color,
        color: getTextColorFromBackground(
          championshipInfo.championship_list_color
        ),
      }}>
      <div className="w-full flex justify-end">
        <button onClick={toggleHeader} className="text-lg hover:opacity-70">
          {isHeaderCollapsed ? "▽" : "△"}
        </button>
      </div>

      {!isHeaderCollapsed && (
        <div className="flex flex-col items-center w-full gap-4">
          <div className="absolute top-0 left-0 w-[100px] h-[100px] border-4 border-current rounded-full transform -translate-x-1/2 -translate-y-1/2 opacity-20"></div>
          <div className="absolute bottom-0 right-0 w-[100px] h-[100px] border-4 border-current rounded-full transform translate-x-1/2 translate-y-1/2"></div>

          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <img
              className="w-[40px] h-[40px] object-cover"
              src={championshipInfo.championship_list_throphy_img}
              alt="Trophy"
            />
            <h1 className="text-2xl font-bold">
              {championshipInfo.championship_list_name}
            </h1>
          </div>

          <div className="w-full flex flex-col justify-center sm:flex-row items-center gap-2">
            <p className="px-3 py-2 text-center rounded-md border border-current sm:w-[23%] text-inherit">
              {`${championshipInfo.championship_list_start_date} ~ ${championshipInfo.championship_list_end_date}`}
            </p>
            <p className="w-[40%] px-3 py-2 text-center rounded-md border border-current sm:w-[23%] text-inherit">
              {championshipTypes[championshipInfo.championship_type]}
            </p>
            <p className="w-[40%] px-3 py-2 text-center rounded-md border border-current sm:w-[23%] text-inherit">
              {matchType[championshipInfo.match_type_idx]}
            </p>
          </div>

          <div className="w-[69%] flex flex-col sm:flex-row justify-between items-start gap-4 mt-4">
            <p className="text-inherit flex-1">
              {championshipInfo.championship_list_description}
            </p>
            {isAdmin && <AdminBtns championshipIdx={championshipIdx} />}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
