import React from "react";

const useActiveTab = (): UseActiveTab => {
  const [activeTab, setActiveTab] = React.useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return {
    activeTab,
    handleTabClick,
  };
};
export default useActiveTab;
