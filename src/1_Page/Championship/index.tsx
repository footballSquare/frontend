import DashBoard from "./ui/DashBoard";
import InfoHeader from "./ui/InfoHeader";

import useGetChampionshipInfo from "../../3_Entity/Championship/useGetChampionshipInfo";
import useValidParamInteger from "../../4_Shared/model/useValidParamInteger";

const Championship = () => {
  const [championshipIdx] = useValidParamInteger("championshipIdx");
  const [championshipInfo] = useGetChampionshipInfo(championshipIdx);
  const championship_type_idx = championshipInfo.championship_type_idx;

  return (
    <div className="w-full min-h-full">
      {/* 상단 배너 영역 */}
      <InfoHeader championshipInfo={championshipInfo} />
      {/* 하단 정보 영역 */}
      <DashBoard championship_type_idx={championship_type_idx} />
    </div>
  );
};

export default Championship;
