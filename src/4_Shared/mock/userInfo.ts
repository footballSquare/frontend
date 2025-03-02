import { teamAwardsData } from "./teamInfo";
import profile_img from "../assets/img/profile_img.jpg";

export const mockUserInfo = {
  user: {
    isMine: true,
    name: "John Doe",
    nickname: "AcePlayer",
    platform: 1,
    team: "Champion FC",
    position: 1,
    tag_discord: "#1234",
    tag: "#000000",
    mmr: 2500,
    phone_number: "010-1234-5678",
    match_count: 20,
    winning_rate: 12,
    trophies: teamAwardsData.team_award,
    profile_img: profile_img,
  },
};
