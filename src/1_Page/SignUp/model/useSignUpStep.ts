import React from "react";
import { useCookies } from "react-cookie";
import { useAuthStore } from "../../../4_Shared/lib/useMyInfo";

const useSignUpStep = (): [
  number,
  React.Dispatch<React.SetStateAction<number>>
] => {
  const [step, setStep] = React.useState<number>(1);
  const [cookies] = useCookies();
  const { playerStatus } = useAuthStore();

  React.useEffect(() => {
    if (playerStatus === "pending" || cookies.access_token_temporary) {
      setStep(2);
    }
  }, [playerStatus, cookies.access_token_temporary]);

  return [step, setStep];
};

export default useSignUpStep;
