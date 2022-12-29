import { useQuery } from "@tanstack/react-query";
import { services } from "@/common/services/services";
import { Category } from "@/store/features/campaigns/campaign.interface";

export const useGetAllCategories = () => {
  const getAllCategories = useQuery(["categories"], () => {
    return services.getAllCampaignCategories();
  });

  return getAllCategories;
};
