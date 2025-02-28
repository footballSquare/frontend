import { TeamAwards } from "../Team/type";

export type UserInfo = {
  isMine: boolean;
  name: string;
  nickname: string;
  platform: number;
  team: string;
  position: number;
  tag_discord: string;
  tag: string;
  mmr: number;
  phone_number: string;
  match_count: number;
  winning_rate: number;
  trophies: TeamAwards[];
};
