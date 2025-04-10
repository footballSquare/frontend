import { useFetchData } from "../../4_Shared/util/apiUtil";

const usePostChampionship = (
  communityIdx: number
): [
  postChampionship: (formData: FormData) => void,
  serverState: Record<string, unknown> | null
] => {
  const [serverState, request] = useFetchData();

  const postChampionship = (formData: FormData) => {
    request("POST", `/community/${communityIdx}/championship`, formData, true);
  };

  return [postChampionship, serverState];
};

export default usePostChampionship;
