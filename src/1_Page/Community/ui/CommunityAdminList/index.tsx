const CommunityAdminList = () => {
  return (
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
  );
};

export default CommunityAdminList;
