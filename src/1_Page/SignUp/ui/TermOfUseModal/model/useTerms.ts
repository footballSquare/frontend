import React from "react";
import TERMS from "../constant/terms";

const useTerms = (): [
  isAllChecked: boolean,
  checkList: { [key: string]: boolean },
  handleCheck: (key: string) => void,
  handleAllCheck: () => void,
  showDetail: string | null,
  setShowDetail: React.Dispatch<React.SetStateAction<string | null>>
] => {
  const [checkList, setCheckList] = React.useState<{ [key: string]: boolean }>(
    {}
  );
  const [showDetail, setShowDetail] = React.useState<string | null>(null);

  const isAllChecked = TERMS.every((term) => checkList[term.key]);

  const handleCheck = (key: string) => {
    setCheckList((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  const handleAllCheck = () => {
    const newChecked: { [key: string]: boolean } = {};
    TERMS.forEach((term) => {
      newChecked[term.key] = !isAllChecked;
    });
    setCheckList(newChecked);
  };

  return [
    isAllChecked,
    checkList,
    handleCheck,
    handleAllCheck,
    showDetail,
    setShowDetail,
  ];
};

export default useTerms;
