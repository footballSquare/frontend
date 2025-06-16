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

type UseCommunityIdxProps = {
  currentCommunityIdx: number;
};

type UseCommunityStaffInfoProps = {
  communityIdx: number;
};

type SetCommunityTabProps = {
  newTab: "championship" | "boards" | "teamList";
};
