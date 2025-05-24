import React from "react";

const useBanner = (): [isBannerOpen: boolean, toggleBanner: () => void] => {
  const [isBannerOpen, setIsBannerOpen] = React.useState<boolean>(true);
  const toggleBanner = () => {
    setIsBannerOpen(!isBannerOpen);
  };

  return [isBannerOpen, toggleBanner];
};

export default useBanner;
