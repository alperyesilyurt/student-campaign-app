import { useQuery } from "@tanstack/react-query";
import { services } from "@/common/services/services";

type Category = {
  _id: string;
  name: string;
  description: string;
  subCategories?: string[];
};

export const useGetAllCategories = () => {
  const getAllCategories = useQuery(
    ["categories"],
    () => {
      return services.getAllCampaignCategories();
    },
    {
      select: (data: any): { data: Category[] } => data,
    },
  );

  return getAllCategories;
};
