import { useGetAllCampaigns } from "@/common/hooks/campaigns";
import CampaignCarousel from "@/components/PageSpecific/Campaign/CampaignCarousel";
import { Box, Button, Icon, Skeleton } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

/* Get those from chakra-ui */
const breakPoints = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
};

const carouselSettings = {
  dots: true,
  arrows: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  infinite: true,
  speed: 500,

  responsive: [
    {
      breakpoint: breakPoints.lg,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: breakPoints.md,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: breakPoints.sm,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

type CampaignCarouselListProps = {
  featuredCampaigns: ReturnType<typeof useGetAllCampaigns>;
};

const CampaignCarouselList = (props: CampaignCarouselListProps) => {
  const { t } = useTranslation();
  const { featuredCampaigns } = props;
  const carouselRef = useRef<Slider>(null);

  const handlePrevious = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  if (featuredCampaigns.isLoading || featuredCampaigns.isError) {
    return (
      <Slider {...carouselSettings}>
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
    <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative" }}>
      <Slider ref={carouselRef} {...carouselSettings}>
        {featuredCampaigns.isFetched ? (
          featuredCampaigns.data?.map((campaignCarousel) => {
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
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "flex",
          width: "100%",
          height: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button onClick={handlePrevious} variant={"ghost"} ml={-7}>
          <Icon as={FiChevronLeft} w="30px" h="30px" />
        </Button>
        <Button onClick={handleNext} variant={"ghost"} mr={-7}>
          <Icon as={FiChevronRight} w="30px" h="30px" />
        </Button>
      </div>
    </div>
  );
};

export default CampaignCarouselList;
