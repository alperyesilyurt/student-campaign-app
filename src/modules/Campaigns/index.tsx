import { useGetCampaigns } from "@/common/hooks/use-get-campaigns";
import { useGetCampaignsCarousel } from "@/common/hooks/use-get-carousel";
import CampaignCard from "@/components/CampaignCard";
import { useTranslation } from "react-i18next";
import "./index.css";
import { AuthBackground } from "@/components/styled/constants";
import CampaignCarousel from "@/components/CampaignCarousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SettingsCarousel } from "@/components/styled/settings/Carousel";

export default function Campaigns() {
  const { t } = useTranslation();
  const {
    campaignResponseData,
    error,
    isCampaignsFetched,
    isCampaignsLoading,
  } = useGetCampaigns();

  const {
    campaignCarouselResponseData,
    isCampaignsCarouselFetched,
    isCampaignsCarouselLoading,
  } = useGetCampaignsCarousel();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2.5,
    slidesToScroll: 2.5,
  };

  return (
    <div>
      <h1>{t("companiesCarousel")}</h1>
      <h2>{isCampaignsCarouselFetched ? "fetched" : "NOT fetched"}</h2>
      {/*  change  campaignResponseData and CarouselCampaign in CampaignCarousel after post images*/}
      <Slider {...SettingsCarousel}>
        {isCampaignsCarouselFetched ? (
          campaignResponseData?.map((campaignCarousel) => {
            return (
              <div className="carousel-container">
                <CampaignCarousel campaignCarousel={campaignCarousel} />
              </div>
            );
          })
        ) : (
          <h5>{t("loading")}</h5>
        )}
      </Slider>

      <h1>{t("companies")}</h1>
      <h2>{isCampaignsFetched ? "fetched" : "NOT fetched"}</h2>

      <div className="campaign-container">
        {isCampaignsFetched ? (
          campaignResponseData?.map((campaign, index) => {
            return (
              <CampaignCard
                campaign={campaign}
                key={campaign.company.name + index}
              />
            );
          })
        ) : (
          <h5>{t("loading")}</h5>
        )}
      </div>
    </div>
  );
}
