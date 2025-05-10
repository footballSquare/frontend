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
  const awardFileList = championship_award.map((award) => award.file);
  const files = [championship_trophy_img, ...awardFileList];

  // 새로운 FormData 객체를 생성
  const formData = new FormData();

  // 파일들을 append: 백엔드가 "file" 키로 여러 파일을 받도록 구성되어 있다면
  files.forEach((file) => {
    formData.append("file", file);
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

  participation_team_idxs.forEach((idx) => {
    formData.append("participation_team_idxs", String(idx));
  });

  championship_award.forEach((award) => {
    formData.append("championship_award_name", award.championship_award_name);
  });

  return formData;
};
