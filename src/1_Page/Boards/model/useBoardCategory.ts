import React from "react";

const useBoardCategory = (): [
  boardCategory: 0 | 1 | 2,
  boardCategoryHandler: (props: SetBoardCategoryProps) => void
] => {
  const [boardCategory, setBoardCategory] = React.useState<0 | 1 | 2>(0);
  // 0: Free
  // 1: Community
  // 2: Team

  const boardCategoryHandler = (props: SetBoardCategoryProps) => {
    const { category } = props;
    setBoardCategory(category);
  };

  return [boardCategory, boardCategoryHandler];
};

export default useBoardCategory;
