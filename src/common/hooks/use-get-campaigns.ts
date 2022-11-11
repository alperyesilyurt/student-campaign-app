import { Campaign } from "@/components/CampaignCard";
import { useQuery } from "@tanstack/react-query";
import { services } from "../services/services";

export const useGetAllCampaigns = () => {
  const getAllCampaigns = useQuery(
    ["campaigns"],
    () => {
      return services.getAllCampaigns();
    },
    {
      select: (data: any): { data: Campaign[] } => data,
    },
  );

  return getAllCampaigns;
};
