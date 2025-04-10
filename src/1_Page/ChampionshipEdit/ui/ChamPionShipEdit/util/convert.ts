export const convertToChampionshipForm = (
  championshipEndData: ChampionshipEndData,
  championshipInfo: ChampionshipInfo
): ChampionshipFormValues => {
  // 변환 로직
  return {
    championship_list_name: championshipInfo.championship_list_name,
    championship_type_idx: championshipInfo.championship_type_idx,
    championship_trophy_img: null as unknown as File, // TODO: 이미지 파일 변환 로직 추가
    championship_list_color: championshipInfo.championship_list_color,
    championship_list_description:
      championshipInfo.championship_list_description,

    championship_award: championshipEndData.awards.map((award) => {
      return {
        // AwardForm 타입에 맞춰서 필요한 필드 매핑
        championship_award_idx: award.championship_award_idx,
        championship_award_name: award.championship_award_name,
        championship_award_throphy_image:
          award.championship_award_throphy_image,
        file: null as unknown as File, // TODO: Award image file 변환 로직 추가
      };
    }),

    participation_team_idxs: championshipEndData.teams.map(
      (team) => team.team_list_idx
    ),
    team_all_success: false, // 필요하다면 로직 추가

    championship_list_start_date: championshipInfo.championship_list_start_date,
    championship_list_end_date: championshipInfo.championship_list_end_date,
  };
};
