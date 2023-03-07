import { Campaign } from "@/components/PageSpecific/Campaign/CampaignCard";
import { useQuery } from "@tanstack/react-query";
import { services } from "@/common/services/services";

export const useGetFeaturedCampaigns = () => {
  const featuredCampaigns = useQuery(["campaignsFeatured"], () => {
    return services.getFeaturedCampaigns();
  });
  return featuredCampaigns;
};
