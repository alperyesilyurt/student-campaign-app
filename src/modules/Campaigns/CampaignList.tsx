import { useGetAllCampaigns } from "@/common/hooks/campaigns";
import CampaignCard from "@/components/PageSpecific/Campaign/CampaignCard";
import CampaignSkeletonList from "@/components/skeletons/CampaignSkeleton";
import styled from "styled-components";

type CampaignListProps = {
  campaigns: ReturnType<typeof useGetAllCampaigns>;
};

export const StyledCampaignListWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  gap: 1.6rem 0px;
  justify-content: space-between;
`;

const CampaignsList = (props: CampaignListProps) => {
  const { campaigns } = props;
  if (campaigns.isLoading || campaigns.isError) {
    return <CampaignSkeletonList />;
  }
  return (
    <StyledCampaignListWrapper>
      {campaigns.data.map((campaign, index) => {
        return (
          <CampaignCard
            campaign={campaign}
            key={campaign?.company?.name + index}
          />
        );
      })}
    </StyledCampaignListWrapper>
  );
};

export default CampaignsList;
