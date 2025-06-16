import React from "react";

const useCommunityTab = (): [
  tab: "championship" | "boards" | "teamList",
  SetCommunityTab: (props: SetCommunityTabProps) => void
] => {
  const [tab, setTab] = React.useState<"championship" | "boards" | "teamList">(
    "championship"
  );

  const SetCommunityTab = (props: SetCommunityTabProps) => {
    const { newTab } = props;
    setTab(newTab);
  };

  return [tab, SetCommunityTab];
};

export default useCommunityTab;
