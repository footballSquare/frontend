import React from "react";

const useIsExpanded = (props: UseIsExpandedProps): UseIsExpandedReturn => {
  const { isFloating } = props;
  const [isExpanded, setIsExpanded] = React.useState(false);

  React.useEffect(() => {
    if (isFloating) {
      setIsExpanded(true);
    }
  }, [isFloating]);

  return {
    isExpanded,
    toggleExpanded: () => setIsExpanded((prev) => !prev),
  };
};
export default useIsExpanded;
