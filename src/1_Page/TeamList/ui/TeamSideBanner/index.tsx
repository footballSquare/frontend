// 팀 배너 컴포넌트
import infoSvg from "../../../../4_Shared/assets/svg/info.svg";

const TeamBanner = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="relative bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
        <div className="relative z-10">
          <h2 className="text-xl font-bold mb-2">
            나에게 맞는 팀을 찾아보세요
          </h2>
          <p className="mb-4 text-blue-100">
            함께하면 더 즐거운 활동이 기다리고 있어요
          </p>
        </div>

        {/* 배너 SVG 이미지 */}
        <div className="absolute right-4 bottom-0 w-32 h-32 opacity-90">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <g fill="#ffffff" fillOpacity="0.15">
              <circle cx="150" cy="100" r="40" />
              <circle cx="90" cy="60" r="25" />
              <circle cx="90" cy="130" r="25" />
              <rect x="85" y="60" width="65" height="10" rx="5" />
              <rect x="85" y="130" width="65" height="10" rx="5" />
              <rect x="90" y="60" width="10" height="80" rx="5" />
            </g>
          </svg>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-medium text-gray-800 mb-3">빠른 이동</h3>

        <div className="space-y-2">
          <a
            href="#recent"
            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <span className="text-gray-700">최근 생성된 팀</span>›
          </a>

          <a
            href="#myteam"
            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <span className="text-gray-700">내가 속한 팀</span>›
          </a>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center mb-2">
            <img src={infoSvg} />
            <span className="ml-2 text-sm font-medium text-gray-700">
              알고 계셨나요?
            </span>
          </div>
          <p className="text-xs text-gray-600">
            팀원 모집 상태를 '모집 중'으로 설정하면 더 많은 사람들에게
            노출됩니다.
          </p>
        </div>
      </div>
    </div>
  );
};
export default TeamBanner;
