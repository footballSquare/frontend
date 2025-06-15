// 증거 이미지 관련 유틸리티 함수들

// 타입 정의 (필요한 경우)
type EvidenceImagePlayerItem = {
  match_match_idx: number;
  player_list_idx: number;
  player_list_nickname: string;
  match_player_stats_evidence_img: string;
};

type EvidenceImageTeamItem = {
  match_match_idx: number;
  team_list_idx: number;
  match_team_stats_evidence_img: string;
};

/**
 * championshipMatchIdx를 이용해서 해당 매치에 대한 선수 증거 이미지 리스트를 필터링
 * @param evidenceImage 전체 증거 이미지 데이터
 * @param championshipMatchIdx 대상 매치 인덱스
 * @returns 해당 매치의 선수 증거 이미지 리스트
 */
export const getPlayerEvidenceListByMatch = (
  evidenceImage: EvidenceImage,
  championshipMatchIdx: number
): EvidenceImagePlayerItem[] => {
  if (!evidenceImage.player_evidence || evidenceImage.championship_match_idx !== championshipMatchIdx) {
    return [];
  }

  return evidenceImage.player_evidence.filter(
    (player) => player.match_match_idx === evidenceImage.first_match_idx || 
                player.match_match_idx === evidenceImage.second_match_idx
  );
};

/**
 * championshipMatchIdx를 이용해서 해당 매치에 대한 팀 증거 이미지 리스트를 필터링
 * @param evidenceImage 전체 증거 이미지 데이터
 * @param championshipMatchIdx 대상 매치 인덱스
 * @returns 해당 매치의 팀 증거 이미지 리스트
 */
export const getTeamEvidenceListByMatch = (
  evidenceImage: EvidenceImage,
  championshipMatchIdx: number
): {
  first_team_evidence: EvidenceImageTeamItem[];
  second_team_evidence: EvidenceImageTeamItem[];
} => {
  if (!evidenceImage || evidenceImage.championship_match_idx !== championshipMatchIdx) {
    return {
      first_team_evidence: [],
      second_team_evidence: []
    };
  }

  return {
    first_team_evidence: evidenceImage.first_team_evidence || [],
    second_team_evidence: evidenceImage.second_team_evidence || []
  };
};

/**
 * 특정 팀의 증거 이미지 리스트를 가져오기
 * @param evidenceImage 전체 증거 이미지 데이터
 * @param teamListIdx 팀 인덱스
 * @param isFirstTeam 첫 번째 팀인지 여부
 * @returns 해당 팀의 증거 이미지 리스트
 */
export const getTeamEvidenceByTeamIdx = (
  evidenceImage: EvidenceImage,
  teamListIdx: number,
  isFirstTeam: boolean
): {
  match_match_idx: number;
  team_list_idx: number;
  match_team_stats_evidence_img: string;
}[] => {
  if (!evidenceImage) return [];

  const teamEvidence = isFirstTeam 
    ? evidenceImage.first_team_evidence 
    : evidenceImage.second_team_evidence;

  return teamEvidence?.filter(
    (evidence) => evidence.team_list_idx === teamListIdx
  ) || [];
};

/**
 * 특정 선수의 증거 이미지 리스트를 가져오기
 * @param evidenceImage 전체 증거 이미지 데이터
 * @param playerListIdx 선수 인덱스
 * @returns 해당 선수의 증거 이미지 리스트
 */
export const getPlayerEvidenceByPlayerIdx = (
  evidenceImage: EvidenceImage,
  playerListIdx: number
): {
  match_match_idx: number;
  player_list_idx: number;
  player_list_nickname: string;
  match_player_stats_evidence_img: string;
}[] => {
  if (!evidenceImage.player_evidence) return [];

  return evidenceImage.player_evidence.filter(
    (evidence) => evidence.player_list_idx === playerListIdx
  );
};

/**
 * 매치별로 그룹화된 선수 증거 이미지를 가져오기
 * @param evidenceImage 전체 증거 이미지 데이터
 * @param championshipMatchIdx 대상 매치 인덱스
 * @returns 매치별로 그룹화된 선수 증거 이미지
 */
export const getGroupedPlayerEvidenceByMatch = (
  evidenceImage: EvidenceImage,
  championshipMatchIdx: number
): {
  firstMatchPlayers: {
    match_match_idx: number;
    player_list_idx: number;
    player_list_nickname: string;
    match_player_stats_evidence_img: string;
  }[];
  secondMatchPlayers: {
    match_match_idx: number;
    player_list_idx: number;
    player_list_nickname: string;
    match_player_stats_evidence_img: string;
  }[];
} => {
  if (!evidenceImage.player_evidence || evidenceImage.championship_match_idx !== championshipMatchIdx) {
    return {
      firstMatchPlayers: [],
      secondMatchPlayers: []
    };
  }

  const firstMatchPlayers = evidenceImage.player_evidence.filter(
    (player) => player.match_match_idx === evidenceImage.first_match_idx
  );

  const secondMatchPlayers = evidenceImage.player_evidence.filter(
    (player) => player.match_match_idx === evidenceImage.second_match_idx
  );

  return {
    firstMatchPlayers,
    secondMatchPlayers
  };
};
