import useGetMatchStats from "../../../../3_Entity/Match/useGetMatchStats";
import { StatPanelProps } from "./type";
import PlayerCard from "./ui/PlayerCard";
const StatPanel = (props: StatPanelProps) => {
  const { matchParticipants } = props;
  const [matchStats] = useGetMatchStats({matchIdx:1});
  return (
    <div className=" w-full border-1 flex justify-between items-center px-4">
      <div>
        <h3 className=" text-blue">팀 스탯</h3>
        {
          matchStats.team_stats.match_team_stats_cornerkick
        }
      </div>
      <div className="flex flex-col gap-2">
        <h3 className=" text-blue">스탯 미 입력 선수</h3>
        {matchParticipants.map((participant) => {
          return <PlayerCard matchParticipant={participant} />;
        })}
      </div>
      <div className="flex flex-col gap-2">
        <h3 className=" text-blue">스탯 입력 완료 선수</h3>
        {matchParticipants.map((participant) => {
          return <PlayerCard matchParticipant={participant} />;
        })}
      </div>

    </div>
  );
};

export default StatPanel;
