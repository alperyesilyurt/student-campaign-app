import { Campaign } from "@/components/CampaignCard";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { services } from "@/common/services/services";
import { queryStringBuild } from "@/common/utils";

type Params = {
  category?: string;
  pageParam: number;
};
const EACH_PAGE = 24;

export const useGetAllCampaigns = (params: Params) => {
  const { pageParam, category } = params;
  const qs = queryStringBuild({
    limit: String(EACH_PAGE),
    skip: String(EACH_PAGE * Math.max(0, pageParam)),
    category,
  });

  console.log({
    limit: String(EACH_PAGE),
    skip: String(EACH_PAGE * Math.max(pageParam - 1, 0)),
  });
  const getAllCampaigns = useQuery({
    queryKey: ["campaigns/" + category, pageParam],
    queryFn: () => {
      return services.getAllCampaigns(qs);
    },
  });

  return getAllCampaigns;
};
