import React from "react";
import { set } from "react-hook-form";

export const useFetch = (): [any, (mockdata: any)=>Promise<void>, boolean] => {
  const [serverState, setServerState] = React.useState(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  const request = async (mockdata: any) => {
    try {
      setLoading(true);
      // API 호출
      // const response = await fetch("API URL");
      // const data = await response.json();
      // setServerState(data);
      setServerState({...mockdata});
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return [serverState, request, loading];
};
