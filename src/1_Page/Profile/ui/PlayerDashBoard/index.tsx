const PlayerDashBoard = () => {
  return (
    <div className="grid grid-cols-2">
      <div className="col-span-1 w-[180px] sm:w-[150px] md:w-[200px] lg:w-[250px] aspect-[3/4] bg-blue-900 text-white rounded-xl flex flex-col items-center justify-between p-4 shadow-lg">
        {/* 포지션 */}
        <div className="text-sm font-bold self-start">RW</div>

        {/* 선수 이미지 */}
        <div className="flex-1 flex items-center justify-center">
          <img
            src="https://example.com/player.png"
            alt="Player"
            className="max-w-[80%] max-h-[60%] object-contain"
          />
        </div>

        {/* 선수 정보 */}
        <div className="text-center">
          <p className="text-lg font-semibold">김네이마루 #KOR</p>
          <p className="text-sm">10번</p>
        </div>
      </div>
      <div className="col-span-1">
        <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
          <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
            {/* 헤더 */}
            <h2 className="text-blue-600 font-bold text-center">
              YOUR NOT ALONE
            </h2>
            <h1 className="text-2xl font-bold text-center mt-2">BEST PLAYER</h1>
            <p className="text-gray-500 text-center">state message in hear</p>

            {/* 폼 */}
            <form className="mt-4 space-y-4">
              {/* 이름 & 닉네임 */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    name
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    placeholder="name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    nickname
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    placeholder="nickname"
                  />
                </div>
              </div>

              {/* 플랫폼 & 팀 */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    platform
                  </label>
                  <select className="w-full p-2 border rounded-md">
                    <option>name</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    team
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    placeholder="nickname"
                  />
                </div>
              </div>

              {/* 포지션 */}
              <div>
                <label className="text-sm font-medium text-gray-600">
                  position
                </label>
                <select className="w-full p-2 border rounded-md">
                  <option>none</option>
                </select>
              </div>

              {/* 태그 & 디스코드 태그 */}
              <div>
                <label className="text-sm font-medium text-gray-600">
                  tag # discord
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  placeholder="#000000"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">tag</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  placeholder="#000000"
                />
              </div>

              {/* MMR & Phone Number */}
              <div>
                <label className="text-sm font-medium text-gray-600">mmr</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  placeholder="9"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">
                  Phone number
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  placeholder="KR 000-0000-0000"
                />
              </div>

              {/* 버튼 */}
              <button className="w-full bg-blue-600 text-white py-2 rounded-md font-bold mt-2">
                MODIFY
              </button>

              {/* 삭제 & 로그아웃 버튼 */}
              <div className="flex justify-between mt-2">
                <button className="text-gray-500 border px-4 py-2 rounded-md">
                  delete
                </button>
                <button className="text-gray-500 border px-4 py-2 rounded-md">
                  logout
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PlayerDashBoard;
