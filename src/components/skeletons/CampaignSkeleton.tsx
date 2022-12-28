import { StyledCampaignListWrapper } from "@/modules/Campaigns/CampaignList";
import {
  Box,
  Center,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import React from "react";
type CampaignSkeletonListProps = {
  count?: number;
};

export default function CampaignSkeletonList(props: CampaignSkeletonListProps) {
  const { count = 6 } = props;
  return (
    <StyledCampaignListWrapper>
      {Array.from({ length: count }).map((_, index) => {
        return <MemoizedCampaignSkeleton key={index} />;
      })}
    </StyledCampaignListWrapper>
  );
}

const CampaignSkeleton = () => {
  return (
    <Box
      w={"full"}
      maxW={"332px"}
      px="6"
      pb={"10"}
      pt={"6"}
      boxShadow="lg"
      bg="white"
      borderRadius={"lg"}
    >
      <Skeleton height="120px" borderRadius={"lg"}></Skeleton>
      <Center>
        <SkeletonCircle mb={2} mt={-8} size={"16"} />
      </Center>
      <SkeletonText mt="4" noOfLines={4} spacing="3" />
    </Box>
  );
};

const MemoizedCampaignSkeleton = React.memo(CampaignSkeleton);
