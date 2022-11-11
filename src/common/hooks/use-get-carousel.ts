import { Campaign } from "@/components/CampaignCard";
import { useQuery } from "@tanstack/react-query";
import { services } from "../services/services";

export const useGetCampaignsCarousel = () => {
  const featuredCampaigns = useQuery(
    ["campaignsFeatured"],
    () => {
      return services.getAllCampaignsFeatured();
    },
    {
      select: (data: any): { data: Campaign[] } => data,
    },
  );
  return featuredCampaigns;
};
