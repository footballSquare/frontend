import { teamStatKeys } from "./constant/teamStatKeys";

const TeamStatsCard = ({ teamName, stats, color }: TeamStatCardProps) => {
  const textColorClass = `text-${color}-800`;
  const backgroundColorClass = `bg-${color}-50`;

  return (
    <div className="bg-white border-2 border-gray-100 rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300">
      <div className={`relative p-5 ${backgroundColorClass} bg-opacity-10`}>
        <h3
          className={`text-2xl font-extrabold ${textColorClass} text-center tracking-wider`}>
          {teamName}
        </h3>
      </div>

      <div className="p-5 bg-gray-50 bg-opacity-50">
        <div className="overflow-x-auto">
          <table className="w-full">
            <tbody>
              {teamStatKeys.map((item) => (
                <tr
                  key={item.key}
                  className="border-b last:border-b-0 hover:bg-white transition-colors duration-200 group">
                  <td className="px-4 py-3 text-gray-700">
                    <span
                      className={`font-semibold transition-colors text-gray-800 `}>
                      {item.label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end">
                      <span className="font-bold text-gray-900 text-lg bg-indigo-50 px-3 py-1 rounded-full group-hover:bg-indigo-100 transition-colors">
                        {stats?.[item.key] ?? 0}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeamStatsCard;
