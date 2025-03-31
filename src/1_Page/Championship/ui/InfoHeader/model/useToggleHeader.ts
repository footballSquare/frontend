import React from "react";

const useToggleHeader = (): [boolean, () => void] => {
  const [isHeaderCollapsed, setIsHeaderCollapsed] =
    React.useState<boolean>(false);
  const toggleHeader = () => setIsHeaderCollapsed(!isHeaderCollapsed);

  return [isHeaderCollapsed, toggleHeader];
};
export default useToggleHeader;
