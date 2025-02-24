import { useState } from "react";

const TEAMPAGE_INFO: object = {
  team: {
    community_list_idx: 0,
    team_list_idx: 10,
    team_list_name: "레알",
    team_list_short_name: "RMA",
    team_list_color: "#f152482",
    team_list_emblem: "URL",
    team_list_banner: "URL",
    team_list_announcement:
      "레알 팀원 모집 중 입니다. 멀티포지션 환영, 접률 좋은분 환영",
    team_list_created_at: 2024 - 10 - 20,
    whole_member: 15,
  },
  team_member: [
    {
      player_list_idx: 30,
      player_list_platform: "URL",
      player_list_profile_img: "URL",
      player_list_nickname: "김지단",
      team_role_idx: 0,
    },
    {
      player_list_idx: 44,
      player_list_platform: "URL",
      player_list_profile_img: "URL",
      player_list_nickname: "최라모스",
      team_role_idx: 1,
    },
  ],
  team_award: [
    {
      championship_list_throphy_img: "URL",
      championship_list_idx: 0,
      championship_list_name: "2025 KFPL 끝물 토너먼트",
      championship_list_start_date: "2025-04-25",
      championship_list_end_date: "2025-05-10",
      championship_list_color: "#9B11E",
    },
  ],
  team_history: [
    {
      championship_list_idx: 0,
      championship_list_name: "2025 KFPL 끝물 토너먼트",
      championship_list_start_date: "2025-04-25",
      championship_list_end_date: "2025-05-10",
      championship_list_color: "#9B11E",
    },
    {
      championship_list_idx: 0,
      championship_list_name: "2024 KFPL S4 토너먼트",
      championship_list_start_date: "2024-10-11",
      championship_list_end_date: "2025-10-30",
      championship_list_color: "#ffff00",
    },
  ],
};

import Trophy from "./ui/Trophy";

const Team = () => {
  return (
    <main className="flex flex-col w-[80%]">
      <div className="flex justify-center">
        <img className="w-[100%] h-[200px] bg-blue " />
      </div>
      <div className="flex w-[100%] py-4">
        {TEAMPAGE_INFO.team_award.map((item) => (
          <Trophy item={item} />
        ))}
      </div>
      <div></div>
    </main>
  );
};

export default Team;
