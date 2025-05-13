import PlayerDashBoard from "./ui/PlayerDashBoard";
import useGetMyInfo from "../../3_Entity/Account/useGetUserInfo";
import useValidParamInteger from "../../4_Shared/model/useValidParamInteger";
import PlayerCard from "../../2_Widget/PlayerCard";
import AutoMoveAwardList from "../../2_Widget/AutoMoveAwardList";
import empty from "../../4_Shared/assets/svg/empty-note.svg";

const Profile = () => {
  const [userIdx] = useValidParamInteger("userIdx");
  const [userInfo] = useGetMyInfo(userIdx);
  // Awards 값이 undefined면 빈 배열([])로 처리
  const awards = userInfo?.Awards ?? [];

  return (
    <main className="flex flex-wrap gap-6 w-full justify-center py-8 px-4 bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Player Dashboard */}
      <div className="w-[90%] sm:w-[40%] min-w-[300px] max-w-sm">
        <div className="transform transition-all duration-300 hover:scale-[1.01] hover:shadow-xl">
          <PlayerDashBoard {...userInfo} />
        </div>
      </div>

      {/* Award Dashboard */}
      <div className="w-[90%] sm:w-[40%] min-w-[300px] max-w-sm">
        <div className="w-full bg-gray-800 shadow-lg rounded-2xl p-6 border border-gray-700 transform transition-all duration-300 hover:shadow-blue-500 hover:border-blue-500 overflow-hidden">
          {/* 헤더 영역 */}
          <div className="relative mb-6">
            <div className="absolute -top-10 -left-10 w-24 h-24 bg-blue-500 opacity-10 rounded-full"></div>
            <div className="absolute -top-6 -right-6 w-16 h-16 bg-yellow-500 opacity-10 rounded-full"></div>

            <h2 className="text-blue-600 font-semibold text-center text-sm tracking-widest">
              PLAY TO WIN
            </h2>
            <h1 className="text-xl font-bold text-center mt-1 text-gray-100">
              AWARD
            </h1>
            <p className="text-gray-400 text-center text-xs mt-2 cursor-pointer hover:text-blue-500 transition-colors">
              See More Award
            </p>

            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-200 mx-auto mt-3 rounded-full"></div>
          </div>

          {/* 트로피 리스트 */}
          {awards.length !== 0 && (
            <div className="w-full mt-3 bg-gray-700 p-3 rounded-xl">
              <AutoMoveAwardList awards={awards} />
            </div>
          )}

          {/* 플레이어 카드 */}
          <div className="w-full max-w-[280px] mx-auto my-6 transform transition hover:scale-[1.01]">
            <PlayerCard {...userInfo} />
          </div>

          {/* 어워드 리스트 */}
          <div className="mt-6 bg-gray-800 rounded-xl p-4 border border-gray-700">
            <h3 className="text-blue-600 font-semibold text-sm mb-4 border-b border-blue-100 pb-2 flex items-center">
              <span className="text-lg mr-2">🏆</span> AWARD LIST
            </h3>

            {awards.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-gray-400 py-8 bg-gray-900 rounded-lg">
                <img
                  src={empty}
                  alt="Empty Award List"
                  className="w-[30px] h-[30px] object-cover"
                />
                <p>수상 기록이 없습니다</p>
              </div>
            ) : (
              <div className="max-h-[200px] overflow-y-auto space-y-3 px-2 scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-gray-100">
                {awards.map((award, index) => (
                  <div
                    key={index}
                    className="cursor-pointer text-sm text-gray-300 hover:text-blue-600 transition-all duration-200">
                    <div className="bg-gray-700 p-3 rounded-lg shadow-sm hover:shadow-md border-l-4 border-blue-400 hover:translate-x-1 transition-all">
                      <h4 className="font-semibold truncate flex items-center">
                        <span className="text-yellow-500 mr-2">🏅</span>
                        {award.championship_list_name}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 장식적 요소 */}
          <div className="w-full flex justify-center mt-6">
            <div className="h-1 w-12 bg-gray-600 rounded-full mx-1"></div>
            <div className="h-1 w-12 bg-blue-300 rounded-full mx-1"></div>
            <div className="h-1 w-12 bg-gray-600 rounded-full mx-1"></div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
