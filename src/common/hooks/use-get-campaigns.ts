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
    }
  );

  return getAllCampaigns;
};

export const useGetSingleCampaign = ({ id }: { id: string }) => {
  const getSingleCampaigns = useQuery(
    ["getSingleCampaign"],
    () => {
      return services.getSingleCampaignDetail({ id: id });
    },
    {
      select: (data: any): { data: Campaign } => data,
    }
  );

  return getSingleCampaigns;
};
// export const useGetSingleCampaign = ({ id }: { id: string }) => {
//   const {
//     isLoading: isSingleCampaignsLoading,
//     error,
//     data: singleCampaignResponseData,
//     isFetched: isSingleCampaignFetched,
//   } = useQuery(
//     ["getSingleCampaign"],
//     () => services.getSingleCampaignDetail({ id: id }),
//     {
//       select: (data: { data: Campaign; message: string }) => data?.data,
//     }
//   );
//   return {
//     isSingleCampaignsLoading,
//     error,
//     singleCampaignResponseData,
//     isSingleCampaignFetched,
//   };
// };
