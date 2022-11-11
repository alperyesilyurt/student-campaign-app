import ScrollToTop from "@/common/hooks/scroll-to-top";
import { useGetCampaignByID } from "@/common/hooks/use-get-campaign";
import Button from "@/components/styled/button/Button";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 70px;
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const CouponArea = styled.div`
  box-sizing: border-box;
  background: linear-gradient(90deg, #ff8e8e 1%, #9caeff 53.08%, #7cf2b8 100%);
  border-radius: 10px;
  width: 90%;
  padding: 52px 52px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 25px 25px;
  }
`;
const GetCodeCardHeadline = styled.h4`
  font-family: "Nunito";
  font-style: normal;
  font-weight: 700;
  font-size: 35px;
  line-height: 50px;
  text-align: center;
  margin: 0;
`;

const CampaignDescription = styled.div`
  font-family: "Nunito";
  font-style: normal;
  font-weight: 400;
  font-size: 22px;
  line-height: 30px;
  padding: 30px;

  text-align: center;
`;
const CompanyLogoImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: #000000;
  margin-top: -150px;
  @media (max-width: 768px) {
    width: 130px;
    height: 130px;
    margin-top: -120px;
  }
`;

type campaignDetailProps = {
  campaignID?: string;
};

export default function CampaignDetail(props: campaignDetailProps) {
  const { campaignID } = props;
  const params = useParams();

  const campaignIDToFetch = params.id || campaignID;

  if (!campaignIDToFetch) {
    return <div>Invalid campaign ID</div>;
  }

  const singleCampaign = useGetCampaignByID(campaignIDToFetch);

  const { t } = useTranslation();

  if (singleCampaign.isLoading) {
    return <>Loading</>;
  }

  return (
    <Page>
      <ScrollToTop />
      {singleCampaign.isSuccess ? (
        <>
          <img
            src={singleCampaign.data?.data.campaignHeroImage}
            style={{ width: "90%", objectFit: "contain", padding: "30px" }}
          />
          <CompanyLogoImage src={singleCampaign.data?.data.company.logo} />
          <CampaignDescription>
            {singleCampaign.data?.data.description}
          </CampaignDescription>
          <CouponArea>
            <GetCodeCardHeadline>
              %15 <br /> student discount
            </GetCodeCardHeadline>
            <Button size="large" type="black">
              Get Code
            </Button>
          </CouponArea>
          <CampaignDescription>
            {singleCampaign.data?.data.description}
          </CampaignDescription>
        </>
      ) : (
        <h5>{t("errors.campaignDetail.fetchError")}</h5>
      )}
    </Page>
  );
}
