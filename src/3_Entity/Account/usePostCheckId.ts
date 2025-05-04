import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const usePostCheckId = (): [boolean, (props: PostCheckIdProps) => void] => {
  const [serverState, request, loading] = useFetchData();
  const [isValid, setIsValid] = React.useState<boolean>(false);

  const postCheckId = (props: PostCheckIdProps) => {
    const { id } = props;
    request("POST", `/account/check/id`, { id }, false);
  };

  React.useEffect(() => {
    if (!loading && serverState) {
      switch (serverState.status) {
        case 200:
          setIsValid(true);
          alert("사용 가능한 아이디 입니다!");
          break;
        default:
          setIsValid(false);
          alert("다른 아이디로 시도해주세요.");
      }
    }
  }, [loading, serverState]);

  return [isValid, postCheckId];
};

export default usePostCheckId;
