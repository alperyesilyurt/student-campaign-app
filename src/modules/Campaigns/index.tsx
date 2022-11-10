import { useGetAllCampaigns } from "@/common/hooks/use-get-campaigns";
import CampaignCard from "@/components/CampaignCard";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

export default function Campaigns() {
  const { t } = useTranslation();
  const campaigns = useGetAllCampaigns();

  return (
    <div>
      <h1>{t("companies")}</h1>
      <h2>{campaigns.isFetched ? "fetched" : "NOT fetched"}</h2>
      {campaigns.isFetched ? <CampaignsList /> : <h5>{t("loading")}</h5>}
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
const CampaignsList = () => {
  const campaigns = useGetAllCampaigns();

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
