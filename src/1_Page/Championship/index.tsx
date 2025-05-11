import DashBoard from "./ui/DashBoard";
import InfoHeader from "./ui/InfoHeader";

import useGetChampionshipInfo from "../../3_Entity/Championship/useGetChampionshipInfo";
import useValidParamInteger from "../../4_Shared/model/useValidParamInteger";

import { useChampionshipContext } from "./model/useChampionshipContext";

const Championship = () => {
  const [championshipIdx] = useValidParamInteger("championshipIdx");
  const [championshipInfo] = useGetChampionshipInfo(championshipIdx);
  const {
    championship_type_idx,
    community_list_idx,
    championship_list_color,
    winner_team_color,
  } = championshipInfo;

  const { value, ChampionshipInfoContext } = useChampionshipContext(
    community_list_idx,
    winner_team_color || championship_list_color
  );

  return (
    <div className="w-full min-h-full">
      <ChampionshipInfoContext.Provider value={value}>
        {/* 상단 배너 영역 */}
        <InfoHeader championshipInfo={championshipInfo} />
        {/* 하단 정보 영역 */}
        <DashBoard championship_type_idx={championship_type_idx} />
      </ChampionshipInfoContext.Provider>
    </div>
  );
};

export default Championship;
