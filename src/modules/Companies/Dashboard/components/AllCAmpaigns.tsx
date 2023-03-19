import { useGetAllCategories } from "@/common/hooks/campaigns";
import { useGetMyAllCampaigns } from "@/common/hooks/campaigns/use-get-my-campaigns";
import { CategoryList } from "@/modules/Campaigns";
import AdminCampaignCard from "@/modules/Dashboard/AdminCampaignCard";
import {
  Flex,
  Grid,
  useColorModeValue,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";
import { useState } from "react";

type Props = {};

function AllCAmpaigns({}: Props) {
  const [categoryId, setCategoryId] = useState(() => "all");
  const [pageParam, setPageParam] = useState(0);
  const campaigns = useGetMyAllCampaigns({ category: categoryId, pageParam });
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.500", "white");

  const filterCatefories = (categoryID: string) => {
    setCategoryId(categoryID);
    campaigns.refetch();
  };

  const categories = useGetAllCategories();

  return (
    <Flex direction="column">
      <Flex
        mt="45px"
        mb="20px"
        justifyContent="space-between"
        direction={{ base: "column", md: "row" }}
        align={{ base: "start", md: "center" }}
      >
        <Text color={textColor} fontSize="2xl" ms="24px" fontWeight="700">
          Bütün Kampanyalar
        </Text>
      </Flex>
      <Flex
        align="center"
        me="20px"
        ms={{ base: "24px", md: "0px" }}
        mt={{ base: "20px", md: "0px" }}
      >
        <CategoryList
          categories={categories}
          handleCategoryClick={filterCatefories}
        />
      </Flex>
      <SimpleGrid columns={{ base: 1, md: 3 }} gap="20px">
        {campaigns.isSuccess &&
          campaigns?.data?.map((campaign) => (
            <AdminCampaignCard
              key={campaign._id}
              campaignHeroImage={campaign.campaignHeroImage}
              company={campaign.company}
              _id={campaign._id}
              name={campaign.name}
              validUntil={campaign.validUntil}
              description={campaign.description}
            />
          ))}
      </SimpleGrid>
    </Flex>
  );
}

export default AllCAmpaigns;
