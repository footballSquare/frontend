import { teamStatKeys } from "./constant/teamStatKeys";

const TeamStatsCard = (props: TeamStatCardProps) => {
  const { teamName, stats, backgroundColorClass, textColorClass } = props;
  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div
        className={`flex items-center justify-center p-4 ${backgroundColorClass}`}>
        <h3 className={`text-xl font-bold ${textColorClass}`}>{teamName}</h3>
      </div>
      <div className="p-4">
        <div className="overflow-x-auto">
          <table className="w-full">
            <tbody>
              {teamStatKeys.map((item) => (
                <tr
                  key={item.key}
                  className="border-b last:border-b-0 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 flex items-center text-gray-700">
                    <span className="font-medium">{item.label}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end">
                      <span className="font-semibold text-gray-800 mr-2">
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
