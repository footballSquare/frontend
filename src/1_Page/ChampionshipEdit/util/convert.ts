export const convertToAPIChampionship = (
  formData: ChampionshipFormValues
): PostChampionshipProps => {
  const { championship_award, championship_trophy_img, ...rest } = formData;

  const fileList = championship_award.map((award) => award.file);
  const file = [championship_trophy_img, ...fileList];
  const championship_award_name = championship_award.map(
    (award) => award.championship_award_name
  );

  return {
    championship_award_name,
    file,
    ...rest,
  };
};
