import PlayerDashBoard from "./ui/PlayerDashBoard";
import useGetMyInfo from "../../3_Entity/Account/useGetUserInfo";
import useValidParamInteger from "../../4_Shared/model/useValidParamInteger";
import PlayerCard from "../../2_Widget/PlayerCard";
import AutoMoveAwardList from "../../2_Widget/AutoMoveAwardList";

const Profile = () => {
  const [userIdx] = useValidParamInteger("userIdx");
  const [userInfo] = useGetMyInfo(userIdx);
  console.log(userInfo);
  const { Awards = [], ...playerProps } = userInfo;
  return (
    <main className="flex flex-wrap gap-1 w-full justify-center">
      {/* Player Dashboard */}

      <div className="w-[90%] sm:w-[40%] min-w-[300px] max-w-sm">
        <PlayerDashBoard {...playerProps} />
      </div>

      {/* Award Dashboard */}
      <div className="w-[90%] sm:w-[40%] min-w-[300px] max-w-sm">
        <div className="w-full bg-white shadow-md rounded-lg p-4 border border-blue-300">
          {/* 제목 */}
          <h2 className="text-blue-600 font-semibold text-center text-sm">
            PLAY TO WIN
          </h2>
          <h1 className="text-lg font-bold text-center mt-1">AWARD</h1>
          <p className="text-gray-500 text-center text-xs cursor-pointer">
            See More Award
          </p>

          {/* 트로피 리스트 */}
          {Awards.length !== 0 && (
            <div className="w-full mt-3">
              <AutoMoveAwardList awards={Awards} />
            </div>
          )}
          {/* 현재 MMR 은 노출 X  */}
          <div className="w-[100%] max-w-[280px]">
            <PlayerCard {...playerProps} />
          </div>
          {/* 어워드 리스트 */}
          <div className="mt-6">
            <h3 className="text-blue-600 font-semibold text-sm mb-3 border-b border-blue-200 pb-1">
              🎖 AWARD LIST
            </h3>
            {Awards.length === 0 ? (
              <div className="flex items-center justify-center text-gray-400 text-sm py-6">
                <p>수상 기록이 없습니다</p>
              </div>
            ) : (
              <div className="max-h-[200px] overflow-y-auto space-y-3 px-2">
                {Awards.map((award, index) => (
                  <div
                    key={index}
                    className="cursor-pointer text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200">
                    <div className="bg-gray-50 p-2 rounded-md shadow-sm hover:shadow-md">
                      <h4 className="font-semibold underline truncate">
                        {award.championship_list_name}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
