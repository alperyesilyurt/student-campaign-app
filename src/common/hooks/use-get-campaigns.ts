import { Campaign } from "@/components/CampaignCard";
import { useQuery } from "@tanstack/react-query";
import { services } from "../services/services";

export const useGetCampaigns = () => {
  const {
    isLoading: isCampaignsLoading,
    error,
    data: campaignResponseData,
    isFetched: isCampaignsFetched,
  } = useQuery(["campaigns"], () => services.getAllCampaigns(), {
    select: (data: { data: Campaign[]; message: string }) => data?.data,
  });
  return {
    isCampaignsLoading,
    error,
    campaignResponseData,
    isCampaignsFetched,
  };
};
