type UseChangeEmblemProps = {
  setCommunityInfo: React.Dispatch<React.SetStateAction<Community>>;
};
type ChangeEmblemProps = {
  emblem: File | null;
  communityIdx: number;
};

type UseChangeBannerProps = {
  setCommunityInfo: React.Dispatch<React.SetStateAction<Community>>;
};
type ChangeBannerProps = {
  banner: File | null;
  communityIdx: number;
};
