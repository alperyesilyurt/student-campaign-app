import { useQuery } from "@tanstack/react-query";
import { services } from "@/common/services/services";

export const useGetCampaignByID = (id: string) => {
  const getSingleCampaigns = useQuery(["getSingleCampaign"], () => {
    return services.getCampaignByID(id);
  });

  return getSingleCampaigns;
};
