import { useParams } from "react-router-dom";
import ChampionShipList from "./ui/ChampionshipList";
import CommunityAdminList from "./ui/CommunityAdminList";
import CommunityTeamList from "./ui/CommunityTeamList";
import BoardList from "../../2_Widget/BoardList";
const Community = () => {
  const { communityIdx } = useParams();
  return (
    <div className="bg-white w-full p-4 flex gap-4">
      {/* Left Sidebar */}
      <div className="bg-white rounded-lg shadow p-4 w-full max-w-[360px]">
        <div className="flex flex-col items-center mb-4 border-1">
          <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl mb-2">
            C
          </div>
          <h2 className="text-xl font-bold">KFPL</h2>
        </div>
        <CommunityAdminList communityIdx={Number(communityIdx)} />
      </div>

      <div className=" flex flex-col gap-4 w-full">
        {/* 배너 */}
        <div className="w-full min-h-[160px] bg-blue-600 flex items-center justify-center text-white text-xl">
          배너 이미지
        </div>

        <div className=" flex gap-4">
          {/* Left Tab */}
          <div className="w-full">
            <h3 className="font-bold mb-2">Championship</h3>
            <ChampionShipList communityIdx={Number(communityIdx)} />
          </div>

          {/* Middle Tab */}
          <div className="w-full">
            <h3 className="font-bold mb-2">Community Board</h3>
            <BoardList category={0} />
          </div>
          

          {/* Right Tab */}
          <div className="w-full">
            <h3 className="font-bold mb-2">Community Teams</h3>
            <CommunityTeamList communityIdx={Number(communityIdx)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
