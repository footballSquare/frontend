import { useParams, useNavigate } from "react-router-dom";
import React from "react";

const useValidParamInteger = (idxKey: string): [number] => {
  const params = useParams();
  const navigate = useNavigate();

  const rawValue = params[idxKey]; // 동적으로 키 접근

  const parsedIdx = React.useMemo(() => {
    const num = Number(rawValue);
    if (!Number.isInteger(num)) {
      alert("잘못된 접근");
      navigate(-1);
    }

    return num;
  }, [rawValue, navigate]);

  return [parsedIdx];
};

export default useValidParamInteger;
