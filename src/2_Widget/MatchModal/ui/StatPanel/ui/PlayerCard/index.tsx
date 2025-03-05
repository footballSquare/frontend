import { matchPosition } from "../../../../../../4_Shared/constant/matchPosition";
import { PlayerCardProps } from "./type";
import useStatInputModal from "./model/useStatInputModal";
import StatInputModal from "./ui/StatInputModal";
const PlayerCard = (props: PlayerCardProps) => {
  const [isStatInputModalOpen, toggleStatInputModal] = useStatInputModal();
  const { matchParticipant } = props;
  return (
    <div className=" flex flex-col">
      <p className=" cursor-pointer border-gray border-1 rounded-lg shadow-lg w-[128px] text-sm text-center" onClick={toggleStatInputModal}>{`${matchPosition[matchParticipant.match_position_idx]}_${
        matchParticipant.player_list_nickname
      }`}</p>
      {isStatInputModalOpen && <StatInputModal toggleStatInputModal={toggleStatInputModal} />}
    </div>
  );
};

export default PlayerCard;
