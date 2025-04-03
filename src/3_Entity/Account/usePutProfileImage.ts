import { useFetch } from "../../4_Shared/util/apiUtil";

const usePutProfileImage = (
  userIdx: number
): [
  putEvent: (profileImg: File | null) => void,
  serverState: unknown,
  loading: boolean
] => {
  const [serverState, request, loading] = useFetch();

  const putEvent = (profileImg: File | null) => {
    let formData = null;
    if (profileImg) {
      formData = new FormData();
      formData.append("profile_img", profileImg);
    }
    request({ userIdx, formData });
  };

  return [putEvent, serverState, loading];
};

export default usePutProfileImage;
