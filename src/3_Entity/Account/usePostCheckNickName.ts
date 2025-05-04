import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const usePostCheckNickName = (): [
  boolean,
  (props: PostCheckNickNameProps) => void
] => {
  const [serverState, request, loading] = useFetchData();
  const [isValid, setIsValid] = React.useState<boolean>(false);

  const postCheckNickName = (props: PostCheckNickNameProps) => {
    const { nickname } = props;
    request("POST", `/account/check/nickname`, { nickname }, false);
  };

  React.useEffect(() => {
    if (!loading && serverState) {
      switch (serverState.status) {
        case 200:
          setIsValid(true);
          alert("사용 가능한 닉네임 입니다!");
          break;
        default:
          setIsValid(false);
          alert("다른 이름으로 시도해주세요.");
      }
    }
  }, [loading, serverState]);

  return [isValid, postCheckNickName];
};

export default usePostCheckNickName;
