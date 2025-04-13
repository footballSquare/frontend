import React from "react";
import { useCookies } from "react-cookie";

const useSignUpStep = (): [
  number,
  React.Dispatch<React.SetStateAction<number>>
] => {
  const [step, setStep] = React.useState<number>(1);
  const [cookies] = useCookies();

  React.useEffect(() => {
    if (cookies.access_token) {
      setStep(2);
    }
  }, [cookies.access_token]);

  return [step, setStep];
};

export default useSignUpStep;
