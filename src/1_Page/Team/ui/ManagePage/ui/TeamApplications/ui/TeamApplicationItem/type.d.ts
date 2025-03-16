import { TeamSignMember } from "../../../../../../../../3_Entity/Team/types/response";

interface TeamApplicationItemProps {
  player: TeamSignMember;
  postApproveMember: (playerId: number) => void;
  deleteApproveMember: (playerId: number) => void;
  addToArray: (playerId: number) => void;
}
