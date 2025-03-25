import trophy from "../assets/img/trophy.jpg";

export const mockChampionshipInfo = {
  championship_data: {
    championship_type: 1,
    championship_list_name: "2024 S4 KFPL 리그",
    championship_list_description:
      "2024년 S4 리그입니다. 한 팀은 15명의 로스터를 가질 수 있습니다.",
    match_type_idx: 0,
    championship_list_throphy_img: trophy,
    championship_list_start_date: "2024-10-20",
    championship_list_end_date: "2024-11-10",
    common_status_idx: 3,
    championship_list_color: "#fff111",
    winner_team_idx: null,
    winner_team_name: null,
    winner_team_emblem: null,
    winner_team_color: null,
  },
};

export const mockChampionshipTeamInfo = {
  participation_team: [
    {
      team_list_idx: 1,
      team_list_name: "FC 서울",
      team_list_short_name: "SEO",
      team_list_color: "#C91A09",
      team_list_emblem: trophy,
    },
    {
      team_list_idx: 2,
      team_list_name: "전북 현대 모터스",
      team_list_short_name: "JEO",
      team_list_color: "#007A33",
      team_list_emblem: trophy,
    },
    {
      team_list_idx: 3,
      team_list_name: "울산 현대",
      team_list_short_name: "ULS",
      team_list_color: "#004A99",
      team_list_emblem: trophy,
    },
    {
      team_list_idx: 4,
      team_list_name: "포항 스틸러스",
      team_list_short_name: "POH",
      team_list_color: "#AD1C1C",
      team_list_emblem: trophy,
    },
    {
      team_list_idx: 5,
      team_list_name: "제주 유나이티드",
      team_list_short_name: "JEJ",
      team_list_color: "#FF5A00",
      team_list_emblem: trophy,
    },
    {
      team_list_idx: 6,
      team_list_name: "수원 삼성 블루윙즈",
      team_list_short_name: "SSB",
      team_list_color: "#0033A0",
      team_list_emblem: trophy,
    },
    {
      team_list_idx: 7,
      team_list_name: "인천 유나이티드",
      team_list_short_name: "INC",
      team_list_color: "#101C54",
      team_list_emblem: trophy,
    },
    {
      team_list_idx: 8,
      team_list_name: "강원 FC",
      team_list_short_name: "GAN",
      team_list_color: "#F15A22",
      team_list_emblem: trophy,
    },
    {
      team_list_idx: 9,
      team_list_name: "대구 FC",
      team_list_short_name: "DAE",
      team_list_color: "#0F85C1",
      team_list_emblem: trophy,
    },
    {
      team_list_idx: 10,
      team_list_name: "광주 FC",
      team_list_short_name: "GWA",
      team_list_color: "#E4002B",
      team_list_emblem: trophy,
    },
    {
      team_list_idx: 11,
      team_list_name: "대전 하나 시티즌",
      team_list_short_name: "DAJ",
      team_list_color: "#B70E0E",
      team_list_emblem: trophy,
    },
    {
      team_list_idx: 12,
      team_list_name: "수원 FC",
      team_list_short_name: "SUW",
      team_list_color: "#A30B37",
      team_list_emblem: trophy,
    },
    {
      team_list_idx: 13,
      team_list_name: "성남 FC",
      team_list_short_name: "SEONG",
      team_list_color: "#111111",
      team_list_emblem: trophy,
    },
    {
      team_list_idx: 14,
      team_list_name: "경남 FC",
      team_list_short_name: "GYE",
      team_list_color: "#C8102E",
      team_list_emblem: trophy,
    },
    {
      team_list_idx: 15,
      team_list_name: "부산 아이파크",
      team_list_short_name: "BUS",
      team_list_color: "#E41E24",
      team_list_emblem: trophy,
    },
    {
      team_list_idx: 16,
      team_list_name: "충남 아산 FC",
      team_list_short_name: "ASA",
      team_list_color: "#004EA2",
      team_list_emblem: trophy,
    },
  ],
};

export const mockChampionshipEvidence = {
  evidance_img: [
    {
      championship_match_idx: 1,
      first_match_idx: 26,
      second_match_idx: 27,
      first_team_evidence: [
        {
          match_match_idx: 26,
          team_list_idx: 2,
          match_team_stats_evidence_img: "test_url",
        },
      ],
      second_team_evidence: [
        {
          match_match_idx: 27,
          team_list_idx: 11,
          match_team_stats_evidence_img:
            "https://footballsquare-evidance-img.s3.ap-northeast-2.amazonaws.com/evidance/1741943325416-___________.PNG",
        },
      ],
      player_evidence: [
        {
          match_match_idx: 26,
          player_list_idx: 1,
          player_list_nickname: "TestUser",
          match_player_stats_evidence_img: "test_url",
        },
        {
          match_match_idx: 27,
          player_list_idx: 10,
          player_list_nickname: "차범근",
          match_player_stats_evidence_img: "테스트중 입니다.",
        },
      ],
    },
  ],
};

export const mockPlayerStats = {
  result: [
    {
      championship_match_idx: 2,
      championship_list_idx: 5,
      match_match_idx: 29,
      player_list_idx: 2,
      match_player_stats_idx: 13,
      player_list_nickname: "김지단",
      match_player_stats_goal: 30,
      match_player_stats_assist: 2,
      match_player_stats_successrate_pass: 18,
      match_player_stats_successrate_dribble: 7,
      match_player_stats_successrate_tackle: 5,
      match_player_stats_possession: 10,
      match_player_stats_evidence_img: trophy,
      match_player_stats_standing_tackle: 3,
      match_player_stats_sliding_tackle: 2,
      match_player_stats_cutting: 1,
      match_player_stats_saved: 0,
      match_player_stats_successrate_saved: 0,
    },
    {
      championship_match_idx: 2,
      championship_list_idx: 5,
      match_match_idx: 30,
      player_list_idx: 4,
      match_player_stats_idx: 16,
      player_list_nickname: "운영진1번입니다.",
      match_player_stats_goal: 0,
      match_player_stats_assist: 2,
      match_player_stats_successrate_pass: 18,
      match_player_stats_successrate_dribble: 7,
      match_player_stats_successrate_tackle: 5,
      match_player_stats_possession: 10,
      match_player_stats_evidence_img: trophy,
      match_player_stats_standing_tackle: 3,
      match_player_stats_sliding_tackle: 2,
      match_player_stats_cutting: 1,
      match_player_stats_saved: 0,
      match_player_stats_successrate_saved: 0,
    },
  ],
};
