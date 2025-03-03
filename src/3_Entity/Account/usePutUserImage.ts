import { useFetch } from "../../4_Shared/util/apiUtil";

const usePutUserImage = ({
  userIdx,
  onFail = () => {},
}: {
  userIdx: number;
  onFail?: () => void;
}): [
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
    console.log("전송된 이미지 파일:", profileImg);
  };

  return [putEvent, serverState, loading];
};

export default usePutUserImage;
