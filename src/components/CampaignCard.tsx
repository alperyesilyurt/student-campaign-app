import React from "react";
import styled from "styled-components";
import Button from "./styled/button/Button";
import { fontWeights, boxSizes, fontFamilies } from "./styled/constants";

export type Campaign = {
  name?: string;
  description?: string;
  campaignHeroImage: string;
  campaignImages?: string[];
  company: { name: string; logo: string };
  validUntil: string;
};

type Props = {
  campaign: Campaign;
};
const CampaignCardWrapper = styled.div`
  font-family: ${fontFamilies.font3}, sans-serif;
  background-color: rgba(255, 255, 255, 1);
  padding: 22px;
  max-width: 332px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;

`;

const CampaignCardIndex = styled.div`
  background-color: rgba(255, 255, 255, 1);
  max-width: 239px;
  margin-top: -30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function CampaignCard(props: Props) {
  const { campaign } = props;

  return (
    <CampaignCardWrapper>
      <img width={288} src={campaign.campaignHeroImage} />
      <CampaignCardIndex>
        <img width={239} height={90} src={campaign.company.logo} />
        <h3>{campaign.company.name}</h3>
        <p>{campaign.description}</p>
        <Button
          type="primary"
          outlined
          fontWeight={fontWeights.bold}
          boxSize={boxSizes.xlarge}
        >
          Use
        </Button>
      </CampaignCardIndex>
    </CampaignCardWrapper>
  );
}

export default CampaignCard;
