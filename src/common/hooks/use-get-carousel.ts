import { CarouselCampaign } from "@/components/CampaignCarousel";
import { useQuery } from "@tanstack/react-query";
import { services } from "../services/services";

/* TODO: fix type error */
export const useGetCampaignsCarousel = () => {
  const {
    isLoading: isCampaignsCarouselLoading,
    data: campaignCarouselResponseData,
    isFetched: isCampaignsCarouselFetched,
  } = useQuery(
    ["campaignsFeatured"],
    () => services.getAllCampaignsFeatured(),
    {
      select: (data: { data: CarouselCampaign[]; message: string }) =>
        data?.data,
    }
  );
  return {
    isCampaignsCarouselLoading,
    campaignCarouselResponseData,
    isCampaignsCarouselFetched,
  };
};
