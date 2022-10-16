import React from "react";
import styled from "styled-components";

type Campaign = {
  name?: String;
  description?: String;
  campaignHeroImage: string;
  campaignImages?: String[];
  company: { name: String; logo: String };
  validUntil: string;
};

type Props = {
  campaign: Campaign;
};
const CampaignCardWrapper = styled.div`
  background-color: #00000013;
  padding: 0.6rem 0.4rem;
  border-radius: 0.25rem;
  display: flex;
  gap: 20px;
`;

function CampaignCard(props: Props) {
  const { campaign } = props;

  return (
      <CampaignCardWrapper>
        <img width={200} src={campaign.campaignHeroImage} />
        <div>
          <h3>{campaign.company.name}</h3>
          <p>{campaign.validUntil}</p>
        </div>
      </CampaignCardWrapper>
  );
}

export default CampaignCard;
