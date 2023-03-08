import { useGetAllCampaigns } from "@/common/hooks/campaigns";
import { CompanyBanner } from "@/components/card/CompanyBanner";
import AdminCampaignCard from "@/modules/Dashboard/AdminCampaignCard";
import {
  Flex,
  Grid,
  useColorModeValue,
  Text,
  Link,
  SimpleGrid,
} from "@chakra-ui/react";
import React, { useState } from "react";

type Props = {};

function AllCAmpaigns({}: Props) {
  const [categoryId, setCategoryId] = useState(() => "all");
  const [pageParam, setPageParam] = useState(0);
  const campaigns = useGetAllCampaigns({ category: categoryId, pageParam });
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.500", "white");

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
        <Flex
          align="center"
          me="20px"
          ms={{ base: "24px", md: "0px" }}
          mt={{ base: "20px", md: "0px" }}
        >
          <Link
            color={textColorBrand}
            fontWeight="500"
            me={{ base: "34px", md: "44px" }}
            href="#art"
          >
            Aktif
          </Link>
          <Link
            color={textColorBrand}
            fontWeight="500"
            me={{ base: "34px", md: "44px" }}
            href="#music"
          >
            Tümü
          </Link>
          <Link
            color={textColorBrand}
            fontWeight="500"
            me={{ base: "34px", md: "44px" }}
            href="#collectibles"
          >
            Eğlence
          </Link>
          <Link color={textColorBrand} fontWeight="500" href="#sports">
            Spor
          </Link>
        </Flex>
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
