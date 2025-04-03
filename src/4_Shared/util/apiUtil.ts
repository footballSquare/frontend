import axios, { AxiosError } from "axios";
import React from "react";
import { useCookies } from "react-cookie";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const useFetch = (): [
  Record<string, unknown> | null,
  (mockdata: object) => Promise<void>,
  boolean
] => {
  const [serverState, setServerState] = React.useState<Record<
    string,
    unknown
  > | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  const request = async (mockdata: object) => {
    try {
      setLoading(true);
      // API 호출
      const response = await axios({
        method: "",
        url: "",
        params: {},
        headers: {
          Authorization: "",
        },
      });
      if (response === null) {
        console.log("response is 0");
      }
      setServerState({ ...mockdata });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return [serverState, request, loading];
};

export const useFetchData = (): [
  Record<string, unknown> | null,
  (
    method: string,
    endpoint: string,
    body: Record<string, unknown> | null,
    authorization: boolean
  ) => Promise<void>,
  boolean
] => {
  const [serverState, setServerState] = React.useState<Record<
    string,
    unknown
  > | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [cookies] = useCookies(["access_token"]);

  const request = React.useCallback(
    async (
      method: string,
      endpoint: string,
      body: Record<string, unknown> | null,
      authorization: boolean = false
    ) => {
      console.log("request", endpoint);
      try {
        setLoading(true);
        // API 호출
        const response = await axios({
          method: method,
          url: `${SERVER_URL}${endpoint}`,
          params: {},
          headers: authorization
            ? {
                Authorization: `${cookies.access_token}`,
              }
            : undefined,
          data: body ?? undefined,
        });

        setServerState({ ...response.data, status: response.status });
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          console.log("error", error.response?.data.message);
          const { status, data } = error.response ?? {};
          setServerState({ status });
          if (status === 500) {
            console.error("Internal Server Error:", status, data.message);
            alert("알 수 없는 오류.");
          }
        }
      } finally {
        setLoading(false);
      }
    },
    [cookies.access_token]
  );

  return [serverState, request, loading];
};
