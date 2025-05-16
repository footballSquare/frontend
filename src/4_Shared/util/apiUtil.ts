import axios, { AxiosError } from "axios";
import React from "react";
import { useCookies } from "react-cookie";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const useFetchData = (): [
  Record<string, unknown> | null,
  (
    method: string,
    endpoint: string,
    body: Record<string, unknown> | null | FormData,
    authorization: boolean
  ) => Promise<void>,
  boolean
] => {
  const [serverState, setServerState] = React.useState<Record<
    string,
    unknown
  > | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [cookies, setCookie] = useCookies(["access_token"]);

  const axiosInstance = axios.create({
    withCredentials: true, // httpOnly 쿠키 사용 시 필요
  });

  // 응답 인터셉터
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      if (error.response?.status === 401) {
        try {
          const refreshResponse = await axios.get(
            `${SERVER_URL}/account/accesstoken`,
            { withCredentials: true}
          );

          const newAccessToken = refreshResponse.data.access_token;
          console.log(newAccessToken);
          const options = { path: "/", maxAge: 86400 };
          setCookie("access_token", newAccessToken, options); // access_token을 쿠키에 저장

          if (error.config) {
            error.config.headers.Authorization = `${newAccessToken}`;
            return axios(error.config);
          }
        } catch (refreshError) {
          console.error("토큰 재발급 실패", refreshError);
          // window.location.href = "/login"; // 재로그인 유도
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );

  const request = React.useCallback(
    async (
      method: string,
      endpoint: string,
      body: Record<string, unknown> | null | FormData,
      authorization: boolean = false
    ) => {
      try {
        setLoading(true);

        // API 호출
        const response = await axiosInstance({
          method: method,
          url: `${SERVER_URL}${endpoint}`,
          params: {},
          headers:
            authorization && cookies.access_token
              ? {
                  Authorization: `${cookies.access_token}`,
                }
              : undefined,
          data: body ?? undefined,
        });

        setServerState({ ...response.data, status: response.status });
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          const { status, data } = error.response ?? {};
          console.log("endpoint", endpoint);
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
