import { useParams } from "react-router-dom";
import React from "react";

const useParamInteger = (key: string): number => {
  const params = useParams();

  return React.useMemo(() => {
    const val = params[key];
    if (!val) return 0;
    const num = parseInt(val, 10);
    return Number.isNaN(num) ? 0 : num;
  }, [key, params]);
};

export default useParamInteger;
