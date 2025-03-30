import DashBoard from "./ui/DashBoard";
import InfoHeader from "./ui/InfoHeader";

import useGetChampionshipInfo from "../../3_Entity/Championship/useGetChampionshipInfo";
import useValidParamInteger from "../../4_Shared/model/useValidParamInteger";

const Championship = () => {
  const [championshipIdx] = useValidParamInteger("championshipIdx");
  const [championshipInfos] = useGetChampionshipInfo(championshipIdx);
  const championshipInfo = championshipInfos[0];
  if (!championshipInfo) {
    return <div>대회 정보가 없습니다.</div>;
  }
  console.log(championshipInfo);
  const championship_type = championshipInfo.championship_type;

  return (
    <div className="w-full min-h-full  text-gray-800">
      {/* 상단 배너 영역 */}
      <InfoHeader championshipInfo={championshipInfo} />
      {/* 하단 정보 영역 */}
      <DashBoard championship_type={0} />
    </div>
  );
};

export default Championship;
