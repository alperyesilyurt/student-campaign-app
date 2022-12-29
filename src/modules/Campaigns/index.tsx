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
import { Category } from "@/store/features/campaigns/campaign.interface";
import { useState } from "react";

export default function Campaigns() {
  const [categoryId, setCategoryId] = useState(() => "all");
  const [pageParam, setPageParam] = useState(0);
  const { t } = useTranslation();
  const campaigns = useGetAllCampaigns({ category: categoryId, pageParam });

  const featuredCampaigns = useGetFeaturedCampaigns();
  const categories = useGetAllCategories();

  const filterCatefories = (categoryID: string) => {
    setCategoryId(categoryID);
    campaigns.refetch();
  };

  return (
    <DefaultLayout>
      <div>
        <CampaignCarouselList featuredCampaigns={featuredCampaigns} />
        <div className="campaign-container">
          <CategoryList
            categories={categories}
            handleCategoryClick={filterCatefories}
          />
          <CampaignsList campaigns={campaigns} />
        </div>
      </div>
    </DefaultLayout>
  );
}

type CategoryListProps = {
  categories: ReturnType<typeof useGetAllCategories>;
  handleCategoryClick: (id: string) => void;
  selectedCategory?: Category;
};
const CategoryList = (props: CategoryListProps) => {
  const { t } = useTranslation();
  const { categories } = props;

  const handleClick = (category: Category | { name: string; _id: string }) => {
    setselectedCategory(category?._id);
    props.handleCategoryClick(category._id);
  };
  const [selectedCategory, setselectedCategory] = useState(() => "all");

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
        <Button
          variant={selectedCategory === "all" ? "solid" : "ghost"}
          onClick={() => handleClick({ name: "all", _id: "all" })}
        >
          All
        </Button>
        {categories.data?.map((category) => {
          return (
            <Box key={category._id}>
              <Button
                variant={selectedCategory === category._id ? "solid" : "ghost"}
                onClick={() => handleClick(category)}
              >
                {category.name}
              </Button>
            </Box>
          );
        })}
      </Flex>
    </Box>
  );
};
