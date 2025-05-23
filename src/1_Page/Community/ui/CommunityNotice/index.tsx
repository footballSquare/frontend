import { useForm } from "react-hook-form";
import usePutCommunityNotice from "../../../../3_Entity/Community/usePutCommunityNotice";
import useNotice from "./model/useNotice";

const CommunityNotice = (props: CommunityNoticeProps) => {
  const { content, modifyMode, communityIdx } = props;
  const [notice, setNotice] = useNotice({ content });
  const { register, handleSubmit } = useForm();
  const [putCommunityNotice] = usePutCommunityNotice();

  return (
    <div className="flex flex-col items-center justify-center mt-2 w-full">
      <h3 className="text-sm mb-2">커뮤니티 공지</h3>
      <div className="w-full">
        {modifyMode ? (
          <form
            className="flex flex-col items-center justify-center gap-2 w-full"
            onSubmit={handleSubmit((data) => {
              putCommunityNotice({
                communityIdx: Number(communityIdx),
                notice: data.notice,
              });
              setNotice(data.notice);
            })}
          >
            <input
              {...register("notice", { required: true })}
              defaultValue={notice}
              className="border border-grass text-grass rounded-lg p-2"
            />
            <button
              type="submit"
              className="text-sm p-2 bg-gray hover:bg-grass text-black rounded-lg w-full"
            >
              공지 수정하기
            </button>
          </form>
        ) : (
          <div className="border rounded-lg text-center w-full border-gray p-4">
            {notice}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityNotice;
