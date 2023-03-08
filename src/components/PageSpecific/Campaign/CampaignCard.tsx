import React, { lazy } from "react";
import styled from "styled-components";
import Button from "../../styled/button/Button";
import {
  fontWeights,
  boxSizes,
  fontFamilies,
  spacings,
  borderRadiusSizes,
  maxWidth,
} from "../../styled/constants";
import * as colors from "../../styled/colors";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useNavigate } from "react-router-dom";
import { Campaign } from "@/common/types/campaign.interface";

type Props = {
  campaign: Campaign;
};
const CampaignCardWrapper = styled.div`
  font-family: ${fontFamilies.poppins}, sans-serif;
  background-color: ${colors.white};
  padding: ${spacings.large};
  max-width: ${maxWidth.medium};
  border-radius: ${borderRadiusSizes.medium};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const CampaignCardIndex = styled.div`
  background-color: ${colors.white};
  max-width: ${maxWidth.small};
  margin-top: -30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacings.xsmall};
  justify-content: space-around;
`;

const DescriptionContainer = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  text-align: center;
`;

function CampaignCard(props: Props) {
  const { campaign } = props;
  const navigate = useNavigate();

  return (
    <CampaignCardWrapper>
      <LazyLoadImage
        width={288}
        src={campaign.campaignHeroImage}
        effect="blur"
        placeholderSrc={campaign.campaignHeroImage}
      />
      <CampaignCardIndex>
        <LazyLoadImage
          width={90}
          height={90}
          src={campaign.company.logo}
          effect="blur"
        />
        <h3>{campaign.company.name}</h3>
        <DescriptionContainer>
          <p>{campaign.description}</p>
        </DescriptionContainer>
      </CampaignCardIndex>
      <Button
        variant="primary"
        outlined
        fontWeight={fontWeights.bold}
        boxSize={boxSizes.xlarge}
        onClick={() => navigate(`/campaign/${campaign._id}`)}
      >
        Use
      </Button>
    </CampaignCardWrapper>
  );
}

export default CampaignCard;
