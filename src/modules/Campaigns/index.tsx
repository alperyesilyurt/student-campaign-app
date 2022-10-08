import React from "react";
import styled from "styled-components";

type Props = {};

const CampaignCard = styled.div`
  background-color: #00000013;
  padding: 0.6rem 0.4rem;
  border-radius: 0.25rem;
  display: flex;
  gap: 20px;
`;
const list = [
  {
    img: "https://images.deliveryhero.io/image/fd-tr/campaign-assets/fadfab03-463c-11ed-b8b1-660950efa710/desktop_tile_TrvWPU.jpg?height=240&quality=95&width=560&",
    companyName: "Pizza Hut",
    validUntil: "06 Aug 2020",
  },
];

export default function index({}: Props) {
  return (
    <div>
      <h1>Campaigns</h1>
      {list.map((campaign) => {
        return (
          <CampaignCard>
            <img width={200} src={campaign.img} />
            <div>
              <h3>{campaign.companyName}</h3>
              <p>{campaign.validUntil}</p>
            </div>
          </CampaignCard>
        );
      })}
    </div>
  );
}
