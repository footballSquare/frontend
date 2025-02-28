import React from "react";
import { useInView } from "react-intersection-observer";

const useInfiniteScrollPaging = (
  setPage: React.Dispatch<React.SetStateAction<number>>,
  loading: boolean,
  hasMoreContent: boolean
): [(node?: Element | null) => void] => {
  const { ref, inView } = useInView({
    threshold: 0,
  });

  React.useEffect(() => {
    if (inView && !loading && hasMoreContent) {
      setPage((prev) => prev + 1);
    }
  }, [inView, loading, hasMoreContent, setPage]);

  return [ref];
};

export default useInfiniteScrollPaging;
