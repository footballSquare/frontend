import DashBoard from "./ui/DashBoard";
import InfoHeader from "./ui/InfoHeader";

import useGetChampionshipInfo from "../../3_Entity/Championship/useGetChampionshipInfo";
import useValidParamInteger from "../../4_Shared/model/useValidParamInteger";

import { useCommunityContext } from "./model/useCommunityContext";

const Championship = () => {
  const [championshipIdx] = useValidParamInteger("championshipIdx");
  const [championshipInfo] = useGetChampionshipInfo(championshipIdx);
  const { championship_type_idx, community_list_idx } = championshipInfo;
  const { value, CommunityContext } = useCommunityContext(community_list_idx);

  return (
    <div className="w-full min-h-full">
      <CommunityContext.Provider value={value}>
        {/* 상단 배너 영역 */}
        <InfoHeader championshipInfo={championshipInfo} />
        {/* 하단 정보 영역 */}
        <DashBoard championship_type_idx={championship_type_idx} />
      </CommunityContext.Provider>
    </div>
  );
};

export default Championship;
