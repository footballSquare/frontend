import usePostCreateChampionshipMatch from "../../../../../../../../../3_Entity/Championship/usePostCreateChampionshipMatch";
import useParamInteger from "../../../../../../../../../4_Shared/model/useParamInteger";

const usePostCreateChampionshipMatchHandler = (
  props: UseManageCreateChampionshipMatchProps
) => {
  const { handleToggleModal } = props;

  const championshipIdx = useParamInteger("championshipIdx");

  const [postCreateChampionshipMatch] =
    usePostCreateChampionshipMatch(championshipIdx);

  const handlePostCreateChampionshipMatch = async (
    data: CreateChampionMatchFormValues
  ) => {
    const formData = {
      first_team_idx: data.teams[0],
      second_team_idx: data.teams[1],
      match_match_start_time: `${data.matchDate} ${data.startTime}:00`,
    };

    const status = await postCreateChampionshipMatch(formData);
    handleToggleModal();
    switch (status) {
      case 200:
        break;
      default:
        console.error("Failed to create championship match");
        break;
    }
  };
  return { handlePostCreateChampionshipMatch };
};

export default usePostCreateChampionshipMatchHandler;
