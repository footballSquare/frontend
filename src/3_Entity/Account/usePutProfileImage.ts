import { useFetchData } from "../../4_Shared/util/apiUtil";

const usePutProfileImage = (): [
  putProfileImage: (file: File | null) => void,
  serverState: unknown,
  loading: boolean
] => {
  const [serverState, request, loading] = useFetchData();

  const putProfileImage = (file: File | null) => {
    const endPoint = "/account/profileimage";
    let payload: FormData | null = null;

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      payload = formData;
    }

    request("PUT", endPoint, payload, true);
  };

  return [putProfileImage, serverState, loading];
};

export default usePutProfileImage;
