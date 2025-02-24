import { MatchInfoProps } from "./type";

const MatchCard = ({
  match,
  index,
}: {
  match: MatchInfoProps;
  index: number;
}) => {
  return (
    <div
      key={"mathcard-" + index}
      className={`flex flex-row items-center rounded-lg shadow min-h-[100px] 
      ${match.match_match_attribute === 1 ? "bg-grey" : "bg-gray-300"}`}>
      <div className="grid grid-cols-4 w-full gap-2 p-4">
        {/* Header Section */}
        <div className="col-span-3 sm:col-span-1 flex flex-col justify-between items-center">
          <p className="text-gray-800 text-sm font-semibold">
            {match.player_list_nickname} #{match.team_list_idx}
          </p>
          <span
            className={`text-xs font-medium ${
              match.match_match_participation_type === 1
                ? "text-red-500"
                : "text-green-500"
            }`}>
            {match.match_match_participation_type === 1
              ? "#승인 필요"
              : "#자유 참여"}
          </span>
          <span className="text-xs text-gray-400">
            경기 ID: {match.match_match_idx}
          </span>
        </div>

        {/* Info Section */}
        <div className="hidden sm:flex flex-col col-span-2">
          <p className="text-gray-500 text-xs">
            게임 모드:{" "}
            <span className="font-medium">
              {match.match_type_idx === 0 ? "일반 경기" : "특별 경기"}
            </span>
          </p>
          <p className="text-gray-500 text-xs">
            매치 진행:{" "}
            <span className="font-medium">{match.match_match_start_time}</span>
          </p>
          <p className="text-gray-500 text-xs">
            예상 플레이 타임:{" "}
            <span className="font-medium">{match.match_match_duration}</span>
          </p>
        </div>

        {/* Status Icon */}
        <div className="flex justify-end items-center">
          <span
            className={`w-5 h-5 text-white text-xs flex items-center justify-center rounded-full ${
              match.match_match_attribute === 1 ? "bg-red-500" : "bg-green-500"
            }`}>
            {match.match_match_attribute === 1 ? "✗" : "✓"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MatchCard;
