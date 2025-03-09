const Community = () => {
  return (
    <div className="bg-gray-100 w-full p-4 flex gap-4">
      {/* Left Sidebar */}
      <div className="bg-white rounded-lg shadow p-4 w-full max-w-[360px]">
        <div className="flex flex-col items-center mb-4 border-1">
          <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl mb-2">
            C
          </div>
          <h2 className="text-xl font-bold">KFPL</h2>
        </div>

        <div className="space-y-3 border-1">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img
                src="/api/placeholder/32/32"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="text-sm">@홍길동국</p>
            </div>
            <p className="text-xs text-gray-500">팀원</p>
          </div>

          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img
                src="/api/placeholder/32/32"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="text-sm">@phoenix</p>
            </div>
            <span className="text-xs text-gray-500">부원장</span>
          </div>

          <div className="text-xs text-gray-500 mt-4 pt-2 border-t border-gray-200">
            2024년에 가입 · 최근 7일
          </div>
        </div>
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
          <div className="bg-white rounded-lg shadow"></div>

          {/* Middle Tab */}
          <div className="bg-white rounded-lg shadow"></div>

          {/* Right Tab */}
          <div className="bg-white rounded-lg shadow"></div>
        </div>
      </div>
    </div>
  );
};

export default Community;
