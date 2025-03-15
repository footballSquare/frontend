import axios from "axios";
import React from "react";

export const useFetch = (): [
  Record<string, unknown> | null,
  (mockdata: object) => Promise<void>,
  boolean
] => {
  const [serverState, setServerState] = React.useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  const request = async (mockdata: object) => {
    try {
      setLoading(true);
      // API 호출
      const response = await axios({
        method: '',
        url: '',
        params: {},
        headers: {
          Authorization: ''
        }
      })
      console.log(response.data, response.status)
      setServerState({ ...mockdata });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return [serverState, request, loading];
};
