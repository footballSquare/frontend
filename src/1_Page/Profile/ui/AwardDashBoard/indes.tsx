import AutoMoveAwardList from "../../../../2_Widget/AutoMoveAwardList";

const AwardDashBoard = (props: AwardDashBoardProps) => {
  const { match_count, winning_rate, trophies = [] } = props;

  return (
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
      {/* <div>
        <label className="text-xs font-medium text-gray-600">mmr</label>
        <p className="border-b border-gray-400 py-1 text-center text-sm">
          {mmr}
        </p>
      </div> */}
      {/* 어워드 리스트 */}
      <div className="mt-4">
        <h3 className="text-blue-600 font-semibold text-xs mb-2">AWARD LIST</h3>
        <div className="max-h-[150px] overflow-y-auto space-y-2">
          {trophies.length !== 0 &&
            trophies.map((award, index) => (
              <div
                key={index}
                className="cursor-pointer text-xs text-gray-500 hover:text-gray-700">
                {/* 텍스트 정보 */}
                <div className="text-left">
                  <h3 className="font-medium underline">
                    {award.championship_list_name}
                  </h3>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AwardDashBoard;
