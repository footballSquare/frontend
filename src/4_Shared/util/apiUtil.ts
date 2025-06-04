import axios, { AxiosError, AxiosRequestConfig } from "axios";
import React from "react";
import { useCookies } from "react-cookie";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

// ✅ 모든 요청이 공유하는 전역 변수
let isRefreshing = false;
let failedQueue: ((token: string) => void)[] = [];

const processQueue = (token: string) => {
  failedQueue.forEach((cb) => cb(token));
  failedQueue = [];
};

export const useFetchData = (): [
  serverState: Record<string, unknown> | null,
  request: (
    method: string,
    endpoint: string,
    body: Record<string, unknown> | null | FormData,
    authorization: boolean,
    useTemporalToken?: boolean
  ) => Promise<number | undefined>,
  loading: boolean
] => {
  const [serverState, setServerState] = React.useState<Record<
    string,
    unknown
  > | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [cookies, setCookie] = useCookies([
    "access_token",
    "access_token_temporary",
  ]);
  const axiosInstance = React.useMemo(
    () =>
      axios.create({
        withCredentials: true, // httpOnly 쿠키 사용 시 필요
      }),
    []
  );

  // 응답 인터셉터
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as AxiosRequestConfig;
      console.log("isRefreshing: ", isRefreshing);
      if (error.response?.status === 401) {
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

        isRefreshing = true;

        try {
          const refreshResponse = await axios.get(
            `${SERVER_URL}/account/accesstoken`,
            { withCredentials: true }
          );
          const newAccessToken = refreshResponse.data.data.access_token;
          const options = { path: "/", maxAge: 86400 };
          setCookie("access_token", newAccessToken, options); // access_token을 쿠키에 저장

          processQueue(newAccessToken);
          // ✅ originalRequest 헤더도 새 토큰으로 업데이트
          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: newAccessToken,
          };

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
      authorization: boolean = false,
      useTemporalToken?: boolean
    ): Promise<number | undefined> => {
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
                  Authorization: `${
                    useTemporalToken
                      ? cookies.access_token_temporary
                      : cookies.access_token
                  }`,
                }
              : undefined,
          data: body ?? undefined,
        });

        setServerState({ ...response.data, status: response.status });
        return response.status;
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          const { status } = error.response ?? {};
          console.log("network error");
          setServerState({ status, message: error.response?.data?.message });
        }
      } finally {
        setLoading(false);
      }
    },
    [cookies.access_token, cookies.access_token_temporary, axiosInstance]
  );

  return [serverState, request, loading];
};
