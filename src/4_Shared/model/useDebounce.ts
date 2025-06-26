import { useRef, useCallback } from "react";

const useDebounce = (fn: () => void, delay = 500) => {
  const timerRef = useRef<number>();

  return useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(fn, delay);
  }, [fn, delay]);
};

export default useDebounce;
