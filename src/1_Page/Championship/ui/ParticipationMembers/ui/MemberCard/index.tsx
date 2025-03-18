import { MemberCardProps } from "./type";
const MemberCard = (props: MemberCardProps) => {
  const { player, index } = props;
  return (
    <li
      key={player.id + "" + index}
      className="flex items-center justify-between border-b last:border-b-0 py-2">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gray-300 rounded-full" />
        <span className="font-medium">{player.name}</span>
      </div>
      <div className="text-sm text-gray-500">{player.result || "참가 중"}</div>
    </li>
  );
};
export default MemberCard;
