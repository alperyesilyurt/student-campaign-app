import { useTranslation } from "react-i18next";
import "./index.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
  useGetAllCampaigns,
  useGetAllCategories,
  useGetFeaturedCampaigns,
} from "@/common/hooks/campaigns";
import { Box, Button, Flex, Skeleton } from "@chakra-ui/react";
import { DefaultLayout } from "@/layouts";
import CampaignCarouselList from "./CampaignCarouselList";
import CampaignsList from "./CampaignList";

export default function Campaigns() {
  const { t } = useTranslation();
  const campaigns = useGetAllCampaigns();
  const featuredCampaigns = useGetFeaturedCampaigns();
  const categories = useGetAllCategories();

  return (
    <DefaultLayout>
      <div>
        <CampaignCarouselList featuredCampaigns={featuredCampaigns} />
        <div className="campaign-container">
          <CategoryList categories={categories} />
          <CampaignsList campaigns={campaigns} />
        </div>
      </div>
    </DefaultLayout>
  );
}

type CategoryListProps = {
  categories: ReturnType<typeof useGetAllCategories>;
};
const CategoryList = (props: CategoryListProps) => {
  const { t } = useTranslation();
  const { categories } = props;
  if (categories.isLoading || categories.isError) {
    return (
      <Flex justify={"center"} mb={8} gap={6}>
        <Skeleton fadeDuration={4} height="20px">
          Category 1
        </Skeleton>
        <Skeleton fadeDuration={4} height="20px">
          Category 2
        </Skeleton>
        <Skeleton fadeDuration={4} height="20px">
          Category 3
        </Skeleton>
        <Skeleton fadeDuration={4} height="20px">
          Category 4
        </Skeleton>
      </Flex>
    );
  }
  return (
    <Box my={4}>
      <Flex justifyContent={"center"} gap={2}>
        <Button variant={"solid"}>All</Button>
        {categories.data?.data?.map((category) => {
          return (
            <Box key={category._id}>
              <Button variant={"ghost"}>{category.name}</Button>
            </Box>
          );
        })}
      </Flex>
    </Box>
  );
};
