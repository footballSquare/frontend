import { useFetchData } from "../../4_Shared/util/apiUtil";

const useGetRepeatShortTeam = (): [
  (teamShortName: string) => Promise<number | undefined>
] => {
  const [, request] = useFetchData();

  const getRepeatShortTeam = async (teamShortName: string) => {
    const endPoint = `/team/check_short_name/${teamShortName}`;
    return await request("GET", endPoint, null, true);
  };

  return [getRepeatShortTeam];
};

export default useGetRepeatShortTeam;
