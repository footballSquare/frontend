import axios from "axios";
import React from "react";

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
    body: Record<string, string> | null
  ) => Promise<void>,
  boolean
] => {
  const [serverState, setServerState] = React.useState<Record<
    string,
    unknown
  > | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  const request = async (
    method: string,
    endpoint: string,
    body: Record<string, string> | null
  ) => {
    try {
      setLoading(true);
      // API 호출
      const response = await axios({
        method: method,
        url: `${SERVER_URL}/${endpoint}`,
        params: {},
        headers: {
          Authorization: "",
        },
        data: body ? body : undefined,
      });
      console.log(response.data, response.status);
      setServerState({ ...response.data, status: response.status });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return [serverState, request, loading];
};
