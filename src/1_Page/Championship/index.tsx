import DashBoard from "./ui/DashBoard";
import InfoHeader from "./ui/InfoHeader";
import useGetChampionshipInfo from "../../3_Entity/Championship/useGetChampionshipInfo";
import useValidParamInteger from "../../4_Shared/model/useValidParamInteger";
import { ChampionshipInfoContext } from "../../4_Shared/model/useChampionshipInfoContext";
import {
  useMyCommunityListIdx,
  useMyCommunityRoleIdx,
} from "../../4_Shared/lib/useMyInfo";

const Championship = () => {
  const [championshipIdx] = useValidParamInteger("championshipIdx");
  const [championshipInfo] = useGetChampionshipInfo(championshipIdx);
  const {
    championship_type_idx,
    community_list_idx,
    championship_list_color,
    winner_team_color,
  } = championshipInfo;

  const [myCommunityListIdx] = useMyCommunityListIdx();
  const [communityRoleIdx] = useMyCommunityRoleIdx();
  const isCommunityOperator =
    communityRoleIdx === 1 && myCommunityListIdx === community_list_idx;
  const isCommunityManager =
    communityRoleIdx === 0 && myCommunityListIdx === community_list_idx;

  return (
    <div className="w-full min-h-full">
      <ChampionshipInfoContext.Provider
        value={{
          isCommunityOperator,
          isCommunityManager,
          championshipListColor: winner_team_color
            ? winner_team_color
            : championship_list_color,
          communityListIdx: community_list_idx,
        }}>
        {/* 상단 배너 영역 */}
        <InfoHeader championshipInfo={championshipInfo} />
        {/* 하단 정보 영역 */}
        <DashBoard championship_type_idx={championship_type_idx} />
      </ChampionshipInfoContext.Provider>
    </div>
  );
};

export default Championship;
