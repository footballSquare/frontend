export const mockChampionshipDetail = {
  championship_match: {
    championship_match_idx: 1,
    championship_list_idx: 5,
    match_info: {
      match_match_start_time: "2025-03-19T10:00:00.000Z",
      match_match_duration: {
        minutes: 30,
      },
    },
    first_team: {
      team_list_idx: 2,
      team_formation_idx: 0, // 4-3-3 포메이션 (index 0)
      stats: {
        match_team_stats_our_score: 1,
        match_team_stats_other_score: 0,
        match_team_stats_possession: 60,
        match_team_stats_total_shot: 3,
        match_team_stats_expected_goal: 1.2,
        match_team_stats_total_pass: 99,
        match_team_stats_total_tackle: 15,
        match_team_stats_success_tackle: 8,
        match_team_stats_saved: 15,
        match_team_stats_cornerkick: 3,
        match_team_stats_freekick: 0,
        match_team_stats_penaltykick: 0,
        mom_player_idx: 2,
        mom_player_nickname: "Dani Carvajal",
      },
      player_stats: [
        {
          match_match_idx: 26,
          player_list_idx: 1,
          player_list_nickname: "Marc-André ter Stegen",
          match_player_stats_goal: 0,
          match_player_stats_assist: 0,
          match_player_stats_successrate_pass: 95,
          match_player_stats_successrate_dribble: 1,
          match_player_stats_successrate_tackle: 0,
          match_player_stats_possession: 5,
          match_player_stats_standing_tackle: 0,
          match_player_stats_sliding_tackle: 0,
          match_player_stats_cutting: 0,
          match_player_stats_saved: 4,
          match_player_stats_successrate_saved: 80,
          match_player_stats_evidence_img: "test_url",
          match_player_stats_possition: 0, // GK
        },
        {
          match_match_idx: 26,
          player_list_idx: 2,
          player_list_nickname: "Dani Carvajal",
          match_player_stats_goal: 0,
          match_player_stats_assist: 1,
          match_player_stats_successrate_pass: 85,
          match_player_stats_successrate_dribble: 5,
          match_player_stats_successrate_tackle: 7,
          match_player_stats_possession: 12,
          match_player_stats_standing_tackle: 4,
          match_player_stats_sliding_tackle: 3,
          match_player_stats_cutting: 2,
          match_player_stats_saved: 0,
          match_player_stats_successrate_saved: 0,
          match_player_stats_evidence_img: "test_url",
          match_player_stats_possition: 1, // RB
        },
        {
          match_match_idx: 26,
          player_list_idx: 3,
          player_list_nickname: "Raphaël Varane",
          match_player_stats_goal: 0,
          match_player_stats_assist: 0,
          match_player_stats_successrate_pass: 88,
          match_player_stats_successrate_dribble: 2,
          match_player_stats_successrate_tackle: 8,
          match_player_stats_possession: 8,
          match_player_stats_standing_tackle: 5,
          match_player_stats_sliding_tackle: 3,
          match_player_stats_cutting: 2,
          match_player_stats_saved: 0,
          match_player_stats_successrate_saved: 0,
          match_player_stats_evidence_img: "test_url",
          match_player_stats_possition: 2, // RCB
        },
        {
          match_match_idx: 26,
          player_list_idx: 4,
          player_list_nickname: "Virgil van Dijk",
          match_player_stats_goal: 1,
          match_player_stats_assist: 0,
          match_player_stats_successrate_pass: 85,
          match_player_stats_successrate_dribble: 3,
          match_player_stats_successrate_tackle: 8,
          match_player_stats_possession: 10,
          match_player_stats_standing_tackle: 4,
          match_player_stats_sliding_tackle: 4,
          match_player_stats_cutting: 2,
          match_player_stats_saved: 0,
          match_player_stats_successrate_saved: 0,
          match_player_stats_evidence_img: "test_url",
          match_player_stats_possition: 4, // LCB
        },
        {
          match_match_idx: 26,
          player_list_idx: 5,
          player_list_nickname: "Andrew Robertson",
          match_player_stats_goal: 0,
          match_player_stats_assist: 1,
          match_player_stats_successrate_pass: 86,
          match_player_stats_successrate_dribble: 6,
          match_player_stats_successrate_tackle: 7,
          match_player_stats_possession: 11,
          match_player_stats_standing_tackle: 3,
          match_player_stats_sliding_tackle: 3,
          match_player_stats_cutting: 1,
          match_player_stats_saved: 0,
          match_player_stats_successrate_saved: 0,
          match_player_stats_evidence_img: "test_url",
          match_player_stats_possition: 5, // LB
        },
        {
          match_match_idx: 26,
          player_list_idx: 6,
          player_list_nickname: "Toni Kroos",
          match_player_stats_goal: 0,
          match_player_stats_assist: 2,
          match_player_stats_successrate_pass: 92,
          match_player_stats_successrate_dribble: 6,
          match_player_stats_successrate_tackle: 4,
          match_player_stats_possession: 14,
          match_player_stats_standing_tackle: 2,
          match_player_stats_sliding_tackle: 2,
          match_player_stats_cutting: 1,
          match_player_stats_saved: 0,
          match_player_stats_successrate_saved: 0,
          match_player_stats_evidence_img: "test_url",
          match_player_stats_possition: 14, // RCM
        },
        {
          match_match_idx: 26,
          player_list_idx: 7,
          player_list_nickname: "Luka Modrić",
          match_player_stats_goal: 1,
          match_player_stats_assist: 1,
          match_player_stats_successrate_pass: 90,
          match_player_stats_successrate_dribble: 7,
          match_player_stats_successrate_tackle: 3,
          match_player_stats_possession: 15,
          match_player_stats_standing_tackle: 2,
          match_player_stats_sliding_tackle: 1,
          match_player_stats_cutting: 2,
          match_player_stats_saved: 0,
          match_player_stats_successrate_saved: 0,
          match_player_stats_evidence_img: "test_url",
          match_player_stats_possition: 13, // CM
        },
        {
          match_match_idx: 26,
          player_list_idx: 8,
          player_list_nickname: "Pedri",
          match_player_stats_goal: 0,
          match_player_stats_assist: 1,
          match_player_stats_successrate_pass: 88,
          match_player_stats_successrate_dribble: 6,
          match_player_stats_successrate_tackle: 4,
          match_player_stats_possession: 12,
          match_player_stats_standing_tackle: 3,
          match_player_stats_sliding_tackle: 1,
          match_player_stats_cutting: 1,
          match_player_stats_saved: 0,
          match_player_stats_successrate_saved: 0,
          match_player_stats_evidence_img: "test_url",
          match_player_stats_possition: 12, // LCM
        },
        {
          match_match_idx: 26,
          player_list_idx: 9,
          player_list_nickname: "Jadon Sancho",
          match_player_stats_goal: 1,
          match_player_stats_assist: 1,
          match_player_stats_successrate_pass: 80,
          match_player_stats_successrate_dribble: 9,
          match_player_stats_successrate_tackle: 2,
          match_player_stats_possession: 10,
          match_player_stats_standing_tackle: 1,
          match_player_stats_sliding_tackle: 1,
          match_player_stats_cutting: 1,
          match_player_stats_saved: 0,
          match_player_stats_successrate_saved: 0,
          match_player_stats_evidence_img: "test_url",
          match_player_stats_possition: 19, // RW
        },
        {
          match_match_idx: 26,
          player_list_idx: 10,
          player_list_nickname: "Erling Haaland",
          match_player_stats_goal: 2,
          match_player_stats_assist: 0,
          match_player_stats_successrate_pass: 78,
          match_player_stats_successrate_dribble: 8,
          match_player_stats_successrate_tackle: 1,
          match_player_stats_possession: 12,
          match_player_stats_standing_tackle: 1,
          match_player_stats_sliding_tackle: 0,
          match_player_stats_cutting: 0,
          match_player_stats_saved: 0,
          match_player_stats_successrate_saved: 0,
          match_player_stats_evidence_img: "test_url",
          match_player_stats_possition: 20, // ST
        },
        {
          match_match_idx: 26,
          player_list_idx: 11,
          player_list_nickname: "Kylian Mbappé",
          match_player_stats_goal: 1,
          match_player_stats_assist: 2,
          match_player_stats_successrate_pass: 85,
          match_player_stats_successrate_dribble: 10,
          match_player_stats_successrate_tackle: 1,
          match_player_stats_possession: 13,
          match_player_stats_standing_tackle: 1,
          match_player_stats_sliding_tackle: 1,
          match_player_stats_cutting: 2,
          match_player_stats_saved: 0,
          match_player_stats_successrate_saved: 0,
          match_player_stats_evidence_img: "test_url",
          match_player_stats_possition: 21, // LW
        },
      ],
    },
    second_team: {
      team_list_idx: 11,
      team_formation_idx: 0, // 4-3-3 포메이션 (index 0)
      stats: {
        match_team_stats_our_score: 3,
        match_team_stats_other_score: 1,
        match_team_stats_possession: 60,
        match_team_stats_total_shot: 3,
        match_team_stats_expected_goal: 1.2,
        match_team_stats_total_pass: 99,
        match_team_stats_total_tackle: 15,
        match_team_stats_success_tackle: 8,
        match_team_stats_saved: 15,
        match_team_stats_cornerkick: 3,
        match_team_stats_freekick: 0,
        match_team_stats_penaltykick: 0,
        mom_player_idx: 10,
        mom_player_nickname: "마누엘 노이어",
      },
      player_stats: [
        {
          match_match_idx: 27,
          player_list_idx: 10,
          player_list_nickname: "마누엘 노이어",
          match_player_stats_goal: 0,
          match_player_stats_assist: 0,
          match_player_stats_successrate_pass: 90,
          match_player_stats_successrate_dribble: 0,
          match_player_stats_successrate_tackle: 0,
          match_player_stats_possession: 5,
          match_player_stats_standing_tackle: 0,
          match_player_stats_sliding_tackle: 0,
          match_player_stats_cutting: 0,
          match_player_stats_saved: 5,
          match_player_stats_successrate_saved: 80,
          match_player_stats_evidence_img: "test_url",
          match_player_stats_possition: 0, // GK
        },
        {
          match_match_idx: 27,
          player_list_idx: 11,
          player_list_nickname: "하파엘 바란",
          match_player_stats_goal: 0,
          match_player_stats_assist: 0,
          match_player_stats_successrate_pass: 85,
          match_player_stats_successrate_dribble: 5,
          match_player_stats_successrate_tackle: 7,
          match_player_stats_possession: 12,
          match_player_stats_standing_tackle: 4,
          match_player_stats_sliding_tackle: 3,
          match_player_stats_cutting: 2,
          match_player_stats_saved: 0,
          match_player_stats_successrate_saved: 0,
          match_player_stats_evidence_img: "test_url",
          match_player_stats_possition: 2, // RCB
        },
        {
          match_match_idx: 27,
          player_list_idx: 12,
          player_list_nickname: "버질 반 다이크",
          match_player_stats_goal: 0,
          match_player_stats_assist: 1,
          match_player_stats_successrate_pass: 88,
          match_player_stats_successrate_dribble: 4,
          match_player_stats_successrate_tackle: 8,
          match_player_stats_possession: 14,
          match_player_stats_standing_tackle: 5,
          match_player_stats_sliding_tackle: 2,
          match_player_stats_cutting: 2,
          match_player_stats_saved: 0,
          match_player_stats_successrate_saved: 0,
          match_player_stats_evidence_img: "test_url",
          match_player_stats_possition: 3, // CB
        },
        {
          match_match_idx: 27,
          player_list_idx: 13,
          player_list_nickname: "마르키뉴스",
          match_player_stats_goal: 0,
          match_player_stats_assist: 0,
          match_player_stats_successrate_pass: 84,
          match_player_stats_successrate_dribble: 3,
          match_player_stats_successrate_tackle: 7,
          match_player_stats_possession: 11,
          match_player_stats_standing_tackle: 3,
          match_player_stats_sliding_tackle: 3,
          match_player_stats_cutting: 2,
          match_player_stats_saved: 0,
          match_player_stats_successrate_saved: 0,
          match_player_stats_evidence_img: "test_url",
          match_player_stats_possition: 4, // LCB
        },
        {
          match_match_idx: 27,
          player_list_idx: 14,
          player_list_nickname: "부카요 사카",
          match_player_stats_goal: 1,
          match_player_stats_assist: 1,
          match_player_stats_successrate_pass: 82,
          match_player_stats_successrate_dribble: 9,
          match_player_stats_successrate_tackle: 2,
          match_player_stats_possession: 13,
          match_player_stats_standing_tackle: 2,
          match_player_stats_sliding_tackle: 1,
          match_player_stats_cutting: 0,
          match_player_stats_saved: 0,
          match_player_stats_successrate_saved: 0,
          match_player_stats_evidence_img: "test_url",
          match_player_stats_possition: 11, // RM
        },
        {
          match_match_idx: 27,
          player_list_idx: 15,
          player_list_nickname: "일카이 귄도안",
          match_player_stats_goal: 0,
          match_player_stats_assist: 2,
          match_player_stats_successrate_pass: 90,
          match_player_stats_successrate_dribble: 6,
          match_player_stats_successrate_tackle: 4,
          match_player_stats_possession: 15,
          match_player_stats_standing_tackle: 2,
          match_player_stats_sliding_tackle: 1,
          match_player_stats_cutting: 1,
          match_player_stats_saved: 0,
          match_player_stats_successrate_saved: 0,
          match_player_stats_evidence_img: "test_url",
          match_player_stats_possition: 14, // RCM
        },
        {
          match_match_idx: 27,
          player_list_idx: 16,
          player_list_nickname: "루카 모드리치",
          match_player_stats_goal: 0,
          match_player_stats_assist: 2,
          match_player_stats_successrate_pass: 92,
          match_player_stats_successrate_dribble: 7,
          match_player_stats_successrate_tackle: 3,
          match_player_stats_possession: 18,
          match_player_stats_standing_tackle: 1,
          match_player_stats_sliding_tackle: 1,
          match_player_stats_cutting: 2,
          match_player_stats_saved: 0,
          match_player_stats_successrate_saved: 0,
          match_player_stats_evidence_img: "test_url",
          match_player_stats_possition: 13, // CM
        },
        {
          match_match_idx: 27,
          player_list_idx: 17,
          player_list_nickname: "페드리",
          match_player_stats_goal: 0,
          match_player_stats_assist: 1,
          match_player_stats_successrate_pass: 89,
          match_player_stats_successrate_dribble: 6,
          match_player_stats_successrate_tackle: 4,
          match_player_stats_possession: 14,
          match_player_stats_standing_tackle: 2,
          match_player_stats_sliding_tackle: 1,
          match_player_stats_cutting: 1,
          match_player_stats_saved: 0,
          match_player_stats_successrate_saved: 0,
          match_player_stats_evidence_img: "test_url",
          match_player_stats_possition: 12, // LCM
        },
        {
          match_match_idx: 27,
          player_list_idx: 18,
          player_list_nickname: "필 포든",
          match_player_stats_goal: 0,
          match_player_stats_assist: 1,
          match_player_stats_successrate_pass: 83,
          match_player_stats_successrate_dribble: 8,
          match_player_stats_successrate_tackle: 2,
          match_player_stats_possession: 12,
          match_player_stats_standing_tackle: 1,
          match_player_stats_sliding_tackle: 1,
          match_player_stats_cutting: 1,
          match_player_stats_saved: 0,
          match_player_stats_successrate_saved: 0,
          match_player_stats_evidence_img: "test_url",
          match_player_stats_possition: 15, // LM
        },
        {
          match_match_idx: 27,
          player_list_idx: 19,
          player_list_nickname: "엘링 홀란",
          match_player_stats_goal: 2,
          match_player_stats_assist: 0,
          match_player_stats_successrate_pass: 75,
          match_player_stats_successrate_dribble: 7,
          match_player_stats_successrate_tackle: 1,
          match_player_stats_possession: 10,
          match_player_stats_standing_tackle: 1,
          match_player_stats_sliding_tackle: 0,
          match_player_stats_cutting: 0,
          match_player_stats_saved: 0,
          match_player_stats_successrate_saved: 0,
          match_player_stats_evidence_img: "test_url",
          match_player_stats_possition: 20, // ST
        },
        {
          match_match_idx: 27,
          player_list_idx: 20,
          player_list_nickname: "리오넬 메시",
          match_player_stats_goal: 1,
          match_player_stats_assist: 1,
          match_player_stats_successrate_pass: 91,
          match_player_stats_successrate_dribble: 10,
          match_player_stats_successrate_tackle: 1,
          match_player_stats_possession: 17,
          match_player_stats_standing_tackle: 0,
          match_player_stats_sliding_tackle: 0,
          match_player_stats_cutting: 1,
          match_player_stats_saved: 0,
          match_player_stats_successrate_saved: 0,
          match_player_stats_evidence_img: "test_url",
          match_player_stats_possition: 22, // CF
        },
      ],
    },
  },
};
