import { useFetchData } from "../../4_Shared/util/apiUtil";

const useGetRepeatTeam = (): [
  (teamName: string) => Promise<number | undefined>
] => {
  const [, request] = useFetchData();

  const getRepeatTeam = async (teamName: string) => {
    const endPoint = `/team/check_name/${teamName}`;
    return request("GET", endPoint, null, true);
  };

  return [getRepeatTeam];
};

export default useGetRepeatTeam;
