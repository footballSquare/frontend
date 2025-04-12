import React from "react";

const useNotice = (
  props: UseNoticeProps
): [string, React.Dispatch<React.SetStateAction<string>>] => {
  const { content } = props;
  const [notice, setNotice] = React.useState<string>("");
  React.useEffect(() => {
    setNotice(content);
  }, [content]);

  return [notice, setNotice];
};

export default useNotice;
