import React from "react";
const useToggleState = (
  initialValue: boolean = false
): [boolean, () => void] => {
  const [state, setState] = React.useState(initialValue);

  const toggle = () => {
    setState((prev) => !prev);
  };

  return [state, toggle];
};
export default useToggleState;
