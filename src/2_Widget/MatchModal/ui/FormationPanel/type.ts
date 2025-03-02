import { MatchWaitList } from "../../../../3_Entity/Match/type";

export type FormationPanelProps = {
  matchFormationIdx: number;
  setMatchWaitList: React.Dispatch<React.SetStateAction<MatchWaitList>>;
  matchParticipants: {
    player_list_idx: number;
    player_list_nickname: string;
    match_position_idx: number;
    player_list_url: string;
  }[];
};
