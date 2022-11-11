import { Campaign } from "@/components/CampaignCard";
import { useQuery } from "@tanstack/react-query";
import { services } from "@/common/services/services";

export const useGetFeaturedCampaigns = () => {
  const featuredCampaigns = useQuery(
    ["campaignsFeatured"],
    () => {
      return services.getFeaturedCampaigns();
    },
    {
      select: (data: any): { data: Campaign[] } => data,
    },
  );
  return featuredCampaigns;
};
