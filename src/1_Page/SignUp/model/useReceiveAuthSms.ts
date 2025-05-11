import React from "react";
import usePostReceiveAuthSms from "../../../3_Entity/Account/usePostReceiveAuthSms";

const useReceiveAuthSms = (): [
  boolean,
  (props: PostReceiveAuthSmsProps) => void
] => {
  const [serverState, loading, postReceiveAuthSms] = usePostReceiveAuthSms();
  const [isSmsSent, setIsSmsSent] = React.useState(false);
  React.useEffect(() => {
    if (!loading && serverState) {
      switch (serverState.status) {
        case 200:
          setIsSmsSent(true);
          break;
      }
    }
  }, [loading, serverState]);

  return [isSmsSent, postReceiveAuthSms];
};

export default useReceiveAuthSms;
