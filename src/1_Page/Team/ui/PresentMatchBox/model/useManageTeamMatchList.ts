import React from "react";
const useManageTeamMatchList = (): [
  MatchInfo[],
  (matchInfo: MatchInfo) => void
] => {
  const [displayMatchList, setDisplayMatchList] = React.useState<MatchInfo[]>(
    []
  );

  const handleAddSetDIsplayMatchList = (matchInfo: MatchInfo) => {
    setDisplayMatchList((prev) => [...prev, matchInfo]);
  };

  return [displayMatchList, handleAddSetDIsplayMatchList];
};
export default useManageTeamMatchList;
