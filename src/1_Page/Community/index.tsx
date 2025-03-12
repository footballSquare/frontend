import { useParams } from "react-router-dom";
import ChampionShipList from "./ui/ChampionshipList";
import CommunityAdminList from "./ui/CommunityAdminList";
import CommunityPostList from "./ui/CommunityPostList";
import CommunityTeamList from "./ui/CommunityTeamList";
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
        <div className="w-full h-36 bg-blue-600 rounded-lg mb-4 overflow-hidden">
          <div className="w-full h-full bg-blue-600 flex items-center justify-center text-white text-xl">
            배너 이미지
          </div>
        </div>

        <div className=" flex gap-4">
          {/* Left Tab */}
          <ChampionShipList communityIdx={Number(communityIdx)} />

          {/* Middle Tab */}
          <CommunityPostList />

          {/* Right Tab */}
          <CommunityTeamList communityIdx={Number(communityIdx)} />
        </div>
      </div>
    </div>
  );
};

export default Community;
