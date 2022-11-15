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
import CampaignSkeletonList from "@/components/skeletons/CampaignSkeleton";
import {
  useGetAllCampaigns,
  useGetFeaturedCampaigns,
} from "@/common/hooks/campaigns";
import { Box, Flex, Skeleton } from "@chakra-ui/react";
import { DefaultLayout } from "@/layouts";

export default function Campaigns() {
  const { t } = useTranslation();
  const campaigns = useGetAllCampaigns();
  const featuredCampaigns = useGetFeaturedCampaigns();

  return (
    <DefaultLayout>
      <div>
        <CampaignCarouselList featuredCampaigns={featuredCampaigns} />
        <div className="campaign-container">
          <CampaignsList campaigns={campaigns} />
        </div>
      </div>
    </DefaultLayout>
  );
}
export const StyledCampaignListWrapper = styled.div`
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
  if (campaigns.isLoading || campaigns.isError) {
    return <CampaignSkeletonList />;
  }
  return (
    <StyledCampaignListWrapper>
      {campaigns.data?.data?.map((campaign, index) => {
        return (
          <CampaignCard
            campaign={campaign}
            key={campaign.company.name + index}
          />
        );
      })}
    </StyledCampaignListWrapper>
  );
};

type CampaignCarouselListProps = {
  featuredCampaigns: ReturnType<typeof useGetAllCampaigns>;
};
const CampaignCarouselList = (props: CampaignCarouselListProps) => {
  const { t } = useTranslation();
  const { featuredCampaigns } = props;

  if (featuredCampaigns.isLoading || featuredCampaigns.isError) {
    return (
      <Slider {...SettingsCarousel}>
        {Array.from({ length: 3 }).map((_, index) => {
          return (
            <Box py={2} pt={4} key={index}>
              <Skeleton
                ml={"30px"}
                width={"sm"}
                height={"sm"}
                borderRadius={"lg"}
              ></Skeleton>
            </Box>
          );
        })}
      </Slider>
    );
  }
  return (
    <Slider {...SettingsCarousel}>
      {featuredCampaigns.isFetched ? (
        featuredCampaigns.data?.data?.map((campaignCarousel) => {
          return (
            <CampaignCarousel
              campaignCarousel={campaignCarousel}
              key={campaignCarousel._id}
            />
          );
        })
      ) : (
        <h5>{t("loading")}</h5>
      )}
    </Slider>
  );
};
