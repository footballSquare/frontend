import { useFetchData } from "../../4_Shared/util/apiUtil";

const usePutProfileImage = (): [
  putProfileImage: (file: File | null) => Promise<number | undefined>,
  serverState: unknown,
  loading: boolean
] => {
  const [serverState, request, loading] = useFetchData();

  const putProfileImage = async (file: File | null) => {
    const endPoint = "/account/profileimage";
    let payload: FormData | null = null;

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      payload = formData;
    }

    return request("PUT", endPoint, payload, true);
  };

  return [putProfileImage, serverState, loading];
};

export default usePutProfileImage;
