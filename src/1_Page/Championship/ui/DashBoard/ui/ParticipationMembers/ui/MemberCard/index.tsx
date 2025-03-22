import { PlayerStatsTableProps } from "./type";

const PlayerStatsTable = (props: PlayerStatsTableProps) => {
  const { data, index } = props;
  return (
    <tr
      key={index}
      className={`text-center text-gray-900 font-medium transition duration-200 hover:bg-purple-100 ${
        index % 2 === 0 ? "bg-gray-50" : "bg-white"
      }`}>
      {/* 선수 이름 (왼쪽 정렬 & 둥근 이미지) */}
      <td className="px-6 py-4 border flex items-center space-x-3 text-left">
        <img
          src={data.match_player_stats_evidence_img}
          alt="Player"
          className="w-10 h-10 rounded-full border shadow-md"
        />
        <span className="font-semibold text-lg">
          {data.player_list_nickname}
        </span>
      </td>

      {/* 득점 & 어시스트 (굵은 텍스트 강조) */}
      <td className="px-4 py-4 border text-lg font-bold text-indigo-600">
        {data.match_player_stats_goal}
      </td>
      <td className="px-4 py-4 border text-lg font-bold text-green-600">
        {data.match_player_stats_assist}
      </td>

      {/* 패스 성공률, 드리블 성공률, 태클 성공률 (퍼센트 표시) */}
      <td className="px-4 py-4 border text-gray-700">
        {data.match_player_stats_successrate_pass}%
      </td>
      <td className="px-4 py-4 border text-gray-700">
        {data.match_player_stats_successrate_dribble}%
      </td>
      <td className="px-4 py-4 border text-gray-700">
        {data.match_player_stats_successrate_tackle}%
      </td>

      {/* 점유율 (강조된 스타일) */}
      <td className="px-4 py-4 border text-lg font-semibold text-blue-700">
        {data.match_player_stats_possession}%
      </td>

      {/* 증거 이미지 (둥근 이미지 & 그림자 효과) */}
      <td className="px-4 py-4 border">
        <img
          src={data.match_player_stats_evidence_img}
          alt="증거 이미지"
          className="w-16 h-16 rounded-lg shadow-lg border border-gray-300"
        />
      </td>
    </tr>
  );
};

export default PlayerStatsTable;
