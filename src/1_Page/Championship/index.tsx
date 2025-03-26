import useGetChampionshipInfo from "../../3_Entity/Championship/useGetChampionshipInfo";
import useValidParamInteger from "../../4_Shared/model/useValidParamInteger";
import DashBoard from "./ui/DashBoard";
import Header from "./ui/Header";

const Championship = () => {
  const [championshipIdx] = useValidParamInteger("championshipIdx");
  const [championshipInfo] = useGetChampionshipInfo(championshipIdx);
  const championship_type = championshipInfo.championship_type;

  return (
    <div className="w-full min-h-full  text-gray-800">
      {/* 상단 배너 영역 */}
      <Header championshipInfo={championshipInfo} />

      <DashBoard
        championshipIdx={championshipIdx}
        championship_type={championship_type}
      />
    </div>
  );
};

export default Championship;
