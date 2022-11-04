import styled from "styled-components";

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

const CampaignDetailCardWrapper = styled.div`
  background-color: #00000013;
  padding: 0.6rem 0.4rem;
  border-radius: 0.25rem;
  display: flex;
  gap: 20px;
`;

function CampaignDetailCard(props: Props) {
const { campaign } = props;

  return (
      <CampaignDetailCardWrapper>
        <img width={200} src={campaign.campaignHeroImage} />
        <div>
          <h3>{campaign.company.name}</h3>
          <p>{campaign.validUntil}</p>
        </div>
      </CampaignDetailCardWrapper>
  );
}

export default CampaignDetailCard;
