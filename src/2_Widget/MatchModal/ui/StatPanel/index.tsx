import { StatPanelProps } from "./type";
import PlayerCard from "./ui/PlayerCard";
const StatPanel = (props: StatPanelProps) => {
  const { matchParticipants } = props;
  return <div className=" w-full border-1 flex flex-col justify-center items-center gap-2">
    <h3 className=" text-blue">경기 기록</h3>
    {matchParticipants.map((participant)=>{
      return(<PlayerCard matchParticipant={participant} />)
    })}
  </div>;
};

export default StatPanel;
