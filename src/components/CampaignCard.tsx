import React from "react";
import styled from "styled-components";
import Button from "./styled/button/Button";
import { fontWeights, boxSizes, fontFamilies } from "./styled/constants";
import * as colors from "./styled/colors";

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
  font-family: ${fontFamilies.poppins}, sans-serif;
  background-color: ${colors.white};
  padding: 22px;
  max-width: 332px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CampaignCardIndex = styled.div`
  background-color: ${colors.white};
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
          variant="primary"
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
