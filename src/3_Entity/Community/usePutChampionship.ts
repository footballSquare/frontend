import { useFetchData } from "../../4_Shared/util/apiUtil";

const usePutChampionship = (
  communityIdx: number
): [
  putChampionship: (formData: FormData) => void,
  serverState: Record<string, unknown> | null
] => {
  const [serverState, request] = useFetchData();

  const putChampionship = (formData: FormData) => {
    request("POST", `/community/${communityIdx}/championship`, formData, true);
  };

  return [putChampionship, serverState];
};

export default usePutChampionship;
