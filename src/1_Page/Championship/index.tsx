type Participant = {
  id: number;
  name: string;
  rank?: number;
  result?: string;
};

const dummyParticipants: Participant[] = [
  { id: 1, name: "playerA", rank: 1, result: "우승" },
  { id: 2, name: "playerB", rank: 2, result: "준우승" },
  { id: 3, name: "playerC", rank: 3, result: "4강" },
  { id: 4, name: "playerD", rank: 4, result: "4강" },
  { id: 5, name: "playerE", rank: 5, result: "8강" },
  { id: 6, name: "playerF", rank: 6, result: "8강" },
];
import trophy from "../../4_Shared/assets/img/trophy.jpg";

const Championship = () => {
  return (
    <div className="min-h-screen w-full bg-gray-100 text-gray-800">
      {/* 상단 배너 영역 */}
      <header className="relative flex flex-col justify-center items-center min-h-[200px] bg-blue-600 text-white gap-3 p-4">
        <div className="absolute top-0 left-0 w-[100px] h-[100px] border-4 border-white rounded-full transform -translate-x-1/2 -translate-y-1/2 opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-[100px] h-[100px] border-4 border-white rounded-full transform translate-x-1/2 translate-y-1/2"></div>
        {/* 대회 제목 + 트로피 아이콘 */}
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          {/* Heroicons trophy 예시 (Outline) */}
          <img className="w-[40px] h-[40px] object-cover" src={trophy} />
          <h1 className="text-2xl font-bold">KOR PLUS 24 FW CUP</h1>
        </div>

        {/* 대회 정보 입력부 */}
        <div className="w-full flex flex-col justify-center sm:flex-row items-center gap-2">
          <p className="w-[40%] px-3 py-2 text-center rounded-md border text-white sm:w-[23%]">
            대회 기간
          </p>
          <p className="w-[40%] px-3 py-2 text-center rounded-md border text-white sm:w-[23%]">
            대회 기간
          </p>
          <p className="w-[40%] px-3 py-2 text-center rounded-md border text-white sm:w-[23%]">
            대회 기간
          </p>
        </div>
      </header>

      {/* 메인 컨텐츠 영역 */}
      <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 출전 선수 목록 (왼쪽) */}
        <section className="bg-white rounded-md shadow p-4">
          <h2 className="text-lg font-semibold mb-4">출전 선수</h2>
          <ul className="space-y-2">
            {dummyParticipants.map((player) => (
              <li
                key={player.id}
                className="flex items-center justify-between border-b last:border-b-0 py-2">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-300 rounded-full" />
                  <span className="font-medium">{player.name}</span>
                </div>
                <div className="text-sm text-gray-500">
                  {player.result || "참가 중"}
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* 중앙 영역 (예: 현재 경기 정보/대진 정보 등) */}
        <section className="bg-white rounded-md shadow p-4">
          <h2 className="text-lg font-semibold mb-4">현재 경기 정보</h2>
          <div className="space-y-2">
            {/* 예시로 매치업 리스트 */}
            <div className="flex items-center justify-between">
              <span className="font-medium">@playerA</span>
              <span className="text-sm text-gray-500">vs</span>
              <span className="font-medium">@playerB</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">@playerC</span>
              <span className="text-sm text-gray-500">vs</span>
              <span className="font-medium">@playerD</span>
            </div>
          </div>
        </section>

        {/* 대진표 영역 (오른쪽) */}
        <section className="bg-white rounded-md shadow p-4 overflow-auto">
          <h2 className="text-lg font-semibold mb-4">대진표</h2>
          {/* 간단한 8강/16강 예시 (좌우 대진) */}
          <div className="flex justify-center space-x-8">
            {/* 왼쪽 대진 */}
            <div className="space-y-2">
              {[...Array(8)].map((_, i) => (
                <div
                  key={`left-slot-${i}`}
                  className="w-32 h-10 bg-green-200 flex items-center justify-center rounded-md">
                  <span className="text-sm">Left {i + 1}</span>
                </div>
              ))}
            </div>
            {/* 오른쪽 대진 */}
            <div className="space-y-2">
              {[...Array(8)].map((_, i) => (
                <div
                  key={`right-slot-${i}`}
                  className="w-32 h-10 bg-green-200 flex items-center justify-center rounded-md">
                  <span className="text-sm">Right {i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* 푸터 영역 */}
      <footer className="text-center py-4 text-sm text-gray-500">
        © Copyright 2021. All rights reserved by ChamPlay
      </footer>
    </div>
  );
};

export default Championship;
