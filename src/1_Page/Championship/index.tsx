import React from "react";
import useGetChampionshipInfo from "../../3_Entity/Championship/useGetChampionshipInfo";
import trophy from "../../4_Shared/assets/img/trophy.jpg";
import { matchType } from "../../4_Shared/constant/matchType";
import { getTextColorFromBackground } from "../../4_Shared/lib/colorChecker";
import useValidParamInteger from "../../4_Shared/model/useValidParamInteger";
import DashBoard from "./ui/DashBoard";

const Championship = () => {
  const isAdmin = true;
  const [championshipIdx] = useValidParamInteger("championshipIdx");
  const [championshipInfo] = useGetChampionshipInfo(championshipIdx);

  return (
    <div className="min-h-screen w-full bg-gray-100 text-gray-800">
      {/* 상단 배너 영역 */}
      <header
        className="relative flex flex-col justify-center items-center min-h-[200px] gap-3 p-4 overflow-hidden"
        style={{
          backgroundColor: championshipInfo.championship_list_color,
          color: getTextColorFromBackground(
            championshipInfo.championship_list_color
          ),
        }}>
        <div className="absolute top-0 left-0 w-[100px] h-[100px] border-4 border-current rounded-full transform -translate-x-1/2 -translate-y-1/2 opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-[100px] h-[100px] border-4 border-current rounded-full transform translate-x-1/2 translate-y-1/2"></div>

        {/* 대회 제목 + 트로피 아이콘 */}
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <img
            className="w-[40px] h-[40px] object-cover"
            src={trophy}
            alt="Trophy"
          />
          <h1 className="text-2xl font-bold">
            {championshipInfo.championship_list_name}
          </h1>
        </div>

        <div className="w-full flex flex-col justify-center sm:flex-row items-center gap-2">
          <p className="px-3 py-2 text-center rounded-md border border-current sm:w-[23%] text-inherit">
            {`${championshipInfo.championship_list_start_date} + ${championshipInfo.championship_list_end_date}`}
          </p>
          <p className="w-[40%] px-3 py-2 text-center rounded-md border border-current sm:w-[23%] text-inherit">
            {championshipInfo.championship_type_name}
          </p>
          <p className="w-[40%] px-3 py-2 text-center rounded-md border border-current sm:w-[23%] text-inherit">
            {matchType[championshipInfo.match_type_idx]}
          </p>
        </div>
        <div className="w-[40%] text-inherit flex justify-between gap-4 sm:w-[69%] ">
          <p>{championshipInfo.championship_list_description}</p>
          {isAdmin && (
            <div>
              <button>대회 수정</button>
              <button>대회 마감</button>
            </div>
          )}
        </div>
      </header>
      <DashBoard championshipIdx={championshipIdx} />
    </div>
  );
};

export default Championship;
