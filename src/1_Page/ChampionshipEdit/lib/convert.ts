export const convertToAPIChampionship = (
  formDataInput: ChampionshipFormValues
): FormData => {
  // formDataInput에서 필드를 분리합니다.
  const {
    championship_award,
    championship_trophy_img,
    championship_list_name,
    championship_list_description,
    championship_list_color,
    championship_list_start_date,
    championship_list_end_date,
    participation_team_idxs,
    championship_type_idx,
  } = formDataInput;

  // 각각의 award의 파일과 트로피 이미지를 배열에 담습니다.
  const awardFileList = championship_award.map((award) => award.files);
  const files = [championship_trophy_img, ...awardFileList];

  // 새로운 FormData 객체를 생성
  const formData = new FormData();

  console.log("files", files);
  // 파일들을 append: 백엔드가 "file" 키로 여러 파일을 받도록 구성되어 있다면
  files.forEach((file) => {
    formData.append("files", file);
  });

  // 텍스트/숫자/날짜 필드들도 FormData에 추가
  formData.append("championship_type_idx", String(championship_type_idx));
  formData.append("championship_list_name", championship_list_name);
  formData.append(
    "championship_list_description",
    championship_list_description
  );
  formData.append("championship_list_color", championship_list_color);
  formData.append("championship_list_start_date", championship_list_start_date);
  formData.append("championship_list_end_date", championship_list_end_date);

  // 배열 형태의 데이터는 보통 JSON 문자열로 변환해서 전달합니다.
  // 대신 각각의 요소를 별도로 append합니다.
  participation_team_idxs.forEach((idx) => {
    formData.append("participation_team_idxs", String(idx));
  });

  // 각 award의 이름 배열을 별도로 append합니다.
  championship_award.forEach((award) => {
    formData.append("championship_award_name", award.championship_award_name);
  });

  // 만약 나머지(rest) 데이터가 있을 경우에도 원하는대로 추가할 수 있습니다.
  // 예: Object.entries(rest).forEach(([key, value]) => formData.append(key, String(value)));

  return formData;
};

export const convertToChampionshipForm = (
  championshipInfo: ChampionshipInfo,
  championshipEndData: ChampionshipEndData
): ChampionshipFormValues => {
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
        files: null as unknown as File, // TODO: Award image file 변환 로직 추가
      };
    }),

    participation_team_idxs: championshipEndData.teams.map(
      (team) => team.team_list_idx
    ),
    team_all_success: false, // 필요하다면 추가 로직 추가

    championship_list_start_date: championshipInfo.championship_list_start_date,
    championship_list_end_date: championshipInfo.championship_list_end_date,
  };
};
