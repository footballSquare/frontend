import { MatchApproveHandlerProps } from "../../model/type";

export type FormationPanelProps = {
  matchFormationIdx: number;
  matchParticipants: {
    player_list_idx: number;
    player_list_nickname: string;
    match_position_idx: number;
    player_list_url: string;
  }[];
  matchDisApproveHandler: (props: MatchApproveHandlerProps) => void;
  isMatchLeader: boolean;
  matchParticipationType: number;
};
