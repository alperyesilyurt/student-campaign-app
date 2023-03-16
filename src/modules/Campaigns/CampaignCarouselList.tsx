import { useGetAllCampaigns } from "@/common/hooks/campaigns";
import CampaignCarousel from "@/components/PageSpecific/Campaign/CampaignCarousel";
import { Box, Button, Icon, Skeleton } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import React, { useEffect, useState, useRef } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Pagination,
  Navigation,
  Autoplay,
  EffectFade,
} from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import swiperBg from "/swiper-background.svg";

/* Get those from chakra-ui */
const breakPoints = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
};

type CampaignCarouselListProps = {
  featuredCampaigns: ReturnType<typeof useGetAllCampaigns>;
};

SwiperCore.use([Navigation]);

const CampaignCarouselList = (props: CampaignCarouselListProps) => {
  const { t } = useTranslation();
  const { featuredCampaigns } = props;
  //SwiperCore.use([Navigation]);
  const navigationPrevRef = React.useRef<HTMLElement>(null);
  const navigationNextRef = React.useRef<HTMLElement>(null);
  //const swiperRef = useRef<typeof SwiperType>();
  //const [slideEffect, setSlideEffect] = useState<"fade" | "slide">("fade");

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const sliderBreakpoints = {
    480: {
      spaceBetween: 30,
    },
    640: {
      spaceBetween: 30,
    },
    768: {
      spaceBetween: 30,
    },
    1024: {
      spaceBetween: 40,
      slidesPerView: 3,
    },
  };

  const onBeforeInit = (Swiper: SwiperCore): void => {
    if (typeof Swiper.params.navigation !== "boolean") {
      const navigation = Swiper.params.navigation;
      navigation.prevEl = navigationPrevRef.current; //TO-DO: Type error
      navigation.nextEl = navigationNextRef.current; //TO-DO: Type error
    }
  };
  const swiperRef = React.useRef(null);
  console.log(navigationPrevRef.current);
  if (featuredCampaigns.isLoading || featuredCampaigns.isError) {
    return (
      <Swiper
        style={{ padding: "3% 3%" }}
        slidesPerView={1}
        loop={true}
        ref={swiperRef}
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 5000,
        }}
        breakpoints={sliderBreakpoints}
        modules={[Navigation, Pagination, EffectFade, Autoplay]}
      >
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
      </Swiper>
    );
  }

  return (
    <div
      style={{
        maxWidth: "100%",
        margin: "0 auto",
        position: "relative",
        backgroundImage: `url(${swiperBg})`,
        objectFit: "contain",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {!isMobile && (
        <motion.div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            display: "flex",
            width: "100%",
            height: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            zIndex: 2,
            opacity: 0,
          }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Button ref={navigationPrevRef} variant={"ghost"} ml={1}>
            <Icon as={FiChevronLeft} w="30px" h="30px" />
          </Button>
          <Button ref={navigationNextRef} variant={"ghost"} mr={1}>
            <Icon as={FiChevronRight} w="30px" h="30px" />
          </Button>
        </motion.div>
      )}
      {
        <Swiper
          style={{ padding: "3% 3%" }}
          slidesPerView={1}
          loop={true}
          navigation={{
            prevEl: navigationPrevRef.current!,
            nextEl: navigationNextRef.current!,
          }}
          onBeforeInit={onBeforeInit}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 5000,
          }}
          breakpoints={sliderBreakpoints}
          modules={[Navigation, Pagination, EffectFade, Autoplay]}
        >
          {featuredCampaigns.isFetched ? (
            featuredCampaigns.data?.map((campaignCarousel) => {
              return (
                <SwiperSlide>
                  <CampaignCarousel
                    campaignCarousel={campaignCarousel}
                    key={campaignCarousel._id}
                  />
                </SwiperSlide>
              );
            })
          ) : (
            <h5>{t("loading")}</h5>
          )}
        </Swiper>
      }
    </div>
  );
};

export default CampaignCarouselList;
