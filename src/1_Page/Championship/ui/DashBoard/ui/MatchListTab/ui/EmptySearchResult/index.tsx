const EmptySearchResult = (props: EmptySearchResultProps) => {
  const { searchTerm } = props;
  return (
    <div className="text-center py-20">
      <div className="flex flex-col items-center gap-8">
        <div className="w-24 h-24 bg-gradient-to-br from-white/10 via-white/15 to-white/5 rounded-3xl flex items-center justify-center shadow-2xl backdrop-blur-md border border-white/20">
          <span className="text-5xl">{searchTerm ? "🔍" : "⚽"}</span>
        </div>
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-white">
            {searchTerm ? "검색 결과가 없습니다" : "등록된 매치가 없습니다"}
          </h3>
          <p className="text-gray-300 max-w-md mx-auto leading-relaxed text-lg">
            {searchTerm
              ? `"${searchTerm}"에 대한 검색 결과를 찾을 수 없습니다. 다른 키워드로 시도해보세요.`
              : "아직 생성된 매치가 없습니다. 새로운 매치를 생성하여 대회를 시작해보세요."}
          </p>
          {searchTerm && (
            <button
              onClick={() => window.location.reload()}
              className="mt-6 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl transition-all duration-500 transform hover:scale-105 shadow-2xl hover:shadow-blue-500/25 font-semibold">
              전체 매치 보기
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default EmptySearchResult;
