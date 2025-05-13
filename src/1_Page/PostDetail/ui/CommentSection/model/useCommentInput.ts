import React from "react";

const useCommentInput = () => {
  const [commentInput, setCommentInput] = React.useState("");

  const handleSetCommentInput = (text: string) => {
    setCommentInput(text);
  };

  return {
    commentInput,
    handleSetCommentInput,
  };
};

export default useCommentInput;
