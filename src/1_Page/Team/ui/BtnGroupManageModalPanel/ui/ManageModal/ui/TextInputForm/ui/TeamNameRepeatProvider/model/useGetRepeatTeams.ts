import { useFormContext, useWatch } from "react-hook-form";
import useGetRepeatTeam from "../../../../../../../../../../../3_Entity/Team/useGetRepeatTeam";
import useGetRepeatShortTeam from "../../../../../../../../../../../3_Entity/Team/useGetRepeatShortTeam";
import React from "react";

const useGetRepeatTeams = (isShort: boolean): [() => Promise<void>] => {
  const label = isShort ? "팀 약칭" : "팀 이름";
  const registerType = isShort ? "team_list_short_name" : "team_list_name";
  const registerTypeRepeat = isShort
    ? "team_list_short_name_repeat"
    : "team_list_name_repeat";

  const [getRepeatTeam] = useGetRepeatTeam();
  const [getRepeatShortTeam] = useGetRepeatShortTeam();
  const checkedNamesRef = React.useRef<string[]>([]);

  const getRepeat = isShort ? getRepeatShortTeam : getRepeatTeam;

  const { trigger, getValues, setError, clearErrors, setValue } =
    useFormContext<TeamCreateFormValues>();

  const watchName = useWatch({ name: registerType });
  // input 의 값이 변할때마다 트리거
  React.useEffect(() => {
    if (!watchName) return;

    const alreadyChecked = checkedNamesRef.current.includes(watchName);
    const repeatState = getValues(registerTypeRepeat); // true = need check, false = checked

    // 이미 확인된 이름인 경우
    if (alreadyChecked) {
      if (repeatState) {
        setValue(registerTypeRepeat, false, {
          shouldValidate: true,
          shouldDirty: true,
        });
        clearErrors(registerTypeRepeat);
      }
      return;
    }

    // 미확인 이름인 경우
    if (!repeatState) {
      setValue(registerTypeRepeat, true, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
    setError(registerTypeRepeat, {
      type: "manual",
      message: `${label} 중복확인이 필요합니다.`,
    });
  }, [watchName]);

  const handleTeamNameCheck = async () => {
    const name = getValues(registerType);
    const isValid = await trigger(registerType);
    if (!isValid) {
      return;
    }
    const status = await getRepeat(name);
    if (status === 200) {
      setValue(registerTypeRepeat, false, {
        shouldValidate: true,
        shouldDirty: true,
      });
      clearErrors(registerTypeRepeat);
      checkedNamesRef.current.push(name);
    } else {
      setError(registerTypeRepeat, {
        type: "manual",
        message: `이미 존재하는 ${label} 입니다.`,
      });
    }
  };
  return [handleTeamNameCheck];
};
export default useGetRepeatTeams;
