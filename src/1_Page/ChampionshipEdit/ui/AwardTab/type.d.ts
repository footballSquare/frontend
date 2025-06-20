type AwartTabProps = {
  fields: FieldArrayWithId<
    ChampionshipFormValues,
    "championship_award",
    "id"
  >[];
  append: UseFieldArrayAppend<ChampionshipFormValues, "championship_award">;
  remove: UseFieldArrayRemove;
};
