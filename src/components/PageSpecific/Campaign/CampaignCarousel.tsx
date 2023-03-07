import styled from "styled-components";
import { fontFamilies } from "@/components/styled/constants";
import * as colors from "@/components/styled/colors";
import { Campaign } from "./CampaignCard";

type Props = {
  campaignCarousel: Campaign;
};
export const CampaignCarouselWrapper = styled.div`
  font-family: ${fontFamilies.poppins}, sans-serif;
  background-color: ${colors.gray2};
  height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: 20px;
  padding: 20px 12px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.09);
  }
  & .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  & img.campaign-carousel-image {
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 10px;
  }
  & img.logo {
    width: 40px;
    height: 40px;
    object-fit: cover;
    margin-top: -30px;
  }
  & > h4 {
    font-size: 1.1rem;
    margin-top: 10px;
    text-align: center;
  }
`;

function CampaignCarousel(props: Props) {
  const { campaignCarousel } = props;
  {
    return (
      <CampaignCarouselWrapper>
        <div className="container">
          <img
            className="campaign-carousel-image"
            width={439}
            height={239}
            src={campaignCarousel.campaignHeroImage}
          />
          <img className="logo" src={campaignCarousel.company?.logo} />
        </div>
        <h4>{campaignCarousel.name}</h4>
      </CampaignCarouselWrapper>
    );
  }
}

export default CampaignCarousel;
