import React from "react";

export const useFetch = (): [
  unknown,
  (mockdata: any) => Promise<void>,
  boolean
] => {
  const [serverState, setServerState] = React.useState<unknown>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  const request = async (mockdata: any) => {
    try {
      setLoading(true);
      // API 호출
      setServerState({ ...mockdata });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return [serverState, request, loading];
};
