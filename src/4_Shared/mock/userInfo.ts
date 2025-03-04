import { teamAwardsData } from "./teamInfo";
import profile_img from "../assets/img/profile_img.jpg";

export const mockUserInfo = {
  user: {
    is_mine: true,
    is_hire: false,
    short_team_name: "CFC",
    user_idx: 3,
    profile_img: profile_img,
    nickname: "AcePlayer",
    state_message: "자 한판 붙어 보시지",
    platform: 1,
    team: "Champion FC",
    position: 1,
    tag_discord: "#1234",
    mmr: 2500,
    match_count: 20,
    winning_rate: 12,
    trophies: teamAwardsData.team_award,
  },
};
