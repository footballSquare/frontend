type AwardField = {
  championship_award_name: string;
  file?: File;
};
type AwartTabProps = {
  fields: FieldArrayWithId<
    ChampionshipFormValues,
    "championship_award_name",
    "id"
  >[];
  append: UseFieldArrayAppend<
    ChampionshipFormValues,
    "championship_award_name"
  >;
  remove: UseFieldArrayRemove;
};
