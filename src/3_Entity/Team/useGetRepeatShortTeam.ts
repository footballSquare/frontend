import React from "react";
import { useFetch } from "../../4_Shared/util/apiUtil";

const useGetRepeatShortTeam = (): [boolean, boolean] => {
  const [serverState, request, loading] = useFetch();
  const [isRepeat, setIsRepeat] = React.useState<boolean>(false);

  React.useEffect(() => {
    request({ true: "true" });
  }, []);

  React.useEffect(() => {
    if (!loading && serverState && "access_list" in serverState) {
      setIsRepeat((serverState as { access_list: boolean }).access_list);
    }
  }, [loading, serverState]);

  return [isRepeat, loading];
};

export default useGetRepeatShortTeam;
