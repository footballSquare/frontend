import React from "react";

const useSignInPersist = (): [
  singInPersist: boolean,
  toggleSignInPersist: () => void
] => {
  const [signInPersist, setSignInPersist] = React.useState<boolean>(false);
  const toggleSignInPersist = () => {
    setSignInPersist((prev) => !prev);
  };
  return [signInPersist, toggleSignInPersist];
};

export default useSignInPersist;
