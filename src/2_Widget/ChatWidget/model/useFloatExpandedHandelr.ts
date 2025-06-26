import React from "react";
import { useChatFloatingStroe } from "../../../4_Shared/zustand/useChatFloatingStroe";

const useFloatExpandedHandelr = (): UseFloatExpandedHandelrReturn => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev);
  };

  const { isFloating, toggleIsFloating } = useChatFloatingStroe();

  // ESC 키로 플로팅 모드 토글 (isFloating === true 일 때만)
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFloating) {
        toggleIsFloating();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFloating, toggleIsFloating]);

  return {
    isExpanded,
    toggleExpanded,
    isFloating,
    toggleIsFloating,
  };
};
export default useFloatExpandedHandelr;
