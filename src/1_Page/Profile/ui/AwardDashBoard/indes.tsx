import { UserInfoStats } from "./type";
import AutoMoveAwardList from "../../../../2_Widget/AutoMoveAwardList";

const AwardDashBoard = ({ awardInfo }: { awardInfo: UserInfoStats }) => {
  const { match_count = 0, winning_rate = 0, trophies = [] } = awardInfo;

  return (
    <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg p-4">
      {/* 제목 */}
      <h2 className="text-blue-600 font-semibold text-center text-sm">
        PLAY TO WIN
      </h2>
      <h1 className="text-lg font-bold text-center mt-1">AWARD</h1>

      {/* 트로피 리스트 */}
      {trophies.length !== 0 && (
        <div className="w-full mt-3">
          <AutoMoveAwardList awards={trophies} />
        </div>
      )}

      {/* 매치 정보 */}
      <div className="flex justify-between items-center mt-3 space-x-2">
        <div className="flex flex-col w-1/2">
          <label className="text-xs font-medium text-gray-600">
            Match Count
          </label>
          <p className="border-b border-gray-400 py-1 text-center text-sm">
            {match_count}
          </p>
        </div>
        <div className="flex flex-col w-1/2">
          <label className="text-xs font-medium text-gray-600">
            Winning Rate
          </label>
          <p className="border-b border-gray-400 py-1 text-center text-sm">
            {winning_rate}%
          </p>
        </div>
      </div>

      {/* 어워드 리스트 */}
      <div className="mt-3">
        <h3 className="text-blue-600 font-semibold text-xs mb-1">AWARD LIST</h3>
        <div className="bg-gray-100 p-1 rounded-md space-y-1 overflow-y-auto h-full max-h-[200px] flex-1">
          {trophies.length !== 0 &&
            trophies.map((award, index) => (
              <div
                key={index}
                className="bg-white p-1 rounded-md shadow-sm flex flex-row-reverse items-center space-x-2 space-x-reverse">
                {/* 트로피 이미지 */}
                <img
                  src={award.championship_list_throphy_img}
                  alt={award.championship_list_name}
                  className="w-8 h-8 object-contain"
                />
                {/* 텍스트 정보 */}
                <div className="text-right">
                  <h3 className="text-xs font-medium text-gray-800">
                    {award.championship_list_name}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {award.championship_list_start_date} ~{" "}
                    {award.championship_list_end_date}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AwardDashBoard;
