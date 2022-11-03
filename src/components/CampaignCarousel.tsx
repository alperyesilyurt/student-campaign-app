import React, { Component } from "react";
import styled from "styled-components";
import { fontWeights, boxSizes, fontFamilies } from "./styled/constants";
import * as colors from "./styled/colors";
import Button from "./styled/button/Button";

export type CarouselCampaign = {
  name?: string;
  description?: string;
  campaignHeroImage: string;
  campaignImages?: string[];
  company: { name: string; logo: string };
  validUntil: string;
};
type Props = {
  campaignCarousel: CarouselCampaign;
};
const CampaignCarouselWrapper = styled.div`
  font-family: ${fontFamilies.poppins}, sans-serif;
  background-color: ${colors.black};
  width: 439px;
  height: 239px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function CampaignCarousel(props: Props) {
  const { campaignCarousel } = props;
  {
    return (
      <CampaignCarouselWrapper>

        <img width={439} height={239} src={campaignCarousel.campaignHeroImage} />

      </CampaignCarouselWrapper>
    );
  }
}

export default CampaignCarousel;
