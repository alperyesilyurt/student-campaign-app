import { useGetAllCampaigns } from "@/common/hooks/use-get-campaigns";
import CampaignCard from "@/components/CampaignCard";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

export default function Campaigns() {
  const { t } = useTranslation();
  const campaigns = useGetAllCampaigns();

  return (
    <div>
      {campaigns.isFetched ? (
        <CampaignsList campaigns={campaigns} />
      ) : (
        <h5>{t("loading")}</h5>
      )}
    </div>
  );
}
const StyledListWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

type CampaignListProps = {
  campaigns: ReturnType<typeof useGetAllCampaigns>;
};

const CampaignsList = (props: CampaignListProps) => {
  const { campaigns } = props;
  return (
    <StyledListWrapper>
      {campaigns.data?.data?.map((campaign, index) => {
        return (
          <CampaignCard
            campaign={campaign}
            key={campaign.company.name + index}
          />
        );
      })}
    </StyledListWrapper>
  );
};
