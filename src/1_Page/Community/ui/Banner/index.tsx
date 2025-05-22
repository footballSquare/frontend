import upIcon from "../../../../4_Shared/assets/svg/up.svg";
import downIcon from "../../../../4_Shared/assets/svg/down.svg";
import useBanner from "./model/useBanner";

const Banner = (props: BannerProps) => {
  const { bannerImg } = props;
  const [isBannerOpen, toggleBanner] = useBanner();

  return (
    <div
      className={`relative w-full bg-blue-500 flex items-center justify-center text-2xl font-semibold rounded-lg shadow-md`}
    >
      {isBannerOpen && (
        <img
          src={bannerImg}
          alt="배너"
          className={`${isBannerOpen ? "min-h-[544px]" : "h-0"}`}
        />
      )}
      <button
        onClick={toggleBanner}
        className={`w-fit rounded-full absolute ${
          isBannerOpen ? "bottom-[-42px]" : "bottom-[-8px]"
        } left-0 flex items-center justify-center bg-white`}
      >
        <img src={isBannerOpen ? upIcon : downIcon} alt="배너_버튼" />
      </button>
    </div>
  );
};

export default Banner;
