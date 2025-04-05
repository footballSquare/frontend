import useGetRepeatShortTeam from "../../../../../../../../../3_Entity/Team/useGetRepeatShortTeam";
import useGetRepeatTeam from "../../../../../../../../../3_Entity/Team/useGetRepeatTeam";

const useGetRepeat = (isShort: boolean): UseGetRepeatReturn => {
  // isShort 값에 따라 다른 필드 사용
  const formKey = isShort ? "team_list_short_name" : "team_list_name";
  const repeatFormKey = isShort
    ? "short_team_repeat_checked"
    : "team_repeat_checked";

  const [isRepeatShort, shortLoading, getRepeatShortTeam] =
    useGetRepeatShortTeam();
  const [isRepeatTeam, teamLoading, getRepeatTeam] = useGetRepeatTeam();
  // 훅 동적 적용
  const isRepeat = isShort ? isRepeatShort : isRepeatTeam;
  const loading = isShort ? shortLoading : teamLoading;
  const getRepeatEvent = isShort ? getRepeatShortTeam : getRepeatTeam;

  return { isRepeat, loading, getRepeatEvent, formKey, repeatFormKey };
};

export default useGetRepeat;
