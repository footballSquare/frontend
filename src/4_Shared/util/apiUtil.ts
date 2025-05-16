import axios, { AxiosError, AxiosRequestConfig } from "axios";
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

  // 재발급 중 중복 요청 방지용 Promise 캐시
  let isRefreshing = false;
  let failedQueue: ((token: string) => void)[] = [];

  const processQueue = (token: string) => {
    failedQueue.forEach((cb) => cb(token));
    failedQueue = [];
  };

  // 응답 인터셉터
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as AxiosRequestConfig & {
        _retry?: boolean;
      };

      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise((resolve) => {
            failedQueue.push((newToken: string) => {
              originalRequest.headers = {
                ...originalRequest.headers,
                Authorization: `${newToken}`,
              };
              resolve(axiosInstance(originalRequest));
            });
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const refreshResponse = await axios.get(
            `${SERVER_URL}/account/accesstoken`,
            { withCredentials: true }
          );

          const newAccessToken = refreshResponse.data.data.access_token;
          console.log(refreshResponse);
          const options = { path: "/", maxAge: 86400 };
          setCookie("access_token", newAccessToken, options); // access_token을 쿠키에 저장

          axiosInstance.defaults.headers["Authorization"] = newAccessToken;
          processQueue(newAccessToken);
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          console.error("토큰 재발급 실패", refreshError);
          // window.location.href = "/login"; // 재로그인 유도
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
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
