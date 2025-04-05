import { useFetchData } from "../../4_Shared/util/apiUtil";

const usePutProfileImage = (): [
  putProfileImage: (file: File | null) => void,
  serverState: unknown,
  loading: boolean
] => {
  const [serverState, request, loading] = useFetchData();

  const putProfileImage = (file: File | null) => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    const endPoint = "/account/profileimage ";
    request("PUT", endPoint, formData, true);
  };

  return [putProfileImage, serverState, loading];
};

export default usePutProfileImage;
