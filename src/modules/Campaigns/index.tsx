import { useGetAllCampaigns } from "@/common/hooks/use-get-campaigns";
import { useGetCampaignsCarousel } from "@/common/hooks/use-get-carousel";
import CampaignCard from "@/components/CampaignCard";
import { useTranslation } from "react-i18next";
import "./index.css";
import CampaignCarousel from "@/components/CampaignCarousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SettingsCarousel } from "@/components/styled/settings/Carousel";
import styled from "styled-components";

export default function Campaigns() {
  const { t } = useTranslation();
  const campaigns = useGetAllCampaigns();
  const featuredCampaigns = useGetCampaignsCarousel();

  return (
    <div>
      {/*  change  campaignResponseData and CarouselCampaign in CampaignCarousel after post images*/}
      <Slider {...SettingsCarousel}>
        {featuredCampaigns.isFetched ? (
          featuredCampaigns.data?.data?.map((campaignCarousel) => {
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

      <div className="campaign-container">
        {campaigns.isFetched ? (
          <CampaignsList campaigns={campaigns} />
        ) : (
          <h5>{t("loading")}</h5>
        )}
      </div>
    </div>
  );
}
const StyledListWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  gap: 1.6rem 0px;
  justify-content: space-between;
`;

type CampaignListProps = {
  campaigns: ReturnType<typeof useGetAllCampaigns>;
};

const CampaignsList = (props: CampaignListProps) => {
  const { campaigns } = props;
  return (
    <StyledListWrapper>
      {campaigns.data?.data?.map((campaign, index) => {
        return (
          <CampaignCard
            campaign={campaign}
            key={campaign.company.name + index}
          />
        );
      })}
    </StyledListWrapper>
  );
};
