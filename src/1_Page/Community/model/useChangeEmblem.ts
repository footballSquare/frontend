import usePutCommunityEmblem from "../../../3_Entity/Community/usePutCommunityEmblem";

const useChangeEmblem = (
  props: UseChangeEmblemProps
): [(props: ChangeEmblemProps) => void] => {
  const { setCommunityInfo } = props;
  const [putCommunityEmblem] = usePutCommunityEmblem();

  const changeEmblem = (props: ChangeEmblemProps) => {
    const { emblem, communityIdx } = props;
    if (emblem) {
      if (emblem.size > 1 * 1024 * 1024) {
        alert("엠블럼 파일의 크기는 1MB를 넘을 수 없습니다.");
        return;
      }
      setCommunityInfo((prev) => ({
        ...prev,
        community_list_emblem: URL.createObjectURL(emblem),
      }));
      putCommunityEmblem({
        communityIdx,
        emblem,
      });
    }
  };

  return [changeEmblem];
};

export default useChangeEmblem;
