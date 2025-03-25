import useGetChampionshipInfo from "../../3_Entity/Championship/useGetChampionshipInfo";
import useValidParamInteger from "../../4_Shared/model/useValidParamInteger";
import DashBoard from "./ui/DashBoard";
import Header from "./ui/Header";

const Championship = () => {
  const isAdmin = true;
  const [championshipIdx] = useValidParamInteger("championshipIdx");
  const [championshipInfo] = useGetChampionshipInfo(championshipIdx);
  const isLeague = championshipInfo.championship_type === 0;

  return (
    <div className="w-full min-h-full  text-gray-800">
      {/* 상단 배너 영역 */}
      <Header championshipInfo={championshipInfo} isAdmin={isAdmin} />

      <DashBoard championshipIdx={championshipIdx} isLeague={isLeague} />
    </div>
  );
};

export default Championship;
