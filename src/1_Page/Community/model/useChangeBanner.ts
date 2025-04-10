import usePutCommunityBanner from "../../../3_Entity/Community/usePutCommunityBanner";

const useChangeBanner = (
  props: UseChangeBannerProps
): [(props: ChangeBannerProps) => void] => {
  const { setCommunityInfo } = props;
  const [putCommunityBanner] = usePutCommunityBanner();

  const changeBanner = (props: ChangeBannerProps) => {
    const { banner, communityIdx } = props;

    if (banner) {
      if (banner.size > 1 * 1024 * 1024) {
        alert("배너 파일의 크기는 1MB를 넘을 수 없습니다.");
        return;
      }
      setCommunityInfo((prev) => ({
        ...prev,
        community_list_banner: URL.createObjectURL(banner),
      }));
      putCommunityBanner({
        communityIdx,
        banner,
      });
    }
  };

  return [changeBanner];
};

export default useChangeBanner;
