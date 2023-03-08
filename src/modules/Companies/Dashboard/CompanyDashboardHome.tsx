import { Box, Flex, Grid } from "@chakra-ui/react";
import React from "react";
import AllCAmpaigns from "./components/AllCAmpaigns";
import TopUsedCampaigns from "./components/TopUsedCampaigns";
import CustomCard from "@/components/card/Card";
import { tableColumnsTopCreators } from "@/common/constants/dummyCampaignData";
import { CompanyBanner } from "@/components/card/CompanyBanner";

type Props = {};

function CompanyDashboardHome({}: Props) {
  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      <Grid
        mb="20px"
        gridTemplateColumns={{
          xl: "repeat(3, 1fr)",
          "2xl": "1fr 0.46fr",
        }}
        gap={{ base: "20px", xl: "20px" }}
        display={{ base: "block", xl: "grid" }}
      >
        <Flex
          flexDirection="column"
          gridArea={{ xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2" }}
        >
          <CompanyBanner />
          <AllCAmpaigns />
        </Flex>
        <Flex
          flexDirection="column"
          gridArea={{ xl: "1 / 3 / 2 / 4", "2xl": "1 / 2 / 2 / 3" }}
        >
          <CustomCard px="0px" mb="20px">
            <TopUsedCampaigns tableData={tableColumnsTopCreators} />
          </CustomCard>
        </Flex>
      </Grid>
    </Box>
  );
}

export default CompanyDashboardHome;
