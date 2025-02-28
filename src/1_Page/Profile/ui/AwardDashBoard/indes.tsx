import React, { useEffect } from "react";

import { UserInfoStats } from "./type";
import AutoMoveAwardList from "../../../../2_Widget/AutoMoveAwardList";
const AwardDashBoard = (props: { userInfo: UserInfoStats }) => {
  const {
    userInfo: { match_count = 0, winning_rate = 0, trophies = [] },
  } = props;

  useEffect(() => {
    console.log(trophies.length);
  }, [trophies]);

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
      {/* 제목 */}
      <h2 className="text-blue-600 font-bold text-center">YOUR NOT ALONE</h2>
      <h1 className="text-3xl font-bold text-center mt-2">AWARD</h1>

      {/* 입력 필드 */}
      <div className="flex justify-between items-center mt-4 space-x-4">
        <div className="flex flex-col w-1/2">
          <label className="text-sm font-medium text-gray-600">
            Match Count
          </label>
          <input
            type="number"
            value={match_count}
            className="border rounded-md p-2 text-center"
          />
        </div>
        <div className="flex flex-col w-1/2">
          <label className="text-sm font-medium text-gray-600">
            Winning Count
          </label>
          <input
            type="text"
            value={winning_rate}
            className="border rounded-md p-2 text-center"
          />
        </div>
      </div>

      {/* 트로피 리스트 */}
      {trophies.length !== 0 && (
        <div className="w-full">
          <AutoMoveAwardList awards={trophies} />
        </div>
      )}

      {/* 어워드 리스트 */}
      <div className="mt-4">
        <h3 className="text-blue-600 font-semibold text-sm mb-2">AWARD LIST</h3>
        <div className="bg-gray-100 p-2 rounded-md space-y-2">
          {trophies.length !== 0 &&
            trophies.map((award, index) => (
              <div
                key={index}
                className="bg-white p-3 rounded-md shadow-sm border"></div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AwardDashBoard;
